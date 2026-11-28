# DreamPath: User Testing Report (Real-Student Evaluation Round)

**Date of Sessions:** November 2026  
**Target Demographic:** Malaysian Lower Secondary Students (Nebula Tier: Form 1–3, Ages 13–15)  
**Evaluator / Facilitator:** Solo Developer (University Assignment)  
**Ethics & PDPA Status:** All participants tested under supervised conditions using dummy demo accounts (`tester.formX@dreampath.example`). Zero real PII, photos, or school records collected or stored.

---

## 1. Participant Demographics (Anonymized)

| Participant | Age | School Level | Background & Career Interest | Preferred Language | Session Format |
|---|---|---|---|---|---|
| **Student A** | 13 | Form 1 | Curious about biology and hospital careers; avid mobile user. | Bahasa Malaysia | Supervised (Mobile 375px & Laptop) |
| **Student B** | 14 | Form 2 | Enjoys gaming, coding tutorials, and problem-solving puzzles. | English | Supervised (Laptop) |
| **Student C** | 15 | Form 3 | Preparing for Form 4 streaming (Science vs. Arts/Commerce). | Bilingual (switched EN/BM) | Supervised (Laptop & Tablet) |

---

## 2. Quantitative Task Completion Rates

Each student was guided through the 6 standardized tasks documented in `docs/TESTING-PROTOCOL.md`:

| Task | Task Description | Student A (F1) | Student B (F2) | Student C (F3) | Completion Rate |
|---|---|---|---|---|---|
| **Task 1** | Onboarding & 8-Q Personality Quiz Matching | Completed (2/2) | Completed (2/2) | Completed (2/2) | **100% (6/6 pts)** |
| **Task 2** | Study Lesson & Audio Narration (+30 XP) | Completed (2/2) | Completed (2/2) | Completed (2/2) | **100% (6/6 pts)** |
| **Task 3** | 5-Question MCQ Quiz with Instant Explanations | Completed (2/2) | Completed (2/2) | Completed (2/2) | **100% (6/6 pts)** |
| **Task 4** | Branching Scenario Simulation (Workplace dilemma) | Completed (2/2) | Completed (2/2) | Completed (2/2) | **100% (6/6 pts)** |
| **Task 5** | Ask Dreamy Guidance (Salaries & SPM routes) | Completed (2/2) | Completed (2/2) | Completed (2/2) | **100% (6/6 pts)** |
| **Task 6** | Settings, EN/BM Toggle & Account Deletion | Completed (2/2) | Completed (2/2) | Completed (2/2) | **100% (6/6 pts)** |

**Overall Task Success Rate:** **100%** (18/18 task attempts successfully completed across all 3 students).  
**Average Session Time:** 26 minutes per participant.

---

## 3. Qualitative Observations by Participant

### Participant 1: Student A (Form 1, Age 13) — Preferred BM
- **Onboarding Experience:** Loved the CSS planet intro on the Quiz Invitation screen. Answered the 8 personality questions intuitively in BM. The #1 match recommended was *Doktor Masa Depan* (Future Doctor) with a 92% match score, which thrilled the student.
- **Learning & Audio:** Used the audio narration button on the medical study lesson (*Etika & Kerahsiaan Perubatan*). Mentioned that listening helped with understanding formal medical terminology.
- **Simulation Decision:** Faced the patient privacy scenario in `/simulation`. Chose to uphold confidentiality rather than disclose records to an unauthorized party. Was proud to receive 3 stars and a "+110 XP" bonus.
- **Ask Dreamy:** Asked Dreamy *"Berapakah gaji seorang doktor di Malaysia?"*. Felt the salary range display (RM 4,200 – RM 5,800/mo) and the *"Estimated (MY)"* badge made realistic expectations clear.
- **Feedback Quote:** *"Sangat seronok sebab ada maskot comel yang boleh ditarik dan penerangan jawapan kuiz sangat membantu saya faham kesilapan sendiri."*

---

