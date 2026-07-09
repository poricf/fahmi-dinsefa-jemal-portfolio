import { ExperienceItem, ProjectItem, SkillCategory, AchievementItem, BlogPost, EducationItem, MentorshipItem } from './types';

// --- EXPERIENCE ---
export const experiences: ExperienceItem[] = [
  {
    company: "Robotic Games Inc. (Funded by Founders)",
    link: "https://www.roboticgames.inc", 
    location: "San Francisco, California, United States · Remote",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Dec 2025 – June 2026",
        description: [
          "Led engineering direction for a parental-control platform focused on child safety, screen time, and digital wellbeing."
        ],
        tech: ["System Design", "Backend", "Team Leadership"]
      },
      {
        title: "Senior Software Engineer",
        period: "Jul 2025 – Dec 2025",
        description: [
          "Built Doom Blocker (internetfilter.org), a real-time browser-based content filtering system for digital wellbeing."
        ],
        tech: ["Software Development", "Performance Engineering"]
      }
    ]
  },
  {
    company: "A2SV | Africa to Silicon Valley",
    link: "https://a2sv.org",
    location: "Hybrid",
    roles: [
      {
        title: "Head of Academy | Project Lead",
        period: "Nov 2025 – March 2026",
        description: [
          "Leading the academy and managing engineering projects within the organization."
        ],
        tech: ["Technical Leadership", "Project Management"]
      },
      {
        title: "Head of Education",
        period: "Jan 2025 – Jan 2026",
        description: [
          "Led training and mentorship for aspiring students preparing for A2SV programs."
        ],
        tech: ["Curriculum Design", "Mentorship"]
      },
      {
        title: "Trainee",
        period: "Nov 2023 – Apr 2025",
        description: [
          "A2SV is a non-profit organization dedicated to educating high-potential university students in Africa, with graduates having 35 times more chance of passing interviews at top tech companies."
        ],
        tech: ["Data Structures", "Algorithms"]
      }
    ]
  },
  {
    company: "Competitive Programmer",
    link: "",
    location: "CSEC-ASTU · Addis Ababa, Ethiopia",
    roles: [
      {
        title: "Competitive Programmer",
        period: "Nov 2022 – Aug 2026",
        description: [
          "Participated in multiple regional and national programming contests."
        ],
        tech: ["Algorithms", "Data Structures", "C++"]
      }
    ]
  },
  {
    company: "Eskalate",
    link: "https://eskalate.io",
    location: "On-site",
    roles: [
      {
        title: "SWE Team Lead",
        period: "Jan 2025 – Jan 2026",
        description: [
          "Leading a team of software engineers to architect and deliver scalable mobile and backend solutions.",
          "Driving technical direction, code reviews, and mentoring team members on Clean Architecture paradigms."
        ],
        tech: ["Leadership", "System Architecture", "Engineering Management"]
      },
      {
        title: "SWE Intern",
        period: "Aug 2024 – Jan 2025",
        description: [
          "Contributed to three major projects as a Flutter mobile developer, utilizing Clean Architecture and Test-Driven Development (TDD)."
        ],
        tech: ["Flutter", "Clean Architecture", "TDD"]
      }
    ]
  }
];

// --- MENTORSHIP ---
export const mentorship: MentorshipItem[] = [
  {
    id: "a2sv",
    organization: "Africa to Silicon Valley (A2SV)",
    link: "https://a2sv.org",
    role: "Head of Education",
    description: "Instructed 60+ students in advanced Data Structures and Algorithms. Recognized as Best Lecturer by the student body.",
    stats: [
      { label: "Contests Prepared", value: "40+" }
    ]
  },
  {
    id: "nsda",
    organization: "Nejm Student Developer Association",
    link: "https://t.me/Nejm_Students_Developers_Assoc",
    role: "Mentor & Contributor",
    description: "Provide career and engineering mentorship to computer science students.",
  },
  {
    id: "csec",
    organization: "CSEC ASTU",
    link: "https://csec.astu.edu.et",
    role: "Contest Team Head",
    description: "Authored custom problems for over 40 internal programming contests.",
  }
];

