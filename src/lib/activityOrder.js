const ACTIVITY_ORDER = [
  { label: 'Mood Questionnaire', path: '/moodQuestionnaire' },
  { label: 'Stroop Test', path: '/stroopTest' },
  { label: 'Memory Card', path: '/memoryCard' },
  { label: 'Pattern Memory', path: '/patternMemory' },
  { label: 'Click Accuracy', path: '/clickAccuracy' },
  { label: 'Reaction Test', path: '/reactionTest' },
  { label: 'Visual Preference', path: '/visualPreference' },
]

export function getNextActivity(currentPath) {
  const idx = ACTIVITY_ORDER.findIndex((a) => a.path === currentPath)
  if (idx === -1 || idx >= ACTIVITY_ORDER.length - 1) return null
  return ACTIVITY_ORDER[idx + 1]
}

export function getPrevActivity(currentPath) {
  const idx = ACTIVITY_ORDER.findIndex((a) => a.path === currentPath)
  if (idx <= 0) return null
  return ACTIVITY_ORDER[idx - 1]
}

export default ACTIVITY_ORDER