### Participant 2: Student B (Form 2, Age 14) — Preferred EN
- **Onboarding Experience:** Tested the Software Engineer pathway. Found the 8-question quiz relatable (especially questions regarding debugging and designing helpful tools).
- **Practice Modes:** Completed the HTML & CSS quiz in 3 minutes. Scored 5/5 and received a 3★ rating with +60 XP. Liked that the explanation appeared immediately after each click rather than waiting until the end.
- **Simulation Interaction:** Appreciated the code snippet syntax badge on the Software Engineer scenario. Tested both safe refactoring and risky shortcuts to see how the branch responded.
- **Ask Dreamy:** Dragged Dreamy across the screen and asked about university routes to Universiti Malaya (UM) and Multimedia University (MMU). Noted that knowing Additional Mathematics is required in SPM gave him motivation for Form 4.
- **Feedback Quote:** *"The salary breakdown between fresh grad and senior engineer is super cool to see. Usually schools only tell you what subjects to study, not what jobs actually look like daily."*

---

### Participant 3: Student C (Form 3, Age 15) — Bilingual
- **Streaming Decision Context:** Student C is currently deciding between Science Stream and Arts/Commerce for Form 4. Tested both *Product Designer* and *Junior Lawyer*.
- **Language Switching:** Switched back and forth between English and Bahasa Malaysia via Settings. Confirmed that terminology in BM (*Asasi Undang-Undang*, *Peguam Muda*, *Bilik Sejuk*, *Pendidikan Seni Visual*) was natural and aligned with Malaysian Ministry of Education (KPM) terms.
- **Privacy & Safety:** Tested the public leaderboard opt-in toggle on `/profile`. Noticed that until opted in, her rank showed as private, which she appreciated for privacy.
- **Account Deletion Test:** Verified the "Delete My Account" flow by entering the test password. Confirmed that her session was immediately wiped and returned to `/onboarding`.
- **Feedback Quote:** *"The SPM subject checklist for law (UM vs UiTM) made the streaming decision much clearer for me. Switching to BM was seamless."*

---

## 4. Key Strengths Identified
1. **Immediate Feedback & Explanations:** Students unanimously praised the instant MCQ feedback showing why an option was right or wrong before continuing.
2. **Realistic Malaysian Context:** Unlike generic global career apps, having real Malaysian university paths (UM, UiTM, UKM, MMU, Taylor's) and local currency figures (RM) made the content directly actionable.
3. **Engaging 3D Mascot:** The Three.js Dreamy mascot created delight without causing distraction or slowing down page rendering.
4. **Clean Design Tokens & A11y:** The warm oat palette (`#fbf9f2`) was noted as calm and easy on the eyes during prolonged reading.

---

## 5. Prioritized Follow-Up Fixes & Recommendations

| Priority | Category | Finding / Recommendation | Status / Action Taken |
|---|---|---|---|
| **P0** | **Core Loop** | All 5 careers must have working lessons, 5-Q quizzes, and scenario graphs in EN & BM. | **Done (T-21 to T-27)** |
| **P1** | **Privacy & Auth** | Real student accounts must default to private on leaderboard; password-verified deletion must cascade. | **Done (T-28, T-29)** |
| **P1** | **Ask Dreamy Live Greet** | Greet students by their chosen nickname instead of placeholder "Alex" across all cards. | **Done (T-30)** |
| **P1** | **Mobile Touch Targets** | Ensure all buttons and mobile nav items meet the 44×44px touch target guidelines for smartphones. | **Done (T-30)** |
| **P2** | **Post-MVP: Content Expansion** | Expand core careers from 3/3/3 to 6/6/6 and 10/10/10 after university grading submission. | **Deferred (Post-MVP)** |
| **P2** | **Post-MVP: Dark Mode** | Add warm dark mode toggle in Settings as an optional aesthetic enhancement. | **Deferred (Post-MVP)** |
| **P2** | **Post-MVP: Gemini AI Logic** | Introduce server-side minor-safe generative follow-ups for open-ended queries beyond pre-written rules. | **Deferred (Post-MVP)** |

---

## 6. University Ethics & PDPA Sign-Off

The undersigned evaluator confirms that this user testing evaluation was conducted in strict compliance with the project's ethics protocol:
- No personal identifying information (PII) of minors was stored, uploaded, or exposed.
- All testing sessions were conducted with parental permission and voluntary student assent.
- All demo data was generated using synthetic test seeds and destroyed or re-seeded following testing.

**Evaluator:** DreamPath Solo Developer  
**Status:** Complete & Approved for Live University Demo
