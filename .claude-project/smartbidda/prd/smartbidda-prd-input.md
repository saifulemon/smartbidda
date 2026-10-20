# Client Answers — smartbidda
# Source: client-authored PRD (pasted), decisions confirmed 2026-10-17
# Mode: File input (generate-prd --full)

=== Pre-intake ===

1. App/Service name: **smartbidda**
2. App description: An AI-powered, gamified, Bangla-first Learning Management System (LMS) for Bangladeshi primary-level students (Class 1-5) and their parents, following the NCTB syllabus, with a comprehensive Parent Proxy dashboard for real-time progress tracking and automated remedial steps.
3. Launch platform: **Web first** (React.js). Mobile (Flutter / React Native) is **future scope** — explicitly out of MVP, retained in the PRD as a post-MVP phase. MVP = responsive web app that works on phones/tablets browsers.
4. Store listing: N/A for MVP (web). To be revisited when mobile is built.
5. Primary users: Primary-school students aged 6-11 (Class 1-5), their parents (aged 25-45), and Admin/Teachers.
6. Replacing an existing manual process: **B — completely new service** (no existing tool being replaced; complements traditional schooling).
7. Reference apps: NCTB-aligned content delivery; gamified kids' learning apps generally (Duolingo-style progression, localized for Bangladesh).
8. First-6-month user target: 100-1,000 users (assumed pending confirmation).

=== Business ===

1. Business Model: Freemium — free core learning modules; premium subscriptions or individual course purchases via local Mobile Financial Services (bKash, Nagad, Upay, SSLCommerz).
2. Success metrics: Student module-completion rate, quiz pass rate, daily active students, parent dashboard engagement, paid conversion.

=== Users ===

1. User Types (from PRD personas):
   - **Learner (Student)** — 6-11 years old (BD). Goals: learn through play, watch engaging Bangla content, earn virtual rewards. Pain: traditional studying feels boring; lacks motivation to complete modules alone.
   - **Observer (Parent)** — 25-45 years old (BD). Goals: monitor child's academic progress, screen time, specific weaknesses. Pain: unable to track exact digital activities; unaware of the child's specific academic gaps.
   - **Admin / Teacher** — adult (BD). Goals: upload NCTB-aligned Bangla/English content, manage leaderboard. Pain: difficulty manually grading and assigning individualized remedial tasks to every student.
2. User Status: active / inactive; student: locked (by parent), screen-time-limited.
3. User Relationships: Parent → 1..n Student (guardian link); Admin/Teacher → manages content for all students.

=== Design ===

1. Design reference: Child-friendly bilingual gamified UI — large icons, vibrant colors, voice-guided navigation.
2. Design direction: Bangla-first (default), English toggle in settings. Custom Bengali web fonts (Hind Siliguri, Kalpurush).
3. Reference sites: NCTB content portals; gamified kids learning apps.

=== Features ===

1. **Localization & Language Strategy**
   - Primary/default: Bengali (Bangla) — all UI, button text, voice-over guides, video animations, PDF materials natively in child-friendly Bangla.
   - Secondary: English — seamless toggle in settings. The "English" subject content is bilingual.
   - Voice & tone: clear, encouraging, locally relatable Bengali accents. Examples: "আজকের ক্লাসে তোমাকে স্বাগতম!", "দারুণ করেছ! চলো পরের ধাপে যাই!"

2. **Student Panel (Learning Interface)**
   - Bilingual gamified UI, large icons, vibrant colors, voice-guided navigation for pre-fluent readers.
   - NCTB-aligned curriculum: modules organized by class → subject → chapter.
   - Multimodal content: animated/interactive videos in Bangla + downloadable/readable PDF text materials.
   - Auto-triggered quizzes: mandatory quiz pops up immediately on module completion, in the selected language. Passing is required to unlock the next sequential lesson.
   - National leaderboard: real-time global ranking by points, among students of the same grade across Bangladesh.

3. **Evaluation & Remedial Module (The Exam Loop)**
   - Three standardized term exams per class, mimicking the Bangladeshi school system:
     1. First Term Exam (১ম সাময়িক)
     2. Half-Yearly Exam (অর্ধবার্ষিক)
     3. Annual Exam (বার্ষিক)
   - Performance-based retake mechanism: score below baseline (e.g. <60%) → cannot proceed to next module. AI evaluates incorrect answers and auto-curates a mandatory **"Retake Class"** (remedial video/PDF focused only on weak topics). Student must complete the Retake Class before the system unlocks the "Re-exam" option.

4. **Parent Panel (Proxy Dashboard)**
   - Proxy login: secure PIN or biometric auth → exclusive "Parent Mode" showing child's complete profile.
   - Screen time management: set daily app usage limits.
   - Real-time notification & tracking (Bangla + English):
     - Exam completion alert with score (e.g. "আপনার সন্তান গণিতে ৮৫% নম্বর পেয়েছে।")
     - Weakness alert & retake assignment (e.g. "বিজ্ঞানে আপনার সন্তানের স্কোর ৪৫%। AI তাকে 'উদ্ভিদ' চ্যাপ্টারের ওপর ২টি রিটেক ক্লাস দিয়েছে।")
     - Parental nudge: parent sends an on-screen prompt to the child's device.
     - Re-exam progress: alert when child finishes remedial class + "Before vs. After" progress chart.

5. **AI Integration**
   - Adaptive assessment engine: quiz difficulty adjusts dynamically to the student's real-time accuracy rate.
   - Predictive analytics: parent dashboard shows AI forecast of term exam outcomes based on daily quiz scores, highlighting chapters needing immediate revision.
   - Automated weakness detection: maps exact cognitive gaps (e.g. weak at fractions, strong at geometry) and selectively queues remedial content without human intervention.

6. **Content & Admin**
   - Admin/Teacher uploads NCTB-aligned Bangla/English content and manages the leaderboard.
   - Content types: animated/interactive video (Bangla), PDF study materials.

7. **Payments (Bangladesh local integrations)**
   - Mobile Financial Services (MFS): bKash, Nagad, Upay, SSLCommerz for premium subscriptions or course purchases.

=== Data ===

1. Data collected: student progress, quiz scores, exam scores, screen time usage, parent contacts, payment records.
2. Exportable: parent-facing progress reports, before/after remedial charts.

=== Technical ===

1. Stated by client (to be reconciled with pipeline capabilities):
   - Frontend: Flutter or React Native (mobile/tablet) + React.js (web). **Decision: MVP is web-only; mobile retained as future scope.** Must support custom Bengali web fonts (Hind Siliguri, Kalpurush).
   - Backend: Node.js or Python (FastAPI/Django). **Pipeline constraint: NestJS.**
   - Database: PostgreSQL and Firebase. **Pipeline constraint: PostgreSQL.**
   - AI/ML: OpenAI API for logic processing; Google Cloud Speech-to-Text with Bengali support for voice interactions.
   - Payment gateways: bKash, Nagad, Upay, SSLCommerz.

=== Other ===

1. Content is strictly NCTB-aligned, organized by class (1-5), subject, chapter.
2. Voice-guided navigation is important because target users are still developing reading skills.
3. Gamification (points, rewards, national leaderboard) is core to the motivation model.
