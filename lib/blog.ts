export type Category = "Business" | "Analytics" | "Management";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: { title: string; text: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string; // display
  iso: string;
  readTime: string;
  image: string;
  body: Block[];
};

const guideBody: Block[] = [
  { type: "h2", text: "Overview" },
  {
    type: "p",
    text: "In today's ultra-competitive SaaS landscape, capturing a lead is only half the battle. What really drives growth is guiding each prospect through a thoughtful, automated nurture sequence that delivers the right message at precisely the right moment. Too many teams spend days—or even weeks—hand-crafting email sequences in spreadsheets, only to realize that by the time they launch, their messaging is already stale.",
  },
  {
    type: "p",
    text: "With Orvian's visual drag-and-drop canvas, you can assemble an entire funnel—from initial form submission to cart-abandonment recovery—in under ten minutes. No developer hand-offs, no messy XML or JSON, and none of the usual “it won't integrate” headaches. In this guide, I'll walk you through every step: choosing the perfect template, customizing each touchpoint, adding AI-powered delay logic, and finally, monitoring performance in real time.",
  },
  { type: "h2", text: "Why Lead Nurturing Matters" },
  {
    type: "p",
    text: "When a fresh contact fills out your form, they're at their most engaged—but that interest can fade faster than you realize. A single well-timed email can turn curiosity into commitment; a sequence of targeted follow-ups can nurture that spark into a sale. Lead nurturing isn't just about sending more messages—it's about sending smarter messages that align with each prospect's unique journey.",
  },
  {
    type: "p",
    text: "By automating this process, you free your team from repetitive manual work—and you ensure every lead gets the personalized attention they deserve. Orvian's funnel builder makes it easy to map out each stage of the journey, so you can build trust, demonstrate value, and guide prospects from “just browsing” to “ready to buy.”",
  },
  { type: "h2", text: "Key Metrics to Track" },
  {
    type: "p",
    text: "Successful nurturing funnels hinge on monitoring the right data. You'll want to keep an eye on open rates, click-through rates, and time between touchpoints—but with Orvian, you don't need to set up separate tracking pixels or dashboards. Our built-in analytics surface these metrics right alongside your funnel canvas, so you can spot drop-offs at a glance and make targeted optimizations on the fly.",
  },
  { type: "h2", text: "Step-by-Step Walkthrough" },
  {
    type: "ol",
    items: [
      {
        title: "Choose & Import Your Template",
        text: "Head to the Templates library and select “Lead Capture & Nurture Funnel.” With one click, the entire blueprint drops into your workspace, complete with pre-configured nodes for form submission, emails, delays, and condition checks.",
      },
      {
        title: "Customize Each Touchpoint",
        text: "Click on the “New Lead Captured” trigger to point it at your own form or webhook. Then drag in “Send Email,” “Delay,” and “Conditional” nodes—renaming each to match your brand voice. In seconds, you'll have a three-step welcome sequence that feels uniquely yours.",
      },
      {
        title: "Add AI-Powered Delays",
        text: "Rather than guessing whether to wait one hour or one day before your next email, let Orvian analyze past performance and recommend the ideal pause. You can accept the suggestion or tweak it yourself—either way, you'll maximize engagement without lifting a finger.",
      },
      {
        title: "Go Live & Monitor",
        text: "Hit “Publish” and watch each lead flow through your funnel in real time. Our dashboard updates instantly, showing open rates, click data, and conversion percentages. If you spot a bottleneck, jump back into the canvas, adjust your node settings, and republish—no downtime required.",
      },
    ],
  },
  { type: "h2", text: "Wrapping Up" },
  {
    type: "p",
    text: "By the end of this ten-minute build, you'll have a fully automated nurture funnel that:",
  },
  {
    type: "ul",
    items: [
      "Captures new leads",
      "Sends personalized emails",
      "Adapts delays based on AI insights",
      "Monitors performance in real time",
    ],
  },
  {
    type: "p",
    text: "No code, no custom integrations, and none of the usual manual setup. Just pure, streamlined automation that converts. Ready to get started? Log in to your Orvian workspace, import the “Lead Capture & Nurture Funnel” template, and see how fast you can go from zero to launch. Your prospects—and your sales team—will thank you.",
  },
];

