# PsychoGraph 🧠⚡: Advanced Cognitive & Neuro-Telemetry Profiling Platform

PsychoGraph is an enterprise-grade, multi-dimensional web application engineered to map, analyze, and optimize human cognitive performance, memory capacity, psychomotor speed, and affective resilience. By blending gamified telemetry tasks with advanced generative AI analysis, PsychoGraph bridges the gap between everyday digital activity and clinical-grade neuropsychological profiling.

---

## 🌟 Core Features & Platform Capabilities

* **Sequential Telemetry Pipeline:** A structured, guided 7-stage assessment flow featuring fluid navigation (`getNextActivity`, `getPrevActivity`) that walks users seamlessly from lifestyle questionnaires to rapid-fire neurological reaction tests.
* **Dynamic SVG Psychograph Radar:** A custom-rendered, responsive spider/radar chart visualizing real-time performance across five core pillars (Cognitive Speed, Attention Focus, Memory Span, Emotional Resilience, and Sleep Hygiene).
* **AI-Powered Deep Telemetry Analysis (Google Gemini):** Integrates Google's generative models (`gemini-1.5-flash`) with strict JSON schema parsing to generate personalized psychological overviews, highlighted strengths, and actionable wellness recommendations based on live user telemetry.
* **Smart Caching & Database Architecture:** Powered by Express and MongoDB with robust upsert logic and intelligent response-caching to preserve API quotas and ensure lightning-fast dashboard load times.
* **Modern Glassmorphism UI:** Built with Next.js App Router, Tailwind CSS, and Lucide icons featuring seamless dark/light mode compatibility, animated loading skeletons, and interactive feedback toasts.

---

## 🕹️ Interactive Assessment Modules & Clinical Rationale

PsychoGraph evaluates users through a meticulously sequenced 7-part battery. Each test isolates specific neurological pathways and collects granular performance telemetry:

### Activity 01: Pre-Assessment Mood Check-in
* **Mechanics:** Self-report current mood (emoji), energy (1–5), and stress (1–5) before testing.
* **Purpose & Measures:** Establishes subjective baseline mood, stress, and arousal levels.
* **Health Prediction:** Identifies burnout, anxiety, and depressive strain; prevents misinterpreting temporary fatigue as cognitive impairment.
* **Key References:**
  * Kroenke K, et al. (2001). *The PHQ-9.* [JAMA Internal Medicine](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/211099)
  * Spitzer RL, et al. (2006). *The GAD-7 Scale.* [JAMA Internal Medicine](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326)

---

