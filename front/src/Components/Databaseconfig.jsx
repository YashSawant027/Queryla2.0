import React, { useState } from 'react'
import Nav from './Nav'
import { Plus, Database, Code } from 'lucide-react'

function Databaseconfig() {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return

    setLoading(true)

    try {
      const res = await fetch("http://127.0.0.1:8000/query/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  question: question, }),
      })

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />

      <div className="px-5 py-20">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-center text-3xl mb-6">
            Ready to explore your data?
          </h1>

          {/* INPUT */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <span>Write a query in plain English</span>

              <div className="flex gap-3">
                <button className="border px-3 py-1 rounded flex gap-2">
                  <Database size={18} />
                  Demo Database
                </button>

                <button className="bg-black text-white px-3 py-1 rounded flex gap-2">
                  <Plus size={18} />
                  Your Database
                </button>
              </div>
            </div>

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Show me all users"
              rows={6}
              className="w-full border p-2 rounded resize-none"
            />

            <button
              onClick={handleAsk}
              className="mt-3 bg-black text-white px-6 py-2 rounded"
            >
              Ask
            </button>
          </div>

          {/* RESULT */}
          <div className="mt-6 border rounded-lg bg-lime-50">
            <div className="border-b p-3 flex justify-between">
              <span>Result</span>
              <span className="flex gap-2 items-center">
                <Code size={18} /> SQL
              </span>
            </div>

            <div className="p-4">
              {loading && <p>Loading...</p>}

              {!loading && response && (
                <>
                  <p className="font-semibold">Generated SQL</p>
                  <pre className="bg-white p-2 rounded mb-3">
                    {response.sql}
                  </pre>

                  <p className="font-semibold">Data</p>
                  <pre className="bg-white p-2 rounded text-sm overflow-x-auto">
                    {JSON.stringify(response.result, null, 2)}
                  </pre>
                </>
              )}

              {!loading && !response && (
                <p>No result yet</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Databaseconfig
