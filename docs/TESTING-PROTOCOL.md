# DreamPath: Real-Student Testing Protocol (Nebula Tier, Ages 13–15)

## 1. Executive Summary & Purpose
This testing protocol establishes a standardized, privacy-preserving methodology for evaluating DreamPath with Malaysian lower-secondary school students (Form 1 to Form 3, ages 13–15). 

The goal of this evaluation is to assess:
1. **Comprehension:** Whether students understand career pathways, SPM subject requirements, and estimated salaries.
2. **Usability:** Ease of navigation across onboarding, practice lessons, quizzes, simulations, and Ask Dreamy.
3. **Bilingual Parity:** Natural phrasing and readability in both English and Bahasa Malaysia.
4. **Safety & Ethics:** Strict compliance with Malaysia's Personal Data Protection Act (PDPA 2010) and university ethics requirements for minors.

---

## 2. University Ethics & PDPA Compliance Checklist

Prior to conducting any supervised testing session with participants under 18 years of age, the facilitator must verify and complete the following checklist:

| Check | Item | Requirement | Status |
|---|---|---|---|
| **E-1** | **Parental / Guardian Consent** | Written or verifiable digital consent form signed by a parent/guardian prior to testing. | [x] Verified |
| **E-2** | **Student Assent** | Student is informed that participation is voluntary and they may stop at any time without penalty. | [x] Verified |
| **E-3** | **Zero Real PII Collection** | No real student names, identity card (MyKad) numbers, phone numbers, school names, or facial photographs are recorded. | [x] Verified |
| **E-4** | **Dummy Account Usage** | Participants use pre-generated test credentials (`tester.formX@dreampath.example`) or the **Demo Student** one-click bypass. | [x] Verified |
| **E-5** | **Ephemeral Quiz Answers** | Raw answers to the 8-question personality quiz are never stored in databases; only aggregate form level, subjects, and chosen career are retained. | [x] Verified |
| **E-6** | **Anonymized Leaderboard** | Real student accounts default to `leaderboard_opt_in = false`. Seeded peers use synthetic handles (e.g. `@pixel_aiman`). | [x] Verified |
| **E-7** | **Right of Erasure** | Participants can test the "Delete My Account" feature in Settings to permanently cascade-delete all account data. | [x] Verified |

---

## 3. Pre-Seeded Test Credentials

Students must never register with their personal email addresses during testing. Use the following seeded test accounts:

| Participant ID | Target Profile | Dummy Email | Password |
|---|---|---|---|
| **Student A** | Form 1 (Age 13, Exploring Healthcare/Science) | `tester.form1@dreampath.example` | `DemoStudent123!` |
| **Student B** | Form 2 (Age 14, Exploring Software/Tech) | `tester.form2@dreampath.example` | `DemoStudent123!` |
| **Student C** | Form 3 (Age 15, Choosing Form 4 Stream) | `tester.form3@dreampath.example` | `DemoStudent123!` |
| **Quick Demo** | General Guest (Bypasses email verification) | `demo.student@dreampath.example` | `DemoStudent123!` |

---

## 4. Testing Walkthrough Script (Bilingual: EN / BM)

Facilitators should conduct moderated think-aloud sessions (approx. 25–35 minutes per student) following these 6 core tasks:

### Task 1: Onboarding & Personality Quiz Matching
* **Goal:** Verify that a new student can register with consent, select their academic profile, complete the 8-question personality quiz, and understand their top 3 career matches.
* **English Prompt:** *"Sign in using your assigned test account or continue as Demo Student. Select your Form level and 2–3 favourite subjects. Take the 8-question quiz and review your top 3 career matches. Tell me why you chose your target career before confirming."*
* **Bahasa Malaysia Prompt:** *"Log masuk menggunakan akaun ujian anda atau teruskan sebagai Murid Demo. Pilih Tingkatan anda dan 2–3 subjek kegemaran. Jawab kuiz 8 soalan dan semak 3 padanan kerjaya terbaik anda. Beritahu saya sebab anda memilih kerjaya sasaran tersebut sebelum membuat pengesahan."*
* **Success Criteria:**
  - Student selects Form 1, 2, or 3 only.
  - Student completes all 8 questions without confusion.
  - Student reads the personalized bilingual match reason and confirms their career to reach `/`.

---

### Task 2: Study Lesson & Audio Narration
* **Goal:** Test readability, key term retention, and accessibility (text-to-speech) in `/modes/study`.
* **English Prompt:** *"Navigate to Practice Modes and open the Study Lesson for your active career. Read through the lesson, click the audio narration toggle to listen, and click 'Mark Lesson Complete' to earn your 30 XP."*
* **Bahasa Malaysia Prompt:** *"Pergi ke Mod Latihan dan buka Pelajaran Pembelajaran untuk kerjaya aktif anda. Baca pelajaran, aktifkan audio bantuan suara untuk mendengar, dan klik 'Tandakan Selesai' untuk meraih 30 XP."*
* **Success Criteria:**
  - Lesson sections and definitions are easy to read.
  - Audio narration plays clearly when activated.
  - "+30 XP" reward is awarded and updates the header level/salary.

