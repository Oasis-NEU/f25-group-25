import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDebts } from "../contexts/DebtContext"

export default function CreateGroup() {
  const { addGroup } = useDebts()
  const [name, setName] = useState("")
  const [membersRaw, setMembersRaw] = useState("")
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const members = membersRaw.split(",").map(s=>s.trim()).filter(Boolean)
    if (!name || members.length === 0) return alert("name + at least one member")
    addGroup({ name, members })
    navigate("/groups")
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-2">Create group</h2>
      <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Group name" className="border p-2" />
        <input value={membersRaw} onChange={e=>setMembersRaw(e.target.value)} placeholder="Members (comma separated ids/names)" className="border p-2" />
        <button className="bg-blue-500 text-white px-3 py-2 rounded">Create</button>
      </form>
    </div>
  )
}