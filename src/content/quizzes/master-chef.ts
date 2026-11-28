import type { QuizContent } from "../schemas";

export const MASTER_CHEF_QUIZZES: QuizContent[] = [
  {
    id: "chef-quiz-safety",
    careerId: "master-chef",
    i18n: {
      en: {
        title: "Kitchen Safety & Mise en Place",
        description:
          "Test your fundamentals on food safety temperatures, knife handling, and prep discipline.",
      },
      ms: {
        title: "Keselamatan Dapur & Mise en Place",
        description:
          "Uji asas anda tentang suhu keselamatan makanan, pengendalian pisau, dan disiplin penyediaan.",
      },
    },
    questions: [
      {
        id: "chef-q1",
        skillId: "problem-solving",
        correctLabel: "B",
        i18n: {
          en: {
            question:
              "What is the food-safety 'Temperature Danger Zone' where bacteria multiply rapidly?",
            options: [
              {
                label: "A",
                text: "0°C to 4°C",
                explanation:
                  "0°C to 4°C is standard refrigeration temperature that slows bacterial growth.",
              },
              {
                label: "B",
                text: "5°C to 60°C",
                explanation:
                  "Correct! Between 5°C and 60°C (41°F–140°F), pathogens grow fastest, so food must not linger there.",
              },
              {
                label: "C",
                text: "75°C to 100°C",
                explanation:
                  "75°C and above kills most common foodborne bacteria.",
              },
              {
                label: "D",
                text: "-18°C to -5°C",
                explanation:
                  "Freezer temperatures keep bacteria dormant rather than multiplying rapidly.",
              },
            ],
          },
          ms: {
            question:
              "Apakah 'Zon Bahaya Suhu' keselamatan makanan di mana bakteria membiak dengan cepat?",
            options: [
              {
                label: "A",
                text: "0°C hingga 4°C",
                explanation:
                  "0°C hingga 4°C ialah suhu peti sejuk biasa yang memperlahankan pertumbuhan bakteria.",
              },
              {
                label: "B",
                text: "5°C hingga 60°C",
                explanation:
                  "Betul! Antara 5°C hingga 60°C, patogen membiak paling pantas, jadi makanan tidak boleh dibiarkan lama dalam julat ini.",
              },
              {
                label: "C",
                text: "75°C hingga 100°C",
                explanation:
                  "Suhu 75°C ke atas membunuh kebanyakan bakteria bawaan makanan.",
              },
              {
                label: "D",
                text: "-18°C hingga -5°C",
                explanation:
                  "Suhu penyejuk beku mengekalkan bakteria dalam keadaan tidak aktif.",
              },
            ],
          },
        },
      },
      {
        id: "chef-q2",
        skillId: "communication",
        correctLabel: "C",
        i18n: {
          en: {
            question:
              "What does the French culinary term 'mise en place' mean in practice?",
            options: [
              {
                label: "A",
                text: "Cooking all proteins well-done",
                explanation:
                  "Mise en place is about preparation before cooking, not doneness.",
              },
              {
                label: "B",
                text: "Serving dessert before appetizers",
                explanation:
                  "Course order is unrelated to mise en place.",
              },
              {
                label: "C",
                text: "Everything in its place: measuring, chopping, and organizing before heat goes on",
                explanation:
                  "Correct! Full mise en place keeps service fast, calm, and consistent.",
              },
              {
                label: "D",
                text: "Washing dishes only after the restaurant closes",
                explanation:
                  "Clean-as-you-go is good kitchen discipline, whereas mise en place is pre-service setup.",
              },
            ],
          },
          ms: {
            question:
              "Apakah maksud istilah kulinari Perancis 'mise en place' dalam amalan dapur?",
            options: [
              {
                label: "A",
                text: "Memasak semua protein sehingga masak sepenuhnya",
                explanation:
                  "Mise en place merujuk kepada penyediaan sebelum memasak, bukan tahap kematangan.",
              },
              {
                label: "B",
                text: "Menghidangkan pencuci mulut sebelum pembuka selera",
                explanation:
                  "Susunan hidangan tiada kaitan dengan mise en place.",
              },
              {
                label: "C",
                text: "Segalanya di tempatnya: menyukat, memotong, dan menyusun sebelum api dibuka",
                explanation:
                  "Betul! Mise en place yang lengkap memastikan servis pantas, tenang, dan konsisten.",
              },
              {
                label: "D",
                text: "Membasuh pinggan hanya selepas restoran ditutup",
                explanation:
                  "Membersih sambil bekerja ialah disiplin dapur, manakala mise en place ialah persediaan sebelum servis.",
              },
            ],
          },
        },
      },
      {
        id: "chef-q3",
        skillId: "problem-solving",
        correctLabel: "A",
        i18n: {
          en: {
            question:
              "How should you prevent cross-contamination when prepping raw chicken and fresh salad greens?",
            options: [
              {
                label: "A",
                text: "Use separate color-coded cutting boards and knives, and wash hands between tasks",
                explanation:
                  "Correct! Dedicated boards, utensils, and handwashing stop raw poultry pathogens from reaching ready-to-eat greens.",
              },
              {
                label: "B",
                text: "Wipe the wooden board with a dry kitchen towel after chicken",
                explanation:
                  "A dry towel leaves bacteria behind and spreads contamination.",
              },
              {
                label: "C",
                text: "Rinse raw chicken in the sink next to the salad bowl",
                explanation:
                  "Rinsing raw chicken splashes bacteria onto nearby surfaces and produce.",
              },
              {
                label: "D",
                text: "Cut the chicken first and flip the same board over for salad",
                explanation:
                  "Flipping the board contaminates the counter and risks transfer.",
              },
            ],
          },
          ms: {
            question:
              "Bagaimanakah cara mengelakkan pencemaran silang apabila menyediakan ayam mentah dan sayur salad segar?",
            options: [
              {
                label: "A",
                text: "Gunakan papan pemotong dan pisau berkod warna berasingan serta basuh tangan antara tugasan",
                explanation:
                  "Betul! Papan, peralatan khas, dan basuhan tangan menghalang patogen ayam mentah daripada terkena sayur sedia dimakan.",
              },
              {
                label: "B",
                text: "Lap papan kayu dengan tuala dapur kering selepas memotong ayam",
                explanation:
                  "Tuala kering meninggalkan bakteria dan menyebarkan pencemaran.",
              },
              {
                label: "C",
                text: "Bilas ayam mentah di singki bersebelahan mangkuk salad",
                explanation:
                  "Membilas ayam mentah memercikkan bakteria ke permukaan dan bahan berhampiran.",
              },
              {
                label: "D",
                text: "Potong ayam dahulu dan terbalikkan papan yang sama untuk salad",
                explanation:
                  "Menterbalikkan papan mencemarkan kaunter dan berisiko memindahkan bakteria.",
              },
            ],
          },
        },
      },
      {
        id: "chef-q4",
        skillId: "accessibility",
        correctLabel: "D",
        i18n: {
          en: {
            question:
              "Which hand posture protects your fingertips while slicing vegetables quickly?",
            options: [
              {
                label: "A",
                text: "Flat palm resting on top of the ingredient",
                explanation:
                  "A flat palm leaves fingertips exposed to the blade edge.",
              },
              {
                label: "B",
                text: "Holding the ingredient with fingertips extended forward",
                explanation:
                  "Extended fingertips are the most common cause of prep cuts.",
              },
              {
                label: "C",
                text: "Using no guide hand at all",
                explanation:
                  "Without a guide hand, round ingredients roll unpredictably.",
              },
              {
                label: "D",
                text: "The 'claw grip' with fingertips tucked under and knuckles guiding the blade",
                explanation:
                  "Correct! The claw grip keeps fingertips safely tucked while knuckles guide consistent slices.",
              },
            ],
          },
          ms: {
            question:
              "Postur tangan manakah yang melindungi hujung jari anda semasa menghiris sayur dengan pantas?",
            options: [
              {
                label: "A",
                text: "Tapak tangan rata di atas bahan",
                explanation:
                  "Tapak tangan rata mendedahkan hujung jari kepada mata pisau.",
              },
              {
                label: "B",
                text: "Memegang bahan dengan hujung jari terjulur ke hadapan",
                explanation:
                  "Hujung jari yang terjulur ialah punca paling kerap berlakunya luka semasa penyediaan.",
              },
              {
                label: "C",
                text: "Tidak menggunakan tangan panduan langsung",
                explanation:
                  "Tanpa tangan panduan, bahan bulat mudah bergolek tanpa kawalan.",
              },
              {
                label: "D",
                text: "'Genggaman cakar' (claw grip) dengan hujung jari dilipat ke dalam dan buku jari memandu bilah",
                explanation:
                  "Betul! Genggaman cakar melindungi hujung jari sambil buku jari memandu hirisan yang sekata.",
              },
            ],
          },
        },
      },
      {
        id: "chef-q5",
        skillId: "communication",
        correctLabel: "B",
        i18n: {
          en: {
            question:
              "Why should cooks call out 'Behind!' or 'Sharp!' when moving through a busy kitchen?",
            options: [
              {
                label: "A",
                text: "To impress guests in the dining room",
                explanation:
                  "Kitchen calls are internal safety communication for staff, not for guests.",
              },
              {
                label: "B",
                text: "To alert teammates in blind spots and prevent collisions with hot pans or knives",
                explanation:
                  "Correct! Clear verbal callouts prevent burns, drops, and knife accidents in tight spaces.",
              },
              {
                label: "C",
                text: "To signal that service has ended",
                explanation:
                  "Service end is called by the pass/expo, not 'Behind!' or 'Sharp!'.",
              },
              {
                label: "D",
                text: "To ask for extra salt",
                explanation:
                  "Callouts warn of movement hazards, not seasoning requests.",
              },
            ],
          },
          ms: {
            question:
              "Mengapakah tukang masak perlu menyebut 'Behind!' atau 'Sharp!' apabila bergerak di dapur yang sibuk?",
            options: [
              {
                label: "A",
                text: "Untuk mengagumkan tetamu di ruang makan",
                explanation:
                  "Panggilan dapur ialah komunikasi keselamatan dalaman untuk pasukan dapur.",
              },
              {
                label: "B",
                text: "Untuk memberi amaran kepada rakan sekerja di titik buta dan mengelakkan perlanggaran dengan kuali panas atau pisau",
                explanation:
                  "Betul! Panggilan lisan yang jelas mengelakkan kecederaan melecur dan pisau di ruang sempit.",
              },
              {
                label: "C",
                text: "Untuk menandakan servis telah tamat",
                explanation:
                  "Penamatan servis diumumkan oleh ketua dapur, bukan panggilan 'Behind!' atau 'Sharp!'.",
              },
              {
                label: "D",
                text: "Untuk meminta garam tambahan",
                explanation:
                  "Panggilan ini memberi amaran bahaya pergerakan, bukan permintaan perasa.",
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: "chef-quiz-techniques",
    careerId: "master-chef",
    i18n: {
      en: {
        title: "Heat, Flavor & Service Control",
        description:
          "Master seasoning balance, Maillard browning, and plating discipline.",
      },
      ms: {
        title: "Haba, Rasa & Kawalan Servis",
        description:
          "Kuasai keseimbangan perasa, pemerangan Maillard, dan disiplin penyajian.",
      },
    },
    questions: [
      {
        id: "chef-t1",
        skillId: "problem-solving",
        correctLabel: "C",
        i18n: {
          en: {
            question:
              "Why does overcrowding a skillet prevent meat from searing properly?",
            options: [
              {
                label: "A",
                text: "The skillet becomes too hot",
                explanation:
                  "Adding too much cold food actually drops pan temperature rather than raising it.",
              },
              {
                label: "B",
                text: "Salt stops dissolving when pieces touch",
                explanation:
                  "Salt dissolves in moisture regardless of spacing.",
              },
              {
                label: "C",
                text: "Trapped steam lowers pan heat and steams the meat instead of triggering the Maillard reaction",
                explanation:
                  "Correct! Moisture cannot evaporate fast enough, keeping the surface around 100°C instead of browning above 140°C.",
              },
              {
                label: "D",
                text: "Oil turns into butter at high density",
                explanation:
                  "Oil does not chemically turn into butter.",
              },
            ],
          },
          ms: {
            question:
              "Mengapakah memenuhi kuali secara berlebihan menghalang daging daripada memanggang (sear) dengan baik?",
            options: [
              {
                label: "A",
                text: "Kuali menjadi terlalu panas",
                explanation:
                  "Menambah terlalu banyak bahan sejuk sebenarnya menurunkan suhu kuali.",
              },
              {
                label: "B",
                text: "Garam berhenti larut apabila kepingan bersentuhan",
                explanation:
                  "Garam larut dalam kelembapan tanpa mengira jarak.",
              },
              {
                label: "C",
                text: "Wap terperangkap menurunkan haba kuali dan mengukus daging bukannya mencetuskan tindak balas Maillard",
                explanation:
                  "Betul! Kelembapan tidak dapat menyejat dengan pantas, menyebabkan suhu kekal sekitar 100°C dan gagal memerang.",
              },
              {
                label: "D",
                text: "Minyak bertukar menjadi mentega apabila padat",
                explanation:
                  "Minyak tidak bertukar menjadi mentega.",
              },
            ],
          },
        },
      },
      {
        id: "chef-t2",
        skillId: "communication",
        correctLabel: "A",
        i18n: {
          en: {
            question:
              "A rich braised dish tastes heavy and flat even though it has enough salt. Which addition most often brightens it?",
            options: [
              {
                label: "A",
                text: "A touch of acid such as lemon juice or vinegar",
                explanation:
                  "Correct! Acidity cuts richness and lifts aromatics without making the dish taste sour.",
              },
              {
                label: "B",
                text: "Double the butter",
                explanation:
                  "More fat will make an already heavy dish feel even heavier.",
              },
              {
                label: "C",
                text: "Plain ice water",
                explanation:
                  "Water dilutes flavor instead of sharpening it.",
              },
              {
                label: "D",
                text: "Raw flour",
                explanation:
                  "Raw flour adds a pasty taste and does not brighten flavor.",
              },
            ],
          },
          ms: {
            question:
              "Hidangan rebusan pekat terasa berat dan hambar walaupun garamnya mencukupi. Tambahan manakah yang paling kerap menyerlahkan rasanya?",
            options: [
              {
                label: "A",
                text: "Sedikit asid seperti jus lemon atau cuka",
                explanation:
                  "Betul! Keasidan mengimbangi rasa berlemak dan menaikkan aroma tanpa menjadikannya terlalu masam.",
              },
              {
                label: "B",
                text: "Gandakan mentega",
                explanation:
                  "Lebih banyak lemak menjadikan hidangan yang berat terasa semakin muak.",
              },
              {
                label: "C",
                text: "Air ais kosong",
                explanation:
                  "Air mencairkan rasa dan bukannya menajamkannya.",
              },
              {
                label: "D",
                text: "Tepung mentah",
                explanation:
                  "Tepung mentah memberi rasa bertepung dan tidak menyerlahkan rasa.",
              },
            ],
          },
        },
      },
      {
        id: "chef-t3",
        skillId: "problem-solving",
        correctLabel: "D",
        i18n: {
          en: {
            question:
              "Why should a seared steak rest on a warm rack for 5–10 minutes before slicing?",
            options: [
              {
                label: "A",
                text: "To let it cool completely to room temperature",
                explanation:
                  "Steak should still be served warm, not cold.",
              },
              {
                label: "B",
                text: "So the crust becomes soggy",
                explanation:
                  "A rack preserves crust crispness rather than making it soggy.",
              },
              {
                label: "C",
                text: "To remove all seasoning from the exterior",
                explanation:
                  "Resting does not remove seasoning.",
              },
              {
                label: "D",
                text: "So muscle fibers relax and juices redistribute instead of spilling onto the board",
                explanation:
                  "Correct! Resting allows internal pressure to equalize so each slice stays juicy.",
              },
            ],
          },
          ms: {
            question:
              "Mengapakah stik yang dipanggang perlu direhatkan di atas rak suam selama 5–10 minit sebelum dihiris?",
            options: [
              {
                label: "A",
                text: "Supaya ia sejuk sepenuhnya ke suhu bilik",
                explanation:
                  "Stik masih perlu dihidangkan panas/suam, bukan sejuk.",
              },
              {
                label: "B",
                text: "Supaya keraknya menjadi lembik",
                explanation:
                  "Rak mengekalkan kerangupan kerak dan bukannya melembikkannya.",
              },
              {
                label: "C",
                text: "Untuk menghilangkan semua perasa di luar",
                explanation:
                  "Proses merehatkan tidak menghilangkan perasa.",
              },
              {
                label: "D",
                text: "Supaya gentian otot relaks dan jus tersebar semula tanpa tumpah ke papan pemotong",
                explanation:
                  "Betul! Merehatkan daging menyamakan tekanan dalaman supaya setiap hirisan kekal berjus.",
              },
            ],
          },
        },
      },
      {
        id: "chef-t4",
        skillId: "accessibility",
        correctLabel: "B",
        i18n: {
          en: {
            question:
              "A guest reports a severe peanut allergy. What is the safest kitchen protocol?",
            options: [
              {
                label: "A",
                text: "Pick the peanuts off an existing salad and send it out",
                explanation:
                  "Even trace peanut residue can trigger anaphylaxis.",
              },
              {
                label: "B",
                text: "Prepare the dish from scratch with sanitized tools, fresh surfaces, and verified allergen-free ingredients",
                explanation:
                  "Correct! Full sanitation and dedicated prep protect guests from life-threatening cross-contact.",
              },
              {
                label: "C",
                text: "Cook the dish longer to burn off the allergen",
                explanation:
                  "Heat does not destroy peanut protein allergens.",
              },
              {
                label: "D",
                text: "Substitute peanut oil without telling the guest",
                explanation:
                  "Unrefined or mislabeled oils can still contain allergens and risk guest safety.",
              },
            ],
          },
          ms: {
            question:
              "Seorang tetamu melaporkan alahan kacang tanah yang teruk. Apakah protokol dapur yang paling selamat?",
            options: [
              {
                label: "A",
                text: "Keluarkan kacang tanah daripada salad sedia ada dan hidangkan",
                explanation:
                  "Kesan sisa kacang tanah yang sedikit pun boleh mencetuskan anafilaksis.",
              },
              {
                label: "B",
                text: "Sediakan hidangan dari awal menggunakan peralatan bersih, permukaan baharu, dan bahan bebas alergen yang disahkan",
                explanation:
                  "Betul! Sanitasi penuh dan penyediaan khusus melindungi tetamu daripada sentuhan silang yang berbahaya.",
              },
              {
                label: "C",
                text: "Masak hidangan lebih lama untuk menghapuskan alergen",
                explanation:
                  "Haba tidak memusnahkan protein alergen kacang tanah.",
              },
              {
                label: "D",
                text: "Gantikan dengan minyak kacang tanpa memberitahu tetamu",
                explanation:
                  "Minyak yang tidak ditapis atau salah label masih boleh mengandungi alergen.",
              },
            ],
          },
        },
      },
      {
        id: "chef-t5",
        skillId: "communication",
        correctLabel: "C",
        i18n: {
          en: {
            question:
              "What is the primary role of the 'expo' (expediter) at the kitchen pass during dinner rush?",
            options: [
              {
                label: "A",
                text: "Wash all pots and pans alone",
                explanation:
                  "Dishwashing is handled by the stewarding station, not the expediter.",
              },
              {
                label: "B",
                text: "Write new recipes mid-service",
                explanation:
                  "Menus are finalized before service, not rewritten during rush.",
              },
              {
                label: "C",
                text: "Coordinate ticket timing, inspect plate quality, and ensure every dish for a table goes out hot together",
                explanation:
                  "Correct! The expo is the bridge between stations and servers, ensuring temperature, garnish, and timing match the ticket.",
              },
              {
                label: "D",
                text: "Lock the walk-in cooler",
                explanation:
                  "Cooks need controlled access to prep backups as needed.",
              },
            ],
          },
          ms: {
            question:
              "Apakah peranan utama 'expo' (penyelaras hidangan) di kaunter servis semasa waktu puncak makan malam?",
            options: [
              {
                label: "A",
                text: "Membasuh semua periuk dan kuali seorang diri",
                explanation:
                  "Kerja membasuh diuruskan oleh bahagian pencucian, bukan penyelaras hidangan.",
              },
              {
                label: "B",
                text: "Menulis resipi baharu di tengah servis",
                explanation:
                  "Menu dimuktamadkan sebelum servis, bukan ditulis semula semasa waktu puncak.",
              },
              {
                label: "C",
                text: "Menyelaras masa pesanan, memeriksa kualiti pinggan, dan memastikan semua hidangan semeja keluar panas serentak",
                explanation:
                  "Betul! Expo menjadi penghubung antara stesen dapur dan pelayan agar suhu, hiasan, dan masa menepati pesanan.",
              },
              {
                label: "D",
                text: "Mengunci bilik sejuk",
                explanation:
                  "Tukang masak memerlukan akses terkawal kepada bahan simpanan apabila perlu.",
              },
            ],
          },
        },
      },
    ],
  },
];
