import type { QuizContent } from "@/content/schemas";

export const FUTURE_DOCTOR_QUIZZES: QuizContent[] = [
  {
    id: "quiz-doc-1",
    careerId: "future-doctor",
    i18n: {
      en: {
        title: "Human Physiology & Emergency Triage",
        description: "Test circulatory basics, normal heart rate, and first-aid priorities.",
      },
      ms: {
        title: "Fisiologi Manusia & Triage Kecemasan",
        description: "Uji asas peredaran darah, kadar nadi normal, dan keutamaan pertolongan cemas.",
      },
    },
    questions: [
      {
        id: "doc1-q1",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which organ pumps oxygenated blood throughout the human body?",
            options: [
              { label: "A", text: "The Heart", explanation: "The heart pumps oxygen-rich blood through arteries to tissues." },
              { label: "B", text: "The Stomach", explanation: "The stomach digests food." },
              { label: "C", text: "The Femur", explanation: "The femur is the thigh bone." },
              { label: "D", text: "The Gallbladder", explanation: "The gallbladder stores bile." },
            ],
          },
          ms: {
            question: "Organ manakah mengepam darah beroksigen ke seluruh badan manusia?",
            options: [
              { label: "A", text: "Jantung", explanation: "Jantung mengepam darah beroksigen melalui arteri ke tisu badan." },
              { label: "B", text: "Perut", explanation: "Perut mencerna makanan." },
              { label: "C", text: "Femur", explanation: "Femur ialah tulang paha." },
              { label: "D", text: "Pundi hempedu", explanation: "Pundi hempedu menyimpan hempedu." },
            ],
          },
        },
      },
      {
        id: "doc1-q2",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What is a normal resting heart rate for healthy teens aged 13–15?",
            options: [
              { label: "A", text: "60 to 100 beats per minute", explanation: "60–100 bpm is the standard resting range for teens and adults." },
              { label: "B", text: "300 to 400 beats per minute", explanation: "Dangerously fast." },
              { label: "C", text: "10 to 15 beats per minute", explanation: "Critically low." },
              { label: "D", text: "0 beats per minute", explanation: "Indicates cardiac arrest." },
            ],
          },
          ms: {
            question: "Apakah kadar nadi rehat normal bagi remaja sihat berumur 13–15 tahun?",
            options: [
              { label: "A", text: "60 hingga 100 denyutan seminit", explanation: "60–100 bpm ialah julat rehat standard bagi remaja dan dewasa." },
              { label: "B", text: "300 hingga 400 denyutan seminit", explanation: "Terlalu laju dan berbahaya." },
              { label: "C", text: "10 hingga 15 denyutan seminit", explanation: "Terlalu rendah." },
              { label: "D", text: "0 denyutan seminit", explanation: "Menandakan henti jantung." },
            ],
          },
        },
      },
      {
        id: "doc1-q3",
        skillId: "communication",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What does 'triage' mean in a hospital emergency department?",
            options: [
              { label: "A", text: "Serving lunch to visitors", explanation: "Unrelated to clinical care." },
              { label: "B", text: "Sorting patients so the most urgent cases are treated first", explanation: "Triage saves lives by prioritizing critical injuries." },
              { label: "C", text: "Locking the clinic door", explanation: "Emergency rooms stay open." },
              { label: "D", text: "Guessing without checking vitals", explanation: "Triage checks vitals and symptoms." },
            ],
          },
          ms: {
            question: "Apakah maksud 'triage' di jabatan kecemasan hospital?",
            options: [
              { label: "A", text: "Menghidangkan makanan kepada pelawat", explanation: "Tiada kaitan dengan rawatan klinikal." },
              { label: "B", text: "Menyusun keutamaan pesakit supaya kes paling kritikal dirawat dahulu", explanation: "Triage menyelamatkan nyawa dengan mendahulukan kes kritikal." },
              { label: "C", text: "Mengunci pintu klinik", explanation: "Bilik kecemasan sentiasa dibuka." },
              { label: "D", text: "Meneka tanpa memeriksa tanda vital", explanation: "Triage memeriksa tanda vital dan simptom." },
            ],
          },
        },
      },
      {
        id: "doc1-q4",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question: "What is the first step when a classmate shows signs of heat exhaustion?",
            options: [
              { label: "A", text: "Tell them to sprint another 400m", explanation: "Exercise worsens overheating." },
              { label: "B", text: "Cover them in heavy winter blankets", explanation: "Blankets trap heat." },
              { label: "C", text: "Move them to shade, cool with damp cloths, and sip water", explanation: "Shade, cooling, and hydration stabilize heat exhaustion." },
              { label: "D", text: "Ignore the dizziness", explanation: "Heat exhaustion can progress to heat stroke if ignored." },
            ],
          },
          ms: {
            question: "Apakah langkah pertama apabila rakan menunjukkan tanda kelesuan haba?",
            options: [
              { label: "A", text: "Minta mereka berlari pecut 400m lagi", explanation: "Senaman memburukkan kepanasan." },
              { label: "B", text: "Selimutkan dengan selimut tebal", explanation: "Selimut memerangkap haba." },
              { label: "C", text: "Pindahkan ke tempat teduh, sejukkan dengan kain lembap, dan minum air", explanation: "Teduh, penyejukan, dan air menstabilkan keadaan." },
              { label: "D", text: "Abaikan rasa pening", explanation: "Kelesuan haba boleh menjadi strok haba jika diabaikan." },
            ],
          },
        },
      },
      {
        id: "doc1-q5",
        skillId: "accessibility",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Why should doctors explain diagnoses in simple, everyday words?",
            options: [
              { label: "A", text: "So patients and families understand how to take care of themselves safely", explanation: "Clear communication improves treatment safety and trust." },
              { label: "B", text: "Because medical terms don't exist", explanation: "Medical terms exist, but plain language helps patients." },
              { label: "C", text: "To avoid writing prescriptions", explanation: "Prescriptions are still written accurately." },
              { label: "D", text: "To rush patients out", explanation: "Clear dialogue builds understanding." },
            ],
          },
          ms: {
            question: "Mengapakah doktor patut menerangkan diagnosis dengan perkataan yang mudah?",
            options: [
              { label: "A", text: "Supaya pesakit dan keluarga faham cara menjaga diri dengan selamat", explanation: "Komunikasi jelas meningkatkan keselamatan rawatan." },
              { label: "B", text: "Kerana istilah perubatan tidak wujud", explanation: "Istilah wujud, tetapi bahasa mudah membantu pesakit." },
              { label: "C", text: "Untuk mengelak menulis preskripsi", explanation: "Preskripsi tetap ditulis dengan tepat." },
              { label: "D", text: "Untuk menghalau pesakit cepat", explanation: "Dialog jelas membina kefahaman." },
            ],
          },
        },
      },
    ],
  },
  {
    id: "quiz-doc-2",
    careerId: "future-doctor",
    i18n: {
      en: {
        title: "Antibiotics, Hygiene & Immunity",
        description: "Check your understanding of bacteria vs viruses and infection prevention.",
      },
      ms: {
        title: "Antibiotik, Kebersihan & Imuniti",
        description: "Semak kefahaman bakteria vs virus serta pencegahan jangkitan.",
      },
    },
    questions: [
      {
        id: "doc2-q1",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Why don't antibiotics cure the common cold?",
            options: [
              { label: "A", text: "Colds are caused by cold air only", explanation: "Colds are caused by viruses." },
              { label: "B", text: "Antibiotics kill bacteria, while colds are caused by viruses", explanation: "Taking antibiotics for viruses is ineffective and drives resistance." },
              { label: "C", text: "Antibiotics are only vitamins", explanation: "Antibiotics are targeted antimicrobial drugs." },
              { label: "D", text: "Colds only happen in winter", explanation: "Colds occur year-round." },
            ],
          },
          ms: {
            question: "Mengapakah antibiotik tidak menyembuhkan selesema biasa?",
            options: [
              { label: "A", text: "Selesema disebabkan udara sejuk semata-mata", explanation: "Selesema berpunca daripada virus." },
              { label: "B", text: "Antibiotik membunuh bakteria, sedangkan selesema disebabkan virus", explanation: "Mengambil antibiotik untuk virus tidak berkesan dan mencetuskan kerintangan." },
              { label: "C", text: "Antibiotik hanyalah vitamin", explanation: "Antibiotik ialah ubat antimikrob khusus." },
              { label: "D", text: "Selesema hanya berlaku pada musim sejuk", explanation: "Selesema berlaku sepanjang tahun." },
            ],
          },
        },
      },
      {
        id: "doc2-q2",
        skillId: "accessibility",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which simple habit is one of the best ways to stop clinic infections?",
            options: [
              { label: "A", text: "Washing hands with soap and water or sanitizer between patients", explanation: "Hand hygiene breaks infection transmission chains." },
              { label: "B", text: "Reusing single-use gloves", explanation: "Gloves must be changed between patients." },
              { label: "C", text: "Never opening windows", explanation: "Good ventilation helps reduce airborne germs." },
              { label: "D", text: "Sharing water bottles", explanation: "Sharing bottles spreads germs." },
            ],
          },
          ms: {
            question: "Amalan mudah manakah paling berkesan menghalang jangkitan di klinik?",
            options: [
              { label: "A", text: "Membasuh tangan dengan sabun dan air atau pensanitasi antara pesakit", explanation: "Kebersihan tangan memutuskan rantaian jangkitan." },
              { label: "B", text: "Mengguna semula sarung tangan pakai buang", explanation: "Sarung tangan mesti ditukar bagi setiap pesakit." },
              { label: "C", text: "Tidak pernah membuka tingkap", explanation: "Pengudaraan baik mengurangkan kuman udara." },
              { label: "D", text: "Berkongsi botol air", explanation: "Berkongsi botol menyebarkan kuman." },
            ],
          },
        },
      },
      {
        id: "doc2-q3",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question: "What does 'homeostasis' mean in biology?",
            options: [
              { label: "A", text: "Staying inside a house all day", explanation: "Unrelated to biology." },
              { label: "B", text: "Running as fast as possible", explanation: "Exercise raises heart rate temporarily." },
              { label: "C", text: "Maintaining steady internal body temperature and fluid balance", explanation: "Homeostasis keeps cells functioning within safe limits." },
              { label: "D", text: "Sleeping for 24 hours", explanation: "Normal sleep is 8–9 hours for teens." },
            ],
          },
          ms: {
            question: "Apakah maksud 'homeostasis' dalam biologi?",
            options: [
              { label: "A", text: "Duduk di dalam rumah sepanjang hari", explanation: "Tiada kaitan dengan biologi." },
              { label: "B", text: "Berlari sepantas mungkin", explanation: "Senaman menaikkan nadi buat sementara." },
              { label: "C", text: "Mengekalkan keseimbangan suhu dalaman dan cecair badan yang stabil", explanation: "Homeostasis memastikan sel berfungsi dalam julat selamat." },
              { label: "D", text: "Tidur selama 24 jam", explanation: "Tidur normal remaja ialah 8–9 jam." },
            ],
          },
        },
      },
      {
        id: "doc2-q4",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Why should a patient finish a prescribed antibiotic course unless told otherwise by a doctor?",
            options: [
              { label: "A", text: "Stopping early can leave surviving bacteria that become resistant", explanation: "Completing prescribed courses clears the infection properly." },
              { label: "B", text: "To make the bottle lighter", explanation: "Not a medical reason." },
              { label: "C", text: "Because pills expire in 5 minutes", explanation: "Pills have printed expiry dates." },
              { label: "D", text: "To replace sleep", explanation: "Rest is also needed." },
            ],
          },
          ms: {
            question: "Mengapakah pesakit perlu menghabiskan kursus antibiotik yang ditetapkan doktor?",
            options: [
              { label: "A", text: "Berhenti awal boleh meninggalkan bakteria yang kemudian menjadi rintang", explanation: "Menghabiskan dos menghapuskan jangkitan dengan sempurna." },
              { label: "B", text: "Supaya botol ubat menjadi ringan", explanation: "Bukan sebab perubatan." },
              { label: "C", text: "Kerana pil tamat tempoh dalam 5 minit", explanation: "Pil mempunyai tarikh luput." },
              { label: "D", text: "Untuk menggantikan tidur", explanation: "Rehat tetap diperlukan." },
            ],
          },
        },
      },
      {
        id: "doc2-q5",
        skillId: "communication",
        correctLabel: "D",
        i18n: {
          en: {
            question: "How do vaccines help protect communities?",
            options: [
              { label: "A", text: "They cure broken bones", explanation: "Bones heal through immobilization and care." },
              { label: "B", text: "They replace drinking water", explanation: "Hydration is separate." },
              { label: "C", text: "They change hair color", explanation: "Vaccines train the immune system." },
              { label: "D", text: "They train the immune system to recognize germs safely before real exposure", explanation: "Memory cells respond quickly if the real germ arrives." },
            ],
          },
          ms: {
            question: "Bagaimanakah vaksin membantu melindungi komuniti?",
            options: [
              { label: "A", text: "Ia menyembuhkan tulang patah", explanation: "Tulang patah pulih dengan rawatan ortopedik." },
              { label: "B", text: "Ia menggantikan air minuman", explanation: "Air tetap penting." },
              { label: "C", text: "Ia menukar warna rambut", explanation: "Vaksin melatih sistem imun." },
              { label: "D", text: "Ia melatih sistem imun mengenal pasti kuman secara selamat sebelum pendedahan sebenar", explanation: "Sel memori bertindak pantas apabila kuman sebenar datang." },
            ],
          },
        },
      },
    ],
  },
  {
    id: "quiz-doc-3",
    careerId: "future-doctor",
    i18n: {
      en: {
        title: "Clinical Reasoning & Vital Signs",
        description: "Practice gathering patient history and interpreting vital signs.",
      },
      ms: {
        title: "Pertimbangan Klinikal & Tanda Vital",
        description: "Latih mengumpul sejarah pesakit dan mentafsir tanda vital.",
      },
    },
    questions: [
      {
        id: "doc3-q1",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question: "Which 4 measurements make up classic vital signs?",
            options: [
              { label: "A", text: "Temperature, heart rate, respiratory rate, and blood pressure", explanation: "These four give an immediate snapshot of body stability." },
              { label: "B", text: "Height, shoe size, favorite color, and age", explanation: "Not vital signs." },
              { label: "C", text: "Screen time and Wi-Fi speed", explanation: "Not medical measurements." },
              { label: "D", text: "Hair length and backpack weight", explanation: "Not vital signs." },
            ],
          },
          ms: {
            question: "4 ukuran manakah membentuk tanda vital klasik?",
            options: [
              { label: "A", text: "Suhu, kadar nadi, kadar pernafasan, dan tekanan darah", explanation: "Empat ukuran ini memberi gambaran segera kestabilan badan." },
              { label: "B", text: "Tinggi, saiz kasut, warna kegemaran, dan umur", explanation: "Bukan tanda vital." },
              { label: "C", text: "Masa skrin dan kelajuan Wi-Fi", explanation: "Bukan ukuran perubatan." },
              { label: "D", text: "Panjang rambut dan berat beg", explanation: "Bukan tanda vital." },
            ],
          },
        },
      },
      {
        id: "doc3-q2",
        skillId: "communication",
        correctLabel: "B",
        i18n: {
          en: {
            question: "Why do doctors ask open-ended questions like 'What brings you in today?'",
            options: [
              { label: "A", text: "To waste appointment time", explanation: "Open questions save time by surfacing key clues." },
              { label: "B", text: "To let the patient describe symptoms in their own words", explanation: "Patients often reveal crucial context when invited to speak freely." },
              { label: "C", text: "To avoid checking temperature", explanation: "Doctors both listen and examine." },
              { label: "D", text: "To test spelling", explanation: "Unrelated." },
            ],
          },
          ms: {
            question: "Mengapakah doktor bertanya soalan terbuka seperti 'Apakah keluhan anda hari ini?'",
            options: [
              { label: "A", text: "Untuk membazir masa", explanation: "Soalan terbuka membantu mengenal pasti petunjuk utama." },
              { label: "B", text: "Supaya pesakit dapat menghuraikan simptom dengan kata-kata sendiri", explanation: "Pesakit sering berkongsi maklumat penting apabila diberi ruang." },
              { label: "C", text: "Untuk mengelak memeriksa suhu", explanation: "Doktor mendengar dan memeriksa pesakit." },
              { label: "D", text: "Untuk menguji ejaan", explanation: "Tidak berkaitan." },
            ],
          },
        },
      },
      {
        id: "doc3-q3",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question: "Which SPM subjects are essential if you aim for Medicine in Malaysia?",
            options: [
              { label: "A", text: "Visual Arts and Catering only", explanation: "Medicine requires strong science foundations." },
              { label: "B", text: "Geography and Accounting only", explanation: "Science subjects are required." },
              { label: "C", text: "Biology, Chemistry, Physics, and Mathematics", explanation: "Malaysian medical schools require strong SPM Science and Math." },
              { label: "D", text: "No subjects are needed", explanation: "Medical entry is competitive and science-based." },
            ],
          },
          ms: {
            question: "Subjek SPM manakah penting jika anda menyasarkan bidang Perubatan di Malaysia?",
            options: [
              { label: "A", text: "Seni Visual dan Katering sahaja", explanation: "Perubatan memerlukan asas sains yang kukuh." },
              { label: "B", text: "Geografi dan Perakaunan sahaja", explanation: "Subjek sains diperlukan." },
              { label: "C", text: "Biologi, Kimia, Fizik, dan Matematik", explanation: "Fakulti perubatan Malaysia memerlukan keputusan Sains dan Matematik yang baik." },
              { label: "D", text: "Tiada subjek diperlukan", explanation: "Kemasukan perubatan berasaskan sains." },
            ],
          },
        },
      },
      {
        id: "doc3-q4",
        skillId: "accessibility",
        correctLabel: "A",
        i18n: {
          en: {
            question: "What does patient confidentiality require from medical staff?",
            options: [
              { label: "A", text: "Keeping patient health records private and sharing only with authorized care teams", explanation: "Confidentiality builds trust and protects dignity." },
              { label: "B", text: "Posting X-rays on social media", explanation: "Sharing patient records publicly violates ethics and law." },
              { label: "C", text: "Talking loudly about patients in a café", explanation: "Private health details must not be shared in public." },
              { label: "D", text: "Leaving charts unlocked on a hallway bench", explanation: "Records must be secured." },
            ],
          },
          ms: {
            question: "Apakah tuntutan kerahsiaan pesakit daripada kakitangan perubatan?",
            options: [
              { label: "A", text: "Menjaga privasi rekod kesihatan dan hanya berkongsi dengan pasukan rawatan dibenarkan", explanation: "Kerahsiaan membina kepercayaan dan melindungi maruah pesakit." },
              { label: "B", text: "Memuat naik gambar X-ray di media sosial", explanation: "Berkongsi rekod pesakit secara awam melanggar etika." },
              { label: "C", text: "Bercakap kuat tentang pesakit di kafe", explanation: "Maklumat kesihatan tidak boleh dibincang di tempat awam." },
              { label: "D", text: "Meninggalkan fail di bangku koridor", explanation: "Rekod mesti disimpan dengan selamat." },
            ],
          },
        },
      },
      {
        id: "doc3-q5",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question: "What is a 'differential diagnosis'?",
            options: [
              { label: "A", text: "Prescribing five random medicines", explanation: "Never prescribe randomly." },
              { label: "B", text: "A shortlist of possible causes tested systematically with exams and labs", explanation: "Doctors compare candidate causes before confirming the diagnosis." },
              { label: "C", text: "A car repair manual", explanation: "Unrelated." },
              { label: "D", text: "A hospital billing receipt", explanation: "Unrelated." },
            ],
          },
          ms: {
            question: "Apakah maksud 'diagnosis pembezaan' (differential diagnosis)?",
            options: [
              { label: "A", text: "Memberi lima ubat secara rawak", explanation: "Jangan sesekali memberi ubat secara rawak." },
              { label: "B", text: "Senarai pendek punca yang mungkin, diuji secara sistematik melalui pemeriksaan dan makmal", explanation: "Doktor membandingkan kemungkinan sebelum mengesahkan diagnosis." },
              { label: "C", text: "Manual membaiki kereta", explanation: "Tidak berkaitan." },
              { label: "D", text: "Resit bil hospital", explanation: "Tidak berkaitan." },
            ],
          },
        },
      },
    ],
  },
];
