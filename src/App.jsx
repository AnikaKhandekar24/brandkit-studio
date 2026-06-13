import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clipboard,
  Clock3,
  Code2,
  Copy,
  Download,
  Feather,
  FileText,
  FolderHeart,
  Github,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Menu,
  Palette,
  PenTool,
  RefreshCcw,
  Rocket,
  Sparkles,
  Trash2,
  UserRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

const fields = [
  "Student",
  "Creator",
  "Freelancer",
  "Developer",
  "Designer",
  "Founder",
  "Other",
];

const vibes = [
  "Professional",
  "Friendly",
  "Bold",
  "Minimal",
  "Cute",
  "Techy",
  "Creative",
];

const goals = [
  "Portfolio",
  "LinkedIn",
  "Business",
  "Freelance",
  "Project Showcase",
  "College Applications",
];

const colorVibes = ["Pastel", "Dark", "Minimal", "Bright", "Elegant", "Tech"];

const palettes = {
  Pastel: [
    { name: "Lilac", hex: "#A78BFA" },
    { name: "Petal", hex: "#FDA4AF" },
    { name: "Cream", hex: "#FFF7ED" },
    { name: "Mint", hex: "#A7F3D0" },
    { name: "Sky", hex: "#BAE6FD" },
  ],
  Dark: [
    { name: "Midnight", hex: "#111827" },
    { name: "Charcoal", hex: "#27272A" },
    { name: "Electric", hex: "#3B82F6" },
    { name: "Violet", hex: "#8B5CF6" },
    { name: "Cloud", hex: "#F8FAFC" },
  ],
  Minimal: [
    { name: "White", hex: "#FFFFFF" },
    { name: "Oat", hex: "#F5F0E8" },
    { name: "Stone", hex: "#A8A29E" },
    { name: "Ink", hex: "#1C1917" },
    { name: "Mist", hex: "#CBD5E1" },
  ],
  Bright: [
    { name: "Coral", hex: "#FB7185" },
    { name: "Sun", hex: "#FACC15" },
    { name: "Aqua", hex: "#22D3EE" },
    { name: "Lime", hex: "#A3E635" },
    { name: "Grape", hex: "#A855F7" },
  ],
  Elegant: [
    { name: "Burgundy", hex: "#7F1D1D" },
    { name: "Blush", hex: "#FCE7F3" },
    { name: "Champagne", hex: "#F5E6C8" },
    { name: "Sage", hex: "#8A9A7B" },
    { name: "Espresso", hex: "#292524" },
  ],
  Tech: [
    { name: "Void", hex: "#0F172A" },
    { name: "Cobalt", hex: "#2563EB" },
    { name: "Cyan", hex: "#06B6D4" },
    { name: "Pulse", hex: "#8B5CF6" },
    { name: "Ice", hex: "#E0F2FE" },
  ],
};

const fontPairs = {
  Professional: "Manrope + Source Serif 4",
  Friendly: "DM Sans + Lora",
  Bold: "Space Grotesk + Inter",
  Minimal: "Inter + Instrument Serif",
  Cute: "Nunito + DM Sans",
  Techy: "Space Grotesk + IBM Plex Mono",
  Creative: "Sora + Playfair Display",
};

const initialForm = {
  name: "",
  role: "",
  field: "Student",
  skills: "",
  audience: "",
  vibes: ["Friendly", "Creative"],
  goal: "Portfolio",
  description: "",
  colorVibe: "Pastel",
};

const demoForm = {
  name: "Anika Khandekar",
  role: "Student Developer & Digital Creator",
  field: "Student",
  skills: "web development, AI tools, cybersecurity, design, social impact",
  audience: "students, NGOs, startups, and young builders",
  vibes: ["Friendly", "Techy", "Creative"],
  goal: "Portfolio",
  description:
    "I build websites, AI tools, cybersecurity projects, and student-focused products through Anika Builds.",
  colorVibe: "Pastel",
};

