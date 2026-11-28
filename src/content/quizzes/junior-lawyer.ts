import type { QuizContent } from "@/content/schemas";

export const JUNIOR_LAWYER_QUIZZES: QuizContent[] = [
  {
    id: "quiz-law-1",
    careerId: "junior-lawyer",
    i18n: {
      en: {
        title: "Legal Principles & Civic Fairness",
        description: "Test presumption of innocence, cross-examination, and binding contracts.",
      },
      ms: {
        title: "Prinsip Undang-Undang & Keadilan Sivik",
        description: "Uji anggapan tidak bersalah, pemeriksaan balas, dan kontrak yang sah.",
      },
    },
    questions: [
      {
        id: "law1-q1",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What does 'Presumption of Innocence' mean?",
            options: [
              { label: "A", text: "A person is innocent until proven guilty by law", explanation: "The prosecution bears the burden of proof." },
              { label: "B", text: "Everyone in court wears matching outfits", explanation: "Dress has no bearing on legal innocence." },
              { label: "C", text: "The judge decides before hearing witnesses", explanation: "Pre-judging violates fair trial rights." },
              { label: "D", text: "Whoever speaks loudest wins", explanation: "Courts rely on law and evidence." },
            ],
          },
          ms: {
            question: "Apakah maksud 'Anggapan Tidak Bersalah'?",
            options: [
              { label: "A", text: "Seseorang dianggap tidak bersalah sehingga dibuktikan bersalah oleh undang-undang", explanation: "Beban pembuktian terletak pada pihak pendakwaan." },
              { label: "B", text: "Semua orang di mahkamah memakai pakaian seragam", explanation: "Pakaian tiada kaitan dengan prinsip ini." },
              { label: "C", text: "Hakim membuat keputusan sebelum saksi bersuara", explanation: "Menghukum awal melanggar hak perbicaraan adil." },
              { label: "D", text: "Sesiapa yang bersuara paling kuat menang", explanation: "Mahkamah bergantung pada undang-undang dan bukti." },
            ],
          },
        },
      },
      {
        id: "law1-q2",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Why is cross-examination important in a trial?",
            options: [
              { label: "A", text: "To test accuracy, consistency, and credibility of testimony", explanation: "Cross-examination checks reliability of witness accounts." },
              { label: "B", text: "To replace written statutes with guesses", explanation: "Statutes remain binding." },
              { label: "C", text: "To skip evidence review", explanation: "It strengthens evidence review." },
              { label: "D", text: "To extend lunch breaks", explanation: "It is a core truth-seeking step." },
            ],
          },
          ms: {
            question: "Mengapakah pemeriksaan balas penting dalam perbicaraan?",
            options: [
              { label: "A", text: "Untuk menguji ketepatan, konsistensi, dan kredibiliti keterangan saksi", explanation: "Pemeriksaan balas menyemak kebolehpercayaan keterangan." },
              { label: "B", text: "Untuk menggantikan statut bertulis dengan tekaan", explanation: "Undang-undang bertulis kekal terpakai." },
              { label: "C", text: "Untuk melangkau semakan bukti", explanation: "Ia mengukuhkan semakan bukti." },
              { label: "D", text: "Untuk memanjangkan waktu rehat", explanation: "Ia langkah penting mencari kebenaran." },
            ],
          },
        },
      },
      {
        id: "law1-q3",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What makes a contract legally binding?",
            options: [
              { label: "A", text: "Mutual agreement, consideration, and lawful purpose", explanation: "Contracts create enforceable duties when these elements exist." },
              { label: "B", text: "A secret handshake with no terms", explanation: "Secret gestures are not enforceable contracts." },
              { label: "C", text: "A fictional story", explanation: "Fiction is not a legal agreement." },
              { label: "D", text: "An unsigned blank page", explanation: "Terms must be clear and agreed." },
            ],
          },
          ms: {
            question: "Apakah yang menjadikan kontrak sah di sisi undang-undang?",
            options: [
              { label: "A", text: "Persetujuan bersama, balasan, dan tujuan yang sah", explanation: "Kontrak mewujudkan tanggungjawab sah apabila elemen ini ada." },
              { label: "B", text: "Jabat tangan rahsia tanpa terma", explanation: "Isyarat rahsia bukan kontrak sah." },
              { label: "C", text: "Cerita rekaan", explanation: "Cereka bukan perjanjian undang-undang." },
              { label: "D", text: "Halaman kosong tanpa tandatangan", explanation: "Terma mesti jelas dan dipersetujui." },
            ],
          },
        },
      },
      {
        id: "law1-q4",
        skillId: "communication",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Before advising a client on a fee dispute, what should a lawyer inspect first?",
            options: [
              { label: "A", text: "Social media comments", explanation: "Comments are hearsay, not primary terms." },
              { label: "B", text: "Signed quotations, contracts, and written receipts", explanation: "Primary written documents show what was agreed." },
              { label: "C", text: "Horoscopes", explanation: "Not legal evidence." },
              { label: "D", text: "Random guesses", explanation: "Lawyers rely on verified facts." },
            ],
          },
          ms: {
            question: "Sebelum menasihati klien mengenai pertikaian caj, apakah yang patut disemak dahulu?",
            options: [
              { label: "A", text: "Komen media sosial", explanation: "Komen bukan terma utama." },
              { label: "B", text: "Sebut harga bertandatangan, kontrak, dan resit bertulis", explanation: "Dokumen bertulis membuktikan persetujuan asal." },
              { label: "C", text: "Ramalan bintang", explanation: "Bukan bukti undang-undang." },
              { label: "D", text: "Tekaan rawak", explanation: "Peguam bergantung pada fakta sah." },
            ],
          },
        },
      },
      {
        id: "law1-q5",
        skillId: "accessibility",
        correctLabel: "C",
        i18n: {
          en: {
            question: "Why should legal terms be explained in plain language to students?",
            options: [
              { label: "A", text: "To make documents longer", explanation: "Plain language makes documents clearer, not longer." },
              { label: "B", text: "To hide important clauses", explanation: "Plain language increases transparency." },
              { label: "C", text: "So everyone can understand their rights and give informed consent", explanation: "Accessible language empowers people to make fair decisions." },
              { label: "D", text: "To avoid writing agreements", explanation: "Written clarity is still essential." },
            ],
          },
          ms: {
            question: "Mengapakah istilah undang-undang patut diterangkan dalam bahasa mudah kepada pelajar?",
            options: [
              { label: "A", text: "Untuk memanjangkan dokumen", explanation: "Bahasa mudah menjadikan dokumen lebih jelas." },
              { label: "B", text: "Untuk menyembunyikan klausa penting", explanation: "Bahasa mudah meningkatkan ketelusan." },
              { label: "C", text: "Supaya semua orang faham hak mereka dan dapat memberi keizinan termaklum", explanation: "Bahasa mudah memperkasakan keputusan yang adil." },
              { label: "D", text: "Untuk mengelak menulis perjanjian", explanation: "Kejelasan bertulis masih penting." },
            ],
          },
        },
      },
    ],
  },
  {
    id: "quiz-law-2",
    careerId: "junior-lawyer",
    i18n: {
      en: {
        title: "Evidence, Due Process & Ethics",
        description: "Practice distinguishing direct evidence, due process, and ethical advocacy.",
      },
      ms: {
        title: "Bukti, Proses Wajar & Etika",
        description: "Latih membezakan bukti langsung, proses wajar, dan advokasi beretika.",
      },
    },
    questions: [
      {
        id: "law2-q1",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which is an example of direct evidence?",
            options: [
              { label: "A", text: "A signed receipt or clear CCTV footage of the event", explanation: "Direct evidence proves a fact without extra inference." },
              { label: "B", text: "An unverified rumour from another class", explanation: "Rumour is not reliable direct evidence." },
              { label: "C", text: "A dream someone had", explanation: "Not evidence." },
              { label: "D", text: "A blank notebook", explanation: "Contains no record." },
            ],
          },
          ms: {
            question: "Manakah contoh bukti langsung?",
            options: [
              { label: "A", text: "Resit bertandatangan atau rakaman CCTV yang jelas", explanation: "Bukti langsung membuktikan fakta tanpa andaian tambahan." },
              { label: "B", text: "Khabar angin daripada kelas lain", explanation: "Khabar angin bukan bukti langsung yang sah." },
              { label: "C", text: "Mimpi seseorang", explanation: "Bukan bukti." },
              { label: "D", text: "Buku nota kosong", explanation: "Tiada rekod." },
            ],
          },
        },
      },
      {
        id: "law2-q2",
        skillId: "communication",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What does 'right to be heard' require before imposing a penalty?",
            options: [
              { label: "A", text: "Deciding secretly without telling the person", explanation: "Secret decisions deny fairness." },
              { label: "B", text: "Allowing the person to explain their side and present evidence", explanation: "Hearing both sides is central to natural justice." },
              { label: "C", text: "Only listening to one side", explanation: "Both sides must be heard." },
              { label: "D", text: "Ignoring all logs", explanation: "Logs are key objective evidence." },
            ],
          },
          ms: {
            question: "Apakah tuntutan 'hak untuk didengari' sebelum mengenakan hukuman?",
            options: [
              { label: "A", text: "Membuat keputusan secara rahsia", explanation: "Keputusan rahsia menafikan keadilan." },
              { label: "B", text: "Membenarkan individu menerangkan pihak mereka dan mengemukakan bukti", explanation: "Mendengar kedua-dua pihak ialah teras keadilan asasi." },
              { label: "C", text: "Hanya mendengar satu pihak", explanation: "Kedua-dua pihak mesti didengari." },
              { label: "D", text: "Mengabaikan semua rekod", explanation: "Rekod ialah bukti objektif penting." },
            ],
          },
        },
      },
      {
        id: "law2-q3",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question: "If a lawyer discovers a document that disproves their client's claim, what should they do?",
            options: [
              { label: "A", text: "Shred the document immediately", explanation: "Destroying evidence is illegal and unethical." },
              { label: "B", text: "Pretend it never existed in court", explanation: "Lawyers have a duty of candour to the court." },
              { label: "C", text: "Advise the client honestly and uphold legal ethics", explanation: "Integrity and honesty to the court come first." },
              { label: "D", text: "Blame the printer", explanation: "Unprofessional and dishonest." },
            ],
          },
          ms: {
            question: "Jika peguam menemui dokumen yang menyangkal tuntutan klien, apakah tindakan beretika?",
            options: [
              { label: "A", text: "Memusnahkan dokumen itu segera", explanation: "Memusnahkan bukti menyalahi undang-undang." },
              { label: "B", text: "Berpura-pura ia tidak wujud di mahkamah", explanation: "Peguam wajib jujur kepada mahkamah." },
              { label: "C", text: "Menasihati klien secara jujur dan mematuhi etika guaman", explanation: "Integriti dan kejujuran kepada mahkamah adalah utama." },
              { label: "D", text: "Menyalahkan pencetak", explanation: "Tidak profesional." },
            ],
          },
        },
      },
      {
        id: "law2-q4",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Why is calm, respectful mediation often better than an immediate lawsuit?",
            options: [
              { label: "A", text: "It saves time, reduces stress, and preserves community relationships", explanation: "Mediation resolves everyday disputes faster and fairly." },
              { label: "B", text: "It avoids checking any facts", explanation: "Mediation still relies on facts." },
              { label: "C", text: "It guarantees someone gets angry", explanation: "Mediation lowers conflict." },
              { label: "D", text: "It is only for sports games", explanation: "Mediation applies across civil disputes." },
            ],
          },
          ms: {
            question: "Mengapakah mediasi yang tenang sering lebih baik daripada saman serta-merta?",
            options: [
              { label: "A", text: "Ia menjimatkan masa, mengurangkan tekanan, dan memelihara hubungan", explanation: "Mediasi menyelesaikan pertikaian harian dengan lebih cepat dan adil." },
              { label: "B", text: "Ia mengelak daripada menyemak fakta", explanation: "Mediasi tetap bergantung pada fakta." },
              { label: "C", text: "Ia memastikan orang marah", explanation: "Mediasi meredakan konflik." },
              { label: "D", text: "Ia hanya untuk sukan", explanation: "Mediasi digunakan dalam pelbagai pertikaian sivil." },
            ],
          },
        },
      },
      {
        id: "law2-q5",
        skillId: "accessibility",
        correctLabel: "D",
        i18n: {
          en: {
            question: "What does 'Rule of Law' guarantee in Malaysia?",
            options: [
              { label: "A", text: "Only adults have to follow traffic rules", explanation: "Laws apply broadly." },
              { label: "B", text: "Rules change silently every hour", explanation: "Laws must be public and predictable." },
              { label: "C", text: "Powerful people are exempt from laws", explanation: "No one is above the law." },
              { label: "D", text: "Everyone is equal before publicly known laws", explanation: "Equality before the law protects every citizen." },
            ],
          },
          ms: {
            question: "Apakah jaminan 'Kedaulatan Undang-Undang' di Malaysia?",
            options: [
              { label: "A", text: "Hanya orang dewasa perlu patuh peraturan", explanation: "Undang-undang terpakai secara meluas." },
              { label: "B", text: "Peraturan berubah secara rahsia setiap jam", explanation: "Undang-undang mesti diketahui umum." },
              { label: "C", text: "Golongan berkuasa dikecualikan", explanation: "Tiada siapa mengatasi undang-undang." },
              { label: "D", text: "Semua orang sama taraf di sisi undang-undang yang diketahui umum", explanation: "Kesaksamaan di sisi undang-undang melindungi setiap rakyat." },
            ],
          },
        },
      },
    ],
  },
  {
    id: "quiz-law-3",
    careerId: "junior-lawyer",
    i18n: {
      en: {
        title: "PDPA Privacy & Student Safeguards",
        description: "Test data minimisation, parental consent, and digital privacy rights.",
      },
      ms: {
        title: "Privasi PDPA & Perlindungan Pelajar",
        description: "Uji pengurangan data, keizinan ibu bapa, dan hak privasi digital.",
      },
    },
    questions: [
      {
        id: "law3-q1",
        skillId: "accessibility",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What does 'Data Minimisation' mean when building a student app?",
            options: [
              { label: "A", text: "Collect home addresses and phone numbers just in case", explanation: "Collecting extra PII violates data minimisation." },
              { label: "B", text: "Collect only the minimum fields strictly needed for the feature", explanation: "Less stored PII means lower risk if data is ever exposed." },
              { label: "C", text: "Publish all emails on a public page", explanation: "Never expose private emails publicly." },
              { label: "D", text: "Store passwords in plain text", explanation: "Passwords must be hashed." },
            ],
          },
          ms: {
            question: "Apakah maksud 'Pengurangan Data' semasa membina aplikasi pelajar?",
            options: [
              { label: "A", text: "Kumpul alamat rumah dan nombor telefon sebagai persediaan", explanation: "Mengumpul data peribadi berlebihan melanggar prinsip ini." },
              { label: "B", text: "Kumpul hanya medan minimum yang benar-benar diperlukan", explanation: "Data minimum mengurangkan risiko pendedahan." },
              { label: "C", text: "Siarkan semua e-mel secara umum", explanation: "Jangan dedahkan e-mel peribadi." },
              { label: "D", text: "Simpan kata laluan sebagai teks biasa", explanation: "Kata laluan mesti dicincang." },
            ],
          },
        },
      },
      {
        id: "law3-q2",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Why must a 14-year-old student confirm parent/guardian permission at sign-up?",
            options: [
              { label: "A", text: "Because minors require guardian consent for personal data processing", explanation: "Consent protects young students online." },
              { label: "B", text: "To slow down registration", explanation: "It is a legal safeguard, not a delay." },
              { label: "C", text: "To share their phone number with advertisers", explanation: "Student data must never be sold or shared." },
              { label: "D", text: "To skip passwords", explanation: "Passwords are still required." },
            ],
          },
          ms: {
            question: "Mengapakah pelajar berumur 14 tahun perlu mengesahkan kebenaran penjaga semasa mendaftar?",
            options: [
              { label: "A", text: "Kerana pelajar bawah umur memerlukan keizinan penjaga untuk pemprosesan data", explanation: "Keizinan melindungi pelajar muda dalam talian." },
              { label: "B", text: "Untuk melambatkan pendaftaran", explanation: "Ia langkah keselamatan undang-undang." },
              { label: "C", text: "Untuk berkongsi nombor telefon dengan pengiklan", explanation: "Data pelajar tidak boleh dijual." },
              { label: "D", text: "Untuk melangkau kata laluan", explanation: "Kata laluan tetap diperlukan." },
            ],
          },
        },
      },
      {
        id: "law3-q3",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question: "What should happen when a student clicks 'Delete My Account' in Settings?",
            options: [
              { label: "A", text: "Keep all their data hidden in another table forever", explanation: "True deletion must remove their user data." },
              { label: "B", text: "Delete someone else's account", explanation: "Only the authenticated user's account may be deleted." },
              { label: "C", text: "Verify their password and cascade-delete their auth record and profile data", explanation: "Re-verifying password prevents accidental or unauthorized deletion." },
              { label: "D", text: "Simply hide the button", explanation: "Users have the right to delete their data." },
            ],
          },
          ms: {
            question: "Apakah patut berlaku apabila pelajar menekan 'Padam Akaun Saya' di Tetapan?",
            options: [
              { label: "A", text: "Simpan semua data secara tersembunyi selama-lamanya", explanation: "Pemadaman sebenar mesti membuang data pengguna." },
              { label: "B", text: "Padam akaun orang lain", explanation: "Hanya akaun pengguna yang disahkan boleh dipadam." },
              { label: "C", text: "Sahkan kata laluan dan padam rekod pengesahan serta profil secara berantai", explanation: "Pengesahan kata laluan mengelakkan pemadaman tidak sengaja." },
              { label: "D", text: "Sembunyikan butang sahaja", explanation: "Pengguna berhak memadam data mereka." },
            ],
          },
        },
      },
      {
        id: "law3-q4",
        skillId: "accessibility",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which fields are safe to show on a public student leaderboard?",
            options: [
              { label: "A", text: "Anonymous username/handle, avatar character, XP, and virtual salary", explanation: "No real names, emails, or school names should appear publicly." },
              { label: "B", text: "Full real name, home address, and IC number", explanation: "Exposing PII is unsafe." },
              { label: "C", text: "School name and parent email", explanation: "Never expose school or parent details." },
              { label: "D", text: "Login password", explanation: "Passwords are strictly secret." },
            ],
          },
          ms: {
            question: "Medan manakah selamat dipaparkan pada papan pendahulu pelajar awam?",
            options: [
              { label: "A", text: "Nama pengguna tanpa nama, aksara avatar, XP, dan gaji maya", explanation: "Tiada nama sebenar, e-mel, atau nama sekolah patut dipaparkan." },
              { label: "B", text: "Nama penuh sebenar, alamat rumah, dan nombor IC", explanation: "Mendedahkan PII adalah tidak selamat." },
              { label: "C", text: "Nama sekolah dan e-mel ibu bapa", explanation: "Jangan dedahkan butiran sekolah atau ibu bapa." },
              { label: "D", text: "Kata laluan log masuk", explanation: "Kata laluan adalah rahsia." },
            ],
          },
        },
      },
      {
        id: "law3-q5",
        skillId: "communication",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Before testing a student app with 14-year-olds, what should the team prepare?",
            options: [
              { label: "A", text: "Ask students to use their real bank passwords", explanation: "Never use real credentials in testing." },
              { label: "B", text: "Dummy demo accounts, ethics/PDPA checklist, and zero real PII in screenshots", explanation: "Using dummy accounts protects participant privacy." },
              { label: "C", text: "Post student photos without permission", explanation: "Never publish photos of minors without consent." },
              { label: "D", text: "Skip all instructions", explanation: "Clear protocols ensure safe, consistent testing." },
            ],
          },
          ms: {
            question: "Sebelum menguji aplikasi bersama pelajar berumur 14 tahun, apakah persediaan utama?",
            options: [
              { label: "A", text: "Minta pelajar guna kata laluan bank sebenar", explanation: "Jangan guna kelayakan sebenar semasa ujian." },
              { label: "B", text: "Akaun demo palsu, senarai semak etika/PDPA, dan sifar PII dalam tangkap layar", explanation: "Akaun demo melindungi privasi peserta." },
              { label: "C", text: "Siarkan foto pelajar tanpa kebenaran", explanation: "Jangan siarkan gambar pelajar bawah umur tanpa izin." },
              { label: "D", text: "Langkau semua arahan", explanation: "Protokol jelas memastikan ujian selamat." },
            ],
          },
        },
      },
    ],
  },
];
