const STORAGE_KEY = 'completed_activities'

export function getCompletedActivities() {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function markCompleted(path) {
  const completed = getCompletedActivities()
  if (!completed.includes(path)) {
    completed.push(path)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }
}

export function isCompleted(path) {
  return getCompletedActivities().includes(path)
}
