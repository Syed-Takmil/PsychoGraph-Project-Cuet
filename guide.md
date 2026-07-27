# Psychograph Activity Guide

A reference for what each activity measures, the data it produces, and how those signals can be combined into an informational dashboard.

---

## Activity 1 — Mood Questionnaire

**How it works**  
15 Likert-scale statements (1–5, Strongly Disagree → Strongly Agree). 7 are positively framed, 8 are reverse-scored negatives. Total ranges from 15–75, mapped to four tiers.

**Data collected**
- Total score (15–75)
- Tier label (Very Positive / Good / Moderate / Low)
- Per-question breakdown across domains: sleep, energy, social connection, stress, concentration, mood, outlook

**Dashboard insights**
- Overall emotional wellbeing snapshot
- Trend lines across repeated sessions
- Domain-level weakness detection (e.g. sleep scores consistently low)
- Early-warning flag when score drops by 10+ points between sessions

---

## Activity 2 — Stroop Test

**How it works**  
10 rounds of color-word interference. A color name is displayed in a mismatched ink colour; the user picks the ink colour, not the word.

**Data collected**
- Correct answers out of 10
- Average response time (ms)

**Dashboard insights**
- Cognitive processing speed under interference
- Higher-than-normal response time may indicate mental fatigue or elevated cognitive load
- Cross-reference with Mood Questionnaire: stressed users often show slower Stroop times

---

## Activity 3 — Memory Card Game

**How it works**  
Flip-and-match emoji pairs across 4 levels with increasing grid sizes. Each level is timed and mistakes are counted.

**Data collected**
- Total completion time
- Overall accuracy (%)
- Total mistakes
- Per-level breakdown: time, mistakes, accuracy

**Dashboard insights**
- Visual short-term memory benchmark
- Fatigue proxy: do mistakes rise in later levels?
- Attention span estimate
- Cross-reference with Pattern Memory for convergent validity

---

## Activity 4 — Pattern Memory

**How it works**  
Simon-says sequence recall on a 3×3 tile grid. Each correct round appends one new tile. Wrong click ends the game.

**Data collected**
- Rounds completed (sequence length)
- Best streak (persisted across sessions)

**Dashboard insights**
- Working memory capacity (updates with practice)
- Learning curve over multiple sessions
- Correlation with Memory Card results strengthens memory-domain assessment

---

## Activity 5 — Click Accuracy Challenge

**How it works**  
Three levels (Easy / Medium / Hard, each 25 s). Moving targets shrink over time. Red danger balls appear from the start — clicking them incurs a penalty.

**Data collected**
- Hits, misses, penalties per level
- Accuracy percentage per level
- Combined overall accuracy

**Dashboard insights**
- Fine motor control under time pressure + distraction
- Impulsivity indicator (penalty count)
- Performance degradation under difficulty (Easy vs Hard accuracy delta)

---

## Activity 6 — Reaction Time Test

**How it works**  
5 attempts. Screen flashes green at a random delay; user clicks as fast as possible. Clicking before green counts as a false start.

**Data collected**
- Mean response time (ms)
- Fastest / peak speed (ms)
- Standard deviation (consistency score)
- Number of false starts

**Dashboard insights**
- Baseline sensorimotor reaction speed
- Consistency (low SD = stable, reliable performance)
- Impulse control (false starts)
- Alertness / arousal level

---

## Activity 7 — Visual Preference Test

**How it works**  
User selects 9 images they find appealing from a rotating grid of 12 (pool of 50 across 5 emotion categories: Happy, Calm, Neutral, Sad, Angry). A radar chart visualises the emotional resonance profile.

**Data collected**
- Emotion tally (count per category)
- Dominant emotion label
- Radar chart dataset (5 dimensions)

**Dashboard insights**
- Current emotional resonance (implicit, not self-reported)
- Valence / arousal balance
- Convergence with Mood Questionnaire result
- Shifts in visual preference over time

---

## Building the Dashboard

### Aggregated metrics

| Metric | Source activities |
|---|---|
| **Overall Wellbeing Score** | Mood Questionnaire |
| **Cognitive Processing Speed** | Stroop Test, Reaction Test |
| **Memory Performance** | Memory Card, Pattern Memory |
| **Motor Precision** | Click Accuracy |
| **Emotional Profile** | Mood Questionnaire, Visual Preference |
| **Cognitive Consistency** | Reaction Test SD, level-to-level degradation |

### Suggested visualisations

| Chart type | Purpose |
|---|---|
| **Radar chart** | Normalised 7-activity snapshot on one screen |
| **Line chart** | Mood Questionnaire score over time |
| **Bar chart** | Reaction time per session (mean ± SD) |
| **Heatmap** | Emotion-category tally across Visual Preference takes |
| **Scatter plot** | Cognitive Speed vs Emotional Wellbeing |

### Example cross-activity correlations

- Higher sleep hours → faster Reaction Test and Stroop times
- Low Mood Questionnaire score → elevated Sad / Angry selection in Visual Preference
- High consistency (low SD) across all timed activities → stable, rested cognitive state
- Many false starts + high danger-ball penalties → elevated impulsivity
- Memory Card mistakes + Pattern Memory rounds correlate → convergent memory assessment

---

## Data export shape (localStorage keys)

| Key | Type | Contents |
|---|---|---|
| `auth` | `"true"` / missing | Login state |
| `theme` | `"dark"` / `"light"` | Theme preference |
| `completed_activities` | `string[]` | Paths of finished activities, e.g. `["/moodQuestionnaire","/stroopTest"]` |

*Activity results are currently displayed in-app but not persisted to a central store. To build a dashboard, collect the per-activity result objects and write them to localStorage (or a backend) under a key such as `activity_results`.*
