import React from "react"
import { Link } from "react-router-dom"
import { useDebts } from "../contexts/DebtContext"

export default function Groups() {
  const { state } = useDebts()
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Groups (opt-in)</h2>
      <Link to="/groups/create" className="inline-block mb-4 px-3 py-2 bg-blue-500 text-white rounded">Create group</Link>

      <ul>
        {state.groups.map(g => (
          <li key={g.id} className="border-b py-2">
            <div className="flex justify-between items-center">
              <div>
                <strong>{g.name}</strong> — members: {g.members.join(", ")}
              </div>
              <div>
                <Link to={`/groups/${g.id}`} className="text-sm text-blue-600">Open</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}