const fieldLanguage = {
  Student: {
    action: "learning, building, and turning ideas into meaningful work",
    identity: "an emerging professional with a curious, hands-on approach",
  },
  Creator: {
    action: "turning ideas into thoughtful content and memorable experiences",
    identity: "a creator who blends strategy, storytelling, and personality",
  },
  Freelancer: {
    action: "helping clients move from rough ideas to polished results",
    identity: "an independent professional focused on clear, useful outcomes",
  },
  Developer: {
    action: "building practical digital products with clean, thoughtful technology",
    identity: "a developer who cares about both the code and the people using it",
  },
  Designer: {
    action: "shaping ideas into clear, beautiful, and useful experiences",
    identity: "a designer guided by curiosity, clarity, and strong visual thinking",
  },
  Founder: {
    action: "building purposeful products that solve real problems",
    identity: "a founder turning ambitious ideas into useful, human-centered ventures",
  },
  Other: {
    action: "bringing thoughtful ideas to life with clarity and purpose",
    identity: "a multidisciplinary builder with a practical, people-first approach",
  },
};

const vibeLanguage = {
  Professional: {
    tone: "clear, credible, and composed",
    adjective: "thoughtful",
    keyword: "Credible",
  },
  Friendly: {
    tone: "warm, approachable, and easy to understand",
    adjective: "human",
    keyword: "Approachable",
  },
  Bold: {
    tone: "confident, direct, and energetic",
    adjective: "bold",
    keyword: "Confident",
  },
  Minimal: {
    tone: "concise, calm, and intentionally simple",
    adjective: "focused",
    keyword: "Clear",
  },
  Cute: {
    tone: "playful, optimistic, and full of personality",
    adjective: "delightful",
    keyword: "Playful",
  },
  Techy: {
    tone: "smart, future-facing, and grounded in practical innovation",
    adjective: "useful",
    keyword: "Innovative",
  },
  Creative: {
    tone: "expressive, imaginative, and distinctly personal",
    adjective: "creative",
    keyword: "Imaginative",
  },
};

const goalLanguage = {
  Portfolio: "showcase the thinking, craft, and impact behind every project",
  LinkedIn: "communicate expertise with confidence and start meaningful conversations",
  Business: "build trust, clarify the value on offer, and attract the right opportunities",
  Freelance: "help potential clients quickly understand the value and experience available",
  "Project Showcase": "tell a clear story from the original challenge to the final result",
  "College Applications": "show curiosity, initiative, and the real-world impact of each experience",
};

function cleanList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function naturalList(items, fallback = "creative problem-solving") {
  const list = items.filter(Boolean);
  if (!list.length) return fallback;
  if (list.length === 1) return list[0];
  if (list.length === 2) return `${list[0]} and ${list[1]}`;
  return `${list.slice(0, -1).join(", ")}, and ${list.at(-1)}`;
}

function firstName(name) {
  return name.trim().split(/\s+/)[0] || "there";
}

