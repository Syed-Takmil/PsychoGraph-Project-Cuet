# PsychoGraph 🧠⚡: Advanced Cognitive & Neuro-Telemetry Profiling Platform

PsychoGraph is an enterprise-grade, multi-dimensional web application engineered to map, analyze, and optimize human cognitive performance, memory capacity, psychomotor speed, and affective resilience. By blending gamified telemetry tasks with advanced generative AI analysis, PsychoGraph bridges the gap between everyday digital activity and clinical-grade neuropsychological profiling.

---

## 🌟 Core Features & Platform Capabilities

* **Sequential Telemetry Pipeline:** A structured, guided 7-stage assessment flow featuring fluid navigation (`getNextActivity`, `getPrevActivity`) that walks users seamlessly from lifestyle questionnaires to rapid-fire neurological reaction tests.
* **Dynamic SVG Psychograph Radar:** A custom-rendered, responsive spider/radar chart visualizing real-time performance across five core pillars (Cognitive Speed, Attention Focus, Memory Span, Emotional Resilience, and Sleep Hygiene).
* **AI-Powered Deep Telemetry Analysis (Google Gemini):** Integrates Google's generative models (`gemini-2.5-flash`) with strict JSON schema parsing to generate personalized psychological overviews, highlighted strengths, and actionable wellness recommendations based on live user telemetry.
* **Smart Caching & Database Architecture:** Powered by MongoDB with robust upsert logic and intelligent response-caching to preserve API quotas and ensure lightning-fast dashboard load times.
* **Modern Glassmorphism UI:** Built with Next.js App Router, Tailwind CSS, and Lucide icons featuring seamless dark/light mode compatibility, animated loading skeletons, and interactive feedback toasts.

---

## 🕹️ Interactive Assessment Modules & Scientific Rationale

PsychoGraph evaluates users through a meticulously sequenced 7-part battery. Each test isolates specific neurological pathways and collects granular performance telemetry:

### 1. Mood Questionnaire
* **Description & Rules:** A baseline lifestyle, sleep, and emotional health survey where users log their daily affective tone, circadian habits, and subjective stress levels.
* **Purpose:** Establishes the foundational contextual baseline for physiological and emotional well-being before active cognitive testing.
* **Data Collected:** Self-reported sleep duration, subjective stress scores, energy levels, and mood valence.
* **Health Prediction & Research Reference:** Sleep hygiene and affective baseline heavily modulate prefrontal cortex executive functioning. 
  * *Reference:* Walker, M. P. (2017). *Why We Sleep: Unlocking the Power of Sleep and Dreams*. Scribner. (Correlates sleep deprivation directly with impaired cognitive latency and emotional reactivity).

### 2. Stroop Test
* **Description & Rules:** The classic cognitive interference paradigm. Color words (e.g., "RED") are displayed in conflicting ink colors (e.g., green). Users must select the *ink color* while actively suppressing the automatic instinct to read the word.
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
* **Description & Rules:** A grid-based sequence memory challenge where an escalating pattern of tiles illuminates, requiring the user to replicate the sequence accurately from memory.
* **Purpose:** Assesses visuospatial span and sequential working memory load.
* **Data Collected:** Maximum sequence level reached, correct sequential inputs, and error count.
* **Health Prediction & Research Reference:** Visuospatial sequencing tracking provides insights into frontal-parietal network efficiency.
  * *Reference:* Funahashi, S. (2017). *Working memory in the prefrontal cortex*. Brain Sciences, 7(5), 49.

### 5. Click Accuracy
* **Description & Rules:** Moving or appearing targets flash randomly across the viewport; users must react and click them with high precision within a strict time frame.
* **Purpose:** Measures fine motor control, hand-eye coordination, and spatial impulse precision.
* **Data Collected:** Click coordinates deviation from target center, missed clicks, and average precision delta.
* **Health Prediction & Research Reference:** Psychomotor coordination degradation correlates with fatigue, neurological stress, and psychomotor slowing.
  * *Reference:* Schmidt, R. A., & Lee, T. D. (2011). *Motor Control and Learning: A Behavioral Emphasis*. Human Kinetics.

### 6. Reaction Test
* **Description & Rules:** Simple and choice reaction time measurement. The screen shifts color unpredictably, and the user must press/click as fast as possible upon stimulus onset.
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

## 🛠️ Technology Stack & Architecture

* **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, Lucide Icons, SVG-based Radar/Spider charting.
* **Backend:** Node.js, Express.js (ES Modules), CORS middleware.
* **Database:** MongoDB (`psychograph_db`), featuring upsert assessments and analysis caching.
* **AI Engine:** Google Gemini SDK (`@google/generative-ai`) utilizing strict JSON response formatting for telemetry interpretation.

---

## 🚀 Getting Started & Installation

### 1. Backend Setup (`psychograph-backend`)
```bash
cd psychograph-backend
npm install