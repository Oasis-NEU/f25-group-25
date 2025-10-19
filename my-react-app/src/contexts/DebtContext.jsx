import React, { createContext, useContext, useReducer, useEffect } from "react"

const KEY = "debtApp:v1"
const DebtContext = createContext(null)

const initialState = {
  debts: [],       // { id, from, to, amount, description, date }
  payments: [],    // { id, debtId, amount, date }
  groups: []       // { id, name, members: [], expenses: [] }
}

function reducer(state, action) {
  switch (action.type) {
    case "LOAD": return action.payload
    case "ADD_DEBT": {
      const debt = { id: Date.now().toString(), ...action.payload }
      return { ...state, debts: [...state.debts, debt] }
    }
    case "MAKE_PAYMENT": {
      const { debtId, amount } = action.payload
      const payments = [...state.payments, { id: Date.now().toString(), debtId, amount, date: new Date().toISOString() }]
      const debts = state.debts.map(d => d.id === debtId ? { ...d, amount: Math.max(0, +d.amount - +amount) } : d)
      return { ...state, payments, debts }
    }
    case "ADD_GROUP": {
      const g = { id: Date.now().toString(), ...action.payload, expenses: [] }
      return { ...state, groups: [...state.groups, g] }
    }
    case "ADD_GROUP_EXPENSE": {
      // payload: { groupId, payer, totalAmount, splits: { memberId: amount } , description }
      const { groupId, payer, totalAmount, splits, description } = action.payload
      const expense = { id: Date.now().toString(), payer, totalAmount, splits, description, date: new Date().toISOString() }
      const groups = state.groups.map(g => g.id === groupId ? { ...g, expenses: [...g.expenses, expense] } : g)

      // convert splits into pairwise debts (payer -> member)
      let debts = [...state.debts]
      for (const member of Object.keys(splits)) {
        if (member === payer) continue
        const amt = +splits[member]
        if (amt > 0) {
          debts.push({
            id: Date.now().toString() + Math.random().toString(36).slice(2,6),
            from: member,
            to: payer,
            amount: amt,
            description: `Group:${groupId} ${description || ""}`,
            date: new Date().toISOString()
          })
        }
      }
      return { ...state, groups, debts }
    }
    default:
      return state
  }
}

export function DebtProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) dispatch({ type: "LOAD", payload: JSON.parse(raw) })
    } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
  }, [state])

  const addDebt = (payload) => dispatch({ type: "ADD_DEBT", payload })
  const makePayment = (payload) => dispatch({ type: "MAKE_PAYMENT", payload })
  const addGroup = (payload) => dispatch({ type: "ADD_GROUP", payload })
  const addGroupExpense = (payload) => dispatch({ type: "ADD_GROUP_EXPENSE", payload })

  const computeNetBetween = (a, b) => {
    // positive => a owes b
    const debtsFromAtoB = state.debts.filter(d => d.from === a && d.to === b).reduce((s, d) => s + Number(d.amount), 0)
    const debtsFromBtoA = state.debts.filter(d => d.from === b && d.to === a).reduce((s, d) => s + Number(d.amount), 0)
    return debtsFromAtoB - debtsFromBtoA
  }

  return (
    <DebtContext.Provider value={{ state, addDebt, makePayment, addGroup, addGroupExpense, computeNetBetween }}>
      {children}
    </DebtContext.Provider>
  )
}

export const useDebts = () => useContext(DebtContext)
export default DebtContext