// --- EDUCATION ---
export const education: EducationItem[] = [
  {
    institution: "Adama Science and Technology University",
    link: "http://www.astu.edu.et/",
    degree: "Dual Major: B.Sc. Computer Science & B.Sc. Electronics & Communication Engineering",
    period: "Expected 2026",
    details: [
      "CSE Major GPA: 3.91/4.0 | Cumulative GPA: 3.84/4.0",
      "Dual major combining software engineering principles with hardware and electronics.",
      "Focus on Systems Programming, Embedded Systems, and Algorithms.",
      "Active member of CSEC (Computer Science and Engineering Club)."
    ]
  },
  {
    institution: "Africa to Silicon Valley (A2SV)",
    link: "https://a2sv.org",
    degree: "Software Engineering & Competitive Programming",
    period: "2024",
    details: [
      "G5 Student",
      "Top Contest Performer",
      "Top Problem Solver",
      "Completed rigorous training in Data Structures, Algorithms, and System Design."
    ]
  }
];

// --- EARLY EDUCATION / HISTORY ---
export const educationHistory: EducationItem[] = [
  {
    institution: "Safari Academy",
    degree: "University Preparatory School",
    period: "Grades 11 - 12",
    details: [
      "Academic Score: 95/100",
      "Completed Preparatory education with excellence."
    ]
  },
  {
    institution: "Ethio-Harvard Academy",
    degree: "Elementary & High School",
    period: "Grades 5 - 10",
    details: [
      "Academic Score: 92/100",
      "Built a strong foundation in STEM subjects."
    ]
  },
  {
    institution: "Millenia Academy",
    degree: "Primary Education",
    period: "Nursery - Grade 4",
    details: [
      "Academic Score: 99/100",
      "Early education focused on core fundamentals."
    ]
  }
];

// --- MAIN PROJECTS (The Cool Stuff) ---
export const projects: ProjectItem[] = [
  {
    title: "ExitPrep",
    subtitle: "Full-stack Exam Prep Platform",
    category: "Web",
    featured: true,
    description: "Full-stack exam prep platform. Secure login, timed practice exams, study content by course/chapter, progress tracking, admin tools. Documented REST API, web app, mobile app (React Native), scalable Rust backend in production. Solo built end-to-end.",
    tech: ["Rust", "React Native", "TypeScript", "REST API", "PostgreSQL"],
    link: "https://exitprep.cloud"
  },
  {
    title: "Nalack",
    subtitle: "Loyalty E-Commerce Platform",
    category: "Web",
    featured: true,
    description: "Loyalty-driven e-commerce platform. Browse fashion products, place orders, verify payments, loyalty wallet with points, membership tiers, and rewards. Full-stack development.",
    tech: ["TypeScript", "React", "Node.js", "Payment Integration"],
    link: "https://nalack.com"
  },
  {
    title: "Unix Shell Implementation",
    subtitle: "Systems",
    category: "System",
    description: "A custom UNIX shell implemented in C. Engineered to seamlessly process and interface with pipes, process fork/exec workflows, and system signals.",
    tech: ["C", "Linux API", "Systems"],
    repo: "https://github.com/Samuel-K95/simple_shell"
  },
  {
    title: "QuizMe-AI",
    subtitle: "Generative EdTech (2023)",
    category: "Web",
    featured: true,
    description: "A hackathon project that generates contextual quizzes from PDFs utilizing RAG architecture to ensure accurate and relevant questions. Built under a strict timeline as a maiden Generative AI product.",
    tech: ["Django", "LangChain", "RAG", "Telegram Bot"],
    repo: "https://github.com/AbdulwahidHusein/A2SVGenerativeAi"
  }
];

