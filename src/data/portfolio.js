/** All personal content. Edit this file to update the portfolio. */
export const portfolio = {
  name: "Sakshi",
  fullName: "Sakshi Shah",
  availability: "Available for internships",
  roles: ["DEVELOPER", "UI/UX DESIGNER", "BUILDER", "VOCALIST", "LEADER"],
  contact: {
    github: "https://github.com/sakshishah240",
    linkedin: "https://www.linkedin.com/in/sakshi-shah-48b13b294",
    instagram: "",
    email: "sakshishah2406@gmail.com",
  },
  marquee: ["Thoughtful design", "Digital experiences", "Curious ideas"],
  tools: [
    ["Figma", "navy"],
    ["Canva", "blue"],
    ["GitHub", "lilac"],
  ],
  does: [
    ["UI / UX design", "mint"],
    ["Frontend development", "blue"],
    ["Prototyping", "lilac"],
    ["Machine learning (learning)", "navy"],
  ],
  skills: {
    LANGUAGES: {
      title: "CORE LANGUAGES",
      hue: "#c9dbff",
      chip: "#4a6ad4",
      txt: "#ffffff",
      items: ["Python", "C", "JavaScript", "CSS", "C++", "Java", "SQL"],
    },
    FRONTEND: {
      title: "FRONTEND ECOSYSTEM",
      hue: "#b8f3d4",
      chip: "#3f72c6",
      txt: "#ffffff",
      items: ["React", "Next.js", "GSAP", "Three.js", "Framer Motion", "HTML5"],
    },
    DATA: {
      title: "DATA & LIBRARIES",
      hue: "#ffe29a",
      chip: "#5564c8",
      txt: "#ffffff",
      items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Recharts"],
    },
    TOOLS: {
      title: "DEV & DESIGN TOOLS",
      hue: "#e4ccff",
      chip: "#5b5ec9",
      txt: "#ffffff",
      items: ["Git", "GitHub", "Figma", "Jupyter", "Canva", "MySQL", "AutoCAD", "Stitch", "AI Studio"],
    },
  },
  projects: [
    {
      id: "tiffin",
      color: "#F7E1EC",
      featured: true,
      title: "Tiffin Service",
      type: "React · Vite · Node/Express · Prisma · PostgreSQL",
      what: "A food subscription platform that auto-generates daily deliveries with a nightly cron engine.",
      stack: ["React", "Vite", "Tailwind CSS", "Node/Express", "PostgreSQL", "Prisma"],
      problem:
        "Daily tiffin subscriptions fall apart in the gaps. A customer skips tomorrow, pauses for a trip, or has an allergy, and someone still has to assemble the next day’s deliveries by hand.",
      solution:
        "I built one system for customers, providers, and an admin: plans, weekly menus, addresses, allergies, skips, pauses, complaints, and a wallet. A nightly job reads the active subscriptions and generates that day’s deliveries. The API is Node and Express, Prisma models it for PostgreSQL on Supabase, and the same flows run in memory when a live database isn’t connected.",
      repo: "https://github.com/sakshishah2406/TIFFIN-SERVICE",
    },
    {
      id: "cinematch",
      color: "#F1EDFF",
      title: "CineMatch",
      type: "React · TMDB API · Recommendation logic",
      what: "Movie recommendations shaped by genre, language, and mood, with a watchlist for what you want to watch next.",
      stack: ["React", "TMDB API", "Recommendation logic"],
      problem:
        "A movie catalog is too big to browse when the right pick depends on genre, language, and mood, and there’s nowhere to keep the titles you might watch later.",
      solution:
        "Filters narrow the catalog first. A recommendation pass then ranks what’s left against those choices and the viewer’s taste, and a watchlist holds the ones worth coming back to. The titles come from the TMDB API, so discovery stays tied to a live catalog.",
      repo: "https://github.com/trustipat/cinematch",
    },
    {
      id: "attendance",
      color: "#FFF1AD",
      title: "Attendance Risk Calculator",
      type: "HTML · CSS · JavaScript",
      what: "Projects attendance, counts safe bunks, and flags subjects before they slip under the eligibility line.",
      stack: ["HTML", "CSS", "JavaScript"],
      problem:
        "Students usually notice an attendance problem after a subject has already dropped under the eligibility line. Guessing how many lectures you can miss is how people get detained.",
      solution:
        "The calculator keeps subjects and a timetable in the browser, projects where a percentage is heading, counts the lectures you can still miss, and flags subjects near the cutoff. The screen answers stay, bunk, or catch up, instead of only showing a percentage.",
      repo: "https://github.com/sakshishah2406/Attendance-Risk-Calculator",
      live: "https://attendance-risk-calculator.vercel.app",
    },
    {
      id: "gujgyani",
      color: "#E3F5EA",
      title: "GujGyani",
      type: "Expo · React Native · Speech",
      what: "A Gujarati tutor with a placement test, leveled lessons, and speech practice.",
      stack: ["Expo", "React Native", "TypeScript", "Speech"],
      problem:
        "Beginner Gujarati lessons rarely match the learner’s level, and speaking practice needs you to hear a word and say it back.",
      solution:
        "A placement pretest drops you into a 40-level path, with about 200 questions across theory, pronunciation, sentences, translation, and fill-in-the-blanks, plus an alphabet browser. Listening and speaking use Sarvam for text-to-speech and speech-to-text when a key is set. A fully offline speech model is still planned; voice currently depends on that API.",
      repo: "https://github.com/Anayshah13/GujGyani",
    },
    {
      id: "airbnb",
      color: "#E7F1FF",
      title: "Airbnb Clone",
      type: "React · Vite · Tailwind CSS",
      what: "A booking interface with responsive listings, search, and filters.",
      stack: ["React", "Vite", "Tailwind CSS"],
      problem:
        "A booking product only makes sense as a flow. A static page can’t show how search, filters, and a listing connect.",
      solution:
        "I built the browse, search, filter, and listing screens in React and Tailwind, and routing connects them so the same flow works on a phone and a desktop.",
      repo: "https://github.com/sakshishah2406/Airbnb-Clone",
    },
  ],
  about: [
    "Hey, I’m {name}.",
    "I’m an IT student and developer passionate about building digital experiences that bring together thoughtful design, functionality, and innovation. I enjoy turning complex problems into intuitive solutions, whether through crafting seamless user interfaces or developing applications that work efficiently behind the scenes.",
    "With a keen eye for detail and a curiosity for exploring new technologies, I approach every project as an opportunity to experiment, learn, and create something meaningful.",
    "I believe great technology isn’t just about what it can do, but how effortlessly it makes things better for the people using it.",
  ],
  experience: [
    {
      role: "UI/UX Design Intern · CoutLoot (Flyads.ai)",
      when: "June – July 2026",
      meta: "Figma, HTML prototypes",
      kicker: "Design & build",
      stub: "Design that connects",
      paper: "#F7E1EC",
      blurb:
        "Designed Pricing and Languages screens, simplifying plan selection with clearer cards and comparison tables. Built a promotional banner with a shrinking discount and live countdown. Delivered Figma iterations and pixel-precise HTML prototypes.",
      points: [
        "Designed the Pricing and Languages screens, restructuring cards and comparison tables to simplify plan selection.",
        "Built a promotional banner shown after failed checkouts, with a shrinking discount and live countdown.",
        "Delivered Figma iterations and pixel-precise HTML prototypes across several feedback cycles.",
      ],
    },
    {
      role: "Volunteer Teacher · Koshish School for the Deaf",
      when: "Aug 2024 – Dec 2025",
      meta: "Teaching",
      kicker: "Teach & connect",
      stub: "A little more human",
      paper: "#E3F5EA",
      blurb:
        "Taught computer literacy and typing, adapting lessons for accessibility and helping students build confidence with technology.",
      points: ["Taught computer literacy and typing, adapting lessons for accessibility."],
    },
    {
      role: "Secretary · DJCSI",
      when: "2025 – present",
      meta: "Skills learned",
      kicker: "Lead & create",
      stub: "Now secretary",
      paper: "#F8EEC0",
      blurb:
        "Secretary at DJCSI. Previously Publicity & Marketing Co-Committee Member at DJCSI, and Publicity Co-Committee Member at DJSCE eXpress.",
      points: [
        "Leadership across the committee.",
        "Publicity campaigns for college events.",
        "Sponsorships and sponsorship stalls.",
        "Event content, from the idea through to what goes out.",
      ],
    },
  ],
};

/** [letter, label, href, color index, rotation degrees] */
export const keyboardKeys = [
  ["P", "Selected Work", "#work", 1, -7],
  ["O", "About Me", "#about", 2, -3],
  ["R", "Experience", "#experience", 3, 1],
  ["T", "What I Do", "#skills", 4, 4],
  ["F", "Explore", "#work", 5, 8],
  ["O", "A Little About Me", "#about", 6, -8],
  ["L", "My Journey", "#experience", 7, -2],
  ["I", "My Toolkit", "#skills", 8, 3],
  ["O", "Say Hello", "#contact", 9, 8],
];

/** word -> [column, row, across (1/0), down (1/0)]. One word runs across; the others run down through it. */
export const crosswordLayout = {
  LANGUAGES: [0, 4, 1, 0],
  FRONTEND: [2, 1, 0, 1],
  DATA: [5, 3, 0, 1],
  TOOLS: [8, 0, 0, 1],
};

export const brickColors = {
  blue: "#D5E4F7",
  lilac: "#E4D4F5",
  navy: "#2C4164",
  mint: "#C9E4DA",
};
