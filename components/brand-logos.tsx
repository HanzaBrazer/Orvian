export function BrandLogo({ name }: { name: string }) {
  const marks: Record<string, React.ReactNode> = {
    Swings: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M7 12c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    Anomaly: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <defs>
          <linearGradient id="anom" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6b18a" />
            <stop offset="1" stopColor="#e2703a" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="9" fill="url(#anom)" />
        <path d="M12 3a9 9 0 0 0 0 18" fill="rgba(255,255,255,0.25)" />
      </svg>
    ),
    Stacker: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" fill="#3f6bff" />
        <path d="M12 6l4 6-4 6-4-6z" fill="#fff" />
      </svg>
    ),
    "North Star": (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
      </svg>
    ),
    Diamond: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M6 4h12l3 5-9 11L3 9z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M3 9h18M9 4l-3 5 6 11 6-11-3-5" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  };
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={name === "North Star" ? "text-[#cdd3ff]" : ""}>
        {marks[name]}
      </span>
      <span
        className={`text-lg tracking-tight ${
          name === "North Star" ? "font-serif italic" : "font-semibold"
        }`}
      >
        {name}
      </span>
    </span>
  );
}

const integrationColor: Record<string, string> = {
  Dropbox: "#0061ff",
  Slack: "#e01e5a",
  Spotify: "#1db954",
  Grammarly: "#15c39a",
  Shopify: "#95bf47",
  Webflow: "#4353ff",
  Notion: "#ffffff",
  Mailchimp: "#ffe01b",
  Cloudflare: "#f38020",
  Squarespace: "#ffffff",
  Reddit: "#ff4500",
  PayPal: "#0070ba",
  Asana: "#f06a6a",
  Wix: "#ffffff",
};

export function IntegrationPill({ name }: { name: string }) {
  const color = integrationColor[name] ?? "#ffffff";
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card/80 px-4 py-2.5 text-sm font-medium text-ink backdrop-blur">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-bold"
        style={{
          backgroundColor: `${color}22`,
          color,
          border: `1px solid ${color}55`,
        }}
      >
        {name[0]}
      </span>
      {name}
    </span>
  );
}