const genericBody = (topic: string): Block[] => [
  { type: "h2", text: "Overview" },
  {
    type: "p",
    text: `Modern teams juggle more moving parts than ever before. ${topic} With Orvian, everything from planning to execution lives in a single, centralized workspace—so your team spends less time switching tools and more time doing meaningful work.`,
  },
  {
    type: "p",
    text: "The result is a workflow that scales with you: intuitive enough for a two-person startup, powerful enough for an enterprise rollout. In this article we break down the practical strategies that help high-performing teams stay aligned and ship faster.",
  },
  { type: "h2", text: "Build a Single Source of Truth" },
  {
    type: "p",
    text: "When tasks, files, and conversations are scattered across a dozen apps, context gets lost. Orvian brings them together so every stakeholder sees the same real-time picture. No more digging through threads to find the latest decision—just clarity, on demand.",
  },
  { type: "h2", text: "Automate the Busywork" },
  {
    type: "p",
    text: "Repetitive updates, status pings, and reminders quietly drain hours from every week. Orvian's automation engine handles them for you—routing work to the right person, nudging owners before deadlines slip, and keeping your board perfectly up to date.",
  },
  {
    type: "ul",
    items: [
      "Assign work automatically based on capacity",
      "Trigger reminders before deadlines slip",
      "Sync updates across every connected tool",
      "Surface blockers before they become problems",
    ],
  },
  { type: "h2", text: "Measure What Matters" },
  {
    type: "p",
    text: "Built-in analytics turn raw activity into insight. Track velocity, spot bottlenecks, and celebrate wins with dashboards that update the moment work moves. When you can see progress clearly, momentum takes care of itself.",
  },
  { type: "h2", text: "Wrapping Up" },
  {
    type: "p",
    text: "Great task management isn't about doing more—it's about doing the right things, together. Give Orvian a try and feel the difference a truly connected workspace makes.",
  },
];

export const posts: BlogPost[] = [
  {
    slug: "guide-to-choosing-the-best-task-management-app",
    title: "A comprehensive guide to choosing the best task management app.",
    excerpt:
      "We're here to help you every step of the way—ensuring that your experience with our platform is as smooth and rewarding as possible.",
    category: "Business",
    date: "April 16, 2025",
    iso: "2025-04-16",
    readTime: "8 min read",
    image: "/images/blog-business.jpg",
    body: guideBody,
  },
  {
    slug: "transforming-your-workday-with-advanced-task-management",
    title: "Transforming your workday with the power of advanced task management.",
    excerpt:
      "Discover how automation, real-time insight and thoughtful design reshape the way modern teams get work done.",
    category: "Management",
    date: "April 14, 2025",
    iso: "2025-04-14",
    readTime: "6 min read",
    image: "/images/blog-management.jpg",
    body: genericBody(
      "Advanced task management is the difference between reacting to chaos and orchestrating momentum."
    ),
  },
  {
    slug: "revolutionize-your-task-management-for-productivity",
    title: "Revolutionize your task management for unprecedented productivity.",
    excerpt:
      "A practical playbook for turning scattered to-do lists into a system that compounds your team's output.",
    category: "Analytics",
    date: "April 16, 2025",
    iso: "2025-04-16",
    readTime: "7 min read",
    image: "/images/blog-analytics.jpg",
    body: genericBody(
      "Productivity isn't about hustle—it's about removing friction from every decision your team makes."
    ),
  },
  {
    slug: "navigating-workload-overwhelm-with-orvian",
    title: "Navigating workload overwhelm with Orvian's task management mastery.",
    excerpt:
      "When everything feels urgent, structure is your superpower. Here's how to reclaim focus at scale.",
    category: "Analytics",
    date: "April 10, 2025",
    iso: "2025-04-10",
    readTime: "5 min read",
    image: "/images/blog-analytics.jpg",
    body: genericBody(
      "Workload overwhelm is rarely a work problem—it's a visibility problem."
    ),
  },
  {
    slug: "a-deep-dive-into-orvian-your-ultimate-companion",
    title: "A deep dive into Orvian, your ultimate task management companion.",
    excerpt:
      "From the canvas to the analytics, a tour of the features that make Orvian feel effortless.",
    category: "Business",
    date: "April 5, 2025",
    iso: "2025-04-05",
    readTime: "9 min read",
    image: "/images/blog-business.jpg",
    body: genericBody(
      "The best tools disappear into your workflow—Orvian was built to do exactly that."
    ),
  },
  {
    slug: "how-orvian-elevates-your-teams-performance",
    title: "How Orvian's task management app elevates your team's performance.",
    excerpt:
      "Alignment, accountability and automation—the three levers that turn good teams into great ones.",
    category: "Management",
    date: "April 14, 2025",
    iso: "2025-04-14",
    readTime: "6 min read",
    image: "/images/blog-management.jpg",
    body: genericBody(
      "High-performing teams share one trait: everyone knows what matters most, right now."
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const categories: ("All Articles" | Category)[] = [
  "All Articles",
  "Business",
  "Analytics",
  "Management",
];
