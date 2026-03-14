export interface WorkItem {
  id: number;
  title: string;
  description: string;
  category: 
    | "Fundamental research & architectures"
    | "AI / cognition / scientific systems"
    | "Infrastructure & developer platforms"
    | "High-complexity applications"
    | "Product platforms"
    | "Specialized tools & creative software"
    | "Experiments, simulations & games"
    | "Commercial websites & deployments";
  link?: string;
  stack?: string;
}

export const works: WorkItem[] = [
  {
    id: 1,
    title: "Project MA (MA-Neuron Cognitive Architecture)",
    description: "A deterministic energy-constrained cognitive architecture designed for probabilistic reasoning experiments and dataset generation for academic research. Implements entropy-based neurons, Hebbian learning, event-driven orchestration, and ablation pipelines for scientific experiments.",
    stack: "Rust (simulation core), Python (analysis)",
    category: "Fundamental research & architectures"
  },
  {
    id: 2,
    title: "UQST Simulator",
    description: "Physics simulation platform modeling photon dynamics and superfluid vortex behavior for theoretical spacetime experiments. Produces analytical visualizations and simulation outputs.",
    stack: "Python",
    category: "Fundamental research & architectures"
  },
  {
    id: 3,
    title: "GW Echo Detector",
    description: "Scientific analysis system for gravitational wave signals using LIGO datasets. Implements echo-detection pipelines for gravitational wave signal analysis.",
    stack: "Python",
    category: "Fundamental research & architectures"
  },
  {
    id: 4,
    title: "SelectionOS Ultimate",
    description: "A deterministic algorithmic framework designed for large-scale dataset mining and optimal candidate selection. Includes multiple compiled builds and execution pipelines.",
    stack: "Python / PyInstaller",
    category: "Fundamental research & architectures"
  },
  {
    id: 5,
    title: "Werher Autonomous Agent",
    description: "A modular autonomous AI agent framework capable of memory integration, task execution, diagnostics, and skill orchestration.",
    stack: "Python",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 6,
    title: "Werher V2",
    description: "Advanced offline AI agent system integrating local LLM inference engines and neural memory routing. Uses llama.cpp infrastructure and advanced routing logic.",
    stack: "Python + C++ (LLM runtime)",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 7,
    title: "Persona AI",
    description: "AI persona modeling platform for generating behavioral simulation profiles and agent personas.",
    stack: "Python",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 8,
    title: "SPIICY",
    description: "An AI-assisted electronics reasoning platform connecting local LLM inference with SPICE circuit simulators for automated circuit analysis.",
    stack: "Python, ngspice, llama.cpp",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 9,
    title: "Accumed",
    description: "Clinical AI platform combining OCR pipelines, clinical NLP models, and diagnostic inference systems.",
    stack: "FastAPI, spaCy, MedCAT, scispaCy, Transformers, OpenCV, Tesseract",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 10,
    title: "Amara – Therapist AI",
    description: "Android AI mental-wellness assistant using empathy-driven conversational models for psychological support.",
    stack: "Android ML systems",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 11,
    title: "MIMICA",
    description: "High-fidelity robotic learning architecture enabling machines to learn physical tasks through observation.",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 12,
    title: "PhysioMimica",
    description: "Browser-based motion capture and physiotherapy analytics system using markerless pose detection and dynamic time-warping analysis.",
    link: "https://kirokir.github.io/movesoft/",
    category: "AI / cognition / scientific systems"
  },
  {
    id: 13,
    title: "Dear&Co Framework",
    description: "A proprietary cross-platform software framework compressing thousands of lines of code into minimal syntax for rapid development and scalable architectures.",
    category: "Infrastructure & developer platforms"
  },
  {
    id: 14,
    title: "ZeroClaw",
    description: "Rust-based automation platform integrating CI workflows, agent orchestration, and containerized infrastructure.",
    category: "Infrastructure & developer platforms"
  },
  {
    id: 15,
    title: "QueueZero Platform",
    description: "Full-stack architecture for clinical workflow automation that converts waiting rooms into automated patient assessment systems.",
    category: "Infrastructure & developer platforms"
  },
  {
    id: 16,
    title: "Riser",
    description: "Containerized full-stack platform integrating backend APIs, frontend applications, and NGINX orchestration with performance benchmarking.",
    category: "Infrastructure & developer platforms"
  },
  {
    id: 17,
    title: "Dear&Co Dynamic Agency Platform",
    description: "Enterprise digital platform enabling agencies to manage blogs, portfolios, and leads with dynamic CMS theming.",
    stack: "Django + PostgreSQL",
    category: "Infrastructure & developer platforms"
  },
  {
    id: 18,
    title: "Cosmos Browser",
    description: "A native browser engine built using Rust, Tauri, and Svelte. Designed for high-performance desktop browsing with modular extensions.",
    link: "https://github.com/kirokir/cosmos-browser",
    category: "High-complexity applications"
  },
  {
    id: 19,
    title: "Veiler",
    description: "Desktop system utility that combines real-time system monitoring with automated file organization rules. Includes draggable widgets, click-through mode, and deterministic sorting engine.",
    stack: "C++, WinUI 3",
    category: "High-complexity applications"
  },
  {
    id: 20,
    title: "Talem",
    description: "Gesture-controlled music synthesis web platform using real-time hand tracking and audio synthesis.",
    stack: "React, Tone.js, MediaPipe",
    category: "High-complexity applications"
  },
  {
    id: 21,
    title: "Aetheris – Cinematic DAW",
    description: "Browser-based digital audio workstation capable of synthesizing sound using AudioWorklet processors and real-time automation timelines.",
    stack: "Web Audio API, Canvas",
    category: "High-complexity applications"
  },
  {
    id: 22,
    title: "AlienChat",
    description: "Production-ready real-time chat, voice, and video platform powered by WebRTC.",
    stack: "Node.js, Supabase",
    category: "High-complexity applications"
  },
  {
    id: 23,
    title: "Attendance Keeper",
    description: "Professional attendance management system built using React, Express, and PostgreSQL.",
    category: "High-complexity applications"
  },
  {
    id: 24,
    title: "Attendance System (Flutter)",
    description: "Institutional attendance tracking application designed for mobile and desktop environments.",
    category: "High-complexity applications"
  },
  {
    id: 25,
    title: "Aegis-1 (Aegis-X Trading Platform)",
    description: "Algorithmic trading infrastructure featuring walk-forward validation and Kelly Criterion portfolio allocation.",
    stack: "Python, sklearn, Dash, Plotly",
    category: "Product platforms"
  },
  {
    id: 26,
    title: "Vande Analytics Platform",
    description: "Large-scale analytics pipeline and reporting infrastructure designed for demographic datasets.",
    category: "Product platforms"
  },
  {
    id: 27,
    title: "FinalVande Dashboard",
    description: "Interactive Streamlit dashboard used for visualizing analytics data pipelines.",
    category: "Product platforms"
  },
  {
    id: 28,
    title: "Muka Data Dashboard",
    description: "Python-based Streamlit dashboard for interactive analytics visualization.",
    category: "Product platforms"
  },
  {
    id: 29,
    title: "Graphon",
    description: "Custom white-label data visualization platform built on RAWGraphs with D3.js integrations.",
    link: "https://kirokir.github.io/data-visualizer/",
    category: "Product platforms"
  },
  {
    id: 30,
    title: "Ela – Multivendor Marketplace",
    description: "Enterprise marketplace platform supporting OAuth authentication and multi-vendor commerce ecosystems.",
    category: "Product platforms"
  },
  {
    id: 31,
    title: "Zain-Crafter eCommerce",
    description: "Full-stack eCommerce system integrating Firebase authentication, WhatsApp automation, and Google Sheets order tracking.",
    category: "Product platforms"
  },
  {
    id: 32,
    title: "Relic Store",
    description: "Flutter-based mobile commerce application integrated with Supabase backend.",
    category: "Product platforms"
  },
  {
    id: 33,
    title: "GlowUp",
    description: "Mobile lifestyle application featuring Supabase backend infrastructure.",
    category: "Product platforms"
  },
  {
    id: 34,
    title: "EmpowHer SOS",
    description: "Safety and emergency assistance mobile application built with Flutter.",
    category: "Product platforms"
  },
  {
    id: 35,
    title: "Odiker",
    description: "Native Android mobile application developed with Kotlin.",
    category: "Product platforms"
  },
  {
    id: 36,
    title: "Contact Gold",
    description: "AI-powered lead generation and Google Maps scraping platform.",
    link: "https://contactgold.netlify.app/",
    category: "Specialized tools & creative software"
  },
  {
    id: 37,
    title: "Magic Slide",
    description: "Interactive Instagram carousel generator designed for creators and content marketing teams.",
    link: "https://kirokir.github.io/magicslide",
    category: "Specialized tools & creative software"
  },
  {
    id: 38,
    title: "Voice Book Studio",
    description: "Voice-driven manuscript editor enabling writers to dictate and export books.",
    link: "https://glitblitz.github.io/vbs",
    category: "Specialized tools & creative software"
  },
  {
    id: 39,
    title: "Tooler",
    description: "Offline batch image conversion and compression tool using browser APIs.",
    link: "https://kirokir.github.io/veda/tooler/",
    category: "Specialized tools & creative software"
  },
  {
    id: 40,
    title: "Vastu Checking AI",
    description: "AI-powered architectural analysis tool providing real-time Vastu compliance reports.",
    link: "https://vp-6cc7.onrender.com/",
    category: "Specialized tools & creative software"
  },
  {
    id: 41,
    title: "SupremeDownloader",
    description: "Media downloading and format conversion system integrating FFmpeg pipelines.",
    category: "Specialized tools & creative software"
  },
  {
    id: 42,
    title: "LANCE Swarm Generator",
    description: "Procedural drone swarm simulation and animation system created using Blender Python APIs.",
    category: "Experiments, simulations & games"
  },
  {
    id: 43,
    title: "Dune Drifter – Sandboarding Odyssey",
    description: "Procedurally generated sandboarding adventure game with physics-based mechanics.",
    link: "https://kirokir.github.io/dune/",
    category: "Experiments, simulations & games"
  },
  {
    id: 44,
    title: "HTML5 Game Engine",
    description: "Experimental browser game built with Canvas and JavaScript.",
    category: "Experiments, simulations & games"
  },
  {
    id: 45,
    title: "Veda One",
    description: "Interactive celestial visualization of all 10,552 Rigveda verses.",
    link: "https://kirokir.github.io/veda/",
    category: "Commercial websites & deployments"
  },
  {
    id: 46,
    title: "Engineering Firm Website",
    description: "Corporate engineering services website optimized for SEO and lead generation.",
    link: "https://kirokir.github.io/superservices",
    category: "Commercial websites & deployments"
  },
  {
    id: 47,
    title: "Sports Store Mobile WebApp",
    description: "Retail PWA with product catalog, cart system, and WhatsApp integration.",
    link: "https://kirokir.github.io/cks1983",
    category: "Commercial websites & deployments"
  },
  {
    id: 48,
    title: "Courier Service WebApp",
    description: "Lightweight courier tracking and service platform.",
    link: "http://deargpt.rf.gd/",
    category: "Commercial websites & deployments"
  },
  {
    id: 49,
    title: "Cyberpunk Portfolio Website",
    description: "Futuristic personal portfolio site with live chat and immersive UI.",
    link: "http://sanjo.lovestoblog.com/",
    category: "Commercial websites & deployments"
  },
  {
    id: 50,
    title: "Photography Studio Website (Lenvow)",
    description: "Luxury wedding photography showcase platform designed for conversion and SEO.",
    link: "https://lenvow.rf.gd",
    category: "Commercial websites & deployments"
  },
  {
    id: 51,
    title: "Tech Startup Website",
    description: "Django-CMS website designed for multinational tech operations.",
    link: "http://kirokir.github.io/vivida/",
    category: "Commercial websites & deployments"
  },
  {
    id: 52,
    title: "WebAgency Website",
    description: "CMS-powered agency platform enabling easy content management.",
    link: "http://dear.ct.ws/",
    category: "Commercial websites & deployments"
  },
  {
    id: 53,
    title: "Portfolio Hosting Platform",
    description: "Dear&Co platform offering portfolio hosting services for artists and professionals.",
    link: "https://kirokir.github.io/portfolio/",
    category: "Commercial websites & deployments"
  }
];
