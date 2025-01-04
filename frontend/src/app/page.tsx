'use client'

// import Link from 'next/link';
import { useState } from 'react'
import { Button } from '@/components/ui/button'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"

export default function Home() {
  const [pingResult, setPingResult] = useState('')

  const handlePing = async () => {
    try {
      console.log('Sending ping request to backend')
      const res = await fetch('/api/ping')
      console.log('Response received:', res)
      const data = await res.json()
      console.log('Data received:', data)
      setPingResult(data.message)
    } catch (error) {
      console.error('Error:', error)
      setPingResult('Error: Failed to ping backend')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to PDFtoQuiz</h1>
      <div>
        <Button onClick={handlePing}>Ping Backend</Button>
        {pingResult && <p>Result: {pingResult}</p>}
      </div>
    </main>
  )
}