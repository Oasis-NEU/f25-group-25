import React, { useState } from "react"
import { useDebts } from "../contexts/DebtContext"

export default function Debts() {
  const { state, addDebt, makePayment, computeNetBetween } = useDebts()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [netA, setNetA] = useState("")
  const [netB, setNetB] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (!from || !to || !amount) return
    addDebt({ from, to, amount: Number(amount), description, date: new Date().toISOString() })
    setFrom(""); setTo(""); setAmount(""); setDescription("")
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Debt tracker</h2>

      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input placeholder="From (user id/name)" value={from} onChange={e=>setFrom(e.target.value)} className="border p-2" />
        <input placeholder="To (user id/name)" value={to} onChange={e=>setTo(e.target.value)} className="border p-2" />
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 w-24" />
        <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border p-2" />
        <button className="bg-blue-500 text-white px-3 rounded">Add</button>
      </form>

      <h3 className="font-semibold">Existing debts</h3>
      <ul className="mb-4">
        {state.debts.map(d => (
          <li key={d.id} className="flex items-center gap-2 border-b py-2">
            <div className="flex-1">
              <strong>{d.from}</strong> owes <strong>{d.to}</strong> — ${d.amount} <span className="text-sm text-gray-500">({d.description})</span>
            </div>
            {d.amount > 0 && (
              <button onClick={()=> {
                const pay = prompt("Payment amount", String(Math.min(d.amount, 10)))
                if (!pay) return
                makePayment({ debtId: d.id, amount: Number(pay) })
              }} className="px-2 py-1 bg-green-500 text-white rounded">Pay</button>
            )}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold">Net between two users</h3>
      <div className="flex gap-2">
        <input placeholder="User A" value={netA} onChange={e=>setNetA(e.target.value)} className="border p-2" />
        <input placeholder="User B" value={netB} onChange={e=>setNetB(e.target.value)} className="border p-2" />
        <button onClick={()=>{
          if (!netA || !netB) return alert("enter both")
          const net = computeNetBetween(netA, netB)
          alert(`${net > 0 ? `${netA} owes ${netB} $${net}` : net < 0 ? `${netB} owes ${netA} $${-net}` : "No net debt"}`)
        }} className="bg-gray-800 text-white px-3 rounded">Compute</button>
      </div>
    </div>
  )
}