'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAnswer } from './actions';

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    getAnswer('Why is the sky blue?')
    // const res = await fetch('/api/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ prompt }),
    // })
    // const data = await res.json()
    const { text } = await getAnswer('Why is the sky blue?');
    setResponse(text)
    setLoading(false)
  }

  return (
    <main className="flex flex-col items-center justify-center pt-60 p-24">
      <h1 className="text-4xl font-bold mb-8">Next AI SDK Lite</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </form>
      {response && (
        <div className="mt-8 p-4 bg-muted rounded-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </main>
  )
}