function sentenceCase(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

function generateBrandKit(form) {
  const name = form.name.trim() || "Your Name";
  const role = form.role.trim() || `${form.field} & Creative Builder`;
  const skills = cleanList(form.skills);
  const audience = form.audience.trim() || "people and teams with meaningful ideas";
  const primaryVibe = form.vibes[0] || "Professional";
  const vibeDetails = form.vibes.map((vibe) => vibeLanguage[vibe]);
  const fieldDetails = fieldLanguage[form.field] || fieldLanguage.Other;
  const tone = naturalList(vibeDetails.map((item) => item?.tone).filter(Boolean));
  const adjective = vibeDetails[1]?.adjective || vibeDetails[0]?.adjective || "thoughtful";
  const skillPhrase = naturalList(skills.slice(0, 5));
  const focusPhrase = naturalList(skills.slice(0, 3));
  const palette = palettes[form.colorVibe] || palettes.Pastel;
  const keywords = [
    ...vibeDetails.map((item) => item.keyword),
    form.field === "Student" ? "Curious" : "Purposeful",
    form.goal === "Portfolio" ? "Polished" : "Impact-led",
  ]
    .filter(Boolean)
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, 5);

  const customDescription = form.description.trim();
  const thirdPersonDescription = customDescription
    ? customDescription
        .replace(/^I am\b/i, `${name} is`)
        .replace(/^I'm\b/i, `${name} is`)
        .replace(/^I build\b/i, `${name} builds`)
        .replace(/^I create\b/i, `${name} creates`)
        .replace(/^I help\b/i, `${name} helps`)
    : `${name} combines ${focusPhrase} to create thoughtful work for ${audience}.`;

  const tagline =
    form.name === demoForm.name
      ? "Building tech that is useful, creative, and human-centered."
      : `${sentenceCase(fieldDetails.action.split(" and ")[0])} with ${adjective} ideas and real impact.`;

  const shortBio =
    form.name === demoForm.name
      ? "Anika is a student developer and digital creator building websites, AI tools, cybersecurity projects, and social-impact products through Anika Builds."
      : `${thirdPersonDescription} As ${role.toLowerCase().startsWith("a ") ? role.toLowerCase() : `a ${role.toLowerCase()}`}, ${firstName(name)} brings together ${focusPhrase} to make work that feels ${adjective}, useful, and true to the people it serves.`;

  const portfolioIntro =
    form.name === demoForm.name
      ? "Hi, I'm Anika - a student developer passionate about creating polished, useful, and human-centered digital products. Through Anika Builds, I explore web development, AI, cybersecurity, design, and technology for social impact."
      : `Hi, I'm ${firstName(name)} - ${fieldDetails.identity}. I work across ${skillPhrase}, creating ${adjective} work for ${audience}. This portfolio is where I share the process, decisions, and ideas behind what I build.`;

  const longBio = `${shortBio} With a focus on ${skillPhrase}, ${firstName(name)} approaches each project with curiosity, care, and a bias toward making things genuinely useful. The goal is to ${goalLanguage[form.goal]}, while building a body of work that connects strong ideas with thoughtful execution.`;

  const linkedin = `I'm ${name}, ${role.toLowerCase().startsWith("a ") ? role.toLowerCase() : `a ${role.toLowerCase()}`} interested in ${skillPhrase}.\n\n${customDescription || `I enjoy ${fieldDetails.action}.`} My work is guided by a simple idea: useful outcomes begin with curiosity, empathy, and the willingness to keep learning.\n\nRight now, I'm focused on creating work for ${audience} and using each project to ${goalLanguage[form.goal]}. I'm always open to thoughtful conversations, collaborations, and opportunities to build something meaningful.`;

  const socialBio = `${role} | ${skills.slice(0, 2).join(" + ") || form.field}\nBuilding ${adjective}, useful ideas for real people.\n${form.goal} in progress.`;

  const projectDescription = `[Project Name] is a ${adjective} ${form.field.toLowerCase()} project created for ${audience}. It uses ${focusPhrase} to solve [specific problem] and help users [desired outcome]. I led the work from [your contribution] through [final deliverable], with a focus on clarity, usability, and measurable impact.`;

  const toneDescription = `Your brand voice is ${tone}. Use simple, active language, show the thinking behind your work, and balance confidence with genuine curiosity. Lead with outcomes, keep technical details accessible, and let your personality come through without losing clarity.`;

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    role,
    field: form.field,
    vibes: form.vibes,
    goal: form.goal,
    colorVibe: form.colorVibe,
    tagline,
    shortBio,
    longBio,
    portfolioIntro,
    linkedin,
    socialBio,
    projectDescription,
    toneDescription,
    palette,
    fontPair: fontPairs[primaryVibe] || fontPairs.Professional,
    keywords,
    form,
  };
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="BrandKit Studio home">
      <span className="logo-mark">
        <Sparkles size={17} strokeWidth={2.4} />
      </span>
      <span>BrandKit</span>
      <span className="logo-light">Studio</span>
    </a>
  );
}

