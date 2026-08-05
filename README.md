# PsychoGraph 🧠⚡: Advanced Cognitive & Neuro-Telemetry Profiling Platform

PsychoGraph is an enterprise-grade, multi-dimensional web application engineered to map, analyze, and optimize human cognitive performance, memory capacity, psychomotor speed, and affective resilience. By blending gamified telemetry tasks with advanced generative AI analysis, PsychoGraph bridges the gap between everyday digital activity and clinical-grade neuropsychological profiling.

---

## 🌟 Core Features & Platform Capabilities

* **Sequential Telemetry Pipeline:** A structured, guided 7-stage assessment flow featuring fluid navigation (`getNextActivity`, `getPrevActivity`) that walks users seamlessly from lifestyle questionnaires to rapid-fire neurological reaction tests.
* **Dynamic SVG Psychograph Radar:** A custom-rendered, responsive spider/radar chart visualizing real-time performance across five core pillars (Cognitive Speed, Attention Focus, Memory Span, Emotional Resilience, and Sleep Hygiene).
* **AI-Powered Deep Telemetry Analysis (Google Gemini):** Integrates Google's generative models (`gemini-3.6-flash`) with strict JSON schema parsing to generate personalized psychological overviews, highlighted strengths, and actionable wellness recommendations based on live user telemetry.
* **Smart Caching & Database Architecture:** Powered by MongoDB with robust upsert logic and intelligent response-caching to preserve API quotas and ensure lightning-fast dashboard load times.
* **Modern Glassmorphism UI:** Built with Next.js App Router, Tailwind CSS, and Lucide icons featuring seamless dark/light mode compatibility, animated loading skeletons, and interactive feedback toasts.

---

## 🕹️ Interactive Assessment Modules & Scientific Rationale

PsychoGraph evaluates users through a meticulously sequenced 7-part battery. Each test isolates specific neurological pathways and collects granular performance telemetry:








Activiy 01

### **1. Description / How it's played**

* Users report their current emotional state by selecting an emoji.
* They rate their **energy level** (1–5) and **perceived stress level** (1–5).
* Responses are recorded before cognitive assessments begin.

### **2. Purpose**

* Capture the participant's current emotional state.
* Assess self-perceived energy and stress.
* Provide baseline psychological data before cognitive testing.

### **3. What it measures**

* Current mood (emoji selection).
* Self-reported energy level.
* Self-reported stress level.
* Overall emotional well-being before testing.

### **4. How it predicts health**

* Helps identify symptoms associated with stress, anxiety, depression, burnout, and emotional distress.
* High stress with low energy may indicate increased psychological burden.
* When combined with cognitive task performance, it supports early screening and monitoring of mental health changes.

### **References**