### Activity 02: Emotion Stroop Test
* **Mechanics:** Click the **ink color** of a displayed color word across 10 rounds while ignoring the text itself.
* **Purpose & Measures:** Measures selective attention, response inhibition, error count, and cognitive interference latency (ms).
* **Health Prediction:** Slower times or high error rates flag deficits in executive function, ADHD, clinical anxiety, or early cognitive decline (MCI).
* **Key References:**
  * Stroop JR. (1935). *Interference in Serial Verbal Reactions.* [Classics in Psych History](https://psychclassics.yorku.ca/Stroop/)
  * Scarpina F, Tagini S. (2017). *Stroop Color and Word Test.* [Frontiers in Psychology](https://www.frontiersin.org/articles/10.3389/fpsyg.2017.00557/full)

---

### Activity 03: Memory Card Pair Match
* **Mechanics:** Flip pairs of cards to match identical emojis across 3 scaling grid sizes. Mismatches flip back face down.
* **Purpose & Measures:** Evaluates visual short-term working memory, completion latency, move-to-move pacing, and rapid error rates.
* **Health Prediction:** Frequent repeat errors on known cards signal working memory bottlenecks, early MCI, Alzheimer's risk, or severe fatigue.
* **Key References:**
  * Baddeley AD. (1992). *Working Memory.* [Science](https://www.science.org/doi/10.1126/science.1736359)
  * Petersen RC. (2004). *Mild Cognitive Impairment Entity.* [JAMA Internal Medicine](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/217514)

---

### Activity 04: Pattern Memory Sequence
* **Mechanics:** Watch a sequence of tiles light up on a 3x3 grid and repeat the pattern from memory. Sequences lengthen by +1 each round.
* **Purpose & Measures:** Measures spatial working memory span (Corsi paradigm), sequence ordering accuracy, and max span capacity.
* **Health Prediction:** Short memory spans signal executive planning issues, spatial working memory limits, ADHD, or post-TBI cognitive impairment.
* **Key References:**
  * Corsi PM. (1972). *Human Memory & Medial Temporal Region.* [McGill Thesis](https://books.google.com/books?id=TGYoAQAAMAAJ)
  * Baddeley AD. (1992). *Working Memory.* [Science](https://www.science.org/doi/10.1126/science.1736359)

---

### Activity 05: Click Accuracy Challenge
* **Mechanics:** Click moving targets across 3 difficulty levels while avoiding moving red hazard spheres.
* **Purpose & Measures:** Serves as a digital biomarker for motor control, hand-eye coordination, target hits vs. misses, penalty strikes, and accuracy %.
* **Health Prediction:** Motor jitter or frequent penalty strikes indicate psychomotor slowing, cognitive fatigue, or central nervous system strain.
* **Key References:**
  * Insel TR. (2017). *Digital Phenotyping.* [JAMA](https://jamanetwork.com/journals/jama/fullarticle/2666502)
  * Dagum P. (2018). *Digital Biomarkers of Cognitive Function.* [Nature Digital Medicine](https://www.nature.com/articles/d42473-018-00044-7)

---

### Activity 06: Reaction Speed Test
* **Mechanics:** Wait for a neutral box to turn **green**, then click instantly across 5 trials. Clicking early triggers a false start.
* **Purpose & Measures:** Measures pure psychomotor speed (ms), trial consistency (std dev), peak reaction speed, and false starts (impulsivity).
* **Health Prediction:** Inconsistent or delayed times signal processing speed delays, severe sleep deprivation, or physical fatigue. High false starts indicate impulsivity (ADHD).
* **Key References:**
  * Deary IJ, et al. (2011). *Computer-Based Reaction Time.* [PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026139)
  * Woods DL, et al. (2015). *Factors Influencing Simple Reaction Time.* [Frontiers / PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4456887/)

---

### Activity 07: Visual Preference & Affective Bias
* **Mechanics:** Select 9 images that resonate most from a grid. Dynamic tile flips replace selected items with new emotional categories.
* **Purpose & Measures:** Measures non-verbal emotional preference, category distribution (Happy, Calm, Neutral, Sad, Angry), and valence bias.
* **Health Prediction:** Preference for low-valence or high-arousal negative imagery (Sad/Angry) correlates with depressive mood or anxiety; positive choices indicate emotional resilience.
* **Key References:**
  * Leppänen JM. (2006). *Emotional Information Processing in Mood Disorders.* [PubMed](https://pubmed.ncbi.nlm.nih.gov/17145174/)
  * Elliott R, et al. (2002). *Neural Basis of Mood-Congruent Processing Biases.* [PubMed](https://pubmed.ncbi.nlm.nih.gov/12457760/)

---

## 🛠️ Technology Stack & Architecture

* **Frontend:** Next.js (App Router), React, Better-Auth (Credentials & Google SSO), Tailwind CSS, Lucide Icons, Recharts & SVG-based Radar charting.
* **Backend Engine:** Node.js, Express.js (ES Modules), CORS middleware.
* **Database:** MongoDB (`PsychoGraph`), featuring upsert assessments and analysis caching schemas.
* **AI Engine:** Google Gemini SDK (`@google/generative-ai`) utilizing strict JSON response formatting for telemetry interpretation.

---

> ⚠️ **Clinical Disclaimer:** These activities provide screening data and self-monitoring metrics; they do not constitute a formal diagnostic clinical evaluation.