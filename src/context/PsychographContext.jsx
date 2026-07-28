'use client'

import React, { createContext, useContext, useState } from 'react'

const PsychographContext = createContext()

export function PsychographProvider({ children }) {
  const [testResults, setTestResults] = useState({
    visualPreference: null, // Stores { tally, dominant, score }
    stroop: null,           // Stores Stroop test scores
    reaction: null,        // Stores Reaction time scores
    memory: null,          // Stores Memory test scores
    lifestyle: null,       // Stores Lifestyle/Sleep scores
  })

  // Function called by individual test components upon completion
  const recordTestResult = (testKey, data) => {
    setTestResults((prev) => {
      const updated = { ...prev, [testKey]: data }
      // Send the aggregate payload to the API
      submitPayloadToBackend(updated)
      return updated
    })
  }

  // Sends the combined data payload to your API / Payload CMS endpoint
  const submitPayloadToBackend = async (currentResults) => {
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        testResults: currentResults,
      }

      await fetch('/api/psychograph/save-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error('Failed to submit payload:', error)
    }
  }

  return (
    <PsychographContext.Provider value={{ testResults, recordTestResult }}>
      {children}
    </PsychographContext.Provider>
  )
}

export const usePsychograph = () => useContext(PsychographContext)