function Header({ onDemo }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Build", "#builder"],
    ["Preview", "#preview"],
    ["Copy", "#copy"],
    ["Saved Kits", "#saved"],
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button className="button button-small button-dark mobile-demo" onClick={onDemo}>
            Try demo
          </button>
        </nav>
        <div className="header-actions">
          <span className="series-pill">
            <span className="series-dot" /> CreatorStack 01
          </span>
          <button className="button button-small button-dark desktop-demo" onClick={onDemo}>
            Try demo <ArrowRight size={15} />
          </button>
          <button
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onStart, onDemo }) {
  return (
    <section className="hero" id="top">
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="hero-copy">
        <div className="eyebrow">
          <WandSparkles size={15} />
          <span>A personal brand builder for people going places</span>
        </div>
        <h1>
          Your ideas deserve a
          <span className="gradient-text"> brand that feels like you.</span>
        </h1>
        <p>
          Create a polished bio, tagline, color palette, portfolio intro, and brand identity
          for your personal website or social profile.
        </p>
        <div className="hero-buttons">
          <button className="button button-primary" onClick={onStart}>
            Start building <ArrowRight size={18} />
          </button>
          <button className="button button-secondary" onClick={onDemo}>
            <Sparkles size={17} /> Try the demo
          </button>
        </div>
        <div className="hero-trust">
          <span><Check size={14} /> Free to use</span>
          <span><Check size={14} /> No sign-up</span>
          <span><Check size={14} /> No API needed</span>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="floating-chip chip-one"><Palette size={15} /> Your palette</div>
        <div className="floating-chip chip-two"><Sparkles size={15} /> Portfolio ready</div>
        <div className="mini-profile">
          <div className="mini-topbar">
            <span className="window-dots"><i /><i /><i /></span>
            <span>brand-profile</span>
          </div>
          <div className="mini-content">
            <div className="mini-avatar">AK</div>
            <span className="mini-label">STUDENT DEVELOPER</span>
            <h3>Anika Khandekar</h3>
            <p>Building tech that is useful, creative, and human-centered.</p>
            <div className="mini-palette">
              {palettes.Pastel.map((color) => (
                <span key={color.hex} style={{ background: color.hex }} />
              ))}
            </div>
            <div className="mini-tags">
              <span>Creative</span><span>Techy</span><span>Human</span>
            </div>
          </div>
        </div>
        <div className="sparkle-decoration"><Sparkles size={24} /></div>
      </div>
    </section>
  );
}

function FieldLabel({ icon: Icon, label, optional }) {
  return (
    <div className="field-label">
      <span><Icon size={14} /> {label}</span>
      {optional && <small>Optional</small>}
    </div>
  );
}

function SelectField({ value, onChange, children, ariaLabel }) {
  return (
    <div className="select-wrap">
      <select value={value} onChange={onChange} aria-label={ariaLabel}>
        {children}
      </select>
      <ChevronDown size={16} />
    </div>
  );
}

