# PsychoGraph: Cognitive & Behavioral Neuro-Telemetry Platform

PsychoGraph is an advanced web-based cognitive profiling and neuro-telemetry platform designed to map user cognition, attention, memory, and behavioral tendencies across multiple interactive paradigms. By combining reaction-time paradigms, psychometric evaluation, and generative AI synthesis, PsychoGraph aggregates and analyzes multi-dimensional mental telemetry.

---

## Architecture & Technology Stack

* **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, Lucide Icons, SVG-based Radar/Spider charting.
* **Backend:** Node.js, Express.js (ES Modules).
* **Database:** MongoDB (`psychograph_db`), featuring upsert assessments and analysis caching.
* **AI Engine:** Google Gemini SDK (`@google/generative-ai`) utilizing strict JSON response formatting for telemetry interpretation.

---

## Interactive Assessment Modules & Telemetry Specifications

PsychoGraph evaluates users through a structured sequence of 7 activities. Each test is scientifically chosen to isolate distinct neurological and psychological metrics:

### 1. Mood Questionnaire
* **Description & Rules:** A subjective lifestyle and emotional baseline survey where users report sleep quality, perceived stress levels, daily affective state, and circadian habits.
* **Purpose:** Establishes the foundational contextual baseline for physiological and emotional well-being before active cognitive testing.
* **Data Collected:** Self-reported sleep duration, subjective stress scores, energy levels, and mood valence.
* **Health Prediction & Research Reference:** Sleep hygiene and affective baseline heavily modulate prefrontal cortex executive functioning. 
  * *Reference:* Walker, M. P. (2017). *Why We Sleep: Unlocking the Power of Sleep and Dreams*. Scribner. (Correlates sleep deprivation directly with impaired cognitive latency and emotional reactivity).

### 2. Stroop Test
* **Description & Rules:** The classic Stroop effect paradigm. Users are presented with color words (e.g., "RED") printed in conflicting font colors (e.g., green). They must quickly choose or click the *ink color* while ignoring the semantic word meaning.
* **Purpose:** Measures cognitive interference, selective attention, and executive inhibition control.
* **Data Collected:** Reaction latency in congruent vs. incongruent trials, error rate, and emotional resilience under cognitive friction.
* **Health Prediction & Research Reference:** Deficits in Stroop interference control serve as a key marker for executive dysfunction, chronic stress, and attention-deficit patterns.
  * *Reference:* Stroop, J. R. (1935). *Studies of interference in serial verbal reactions*. Journal of Experimental Psychology, 18(6), 643–662.

### 3. Memory Card (Card Matching)
* **Description & Rules:** A visual-spatial working memory grid where cards are briefly shown and flipped face down. Users must match pairs within minimal moves and time limits.
* **Purpose:** Evaluates visual working memory capacity, pattern retention speed, and short-term memory consolidation.
* **Data Collected:** Total moves, elapsed time to complete matches, and accuracy percentage.
* **Health Prediction & Research Reference:** Working memory span is closely linked to hippocampal health and fluid intelligence. 
  * *Reference:* Baddeley, A. (1992). *Working memory*. Science, 255(5044), 556–559.

### 4. Pattern Memory
* **Description & Rules:** A grid-based sequence memory game where an escalating pattern of tiles illuminates, and the user must replicate the sequence accurately.
* **Purpose:** Assesses visuospatial span and sequential working memory load.
* **Data Collected:** Maximum sequence level reached, correct sequential inputs, and error count.
* **Health Prediction & Research Reference:** Visuospatial sequencing tracking provides insights into frontal-parietal network efficiency.
  * *Reference:* Funahashi, S. (2017). *Working memory in the prefrontal cortex*. Brain Sciences, 7(5), 49.

### 5. Click Accuracy
* **Description & Rules:** Targets appear randomly across the screen viewport; users must react and click them with high precision within a strict time frame.
* **Purpose:** Measures fine motor control, hand-eye coordination, and spatial impulse precision.
* **Data Collected:** Click coordinates deviation from target center, missed clicks, and average precision delta.
* **Health Prediction & Research Reference:** Psychomotor coordination degradation correlates with fatigue, neurological stress, and psychomotor slowing.
  * *Reference:* Schmidt, R. A., & Lee, T. D. (2011). *Motor Control and Learning: A Behavioral Emphasis*. Human Kinetics.

### 6. Reaction Test
* **Description & Rules:** Simple and choice reaction time measurement. The screen shifts color unpredictably, and the user must press/click as fast as possible.
* **Purpose:** Quantifies basic processing speed and central nervous system transmission latency.
* **Data Collected:** Millisecond (ms) response latency across multiple trials.
* **Health Prediction & Research Reference:** Reaction time is a robust biomarker of central nervous system vitality, alertness, and central processing efficiency.
  * *Reference:* Jensen, A. R. (2006). *Clocking the Mind: Mental Chronometry and Individual Differences*. Elsevier.

### 7. Visual Preference
* **Description & Rules:** A psychological preference matrix presenting balancing aesthetic patterns, tonal stimuli, or risk-reward scenarios to map emotional and risk tendencies.
* **Purpose:** Evaluates risk propensity, aesthetic engagement, and emotional regulation preferences.
* **Data Collected:** Choice selections categorized against risk tolerance and coping strategies.
* **Health Prediction & Research Reference:** Behavioral preference profiling correlates with personality traits (Big Five) and stress resilience schemas.
  * *Reference:* Tversky, A., & Kahneman, D. (1992). *Advances in prospect theory: Cumulative representation of uncertainty*. Journal of Risk and Uncertainty, 5(4), 297–323.

---

## Getting Started & Installation

### 1. Clone and Install Backend
```bash
cd psychograph-backend
npm install