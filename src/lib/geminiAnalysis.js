/**
 * Sends activity test data to the Gemini API and retrieves an AI-generated insight.
 * 
 * @param {string} testName - The identifier or display name of the test (e.g. 'visualPreference')
 * @param {Object} gameInputs - The raw data and scores collected from the test
 * @returns {Promise<string>} The generated insight text from Gemini
 */
export async function analyzeTestWithGemini(testName, gameInputs) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testName,
        gameInputs,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || 'Gemini API failed to return insights.')
    }

    return data.insight
  } catch (error) {
    console.error('Error triggering Gemini analysis:', error)
    return 'Unable to fetch AI insight at this time.'
  }
}