function BrandForm({ form, setForm, onGenerate, onDemo, onReset }) {
  const setValue = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleVibe = (vibe) => {
    setForm((current) => {
      const selected = current.vibes.includes(vibe);
      if (selected) {
        return current.vibes.length === 1
          ? current
          : { ...current, vibes: current.vibes.filter((item) => item !== vibe) };
      }
      return current.vibes.length >= 3
        ? current
        : { ...current, vibes: [...current.vibes, vibe] };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate();
  };

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <span className="step-label">STEP 01</span>
          <h2>Tell us about you</h2>
          <p>A few details are all we need to shape your brand.</p>
        </div>
        <button type="button" className="text-button" onClick={onDemo}>
          <Zap size={15} /> Fill demo
        </button>
      </div>

      <div className="form-grid">
        <label className="field">
          <FieldLabel icon={UserRound} label="Your name" />
          <input
            value={form.name}
            onChange={(event) => setValue("name", event.target.value)}
            placeholder="e.g. Anika Khandekar"
            required
          />
        </label>

        <label className="field">
          <FieldLabel icon={BriefcaseBusiness} label="Role or title" />
          <input
            value={form.role}
            onChange={(event) => setValue("role", event.target.value)}
            placeholder="e.g. Student Developer"
            required
          />
        </label>

        <label className="field">
          <FieldLabel icon={Layers3} label="Your field" />
          <SelectField
            value={form.field}
            onChange={(event) => setValue("field", event.target.value)}
            ariaLabel="Your field"
          >
            {fields.map((field) => <option key={field}>{field}</option>)}
          </SelectField>
        </label>

        <label className="field">
          <FieldLabel icon={Rocket} label="Main goal" />
          <SelectField
            value={form.goal}
            onChange={(event) => setValue("goal", event.target.value)}
            ariaLabel="Main goal"
          >
            {goals.map((goal) => <option key={goal}>{goal}</option>)}
          </SelectField>
        </label>

        <label className="field field-full">
          <FieldLabel icon={Code2} label="Interests & skills" />
          <input
            value={form.skills}
            onChange={(event) => setValue("skills", event.target.value)}
            placeholder="web development, design, writing, AI..."
            required
          />
          <small className="field-hint">Separate skills with commas</small>
        </label>

        <label className="field field-full">
          <FieldLabel icon={Globe2} label="Who do you want to reach?" />
          <input
            value={form.audience}
            onChange={(event) => setValue("audience", event.target.value)}
            placeholder="students, startups, creative teams..."
            required
          />
        </label>

        <fieldset className="field field-full">
          <FieldLabel icon={Sparkles} label="Brand vibe" />
          <div className="choice-grid">
            {vibes.map((vibe) => (
              <button
                key={vibe}
                type="button"
                className={form.vibes.includes(vibe) ? "choice active" : "choice"}
                onClick={() => toggleVibe(vibe)}
                aria-pressed={form.vibes.includes(vibe)}
              >
                {vibe}
                {form.vibes.includes(vibe) && <Check size={13} />}
              </button>
            ))}
          </div>
          <small className="field-hint">Choose up to 3 vibes</small>
        </fieldset>

        <label className="field field-full">
          <FieldLabel icon={FileText} label="A little about you" optional />
          <textarea
            value={form.description}
            onChange={(event) => setValue("description", event.target.value)}
            placeholder="What do you build, create, or care about?"
            rows="4"
          />
        </label>

        <fieldset className="field field-full">
          <FieldLabel icon={Palette} label="Preferred color vibe" />
          <div className="color-choices">
            {colorVibes.map((vibe) => (
              <button
                type="button"
                key={vibe}
                className={form.colorVibe === vibe ? "color-choice active" : "color-choice"}
                onClick={() => setValue("colorVibe", vibe)}
              >
                <span className={`color-dot dot-${vibe.toLowerCase()}`} />
                {vibe}
                {form.colorVibe === vibe && <Check size={13} />}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary button-wide">
          <WandSparkles size={18} /> Generate my brand kit
        </button>
        <button type="button" className="icon-button" onClick={onReset} aria-label="Reset form">
          <RefreshCcw size={17} />
        </button>
      </div>
      <p className="privacy-note"><Check size={13} /> Your details stay on this device.</p>
    </form>
  );
}

function PaletteSwatches({ palette, compact = false }) {
  return (
    <div className={compact ? "palette-swatches compact" : "palette-swatches"}>
      {palette.map((color) => (
        <div className="swatch-wrap" key={color.hex}>
          <div className="swatch" style={{ backgroundColor: color.hex }} />
          {!compact && (
            <div>
              <span>{color.name}</span>
              <small>{color.hex}</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="empty-preview">
      <div className="empty-illustration">
        <div className="empty-card-back" />
        <div className="empty-card-front">
          <Sparkles size={28} />
          <span>Your brand starts here</span>
        </div>
      </div>
      <h3>Ready when you are</h3>
      <p>Complete the form and your personal brand preview will appear here.</p>
      <div className="empty-steps">
        <span className="done"><Check size={13} /> Add your details</span>
        <span>2 &nbsp; Pick your vibe</span>
        <span>3 &nbsp; Generate your kit</span>
      </div>
    </div>
  );
}

function BrandPreviewCard({ kit, onSave, isSaved }) {
  if (!kit) return <EmptyPreview />;
  const initials = kit.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="brand-card" style={{ "--brand-color": kit.palette[0].hex }}>
      <div className="brand-card-top">
        <span className="preview-badge"><Sparkles size={12} /> Generated brand kit</span>
        <button className="round-button" onClick={onSave} aria-label="Save brand kit">
          {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
        </button>
      </div>
      <div className="brand-identity">
        <div className="brand-avatar">{initials}</div>
        <div>
          <span className="brand-role">{kit.role}</span>
          <h3>{kit.name}</h3>
        </div>
      </div>
      <blockquote>{kit.tagline}</blockquote>
      <p className="brand-bio">{kit.shortBio}</p>
      <PaletteSwatches palette={kit.palette} compact />
      <div className="brand-keywords">
        {kit.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
      </div>
      <div className="preview-divider" />
      <div className="preview-snippet">
        <div className="snippet-label"><Instagram size={14} /> Social bio</div>
        <p>{kit.socialBio}</p>
      </div>
      <div className="preview-snippet">
        <div className="snippet-label"><Globe2 size={14} /> Portfolio intro</div>
        <p>{kit.portfolioIntro}</p>
      </div>
      <div className="card-signature">
        <span>BRAND PROFILE / {new Date(kit.createdAt).getFullYear()}</span>
        <Sparkles size={15} />
      </div>
    </div>
  );
}

function PreviewPanel({ kit, onSave, isSaved }) {
  return (
    <aside className="panel preview-panel" id="preview">
      <div className="panel-heading preview-heading">
        <div>
          <span className="step-label">LIVE PREVIEW</span>
          <h2>Your brand, at a glance</h2>
        </div>
        <span className="live-pill"><i /> Live</span>
      </div>
      <BrandPreviewCard kit={kit} onSave={onSave} isSaved={isSaved} />
      <div className="ai-card">
        <div className="ai-icon"><Sparkles size={18} /></div>
        <div>
          <strong>AI-powered suggestions</strong>
          <span>Coming soon with a future Gemini upgrade.</span>
        </div>
        <span className="soon-pill">SOON</span>
      </div>
    </aside>
  );
}

const copySections = [
  { id: "bio", label: "Bios", icon: UserRound },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "portfolio", label: "Portfolio", icon: Globe2 },
  { id: "project", label: "Project", icon: FolderHeart },
  { id: "voice", label: "Brand voice", icon: Feather },
];

function CopyBlock({ label, value, onCopy, featured = false }) {
  return (
    <article className={featured ? "copy-block featured" : "copy-block"}>
      <div className="copy-block-head">
        <span>{label}</span>
        <button onClick={() => onCopy(value, label)}><Copy size={14} /> Copy</button>
      </div>
      <p>{value}</p>
    </article>
  );
}

function GeneratedCopyTabs({ kit, onCopy }) {
  const [tab, setTab] = useState("bio");
  if (!kit) return null;

  return (
    <section className="copy-section" id="copy">
      <div className="section-kicker"><Clipboard size={15} /> Your content suite</div>
      <div className="section-title-row">
        <div>
          <h2>Everything you need to show up polished.</h2>
          <p>Ready-to-use copy shaped around your goals, audience, and personality.</p>
        </div>
        <span className="ready-badge"><Check size={14} /> Portfolio ready</span>
      </div>

      <div className="tabs" role="tablist" aria-label="Generated copy sections">
        {copySections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={tab === id ? "tab active" : "tab"}
            onClick={() => setTab(id)}
            role="tab"
            aria-selected={tab === id}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <div className="copy-content">
        {tab === "bio" && (
          <>
            <CopyBlock label="Personal tagline" value={kit.tagline} onCopy={onCopy} featured />
            <CopyBlock label="Short bio" value={kit.shortBio} onCopy={onCopy} />
            <CopyBlock label="Long bio" value={kit.longBio} onCopy={onCopy} />
          </>
        )}
        {tab === "linkedin" && (
          <CopyBlock label="LinkedIn / About section" value={kit.linkedin} onCopy={onCopy} featured />
        )}
        {tab === "portfolio" && (
          <CopyBlock label="Portfolio introduction" value={kit.portfolioIntro} onCopy={onCopy} featured />
        )}
        {tab === "project" && (
          <CopyBlock label="Project description template" value={kit.projectDescription} onCopy={onCopy} featured />
        )}
        {tab === "voice" && (
          <>
            <CopyBlock label="Brand tone" value={kit.toneDescription} onCopy={onCopy} featured />
            <div className="voice-details">
              <div>
                <span>Font pairing</span>
                <strong>{kit.fontPair}</strong>
              </div>
              <div>
                <span>Brand keywords</span>
                <div className="brand-keywords">{kit.keywords.map((item) => <b key={item}>{item}</b>)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ColorPaletteSection({ kit, onCopy }) {
  if (!kit) return null;
  return (
    <section className="palette-section">
      <div>
        <div className="section-kicker"><Palette size={15} /> Visual direction</div>
        <h2>A palette made for your vibe.</h2>
        <p>
          Use these colors consistently across your portfolio, social profiles, and project covers.
        </p>
      </div>
      <div className="palette-card">
        <div className="palette-card-head">
          <div>
            <span>{kit.colorVibe} palette</span>
            <small>Balanced for digital use</small>
          </div>
          <button onClick={() => onCopy(kit.palette.map((c) => c.hex).join(", "), "Palette")}>
            <Copy size={14} /> Copy hex
          </button>
        </div>
        <PaletteSwatches palette={kit.palette} />
      </div>
    </section>
  );
}

function ExportSection({ kit, onCopy, onDownload, onReset }) {
  if (!kit) return null;
  return (
    <section className="export-section">
      <div>
        <span className="step-label">TAKE IT WITH YOU</span>
        <h2>Your brand kit is ready to go.</h2>
        <p>Copy what you need, or download the complete kit as a simple text file.</p>
      </div>
      <div className="export-actions">
        <button className="button button-light" onClick={() => onCopy(kit.shortBio, "Short bio")}>
          <UserRound size={17} /> Copy short bio
        </button>
        <button className="button button-light" onClick={() => onCopy(kit.linkedin, "LinkedIn About")}>
          <Linkedin size={17} /> Copy LinkedIn
        </button>
        <button className="button button-light" onClick={() => onCopy(kit.portfolioIntro, "Portfolio intro")}>
          <Globe2 size={17} /> Copy portfolio intro
        </button>
        <button className="button button-dark" onClick={onDownload}>
          <Download size={17} /> Download full kit
        </button>
        <button className="button button-ghost-light" onClick={onReset}>
          <RefreshCcw size={17} /> Start over
        </button>
      </div>
    </section>
  );
}

function SavedBrandKits({ kits, onLoad, onDelete }) {
  return (
    <section className="saved-section" id="saved">
      <div className="section-kicker"><Bookmark size={15} /> Your collection</div>
      <div className="section-title-row">
        <div>
          <h2>Saved brand kits</h2>
          <p>Come back to your favorite directions anytime. Stored only on this device.</p>
        </div>
        <span className="count-pill">{kits.length} saved</span>
      </div>

      {kits.length === 0 ? (
        <div className="saved-empty">
          <div><FolderHeart size={24} /></div>
          <h3>No saved kits yet</h3>
          <p>Generate a brand kit and tap the bookmark in your preview to keep it here.</p>
          <a href="#builder" className="text-link">Build your first kit <ArrowRight size={15} /></a>
        </div>
      ) : (
        <div className="saved-grid">
          {kits.map((kit) => (
            <article className="saved-card" key={kit.id}>
              <div className="saved-card-top">
                <div className="saved-initials" style={{ background: kit.palette[0].hex }}>
                  {kit.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </div>
                <button onClick={() => onDelete(kit.id)} aria-label={`Delete ${kit.name}'s kit`}>
                  <Trash2 size={15} />
                </button>
              </div>
              <span className="saved-role">{kit.role}</span>
              <h3>{kit.name}</h3>
              <p>{kit.tagline}</p>
              <PaletteSwatches palette={kit.palette} compact />
              <div className="saved-meta">
                <span><Clock3 size={13} /> {new Date(kit.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>{kit.vibes[0]}</span>
              </div>
              <button className="load-button" onClick={() => onLoad(kit)}>
                Load kit <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <Logo />
        <p>Small tools for big creative energy.</p>
      </div>
      <div className="footer-series">
        <span>Project 01 in</span>
        <strong>CreatorStack by Anika</strong>
      </div>
      <div className="footer-links">
        <a href="https://github.com/AnikaKhandekar24" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
        <span>Built with care by Anika Builds</span>
      </div>
    </footer>
  );
}

function Toast({ toast }) {
  return (
    <div className={toast ? "toast visible" : "toast"} role="status" aria-live="polite">
      <span><Check size={15} /></span>
      {toast || "Done"}
    </div>
  );
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [kit, setKit] = useState(null);
  const [savedKits, setSavedKits] = useState([]);
  const [toast, setToast] = useState("");
  const builderRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("brandkit-studio-kits");
      if (stored) setSavedKits(JSON.parse(stored));
    } catch {
      localStorage.removeItem("brandkit-studio-kits");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("brandkit-studio-kits", JSON.stringify(savedKits));
  }, [savedKits]);

  const isSaved = useMemo(
    () => kit && savedKits.some((saved) => saved.id === kit.id),
    [kit, savedKits],
  );

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  };

  const generate = () => {
    const nextKit = generateBrandKit(form);
    setKit(nextKit);
    showToast("Your brand kit is ready");
    window.setTimeout(() => {
      document.getElementById("preview")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const runDemo = () => {
    setForm(demoForm);
    setKit(generateBrandKit(demoForm));
    showToast("Demo kit generated");
    window.setTimeout(() => {
      document.getElementById("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const reset = () => {
    setForm(initialForm);
    setKit(null);
    showToast("Builder reset");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveKit = () => {
    if (!kit) return;
    if (isSaved) {
      showToast("This kit is already saved");
      return;
    }
    setSavedKits((current) => [kit, ...current]);
    showToast("Brand kit saved");
  };

  const deleteKit = (id) => {
    setSavedKits((current) => current.filter((item) => item.id !== id));
    showToast("Saved kit deleted");
  };

  const loadKit = (savedKit) => {
    setKit(savedKit);
    if (savedKit.form) setForm(savedKit.form);
    showToast("Saved kit loaded");
    document.getElementById("preview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyText = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} copied`);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      showToast(`${label} copied`);
    }
  };

  const downloadKit = () => {
    if (!kit) return;
    const content = `BRANDKIT STUDIO
Personal Brand Kit for ${kit.name}
Created ${new Date(kit.createdAt).toLocaleDateString()}

TAGLINE
${kit.tagline}

SHORT BIO
${kit.shortBio}

LONG BIO
${kit.longBio}

PORTFOLIO INTRO
${kit.portfolioIntro}

LINKEDIN / ABOUT
${kit.linkedin}

SOCIAL BIO
${kit.socialBio}

PROJECT DESCRIPTION TEMPLATE
${kit.projectDescription}

BRAND TONE
${kit.toneDescription}

COLOR PALETTE
${kit.palette.map((color) => `${color.name}: ${color.hex}`).join("\n")}

FONT PAIRING
${kit.fontPair}

BRAND KEYWORDS
${kit.keywords.join(", ")}

---
Made with BrandKit Studio, CreatorStack by Anika.
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${kit.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-brand-kit.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Full brand kit downloaded");
  };

  return (
    <>
      <Header onDemo={runDemo} />
      <main>
        <Hero
          onStart={() => builderRef.current?.scrollIntoView({ behavior: "smooth" })}
          onDemo={runDemo}
        />

        <section className="builder-shell" id="builder" ref={builderRef}>
          <div className="builder-intro">
            <div className="section-kicker"><PenTool size={15} /> Brand builder</div>
            <h2>Build the basics. Make them unmistakably yours.</h2>
            <p>No blank-page stress. Tell us what matters, and we'll shape the first draft.</p>
          </div>
          <div className="builder-grid">
            <BrandForm
              form={form}
              setForm={setForm}
              onGenerate={generate}
              onDemo={runDemo}
              onReset={reset}
            />
            <PreviewPanel kit={kit} onSave={saveKit} isSaved={isSaved} />
          </div>
        </section>

        <div className="results-shell">
          <GeneratedCopyTabs kit={kit} onCopy={copyText} />
          <ColorPaletteSection kit={kit} onCopy={copyText} />
        </div>

        <ExportSection kit={kit} onCopy={copyText} onDownload={downloadKit} onReset={reset} />

        <div className="results-shell">
          <SavedBrandKits kits={savedKits} onLoad={loadKit} onDelete={deleteKit} />
        </div>
      </main>
      <Footer />
      <Toast toast={toast} />
    </>
  );
}

export default App;