// --- LOGS (Small / Unfinished / Experiments) ---
export const projectLogs: ProjectItem[] = [
  {
    title: "E-Commerce Mobile App",
    subtitle: "Flutter Application",
    category: "Mobile",
    description: "Comprehensive e-commerce application engineered with Flutter, integrating Clean Architecture principles and the BLoC pattern for robust state management and code organization.",
    tech: ["Flutter", "Dart", "BLoC"],
    repo: "https://github.com/poricf/2024-internship-mobile-tasks/tree/main/on-boarding/ecommerce"
  },
  {
    title: "Tsere Musna",
    subtitle: "Blockchain Anti-Corruption",
    category: "Blockchain",
    description: "A blockchain-based transparent fund-tracking system leveraging smart contracts to ensure immutability and prevent corruption in municipal spending mechanisms.",
    tech: ["Solidity", "Smart Contracts", "Web3"],
  },
  {
    title: "Career Pilot",
    subtitle: "AI Career Guidance",
    category: "AI",
    description: "An AI-powered system aimed at career guidance mapping. Developed the core backend utilizing machine learning matching algorithms to align user traits with viable career paths.",
    tech: ["FastAPI", "Python", "Scikit-Learn", "Next.js"],
    repo: "https://github.com/poricf/CareerPilot-360"
  },
  {
    title: "8-bit Processor Design",
    subtitle: "Hardware Simulation",
    category: "System",
    description: "Designed a working 8-bit processor in Logisim. It has a Control Unit, ALU, and can run basic assembly.",
    tech: ["Logisim", "Digital Logic", "Assembly"],
    repo: "https://github.com/poricf/alx-system_engineering-devops"
  },
  {
    title: "AI Video Editor",
    subtitle: "Content Automation",
    category: "AI",
    description: "A tool to edit videos automatically. It handles boring stuff like cutting silent parts and making thumbnails.",
    tech: ["Python", "AI", "Video Processing"],
    repo: "https://github.com/Samuel-K95/simple_shell"
  },
  {
    title: "Rapid Jobs",
    subtitle: "Gig Economy Platform",
    category: "Web",
    description: "A platform connecting workers with gigs. Built during a hackathon to help with local employment.",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "ASTU Event Management",
    subtitle: "University System",
    category: "Web",
    description: "A system for the Student Union to manage events and stop schedule conflicts.",
    tech: ["Java", "Servlet", "JSP"],
    repo: "https://github.com/poricf/Astu_StudentClubs-Event-Management-System"
  },
  {
    title: "LearnHive",
    subtitle: "Resource Sharing",
    category: "Web",
    description: "An app for students to share and rate learning resources.",
    tech: ["Web Development", "Resource Management"],
    repo: "https://github.com/poricf/LearnHive-A-Simple-Learning-Resource-Hub"
  },
  {
    title: "High School Management",
    subtitle: "School Administration",
    category: "Web",
    description: "A system to manage students and teachers, built with Node.js.",
    tech: ["Node.js", "EJS", "MVC"],
    repo: "https://github.com/neba378/HighschoolManagement"
  },
  {
    title: "QuizMe-AI Mobile",
    subtitle: "Cross-platform App",
    category: "Mobile",
    description: "The mobile version of our quiz generator. It works offline and has notifications.",
    tech: ["Flutter", "Dart", "AI Integration"],
    repo: "https://github.com/AbdulwahidHusein/A2SVGenerativeAi"
  },
  {
    title: "Tic Tac Toe (8086)",
    subtitle: "Assembly Game",
    category: "System",
    description: "Tic Tac Toe written in Assembly 8086. It was a fun way to learn low-level hardware interaction.",
    tech: ["Assembly", "8086", "Microprocessor"],
    repo: "https://github.com/sanoy-si/Tic-Tac-Toe"
  },
  {
    title: "BMI Calculator",
    subtitle: "Android Utility",
    category: "Mobile",
    description: "Simple BMI Calculator I made while learning Kotlin.",
    tech: ["Kotlin", "Android"],
    repo: "https://github.com/poricf/Android-Mobile-app-mini-projects"
  },
  {
    title: "Codeforces Daily Bot",
    subtitle: "Telegram Automation",
    category: "AI",
    description: "A bot that finds Codeforces problems for me to solve based on my rating.",
    tech: ["Python", "Telegram API", "Codeforces API"],
  }
];

// --- ACHIEVEMENTS ---
export const achievements: AchievementItem[] = [
  {
    title: "Best Head of Education of the Year",
    organization: "A2SV",
    date: "2024",
    category: "Award",
    description: "Recognized for leading the education team and helping students succeed.",
    link: "https://linkedin.com/in/fahmi-dinsefa"
  },
  {
    title: "4th Place - National CP Contest",
    organization: "Code Leagues Ethiopia",
    date: "2024",
    category: "Competition",
    description: "Got 4th place in the nationwide competitive programming contest.",
    link: "https://linkedin.com/in/fahmi-dinsefa"
  },
  {
    title: "ACPC Finalist",
    organization: "ICPC",
    date: "March 2024",
    category: "Competition",
    description: "Qualified for the African & Arab Collegiate Programming Championship (Top 5 in Ethiopia).",
    link: "https://icpc.global"
  },
  {
    title: "Top Contest Performer",
    organization: "A2SV",
    date: "Jan 2024",
    category: "Award",
    description: "Consistently held the highest rating in internal contests."
  },
  {
    title: "Gold Medalist",
    organization: "Zindi Africa",
    date: "2023",
    category: "Competition",
    description: "Won Gold in a Data Science competition about predicting African markets.",
    link: "https://zindi.africa"
  },
  {
    title: "Hackathon Semifinalist",
    organization: "A2SV Generative AI",
    date: "Nov 2023",
    category: "Competition",
    description: "Reached the semifinals with an AI educational prototype."
  }
];

