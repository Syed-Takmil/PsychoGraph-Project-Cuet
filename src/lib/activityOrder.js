const ACTIVITY_ORDER = [
  { label: 'Mood Questionnaire', path: '/activities/moodQuestionnaire' },
  { label: 'Stroop Test', path: '/activities/stroopTest' },
  { label: 'Memory Card', path: '/activities/memoryCard' },
  { label: 'Pattern Memory', path: '/activities/patternMemory' },
  { label: 'Click Accuracy', path: '/activities/clickAccuracy' },
  { label: 'Reaction Test', path: '/activities/reactionTest' },
  { label: 'Visual Preference', path: '/activities/visualPreference' },
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