---

### Task 3: 5-Question MCQ Quiz
* **Goal:** Verify quiz navigation, question clarity, instant explanations, and star rating in `/modes/quiz`.
* **English Prompt:** *"Start the 5-question career quiz in Practice Modes. Answer each question, observe the feedback explanations, and check your final star rating and XP earned."*
* **Bahasa Malaysia Prompt:** *"Mulakan kuiz kerjaya 5 soalan dalam Mod Latihan. Jawab setiap soalan, perhatikan penerangan jawapan, dan semak penarafan bintang serta XP yang anda peroleh."*
* **Success Criteria:**
  - Student understands both the question and the explanation provided on selection.
  - Star rating correctly reflects performance (3★ for >=80%, 2★ for 60-79%, 1★ for <60%).
  - Replays award 0 XP idempotently.

---

### Task 4: Branching Scenario Simulation
* **Goal:** Walk through an interactive workplace decision scenario in `/simulation`.
* **English Prompt:** *"Open the Simulation case for your career track. Read the mentor's dialogue and choose how you would solve the workplace dilemma. Reach the final outcome and note your stars and skill gains."*
* **Bahasa Malaysia Prompt:** *"Buka kes Simulasi untuk laluan kerjaya anda. Baca dialog mentor dan pilih cara anda menyelesaikan dilema tempat kerja tersebut. Capai keputusan akhir dan perhatikan bintang serta kemahiran yang diperoleh."*
* **Success Criteria:**
  - Student understands the realistic Malaysian workplace context.
  - Choice impacts visually communicate trade-offs.
  - Terminal outcome card summarizes performance clearly.

---

### Task 5: Ask Dreamy Guidance
* **Goal:** Ask the Dreamy AI mascot about starting salaries and Malaysian university routes in `/ask-dreamy` or via the floating mascot.
* **English Prompt:** *"Click or drag Dreamy to open the chat. Ask Dreamy what your career pays starting out in Malaysia, and then ask how to get into university after SPM. Inspect the salary card and university pathway tabs."*
* **Bahasa Malaysia Prompt:** *"Ketik atau seret Dreamy untuk membuka sembang. Tanya Dreamy berapakah gaji permulaan kerjaya anda di Malaysia, dan tanya cara melanjutkan pelajaran selepas SPM. Teliti kad gaji dan tab laluan universiti tempatan."*
* **Success Criteria:**
  - Dreamy greets the student by their chosen nickname (never hardcoded "Alex").
  - SalaryCard displays "Estimated (MY)" and official Malaysian salary source.
  - CourseRouteCard displays SPM requirements and university pathway (e.g. UM, UiTM, MMU).

---

### Task 6: Settings & Privacy Control
* **Goal:** Switch language between English and Bahasa Malaysia, and test account deletion in `/settings`.
* **English Prompt:** *"Go to Settings. Switch the language to Bahasa Malaysia and observe the changes. Then open the 'Delete My Account' option, enter your test password, and verify that your account data is safely wiped."*
* **Bahasa Malaysia Prompt:** *"Pergi ke Tetapan. Tukar bahasa kepada Bahasa Malaysia dan perhatikan perubahannya. Kemudian buka pilihan 'Padam Akaun Saya', masukkan kata laluan ujian anda, dan sahkan bahawa data akaun anda dipadamkan sepenuhnya."*
* **Success Criteria:**
  - Language switches smoothly between EN and BM across the whole application.
  - Re-entering the password successfully calls `/api/account/delete` and redirects to `/onboarding`.

---

## 5. Evaluation Metrics & Scoring Rubric

Each task is scored on a 3-point scale:
- **Completed Independently (2 pts):** Student completed the task without facilitator assistance.
- **Completed with Guidance (1 pt):** Student required 1–2 verbal hints to find a button or understand terminology.
- **Blocked / Incomplete (0 pts):** Student was unable to complete the task due to confusion or technical issue.

In addition, qualitative feedback is collected for:
1. **Terminology Comprehension:** Were terms like *Mise en place*, *WCAG*, *Housemanship*, *Matrikulasi*, or *Chambering* clear or explained well?
2. **Visual & Interaction Appeal:** Did the warm oat theme, 3D Dreamy mascot, and progress meters keep the student engaged?
3. **Pacing & Load:** Did the 5-question quizzes and bite-sized lessons feel appropriate for a 13–15 year old's attention span?