// --- BLOG POSTS ---
export const blogPosts: BlogPost[] = [
  {
    id: "discord-migration-thoughts",
    title: "Case Study: My Thoughts on Discord's Switch",
    category: "System Design",
    date: "Feb 24, 2025",
    readTime: "3 min",
    likes: 124,
    tags: ["Systems", "Go", "Rust"],
    summary: "Why Discord replaced Go with Rust. My analysis of their latency spikes and why the Garbage Collector was the villain.",
    content: `# Thoughts on the Discord Migration
    
(This post is a work in progress. I'm currently compiling my notes on the Read States service architecture.)

In the meantime, the core takeaway is: **Garbage Collection is not free.**

When you operate at Discord's scale, "stop-the-world" GC pauses go from being a microsecond annoyance to a massive user experience degrader. Rust's ownership model solves this by removing the GC entirely, not by manual memory management, but by compile-time analysis.

Full analysis coming soon.`
  },
  {
    id: "learning-rust-part-2",
    title: "Learning Rust: Part 2 - The Borrow Checker Wars",
    category: "Rust",
    date: "Feb 28, 2025",
    readTime: "8 min",
    likes: 45,
    prevPost: { id: "learning-rust-part-1", title: "Learning Rust: Part 1 - Syntax & The Hit" },
    tags: ["Rust", "Ownership", "Memory"],
    summary: "Variables in Rust aren't just buckets for data; they are contracts. Understanding the Stack, the Heap, and why the compiler screams at you.",
    content: `# The Wall

In Part 1, we looked at syntax. It looked friendly. Now we hit the wall that makes most people quit Rust: **Ownership**.

In languages like Python or Java, you have a Garbage Collector (GC). It runs around cleaning up memory you aren't using.
In C or C++, you have \`malloc\` and \`free\`. You manually allocate and free memory. If you forget? Memory leak. If you free too early? Segfault.

Rust takes a third path.

# Ownership Rules

1. Each value in Rust has an *owner*.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value will be dropped.

This sounds simple, until you try to do this:

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;
println!("{}, world!", s1); // ERROR!
\`\`\`

In Python, \`s2\` would just be another reference to the same data. In Rust, \`s1\` is **moved** to \`s2\`. \`s1\` is now invalid. The compiler prevents you from using "freed" memory before you even run the code.

# Borrowing (The "&" Symbol)

You don't always want to move ownership. Sometimes you just want to let a function *look* at your data. This is **Borrowing**.

\`\`\`rust
fn calculate_length(s: &String) -> usize {
    s.len()
}
\`\`\`

The \`&\` represents a reference. It allows you to refer to some value without taking ownership of it.

# The Borrow Checker

This is the component of the compiler that enforces the rules. It ensures that:
1. You can have infinite immutable references (\`&T\`).
2. OR you can have exactly ONE mutable reference (\`&mut T\`).
3. You cannot have both.

Why? **Data Races.**

If one part of your code is reading data while another part is writing to it, you get undefined behavior. Rust stops this at compile time.

This is why Rust is safe for systems programming. It gives you the control of C++ with the safety of Java, all without a Garbage Collector.`
  },
  {
    id: "learning-rust-part-1",
    title: "Learning Rust: Part 1 - Syntax & The Hit",
    category: "Rust",
    date: "Feb 23, 2025",
    readTime: "7 min",
    likes: 842,
    nextPost: { id: "learning-rust-part-2", title: "Learning Rust: Part 2 - The Borrow Checker Wars" },
    prevPost: { id: "learning-rust-part-0", title: "Learning Rust: Part 0 - Why Rust?" },
    tags: ["Rust", "Syntax", "Systems"],
    summary: "I thought I'd learn basic syntax in an hour. Instead, I ran headfirst into the Borrow Checker. A look at why declaring a variable in Rust is a systems design decision.",
    content: `When you start learning a new language—whether it's Python, JS, or C++—the ritual is usually the same. You learn how to declare a variable, how to write a \`for\` loop, maybe an \`if/else\` statement, and boom: you're coding.
    
I assumed Rust would be the same. "I have programming experience," I told myself. "Syntax is just syntax. I'll knock this out in an afternoon."

**It hit me hard.**

I didn't just "learn syntax." I was forced to immediately dive deep into the concept of the **Borrow Checker** and **Ownership**. In Rust, you can't just *declare* a variable; you have to understand its identity.

I honestly didn't even know what these terms meant initially. I had to stop coding and start reading. I went down a rabbit hole of blogs, YouTube videos, and documentation just to understand why I couldn't pass a string to a function.

# The Discord Story

During this deep dive, I came across the famous **Discord Read States** migration. This was the "hook" that made it all click for me.

Discord moved a critical service from Go to Rust. Why?
Go is fast, but it uses a **Garbage Collector**. Every few minutes, Discord saw huge latency spikes because Go had to stop the world to clean up memory.

Rust doesn't have a GC. It solves memory safety at compile time.

- You can read the official Discord engineering blog about it [here](https://discord.com/blog/why-discord-is-switching-from-go-to-rust).
- I also wrote up my own thoughts on this case study, which you can read in my post: **"Case Study: My Thoughts on Discord's Switch"** (check the blog list).

This context made me realize: Rust isn't just trying to be difficult. It's forcing you to be efficient.

# Back to the Ritual: Basic Syntax

Once I understood the *philosophy*, the syntax started to make sense.

## 1. Immutability by Default

By default, once you assign a value, it's set in stone.

\`\`\`rust
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    
    // x = 6; // THIS WILL CRASH THE COMPILER!
}
\`\`\`

If you want to change it, you have to explicitly opt-in to mutability using \`mut\`.

\`\`\`rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
\`\`\`

## 2. Constants

- \`let\` is computed at runtime.
- \`const\` is computed at **compile time**.

\`\`\`rust
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
\`\`\`

## 3. Shadowing

In Rust, you can declare the same variable name again.

\`\`\`rust
fn main() {
    let x = 5;
    let x = x + 1; // x is now 6

    {
        let x = x * 2;
        println!("Inner x: {x}"); // Prints 12
    }

    println!("Outer x: {x}"); // Prints 6
}
\`\`\`

This is just the tip of the iceberg. In **Part 2**, we will tackle the beast itself: The Borrow Checker.`
  },
  {
    id: "learning-rust-part-0",
    title: "Learning Rust: Part 0 - Why Rust?",
    category: "Rust",
    date: "Feb 20, 2025",
    readTime: "4 min",
    likes: 312,
    nextPost: { id: "learning-rust-part-1", title: "Learning Rust: Part 1 - Syntax & The Hit" },
    tags: ["Rust", "Learning"],
    summary: "My journey starting with Rust. Not a tutorial, but a log of my process, expectations, and why I chose the hard path.",
    content: "Disclaimer: This blog isn't a tutorial. It might help readers understand some Rust, but for learning, I recommend using the official documentation and some YouTube videos. This is just for someone interested in the process.\n\n# Why I started learning\n\nIt was a recommendation from my mentor, but honestly? I just love difficult things. I heard Rust is one of the most difficult languages, yet incredibly useful. I did some research and it is really cool - so much modern infrastructure is done with Rust, huge companies are shifting, and the philosophy behind it really inspired me. The aim of safety without garbage collection is fascinating.\n\n# My Background\n\nPreviously I had written **Python** really well, then **Dart**, **C++**, **C**, **Java**... and know basics in **JS**, **PHP**, **Go** (which I didn't go in deep).\n\nI also took important university courses on how programming languages are actually built—grammar, compilers, and how they communicate with hardware.\n\n# Hello World\n\nSo, like any programmer starting a new journey, I had to do the ritual. Here is my first Rust code:\n\n```rust\nfn main() {\n    // The ritual must be completed\n    println!(\"Hello, world!\");\n}\n```\n\nIt looks like C, but there is a twist. See that `!` after println? It's not a function; it's a **macro**. In C, macros are often scary text replacements. In Rust, they are powerful code generators. I'm already intrigued.\n\n# Expectations\n\nMy expectation and what I know is Rust is a low-level language like **C**. It is fast. I've heard about weird concepts like the **Borrow Checker** and how many programmers complain about the compiler yelling at them.\n\nBut that's exactly why I'm here. I'm excited to go deep."
  }
];

// --- SKILLS ---
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "C/C++", "Java", "Dart", "TypeScript"]
  },
  {
    title: "Backend & Systems",
    skills: ["FastAPI", "Django", "PostgreSQL", "Redis", "Docker", "Linux", "Systems Design"]
  },
  {
    title: "AI & Data",
    skills: ["PyTorch", "RAG Pipelines", "Vector Search", "Scikit-learn", "Pandas"]
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub Actions", "Postman", "Figma", "Vim"]
  }
];

export const getPortfolioContext = () => {
  return JSON.stringify({
    name: "Fahmi Dinsefa Jemal",
    title: "Software Engineer",
    focus: "Backend Systems, Competitive Programming",
    experiences,
    projects: [...projects, ...projectLogs],
    education: [...education, ...educationHistory],
    skills: skillCategories,
    achievements,
    mentorship
  });
};