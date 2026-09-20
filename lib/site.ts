export const nav = {
  brand: "Orvian",
  links: [
    { label: "Home", href: "/" },
    { label: "Product", href: "/features", mega: true },
    { label: "Blog", href: "/blog" },
  ],
};

export const megaMenu = {
  columns: [
    {
      title: "Platform",
      items: [
        { label: "Visual Canvas", desc: "Map workflows visually", icon: "layout" },
        { label: "Task Board", desc: "Plan, assign & track", icon: "kanban" },
        { label: "Automations", desc: "Let the busywork run itself", icon: "zap" },
        { label: "Analytics", desc: "Insights in real time", icon: "chart" },
      ],
    },
    {
      title: "Use Cases",
      items: [
        { label: "Visual Thinking", desc: "Brainstorm as a team", icon: "brain" },
        { label: "Creative Briefs", desc: "Align on every project", icon: "file" },
        { label: "Moodboarding", desc: "Collect inspiration", icon: "image" },
        { label: "Concept Map", desc: "Connect the big picture", icon: "share" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Documentation", desc: "Guides & references", icon: "book" },
        { label: "Tutorials", desc: "Learn step by step", icon: "play" },
        { label: "Changelog", desc: "What's new", icon: "sparkle" },
        { label: "Community", desc: "Join the conversation", icon: "users" },
      ],
    },
  ],
  featured: {
    tag: "New",
    title: "Orvian Intelligence v2",
    desc: "Let AI plan, prioritize and summarize your work automatically.",
    cta: "Explore what's new",
  },
};

export const trustLogos = [
  "Swings",
  "Anomaly",
  "Stacker",
  "North Star",
  "Diamond",
];

export const steps = [
  {
    step: "Step 1",
    title: "Create Free Account",
    desc: "Elevate your efficiency and streamline your workflow by downloading our innovative app.",
    icon: "message",
  },
  {
    step: "Step 2",
    title: "Invite Team Members",
    desc: "Elevate your efficiency and streamline your workflow by downloading our innovative app.",
    icon: "layers",
  },
  {
    step: "Step 3",
    title: "Instantly Improve Workflow",
    desc: "Elevate your efficiency and streamline your workflow by downloading our innovative app.",
    icon: "network",
  },
];

export const platformFeatures = [
  {
    title: "Real Time Updates.",
    desc: "Real-time updates are a critical feature in various software applications and platforms.",
    icon: "clock",
  },
  {
    title: "Project Coordination.",
    desc: "Keep every stakeholder aligned with shared boards, timelines and instant notifications.",
    icon: "clipboard",
  },
];

export const integrations = [
  "Dropbox",
  "Slack",
  "Spotify",
  "Grammarly",
  "Shopify",
  "Webflow",
  "Notion",
  "Mailchimp",
  "Cloudflare",
  "Squarespace",
  "Reddit",
  "PayPal",
  "Asana",
  "Wix",
];

export type Plan = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  original?: { monthly: number; yearly: number };
  audience: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    audience: "For Individuals and Small Teams",
    features: [
      "Up to 2 active workflows",
      "1,000 tasks/month",
      "Community support",
      "Access to 20+ integrations",
      "Basic templates & branding",
    ],
    cta: "Start for free",
  },
  {
    name: "Pro",
    priceMonthly: 49,
    priceYearly: 39,
    original: { monthly: 69, yearly: 59 },
    audience: "For Growing SaaS Companies",
    features: [
      "Up to 15 active workflows",
      "15,000 tasks/month",
      "Email & chat support",
      "Full library of 500+ integrations",
      "Custom templates & branding",
    ],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    priceMonthly: 99,
    priceYearly: 79,
    original: { monthly: 119, yearly: 99 },
    audience: "For Large Organizations",
    features: [
      "Unlimited workflows & tasks",
      "Dedicated account manager",
      "SSO & advanced security",
      "SLA-backed uptime",
      "Onboarding & training",
    ],
    cta: "Get Started",
  },
];

export const testimonials = [
  {
    name: "Javier Morales",
    role: "Growth Lead",
    company: "Anomaly",
    avatar: "/images/avatar-javier.jpg",
    quote:
      "The Adaptive Learning & AI Insights feature is a game-changer. It suggested optimizations I never would've spotted—boosting our email open rates by 28% and click-throughs by 15%. Now I spend less time tweaking campaigns and more time strategizing growth.",
  },
  {
    name: "Linda Zhang",
    role: "Director of Marketing",
    company: "Stacker",
    avatar: "/images/avatar-linda.jpg",
    quote:
      "Real-time analytics let us catch bottlenecks before they become issues. We track trigger rates and error logs live, so our workflow success rate is now consistently above 95%. Sharing instant reports with stakeholders has never been easier.",
  },
  {
    name: "Rajiv Singh",
    role: "VP of Logistics",
    company: "North Star",
    avatar: "/images/avatar-rajiv.jpg",
    quote:
      "We launched our order-fulfillment pipeline with a pre-built template and customized it in minutes. Today we fulfill 3× more orders with the same team, and automated alerts notify us immediately of any exceptions. Our customers are happier, and our ops team can finally focus on scaling.",
  },
];

export const footer = {
  columns: [
    {
      title: "PRODUCT",
      links: ["Canvas", "Features", "How It Works", "Pricing", "Updates"],
    },
    {
      title: "USE CASES",
      links: ["Visual Thinking", "Creative Briefs", "Moodboarding", "Concept Map"],
    },
    {
      title: "RESOURCES",
      links: ["Documentation", "Tutorials", "Blog", "Changelog"],
    },
    {
      title: "COMPANY",
      links: ["About", "Careers", "Contact"],
    },
  ],
};
