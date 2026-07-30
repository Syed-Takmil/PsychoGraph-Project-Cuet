const STORAGE_KEY = 'activity_results'

export function saveActivityResult(path, data) {
  if (typeof window === 'undefined') return
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    existing[path] = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch (e) {
    console.error('Failed to save activity result:', e)
  }
}

export function getActivityResults() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function clearActivityResults() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