* Kroenke K, Spitzer RL, Williams JBW. (2001). *The PHQ-9: Validity of a Brief Depression Severity Measure.* [https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/211099](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/211099)
* Spitzer RL, Kroenke K, Williams JBW, Löwe B. (2006). *The GAD-7 Anxiety Scale.* [https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/410326)
* WHO. *Mental Health.* [https://www.who.int/health-topics/mental-health](https://www.who.int/health-topics/mental-health)
* National Institute of Mental Health (NIMH). [https://www.nimh.nih.gov/health/topics](https://www.nimh.nih.gov/health/topics)


activity 2


### **1. Description / How it's played**

* Players identify the **color of the text**, not the word itself.
* Each round displays a color word in an incongruent ink color.
* Players select the correct ink color as quickly and accurately as possible.
* The test consists of 10 rounds.

### **2. Purpose**

* Assess selective attention and cognitive control.
* Evaluate inhibitory control and response inhibition.
* Measure processing speed under cognitive interference.

### **3. What it measures**

* Correct responses (accuracy).
* Response time (reaction latency).
* Number of errors.
* Average response time across all rounds.

### **4. How it predicts health**

* Poor accuracy and slower response times may indicate deficits in attention, executive functioning, processing speed, or cognitive flexibility.
* Stroop performance has been widely used to assess cognitive impairment associated with ADHD, anxiety, depression, mild cognitive impairment (MCI), dementia, traumatic brain injury, and other neurological disorders.
* Combined with other cognitive assessments, it supports early screening and monitoring of cognitive and mental health changes.

### **References**

* Stroop JR. (1935). *Studies of Interference in Serial Verbal Reactions.* [https://psychclassics.yorku.ca/Stroop/](https://psychclassics.yorku.ca/Stroop/)
* Scarpina F, Tagini S. (2017). *The Stroop Color and Word Test.* [https://www.frontiersin.org/articles/10.3389/fpsyg.2017.00557/full](https://www.frontiersin.org/articles/10.3389/fpsyg.2017.00557/full)
* MacLeod CM. (1991). *Half a Century of Research on the Stroop Effect.* [https://psycnet.apa.org/record/1991-27969-001](https://psycnet.apa.org/record/1991-27969-001)
* National Institute of Mental Health (NIMH). [https://www.nimh.nih.gov/health/topics](https://www.nimh.nih.gov/health/topics)


### Activity 3 
### **1. Description / How it's played**

* Players flip two cards at a time to find matching emoji pairs.
* Matched pairs remain visible, while incorrect pairs are flipped back.
* The game progresses through three increasing difficulty levels with more card pairs.

### **2. Purpose**

* Assess short-term and working memory.
* Evaluate visual memory and pattern recognition.
* Measure attention, recall speed, and learning efficiency.

### **3. What it measures**

* Memory accuracy (matched pairs vs. mistakes).
* Total completion time.
* Average response latency between moves.
* Number of mistakes.
* Performance across increasing difficulty levels.

### **4. How it predicts health**

* Poor memory accuracy, slower responses, and frequent mistakes may indicate reduced working memory, attention deficits, cognitive fatigue, or executive dysfunction.
* Memory matching tasks are commonly used to assess cognitive decline associated with Mild Cognitive Impairment (MCI), Alzheimer's disease, ADHD, depression, and other neurological conditions.
* Combined with other cognitive assessments, these measures support early screening and monitoring of cognitive and mental health.

### **References**

* Baddeley AD. (1992). *Working Memory.* [https://www.science.org/doi/10.1126/science.1736359](https://www.science.org/doi/10.1126/science.1736359)
* Petersen RC. (2004). *Mild Cognitive Impairment as a Diagnostic Entity.* [https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/217514](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/217514)
* Alzheimer's Association. *10 Early Signs and Symptoms of Alzheimer's.* [https://www.alz.org/alzheimers-dementia/10_signs](https://www.alz.org/alzheimers-dementia/10_signs)
* National Institute on Aging. *Cognitive Health and Older Adults.* [https://www.nia.nih.gov/health/cognitive-health-and-older-adults](https://www.nia.nih.gov/health/cognitive-health-and-older-adults)


activity 4 
### **1. Description / How it's played**

* Players watch a sequence of highlighted tiles and repeat the pattern from memory.
* Each successful round adds one more tile to the sequence.
* The game ends when an incorrect tile is selected.

### **2. Purpose**

* Assess visual sequential memory and working memory.
* Evaluate attention, learning ability, and recall under increasing difficulty.
* Measure the ability to retain and reproduce visual patterns.

### **3. What it measures**

* Rounds completed.
* Maximum sequence length remembered.
* Visual memory capacity.
* Sequential recall accuracy.
* Learning performance across increasing difficulty.

### **4. How it predicts health**

* Lower sequence recall and shorter memory span may indicate impairments in working memory, attention, or executive functioning.
* Pattern memory tasks are widely used to assess cognitive performance in individuals with ADHD, Mild Cognitive Impairment (MCI), Alzheimer's disease, traumatic brain injury, and other neurological conditions.
* Combined with other cognitive assessments, these measures support early screening and monitoring of cognitive decline and mental health changes.

### **References**

* Baddeley AD. (1992). *Working Memory.* [https://www.science.org/doi/10.1126/science.1736359](https://www.science.org/doi/10.1126/science.1736359)
* Corsi PM. (1972). *Human Memory and the Medial Temporal Region.* [https://books.google.com/books?id=TGYoAQAAMAAJ](https://books.google.com/books?id=TGYoAQAAMAAJ)
* Petersen RC. (2004). *Mild Cognitive Impairment as a Diagnostic Entity.* [https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/217514](https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/217514)
* National Institute on Aging. *Cognitive Health and Older Adults.* [https://www.nia.nih.gov/health/cognitive-health-and-older-adults](https://www.nia.nih.gov/health/cognitive-health-and-older-adults)

activity 5
### **1. Description / How it's played**

* Click moving targets while avoiding red danger balls.
* Difficulty increases with faster movement, smaller targets, and more distractions.
* Hits, misses, and penalties are recorded throughout the game.

### **2. Purpose**

* Assess visual attention and concentration.
* Evaluate hand-eye coordination and motor control.
* Measure reaction efficiency under increasing cognitive load.

### **3. What it measures**

* Number of target hits.
* Number of missed clicks.
* Penalty clicks (danger balls).
* Overall click accuracy.
* Performance across multiple difficulty levels.

### **4. How it predicts health**

* Provides **digital behavioral biomarkers** of cognitive performance.
* Lower accuracy and more errors may indicate reduced attention, cognitive fatigue, slower psychomotor speed, or executive dysfunction.
* Combined with other cognitive tasks, it can support early screening of anxiety, depression, ADHD, mild cognitive impairment, and other neurological or mental health conditions.

### **References**

* Insel TR. (2017). *Digital Phenotyping: Technology for a New Science of Behavior.* [https://jamanetwork.com/journals/jama/fullarticle/2666502](https://jamanetwork.com/journals/jama/fullarticle/2666502)
* Dagum P. (2018). *Digital Biomarkers of Cognitive Function.* [https://www.nature.com/articles/d42473-018-00044-7](https://www.nature.com/articles/d42473-018-00044-7)
* Mohr DC et al. (2017). *The Behavioral Intervention Technology Model.* [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5214270/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5214270/)


### **1. Description / How it's played**

* Players complete **5 reaction time trials**.
* Wait for the box to turn **green**, then click as quickly as possible.
* Clicking before the green signal counts as a **false start**.

### **2. Purpose**

* Assess psychomotor speed and sustained attention.
* Evaluate response inhibition and impulsivity.
* Measure consistency of reaction performance across multiple trials.

### **3. What it measures**

* Average reaction time.
* Fastest reaction time.
* Reaction time consistency (standard deviation).
* Number of false starts (impulsive responses).

### **4. How it predicts health**

* Slower or inconsistent reaction times may indicate reduced attention, fatigue, stress, cognitive impairment, or neurological dysfunction.
* Frequent false starts can reflect impulsivity and reduced inhibitory control, commonly observed in ADHD and other executive function disorders.
* Reaction time testing is widely used for early cognitive screening and monitoring mental and neurological health. **This assessment is intended for screening, not diagnosis.**

### **References**

* Deary IJ, Liewald D, Nissan J. (2011). *A Free, Easy-To-Use, Computer-Based Simple and Four-Choice Reaction Time Programme.* [https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026139](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026139)
* Salthouse TA. (2000). *Aging and Measures of Processing Speed.* [https://psycnet.apa.org/record/2000-13352-001](https://psycnet.apa.org/record/2000-13352-001)
* Woods DL, Wyma JM, Yund EW, Herron TJ, Reed B. (2015). *Factors Influencing the Latency of Simple Reaction Time.* [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4456887/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4456887/)
* National Institute of Neurological Disorders and Stroke (NINDS). [https://www.ninds.nih.gov/](https://www.ninds.nih.gov/)


### **1. Description / How it's played**

* Players select **9 images** that they find most visually appealing or emotionally resonant.
* Each selected image is replaced with a new one until all selections are completed.
* The system analyzes the emotional categories of the selected images.

### **2. Purpose**

* Assess emotional preference and affective bias.
* Evaluate emotional tendencies through visual choices.
* Identify dominant emotional patterns and current emotional state.

### **3. What it measures**

* Number of selections for each emotion category (Happy, Calm, Neutral, Sad, Angry).
* Dominant emotional preference.
* Emotional distribution across all selections.
* Emotional resilience score.

### **4. How it predicts health**

* Visual preference tasks can reveal **affective bias**, which is associated with emotional processing and mental well-being.
* A strong preference for negative emotional imagery may be associated with elevated stress, anxiety, or depressive symptoms, while preference for positive or calming images may reflect better emotional well-being.
* When combined with cognitive assessments, these patterns can support early screening and monitoring of emotional and psychological health. **This assessment is intended for screening, not diagnosis.**

### **References**

* Leppänen JM. (2006). *Emotional Information Processing in Mood Disorders.* [https://pubmed.ncbi.nlm.nih.gov/17145174/](https://pubmed.ncbi.nlm.nih.gov/17145174/)
* Elliott R, Rubinsztein JS, Sahakian BJ, Dolan RJ. (2002). *The Neural Basis of Mood-Congruent Processing Biases.* [https://pubmed.ncbi.nlm.nih.gov/12457760/](https://pubmed.ncbi.nlm.nih.gov/12457760/)
* Beck AT. (1976). *Cognitive Therapy and the Emotional Disorders.* [https://books.google.com/books?id=fKaHAAAAMAAJ](https://books.google.com/books?id=fKaHAAAAMAAJ)
* National Institute of Mental Health (NIMH). [https://www.nimh.nih.gov/health/topics/depression](https://www.nimh.nih.gov/health/topics/depression)


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