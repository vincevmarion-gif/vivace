import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, X, Plus, Minus, MapPin, ChevronRight, Menu } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";

// ---------- Shared bottle / can SVGs ----------
// Self-contained Instagram icon (inline SVG) — not from lucide-react, since
// that icon name isn't exported by the installed package version.
function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function BottleSVG({ size = 110 }) {
  const h = size * (380 / 110);
  return (
    <svg width={size} height={h} viewBox="0 0 110 380" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Clear glass with liquid */}
        <linearGradient id="bGlass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8e4d0" stopOpacity="0.35" />
          <stop offset="15%" stopColor="#f5f2e4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#e8d98a" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#d4c468" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b8a84a" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0d050" />
          <stop offset="50%" stopColor="#f7dc6f" />
          <stop offset="100%" stopColor="#d4af2a" />
        </linearGradient>
        {/* Cream label */}
        <linearGradient id="bLabelBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7f3e8" />
          <stop offset="100%" stopColor="#efe8d8" />
        </linearGradient>
        {/* Sky for colosseum scene */}
        <linearGradient id="bSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="bShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="38%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bClip">
          <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" />
        </clipPath>
        <clipPath id="bSceneClip">
          <rect x="26" y="142" width="58" height="34" />
        </clipPath>
      </defs>

      {/* Glass bottle body */}
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bLiquid)" />
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bShine)" />

      {/* Label background - cream */}
      <rect x="24" y="96" width="62" height="190" rx="2" fill="url(#bLabelBg)" clipPath="url(#bClip)" />
      <rect x="24" y="96" width="62" height="190" rx="2" fill="none" stroke="#2c5f8a" strokeWidth="1.5" clipPath="url(#bClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#bSceneClip)">
        <rect x="26" y="142" width="58" height="22" fill="url(#bSky)" />
        {/* Colosseum structure */}
        <rect x="32" y="152" width="46" height="14" fill="#c98a52" />
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={i} x={34 + i * 4} y="154" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="32" y="150" width="46" height="2.5" fill="#e8c896" />
        {/* golden rocky foreground */}
        <rect x="26" y="164" width="58" height="12" fill="#c9a23a" />
        <polygon points="28,176 33,166 38,176" fill="#b3892e" />
        <polygon points="40,176 46,167 52,176" fill="#bf9433" />
        <polygon points="54,176 60,168 66,176" fill="#b3892e" />
        <polygon points="68,176 74,166 80,176" fill="#bf9433" />
      </g>
      <rect x="26" y="142" width="58" height="34" fill="none" stroke="#2c5f8a" strokeWidth="1" clipPath="url(#bClip)" />

      {/* VIVACE wordmark */}
      <text x="55" y="195" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#1f3a4d" letterSpacing="2.5" clipPath="url(#bClip)">VIVACE</text>
      <text x="55" y="207" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="#5a5240" letterSpacing="2" clipPath="url(#bClip)">LIMONCELLO</text>

      <line x1="32" y1="214" x2="78" y2="214" stroke="#2c5f8a" strokeWidth="0.6" opacity="0.4" clipPath="url(#bClip)" />

      <text x="55" y="226" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="5" fill="#5a5240" letterSpacing="1" clipPath="url(#bClip)">Italiano · 30% VOL · 500ml</text>
      <text x="55" y="237" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#bClip)">218 kcal/100ml · 75 kcal per shot (35ml)</text>

      {/* Lower blue accent band */}
      <rect x="24" y="266" width="62" height="16" fill="#2c5f8a" clipPath="url(#bClip)" />
      <text x="55" y="277" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill="#f0e8cc" letterSpacing="1.5" clipPath="url(#bClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Cap & neck */}
      <rect x="38" y="0" width="34" height="22" rx="2" fill="#c8c8c8" />
      <rect x="38" y="0" width="34" height="22" rx="2" fill="none" stroke="#999" strokeWidth="0.5" />
      <text x="55" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#666" letterSpacing="1">VIVACE</text>
    </svg>
  );
}

function CanSVG({ size = 90 }) {
  const h = size * (220 / 90);
  return (
    <svg width={size} height={h} viewBox="0 0 90 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0d9c0" />
          <stop offset="15%" stopColor="#f7f3e8" />
          <stop offset="50%" stopColor="#fbf8ee" />
          <stop offset="85%" stopColor="#efe8d8" />
          <stop offset="100%" stopColor="#d8cfb0" />
        </linearGradient>
        <linearGradient id="cSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="cTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <clipPath id="cClip">
          <rect x="10" y="18" width="70" height="186" rx="8" />
        </clipPath>
        <clipPath id="cSceneClip">
          <rect x="14" y="56" width="62" height="36" />
        </clipPath>
      </defs>

      {/* Can body - cream */}
      <rect x="10" y="18" width="70" height="186" rx="8" fill="url(#cBody)" />

      {/* Blue accent stripes */}
      <rect x="10" y="44" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />
      <rect x="10" y="186" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#cSceneClip)">
        <rect x="14" y="56" width="62" height="24" fill="url(#cSky)" />
        <rect x="20" y="68" width="50" height="14" fill="#c98a52" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={22 + i * 4} y="70" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="20" y="66" width="50" height="2.5" fill="#e8c896" />
        <rect x="14" y="80" width="62" height="12" fill="#c9a23a" />
        <polygon points="18,92 24,82 30,92" fill="#b3892e" />
        <polygon points="32,92 39,83 46,92" fill="#bf9433" />
        <polygon points="48,92 55,81 62,92" fill="#b3892e" />
        <polygon points="64,92 71,83 78,92" fill="#bf9433" />
      </g>
      <rect x="14" y="56" width="62" height="36" fill="none" stroke="#2c5f8a" strokeWidth="0.8" clipPath="url(#cClip)" />

      {/* VIVACE wordmark */}
      <text x="45" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#1f3a4d" letterSpacing="2" clipPath="url(#cClip)">VIVACE</text>
      <text x="45" y="119" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fill="#5a5240" letterSpacing="1.8" clipPath="url(#cClip)">LIMONCELLO SPRITZ</text>

      <line x1="22" y1="127" x2="68" y2="127" stroke="#2c5f8a" strokeWidth="0.5" opacity="0.4" clipPath="url(#cClip)" />

      <text x="45" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.5" fill="#5a5240" letterSpacing="0.8" clipPath="url(#cClip)">7% VOL · 250ml</text>
      <text x="45" y="147" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#cClip)">95 kcal per blikje</text>

      {/* Lower blue band */}
      <rect x="10" y="160" width="70" height="14" fill="#2c5f8a" clipPath="url(#cClip)" />
      <text x="45" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#f0e8cc" letterSpacing="1" clipPath="url(#cClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Top & bottom */}
      <ellipse cx="45" cy="18" rx="35" ry="7" fill="url(#cTopGrad)" />
      <ellipse cx="45" cy="12" rx="8" ry="3" fill="#999" />
      <rect x="43" y="9" width="4" height="8" rx="2" fill="#888" />
      <ellipse cx="45" cy="204" rx="35" ry="7" fill="#999" />
    </svg>
  );
}

// ---------- Product data ----------
const PRODUCTS = {
  limoncello: {
    id: "limoncello",
    name: "Vivace Limoncello",
    type: "Onze Signature Fles",
    price: 24.95,
    abv: "30% VOL",
    size: "500ml",
    kcal: "218 kcal / 100ml · 75 kcal per shot (35ml)",
    onlineSellable: false,
    description:
      "Echte Italiaanse limoncello, gemaakt door een ambachtelijke distilleerderij hier in Nederland. Citrus, romig en ijskoud het lekkerst.",
    backLabel: '"Wij maken het. Jij drinkt het. Samen geven we door."',
  },
  spritz: {
    id: "spritz",
    name: "Vivace Spritz",
    type: "De Toekomst ⚡",
    price: 3.25,
    abv: "7% VOL",
    size: "250ml",
    kcal: "95 kcal per blikje (250ml)",
    onlineSellable: false,
    comingSoon: true,
    description:
      "Limoncello ontmoet bruisend water. Direct klaar om te drinken, recht uit het blikje. Fris, helder en onmiskenbaar Italiaans.",
    backLabel: '"Nu opentrekken."',
  },
};

// PLACEHOLDER DATA — replace name, address, city, and postcode with your
// real stockists' details. Once you have them, this is the only place you
// need to edit; the page below builds itself from this array automatically.
const STOCKISTS = [
  {
    name: "[Naam supermarkt]",
    type: "Supermarkt",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
];

// Builds a Google Maps embed URL from an address string. No API key needed
// for this basic embed format.
function mapsEmbedUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function mapsLinkUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// ---------- Cart context (simple prop-drill, no localStorage) ----------
function useCart() {
  const [items, setItems] = useState({});

  const add = (id) => setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  const clear = () => setItems({});

  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const total = Object.entries(items).reduce(
    (sum, [id, qty]) => sum + PRODUCTS[id].price * qty,
    0
  );

  return { items, add, remove, clear, count, total };
}

// ---------- Nav ----------
function Nav({ cart, setCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0a1628]/95 border-b border-[#1c3450]" : "bg-gradient-to-b from-[#0a1628]/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vivace
        </Link>

        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  location.pathname === l.path ? "text-[#D4AF37]" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white/80 hover:text-[#D4AF37] transition-colors"
            aria-label="Winkelwagen"
          >
            <ShoppingBag size={20} />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <button className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1c3450] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="text-left text-sm uppercase tracking-wider text-white/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Cart Drawer ----------
function CartDrawer({ open, onClose, cart }) {
  if (!open) return null;
  const entries = Object.entries(cart.items);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#050b14]/80" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0f1f33] border-l border-[#234060] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#234060]">
          <h3 className="font-serif text-xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Winkelwagen
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {entries.length === 0 && (
            <p className="text-white/40 text-sm">Je winkelwagen is leeg. Online bestellen volgt binnenkort.</p>
          )}
          {entries.map(([id, qty]) => {
            const p = PRODUCTS[id];
            return (
              <div key={id} className="flex gap-4 items-center">
                <div className="flex-shrink-0">
                  {id === "limoncello" ? (
                    <img
                      src="/images/vivace-bottle-hero.jpg"
                      alt="Vivace Limoncello"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  ) : (
                    <img
                      src="/images/vivace-can-hero.jpg"
                      alt="Vivace Limoncello Spritz"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">{p.name}</p>
                  <p className="text-xs text-white/40">€{p.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cart.remove(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{qty}</span>
                  <button
                    onClick={() => cart.add(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {entries.length > 0 && (
          <div className="p-6 border-t border-[#234060] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotaal</span>
              <span className="text-white">€{cart.total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#D4AF37]/70 italic">€1 per fles naar impactprojecten — €{(cart.count * 1).toFixed(2)} bij deze bestelling.</p>
            <button className="w-full bg-[#D4AF37] text-black py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158] transition-colors">
              Afrekenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Age gate ----------
function AgeGate({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6" style={{ backgroundColor: "#0a1628" }}>
      <div className="max-w-sm text-center">
        <p className="font-serif text-3xl text-[#D4AF37] tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace
        </p>
        <p className="text-white/70 text-sm mb-2">Ben je 18 jaar of ouder?</p>
        <p className="text-white/30 text-xs mb-8">We vragen dit omdat onze producten alcohol bevatten.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onConfirm(true)}
            className="bg-[#D4AF37] text-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158]"
          >
            Ja, ik ben 18+
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="border border-white/20 text-white/50 px-8 py-3 text-xs uppercase tracking-[0.15em]"
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  );
}

function UnderageBlock() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6 text-center" style={{ backgroundColor: "#0a1628" }}>
      <p className="text-white/50 text-sm max-w-sm">
        Je moet 18 jaar of ouder zijn om deze website te bezoeken. Drink geen alcohol als je jonger bent.
      </p>
    </div>
  );
}

// ---------- Welcome banner ----------
// Shows right after someone confirms they're 18+: a centered, prominent
// modal thanking them and confirming their purchase already contributes to
// an impact project. Auto-dismisses, and can also be closed manually.
function HeartIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M12 21s-7.5-4.6-10-9.1C0.4 8.6 1.8 5 5.4 5c2 0 3.4 1 4.6 2.6C11.2 6 12.6 5 14.6 5 18.2 5 19.6 8.6 18 11.9 16.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function WelcomeBanner({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#050b14]/70 animate-[fadeIn_0.4s_ease-out]"
        onClick={onClose}
      />
      <div className="relative pointer-events-auto bg-[#0F1F33] border border-[#D4AF37]/50 shadow-2xl shadow-black/60 px-8 py-10 md:px-14 md:py-12 max-w-lg w-full text-center animate-[popIn_0.45s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Subtle Italian tricolor accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#3A7A4E]" />
          <div className="flex-1 bg-[#F4EFE3]" />
          <div className="flex-1 bg-[#B5402E]" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Sluiten"
        >
          <X size={22} />
        </button>

        <div className="flex justify-center mb-6">
          <HeartIcon size={48} />
        </div>

        <p
          className="font-serif italic text-[#D4AF37] text-2xl md:text-3xl leading-snug mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Doe anders, geniet anders.
        </p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-2">
          Welkom bij Vivace. Met elke fles die wordt verkocht, draag je al bij aan een
          geselecteerd impactproject.
        </p>
        <p className="text-white/40 text-xs md:text-sm">
          €1 per fles, transparant en zonder omwegen.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Impact Counter ----------
// bottlesSold connects to real sales data later (e.g. backend or payment
// provider webhook). totalDonated is always derived from it — never set
// independently — so the €1-per-bottle math stays correct everywhere.
function ImpactCounter() {
  const [bottlesSold] = useState(0); // TODO: connect to real sales data later
  const totalDonated = bottlesSold * 1;

  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Actueel</p>
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {bottlesSold.toLocaleString("nl-NL")}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Flessen verkocht</p>
        </div>
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {`€${totalDonated.toLocaleString("nl-NL", { minimumFractionDigits: 0 })}`}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Totaal gedoneerd</p>
        </div>
      </div>
      <p className="text-white/35 text-sm mt-8 max-w-sm mx-auto">
        €1 per verkochte fles, rechtstreeks naar geselecteerde impactprojecten.
      </p>
      <p className="text-white/15 text-[11px] mt-3 italic">
        Teller wordt binnenkort live gekoppeld aan onze verkoopdata.
      </p>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-14 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 72% 48%, rgba(62,207,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 28% 58%, rgba(255,215,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A04E] mb-7">
            Gemaakt in Nederland · Italiaanse ziel
          </p>
          <h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-9"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="font-semibold block">Doe</span>
            <em className="italic text-[#D4AF37] block">anders,</em>
            geniet anders.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-12">
            Vivace is een premium limoncello, gemaakt met een Italiaans recept en een Nederlands hart.
            Wie we zijn is minder belangrijk dan wat elke fles teweegbrengt:
            <strong className="text-white/85 font-medium"> €1 van elke verkochte fles gaat rechtstreeks naar geselecteerde impactprojecten.</strong> Transparant,
            schaalbaar, en onderdeel van elke aankoop.
          </p>
          <div className="flex gap-5 items-center flex-wrap">
            <Link
              to="/producten"
              className="bg-[#D4AF37] text-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#E0C158] transition-colors"
            >
              Ontdek Vivace
            </Link>
            <Link
              to="/over-ons"
              className="text-white/45 text-[11px] uppercase tracking-[0.14em] border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors"
            >
              Ons verhaal
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full max-w-md md:max-w-lg">
            <img
              src="/images/vivace-bottle-hero.jpg"
              alt="Vivace Limoncello fles voor het Colosseum"
              className="w-full h-auto rounded-sm shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Mission ticker */}
      <div className="bg-[#D4AF37] overflow-hidden">
        <div className="flex whitespace-nowrap py-4" style={{ animation: "ticker 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, rep) =>
            ["Doe anders", "€1 per fles naar impact", "Premium Italiaans recept", "Transparant en schaalbaar", "Italiaanse ziel · Nederlands hart", "Geniet anders"].map(
              (txt, i) => (
                <span key={`${rep}-${i}`} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                  {txt}
                  <span className="w-1 h-1 rounded-full bg-black/25" />
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* The number */}
      <div className="bg-[#D4AF37] text-center py-24 px-6">
        <Reveal>
          <span className="font-serif font-bold text-black block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(100px, 18vw, 200px)", lineHeight: 0.85 }}>
            €1
          </span>
          <p className="text-black/50 text-[13px] font-semibold tracking-[0.3em] uppercase mt-6">
            Per verkochte fles, naar geselecteerde impactprojecten
          </p>
        </Reveal>
      </div>

      {/* Impact counter */}
      <div className="bg-[#0a1628] py-24 px-6 border-b border-[#1c3450]" style={{ backgroundColor: "#0a1628" }}>
        <Reveal>
          <ImpactCounter />
        </Reveal>
      </div>

      {/* Quick links to stockists */}
      <section className="px-6 md:px-14 py-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Nu te koop</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Te vinden bij supermarkten en restaurants
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {STOCKISTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="border border-[#234060] p-6 flex items-center gap-4 hover:border-[#D4AF37]/30 transition-colors">
                <MapPin className="text-[#D4AF37] flex-shrink-0" size={20} />
                <div>
                  <p className="text-white/90 text-sm font-medium">{s.name}</p>
                  <p className="text-white/40 text-xs">{s.type} · {s.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Golden Hour Scene — the feeling, without a posed model. Moved to the
          end of the homepage so the impact model and stockists lead, and this
          atmospheric closer comes last. */}
      <section className="relative overflow-hidden" style={{ height: "640px" }}>
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1a3a5c 0%, #3d6a8a 22%, #d98a4a 48%, #f0b25a 58%, #2c5f7a 70%, #1c4356 100%)",
          }}
        />
        {/* Distant coastline */}
        <svg className="absolute bottom-[42%] left-0 w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <polygon points="0,120 0,70 120,40 260,75 420,30 600,68 780,45 1000,80 1000,120" fill="#3a5f70" opacity="0.55" />
          <polygon points="0,120 0,90 180,60 380,95 560,55 760,90 1000,65 1000,120" fill="#2c4a58" opacity="0.7" />
        </svg>
        {/* Water */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            bottom: "30%",
            background: "linear-gradient(to bottom, #2c6a85 0%, #1e4f66 60%, #173e50 100%)",
          }}
        />
        {/* Soft glow on water */}
        <div
          className="absolute"
          style={{
            width: "160px",
            height: "180px",
            left: "50%",
            top: "58%",
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, rgba(255,217,138,0.28), rgba(255,217,138,0))",
            filter: "blur(6px)",
          }}
        />
        {/* Pool edge / terrace stone */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            top: "70%",
            background: "linear-gradient(to bottom, #e8dcc4 0%, #d9c9a6 40%, #c9b78f 100%)",
          }}
        />
        <div className="absolute left-0 right-0" style={{ top: "70%", height: "4px", background: "#1e4f66" }} />

        {/* Table with two glasses + lemons, foreground, off to one side */}
        <div className="absolute" style={{ right: "8%", bottom: "6%" }}>
          <svg width="260" height="140" viewBox="0 0 260 140">
            {/* Table surface */}
            <ellipse cx="130" cy="118" rx="120" ry="18" fill="#caa86a" opacity="0.9" />
            <ellipse cx="130" cy="116" rx="120" ry="16" fill="#d9bb82" />

            {/* Lemons */}
            <circle cx="60" cy="106" r="13" fill="#f0c43a" />
            <circle cx="78" cy="112" r="11" fill="#f3cd4f" />
            <ellipse cx="58" cy="101" rx="3" ry="2" fill="#7a9c3e" />

            {/* Glass 1 */}
            <path d="M150,60 L156,108 L172,108 L178,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M152,75 L156,108 L172,108 L176,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="164" y1="108" x2="164" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="164" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Glass 2 */}
            <path d="M190,60 L196,108 L212,108 L218,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M192,75 L196,108 L212,108 L216,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="204" y1="108" x2="204" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="204" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Mint sprig */}
            <ellipse cx="168" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(-20 168 64)" />
            <ellipse cx="208" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(15 208 64)" />
          </svg>
        </div>

        {/* Warm overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 40%)" }}
        />

        {/* Caption */}
        <div className="absolute left-6 md:left-14 bottom-10 md:bottom-14 z-10 max-w-md">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#E8D38A]/80 mb-3">Het gouden uur</p>
          <p
            className="font-serif italic text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Twee glazen.<br />Een terras.<br />Een avond die niet eindigt.
          </p>
        </div>
      </section>

      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ProductsPage({ cart }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">De Producten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Twee manieren om Vivace te drinken
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/5">
        {Object.values(PRODUCTS).map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <div className="bg-[#102338] p-10 md:p-12 flex flex-col items-center text-center gap-6 h-full">
              {p.id === "limoncello" ? (
                <img
                  src="/images/vivace-bottle-hero.jpg"
                  alt="Vivace Limoncello fles"
                  className="w-full max-w-[180px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              ) : (
                <img
                  src="/images/vivace-can-hero.jpg"
                  alt="Vivace Limoncello Spritz blikje"
                  className="w-full max-w-[150px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              )}

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-2">{p.type}</p>
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-xs">{p.description}</p>
                <p className="text-[#D4AF37]/60 text-xs italic mb-4">{p.backLabel}</p>
                <p className="text-white/20 text-[11px] tracking-wide mb-1">
                  {p.abv} · {p.size}
                </p>
                <p className="text-white/15 text-[10px] tracking-wide mb-6">{p.kcal}</p>
              </div>

              <div className="w-full">
                {p.comingSoon ? (
                  <button
                    disabled
                    className="border border-white/15 text-white/35 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Binnenkort
                  </button>
                ) : p.onlineSellable ? (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-medium">€{p.price.toFixed(2)}</span>
                    <button
                      onClick={() => cart.add(p.id)}
                      className="bg-[#D4AF37] text-black px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#E0C158] transition-colors"
                    >
                      Voeg toe
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/verkooppunten"
                    className="border border-[#D4AF37]/40 text-[#D4AF37] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#D4AF37] hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    Vind in winkel <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              {p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Vivace Spritz is in ontwikkeling. Binnenkort beschikbaar.
                </p>
              )}
              {!p.onlineSellable && !p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een
                  erkende slijterij. Vivace Limoncello is daarom te koop bij onze partners.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StoresPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Verkooppunten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vind Vivace bij jou in de buurt
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Vivace Limoncello is te koop bij supermarkten en restaurants. Vivace Spritz in blik is
          in ontwikkeling en volgt later.
        </p>
      </Reveal>

      <div className="space-y-10">
        {STOCKISTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <div className="border border-[#234060] overflow-hidden">
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#D4AF37] flex-shrink-0" size={22} />
                  <div>
                    <p className="text-white/90 font-medium">{s.name}</p>
                    <p className="text-white/40 text-sm">
                      {s.type} · {s.address}, {s.postcode} {s.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {s.products.map((pid) => (
                    <span key={pid} className="text-[10px] uppercase tracking-wider text-[#C9A04E] border border-[#C9A04E]/30 px-3 py-1">
                      {PRODUCTS[pid].name}
                    </span>
                  ))}
                  <a
                    href={mapsLinkUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-white/50 border border-white/20 px-3 py-1.5 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                  >
                    Open in Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
              <iframe
                title={`Kaart ${s.name}`}
                src={mapsEmbedUrl(s)}
                className="w-full h-64 border-t border-[#234060]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={STOCKISTS.length * 100}>
        <p className="text-white/25 text-xs mt-10 italic">
          Sta je hier nog niet bij en wil je Vivace verkopen? Neem contact met ons op via de
          contactpagina.
        </p>
      </Reveal>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons Verhaal</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace bestaat om iets terug te geven.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6 text-white/55 leading-relaxed text-[15px] mb-16">
          <p>
            Voor elke fles die we verkopen, gaat <strong className="text-white/85">€1 rechtstreeks
            naar geselecteerde impactprojecten.</strong> Geen bijzaak, geen marketingtruc die later is
            bedacht: het was vanaf het begin de reden om Vivace te bouwen.
          </p>
          <p>
            Het idee is ontstaan tijdens een reis naar Rome, waar het Colosseum en de kennismaking
            met authentieke Italiaanse limoncello samenkwamen. Maar winst alleen voelde nooit als
            een goede reden om een merk te starten. Dus werd de vraag simpel:{" "}
            <strong className="text-white/85">
              als dit geld kan opleveren, waarom zou dat geld dan niet net zo goed ergens anders
              voor werken?
            </strong>
          </p>
          <p>
            Zo werd Vivace een premium limoncello met een Italiaans recept en een Nederlands hart,
            gebouwd rond één vast principe: €1 per fles, transparant herleidbaar, naar mensen voor
            wie het leven zwaarder is dan het zou moeten zijn.
          </p>
          <p className="text-[#D4AF37]/80 font-medium">
            Dat is Vivace. Niet voor ons. Voor jou, en voor hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="bg-[#102338] border border-[#D4AF37]/10 p-10 mb-16 text-center">
          <p className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Voor het leven, van jou en van hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="grid grid-cols-2 gap-6 text-center border-t border-[#234060] pt-12 mb-20 max-w-md mx-auto">
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Per fles naar impact</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>2</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Producten op de roadmap</p>
          </div>
        </div>
      </Reveal>

      {/* Impact model */}
      <Reveal delay={400}>
        <div className="border-t border-[#234060] pt-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons impactmodel</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            €1 per fles, naar geselecteerde impactprojecten
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-white/55 leading-relaxed text-[15px]">
              Voor elke fles Vivace die verkocht wordt, doneren we €1 aan een selectie van
              impactprojecten. Geen vage belofte, geen ingewikkelde constructies: een vast bedrag,
              per fles, transparant te herleiden. Dat maakt het model net zo schaalbaar als het merk
              zelf — voor de consument thuis, én voor onze partners in retail en horeca.
            </p>
            <div className="bg-[#102338] border border-[#234060] p-8">
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1,00</p>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-6">Vast donatiebedrag per fles</p>
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
              <p className="text-white/35 text-xs uppercase tracking-wider">Transparant herleidbaar naar verkochte flessen</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
  // a form at formspree.io (free account, takes ~2 minutes, no credit card).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-2xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Laten we praten
        </h1>
        <p className="text-white/45 mb-12">
          Vragen over Vivace, interesse als verkooppunt, of gewoon nieuwsgierig? Stuur een bericht.
        </p>
      </Reveal>

      <Reveal delay={100}>
        {status === "sent" ? (
          <div className="border border-[#C9A04E]/30 p-8 text-center">
            <p className="text-[#C9A04E] font-medium mb-2">Bedankt voor je bericht!</p>
            <p className="text-white/40 text-sm">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="naam"
              placeholder="Naam"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mailadres"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <textarea
              name="bericht"
              placeholder="Je bericht"
              required
              rows={5}
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#D4AF37] text-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#E0C158] transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Versturen..." : "Verstuur bericht"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs">
                Er ging iets mis. Probeer het opnieuw of mail direct naar drinkvivace@gmail.com.
              </p>
            )}
          </form>
        )}
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 pt-10 border-t border-[#234060] text-white/35 text-sm space-y-1">
          <p>info@drinkvivace.nl</p>
          <p>drinkvivace@gmail.com <span className="text-white/20 text-xs">(tijdelijk, werkt al)</span></p>
          <p>Nederland</p>
        </div>
      </Reveal>

      <Reveal delay={250}>
        <div className="mt-10 pt-10 border-t border-[#234060]">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-3">Gedistilleerd door</p>
          <p className="text-white/45 text-sm leading-relaxed">
            Stokerij Klopman<br />
            Van Nelleweg 1, Kelder 3<br />
            3044 BC Rotterdam
          </p>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- FAQ Page ----------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#234060]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-white/90 text-base md:text-lg leading-snug pr-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {q}
        </span>
        <span className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronRight size={16} className="rotate-90" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 pr-8 text-white/45 text-sm md:text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    title: "Het product",
    items: [
      {
        q: "Wat is Vivace Limoncello precies?",
        a: "Vivace is een limoncello van 30% ALC/VOL, gemaakt volgens een authentiek Italiaans recept. Geproduceerd in Nederland bij een ambachtelijke distilleerderij, met smaken die recht doen aan de Italiaanse traditie.",
      },
      {
        q: "Is Vivace in Italië gemaakt?",
        a: "Het recept is Italiaans, maar Vivace wordt geproduceerd in Nederland. Daarom staat op het etiket 'Prelibatezza Italiana' (Italiaanse lekkernij), in plaats van een claim dat het product zelf uit Italië komt.",
      },
      {
        q: "Welke ingrediënten zitten er in?",
        a: "Vivace bevat citroenschil, alcohol, water en suiker. Voor exacte ingrediënten en allergenen verwijzen we naar het etiket op de fles.",
      },
      {
        q: "Hoe drink je Vivace het beste?",
        a: "Traditioneel goed gekoeld als digestief, direct uit de vriezer. Vivace is ook heerlijk als basis voor een spritz: limoncello met prosecco en bruiswater over ijs.",
      },
      {
        q: "Hoeveel calorieën heeft Vivace?",
        a: "218 kcal per 100ml, wat neerkomt op ongeveer 75 kcal per shot van 35ml.",
      },
    ],
  },
  {
    title: "Bestellen & verkooppunten",
    items: [
      {
        q: "Waar kan ik Vivace kopen?",
        a: "Bekijk onze Verkooppunten-pagina voor een actueel overzicht van winkels en restaurants waar Vivace verkrijgbaar is.",
      },
      {
        q: "Kan ik Vivace direct via de website bestellen?",
        a: "Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een erkende slijterij. Daarom verkopen we via onze fysieke verkooppunten in plaats van rechtstreeks via de site.",
      },
      {
        q: "Ben je een winkel of horecazaak en wil je Vivace verkopen?",
        a: "Mooi! Neem contact met ons op via de contactpagina met wat informatie over je zaak, dan nemen we snel contact op.",
      },
      {
        q: "Is er een minimumleeftijd om Vivace te kopen?",
        a: "Ja. Vivace is alleen bestemd voor personen van 18 jaar en ouder, zoals wettelijk vereist voor alcoholhoudende dranken in Nederland.",
      },
    ],
  },
  {
    title: "Vivace & impact",
    items: [
      {
        q: "Hoe werkt het donatiemodel van Vivace?",
        a: "Voor elke verkochte fles Vivace doneren we €1 aan geselecteerde impactprojecten. Een vast bedrag, per fles, onafhankelijk van marge of omzet.",
      },
      {
        q: "Waarom een vast bedrag per fles, in plaats van een percentage van de winst?",
        a: "Een vast bedrag is transparant en voorspelbaar — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt het model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, zonder dat dit afhangt van hoe een kwartaal er financieel uitziet.",
      },
      {
        q: "Welke projecten steunt Vivace?",
        a: "We doneren aan een selectie van impactprojecten. Voor de meest actuele informatie hierover kun je contact met ons opnemen.",
      },
      {
        q: "Hoe weet ik dat de donatie echt gebeurt?",
        a: "Transparantie vinden we belangrijk. Heb je vragen over hoe we dit bijhouden, neem dan gerust contact met ons op.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Vragen</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Veelgestelde vragen
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Alles wat je wilt weten over Vivace — van het product tot ons donatiemodel.
        </p>
      </Reveal>

      {FAQ_SECTIONS.map((section, i) => (
        <Reveal key={section.title} delay={i * 100}>
          <div className={i > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-2xl text-[#D4AF37] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {section.title}
            </h2>
            <div className="h-px w-full bg-[#1c3450] mb-2" />
            <div>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div className="mt-16 text-center border-t border-[#234060] pt-10">
          <p className="text-white/40 text-sm mb-3">Staat je vraag er niet bij?</p>
          <Link
            to="/contact"
            className="text-[#D4AF37] font-serif italic text-lg border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Neem contact met ons op
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- Recipe Page ----------
// ---------- Blog ----------
// Unified blog covering three post types: recept (recipe), nieuws (news),
// verkooppunt (new stockist announcement). Recipe posts carry the full
// ingredients/steps/serving-adjuster data; other types are simpler articles.
const BLOG_CATEGORIES = [
  { id: "alle", label: "Alle" },
  { id: "recept", label: "Recept" },
  { id: "nieuws", label: "Nieuws" },
  { id: "verkooppunt", label: "Verkooppunten" },
];

const BLOG_POSTS = [
  {
    id: "spritz-klassiek",
    type: "recept",
    title: "Vivace Limoncello Spritz — het klassieke recept",
    date: "2026-06-01",
    image: "/images/vivace-instagram-recepten-spritz.png",
    excerpt: "De originele: fris, lichtzoet en gevuld met bubbels. Het recept waarmee alles begon.",
    ingredients: [
      { amount: 5, unit: "cl", name: "Vivace Limoncello" },
      { amount: 10, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 3, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje munt (optioneel)" },
    ],
    steps: [
      "Vul een groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam, om de bubbels te behouden.",
      "Maak af met een scheutje bruiswater.",
      "Garneer met een schijfje citroen en eventueel een takje munt. Direct serveren.",
    ],
  },
  {
    id: "spritz-light",
    type: "recept",
    title: "Vivace Spritz Light — lichter en langer",
    date: "2026-06-01",
    excerpt: "Iets lichter en langer, met meer bruiswater. Perfect voor een lange, warme middag.",
    ingredients: [
      { amount: 4, unit: "cl", name: "Vivace Limoncello" },
      { amount: 8, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 8, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
    ],
    steps: [
      "Vul een groot longdrinkglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe.",
      "Vul aan met ruim bruiswater voor een lichtere, langere drank.",
      "Garneer met een schijfje citroen.",
    ],
  },
  {
    id: "spritz-intenso",
    type: "recept",
    title: "Vivace Spritz Intenso — voor de echte liefhebber",
    date: "2026-06-01",
    excerpt: "Voor wie de limoncello echt wil proeven: een stevigere pour met minder verdunning.",
    ingredients: [
      { amount: 7, unit: "cl", name: "Vivace Limoncello" },
      { amount: 7, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje rozemarijn (optioneel)" },
    ],
    steps: [
      "Vul een tumbler of groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam.",
      "Garneer met een schijfje citroen en eventueel een takje rozemarijn.",
    ],
  },
  {
    id: "instagram-launch",
    type: "nieuws",
    title: "Vivace is live op Instagram",
    date: "2026-06-29",
    image: "/images/vivace-instagram-launch.png",
    excerpt: "Vivace is nu ook te volgen op Instagram. Volg @drinkvivace voor nieuwe recepten, verkooppunten en updates over ons impactmodel.",
    body: [
      "Vivace is nu ook te volgen op Instagram via @drinkvivace. Daar delen we als eerste nieuwe Spritz-recepten, aankondigingen van nieuwe verkooppunten, en updates over ons impactmodel.",
      "€1 van elke verkochte fles gaat naar geselecteerde impactprojecten — premium kwaliteit met een heldere belofte, bij elke borrel.",
      "Volg ons om op de hoogte te blijven, en laat gerust weten met wie jij je eerste glas Vivace zou delen.",
    ],
  },
  {
    id: "instagram-label-onthulling",
    type: "nieuws",
    title: "Het Vivace-etiket, onthuld",
    date: "2026-07-03",
    image: "/images/vivace-instagram-label-reveal.png",
    excerpt: "Simpel, met opzet. Geen opgevulde tekst over ons verhaal, wel een QR-code naar de rest. Zo ziet het etiket eruit dat straks op elke fles staat.",
    body: [
      "Deze week deelden we op Instagram het definitieve ontwerp van het Vivace-etiket.",
      "Bewust simpel: geen lange tekst over ons verhaal of ons impactmodel op de fles zelf. In plaats daarvan een kleine QR-code die rechtstreeks naar drinkvivace.nl leidt, waar het hele verhaal wel te lezen is.",
      "Het resultaat is een etiket dat op de plank meteen opvalt, zonder dat het overvol aanvoelt. Binnenkort te zien op echte flessen bij onze verkooppunten.",
    ],
  },
  {
    id: "voor-het-leven-van-jou-en-van-hen",
    type: "nieuws",
    title: "Voor het leven, van jou en van hen",
    date: "2026-07-11",
    image: "/images/vivace-instagram-giveback.png",
    excerpt: "Vivace is meer dan een likeur. €1 van elke fles gaat naar impactprojecten, geen bijzaak, maar de reden dat we bestaan.",
    body: [
      "Vivace is meer dan een likeur. Voor elke fles die we verkopen, geven we €1 terug aan mensen voor wie het leven zwaarder is dan het zou moeten zijn.",
      "Vivace betekent levendig, vol leven. Dat is wat we vieren: de avonden die te lang duren, de tafels die te vol staan, het gevoel dat er even niets anders hoeft te bestaan dan dit moment. Geïnspireerd door Rome, gemaakt in Nederland, gebouwd rond één simpel idee: het goede leven is pas compleet als je het deelt.",
      "Dus wanneer je een fles Vivace opent, doe je meer dan proosten. Je geeft iets door.",
      "Voor het leven, van jou en van hen.",
    ],
  },
  {
    id: "nieuw-impactmodel",
    type: "nieuws",
    title: "Vivace gaat over op een vast donatiebedrag: €1 per fles",
    date: "2026-06-20",
    excerpt: "We hebben ons impactmodel aangescherpt. In plaats van een percentage van de winst, doneren we nu een vast bedrag van €1 per verkochte fles — transparant en schaalbaar.",
    body: [
      "Vanaf nu doneert Vivace €1 voor elke verkochte fles aan geselecteerde impactprojecten. Dit vervangt ons eerdere model, waarbij we een deel van de winst doneerden.",
      "Waarom de verandering? Een vast bedrag per fles is voorspelbaar en transparant — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt ons model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, onafhankelijk van marges of hoe een kwartaal er financieel uitziet.",
      "Op onze website vind je een live teller die het aantal verkochte flessen en het totaal gedoneerde bedrag laat zien. Deze teller wordt de komende tijd gekoppeld aan onze echte verkoopdata.",
    ],
  },
  {
    id: "nieuwe-verkooppunt",
    type: "verkooppunt",
    title: "Vivace nu ook te koop bij een nieuw verkooppunt",
    date: "2026-06-15",
    excerpt: "We breiden uit! Vivace Limoncello is sinds deze week te koop bij een nieuw verkooppunt.",
    body: [
      "We zijn verheugd om aan te kondigen dat Vivace Limoncello vanaf deze week verkrijgbaar is bij een nieuw verkooppunt. Bekijk de volledige lijst en adressen op onze Verkooppunten-pagina.",
      "Ben je zelf een winkel, slijterij of horecazaak en wil je Vivace in je assortiment? Neem contact met ons op via de contactpagina — we denken graag mee.",
    ],
  },
  {
    id: "het-moment",
    type: "nieuws",
    title: "Voor het aperitief. Of gewoon omdat het kan.",
    date: "2026-07-18",
    image: "/images/vivace-instagram-het-moment.png",
    excerpt: "Je hoeft niet te wachten op een speciale gelegenheid. Vivace maakt gewone momenten een beetje beter.",
    body: [
      "Je hoeft niet te wachten op een speciale gelegenheid. Vivace is er voor het aperitief voor het eten, voor een rustige avond op het balkon, of voor geen enkele reden behalve dat het weekend is.",
      "Gekoeld uit de vriezer, puur in een klein glas, is vaak al genoeg.",
      "We zien Vivace niet als iets voor speciale momenten. We zien het als iets dat gewone momenten een beetje beter maakt. Een druppel Italiaanse zomer, ook op een doordeweekse dinsdag.",
    ],
  },
  {
    id: "waarom-eenmaal-per-jaar-doneren",
    type: "nieuws",
    title: "Waarom we €1 per fles sparen, niet meteen weggeven",
    date: "2026-07-18",
    image: "/images/vivace-instagram-giveback-jaarlijks.png",
    excerpt: "Elke fles legt €1 opzij. Aan het einde van het jaar doneren we het volledige bedrag in één keer, niet per verkoop.",
    body: [
      "Bij elke fles Vivace die verkocht wordt, leggen we €1 opzij voor impactprojecten. Niet als losse donatie bij elke verkoop, maar als onderdeel van een pot die het hele jaar door groeit.",
      "Aan het einde van het jaar tellen we alles op en maken we het volledige bedrag in één keer over aan de projecten die we dat jaar hebben geselecteerd.",
      "We kozen bewust voor deze aanpak, om twee redenen. Ten eerste schaal: honderd losse donaties van een paar euro verdwijnen, terwijl één substantieel bedrag een project echt vooruit kan helpen. Ten tweede zorgvuldigheid: door te wachten tot het einde van het jaar hebben we tijd om de juiste projecten te vinden en te beoordelen, in plaats van overhaaste keuzes te maken bij elke losse verkoop.",
      "Aan het einde van het jaar laten we precies zien waar het geld naartoe is gegaan: welk project, hoeveel, en waarom.",
    ],
  },
];

function formatRecipeAmount(amount, servings) {
  if (amount === null) return null;
  const scaled = Math.round(amount * servings * 10) / 10;
  return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
}

function formatBlogDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, onOpen }) {
  return (
    <button
      onClick={() => onOpen(post.id)}
      className="text-left border border-[#234060] hover:border-[#D4AF37]/40 transition-colors flex flex-col h-full overflow-hidden"
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
          {BLOG_CATEGORIES.find((c) => c.id === post.type)?.label || post.type}
        </span>
        <h3 className="font-serif text-xl text-white/90 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {post.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <span className="text-white/25 text-xs">{formatBlogDate(post.date)}</span>
      </div>
    </button>
  );
}

function RecipeBody({ post }) {
  const [servings, setServings] = useState(1);
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12">
      <div className="flex items-center justify-end mb-10">
        <div className="flex items-center gap-4">
          <span className="text-white/35 text-[10px] uppercase tracking-[0.15em]">Glazen</span>
          <div className="flex items-center gap-3 border border-[#234060]">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Minder glazen"
            >
              <Minus size={14} />
            </button>
            <span className="font-serif text-[#D4AF37] text-base w-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {servings}
            </span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Meer glazen"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Ingrediënten</p>
          <ul className="space-y-3">
            {post.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-white/80 text-sm border-b border-[#1c3450] pb-3">
                <span>{ing.name}</span>
                {ing.amount !== null && (
                  <span className="font-serif text-[#D4AF37] whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatRecipeAmount(ing.amount, servings)} {ing.unit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Bereiding</p>
          <ol className="space-y-4">
            {post.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-white/55 leading-relaxed">
                <span className="font-serif text-[#D4AF37] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-[#1c3450]">
        <p className="font-serif italic text-white/40 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Tip: bewaar je Vivace in de vriezer voor het koudste, meest verfrissende resultaat.
        </p>
        <p className="text-white/20 text-[11px] mt-4">Drink met aandacht, drink met mate. 18+.</p>
      </div>
      </div>
    </div>
  );
}

function ArticleBody({ post }) {
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12 space-y-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-white/55 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const [filter, setFilter] = useState("alle");
  const [openId, setOpenId] = useState(null);

  const filtered = filter === "alle" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.type === filter);
  const openPost = openId ? BLOG_POSTS.find((p) => p.id === openId) : null;

  if (openPost) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
        <button
          onClick={() => setOpenId(null)}
          className="text-white/40 text-[11px] uppercase tracking-wider mb-10 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
        >
          ← Terug naar blog
        </button>
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
            {BLOG_CATEGORIES.find((c) => c.id === openPost.type)?.label}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {openPost.title}
          </h1>
          <p className="text-white/30 text-xs mb-10">{formatBlogDate(openPost.date)}</p>
        </Reveal>
        <Reveal delay={100}>
          {openPost.type === "recept" ? <RecipeBody post={openPost} /> : <ArticleBody post={openPost} />}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Blog</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Recepten, nieuws & verkooppunten
        </h1>
        <p className="text-white/45 max-w-lg mb-12">
          Alles op één plek: nieuwe manieren om Vivace te serveren, updates over ons impactmodel, en
          waar je Vivace als eerste kunt vinden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.14em] border transition-colors ${
                filter === c.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "text-white/50 border-[#234060] hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((post, i) => (
          <Reveal key={post.id} delay={150 + i * 80}>
            <BlogCard post={post} onOpen={setOpenId} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Privacybeleid
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Dit privacybeleid legt uit welke gegevens Vivace verzamelt,
          waarom, en welke rechten je hebt.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Vivace wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven bij de
            Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD Poortugaal,
            Nederland. Voor vragen over dit privacybeleid kun je contact opnemen via
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="2. Welke gegevens we verzamelen">
          <p>Wij verzamelen alleen de gegevens die je zelf actief met ons deelt, namelijk via het contactformulier op onze website:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>De inhoud van je bericht</li>
          </ul>
          <p>
            Wij gebruiken geen trackingcookies, geen advertentiepixels en verzamelen geen
            gegevens voor profilering of marketingdoeleinden zonder jouw expliciete toestemming.
          </p>
        </LegalSection>

        <LegalSection title="3. Waarom we deze gegevens verzamelen">
          <p>
            We gebruiken de gegevens uit het contactformulier uitsluitend om je vraag, opmerking of
            verzoek (bijvoorbeeld als potentiële verkooppartner) te kunnen beantwoorden. We gebruiken
            je gegevens niet voor geautomatiseerde besluitvorming en delen ze niet met derden voor
            commerciële doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="4. Hoe lang we gegevens bewaren">
          <p>
            Berichten via het contactformulier bewaren we niet langer dan noodzakelijk om je vraag
            te kunnen afhandelen, en in elk geval niet langer dan 24 maanden
            na het laatste contact, tenzij we wettelijk verplicht zijn gegevens langer te bewaren.
          </p>
        </LegalSection>

        <LegalSection title="5. Derde partijen">
          <p>
            Ons contactformulier wordt verwerkt via Formspree, een derde partij die berichten van
            het formulier naar ons doorstuurt. Voor meer informatie over hoe Formspree gegevens
            verwerkt, verwijzen we naar hun eigen privacybeleid.
          </p>
          <p>
            Onze website wordt gehost via Vercel. Standaard servertechnische gegevens (zoals
            IP-adres en tijdstip van bezoek) kunnen door onze hostingpartij worden gelogd voor
            beveiligings- en technische doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="6. Jouw rechten">
          <p>Onder de AVG (GDPR) heb je het recht om:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Inzage te krijgen in de gegevens die we van je hebben</li>
            <li>Je gegevens te laten corrigeren of verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p>
            Wil je gebruikmaken van een van deze rechten? Stuur een e-mail naar
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="7. Wijzigingen in dit beleid">
          <p>
            We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie is
            altijd te vinden op deze pagina, met de datum van de laatste wijziging hierboven.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Algemene voorwaarden
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Deze voorwaarden zijn van toepassing op het gebruik van deze
          website en op de informatie die hierop wordt aangeboden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Deze website wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven
            bij de Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD
            Poortugaal, Nederland. BTW-identificatienummer: NL004279162B10.
          </p>
        </LegalSection>

        <LegalSection title="2. Leeftijdsgrens">
          <p>
            Vivace Limoncello is een alcoholhoudend product (30% ALC/VOL) en is uitsluitend bestemd
            voor personen van 18 jaar en ouder. Door deze website te gebruiken bevestig je dat je
            18 jaar of ouder bent. Het is verboden alcohol te verkopen aan, of te laten consumeren
            door, personen onder de 18 jaar, conform de Nederlandse Alcoholwet.
          </p>
        </LegalSection>

        <LegalSection title="3. Verkoop via derde partijen">
          <p>
            Vivace Limoncello wordt niet rechtstreeks via deze website verkocht. Sterke drank (30%
            ALC/VOL of hoger) mag in Nederland alleen online verkocht worden door een hiervoor
            erkende slijterij. Vivace is daarom uitsluitend verkrijgbaar via de fysieke
            verkooppunten die op deze website worden vermeld. Voor vragen over prijs,
            beschikbaarheid of voorraad bij een specifiek verkooppunt verwijzen we je naar dat
            verkooppunt zelf.
          </p>
        </LegalSection>

        <LegalSection title="4. Impact- en donatiemodel">
          <p>
            Vivace doneert €1 per verkochte fles aan geselecteerde impactprojecten. Dit bedrag is
            vast en wordt niet beïnvloed door de verkoopprijs die door individuele verkooppunten
            wordt gehanteerd. De op deze website weergegeven tellers (aantal verkochte flessen en
            totaal gedoneerd bedrag) zijn indicatief en worden periodiek bijgewerkt; zie ook onze
            Onze Impact-pagina voor meer toelichting.
          </p>
        </LegalSection>

        <LegalSection title="5. Intellectueel eigendom">
          <p>
            Alle content op deze website — waaronder teksten, het Vivace-logo, productfoto's,
            illustraties en de vormgeving van het etiket — is eigendom van VVM Trading of wordt
            gebruikt met toestemming van de rechthebbende. Niets van deze website mag worden
            gekopieerd, verspreid of commercieel gebruikt zonder voorafgaande schriftelijke
            toestemming.
          </p>
        </LegalSection>

        <LegalSection title="6. Aansprakelijkheid">
          <p>
            We doen ons best om de informatie op deze website actueel en correct te houden, maar
            kunnen niet garanderen dat alle informatie op elk moment volledig juist of up-to-date
            is. VVM Trading is niet aansprakelijk voor schade die voortvloeit uit het gebruik van
            deze website of uit het gebruik van het product, behalve in gevallen van opzet of grove
            schuld, of voor zover dwingend Nederlands recht anders bepaalt.
          </p>
        </LegalSection>

        <LegalSection title="7. Toepasselijk recht">
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen worden
            voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>
            Vragen over deze voorwaarden? Neem contact met ons op via info@drinkvivace.nl.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-[#1c3450] px-6 md:px-14 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 items-center gap-8 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <p className="font-serif text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Vivace
          </p>
          <a
            href="https://instagram.com/drinkvivace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#D4AF37] transition-colors"
            aria-label="Vivace op Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
        <p className="font-serif italic text-sm text-white/20 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "Doe anders, geniet anders."
        </p>
        <ul className="flex gap-7 justify-center md:justify-end text-[11px] uppercase tracking-wider text-white/25 flex-wrap">
          {footerLinks.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className="hover:text-[#D4AF37] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-[11px] text-white/15 mt-10 pt-8 border-t border-[#1c3450]">
        © 2026 Vivace · Drink verantwoord. 18+
      </p>
      <div className="flex gap-6 justify-center text-[10px] uppercase tracking-wider text-white/20 mt-4">
        <Link to="/privacybeleid" className="hover:text-[#D4AF37] transition-colors">
          Privacybeleid
        </Link>
        <Link to="/algemene-voorwaarden" className="hover:text-[#D4AF37] transition-colors">
          Algemene voorwaarden
        </Link>
      </div>
    </footer>
  );
}

// ---------- App ----------
// Scrolls to top whenever the route changes, replacing the old
// useEffect([page]) behavior now that navigation uses real URLs.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppShell() {
  const [ageConfirmed, setAgeConfirmed] = useState(null); // null | true | false
  const [showWelcome, setShowWelcome] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const handleAgeConfirm = (confirmed) => {
    setAgeConfirmed(confirmed);
    if (confirmed) setShowWelcome(true);
  };

  if (ageConfirmed === null) return <AgeGate onConfirm={handleAgeConfirm} />;
  if (ageConfirmed === false) return <UnderageBlock />;

  return (
    <div className="bg-[#0a1628] text-white min-h-screen font-sans" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#0a1628" }}>
      <ScrollToTop />
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      <Nav cart={cart} setCartOpen={setCartOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producten" element={<ProductsPage cart={cart} />} />
        <Route path="/verkooppunten" element={<StoresPage />} />
        <Route path="/over-ons" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacybeleid" element={<PrivacyPage />} />
        <Route path="/algemene-voorwaarden" element={<TermsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

// ---------- App ----------
export default function VivaceApp() {
  return (
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  );
}          <stop offset="15%" stopColor="#f5f2e4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#e8d98a" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#d4c468" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b8a84a" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0d050" />
          <stop offset="50%" stopColor="#f7dc6f" />
          <stop offset="100%" stopColor="#d4af2a" />
        </linearGradient>
        {/* Cream label */}
        <linearGradient id="bLabelBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7f3e8" />
          <stop offset="100%" stopColor="#efe8d8" />
        </linearGradient>
        {/* Sky for colosseum scene */}
        <linearGradient id="bSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="bShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="38%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bClip">
          <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" />
        </clipPath>
        <clipPath id="bSceneClip">
          <rect x="26" y="142" width="58" height="34" />
        </clipPath>
      </defs>

      {/* Glass bottle body */}
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bLiquid)" />
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bShine)" />

      {/* Label background - cream */}
      <rect x="24" y="96" width="62" height="190" rx="2" fill="url(#bLabelBg)" clipPath="url(#bClip)" />
      <rect x="24" y="96" width="62" height="190" rx="2" fill="none" stroke="#2c5f8a" strokeWidth="1.5" clipPath="url(#bClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#bSceneClip)">
        <rect x="26" y="142" width="58" height="22" fill="url(#bSky)" />
        {/* Colosseum structure */}
        <rect x="32" y="152" width="46" height="14" fill="#c98a52" />
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={i} x={34 + i * 4} y="154" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="32" y="150" width="46" height="2.5" fill="#e8c896" />
        {/* golden rocky foreground */}
        <rect x="26" y="164" width="58" height="12" fill="#c9a23a" />
        <polygon points="28,176 33,166 38,176" fill="#b3892e" />
        <polygon points="40,176 46,167 52,176" fill="#bf9433" />
        <polygon points="54,176 60,168 66,176" fill="#b3892e" />
        <polygon points="68,176 74,166 80,176" fill="#bf9433" />
      </g>
      <rect x="26" y="142" width="58" height="34" fill="none" stroke="#2c5f8a" strokeWidth="1" clipPath="url(#bClip)" />

      {/* VIVACE wordmark */}
      <text x="55" y="195" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#1f3a4d" letterSpacing="2.5" clipPath="url(#bClip)">VIVACE</text>
      <text x="55" y="207" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="#5a5240" letterSpacing="2" clipPath="url(#bClip)">LIMONCELLO</text>

      <line x1="32" y1="214" x2="78" y2="214" stroke="#2c5f8a" strokeWidth="0.6" opacity="0.4" clipPath="url(#bClip)" />

      <text x="55" y="226" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="5" fill="#5a5240" letterSpacing="1" clipPath="url(#bClip)">Italiano · 30% VOL · 500ml</text>
      <text x="55" y="237" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#bClip)">218 kcal/100ml · 75 kcal per shot (35ml)</text>

      {/* Lower blue accent band */}
      <rect x="24" y="266" width="62" height="16" fill="#2c5f8a" clipPath="url(#bClip)" />
      <text x="55" y="277" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill="#f0e8cc" letterSpacing="1.5" clipPath="url(#bClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Cap & neck */}
      <rect x="38" y="0" width="34" height="22" rx="2" fill="#c8c8c8" />
      <rect x="38" y="0" width="34" height="22" rx="2" fill="none" stroke="#999" strokeWidth="0.5" />
      <text x="55" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#666" letterSpacing="1">VIVACE</text>
    </svg>
  );
}

function CanSVG({ size = 90 }) {
  const h = size * (220 / 90);
  return (
    <svg width={size} height={h} viewBox="0 0 90 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0d9c0" />
          <stop offset="15%" stopColor="#f7f3e8" />
          <stop offset="50%" stopColor="#fbf8ee" />
          <stop offset="85%" stopColor="#efe8d8" />
          <stop offset="100%" stopColor="#d8cfb0" />
        </linearGradient>
        <linearGradient id="cSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="cTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <clipPath id="cClip">
          <rect x="10" y="18" width="70" height="186" rx="8" />
        </clipPath>
        <clipPath id="cSceneClip">
          <rect x="14" y="56" width="62" height="36" />
        </clipPath>
      </defs>

      {/* Can body - cream */}
      <rect x="10" y="18" width="70" height="186" rx="8" fill="url(#cBody)" />

      {/* Blue accent stripes */}
      <rect x="10" y="44" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />
      <rect x="10" y="186" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#cSceneClip)">
        <rect x="14" y="56" width="62" height="24" fill="url(#cSky)" />
        <rect x="20" y="68" width="50" height="14" fill="#c98a52" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={22 + i * 4} y="70" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="20" y="66" width="50" height="2.5" fill="#e8c896" />
        <rect x="14" y="80" width="62" height="12" fill="#c9a23a" />
        <polygon points="18,92 24,82 30,92" fill="#b3892e" />
        <polygon points="32,92 39,83 46,92" fill="#bf9433" />
        <polygon points="48,92 55,81 62,92" fill="#b3892e" />
        <polygon points="64,92 71,83 78,92" fill="#bf9433" />
      </g>
      <rect x="14" y="56" width="62" height="36" fill="none" stroke="#2c5f8a" strokeWidth="0.8" clipPath="url(#cClip)" />

      {/* VIVACE wordmark */}
      <text x="45" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#1f3a4d" letterSpacing="2" clipPath="url(#cClip)">VIVACE</text>
      <text x="45" y="119" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fill="#5a5240" letterSpacing="1.8" clipPath="url(#cClip)">LIMONCELLO SPRITZ</text>

      <line x1="22" y1="127" x2="68" y2="127" stroke="#2c5f8a" strokeWidth="0.5" opacity="0.4" clipPath="url(#cClip)" />

      <text x="45" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.5" fill="#5a5240" letterSpacing="0.8" clipPath="url(#cClip)">7% VOL · 250ml</text>
      <text x="45" y="147" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#cClip)">95 kcal per blikje</text>

      {/* Lower blue band */}
      <rect x="10" y="160" width="70" height="14" fill="#2c5f8a" clipPath="url(#cClip)" />
      <text x="45" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#f0e8cc" letterSpacing="1" clipPath="url(#cClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Top & bottom */}
      <ellipse cx="45" cy="18" rx="35" ry="7" fill="url(#cTopGrad)" />
      <ellipse cx="45" cy="12" rx="8" ry="3" fill="#999" />
      <rect x="43" y="9" width="4" height="8" rx="2" fill="#888" />
      <ellipse cx="45" cy="204" rx="35" ry="7" fill="#999" />
    </svg>
  );
}

// ---------- Product data ----------
const PRODUCTS = {
  limoncello: {
    id: "limoncello",
    name: "Vivace Limoncello",
    type: "Onze Signature Fles",
    price: 24.95,
    abv: "30% VOL",
    size: "500ml",
    kcal: "218 kcal / 100ml · 75 kcal per shot (35ml)",
    onlineSellable: false,
    description:
      "Echte Italiaanse limoncello, gemaakt door een ambachtelijke distilleerderij hier in Nederland. Citrus, romig en ijskoud het lekkerst.",
    backLabel: '"Wij maken het. Jij drinkt het. Samen geven we door."',
  },
  spritz: {
    id: "spritz",
    name: "Vivace Spritz",
    type: "De Toekomst ⚡",
    price: 3.25,
    abv: "7% VOL",
    size: "250ml",
    kcal: "95 kcal per blikje (250ml)",
    onlineSellable: false,
    comingSoon: true,
    description:
      "Limoncello ontmoet bruisend water. Direct klaar om te drinken, recht uit het blikje. Fris, helder en onmiskenbaar Italiaans.",
    backLabel: '"Nu opentrekken."',
  },
};

// PLACEHOLDER DATA — replace name, address, city, and postcode with your
// real stockists' details. Once you have them, this is the only place you
// need to edit; the page below builds itself from this array automatically.
const STOCKISTS = [
  {
    name: "[Naam supermarkt]",
    type: "Supermarkt",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
];

// Builds a Google Maps embed URL from an address string. No API key needed
// for this basic embed format.
function mapsEmbedUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function mapsLinkUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// ---------- Cart context (simple prop-drill, no localStorage) ----------
function useCart() {
  const [items, setItems] = useState({});

  const add = (id) => setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  const clear = () => setItems({});

  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const total = Object.entries(items).reduce(
    (sum, [id, qty]) => sum + PRODUCTS[id].price * qty,
    0
  );

  return { items, add, remove, clear, count, total };
}

// ---------- Nav ----------
function Nav({ cart, setCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0a1628]/95 border-b border-[#1c3450]" : "bg-gradient-to-b from-[#0a1628]/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vivace
        </Link>

        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  location.pathname === l.path ? "text-[#D4AF37]" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white/80 hover:text-[#D4AF37] transition-colors"
            aria-label="Winkelwagen"
          >
            <ShoppingBag size={20} />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <button className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1c3450] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="text-left text-sm uppercase tracking-wider text-white/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Cart Drawer ----------
function CartDrawer({ open, onClose, cart }) {
  if (!open) return null;
  const entries = Object.entries(cart.items);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#050b14]/80" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0f1f33] border-l border-[#234060] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#234060]">
          <h3 className="font-serif text-xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Winkelwagen
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {entries.length === 0 && (
            <p className="text-white/40 text-sm">Je winkelwagen is leeg. Online bestellen volgt binnenkort.</p>
          )}
          {entries.map(([id, qty]) => {
            const p = PRODUCTS[id];
            return (
              <div key={id} className="flex gap-4 items-center">
                <div className="flex-shrink-0">
                  {id === "limoncello" ? (
                    <img
                      src="/images/vivace-bottle-hero.jpg"
                      alt="Vivace Limoncello"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  ) : (
                    <img
                      src="/images/vivace-can-hero.jpg"
                      alt="Vivace Limoncello Spritz"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">{p.name}</p>
                  <p className="text-xs text-white/40">€{p.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cart.remove(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{qty}</span>
                  <button
                    onClick={() => cart.add(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {entries.length > 0 && (
          <div className="p-6 border-t border-[#234060] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotaal</span>
              <span className="text-white">€{cart.total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#D4AF37]/70 italic">€1 per fles naar impactprojecten — €{(cart.count * 1).toFixed(2)} bij deze bestelling.</p>
            <button className="w-full bg-[#D4AF37] text-black py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158] transition-colors">
              Afrekenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Age gate ----------
function AgeGate({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6" style={{ backgroundColor: "#0a1628" }}>
      <div className="max-w-sm text-center">
        <p className="font-serif text-3xl text-[#D4AF37] tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace
        </p>
        <p className="text-white/70 text-sm mb-2">Ben je 18 jaar of ouder?</p>
        <p className="text-white/30 text-xs mb-8">We vragen dit omdat onze producten alcohol bevatten.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onConfirm(true)}
            className="bg-[#D4AF37] text-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158]"
          >
            Ja, ik ben 18+
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="border border-white/20 text-white/50 px-8 py-3 text-xs uppercase tracking-[0.15em]"
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  );
}

function UnderageBlock() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6 text-center" style={{ backgroundColor: "#0a1628" }}>
      <p className="text-white/50 text-sm max-w-sm">
        Je moet 18 jaar of ouder zijn om deze website te bezoeken. Drink geen alcohol als je jonger bent.
      </p>
    </div>
  );
}

// ---------- Welcome banner ----------
// Shows right after someone confirms they're 18+: a centered, prominent
// modal thanking them and confirming their purchase already contributes to
// an impact project. Auto-dismisses, and can also be closed manually.
function HeartIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M12 21s-7.5-4.6-10-9.1C0.4 8.6 1.8 5 5.4 5c2 0 3.4 1 4.6 2.6C11.2 6 12.6 5 14.6 5 18.2 5 19.6 8.6 18 11.9 16.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function WelcomeBanner({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#050b14]/70 animate-[fadeIn_0.4s_ease-out]"
        onClick={onClose}
      />
      <div className="relative pointer-events-auto bg-[#0F1F33] border border-[#D4AF37]/50 shadow-2xl shadow-black/60 px-8 py-10 md:px-14 md:py-12 max-w-lg w-full text-center animate-[popIn_0.45s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Subtle Italian tricolor accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#3A7A4E]" />
          <div className="flex-1 bg-[#F4EFE3]" />
          <div className="flex-1 bg-[#B5402E]" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Sluiten"
        >
          <X size={22} />
        </button>

        <div className="flex justify-center mb-6">
          <HeartIcon size={48} />
        </div>

        <p
          className="font-serif italic text-[#D4AF37] text-2xl md:text-3xl leading-snug mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Doe anders, geniet anders.
        </p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-2">
          Welkom bij Vivace. Met elke fles die wordt verkocht, draag je al bij aan een
          geselecteerd impactproject.
        </p>
        <p className="text-white/40 text-xs md:text-sm">
          €1 per fles, transparant en zonder omwegen.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Impact Counter ----------
// bottlesSold connects to real sales data later (e.g. backend or payment
// provider webhook). totalDonated is always derived from it — never set
// independently — so the €1-per-bottle math stays correct everywhere.
function ImpactCounter() {
  const [bottlesSold] = useState(0); // TODO: connect to real sales data later
  const totalDonated = bottlesSold * 1;

  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Actueel</p>
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {bottlesSold.toLocaleString("nl-NL")}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Flessen verkocht</p>
        </div>
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {`€${totalDonated.toLocaleString("nl-NL", { minimumFractionDigits: 0 })}`}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Totaal gedoneerd</p>
        </div>
      </div>
      <p className="text-white/35 text-sm mt-8 max-w-sm mx-auto">
        €1 per verkochte fles, rechtstreeks naar geselecteerde impactprojecten.
      </p>
      <p className="text-white/15 text-[11px] mt-3 italic">
        Teller wordt binnenkort live gekoppeld aan onze verkoopdata.
      </p>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-14 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 72% 48%, rgba(62,207,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 28% 58%, rgba(255,215,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A04E] mb-7">
            Gemaakt in Nederland · Italiaanse ziel
          </p>
          <h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-9"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="font-semibold block">Doe</span>
            <em className="italic text-[#D4AF37] block">anders,</em>
            geniet anders.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-12">
            Vivace is een premium limoncello, gemaakt met een Italiaans recept en een Nederlands hart.
            Wie we zijn is minder belangrijk dan wat elke fles teweegbrengt:
            <strong className="text-white/85 font-medium"> €1 van elke verkochte fles gaat rechtstreeks naar geselecteerde impactprojecten.</strong> Transparant,
            schaalbaar, en onderdeel van elke aankoop.
          </p>
          <div className="flex gap-5 items-center flex-wrap">
            <Link
              to="/producten"
              className="bg-[#D4AF37] text-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#E0C158] transition-colors"
            >
              Ontdek Vivace
            </Link>
            <Link
              to="/over-ons"
              className="text-white/45 text-[11px] uppercase tracking-[0.14em] border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors"
            >
              Ons verhaal
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full max-w-md md:max-w-lg">
            <img
              src="/images/vivace-bottle-hero.jpg"
              alt="Vivace Limoncello fles voor het Colosseum"
              className="w-full h-auto rounded-sm shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Mission ticker */}
      <div className="bg-[#D4AF37] overflow-hidden">
        <div className="flex whitespace-nowrap py-4" style={{ animation: "ticker 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, rep) =>
            ["Doe anders", "€1 per fles naar impact", "Premium Italiaans recept", "Transparant en schaalbaar", "Italiaanse ziel · Nederlands hart", "Geniet anders"].map(
              (txt, i) => (
                <span key={`${rep}-${i}`} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                  {txt}
                  <span className="w-1 h-1 rounded-full bg-black/25" />
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* The number */}
      <div className="bg-[#D4AF37] text-center py-24 px-6">
        <Reveal>
          <span className="font-serif font-bold text-black block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(100px, 18vw, 200px)", lineHeight: 0.85 }}>
            €1
          </span>
          <p className="text-black/50 text-[13px] font-semibold tracking-[0.3em] uppercase mt-6">
            Per verkochte fles, naar geselecteerde impactprojecten
          </p>
        </Reveal>
      </div>

      {/* Impact counter */}
      <div className="bg-[#0a1628] py-24 px-6 border-b border-[#1c3450]" style={{ backgroundColor: "#0a1628" }}>
        <Reveal>
          <ImpactCounter />
        </Reveal>
      </div>

      {/* Quick links to stockists */}
      <section className="px-6 md:px-14 py-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Nu te koop</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Te vinden bij supermarkten en restaurants
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {STOCKISTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="border border-[#234060] p-6 flex items-center gap-4 hover:border-[#D4AF37]/30 transition-colors">
                <MapPin className="text-[#D4AF37] flex-shrink-0" size={20} />
                <div>
                  <p className="text-white/90 text-sm font-medium">{s.name}</p>
                  <p className="text-white/40 text-xs">{s.type} · {s.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Golden Hour Scene — the feeling, without a posed model. Moved to the
          end of the homepage so the impact model and stockists lead, and this
          atmospheric closer comes last. */}
      <section className="relative overflow-hidden" style={{ height: "640px" }}>
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1a3a5c 0%, #3d6a8a 22%, #d98a4a 48%, #f0b25a 58%, #2c5f7a 70%, #1c4356 100%)",
          }}
        />
        {/* Distant coastline */}
        <svg className="absolute bottom-[42%] left-0 w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <polygon points="0,120 0,70 120,40 260,75 420,30 600,68 780,45 1000,80 1000,120" fill="#3a5f70" opacity="0.55" />
          <polygon points="0,120 0,90 180,60 380,95 560,55 760,90 1000,65 1000,120" fill="#2c4a58" opacity="0.7" />
        </svg>
        {/* Water */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            bottom: "30%",
            background: "linear-gradient(to bottom, #2c6a85 0%, #1e4f66 60%, #173e50 100%)",
          }}
        />
        {/* Soft glow on water */}
        <div
          className="absolute"
          style={{
            width: "160px",
            height: "180px",
            left: "50%",
            top: "58%",
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, rgba(255,217,138,0.28), rgba(255,217,138,0))",
            filter: "blur(6px)",
          }}
        />
        {/* Pool edge / terrace stone */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            top: "70%",
            background: "linear-gradient(to bottom, #e8dcc4 0%, #d9c9a6 40%, #c9b78f 100%)",
          }}
        />
        <div className="absolute left-0 right-0" style={{ top: "70%", height: "4px", background: "#1e4f66" }} />

        {/* Table with two glasses + lemons, foreground, off to one side */}
        <div className="absolute" style={{ right: "8%", bottom: "6%" }}>
          <svg width="260" height="140" viewBox="0 0 260 140">
            {/* Table surface */}
            <ellipse cx="130" cy="118" rx="120" ry="18" fill="#caa86a" opacity="0.9" />
            <ellipse cx="130" cy="116" rx="120" ry="16" fill="#d9bb82" />

            {/* Lemons */}
            <circle cx="60" cy="106" r="13" fill="#f0c43a" />
            <circle cx="78" cy="112" r="11" fill="#f3cd4f" />
            <ellipse cx="58" cy="101" rx="3" ry="2" fill="#7a9c3e" />

            {/* Glass 1 */}
            <path d="M150,60 L156,108 L172,108 L178,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M152,75 L156,108 L172,108 L176,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="164" y1="108" x2="164" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="164" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Glass 2 */}
            <path d="M190,60 L196,108 L212,108 L218,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M192,75 L196,108 L212,108 L216,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="204" y1="108" x2="204" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="204" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Mint sprig */}
            <ellipse cx="168" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(-20 168 64)" />
            <ellipse cx="208" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(15 208 64)" />
          </svg>
        </div>

        {/* Warm overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 40%)" }}
        />

        {/* Caption */}
        <div className="absolute left-6 md:left-14 bottom-10 md:bottom-14 z-10 max-w-md">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#E8D38A]/80 mb-3">Het gouden uur</p>
          <p
            className="font-serif italic text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Twee glazen.<br />Een terras.<br />Een avond die niet eindigt.
          </p>
        </div>
      </section>

      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ProductsPage({ cart }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">De Producten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Twee manieren om Vivace te drinken
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/5">
        {Object.values(PRODUCTS).map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <div className="bg-[#102338] p-10 md:p-12 flex flex-col items-center text-center gap-6 h-full">
              {p.id === "limoncello" ? (
                <img
                  src="/images/vivace-bottle-hero.jpg"
                  alt="Vivace Limoncello fles"
                  className="w-full max-w-[180px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              ) : (
                <img
                  src="/images/vivace-can-hero.jpg"
                  alt="Vivace Limoncello Spritz blikje"
                  className="w-full max-w-[150px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              )}

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-2">{p.type}</p>
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-xs">{p.description}</p>
                <p className="text-[#D4AF37]/60 text-xs italic mb-4">{p.backLabel}</p>
                <p className="text-white/20 text-[11px] tracking-wide mb-1">
                  {p.abv} · {p.size}
                </p>
                <p className="text-white/15 text-[10px] tracking-wide mb-6">{p.kcal}</p>
              </div>

              <div className="w-full">
                {p.comingSoon ? (
                  <button
                    disabled
                    className="border border-white/15 text-white/35 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Binnenkort
                  </button>
                ) : p.onlineSellable ? (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-medium">€{p.price.toFixed(2)}</span>
                    <button
                      onClick={() => cart.add(p.id)}
                      className="bg-[#D4AF37] text-black px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#E0C158] transition-colors"
                    >
                      Voeg toe
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/verkooppunten"
                    className="border border-[#D4AF37]/40 text-[#D4AF37] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#D4AF37] hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    Vind in winkel <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              {p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Vivace Spritz is in ontwikkeling. Binnenkort beschikbaar.
                </p>
              )}
              {!p.onlineSellable && !p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een
                  erkende slijterij. Vivace Limoncello is daarom te koop bij onze partners.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StoresPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Verkooppunten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vind Vivace bij jou in de buurt
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Vivace Limoncello is te koop bij supermarkten en restaurants. Vivace Spritz in blik is
          in ontwikkeling en volgt later.
        </p>
      </Reveal>

      <div className="space-y-10">
        {STOCKISTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <div className="border border-[#234060] overflow-hidden">
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#D4AF37] flex-shrink-0" size={22} />
                  <div>
                    <p className="text-white/90 font-medium">{s.name}</p>
                    <p className="text-white/40 text-sm">
                      {s.type} · {s.address}, {s.postcode} {s.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {s.products.map((pid) => (
                    <span key={pid} className="text-[10px] uppercase tracking-wider text-[#C9A04E] border border-[#C9A04E]/30 px-3 py-1">
                      {PRODUCTS[pid].name}
                    </span>
                  ))}
                  <a
                    href={mapsLinkUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-white/50 border border-white/20 px-3 py-1.5 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                  >
                    Open in Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
              <iframe
                title={`Kaart ${s.name}`}
                src={mapsEmbedUrl(s)}
                className="w-full h-64 border-t border-[#234060]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={STOCKISTS.length * 100}>
        <p className="text-white/25 text-xs mt-10 italic">
          Sta je hier nog niet bij en wil je Vivace verkopen? Neem contact met ons op via de
          contactpagina.
        </p>
      </Reveal>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons Verhaal</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace bestaat om iets terug te geven.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6 text-white/55 leading-relaxed text-[15px] mb-16">
          <p>
            Voor elke fles die we verkopen, gaat <strong className="text-white/85">€1 rechtstreeks
            naar geselecteerde impactprojecten.</strong> Geen bijzaak, geen marketingtruc die later is
            bedacht: het was vanaf het begin de reden om Vivace te bouwen.
          </p>
          <p>
            Het idee is ontstaan tijdens een reis naar Rome, waar het Colosseum en de kennismaking
            met authentieke Italiaanse limoncello samenkwamen. Maar winst alleen voelde nooit als
            een goede reden om een merk te starten. Dus werd de vraag simpel:{" "}
            <strong className="text-white/85">
              als dit geld kan opleveren, waarom zou dat geld dan niet net zo goed ergens anders
              voor werken?
            </strong>
          </p>
          <p>
            Zo werd Vivace een premium limoncello met een Italiaans recept en een Nederlands hart,
            gebouwd rond één vast principe: €1 per fles, transparant herleidbaar, naar mensen voor
            wie het leven zwaarder is dan het zou moeten zijn.
          </p>
          <p className="text-[#D4AF37]/80 font-medium">
            Dat is Vivace. Niet voor ons. Voor jou, en voor hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="bg-[#102338] border border-[#D4AF37]/10 p-10 mb-16 text-center">
          <p className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Voor het leven, van jou en van hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="grid grid-cols-2 gap-6 text-center border-t border-[#234060] pt-12 mb-20 max-w-md mx-auto">
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Per fles naar impact</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>2</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Producten op de roadmap</p>
          </div>
        </div>
      </Reveal>

      {/* Impact model */}
      <Reveal delay={400}>
        <div className="border-t border-[#234060] pt-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons impactmodel</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            €1 per fles, naar geselecteerde impactprojecten
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-white/55 leading-relaxed text-[15px]">
              Voor elke fles Vivace die verkocht wordt, doneren we €1 aan een selectie van
              impactprojecten. Geen vage belofte, geen ingewikkelde constructies: een vast bedrag,
              per fles, transparant te herleiden. Dat maakt het model net zo schaalbaar als het merk
              zelf — voor de consument thuis, én voor onze partners in retail en horeca.
            </p>
            <div className="bg-[#102338] border border-[#234060] p-8">
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1,00</p>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-6">Vast donatiebedrag per fles</p>
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
              <p className="text-white/35 text-xs uppercase tracking-wider">Transparant herleidbaar naar verkochte flessen</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
  // a form at formspree.io (free account, takes ~2 minutes, no credit card).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-2xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Laten we praten
        </h1>
        <p className="text-white/45 mb-12">
          Vragen over Vivace, interesse als verkooppunt, of gewoon nieuwsgierig? Stuur een bericht.
        </p>
      </Reveal>

      <Reveal delay={100}>
        {status === "sent" ? (
          <div className="border border-[#C9A04E]/30 p-8 text-center">
            <p className="text-[#C9A04E] font-medium mb-2">Bedankt voor je bericht!</p>
            <p className="text-white/40 text-sm">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="naam"
              placeholder="Naam"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mailadres"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <textarea
              name="bericht"
              placeholder="Je bericht"
              required
              rows={5}
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#D4AF37] text-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#E0C158] transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Versturen..." : "Verstuur bericht"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs">
                Er ging iets mis. Probeer het opnieuw of mail direct naar drinkvivace@gmail.com.
              </p>
            )}
          </form>
        )}
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 pt-10 border-t border-[#234060] text-white/35 text-sm space-y-1">
          <p>info@drinkvivace.nl</p>
          <p>drinkvivace@gmail.com <span className="text-white/20 text-xs">(tijdelijk, werkt al)</span></p>
          <p>Nederland</p>
        </div>
      </Reveal>

      <Reveal delay={250}>
        <div className="mt-10 pt-10 border-t border-[#234060]">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-3">Gedistilleerd door</p>
          <p className="text-white/45 text-sm leading-relaxed">
            Stokerij Klopman<br />
            Van Nelleweg 1, Kelder 3<br />
            3044 BC Rotterdam
          </p>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- FAQ Page ----------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#234060]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-white/90 text-base md:text-lg leading-snug pr-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {q}
        </span>
        <span className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronRight size={16} className="rotate-90" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 pr-8 text-white/45 text-sm md:text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    title: "Het product",
    items: [
      {
        q: "Wat is Vivace Limoncello precies?",
        a: "Vivace is een limoncello van 30% ALC/VOL, gemaakt volgens een authentiek Italiaans recept. Geproduceerd in Nederland bij een ambachtelijke distilleerderij, met smaken die recht doen aan de Italiaanse traditie.",
      },
      {
        q: "Is Vivace in Italië gemaakt?",
        a: "Het recept is Italiaans, maar Vivace wordt geproduceerd in Nederland. Daarom staat op het etiket 'Prelibatezza Italiana' (Italiaanse lekkernij), in plaats van een claim dat het product zelf uit Italië komt.",
      },
      {
        q: "Welke ingrediënten zitten er in?",
        a: "Vivace bevat citroenschil, alcohol, water en suiker. Voor exacte ingrediënten en allergenen verwijzen we naar het etiket op de fles.",
      },
      {
        q: "Hoe drink je Vivace het beste?",
        a: "Traditioneel goed gekoeld als digestief, direct uit de vriezer. Vivace is ook heerlijk als basis voor een spritz: limoncello met prosecco en bruiswater over ijs.",
      },
      {
        q: "Hoeveel calorieën heeft Vivace?",
        a: "218 kcal per 100ml, wat neerkomt op ongeveer 75 kcal per shot van 35ml.",
      },
    ],
  },
  {
    title: "Bestellen & verkooppunten",
    items: [
      {
        q: "Waar kan ik Vivace kopen?",
        a: "Bekijk onze Verkooppunten-pagina voor een actueel overzicht van winkels en restaurants waar Vivace verkrijgbaar is.",
      },
      {
        q: "Kan ik Vivace direct via de website bestellen?",
        a: "Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een erkende slijterij. Daarom verkopen we via onze fysieke verkooppunten in plaats van rechtstreeks via de site.",
      },
      {
        q: "Ben je een winkel of horecazaak en wil je Vivace verkopen?",
        a: "Mooi! Neem contact met ons op via de contactpagina met wat informatie over je zaak, dan nemen we snel contact op.",
      },
      {
        q: "Is er een minimumleeftijd om Vivace te kopen?",
        a: "Ja. Vivace is alleen bestemd voor personen van 18 jaar en ouder, zoals wettelijk vereist voor alcoholhoudende dranken in Nederland.",
      },
    ],
  },
  {
    title: "Vivace & impact",
    items: [
      {
        q: "Hoe werkt het donatiemodel van Vivace?",
        a: "Voor elke verkochte fles Vivace doneren we €1 aan geselecteerde impactprojecten. Een vast bedrag, per fles, onafhankelijk van marge of omzet.",
      },
      {
        q: "Waarom een vast bedrag per fles, in plaats van een percentage van de winst?",
        a: "Een vast bedrag is transparant en voorspelbaar — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt het model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, zonder dat dit afhangt van hoe een kwartaal er financieel uitziet.",
      },
      {
        q: "Welke projecten steunt Vivace?",
        a: "We doneren aan een selectie van impactprojecten. Voor de meest actuele informatie hierover kun je contact met ons opnemen.",
      },
      {
        q: "Hoe weet ik dat de donatie echt gebeurt?",
        a: "Transparantie vinden we belangrijk. Heb je vragen over hoe we dit bijhouden, neem dan gerust contact met ons op.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Vragen</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Veelgestelde vragen
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Alles wat je wilt weten over Vivace — van het product tot ons donatiemodel.
        </p>
      </Reveal>

      {FAQ_SECTIONS.map((section, i) => (
        <Reveal key={section.title} delay={i * 100}>
          <div className={i > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-2xl text-[#D4AF37] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {section.title}
            </h2>
            <div className="h-px w-full bg-[#1c3450] mb-2" />
            <div>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div className="mt-16 text-center border-t border-[#234060] pt-10">
          <p className="text-white/40 text-sm mb-3">Staat je vraag er niet bij?</p>
          <Link
            to="/contact"
            className="text-[#D4AF37] font-serif italic text-lg border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Neem contact met ons op
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- Recipe Page ----------
// ---------- Blog ----------
// Unified blog covering three post types: recept (recipe), nieuws (news),
// verkooppunt (new stockist announcement). Recipe posts carry the full
// ingredients/steps/serving-adjuster data; other types are simpler articles.
const BLOG_CATEGORIES = [
  { id: "alle", label: "Alle" },
  { id: "recept", label: "Recept" },
  { id: "nieuws", label: "Nieuws" },
  { id: "verkooppunt", label: "Verkooppunten" },
];

const BLOG_POSTS = [
  {
    id: "spritz-klassiek",
    type: "recept",
    title: "Vivace Limoncello Spritz — het klassieke recept",
    date: "2026-06-01",
    image: "/images/vivace-instagram-recepten-spritz.png",
    excerpt: "De originele: fris, lichtzoet en gevuld met bubbels. Het recept waarmee alles begon.",
    ingredients: [
      { amount: 5, unit: "cl", name: "Vivace Limoncello" },
      { amount: 10, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 3, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje munt (optioneel)" },
    ],
    steps: [
      "Vul een groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam, om de bubbels te behouden.",
      "Maak af met een scheutje bruiswater.",
      "Garneer met een schijfje citroen en eventueel een takje munt. Direct serveren.",
    ],
  },
  {
    id: "spritz-light",
    type: "recept",
    title: "Vivace Spritz Light — lichter en langer",
    date: "2026-06-01",
    excerpt: "Iets lichter en langer, met meer bruiswater. Perfect voor een lange, warme middag.",
    ingredients: [
      { amount: 4, unit: "cl", name: "Vivace Limoncello" },
      { amount: 8, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 8, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
    ],
    steps: [
      "Vul een groot longdrinkglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe.",
      "Vul aan met ruim bruiswater voor een lichtere, langere drank.",
      "Garneer met een schijfje citroen.",
    ],
  },
  {
    id: "spritz-intenso",
    type: "recept",
    title: "Vivace Spritz Intenso — voor de echte liefhebber",
    date: "2026-06-01",
    excerpt: "Voor wie de limoncello echt wil proeven: een stevigere pour met minder verdunning.",
    ingredients: [
      { amount: 7, unit: "cl", name: "Vivace Limoncello" },
      { amount: 7, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje rozemarijn (optioneel)" },
    ],
    steps: [
      "Vul een tumbler of groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam.",
      "Garneer met een schijfje citroen en eventueel een takje rozemarijn.",
    ],
  },
  {
    id: "instagram-launch",
    type: "nieuws",
    title: "Vivace is live op Instagram",
    date: "2026-06-29",
    image: "/images/vivace-instagram-launch.png",
    excerpt: "Vivace is nu ook te volgen op Instagram. Volg @drinkvivace voor nieuwe recepten, verkooppunten en updates over ons impactmodel.",
    body: [
      "Vivace is nu ook te volgen op Instagram via @drinkvivace. Daar delen we als eerste nieuwe Spritz-recepten, aankondigingen van nieuwe verkooppunten, en updates over ons impactmodel.",
      "€1 van elke verkochte fles gaat naar geselecteerde impactprojecten — premium kwaliteit met een heldere belofte, bij elke borrel.",
      "Volg ons om op de hoogte te blijven, en laat gerust weten met wie jij je eerste glas Vivace zou delen.",
    ],
  },
  {
    id: "instagram-label-onthulling",
    type: "nieuws",
    title: "Het Vivace-etiket, onthuld",
    date: "2026-07-03",
    image: "/images/vivace-instagram-label-reveal.png",
    excerpt: "Simpel, met opzet. Geen opgevulde tekst over ons verhaal, wel een QR-code naar de rest. Zo ziet het etiket eruit dat straks op elke fles staat.",
    body: [
      "Deze week deelden we op Instagram het definitieve ontwerp van het Vivace-etiket.",
      "Bewust simpel: geen lange tekst over ons verhaal of ons impactmodel op de fles zelf. In plaats daarvan een kleine QR-code die rechtstreeks naar drinkvivace.nl leidt, waar het hele verhaal wel te lezen is.",
      "Het resultaat is een etiket dat op de plank meteen opvalt, zonder dat het overvol aanvoelt. Binnenkort te zien op echte flessen bij onze verkooppunten.",
    ],
  },
  {
    id: "voor-het-leven-van-jou-en-van-hen",
    type: "nieuws",
    title: "Voor het leven, van jou en van hen",
    date: "2026-07-11",
    image: "/images/vivace-instagram-giveback.png",
    excerpt: "Vivace is meer dan een likeur. €1 van elke fles gaat naar impactprojecten, geen bijzaak, maar de reden dat we bestaan.",
    body: [
      "Vivace is meer dan een likeur. Voor elke fles die we verkopen, geven we €1 terug aan mensen voor wie het leven zwaarder is dan het zou moeten zijn.",
      "Vivace betekent levendig, vol leven. Dat is wat we vieren: de avonden die te lang duren, de tafels die te vol staan, het gevoel dat er even niets anders hoeft te bestaan dan dit moment. Geïnspireerd door Rome, gemaakt in Nederland, gebouwd rond één simpel idee: het goede leven is pas compleet als je het deelt.",
      "Dus wanneer je een fles Vivace opent, doe je meer dan proosten. Je geeft iets door.",
      "Voor het leven, van jou en van hen.",
    ],
  },
  {
    id: "nieuw-impactmodel",
    type: "nieuws",
    title: "Vivace gaat over op een vast donatiebedrag: €1 per fles",
    date: "2026-06-20",
    excerpt: "We hebben ons impactmodel aangescherpt. In plaats van een percentage van de winst, doneren we nu een vast bedrag van €1 per verkochte fles — transparant en schaalbaar.",
    body: [
      "Vanaf nu doneert Vivace €1 voor elke verkochte fles aan geselecteerde impactprojecten. Dit vervangt ons eerdere model, waarbij we een deel van de winst doneerden.",
      "Waarom de verandering? Een vast bedrag per fles is voorspelbaar en transparant — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt ons model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, onafhankelijk van marges of hoe een kwartaal er financieel uitziet.",
      "Op onze website vind je een live teller die het aantal verkochte flessen en het totaal gedoneerde bedrag laat zien. Deze teller wordt de komende tijd gekoppeld aan onze echte verkoopdata.",
    ],
  },
  {
    id: "nieuwe-verkooppunt",
    type: "verkooppunt",
    title: "Vivace nu ook te koop bij een nieuw verkooppunt",
    date: "2026-06-15",
    excerpt: "We breiden uit! Vivace Limoncello is sinds deze week te koop bij een nieuw verkooppunt.",
    body: [
      "We zijn verheugd om aan te kondigen dat Vivace Limoncello vanaf deze week verkrijgbaar is bij een nieuw verkooppunt. Bekijk de volledige lijst en adressen op onze Verkooppunten-pagina.",
      "Ben je zelf een winkel, slijterij of horecazaak en wil je Vivace in je assortiment? Neem contact met ons op via de contactpagina — we denken graag mee.",
    ],
  },
  {
    id: "het-moment",
    type: "nieuws",
    title: "Voor het aperitief. Of gewoon omdat het kan.",
    date: "2026-07-18",
    image: "/images/vivace-instagram-het-moment.png",
    excerpt: "Je hoeft niet te wachten op een speciale gelegenheid. Vivace maakt gewone momenten een beetje beter.",
    body: [
      "Je hoeft niet te wachten op een speciale gelegenheid. Vivace is er voor het aperitief voor het eten, voor een rustige avond op het balkon, of voor geen enkele reden behalve dat het weekend is.",
      "Gekoeld uit de vriezer, puur in een klein glas, is vaak al genoeg.",
      "We zien Vivace niet als iets voor speciale momenten. We zien het als iets dat gewone momenten een beetje beter maakt. Een druppel Italiaanse zomer, ook op een doordeweekse dinsdag.",
    ],
  },
  {
    id: "waarom-eenmaal-per-jaar-doneren",
    type: "nieuws",
    title: "Waarom we €1 per fles sparen, niet meteen weggeven",
    date: "2026-07-18",
    image: "/images/vivace-instagram-giveback-jaarlijks.png",
    excerpt: "Elke fles legt €1 opzij. Aan het einde van het jaar doneren we het volledige bedrag in één keer, niet per verkoop.",
    body: [
      "Bij elke fles Vivace die verkocht wordt, leggen we €1 opzij voor impactprojecten. Niet als losse donatie bij elke verkoop, maar als onderdeel van een pot die het hele jaar door groeit.",
      "Aan het einde van het jaar tellen we alles op en maken we het volledige bedrag in één keer over aan de projecten die we dat jaar hebben geselecteerd.",
      "We kozen bewust voor deze aanpak, om twee redenen. Ten eerste schaal: honderd losse donaties van een paar euro verdwijnen, terwijl één substantieel bedrag een project echt vooruit kan helpen. Ten tweede zorgvuldigheid: door te wachten tot het einde van het jaar hebben we tijd om de juiste projecten te vinden en te beoordelen, in plaats van overhaaste keuzes te maken bij elke losse verkoop.",
      "Aan het einde van het jaar laten we precies zien waar het geld naartoe is gegaan: welk project, hoeveel, en waarom.",
    ],
  },
];

function formatRecipeAmount(amount, servings) {
  if (amount === null) return null;
  const scaled = Math.round(amount * servings * 10) / 10;
  return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
}

function formatBlogDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, onOpen }) {
  return (
    <button
      onClick={() => onOpen(post.id)}
      className="text-left border border-[#234060] hover:border-[#D4AF37]/40 transition-colors flex flex-col h-full overflow-hidden"
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
          {BLOG_CATEGORIES.find((c) => c.id === post.type)?.label || post.type}
        </span>
        <h3 className="font-serif text-xl text-white/90 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {post.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <span className="text-white/25 text-xs">{formatBlogDate(post.date)}</span>
      </div>
    </button>
  );
}

function RecipeBody({ post }) {
  const [servings, setServings] = useState(1);
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12">
      <div className="flex items-center justify-end mb-10">
        <div className="flex items-center gap-4">
          <span className="text-white/35 text-[10px] uppercase tracking-[0.15em]">Glazen</span>
          <div className="flex items-center gap-3 border border-[#234060]">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Minder glazen"
            >
              <Minus size={14} />
            </button>
            <span className="font-serif text-[#D4AF37] text-base w-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {servings}
            </span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Meer glazen"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Ingrediënten</p>
          <ul className="space-y-3">
            {post.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-white/80 text-sm border-b border-[#1c3450] pb-3">
                <span>{ing.name}</span>
                {ing.amount !== null && (
                  <span className="font-serif text-[#D4AF37] whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatRecipeAmount(ing.amount, servings)} {ing.unit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Bereiding</p>
          <ol className="space-y-4">
            {post.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-white/55 leading-relaxed">
                <span className="font-serif text-[#D4AF37] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-[#1c3450]">
        <p className="font-serif italic text-white/40 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Tip: bewaar je Vivace in de vriezer voor het koudste, meest verfrissende resultaat.
        </p>
        <p className="text-white/20 text-[11px] mt-4">Drink met aandacht, drink met mate. 18+.</p>
      </div>
      </div>
    </div>
  );
}

function ArticleBody({ post }) {
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12 space-y-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-white/55 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const [filter, setFilter] = useState("alle");
  const [openId, setOpenId] = useState(null);

  const filtered = filter === "alle" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.type === filter);
  const openPost = openId ? BLOG_POSTS.find((p) => p.id === openId) : null;

  if (openPost) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
        <button
          onClick={() => setOpenId(null)}
          className="text-white/40 text-[11px] uppercase tracking-wider mb-10 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
        >
          ← Terug naar blog
        </button>
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
            {BLOG_CATEGORIES.find((c) => c.id === openPost.type)?.label}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {openPost.title}
          </h1>
          <p className="text-white/30 text-xs mb-10">{formatBlogDate(openPost.date)}</p>
        </Reveal>
        <Reveal delay={100}>
          {openPost.type === "recept" ? <RecipeBody post={openPost} /> : <ArticleBody post={openPost} />}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Blog</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Recepten, nieuws & verkooppunten
        </h1>
        <p className="text-white/45 max-w-lg mb-12">
          Alles op één plek: nieuwe manieren om Vivace te serveren, updates over ons impactmodel, en
          waar je Vivace als eerste kunt vinden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.14em] border transition-colors ${
                filter === c.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "text-white/50 border-[#234060] hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((post, i) => (
          <Reveal key={post.id} delay={150 + i * 80}>
            <BlogCard post={post} onOpen={setOpenId} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Privacybeleid
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Dit privacybeleid legt uit welke gegevens Vivace verzamelt,
          waarom, en welke rechten je hebt.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Vivace wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven bij de
            Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD Poortugaal,
            Nederland. Voor vragen over dit privacybeleid kun je contact opnemen via
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="2. Welke gegevens we verzamelen">
          <p>Wij verzamelen alleen de gegevens die je zelf actief met ons deelt, namelijk via het contactformulier op onze website:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>De inhoud van je bericht</li>
          </ul>
          <p>
            Wij gebruiken geen trackingcookies, geen advertentiepixels en verzamelen geen
            gegevens voor profilering of marketingdoeleinden zonder jouw expliciete toestemming.
          </p>
        </LegalSection>

        <LegalSection title="3. Waarom we deze gegevens verzamelen">
          <p>
            We gebruiken de gegevens uit het contactformulier uitsluitend om je vraag, opmerking of
            verzoek (bijvoorbeeld als potentiële verkooppartner) te kunnen beantwoorden. We gebruiken
            je gegevens niet voor geautomatiseerde besluitvorming en delen ze niet met derden voor
            commerciële doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="4. Hoe lang we gegevens bewaren">
          <p>
            Berichten via het contactformulier bewaren we niet langer dan noodzakelijk om je vraag
            te kunnen afhandelen, en in elk geval niet langer dan 24 maanden
            na het laatste contact, tenzij we wettelijk verplicht zijn gegevens langer te bewaren.
          </p>
        </LegalSection>

        <LegalSection title="5. Derde partijen">
          <p>
            Ons contactformulier wordt verwerkt via Formspree, een derde partij die berichten van
            het formulier naar ons doorstuurt. Voor meer informatie over hoe Formspree gegevens
            verwerkt, verwijzen we naar hun eigen privacybeleid.
          </p>
          <p>
            Onze website wordt gehost via Vercel. Standaard servertechnische gegevens (zoals
            IP-adres en tijdstip van bezoek) kunnen door onze hostingpartij worden gelogd voor
            beveiligings- en technische doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="6. Jouw rechten">
          <p>Onder de AVG (GDPR) heb je het recht om:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Inzage te krijgen in de gegevens die we van je hebben</li>
            <li>Je gegevens te laten corrigeren of verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p>
            Wil je gebruikmaken van een van deze rechten? Stuur een e-mail naar
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="7. Wijzigingen in dit beleid">
          <p>
            We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie is
            altijd te vinden op deze pagina, met de datum van de laatste wijziging hierboven.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Algemene voorwaarden
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Deze voorwaarden zijn van toepassing op het gebruik van deze
          website en op de informatie die hierop wordt aangeboden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Deze website wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven
            bij de Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD
            Poortugaal, Nederland. BTW-identificatienummer: NL004279162B10.
          </p>
        </LegalSection>

        <LegalSection title="2. Leeftijdsgrens">
          <p>
            Vivace Limoncello is een alcoholhoudend product (30% ALC/VOL) en is uitsluitend bestemd
            voor personen van 18 jaar en ouder. Door deze website te gebruiken bevestig je dat je
            18 jaar of ouder bent. Het is verboden alcohol te verkopen aan, of te laten consumeren
            door, personen onder de 18 jaar, conform de Nederlandse Alcoholwet.
          </p>
        </LegalSection>

        <LegalSection title="3. Verkoop via derde partijen">
          <p>
            Vivace Limoncello wordt niet rechtstreeks via deze website verkocht. Sterke drank (30%
            ALC/VOL of hoger) mag in Nederland alleen online verkocht worden door een hiervoor
            erkende slijterij. Vivace is daarom uitsluitend verkrijgbaar via de fysieke
            verkooppunten die op deze website worden vermeld. Voor vragen over prijs,
            beschikbaarheid of voorraad bij een specifiek verkooppunt verwijzen we je naar dat
            verkooppunt zelf.
          </p>
        </LegalSection>

        <LegalSection title="4. Impact- en donatiemodel">
          <p>
            Vivace doneert €1 per verkochte fles aan geselecteerde impactprojecten. Dit bedrag is
            vast en wordt niet beïnvloed door de verkoopprijs die door individuele verkooppunten
            wordt gehanteerd. De op deze website weergegeven tellers (aantal verkochte flessen en
            totaal gedoneerd bedrag) zijn indicatief en worden periodiek bijgewerkt; zie ook onze
            Onze Impact-pagina voor meer toelichting.
          </p>
        </LegalSection>

        <LegalSection title="5. Intellectueel eigendom">
          <p>
            Alle content op deze website — waaronder teksten, het Vivace-logo, productfoto's,
            illustraties en de vormgeving van het etiket — is eigendom van VVM Trading of wordt
            gebruikt met toestemming van de rechthebbende. Niets van deze website mag worden
            gekopieerd, verspreid of commercieel gebruikt zonder voorafgaande schriftelijke
            toestemming.
          </p>
        </LegalSection>

        <LegalSection title="6. Aansprakelijkheid">
          <p>
            We doen ons best om de informatie op deze website actueel en correct te houden, maar
            kunnen niet garanderen dat alle informatie op elk moment volledig juist of up-to-date
            is. VVM Trading is niet aansprakelijk voor schade die voortvloeit uit het gebruik van
            deze website of uit het gebruik van het product, behalve in gevallen van opzet of grove
            schuld, of voor zover dwingend Nederlands recht anders bepaalt.
          </p>
        </LegalSection>

        <LegalSection title="7. Toepasselijk recht">
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen worden
            voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>
            Vragen over deze voorwaarden? Neem contact met ons op via info@drinkvivace.nl.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-[#1c3450] px-6 md:px-14 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 items-center gap-8 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <p className="font-serif text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Vivace
          </p>
          <a
            href="https://instagram.com/drinkvivace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#D4AF37] transition-colors"
            aria-label="Vivace op Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
        <p className="font-serif italic text-sm text-white/20 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "Doe anders, geniet anders."
        </p>
        <ul className="flex gap-7 justify-center md:justify-end text-[11px] uppercase tracking-wider text-white/25 flex-wrap">
          {footerLinks.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className="hover:text-[#D4AF37] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-[11px] text-white/15 mt-10 pt-8 border-t border-[#1c3450]">
        © 2026 Vivace · Drink verantwoord. 18+
      </p>
      <div className="flex gap-6 justify-center text-[10px] uppercase tracking-wider text-white/20 mt-4">
        <Link to="/privacybeleid" className="hover:text-[#D4AF37] transition-colors">
          Privacybeleid
        </Link>
        <Link to="/algemene-voorwaarden" className="hover:text-[#D4AF37] transition-colors">
          Algemene voorwaarden
        </Link>
      </div>
    </footer>
  );
}

// ---------- App ----------
// Scrolls to top whenever the route changes, replacing the old
// useEffect([page]) behavior now that navigation uses real URLs.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppShell() {
  const [ageConfirmed, setAgeConfirmed] = useState(null); // null | true | false
  const [showWelcome, setShowWelcome] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const handleAgeConfirm = (confirmed) => {
    setAgeConfirmed(confirmed);
    if (confirmed) setShowWelcome(true);
  };

  if (ageConfirmed === null) return <AgeGate onConfirm={handleAgeConfirm} />;
  if (ageConfirmed === false) return <UnderageBlock />;

  return (
    <div className="bg-[#0a1628] text-white min-h-screen font-sans" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#0a1628" }}>
      <ScrollToTop />
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      <Nav cart={cart} setCartOpen={setCartOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producten" element={<ProductsPage cart={cart} />} />
        <Route path="/verkooppunten" element={<StoresPage />} />
        <Route path="/over-ons" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacybeleid" element={<PrivacyPage />} />
        <Route path="/algemene-voorwaarden" element={<TermsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

// ---------- App ----------
export default function VivaceApp() {
  return (
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  );
}          <stop offset="15%" stopColor="#f5f2e4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#e8d98a" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#d4c468" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b8a84a" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0d050" />
          <stop offset="50%" stopColor="#f7dc6f" />
          <stop offset="100%" stopColor="#d4af2a" />
        </linearGradient>
        {/* Cream label */}
        <linearGradient id="bLabelBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7f3e8" />
          <stop offset="100%" stopColor="#efe8d8" />
        </linearGradient>
        {/* Sky for colosseum scene */}
        <linearGradient id="bSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="bShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="38%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bClip">
          <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" />
        </clipPath>
        <clipPath id="bSceneClip">
          <rect x="26" y="142" width="58" height="34" />
        </clipPath>
      </defs>

      {/* Glass bottle body */}
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bLiquid)" />
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bShine)" />

      {/* Label background - cream */}
      <rect x="24" y="96" width="62" height="190" rx="2" fill="url(#bLabelBg)" clipPath="url(#bClip)" />
      <rect x="24" y="96" width="62" height="190" rx="2" fill="none" stroke="#2c5f8a" strokeWidth="1.5" clipPath="url(#bClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#bSceneClip)">
        <rect x="26" y="142" width="58" height="22" fill="url(#bSky)" />
        {/* Colosseum structure */}
        <rect x="32" y="152" width="46" height="14" fill="#c98a52" />
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={i} x={34 + i * 4} y="154" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="32" y="150" width="46" height="2.5" fill="#e8c896" />
        {/* golden rocky foreground */}
        <rect x="26" y="164" width="58" height="12" fill="#c9a23a" />
        <polygon points="28,176 33,166 38,176" fill="#b3892e" />
        <polygon points="40,176 46,167 52,176" fill="#bf9433" />
        <polygon points="54,176 60,168 66,176" fill="#b3892e" />
        <polygon points="68,176 74,166 80,176" fill="#bf9433" />
      </g>
      <rect x="26" y="142" width="58" height="34" fill="none" stroke="#2c5f8a" strokeWidth="1" clipPath="url(#bClip)" />

      {/* VIVACE wordmark */}
      <text x="55" y="195" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#1f3a4d" letterSpacing="2.5" clipPath="url(#bClip)">VIVACE</text>
      <text x="55" y="207" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="#5a5240" letterSpacing="2" clipPath="url(#bClip)">LIMONCELLO</text>

      <line x1="32" y1="214" x2="78" y2="214" stroke="#2c5f8a" strokeWidth="0.6" opacity="0.4" clipPath="url(#bClip)" />

      <text x="55" y="226" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="5" fill="#5a5240" letterSpacing="1" clipPath="url(#bClip)">Italiano · 30% VOL · 500ml</text>
      <text x="55" y="237" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#bClip)">218 kcal/100ml · 75 kcal per shot (35ml)</text>

      {/* Lower blue accent band */}
      <rect x="24" y="266" width="62" height="16" fill="#2c5f8a" clipPath="url(#bClip)" />
      <text x="55" y="277" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill="#f0e8cc" letterSpacing="1.5" clipPath="url(#bClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Cap & neck */}
      <rect x="38" y="0" width="34" height="22" rx="2" fill="#c8c8c8" />
      <rect x="38" y="0" width="34" height="22" rx="2" fill="none" stroke="#999" strokeWidth="0.5" />
      <text x="55" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#666" letterSpacing="1">VIVACE</text>
    </svg>
  );
}

function CanSVG({ size = 90 }) {
  const h = size * (220 / 90);
  return (
    <svg width={size} height={h} viewBox="0 0 90 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0d9c0" />
          <stop offset="15%" stopColor="#f7f3e8" />
          <stop offset="50%" stopColor="#fbf8ee" />
          <stop offset="85%" stopColor="#efe8d8" />
          <stop offset="100%" stopColor="#d8cfb0" />
        </linearGradient>
        <linearGradient id="cSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="cTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <clipPath id="cClip">
          <rect x="10" y="18" width="70" height="186" rx="8" />
        </clipPath>
        <clipPath id="cSceneClip">
          <rect x="14" y="56" width="62" height="36" />
        </clipPath>
      </defs>

      {/* Can body - cream */}
      <rect x="10" y="18" width="70" height="186" rx="8" fill="url(#cBody)" />

      {/* Blue accent stripes */}
      <rect x="10" y="44" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />
      <rect x="10" y="186" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#cSceneClip)">
        <rect x="14" y="56" width="62" height="24" fill="url(#cSky)" />
        <rect x="20" y="68" width="50" height="14" fill="#c98a52" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={22 + i * 4} y="70" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="20" y="66" width="50" height="2.5" fill="#e8c896" />
        <rect x="14" y="80" width="62" height="12" fill="#c9a23a" />
        <polygon points="18,92 24,82 30,92" fill="#b3892e" />
        <polygon points="32,92 39,83 46,92" fill="#bf9433" />
        <polygon points="48,92 55,81 62,92" fill="#b3892e" />
        <polygon points="64,92 71,83 78,92" fill="#bf9433" />
      </g>
      <rect x="14" y="56" width="62" height="36" fill="none" stroke="#2c5f8a" strokeWidth="0.8" clipPath="url(#cClip)" />

      {/* VIVACE wordmark */}
      <text x="45" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#1f3a4d" letterSpacing="2" clipPath="url(#cClip)">VIVACE</text>
      <text x="45" y="119" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fill="#5a5240" letterSpacing="1.8" clipPath="url(#cClip)">LIMONCELLO SPRITZ</text>

      <line x1="22" y1="127" x2="68" y2="127" stroke="#2c5f8a" strokeWidth="0.5" opacity="0.4" clipPath="url(#cClip)" />

      <text x="45" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.5" fill="#5a5240" letterSpacing="0.8" clipPath="url(#cClip)">7% VOL · 250ml</text>
      <text x="45" y="147" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#cClip)">95 kcal per blikje</text>

      {/* Lower blue band */}
      <rect x="10" y="160" width="70" height="14" fill="#2c5f8a" clipPath="url(#cClip)" />
      <text x="45" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#f0e8cc" letterSpacing="1" clipPath="url(#cClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Top & bottom */}
      <ellipse cx="45" cy="18" rx="35" ry="7" fill="url(#cTopGrad)" />
      <ellipse cx="45" cy="12" rx="8" ry="3" fill="#999" />
      <rect x="43" y="9" width="4" height="8" rx="2" fill="#888" />
      <ellipse cx="45" cy="204" rx="35" ry="7" fill="#999" />
    </svg>
  );
}

// ---------- Product data ----------
const PRODUCTS = {
  limoncello: {
    id: "limoncello",
    name: "Vivace Limoncello",
    type: "Onze Signature Fles",
    price: 24.95,
    abv: "30% VOL",
    size: "500ml",
    kcal: "218 kcal / 100ml · 75 kcal per shot (35ml)",
    onlineSellable: false,
    description:
      "Echte Italiaanse limoncello, gemaakt door een ambachtelijke distilleerderij hier in Nederland. Citrus, romig en ijskoud het lekkerst.",
    backLabel: '"Wij maken het. Jij drinkt het. Samen geven we door."',
  },
  spritz: {
    id: "spritz",
    name: "Vivace Spritz",
    type: "De Toekomst ⚡",
    price: 3.25,
    abv: "7% VOL",
    size: "250ml",
    kcal: "95 kcal per blikje (250ml)",
    onlineSellable: false,
    comingSoon: true,
    description:
      "Limoncello ontmoet bruisend water. Direct klaar om te drinken, recht uit het blikje. Fris, helder en onmiskenbaar Italiaans.",
    backLabel: '"Nu opentrekken."',
  },
};

// PLACEHOLDER DATA — replace name, address, city, and postcode with your
// real stockists' details. Once you have them, this is the only place you
// need to edit; the page below builds itself from this array automatically.
const STOCKISTS = [
  {
    name: "[Naam supermarkt]",
    type: "Supermarkt",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
  {
    name: "[Naam restaurant]",
    type: "Restaurant",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
];

// Builds a Google Maps embed URL from an address string. No API key needed
// for this basic embed format.
function mapsEmbedUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function mapsLinkUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// ---------- Cart context (simple prop-drill, no localStorage) ----------
function useCart() {
  const [items, setItems] = useState({});

  const add = (id) => setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  const clear = () => setItems({});

  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const total = Object.entries(items).reduce(
    (sum, [id, qty]) => sum + PRODUCTS[id].price * qty,
    0
  );

  return { items, add, remove, clear, count, total };
}

// ---------- Nav ----------
function Nav({ cart, setCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0a1628]/95 border-b border-[#1c3450]" : "bg-gradient-to-b from-[#0a1628]/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vivace
        </Link>

        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  location.pathname === l.path ? "text-[#D4AF37]" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white/80 hover:text-[#D4AF37] transition-colors"
            aria-label="Winkelwagen"
          >
            <ShoppingBag size={20} />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <button className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1c3450] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="text-left text-sm uppercase tracking-wider text-white/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Cart Drawer ----------
function CartDrawer({ open, onClose, cart }) {
  if (!open) return null;
  const entries = Object.entries(cart.items);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#050b14]/80" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0f1f33] border-l border-[#234060] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#234060]">
          <h3 className="font-serif text-xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Winkelwagen
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {entries.length === 0 && (
            <p className="text-white/40 text-sm">Je winkelwagen is leeg. Online bestellen volgt binnenkort.</p>
          )}
          {entries.map(([id, qty]) => {
            const p = PRODUCTS[id];
            return (
              <div key={id} className="flex gap-4 items-center">
                <div className="flex-shrink-0">
                  {id === "limoncello" ? (
                    <img
                      src="/images/vivace-bottle-hero.jpg"
                      alt="Vivace Limoncello"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  ) : (
                    <img
                      src="/images/vivace-can-hero.jpg"
                      alt="Vivace Limoncello Spritz"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">{p.name}</p>
                  <p className="text-xs text-white/40">€{p.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cart.remove(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{qty}</span>
                  <button
                    onClick={() => cart.add(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {entries.length > 0 && (
          <div className="p-6 border-t border-[#234060] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotaal</span>
              <span className="text-white">€{cart.total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#D4AF37]/70 italic">€1 per fles naar impactprojecten — €{(cart.count * 1).toFixed(2)} bij deze bestelling.</p>
            <button className="w-full bg-[#D4AF37] text-black py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158] transition-colors">
              Afrekenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Age gate ----------
function AgeGate({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6" style={{ backgroundColor: "#0a1628" }}>
      <div className="max-w-sm text-center">
        <p className="font-serif text-3xl text-[#D4AF37] tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace
        </p>
        <p className="text-white/70 text-sm mb-2">Ben je 18 jaar of ouder?</p>
        <p className="text-white/30 text-xs mb-8">We vragen dit omdat onze producten alcohol bevatten.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onConfirm(true)}
            className="bg-[#D4AF37] text-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158]"
          >
            Ja, ik ben 18+
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="border border-white/20 text-white/50 px-8 py-3 text-xs uppercase tracking-[0.15em]"
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  );
}

function UnderageBlock() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6 text-center" style={{ backgroundColor: "#0a1628" }}>
      <p className="text-white/50 text-sm max-w-sm">
        Je moet 18 jaar of ouder zijn om deze website te bezoeken. Drink geen alcohol als je jonger bent.
      </p>
    </div>
  );
}

// ---------- Welcome banner ----------
// Shows right after someone confirms they're 18+: a centered, prominent
// modal thanking them and confirming their purchase already contributes to
// an impact project. Auto-dismisses, and can also be closed manually.
function HeartIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M12 21s-7.5-4.6-10-9.1C0.4 8.6 1.8 5 5.4 5c2 0 3.4 1 4.6 2.6C11.2 6 12.6 5 14.6 5 18.2 5 19.6 8.6 18 11.9 16.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function WelcomeBanner({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#050b14]/70 animate-[fadeIn_0.4s_ease-out]"
        onClick={onClose}
      />
      <div className="relative pointer-events-auto bg-[#0F1F33] border border-[#D4AF37]/50 shadow-2xl shadow-black/60 px-8 py-10 md:px-14 md:py-12 max-w-lg w-full text-center animate-[popIn_0.45s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Subtle Italian tricolor accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#3A7A4E]" />
          <div className="flex-1 bg-[#F4EFE3]" />
          <div className="flex-1 bg-[#B5402E]" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Sluiten"
        >
          <X size={22} />
        </button>

        <div className="flex justify-center mb-6">
          <HeartIcon size={48} />
        </div>

        <p
          className="font-serif italic text-[#D4AF37] text-2xl md:text-3xl leading-snug mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Doe anders, geniet anders.
        </p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-2">
          Welkom bij Vivace. Met elke fles die wordt verkocht, draag je al bij aan een
          geselecteerd impactproject.
        </p>
        <p className="text-white/40 text-xs md:text-sm">
          €1 per fles, transparant en zonder omwegen.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Impact Counter ----------
// bottlesSold connects to real sales data later (e.g. backend or payment
// provider webhook). totalDonated is always derived from it — never set
// independently — so the €1-per-bottle math stays correct everywhere.
function ImpactCounter() {
  const [bottlesSold] = useState(0); // TODO: connect to real sales data later
  const totalDonated = bottlesSold * 1;

  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Actueel</p>
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {bottlesSold.toLocaleString("nl-NL")}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Flessen verkocht</p>
        </div>
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {`€${totalDonated.toLocaleString("nl-NL", { minimumFractionDigits: 0 })}`}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Totaal gedoneerd</p>
        </div>
      </div>
      <p className="text-white/35 text-sm mt-8 max-w-sm mx-auto">
        €1 per verkochte fles, rechtstreeks naar geselecteerde impactprojecten.
      </p>
      <p className="text-white/15 text-[11px] mt-3 italic">
        Teller wordt binnenkort live gekoppeld aan onze verkoopdata.
      </p>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-14 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 72% 48%, rgba(62,207,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 28% 58%, rgba(255,215,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A04E] mb-7">
            Gemaakt in Nederland · Italiaanse ziel
          </p>
          <h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-9"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="font-semibold block">Doe</span>
            <em className="italic text-[#D4AF37] block">anders,</em>
            geniet anders.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-12">
            Vivace is een premium limoncello, gemaakt met een Italiaans recept en een Nederlands hart.
            Wie we zijn is minder belangrijk dan wat elke fles teweegbrengt:
            <strong className="text-white/85 font-medium"> €1 van elke verkochte fles gaat rechtstreeks naar geselecteerde impactprojecten.</strong> Transparant,
            schaalbaar, en onderdeel van elke aankoop.
          </p>
          <div className="flex gap-5 items-center flex-wrap">
            <Link
              to="/producten"
              className="bg-[#D4AF37] text-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#E0C158] transition-colors"
            >
              Ontdek Vivace
            </Link>
            <Link
              to="/over-ons"
              className="text-white/45 text-[11px] uppercase tracking-[0.14em] border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors"
            >
              Ons verhaal
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full max-w-md md:max-w-lg">
            <img
              src="/images/vivace-bottle-hero.jpg"
              alt="Vivace Limoncello fles voor het Colosseum"
              className="w-full h-auto rounded-sm shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Mission ticker */}
      <div className="bg-[#D4AF37] overflow-hidden">
        <div className="flex whitespace-nowrap py-4" style={{ animation: "ticker 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, rep) =>
            ["Doe anders", "€1 per fles naar impact", "Premium Italiaans recept", "Transparant en schaalbaar", "Italiaanse ziel · Nederlands hart", "Geniet anders"].map(
              (txt, i) => (
                <span key={`${rep}-${i}`} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                  {txt}
                  <span className="w-1 h-1 rounded-full bg-black/25" />
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* The number */}
      <div className="bg-[#D4AF37] text-center py-24 px-6">
        <Reveal>
          <span className="font-serif font-bold text-black block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(100px, 18vw, 200px)", lineHeight: 0.85 }}>
            €1
          </span>
          <p className="text-black/50 text-[13px] font-semibold tracking-[0.3em] uppercase mt-6">
            Per verkochte fles, naar geselecteerde impactprojecten
          </p>
        </Reveal>
      </div>

      {/* Impact counter */}
      <div className="bg-[#0a1628] py-24 px-6 border-b border-[#1c3450]" style={{ backgroundColor: "#0a1628" }}>
        <Reveal>
          <ImpactCounter />
        </Reveal>
      </div>

      {/* Quick links to stockists */}
      <section className="px-6 md:px-14 py-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Nu te koop</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Te vinden bij supermarkten en restaurants
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {STOCKISTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="border border-[#234060] p-6 flex items-center gap-4 hover:border-[#D4AF37]/30 transition-colors">
                <MapPin className="text-[#D4AF37] flex-shrink-0" size={20} />
                <div>
                  <p className="text-white/90 text-sm font-medium">{s.name}</p>
                  <p className="text-white/40 text-xs">{s.type} · {s.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Golden Hour Scene — the feeling, without a posed model. Moved to the
          end of the homepage so the impact model and stockists lead, and this
          atmospheric closer comes last. */}
      <section className="relative overflow-hidden" style={{ height: "640px" }}>
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1a3a5c 0%, #3d6a8a 22%, #d98a4a 48%, #f0b25a 58%, #2c5f7a 70%, #1c4356 100%)",
          }}
        />
        {/* Distant coastline */}
        <svg className="absolute bottom-[42%] left-0 w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <polygon points="0,120 0,70 120,40 260,75 420,30 600,68 780,45 1000,80 1000,120" fill="#3a5f70" opacity="0.55" />
          <polygon points="0,120 0,90 180,60 380,95 560,55 760,90 1000,65 1000,120" fill="#2c4a58" opacity="0.7" />
        </svg>
        {/* Water */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            bottom: "30%",
            background: "linear-gradient(to bottom, #2c6a85 0%, #1e4f66 60%, #173e50 100%)",
          }}
        />
        {/* Soft glow on water */}
        <div
          className="absolute"
          style={{
            width: "160px",
            height: "180px",
            left: "50%",
            top: "58%",
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, rgba(255,217,138,0.28), rgba(255,217,138,0))",
            filter: "blur(6px)",
          }}
        />
        {/* Pool edge / terrace stone */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            top: "70%",
            background: "linear-gradient(to bottom, #e8dcc4 0%, #d9c9a6 40%, #c9b78f 100%)",
          }}
        />
        <div className="absolute left-0 right-0" style={{ top: "70%", height: "4px", background: "#1e4f66" }} />

        {/* Table with two glasses + lemons, foreground, off to one side */}
        <div className="absolute" style={{ right: "8%", bottom: "6%" }}>
          <svg width="260" height="140" viewBox="0 0 260 140">
            {/* Table surface */}
            <ellipse cx="130" cy="118" rx="120" ry="18" fill="#caa86a" opacity="0.9" />
            <ellipse cx="130" cy="116" rx="120" ry="16" fill="#d9bb82" />

            {/* Lemons */}
            <circle cx="60" cy="106" r="13" fill="#f0c43a" />
            <circle cx="78" cy="112" r="11" fill="#f3cd4f" />
            <ellipse cx="58" cy="101" rx="3" ry="2" fill="#7a9c3e" />

            {/* Glass 1 */}
            <path d="M150,60 L156,108 L172,108 L178,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M152,75 L156,108 L172,108 L176,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="164" y1="108" x2="164" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="164" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Glass 2 */}
            <path d="M190,60 L196,108 L212,108 L218,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M192,75 L196,108 L212,108 L216,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="204" y1="108" x2="204" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="204" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Mint sprig */}
            <ellipse cx="168" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(-20 168 64)" />
            <ellipse cx="208" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(15 208 64)" />
          </svg>
        </div>

        {/* Warm overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 40%)" }}
        />

        {/* Caption */}
        <div className="absolute left-6 md:left-14 bottom-10 md:bottom-14 z-10 max-w-md">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#E8D38A]/80 mb-3">Het gouden uur</p>
          <p
            className="font-serif italic text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Twee glazen.<br />Een terras.<br />Een avond die niet eindigt.
          </p>
        </div>
      </section>

      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ProductsPage({ cart }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">De Producten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Twee manieren om Vivace te drinken
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/5">
        {Object.values(PRODUCTS).map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <div className="bg-[#102338] p-10 md:p-12 flex flex-col items-center text-center gap-6 h-full">
              {p.id === "limoncello" ? (
                <img
                  src="/images/vivace-bottle-hero.jpg"
                  alt="Vivace Limoncello fles"
                  className="w-full max-w-[180px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              ) : (
                <img
                  src="/images/vivace-can-hero.jpg"
                  alt="Vivace Limoncello Spritz blikje"
                  className="w-full max-w-[150px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              )}

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-2">{p.type}</p>
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-xs">{p.description}</p>
                <p className="text-[#D4AF37]/60 text-xs italic mb-4">{p.backLabel}</p>
                <p className="text-white/20 text-[11px] tracking-wide mb-1">
                  {p.abv} · {p.size}
                </p>
                <p className="text-white/15 text-[10px] tracking-wide mb-6">{p.kcal}</p>
              </div>

              <div className="w-full">
                {p.comingSoon ? (
                  <button
                    disabled
                    className="border border-white/15 text-white/35 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Binnenkort
                  </button>
                ) : p.onlineSellable ? (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-medium">€{p.price.toFixed(2)}</span>
                    <button
                      onClick={() => cart.add(p.id)}
                      className="bg-[#D4AF37] text-black px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#E0C158] transition-colors"
                    >
                      Voeg toe
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/verkooppunten"
                    className="border border-[#D4AF37]/40 text-[#D4AF37] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#D4AF37] hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    Vind in winkel <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              {p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Vivace Spritz is in ontwikkeling. Binnenkort beschikbaar.
                </p>
              )}
              {!p.onlineSellable && !p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een
                  erkende slijterij. Vivace Limoncello is daarom te koop bij onze partners.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StoresPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Verkooppunten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vind Vivace bij jou in de buurt
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Vivace Limoncello is te koop bij supermarkten en restaurants. Vivace Spritz in blik is
          in ontwikkeling en volgt later.
        </p>
      </Reveal>

      <div className="space-y-10">
        {STOCKISTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <div className="border border-[#234060] overflow-hidden">
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#D4AF37] flex-shrink-0" size={22} />
                  <div>
                    <p className="text-white/90 font-medium">{s.name}</p>
                    <p className="text-white/40 text-sm">
                      {s.type} · {s.address}, {s.postcode} {s.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {s.products.map((pid) => (
                    <span key={pid} className="text-[10px] uppercase tracking-wider text-[#C9A04E] border border-[#C9A04E]/30 px-3 py-1">
                      {PRODUCTS[pid].name}
                    </span>
                  ))}
                  <a
                    href={mapsLinkUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-white/50 border border-white/20 px-3 py-1.5 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                  >
                    Open in Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
              <iframe
                title={`Kaart ${s.name}`}
                src={mapsEmbedUrl(s)}
                className="w-full h-64 border-t border-[#234060]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={STOCKISTS.length * 100}>
        <p className="text-white/25 text-xs mt-10 italic">
          Sta je hier nog niet bij en wil je Vivace verkopen? Neem contact met ons op via de
          contactpagina.
        </p>
      </Reveal>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons Verhaal</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace bestaat om iets terug te geven.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6 text-white/55 leading-relaxed text-[15px] mb-16">
          <p>
            Voor elke fles die we verkopen, gaat <strong className="text-white/85">€1 rechtstreeks
            naar geselecteerde impactprojecten.</strong> Geen bijzaak, geen marketingtruc die later is
            bedacht: het was vanaf het begin de reden om Vivace te bouwen.
          </p>
          <p>
            Het idee is ontstaan tijdens een reis naar Rome, waar het Colosseum en de kennismaking
            met authentieke Italiaanse limoncello samenkwamen. Maar winst alleen voelde nooit als
            een goede reden om een merk te starten. Dus werd de vraag simpel:{" "}
            <strong className="text-white/85">
              als dit geld kan opleveren, waarom zou dat geld dan niet net zo goed ergens anders
              voor werken?
            </strong>
          </p>
          <p>
            Zo werd Vivace een premium limoncello met een Italiaans recept en een Nederlands hart,
            gebouwd rond één vast principe: €1 per fles, transparant herleidbaar, naar mensen voor
            wie het leven zwaarder is dan het zou moeten zijn.
          </p>
          <p className="text-[#D4AF37]/80 font-medium">
            Dat is Vivace. Niet voor ons. Voor jou, en voor hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="bg-[#102338] border border-[#D4AF37]/10 p-10 mb-16 text-center">
          <p className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Voor het leven, van jou en van hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="grid grid-cols-2 gap-6 text-center border-t border-[#234060] pt-12 mb-20 max-w-md mx-auto">
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Per fles naar impact</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>2</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Producten op de roadmap</p>
          </div>
        </div>
      </Reveal>

      {/* Impact model */}
      <Reveal delay={400}>
        <div className="border-t border-[#234060] pt-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons impactmodel</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            €1 per fles, naar geselecteerde impactprojecten
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-white/55 leading-relaxed text-[15px]">
              Voor elke fles Vivace die verkocht wordt, doneren we €1 aan een selectie van
              impactprojecten. Geen vage belofte, geen ingewikkelde constructies: een vast bedrag,
              per fles, transparant te herleiden. Dat maakt het model net zo schaalbaar als het merk
              zelf — voor de consument thuis, én voor onze partners in retail en horeca.
            </p>
            <div className="bg-[#102338] border border-[#234060] p-8">
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1,00</p>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-6">Vast donatiebedrag per fles</p>
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
              <p className="text-white/35 text-xs uppercase tracking-wider">Transparant herleidbaar naar verkochte flessen</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
  // a form at formspree.io (free account, takes ~2 minutes, no credit card).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-2xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Laten we praten
        </h1>
        <p className="text-white/45 mb-12">
          Vragen over Vivace, interesse als verkooppunt, of gewoon nieuwsgierig? Stuur een bericht.
        </p>
      </Reveal>

      <Reveal delay={100}>
        {status === "sent" ? (
          <div className="border border-[#C9A04E]/30 p-8 text-center">
            <p className="text-[#C9A04E] font-medium mb-2">Bedankt voor je bericht!</p>
            <p className="text-white/40 text-sm">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="naam"
              placeholder="Naam"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mailadres"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <textarea
              name="bericht"
              placeholder="Je bericht"
              required
              rows={5}
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#D4AF37] text-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#E0C158] transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Versturen..." : "Verstuur bericht"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs">
                Er ging iets mis. Probeer het opnieuw of mail direct naar drinkvivace@gmail.com.
              </p>
            )}
          </form>
        )}
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 pt-10 border-t border-[#234060] text-white/35 text-sm space-y-1">
          <p>info@drinkvivace.nl</p>
          <p>drinkvivace@gmail.com <span className="text-white/20 text-xs">(tijdelijk, werkt al)</span></p>
          <p>Nederland</p>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- FAQ Page ----------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#234060]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-white/90 text-base md:text-lg leading-snug pr-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {q}
        </span>
        <span className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronRight size={16} className="rotate-90" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 pr-8 text-white/45 text-sm md:text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    title: "Het product",
    items: [
      {
        q: "Wat is Vivace Limoncello precies?",
        a: "Vivace is een limoncello van 30% ALC/VOL, gemaakt volgens een authentiek Italiaans recept. Geproduceerd in Nederland bij een ambachtelijke distilleerderij, met smaken die recht doen aan de Italiaanse traditie.",
      },
      {
        q: "Is Vivace in Italië gemaakt?",
        a: "Het recept is Italiaans, maar Vivace wordt geproduceerd in Nederland. Daarom staat op het etiket 'Prelibatezza Italiana' (Italiaanse lekkernij), in plaats van een claim dat het product zelf uit Italië komt.",
      },
      {
        q: "Welke ingrediënten zitten er in?",
        a: "Vivace bevat citroenschil, alcohol, water en suiker. Voor exacte ingrediënten en allergenen verwijzen we naar het etiket op de fles.",
      },
      {
        q: "Hoe drink je Vivace het beste?",
        a: "Traditioneel goed gekoeld als digestief, direct uit de vriezer. Vivace is ook heerlijk als basis voor een spritz: limoncello met prosecco en bruiswater over ijs.",
      },
      {
        q: "Hoeveel calorieën heeft Vivace?",
        a: "218 kcal per 100ml, wat neerkomt op ongeveer 75 kcal per shot van 35ml.",
      },
    ],
  },
  {
    title: "Bestellen & verkooppunten",
    items: [
      {
        q: "Waar kan ik Vivace kopen?",
        a: "Bekijk onze Verkooppunten-pagina voor een actueel overzicht van winkels en restaurants waar Vivace verkrijgbaar is.",
      },
      {
        q: "Kan ik Vivace direct via de website bestellen?",
        a: "Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een erkende slijterij. Daarom verkopen we via onze fysieke verkooppunten in plaats van rechtstreeks via de site.",
      },
      {
        q: "Ben je een winkel of horecazaak en wil je Vivace verkopen?",
        a: "Mooi! Neem contact met ons op via de contactpagina met wat informatie over je zaak, dan nemen we snel contact op.",
      },
      {
        q: "Is er een minimumleeftijd om Vivace te kopen?",
        a: "Ja. Vivace is alleen bestemd voor personen van 18 jaar en ouder, zoals wettelijk vereist voor alcoholhoudende dranken in Nederland.",
      },
    ],
  },
  {
    title: "Vivace & impact",
    items: [
      {
        q: "Hoe werkt het donatiemodel van Vivace?",
        a: "Voor elke verkochte fles Vivace doneren we €1 aan geselecteerde impactprojecten. Een vast bedrag, per fles, onafhankelijk van marge of omzet.",
      },
      {
        q: "Waarom een vast bedrag per fles, in plaats van een percentage van de winst?",
        a: "Een vast bedrag is transparant en voorspelbaar — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt het model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, zonder dat dit afhangt van hoe een kwartaal er financieel uitziet.",
      },
      {
        q: "Welke projecten steunt Vivace?",
        a: "We doneren aan een selectie van impactprojecten. Voor de meest actuele informatie hierover kun je contact met ons opnemen.",
      },
      {
        q: "Hoe weet ik dat de donatie echt gebeurt?",
        a: "Transparantie vinden we belangrijk. Heb je vragen over hoe we dit bijhouden, neem dan gerust contact met ons op.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Vragen</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Veelgestelde vragen
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Alles wat je wilt weten over Vivace — van het product tot ons donatiemodel.
        </p>
      </Reveal>

      {FAQ_SECTIONS.map((section, i) => (
        <Reveal key={section.title} delay={i * 100}>
          <div className={i > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-2xl text-[#D4AF37] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {section.title}
            </h2>
            <div className="h-px w-full bg-[#1c3450] mb-2" />
            <div>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div className="mt-16 text-center border-t border-[#234060] pt-10">
          <p className="text-white/40 text-sm mb-3">Staat je vraag er niet bij?</p>
          <Link
            to="/contact"
            className="text-[#D4AF37] font-serif italic text-lg border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Neem contact met ons op
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- Recipe Page ----------
// ---------- Blog ----------
// Unified blog covering three post types: recept (recipe), nieuws (news),
// verkooppunt (new stockist announcement). Recipe posts carry the full
// ingredients/steps/serving-adjuster data; other types are simpler articles.
const BLOG_CATEGORIES = [
  { id: "alle", label: "Alle" },
  { id: "recept", label: "Recept" },
  { id: "nieuws", label: "Nieuws" },
  { id: "verkooppunt", label: "Verkooppunten" },
];

const BLOG_POSTS = [
  {
    id: "spritz-klassiek",
    type: "recept",
    title: "Vivace Limoncello Spritz — het klassieke recept",
    date: "2026-06-01",
    image: "/images/vivace-instagram-recepten-spritz.png",
    excerpt: "De originele: fris, lichtzoet en gevuld met bubbels. Het recept waarmee alles begon.",
    ingredients: [
      { amount: 5, unit: "cl", name: "Vivace Limoncello" },
      { amount: 10, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 3, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje munt (optioneel)" },
    ],
    steps: [
      "Vul een groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam, om de bubbels te behouden.",
      "Maak af met een scheutje bruiswater.",
      "Garneer met een schijfje citroen en eventueel een takje munt. Direct serveren.",
    ],
  },
  {
    id: "spritz-light",
    type: "recept",
    title: "Vivace Spritz Light — lichter en langer",
    date: "2026-06-01",
    excerpt: "Iets lichter en langer, met meer bruiswater. Perfect voor een lange, warme middag.",
    ingredients: [
      { amount: 4, unit: "cl", name: "Vivace Limoncello" },
      { amount: 8, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 8, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
    ],
    steps: [
      "Vul een groot longdrinkglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe.",
      "Vul aan met ruim bruiswater voor een lichtere, langere drank.",
      "Garneer met een schijfje citroen.",
    ],
  },
  {
    id: "spritz-intenso",
    type: "recept",
    title: "Vivace Spritz Intenso — voor de echte liefhebber",
    date: "2026-06-01",
    excerpt: "Voor wie de limoncello echt wil proeven: een stevigere pour met minder verdunning.",
    ingredients: [
      { amount: 7, unit: "cl", name: "Vivace Limoncello" },
      { amount: 7, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje rozemarijn (optioneel)" },
    ],
    steps: [
      "Vul een tumbler of groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam.",
      "Garneer met een schijfje citroen en eventueel een takje rozemarijn.",
    ],
  },
  {
    id: "instagram-launch",
    type: "nieuws",
    title: "Vivace is live op Instagram",
    date: "2026-06-29",
    image: "/images/vivace-instagram-launch.png",
    excerpt: "Vivace is nu ook te volgen op Instagram. Volg @drinkvivace voor nieuwe recepten, verkooppunten en updates over ons impactmodel.",
    body: [
      "Vivace is nu ook te volgen op Instagram via @drinkvivace. Daar delen we als eerste nieuwe Spritz-recepten, aankondigingen van nieuwe verkooppunten, en updates over ons impactmodel.",
      "€1 van elke verkochte fles gaat naar geselecteerde impactprojecten — premium kwaliteit met een heldere belofte, bij elke borrel.",
      "Volg ons om op de hoogte te blijven, en laat gerust weten met wie jij je eerste glas Vivace zou delen.",
    ],
  },
  {
    id: "instagram-label-onthulling",
    type: "nieuws",
    title: "Het Vivace-etiket, onthuld",
    date: "2026-07-03",
    image: "/images/vivace-instagram-label-reveal.png",
    excerpt: "Simpel, met opzet. Geen opgevulde tekst over ons verhaal, wel een QR-code naar de rest. Zo ziet het etiket eruit dat straks op elke fles staat.",
    body: [
      "Deze week deelden we op Instagram het definitieve ontwerp van het Vivace-etiket.",
      "Bewust simpel: geen lange tekst over ons verhaal of ons impactmodel op de fles zelf. In plaats daarvan een kleine QR-code die rechtstreeks naar drinkvivace.nl leidt, waar het hele verhaal wel te lezen is.",
      "Het resultaat is een etiket dat op de plank meteen opvalt, zonder dat het overvol aanvoelt. Binnenkort te zien op echte flessen bij onze verkooppunten.",
    ],
  },
  {
    id: "voor-het-leven-van-jou-en-van-hen",
    type: "nieuws",
    title: "Voor het leven, van jou en van hen",
    date: "2026-07-11",
    image: "/images/vivace-instagram-giveback.png",
    excerpt: "Vivace is meer dan een likeur. €1 van elke fles gaat naar impactprojecten, geen bijzaak, maar de reden dat we bestaan.",
    body: [
      "Vivace is meer dan een likeur. Voor elke fles die we verkopen, geven we €1 terug aan mensen voor wie het leven zwaarder is dan het zou moeten zijn.",
      "Vivace betekent levendig, vol leven. Dat is wat we vieren: de avonden die te lang duren, de tafels die te vol staan, het gevoel dat er even niets anders hoeft te bestaan dan dit moment. Geïnspireerd door Rome, gemaakt in Nederland, gebouwd rond één simpel idee: het goede leven is pas compleet als je het deelt.",
      "Dus wanneer je een fles Vivace opent, doe je meer dan proosten. Je geeft iets door.",
      "Voor het leven, van jou en van hen.",
    ],
  },
  {
    id: "nieuw-impactmodel",
    type: "nieuws",
    title: "Vivace gaat over op een vast donatiebedrag: €1 per fles",
    date: "2026-06-20",
    excerpt: "We hebben ons impactmodel aangescherpt. In plaats van een percentage van de winst, doneren we nu een vast bedrag van €1 per verkochte fles — transparant en schaalbaar.",
    body: [
      "Vanaf nu doneert Vivace €1 voor elke verkochte fles aan geselecteerde impactprojecten. Dit vervangt ons eerdere model, waarbij we een deel van de winst doneerden.",
      "Waarom de verandering? Een vast bedrag per fles is voorspelbaar en transparant — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt ons model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, onafhankelijk van marges of hoe een kwartaal er financieel uitziet.",
      "Op onze website vind je een live teller die het aantal verkochte flessen en het totaal gedoneerde bedrag laat zien. Deze teller wordt de komende tijd gekoppeld aan onze echte verkoopdata.",
    ],
  },
  {
    id: "nieuwe-verkooppunt",
    type: "verkooppunt",
    title: "Vivace nu ook te koop bij een nieuw verkooppunt",
    date: "2026-06-15",
    excerpt: "We breiden uit! Vivace Limoncello is sinds deze week te koop bij een nieuw verkooppunt.",
    body: [
      "We zijn verheugd om aan te kondigen dat Vivace Limoncello vanaf deze week verkrijgbaar is bij een nieuw verkooppunt. Bekijk de volledige lijst en adressen op onze Verkooppunten-pagina.",
      "Ben je zelf een winkel, slijterij of horecazaak en wil je Vivace in je assortiment? Neem contact met ons op via de contactpagina — we denken graag mee.",
    ],
  },
  {
    id: "het-moment",
    type: "nieuws",
    title: "Voor het aperitief. Of gewoon omdat het kan.",
    date: "2026-07-18",
    image: "/images/vivace-instagram-het-moment.png",
    excerpt: "Je hoeft niet te wachten op een speciale gelegenheid. Vivace maakt gewone momenten een beetje beter.",
    body: [
      "Je hoeft niet te wachten op een speciale gelegenheid. Vivace is er voor het aperitief voor het eten, voor een rustige avond op het balkon, of voor geen enkele reden behalve dat het weekend is.",
      "Gekoeld uit de vriezer, puur in een klein glas, is vaak al genoeg.",
      "We zien Vivace niet als iets voor speciale momenten. We zien het als iets dat gewone momenten een beetje beter maakt. Een druppel Italiaanse zomer, ook op een doordeweekse dinsdag.",
    ],
  },
  {
    id: "waarom-eenmaal-per-jaar-doneren",
    type: "nieuws",
    title: "Waarom we €1 per fles sparen, niet meteen weggeven",
    date: "2026-07-18",
    image: "/images/vivace-instagram-giveback-jaarlijks.png",
    excerpt: "Elke fles legt €1 opzij. Aan het einde van het jaar doneren we het volledige bedrag in één keer, niet per verkoop.",
    body: [
      "Bij elke fles Vivace die verkocht wordt, leggen we €1 opzij voor impactprojecten. Niet als losse donatie bij elke verkoop, maar als onderdeel van een pot die het hele jaar door groeit.",
      "Aan het einde van het jaar tellen we alles op en maken we het volledige bedrag in één keer over aan de projecten die we dat jaar hebben geselecteerd.",
      "We kozen bewust voor deze aanpak, om twee redenen. Ten eerste schaal: honderd losse donaties van een paar euro verdwijnen, terwijl één substantieel bedrag een project echt vooruit kan helpen. Ten tweede zorgvuldigheid: door te wachten tot het einde van het jaar hebben we tijd om de juiste projecten te vinden en te beoordelen, in plaats van overhaaste keuzes te maken bij elke losse verkoop.",
      "Aan het einde van het jaar laten we precies zien waar het geld naartoe is gegaan: welk project, hoeveel, en waarom.",
    ],
  },
];

function formatRecipeAmount(amount, servings) {
  if (amount === null) return null;
  const scaled = Math.round(amount * servings * 10) / 10;
  return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
}

function formatBlogDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, onOpen }) {
  return (
    <button
      onClick={() => onOpen(post.id)}
      className="text-left border border-[#234060] hover:border-[#D4AF37]/40 transition-colors flex flex-col h-full overflow-hidden"
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
          {BLOG_CATEGORIES.find((c) => c.id === post.type)?.label || post.type}
        </span>
        <h3 className="font-serif text-xl text-white/90 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {post.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <span className="text-white/25 text-xs">{formatBlogDate(post.date)}</span>
      </div>
    </button>
  );
}

function RecipeBody({ post }) {
  const [servings, setServings] = useState(1);
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12">
      <div className="flex items-center justify-end mb-10">
        <div className="flex items-center gap-4">
          <span className="text-white/35 text-[10px] uppercase tracking-[0.15em]">Glazen</span>
          <div className="flex items-center gap-3 border border-[#234060]">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Minder glazen"
            >
              <Minus size={14} />
            </button>
            <span className="font-serif text-[#D4AF37] text-base w-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {servings}
            </span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Meer glazen"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Ingrediënten</p>
          <ul className="space-y-3">
            {post.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-white/80 text-sm border-b border-[#1c3450] pb-3">
                <span>{ing.name}</span>
                {ing.amount !== null && (
                  <span className="font-serif text-[#D4AF37] whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatRecipeAmount(ing.amount, servings)} {ing.unit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Bereiding</p>
          <ol className="space-y-4">
            {post.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-white/55 leading-relaxed">
                <span className="font-serif text-[#D4AF37] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-[#1c3450]">
        <p className="font-serif italic text-white/40 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Tip: bewaar je Vivace in de vriezer voor het koudste, meest verfrissende resultaat.
        </p>
        <p className="text-white/20 text-[11px] mt-4">Drink met aandacht, drink met mate. 18+.</p>
      </div>
      </div>
    </div>
  );
}

function ArticleBody({ post }) {
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12 space-y-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-white/55 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const [filter, setFilter] = useState("alle");
  const [openId, setOpenId] = useState(null);

  const filtered = filter === "alle" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.type === filter);
  const openPost = openId ? BLOG_POSTS.find((p) => p.id === openId) : null;

  if (openPost) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
        <button
          onClick={() => setOpenId(null)}
          className="text-white/40 text-[11px] uppercase tracking-wider mb-10 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
        >
          ← Terug naar blog
        </button>
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
            {BLOG_CATEGORIES.find((c) => c.id === openPost.type)?.label}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {openPost.title}
          </h1>
          <p className="text-white/30 text-xs mb-10">{formatBlogDate(openPost.date)}</p>
        </Reveal>
        <Reveal delay={100}>
          {openPost.type === "recept" ? <RecipeBody post={openPost} /> : <ArticleBody post={openPost} />}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Blog</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Recepten, nieuws & verkooppunten
        </h1>
        <p className="text-white/45 max-w-lg mb-12">
          Alles op één plek: nieuwe manieren om Vivace te serveren, updates over ons impactmodel, en
          waar je Vivace als eerste kunt vinden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.14em] border transition-colors ${
                filter === c.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "text-white/50 border-[#234060] hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((post, i) => (
          <Reveal key={post.id} delay={150 + i * 80}>
            <BlogCard post={post} onOpen={setOpenId} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Privacybeleid
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Dit privacybeleid legt uit welke gegevens Vivace verzamelt,
          waarom, en welke rechten je hebt.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Vivace wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven bij de
            Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD Poortugaal,
            Nederland. Voor vragen over dit privacybeleid kun je contact opnemen via
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="2. Welke gegevens we verzamelen">
          <p>Wij verzamelen alleen de gegevens die je zelf actief met ons deelt, namelijk via het contactformulier op onze website:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>De inhoud van je bericht</li>
          </ul>
          <p>
            Wij gebruiken geen trackingcookies, geen advertentiepixels en verzamelen geen
            gegevens voor profilering of marketingdoeleinden zonder jouw expliciete toestemming.
          </p>
        </LegalSection>

        <LegalSection title="3. Waarom we deze gegevens verzamelen">
          <p>
            We gebruiken de gegevens uit het contactformulier uitsluitend om je vraag, opmerking of
            verzoek (bijvoorbeeld als potentiële verkooppartner) te kunnen beantwoorden. We gebruiken
            je gegevens niet voor geautomatiseerde besluitvorming en delen ze niet met derden voor
            commerciële doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="4. Hoe lang we gegevens bewaren">
          <p>
            Berichten via het contactformulier bewaren we niet langer dan noodzakelijk om je vraag
            te kunnen afhandelen, en in elk geval niet langer dan 24 maanden
            na het laatste contact, tenzij we wettelijk verplicht zijn gegevens langer te bewaren.
          </p>
        </LegalSection>

        <LegalSection title="5. Derde partijen">
          <p>
            Ons contactformulier wordt verwerkt via Formspree, een derde partij die berichten van
            het formulier naar ons doorstuurt. Voor meer informatie over hoe Formspree gegevens
            verwerkt, verwijzen we naar hun eigen privacybeleid.
          </p>
          <p>
            Onze website wordt gehost via Vercel. Standaard servertechnische gegevens (zoals
            IP-adres en tijdstip van bezoek) kunnen door onze hostingpartij worden gelogd voor
            beveiligings- en technische doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="6. Jouw rechten">
          <p>Onder de AVG (GDPR) heb je het recht om:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Inzage te krijgen in de gegevens die we van je hebben</li>
            <li>Je gegevens te laten corrigeren of verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p>
            Wil je gebruikmaken van een van deze rechten? Stuur een e-mail naar
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="7. Wijzigingen in dit beleid">
          <p>
            We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie is
            altijd te vinden op deze pagina, met de datum van de laatste wijziging hierboven.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Algemene voorwaarden
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Deze voorwaarden zijn van toepassing op het gebruik van deze
          website en op de informatie die hierop wordt aangeboden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Deze website wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven
            bij de Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD
            Poortugaal, Nederland. BTW-identificatienummer: NL004279162B10.
          </p>
        </LegalSection>

        <LegalSection title="2. Leeftijdsgrens">
          <p>
            Vivace Limoncello is een alcoholhoudend product (30% ALC/VOL) en is uitsluitend bestemd
            voor personen van 18 jaar en ouder. Door deze website te gebruiken bevestig je dat je
            18 jaar of ouder bent. Het is verboden alcohol te verkopen aan, of te laten consumeren
            door, personen onder de 18 jaar, conform de Nederlandse Alcoholwet.
          </p>
        </LegalSection>

        <LegalSection title="3. Verkoop via derde partijen">
          <p>
            Vivace Limoncello wordt niet rechtstreeks via deze website verkocht. Sterke drank (30%
            ALC/VOL of hoger) mag in Nederland alleen online verkocht worden door een hiervoor
            erkende slijterij. Vivace is daarom uitsluitend verkrijgbaar via de fysieke
            verkooppunten die op deze website worden vermeld. Voor vragen over prijs,
            beschikbaarheid of voorraad bij een specifiek verkooppunt verwijzen we je naar dat
            verkooppunt zelf.
          </p>
        </LegalSection>

        <LegalSection title="4. Impact- en donatiemodel">
          <p>
            Vivace doneert €1 per verkochte fles aan geselecteerde impactprojecten. Dit bedrag is
            vast en wordt niet beïnvloed door de verkoopprijs die door individuele verkooppunten
            wordt gehanteerd. De op deze website weergegeven tellers (aantal verkochte flessen en
            totaal gedoneerd bedrag) zijn indicatief en worden periodiek bijgewerkt; zie ook onze
            Onze Impact-pagina voor meer toelichting.
          </p>
        </LegalSection>

        <LegalSection title="5. Intellectueel eigendom">
          <p>
            Alle content op deze website — waaronder teksten, het Vivace-logo, productfoto's,
            illustraties en de vormgeving van het etiket — is eigendom van VVM Trading of wordt
            gebruikt met toestemming van de rechthebbende. Niets van deze website mag worden
            gekopieerd, verspreid of commercieel gebruikt zonder voorafgaande schriftelijke
            toestemming.
          </p>
        </LegalSection>

        <LegalSection title="6. Aansprakelijkheid">
          <p>
            We doen ons best om de informatie op deze website actueel en correct te houden, maar
            kunnen niet garanderen dat alle informatie op elk moment volledig juist of up-to-date
            is. VVM Trading is niet aansprakelijk voor schade die voortvloeit uit het gebruik van
            deze website of uit het gebruik van het product, behalve in gevallen van opzet of grove
            schuld, of voor zover dwingend Nederlands recht anders bepaalt.
          </p>
        </LegalSection>

        <LegalSection title="7. Toepasselijk recht">
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen worden
            voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>
            Vragen over deze voorwaarden? Neem contact met ons op via info@drinkvivace.nl.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-[#1c3450] px-6 md:px-14 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 items-center gap-8 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <p className="font-serif text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Vivace
          </p>
          <a
            href="https://instagram.com/drinkvivace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#D4AF37] transition-colors"
            aria-label="Vivace op Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
        <p className="font-serif italic text-sm text-white/20 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "Doe anders, geniet anders."
        </p>
        <ul className="flex gap-7 justify-center md:justify-end text-[11px] uppercase tracking-wider text-white/25 flex-wrap">
          {footerLinks.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className="hover:text-[#D4AF37] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-[11px] text-white/15 mt-10 pt-8 border-t border-[#1c3450]">
        © 2026 Vivace · Drink verantwoord. 18+
      </p>
      <div className="flex gap-6 justify-center text-[10px] uppercase tracking-wider text-white/20 mt-4">
        <Link to="/privacybeleid" className="hover:text-[#D4AF37] transition-colors">
          Privacybeleid
        </Link>
        <Link to="/algemene-voorwaarden" className="hover:text-[#D4AF37] transition-colors">
          Algemene voorwaarden
        </Link>
      </div>
    </footer>
  );
}

// ---------- App ----------
// Scrolls to top whenever the route changes, replacing the old
// useEffect([page]) behavior now that navigation uses real URLs.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppShell() {
  const [ageConfirmed, setAgeConfirmed] = useState(null); // null | true | false
  const [showWelcome, setShowWelcome] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const handleAgeConfirm = (confirmed) => {
    setAgeConfirmed(confirmed);
    if (confirmed) setShowWelcome(true);
  };

  if (ageConfirmed === null) return <AgeGate onConfirm={handleAgeConfirm} />;
  if (ageConfirmed === false) return <UnderageBlock />;

  return (
    <div className="bg-[#0a1628] text-white min-h-screen font-sans" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#0a1628" }}>
      <ScrollToTop />
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      <Nav cart={cart} setCartOpen={setCartOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producten" element={<ProductsPage cart={cart} />} />
        <Route path="/verkooppunten" element={<StoresPage />} />
        <Route path="/over-ons" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacybeleid" element={<PrivacyPage />} />
        <Route path="/algemene-voorwaarden" element={<TermsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

// ---------- App ----------
export default function VivaceApp() {
  return (
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  );
}          <stop offset="15%" stopColor="#f5f2e4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#e8d98a" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#d4c468" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b8a84a" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0d050" />
          <stop offset="50%" stopColor="#f7dc6f" />
          <stop offset="100%" stopColor="#d4af2a" />
        </linearGradient>
        {/* Cream label */}
        <linearGradient id="bLabelBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7f3e8" />
          <stop offset="100%" stopColor="#efe8d8" />
        </linearGradient>
        {/* Sky for colosseum scene */}
        <linearGradient id="bSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="bShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="38%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bClip">
          <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" />
        </clipPath>
        <clipPath id="bSceneClip">
          <rect x="26" y="142" width="58" height="34" />
        </clipPath>
      </defs>

      {/* Glass bottle body */}
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bLiquid)" />
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bShine)" />

      {/* Label background - cream */}
      <rect x="24" y="96" width="62" height="190" rx="2" fill="url(#bLabelBg)" clipPath="url(#bClip)" />
      <rect x="24" y="96" width="62" height="190" rx="2" fill="none" stroke="#2c5f8a" strokeWidth="1.5" clipPath="url(#bClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#bSceneClip)">
        <rect x="26" y="142" width="58" height="22" fill="url(#bSky)" />
        {/* Colosseum structure */}
        <rect x="32" y="152" width="46" height="14" fill="#c98a52" />
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={i} x={34 + i * 4} y="154" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="32" y="150" width="46" height="2.5" fill="#e8c896" />
        {/* golden rocky foreground */}
        <rect x="26" y="164" width="58" height="12" fill="#c9a23a" />
        <polygon points="28,176 33,166 38,176" fill="#b3892e" />
        <polygon points="40,176 46,167 52,176" fill="#bf9433" />
        <polygon points="54,176 60,168 66,176" fill="#b3892e" />
        <polygon points="68,176 74,166 80,176" fill="#bf9433" />
      </g>
      <rect x="26" y="142" width="58" height="34" fill="none" stroke="#2c5f8a" strokeWidth="1" clipPath="url(#bClip)" />

      {/* VIVACE wordmark */}
      <text x="55" y="195" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#1f3a4d" letterSpacing="2.5" clipPath="url(#bClip)">VIVACE</text>
      <text x="55" y="207" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="#5a5240" letterSpacing="2" clipPath="url(#bClip)">LIMONCELLO</text>

      <line x1="32" y1="214" x2="78" y2="214" stroke="#2c5f8a" strokeWidth="0.6" opacity="0.4" clipPath="url(#bClip)" />

      <text x="55" y="226" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="5" fill="#5a5240" letterSpacing="1" clipPath="url(#bClip)">Italiano · 30% VOL · 500ml</text>
      <text x="55" y="237" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#bClip)">218 kcal/100ml · 75 kcal per shot (35ml)</text>

      {/* Lower blue accent band */}
      <rect x="24" y="266" width="62" height="16" fill="#2c5f8a" clipPath="url(#bClip)" />
      <text x="55" y="277" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill="#f0e8cc" letterSpacing="1.5" clipPath="url(#bClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Cap & neck */}
      <rect x="38" y="0" width="34" height="22" rx="2" fill="#c8c8c8" />
      <rect x="38" y="0" width="34" height="22" rx="2" fill="none" stroke="#999" strokeWidth="0.5" />
      <text x="55" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#666" letterSpacing="1">VIVACE</text>
    </svg>
  );
}

function CanSVG({ size = 90 }) {
  const h = size * (220 / 90);
  return (
    <svg width={size} height={h} viewBox="0 0 90 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0d9c0" />
          <stop offset="15%" stopColor="#f7f3e8" />
          <stop offset="50%" stopColor="#fbf8ee" />
          <stop offset="85%" stopColor="#efe8d8" />
          <stop offset="100%" stopColor="#d8cfb0" />
        </linearGradient>
        <linearGradient id="cSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="cTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <clipPath id="cClip">
          <rect x="10" y="18" width="70" height="186" rx="8" />
        </clipPath>
        <clipPath id="cSceneClip">
          <rect x="14" y="56" width="62" height="36" />
        </clipPath>
      </defs>

      {/* Can body - cream */}
      <rect x="10" y="18" width="70" height="186" rx="8" fill="url(#cBody)" />

      {/* Blue accent stripes */}
      <rect x="10" y="44" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />
      <rect x="10" y="186" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#cSceneClip)">
        <rect x="14" y="56" width="62" height="24" fill="url(#cSky)" />
        <rect x="20" y="68" width="50" height="14" fill="#c98a52" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={22 + i * 4} y="70" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="20" y="66" width="50" height="2.5" fill="#e8c896" />
        <rect x="14" y="80" width="62" height="12" fill="#c9a23a" />
        <polygon points="18,92 24,82 30,92" fill="#b3892e" />
        <polygon points="32,92 39,83 46,92" fill="#bf9433" />
        <polygon points="48,92 55,81 62,92" fill="#b3892e" />
        <polygon points="64,92 71,83 78,92" fill="#bf9433" />
      </g>
      <rect x="14" y="56" width="62" height="36" fill="none" stroke="#2c5f8a" strokeWidth="0.8" clipPath="url(#cClip)" />

      {/* VIVACE wordmark */}
      <text x="45" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#1f3a4d" letterSpacing="2" clipPath="url(#cClip)">VIVACE</text>
      <text x="45" y="119" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fill="#5a5240" letterSpacing="1.8" clipPath="url(#cClip)">LIMONCELLO SPRITZ</text>

      <line x1="22" y1="127" x2="68" y2="127" stroke="#2c5f8a" strokeWidth="0.5" opacity="0.4" clipPath="url(#cClip)" />

      <text x="45" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.5" fill="#5a5240" letterSpacing="0.8" clipPath="url(#cClip)">7% VOL · 250ml</text>
      <text x="45" y="147" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#cClip)">95 kcal per blikje</text>

      {/* Lower blue band */}
      <rect x="10" y="160" width="70" height="14" fill="#2c5f8a" clipPath="url(#cClip)" />
      <text x="45" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#f0e8cc" letterSpacing="1" clipPath="url(#cClip)">€1 PER FLES NAAR IMPACT</text>

      {/* Top & bottom */}
      <ellipse cx="45" cy="18" rx="35" ry="7" fill="url(#cTopGrad)" />
      <ellipse cx="45" cy="12" rx="8" ry="3" fill="#999" />
      <rect x="43" y="9" width="4" height="8" rx="2" fill="#888" />
      <ellipse cx="45" cy="204" rx="35" ry="7" fill="#999" />
    </svg>
  );
}

// ---------- Product data ----------
const PRODUCTS = {
  limoncello: {
    id: "limoncello",
    name: "Vivace Limoncello",
    type: "Onze Signature Fles",
    price: 24.95,
    abv: "30% VOL",
    size: "500ml",
    kcal: "218 kcal / 100ml · 75 kcal per shot (35ml)",
    onlineSellable: false,
    description:
      "Echte Italiaanse limoncello, gemaakt door een ambachtelijke distilleerderij hier in Nederland. Citrus, romig en ijskoud het lekkerst.",
    backLabel: '"Wij maken het. Jij drinkt het. Samen geven we door."',
  },
  spritz: {
    id: "spritz",
    name: "Vivace Spritz",
    type: "De Toekomst ⚡",
    price: 3.25,
    abv: "7% VOL",
    size: "250ml",
    kcal: "95 kcal per blikje (250ml)",
    onlineSellable: false,
    comingSoon: true,
    description:
      "Limoncello ontmoet bruisend water. Direct klaar om te drinken, recht uit het blikje. Fris, helder en onmiskenbaar Italiaans.",
    backLabel: '"Nu opentrekken."',
  },
};

// PLACEHOLDER DATA — replace name, address, city, and postcode with your
// real stockists' details. Once you have them, this is the only place you
// need to edit; the page below builds itself from this array automatically.
const STOCKISTS = [
  {
    name: "[Naam supermarkt]",
    type: "Supermarkt",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
  {
    name: "[Naam restaurant]",
    type: "Restaurant",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
];

// Builds a Google Maps embed URL from an address string. No API key needed
// for this basic embed format.
function mapsEmbedUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function mapsLinkUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// ---------- Cart context (simple prop-drill, no localStorage) ----------
function useCart() {
  const [items, setItems] = useState({});

  const add = (id) => setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  const clear = () => setItems({});

  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const total = Object.entries(items).reduce(
    (sum, [id, qty]) => sum + PRODUCTS[id].price * qty,
    0
  );

  return { items, add, remove, clear, count, total };
}

// ---------- Nav ----------
function Nav({ cart, setCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0a1628]/95 border-b border-[#1c3450]" : "bg-gradient-to-b from-[#0a1628]/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vivace
        </Link>

        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  location.pathname === l.path ? "text-[#D4AF37]" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white/80 hover:text-[#D4AF37] transition-colors"
            aria-label="Winkelwagen"
          >
            <ShoppingBag size={20} />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <button className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1c3450] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="text-left text-sm uppercase tracking-wider text-white/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Cart Drawer ----------
function CartDrawer({ open, onClose, cart }) {
  if (!open) return null;
  const entries = Object.entries(cart.items);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#050b14]/80" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0f1f33] border-l border-[#234060] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#234060]">
          <h3 className="font-serif text-xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Winkelwagen
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {entries.length === 0 && (
            <p className="text-white/40 text-sm">Je winkelwagen is leeg. Online bestellen volgt binnenkort.</p>
          )}
          {entries.map(([id, qty]) => {
            const p = PRODUCTS[id];
            return (
              <div key={id} className="flex gap-4 items-center">
                <div className="flex-shrink-0">
                  {id === "limoncello" ? (
                    <img
                      src="/images/vivace-bottle-hero.jpg"
                      alt="Vivace Limoncello"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  ) : (
                    <img
                      src="/images/vivace-can-hero.jpg"
                      alt="Vivace Limoncello Spritz"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">{p.name}</p>
                  <p className="text-xs text-white/40">€{p.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cart.remove(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{qty}</span>
                  <button
                    onClick={() => cart.add(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {entries.length > 0 && (
          <div className="p-6 border-t border-[#234060] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotaal</span>
              <span className="text-white">€{cart.total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#D4AF37]/70 italic">€1 per fles naar impactprojecten — €{(cart.count * 1).toFixed(2)} bij deze bestelling.</p>
            <button className="w-full bg-[#D4AF37] text-black py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158] transition-colors">
              Afrekenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Age gate ----------
function AgeGate({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6" style={{ backgroundColor: "#0a1628" }}>
      <div className="max-w-sm text-center">
        <p className="font-serif text-3xl text-[#D4AF37] tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace
        </p>
        <p className="text-white/70 text-sm mb-2">Ben je 18 jaar of ouder?</p>
        <p className="text-white/30 text-xs mb-8">We vragen dit omdat onze producten alcohol bevatten.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onConfirm(true)}
            className="bg-[#D4AF37] text-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158]"
          >
            Ja, ik ben 18+
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="border border-white/20 text-white/50 px-8 py-3 text-xs uppercase tracking-[0.15em]"
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  );
}

function UnderageBlock() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6 text-center" style={{ backgroundColor: "#0a1628" }}>
      <p className="text-white/50 text-sm max-w-sm">
        Je moet 18 jaar of ouder zijn om deze website te bezoeken. Drink geen alcohol als je jonger bent.
      </p>
    </div>
  );
}

// ---------- Welcome banner ----------
// Shows right after someone confirms they're 18+: a centered, prominent
// modal thanking them and confirming their purchase already contributes to
// an impact project. Auto-dismisses, and can also be closed manually.
function HeartIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M12 21s-7.5-4.6-10-9.1C0.4 8.6 1.8 5 5.4 5c2 0 3.4 1 4.6 2.6C11.2 6 12.6 5 14.6 5 18.2 5 19.6 8.6 18 11.9 16.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function WelcomeBanner({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#050b14]/70 animate-[fadeIn_0.4s_ease-out]"
        onClick={onClose}
      />
      <div className="relative pointer-events-auto bg-[#0F1F33] border border-[#D4AF37]/50 shadow-2xl shadow-black/60 px-8 py-10 md:px-14 md:py-12 max-w-lg w-full text-center animate-[popIn_0.45s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Subtle Italian tricolor accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#3A7A4E]" />
          <div className="flex-1 bg-[#F4EFE3]" />
          <div className="flex-1 bg-[#B5402E]" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Sluiten"
        >
          <X size={22} />
        </button>

        <div className="flex justify-center mb-6">
          <HeartIcon size={48} />
        </div>

        <p
          className="font-serif italic text-[#D4AF37] text-2xl md:text-3xl leading-snug mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Doe anders, geniet anders.
        </p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-2">
          Welkom bij Vivace. Met elke fles die wordt verkocht, draag je al bij aan een
          geselecteerd impactproject.
        </p>
        <p className="text-white/40 text-xs md:text-sm">
          €1 per fles, transparant en zonder omwegen.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Impact Counter ----------
// bottlesSold connects to real sales data later (e.g. backend or payment
// provider webhook). totalDonated is always derived from it — never set
// independently — so the €1-per-bottle math stays correct everywhere.
function ImpactCounter() {
  const [bottlesSold] = useState(0); // TODO: connect to real sales data later
  const totalDonated = bottlesSold * 1;

  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Actueel</p>
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {bottlesSold.toLocaleString("nl-NL")}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Flessen verkocht</p>
        </div>
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {`€${totalDonated.toLocaleString("nl-NL", { minimumFractionDigits: 0 })}`}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Totaal gedoneerd</p>
        </div>
      </div>
      <p className="text-white/35 text-sm mt-8 max-w-sm mx-auto">
        €1 per verkochte fles, rechtstreeks naar geselecteerde impactprojecten.
      </p>
      <p className="text-white/15 text-[11px] mt-3 italic">
        Teller wordt binnenkort live gekoppeld aan onze verkoopdata.
      </p>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-14 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 72% 48%, rgba(62,207,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 28% 58%, rgba(255,215,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A04E] mb-7">
            Gemaakt in Nederland · Italiaanse ziel
          </p>
          <h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-9"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="font-semibold block">Doe</span>
            <em className="italic text-[#D4AF37] block">anders,</em>
            geniet anders.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-12">
            Vivace is een premium limoncello, gemaakt met een Italiaans recept en een Nederlands hart.
            Wie we zijn is minder belangrijk dan wat elke fles teweegbrengt:
            <strong className="text-white/85 font-medium"> €1 van elke verkochte fles gaat rechtstreeks naar geselecteerde impactprojecten.</strong> Transparant,
            schaalbaar, en onderdeel van elke aankoop.
          </p>
          <div className="flex gap-5 items-center flex-wrap">
            <Link
              to="/producten"
              className="bg-[#D4AF37] text-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#E0C158] transition-colors"
            >
              Ontdek Vivace
            </Link>
            <Link
              to="/over-ons"
              className="text-white/45 text-[11px] uppercase tracking-[0.14em] border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors"
            >
              Ons verhaal
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full max-w-md md:max-w-lg">
            <img
              src="/images/vivace-bottle-hero.jpg"
              alt="Vivace Limoncello fles voor het Colosseum"
              className="w-full h-auto rounded-sm shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Mission ticker */}
      <div className="bg-[#D4AF37] overflow-hidden">
        <div className="flex whitespace-nowrap py-4" style={{ animation: "ticker 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, rep) =>
            ["Doe anders", "€1 per fles naar impact", "Premium Italiaans recept", "Transparant en schaalbaar", "Italiaanse ziel · Nederlands hart", "Geniet anders"].map(
              (txt, i) => (
                <span key={`${rep}-${i}`} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                  {txt}
                  <span className="w-1 h-1 rounded-full bg-black/25" />
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* The number */}
      <div className="bg-[#D4AF37] text-center py-24 px-6">
        <Reveal>
          <span className="font-serif font-bold text-black block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(100px, 18vw, 200px)", lineHeight: 0.85 }}>
            €1
          </span>
          <p className="text-black/50 text-[13px] font-semibold tracking-[0.3em] uppercase mt-6">
            Per verkochte fles, naar geselecteerde impactprojecten
          </p>
        </Reveal>
      </div>

      {/* Impact counter */}
      <div className="bg-[#0a1628] py-24 px-6 border-b border-[#1c3450]" style={{ backgroundColor: "#0a1628" }}>
        <Reveal>
          <ImpactCounter />
        </Reveal>
      </div>

      {/* Quick links to stockists */}
      <section className="px-6 md:px-14 py-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Nu te koop</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Te vinden bij supermarkten en restaurants
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {STOCKISTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="border border-[#234060] p-6 flex items-center gap-4 hover:border-[#D4AF37]/30 transition-colors">
                <MapPin className="text-[#D4AF37] flex-shrink-0" size={20} />
                <div>
                  <p className="text-white/90 text-sm font-medium">{s.name}</p>
                  <p className="text-white/40 text-xs">{s.type} · {s.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Golden Hour Scene — the feeling, without a posed model. Moved to the
          end of the homepage so the impact model and stockists lead, and this
          atmospheric closer comes last. */}
      <section className="relative overflow-hidden" style={{ height: "640px" }}>
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1a3a5c 0%, #3d6a8a 22%, #d98a4a 48%, #f0b25a 58%, #2c5f7a 70%, #1c4356 100%)",
          }}
        />
        {/* Distant coastline */}
        <svg className="absolute bottom-[42%] left-0 w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <polygon points="0,120 0,70 120,40 260,75 420,30 600,68 780,45 1000,80 1000,120" fill="#3a5f70" opacity="0.55" />
          <polygon points="0,120 0,90 180,60 380,95 560,55 760,90 1000,65 1000,120" fill="#2c4a58" opacity="0.7" />
        </svg>
        {/* Water */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            bottom: "30%",
            background: "linear-gradient(to bottom, #2c6a85 0%, #1e4f66 60%, #173e50 100%)",
          }}
        />
        {/* Soft glow on water */}
        <div
          className="absolute"
          style={{
            width: "160px",
            height: "180px",
            left: "50%",
            top: "58%",
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, rgba(255,217,138,0.28), rgba(255,217,138,0))",
            filter: "blur(6px)",
          }}
        />
        {/* Pool edge / terrace stone */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            top: "70%",
            background: "linear-gradient(to bottom, #e8dcc4 0%, #d9c9a6 40%, #c9b78f 100%)",
          }}
        />
        <div className="absolute left-0 right-0" style={{ top: "70%", height: "4px", background: "#1e4f66" }} />

        {/* Table with two glasses + lemons, foreground, off to one side */}
        <div className="absolute" style={{ right: "8%", bottom: "6%" }}>
          <svg width="260" height="140" viewBox="0 0 260 140">
            {/* Table surface */}
            <ellipse cx="130" cy="118" rx="120" ry="18" fill="#caa86a" opacity="0.9" />
            <ellipse cx="130" cy="116" rx="120" ry="16" fill="#d9bb82" />

            {/* Lemons */}
            <circle cx="60" cy="106" r="13" fill="#f0c43a" />
            <circle cx="78" cy="112" r="11" fill="#f3cd4f" />
            <ellipse cx="58" cy="101" rx="3" ry="2" fill="#7a9c3e" />

            {/* Glass 1 */}
            <path d="M150,60 L156,108 L172,108 L178,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M152,75 L156,108 L172,108 L176,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="164" y1="108" x2="164" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="164" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Glass 2 */}
            <path d="M190,60 L196,108 L212,108 L218,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M192,75 L196,108 L212,108 L216,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="204" y1="108" x2="204" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="204" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Mint sprig */}
            <ellipse cx="168" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(-20 168 64)" />
            <ellipse cx="208" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(15 208 64)" />
          </svg>
        </div>

        {/* Warm overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 40%)" }}
        />

        {/* Caption */}
        <div className="absolute left-6 md:left-14 bottom-10 md:bottom-14 z-10 max-w-md">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#E8D38A]/80 mb-3">Het gouden uur</p>
          <p
            className="font-serif italic text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Twee glazen.<br />Een terras.<br />Een avond die niet eindigt.
          </p>
        </div>
      </section>

      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ProductsPage({ cart }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">De Producten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Twee manieren om Vivace te drinken
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/5">
        {Object.values(PRODUCTS).map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <div className="bg-[#102338] p-10 md:p-12 flex flex-col items-center text-center gap-6 h-full">
              {p.id === "limoncello" ? (
                <img
                  src="/images/vivace-bottle-hero.jpg"
                  alt="Vivace Limoncello fles"
                  className="w-full max-w-[180px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              ) : (
                <img
                  src="/images/vivace-can-hero.jpg"
                  alt="Vivace Limoncello Spritz blikje"
                  className="w-full max-w-[150px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              )}

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-2">{p.type}</p>
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-xs">{p.description}</p>
                <p className="text-[#D4AF37]/60 text-xs italic mb-4">{p.backLabel}</p>
                <p className="text-white/20 text-[11px] tracking-wide mb-1">
                  {p.abv} · {p.size}
                </p>
                <p className="text-white/15 text-[10px] tracking-wide mb-6">{p.kcal}</p>
              </div>

              <div className="w-full">
                {p.comingSoon ? (
                  <button
                    disabled
                    className="border border-white/15 text-white/35 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Binnenkort
                  </button>
                ) : p.onlineSellable ? (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-medium">€{p.price.toFixed(2)}</span>
                    <button
                      onClick={() => cart.add(p.id)}
                      className="bg-[#D4AF37] text-black px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#E0C158] transition-colors"
                    >
                      Voeg toe
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/verkooppunten"
                    className="border border-[#D4AF37]/40 text-[#D4AF37] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#D4AF37] hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    Vind in winkel <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              {p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Vivace Spritz is in ontwikkeling. Binnenkort beschikbaar.
                </p>
              )}
              {!p.onlineSellable && !p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een
                  erkende slijterij. Vivace Limoncello is daarom te koop bij onze partners.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StoresPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Verkooppunten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vind Vivace bij jou in de buurt
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Vivace Limoncello is te koop bij supermarkten en restaurants. Vivace Spritz in blik is
          in ontwikkeling en volgt later.
        </p>
      </Reveal>

      <div className="space-y-10">
        {STOCKISTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <div className="border border-[#234060] overflow-hidden">
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#D4AF37] flex-shrink-0" size={22} />
                  <div>
                    <p className="text-white/90 font-medium">{s.name}</p>
                    <p className="text-white/40 text-sm">
                      {s.type} · {s.address}, {s.postcode} {s.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {s.products.map((pid) => (
                    <span key={pid} className="text-[10px] uppercase tracking-wider text-[#C9A04E] border border-[#C9A04E]/30 px-3 py-1">
                      {PRODUCTS[pid].name}
                    </span>
                  ))}
                  <a
                    href={mapsLinkUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-white/50 border border-white/20 px-3 py-1.5 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                  >
                    Open in Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
              <iframe
                title={`Kaart ${s.name}`}
                src={mapsEmbedUrl(s)}
                className="w-full h-64 border-t border-[#234060]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={STOCKISTS.length * 100}>
        <p className="text-white/25 text-xs mt-10 italic">
          Sta je hier nog niet bij en wil je Vivace verkopen? Neem contact met ons op via de
          contactpagina.
        </p>
      </Reveal>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons Verhaal</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace bestaat om iets terug te geven.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6 text-white/55 leading-relaxed text-[15px] mb-16">
          <p>
            Voor elke fles die we verkopen, gaat <strong className="text-white/85">€1 rechtstreeks
            naar geselecteerde impactprojecten.</strong> Geen bijzaak, geen marketingtruc die later is
            bedacht: het was vanaf het begin de reden om Vivace te bouwen.
          </p>
          <p>
            Het idee is ontstaan tijdens een reis naar Rome, waar het Colosseum en de kennismaking
            met authentieke Italiaanse limoncello samenkwamen. Maar winst alleen voelde nooit als
            een goede reden om een merk te starten. Dus werd de vraag simpel:{" "}
            <strong className="text-white/85">
              als dit geld kan opleveren, waarom zou dat geld dan niet net zo goed ergens anders
              voor werken?
            </strong>
          </p>
          <p>
            Zo werd Vivace een premium limoncello met een Italiaans recept en een Nederlands hart,
            gebouwd rond één vast principe: €1 per fles, transparant herleidbaar, naar mensen voor
            wie het leven zwaarder is dan het zou moeten zijn.
          </p>
          <p className="text-[#D4AF37]/80 font-medium">
            Dat is Vivace. Niet voor ons. Voor jou, en voor hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="bg-[#102338] border border-[#D4AF37]/10 p-10 mb-16 text-center">
          <p className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Voor het leven, van jou en van hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="grid grid-cols-2 gap-6 text-center border-t border-[#234060] pt-12 mb-20 max-w-md mx-auto">
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Per fles naar impact</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>2</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Producten op de roadmap</p>
          </div>
        </div>
      </Reveal>

      {/* Impact model */}
      <Reveal delay={400}>
        <div className="border-t border-[#234060] pt-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons impactmodel</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            €1 per fles, naar geselecteerde impactprojecten
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-white/55 leading-relaxed text-[15px]">
              Voor elke fles Vivace die verkocht wordt, doneren we €1 aan een selectie van
              impactprojecten. Geen vage belofte, geen ingewikkelde constructies: een vast bedrag,
              per fles, transparant te herleiden. Dat maakt het model net zo schaalbaar als het merk
              zelf — voor de consument thuis, én voor onze partners in retail en horeca.
            </p>
            <div className="bg-[#102338] border border-[#234060] p-8">
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1,00</p>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-6">Vast donatiebedrag per fles</p>
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
              <p className="text-white/35 text-xs uppercase tracking-wider">Transparant herleidbaar naar verkochte flessen</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
  // a form at formspree.io (free account, takes ~2 minutes, no credit card).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-2xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Laten we praten
        </h1>
        <p className="text-white/45 mb-12">
          Vragen over Vivace, interesse als verkooppunt, of gewoon nieuwsgierig? Stuur een bericht.
        </p>
      </Reveal>

      <Reveal delay={100}>
        {status === "sent" ? (
          <div className="border border-[#C9A04E]/30 p-8 text-center">
            <p className="text-[#C9A04E] font-medium mb-2">Bedankt voor je bericht!</p>
            <p className="text-white/40 text-sm">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="naam"
              placeholder="Naam"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mailadres"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <textarea
              name="bericht"
              placeholder="Je bericht"
              required
              rows={5}
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#D4AF37] text-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#E0C158] transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Versturen..." : "Verstuur bericht"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs">
                Er ging iets mis. Probeer het opnieuw of mail direct naar drinkvivace@gmail.com.
              </p>
            )}
          </form>
        )}
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 pt-10 border-t border-[#234060] text-white/35 text-sm space-y-1">
          <p>info@drinkvivace.nl</p>
          <p>drinkvivace@gmail.com <span className="text-white/20 text-xs">(tijdelijk, werkt al)</span></p>
          <p>Nederland</p>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- FAQ Page ----------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#234060]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-white/90 text-base md:text-lg leading-snug pr-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {q}
        </span>
        <span className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronRight size={16} className="rotate-90" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 pr-8 text-white/45 text-sm md:text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    title: "Het product",
    items: [
      {
        q: "Wat is Vivace Limoncello precies?",
        a: "Vivace is een limoncello van 30% ALC/VOL, gemaakt volgens een authentiek Italiaans recept. Geproduceerd in Nederland bij een ambachtelijke distilleerderij, met smaken die recht doen aan de Italiaanse traditie.",
      },
      {
        q: "Is Vivace in Italië gemaakt?",
        a: "Het recept is Italiaans, maar Vivace wordt geproduceerd in Nederland. Daarom staat op het etiket 'Prelibatezza Italiana' (Italiaanse lekkernij), in plaats van een claim dat het product zelf uit Italië komt.",
      },
      {
        q: "Welke ingrediënten zitten er in?",
        a: "Vivace bevat citroenschil, alcohol, water en suiker. Voor exacte ingrediënten en allergenen verwijzen we naar het etiket op de fles.",
      },
      {
        q: "Hoe drink je Vivace het beste?",
        a: "Traditioneel goed gekoeld als digestief, direct uit de vriezer. Vivace is ook heerlijk als basis voor een spritz: limoncello met prosecco en bruiswater over ijs.",
      },
      {
        q: "Hoeveel calorieën heeft Vivace?",
        a: "218 kcal per 100ml, wat neerkomt op ongeveer 75 kcal per shot van 35ml.",
      },
    ],
  },
  {
    title: "Bestellen & verkooppunten",
    items: [
      {
        q: "Waar kan ik Vivace kopen?",
        a: "Bekijk onze Verkooppunten-pagina voor een actueel overzicht van winkels en restaurants waar Vivace verkrijgbaar is.",
      },
      {
        q: "Kan ik Vivace direct via de website bestellen?",
        a: "Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een erkende slijterij. Daarom verkopen we via onze fysieke verkooppunten in plaats van rechtstreeks via de site.",
      },
      {
        q: "Ben je een winkel of horecazaak en wil je Vivace verkopen?",
        a: "Mooi! Neem contact met ons op via de contactpagina met wat informatie over je zaak, dan nemen we snel contact op.",
      },
      {
        q: "Is er een minimumleeftijd om Vivace te kopen?",
        a: "Ja. Vivace is alleen bestemd voor personen van 18 jaar en ouder, zoals wettelijk vereist voor alcoholhoudende dranken in Nederland.",
      },
    ],
  },
  {
    title: "Vivace & impact",
    items: [
      {
        q: "Hoe werkt het donatiemodel van Vivace?",
        a: "Voor elke verkochte fles Vivace doneren we €1 aan geselecteerde impactprojecten. Een vast bedrag, per fles, onafhankelijk van marge of omzet.",
      },
      {
        q: "Waarom een vast bedrag per fles, in plaats van een percentage van de winst?",
        a: "Een vast bedrag is transparant en voorspelbaar — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt het model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, zonder dat dit afhangt van hoe een kwartaal er financieel uitziet.",
      },
      {
        q: "Welke projecten steunt Vivace?",
        a: "We doneren aan een selectie van impactprojecten. Voor de meest actuele informatie hierover kun je contact met ons opnemen.",
      },
      {
        q: "Hoe weet ik dat de donatie echt gebeurt?",
        a: "Transparantie vinden we belangrijk. Heb je vragen over hoe we dit bijhouden, neem dan gerust contact met ons op.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Vragen</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Veelgestelde vragen
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Alles wat je wilt weten over Vivace — van het product tot ons donatiemodel.
        </p>
      </Reveal>

      {FAQ_SECTIONS.map((section, i) => (
        <Reveal key={section.title} delay={i * 100}>
          <div className={i > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-2xl text-[#D4AF37] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {section.title}
            </h2>
            <div className="h-px w-full bg-[#1c3450] mb-2" />
            <div>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div className="mt-16 text-center border-t border-[#234060] pt-10">
          <p className="text-white/40 text-sm mb-3">Staat je vraag er niet bij?</p>
          <Link
            to="/contact"
            className="text-[#D4AF37] font-serif italic text-lg border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Neem contact met ons op
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- Recipe Page ----------
// ---------- Blog ----------
// Unified blog covering three post types: recept (recipe), nieuws (news),
// verkooppunt (new stockist announcement). Recipe posts carry the full
// ingredients/steps/serving-adjuster data; other types are simpler articles.
const BLOG_CATEGORIES = [
  { id: "alle", label: "Alle" },
  { id: "recept", label: "Recept" },
  { id: "nieuws", label: "Nieuws" },
  { id: "verkooppunt", label: "Verkooppunten" },
];

const BLOG_POSTS = [
  {
    id: "spritz-klassiek",
    type: "recept",
    title: "Vivace Limoncello Spritz — het klassieke recept",
    date: "2026-06-01",
    image: "/images/vivace-instagram-recepten-spritz.png",
    excerpt: "De originele: fris, lichtzoet en gevuld met bubbels. Het recept waarmee alles begon.",
    ingredients: [
      { amount: 5, unit: "cl", name: "Vivace Limoncello" },
      { amount: 10, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 3, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje munt (optioneel)" },
    ],
    steps: [
      "Vul een groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam, om de bubbels te behouden.",
      "Maak af met een scheutje bruiswater.",
      "Garneer met een schijfje citroen en eventueel een takje munt. Direct serveren.",
    ],
  },
  {
    id: "spritz-light",
    type: "recept",
    title: "Vivace Spritz Light — lichter en langer",
    date: "2026-06-01",
    excerpt: "Iets lichter en langer, met meer bruiswater. Perfect voor een lange, warme middag.",
    ingredients: [
      { amount: 4, unit: "cl", name: "Vivace Limoncello" },
      { amount: 8, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 8, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
    ],
    steps: [
      "Vul een groot longdrinkglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe.",
      "Vul aan met ruim bruiswater voor een lichtere, langere drank.",
      "Garneer met een schijfje citroen.",
    ],
  },
  {
    id: "spritz-intenso",
    type: "recept",
    title: "Vivace Spritz Intenso — voor de echte liefhebber",
    date: "2026-06-01",
    excerpt: "Voor wie de limoncello echt wil proeven: een stevigere pour met minder verdunning.",
    ingredients: [
      { amount: 7, unit: "cl", name: "Vivace Limoncello" },
      { amount: 7, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje rozemarijn (optioneel)" },
    ],
    steps: [
      "Vul een tumbler of groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam.",
      "Garneer met een schijfje citroen en eventueel een takje rozemarijn.",
    ],
  },
  {
    id: "instagram-launch",
    type: "nieuws",
    title: "Vivace is live op Instagram",
    date: "2026-06-29",
    image: "/images/vivace-instagram-launch.png",
    excerpt: "Vivace is nu ook te volgen op Instagram. Volg @drinkvivace voor nieuwe recepten, verkooppunten en updates over ons impactmodel.",
    body: [
      "Vivace is nu ook te volgen op Instagram via @drinkvivace. Daar delen we als eerste nieuwe Spritz-recepten, aankondigingen van nieuwe verkooppunten, en updates over ons impactmodel.",
      "€1 van elke verkochte fles gaat naar geselecteerde impactprojecten — premium kwaliteit met een heldere belofte, bij elke borrel.",
      "Volg ons om op de hoogte te blijven, en laat gerust weten met wie jij je eerste glas Vivace zou delen.",
    ],
  },
  {
    id: "instagram-label-onthulling",
    type: "nieuws",
    title: "Het Vivace-etiket, onthuld",
    date: "2026-07-03",
    image: "/images/vivace-instagram-label-reveal.png",
    excerpt: "Simpel, met opzet. Geen opgevulde tekst over ons verhaal, wel een QR-code naar de rest. Zo ziet het etiket eruit dat straks op elke fles staat.",
    body: [
      "Deze week deelden we op Instagram het definitieve ontwerp van het Vivace-etiket.",
      "Bewust simpel: geen lange tekst over ons verhaal of ons impactmodel op de fles zelf. In plaats daarvan een kleine QR-code die rechtstreeks naar drinkvivace.nl leidt, waar het hele verhaal wel te lezen is.",
      "Het resultaat is een etiket dat op de plank meteen opvalt, zonder dat het overvol aanvoelt. Binnenkort te zien op echte flessen bij onze verkooppunten.",
    ],
  },
  {
    id: "voor-het-leven-van-jou-en-van-hen",
    type: "nieuws",
    title: "Voor het leven, van jou en van hen",
    date: "2026-07-11",
    image: "/images/vivace-instagram-giveback.png",
    excerpt: "Vivace is meer dan een likeur. €1 van elke fles gaat naar impactprojecten, geen bijzaak, maar de reden dat we bestaan.",
    body: [
      "Vivace is meer dan een likeur. Voor elke fles die we verkopen, geven we €1 terug aan mensen voor wie het leven zwaarder is dan het zou moeten zijn.",
      "Vivace betekent levendig, vol leven. Dat is wat we vieren: de avonden die te lang duren, de tafels die te vol staan, het gevoel dat er even niets anders hoeft te bestaan dan dit moment. Geïnspireerd door Rome, gemaakt in Nederland, gebouwd rond één simpel idee: het goede leven is pas compleet als je het deelt.",
      "Dus wanneer je een fles Vivace opent, doe je meer dan proosten. Je geeft iets door.",
      "Voor het leven, van jou en van hen.",
    ],
  },
  {
    id: "nieuw-impactmodel",
    type: "nieuws",
    title: "Vivace gaat over op een vast donatiebedrag: €1 per fles",
    date: "2026-06-20",
    excerpt: "We hebben ons impactmodel aangescherpt. In plaats van een percentage van de winst, doneren we nu een vast bedrag van €1 per verkochte fles — transparant en schaalbaar.",
    body: [
      "Vanaf nu doneert Vivace €1 voor elke verkochte fles aan geselecteerde impactprojecten. Dit vervangt ons eerdere model, waarbij we een deel van de winst doneerden.",
      "Waarom de verandering? Een vast bedrag per fles is voorspelbaar en transparant — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt ons model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, onafhankelijk van marges of hoe een kwartaal er financieel uitziet.",
      "Op onze website vind je een live teller die het aantal verkochte flessen en het totaal gedoneerde bedrag laat zien. Deze teller wordt de komende tijd gekoppeld aan onze echte verkoopdata.",
    ],
  },
  {
    id: "nieuwe-verkooppunt",
    type: "verkooppunt",
    title: "Vivace nu ook te koop bij een nieuw verkooppunt",
    date: "2026-06-15",
    excerpt: "We breiden uit! Vivace Limoncello is sinds deze week te koop bij een nieuw verkooppunt.",
    body: [
      "We zijn verheugd om aan te kondigen dat Vivace Limoncello vanaf deze week verkrijgbaar is bij een nieuw verkooppunt. Bekijk de volledige lijst en adressen op onze Verkooppunten-pagina.",
      "Ben je zelf een winkel, slijterij of horecazaak en wil je Vivace in je assortiment? Neem contact met ons op via de contactpagina — we denken graag mee.",
    ],
  },
  {
    id: "het-moment",
    type: "nieuws",
    title: "Voor het aperitief. Of gewoon omdat het kan.",
    date: "2026-07-18",
    image: "/images/vivace-instagram-het-moment.png",
    excerpt: "Je hoeft niet te wachten op een speciale gelegenheid. Vivace maakt gewone momenten een beetje beter.",
    body: [
      "Je hoeft niet te wachten op een speciale gelegenheid. Vivace is er voor het aperitief voor het eten, voor een rustige avond op het balkon, of voor geen enkele reden behalve dat het weekend is.",
      "Gekoeld uit de vriezer, puur in een klein glas, is vaak al genoeg.",
      "We zien Vivace niet als iets voor speciale momenten. We zien het als iets dat gewone momenten een beetje beter maakt. Een druppel Italiaanse zomer, ook op een doordeweekse dinsdag.",
    ],
  },
  {
    id: "waarom-eenmaal-per-jaar-doneren",
    type: "nieuws",
    title: "Waarom we €1 per fles sparen, niet meteen weggeven",
    date: "2026-07-18",
    image: "/images/vivace-instagram-giveback-jaarlijks.png",
    excerpt: "Elke fles legt €1 opzij. Aan het einde van het jaar doneren we het volledige bedrag in één keer, niet per verkoop.",
    body: [
      "Bij elke fles Vivace die verkocht wordt, leggen we €1 opzij voor impactprojecten. Niet als losse donatie bij elke verkoop, maar als onderdeel van een pot die het hele jaar door groeit.",
      "Aan het einde van het jaar tellen we alles op en maken we het volledige bedrag in één keer over aan de projecten die we dat jaar hebben geselecteerd.",
      "We kozen bewust voor deze aanpak, om twee redenen. Ten eerste schaal: honderd losse donaties van een paar euro verdwijnen, terwijl één substantieel bedrag een project echt vooruit kan helpen. Ten tweede zorgvuldigheid: door te wachten tot het einde van het jaar hebben we tijd om de juiste projecten te vinden en te beoordelen, in plaats van overhaaste keuzes te maken bij elke losse verkoop.",
      "Aan het einde van het jaar laten we precies zien waar het geld naartoe is gegaan: welk project, hoeveel, en waarom.",
    ],
  },
];

function formatRecipeAmount(amount, servings) {
  if (amount === null) return null;
  const scaled = Math.round(amount * servings * 10) / 10;
  return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
}

function formatBlogDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, onOpen }) {
  return (
    <button
      onClick={() => onOpen(post.id)}
      className="text-left border border-[#234060] hover:border-[#D4AF37]/40 transition-colors flex flex-col h-full overflow-hidden"
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
          {BLOG_CATEGORIES.find((c) => c.id === post.type)?.label || post.type}
        </span>
        <h3 className="font-serif text-xl text-white/90 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {post.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <span className="text-white/25 text-xs">{formatBlogDate(post.date)}</span>
      </div>
    </button>
  );
}

function RecipeBody({ post }) {
  const [servings, setServings] = useState(1);
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12">
      <div className="flex items-center justify-end mb-10">
        <div className="flex items-center gap-4">
          <span className="text-white/35 text-[10px] uppercase tracking-[0.15em]">Glazen</span>
          <div className="flex items-center gap-3 border border-[#234060]">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Minder glazen"
            >
              <Minus size={14} />
            </button>
            <span className="font-serif text-[#D4AF37] text-base w-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {servings}
            </span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Meer glazen"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Ingrediënten</p>
          <ul className="space-y-3">
            {post.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-white/80 text-sm border-b border-[#1c3450] pb-3">
                <span>{ing.name}</span>
                {ing.amount !== null && (
                  <span className="font-serif text-[#D4AF37] whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatRecipeAmount(ing.amount, servings)} {ing.unit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Bereiding</p>
          <ol className="space-y-4">
            {post.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-white/55 leading-relaxed">
                <span className="font-serif text-[#D4AF37] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-[#1c3450]">
        <p className="font-serif italic text-white/40 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Tip: bewaar je Vivace in de vriezer voor het koudste, meest verfrissende resultaat.
        </p>
        <p className="text-white/20 text-[11px] mt-4">Drink met aandacht, drink met mate. 18+.</p>
      </div>
      </div>
    </div>
  );
}

function ArticleBody({ post }) {
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12 space-y-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-white/55 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const [filter, setFilter] = useState("alle");
  const [openId, setOpenId] = useState(null);

  const filtered = filter === "alle" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.type === filter);
  const openPost = openId ? BLOG_POSTS.find((p) => p.id === openId) : null;

  if (openPost) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
        <button
          onClick={() => setOpenId(null)}
          className="text-white/40 text-[11px] uppercase tracking-wider mb-10 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
        >
          ← Terug naar blog
        </button>
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
            {BLOG_CATEGORIES.find((c) => c.id === openPost.type)?.label}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {openPost.title}
          </h1>
          <p className="text-white/30 text-xs mb-10">{formatBlogDate(openPost.date)}</p>
        </Reveal>
        <Reveal delay={100}>
          {openPost.type === "recept" ? <RecipeBody post={openPost} /> : <ArticleBody post={openPost} />}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Blog</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Recepten, nieuws & verkooppunten
        </h1>
        <p className="text-white/45 max-w-lg mb-12">
          Alles op één plek: nieuwe manieren om Vivace te serveren, updates over ons impactmodel, en
          waar je Vivace als eerste kunt vinden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.14em] border transition-colors ${
                filter === c.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "text-white/50 border-[#234060] hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((post, i) => (
          <Reveal key={post.id} delay={150 + i * 80}>
            <BlogCard post={post} onOpen={setOpenId} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Privacybeleid
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Dit privacybeleid legt uit welke gegevens Vivace verzamelt,
          waarom, en welke rechten je hebt.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Vivace wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven bij de
            Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD Poortugaal,
            Nederland. Voor vragen over dit privacybeleid kun je contact opnemen via
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="2. Welke gegevens we verzamelen">
          <p>Wij verzamelen alleen de gegevens die je zelf actief met ons deelt, namelijk via het contactformulier op onze website:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>De inhoud van je bericht</li>
          </ul>
          <p>
            Wij gebruiken geen trackingcookies, geen advertentiepixels en verzamelen geen
            gegevens voor profilering of marketingdoeleinden zonder jouw expliciete toestemming.
          </p>
        </LegalSection>

        <LegalSection title="3. Waarom we deze gegevens verzamelen">
          <p>
            We gebruiken de gegevens uit het contactformulier uitsluitend om je vraag, opmerking of
            verzoek (bijvoorbeeld als potentiële verkooppartner) te kunnen beantwoorden. We gebruiken
            je gegevens niet voor geautomatiseerde besluitvorming en delen ze niet met derden voor
            commerciële doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="4. Hoe lang we gegevens bewaren">
          <p>
            Berichten via het contactformulier bewaren we niet langer dan noodzakelijk om je vraag
            te kunnen afhandelen, en in elk geval niet langer dan 24 maanden
            na het laatste contact, tenzij we wettelijk verplicht zijn gegevens langer te bewaren.
          </p>
        </LegalSection>

        <LegalSection title="5. Derde partijen">
          <p>
            Ons contactformulier wordt verwerkt via Formspree, een derde partij die berichten van
            het formulier naar ons doorstuurt. Voor meer informatie over hoe Formspree gegevens
            verwerkt, verwijzen we naar hun eigen privacybeleid.
          </p>
          <p>
            Onze website wordt gehost via Vercel. Standaard servertechnische gegevens (zoals
            IP-adres en tijdstip van bezoek) kunnen door onze hostingpartij worden gelogd voor
            beveiligings- en technische doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="6. Jouw rechten">
          <p>Onder de AVG (GDPR) heb je het recht om:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Inzage te krijgen in de gegevens die we van je hebben</li>
            <li>Je gegevens te laten corrigeren of verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p>
            Wil je gebruikmaken van een van deze rechten? Stuur een e-mail naar
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="7. Wijzigingen in dit beleid">
          <p>
            We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie is
            altijd te vinden op deze pagina, met de datum van de laatste wijziging hierboven.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Algemene voorwaarden
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Deze voorwaarden zijn van toepassing op het gebruik van deze
          website en op de informatie die hierop wordt aangeboden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Deze website wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven
            bij de Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD
            Poortugaal, Nederland. BTW-identificatienummer: NL004279162B10.
          </p>
        </LegalSection>

        <LegalSection title="2. Leeftijdsgrens">
          <p>
            Vivace Limoncello is een alcoholhoudend product (30% ALC/VOL) en is uitsluitend bestemd
            voor personen van 18 jaar en ouder. Door deze website te gebruiken bevestig je dat je
            18 jaar of ouder bent. Het is verboden alcohol te verkopen aan, of te laten consumeren
            door, personen onder de 18 jaar, conform de Nederlandse Alcoholwet.
          </p>
        </LegalSection>

        <LegalSection title="3. Verkoop via derde partijen">
          <p>
            Vivace Limoncello wordt niet rechtstreeks via deze website verkocht. Sterke drank (30%
            ALC/VOL of hoger) mag in Nederland alleen online verkocht worden door een hiervoor
            erkende slijterij. Vivace is daarom uitsluitend verkrijgbaar via de fysieke
            verkooppunten die op deze website worden vermeld. Voor vragen over prijs,
            beschikbaarheid of voorraad bij een specifiek verkooppunt verwijzen we je naar dat
            verkooppunt zelf.
          </p>
        </LegalSection>

        <LegalSection title="4. Impact- en donatiemodel">
          <p>
            Vivace doneert €1 per verkochte fles aan geselecteerde impactprojecten. Dit bedrag is
            vast en wordt niet beïnvloed door de verkoopprijs die door individuele verkooppunten
            wordt gehanteerd. De op deze website weergegeven tellers (aantal verkochte flessen en
            totaal gedoneerd bedrag) zijn indicatief en worden periodiek bijgewerkt; zie ook onze
            Onze Impact-pagina voor meer toelichting.
          </p>
        </LegalSection>

        <LegalSection title="5. Intellectueel eigendom">
          <p>
            Alle content op deze website — waaronder teksten, het Vivace-logo, productfoto's,
            illustraties en de vormgeving van het etiket — is eigendom van VVM Trading of wordt
            gebruikt met toestemming van de rechthebbende. Niets van deze website mag worden
            gekopieerd, verspreid of commercieel gebruikt zonder voorafgaande schriftelijke
            toestemming.
          </p>
        </LegalSection>

        <LegalSection title="6. Aansprakelijkheid">
          <p>
            We doen ons best om de informatie op deze website actueel en correct te houden, maar
            kunnen niet garanderen dat alle informatie op elk moment volledig juist of up-to-date
            is. VVM Trading is niet aansprakelijk voor schade die voortvloeit uit het gebruik van
            deze website of uit het gebruik van het product, behalve in gevallen van opzet of grove
            schuld, of voor zover dwingend Nederlands recht anders bepaalt.
          </p>
        </LegalSection>

        <LegalSection title="7. Toepasselijk recht">
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen worden
            voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>
            Vragen over deze voorwaarden? Neem contact met ons op via info@drinkvivace.nl.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-[#1c3450] px-6 md:px-14 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 items-center gap-8 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <p className="font-serif text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Vivace
          </p>
          <a
            href="https://instagram.com/drinkvivace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#D4AF37] transition-colors"
            aria-label="Vivace op Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
        <p className="font-serif italic text-sm text-white/20 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "Doe anders, geniet anders."
        </p>
        <ul className="flex gap-7 justify-center md:justify-end text-[11px] uppercase tracking-wider text-white/25 flex-wrap">
          {footerLinks.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className="hover:text-[#D4AF37] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-[11px] text-white/15 mt-10 pt-8 border-t border-[#1c3450]">
        © 2026 Vivace · Drink verantwoord. 18+
      </p>
      <div className="flex gap-6 justify-center text-[10px] uppercase tracking-wider text-white/20 mt-4">
        <Link to="/privacybeleid" className="hover:text-[#D4AF37] transition-colors">
          Privacybeleid
        </Link>
        <Link to="/algemene-voorwaarden" className="hover:text-[#D4AF37] transition-colors">
          Algemene voorwaarden
        </Link>
      </div>
    </footer>
  );
}

// ---------- App ----------
// Scrolls to top whenever the route changes, replacing the old
// useEffect([page]) behavior now that navigation uses real URLs.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppShell() {
  const [ageConfirmed, setAgeConfirmed] = useState(null); // null | true | false
  const [showWelcome, setShowWelcome] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const handleAgeConfirm = (confirmed) => {
    setAgeConfirmed(confirmed);
    if (confirmed) setShowWelcome(true);
  };

  if (ageConfirmed === null) return <AgeGate onConfirm={handleAgeConfirm} />;
  if (ageConfirmed === false) return <UnderageBlock />;

  return (
    <div className="bg-[#0a1628] text-white min-h-screen font-sans" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#0a1628" }}>
      <ScrollToTop />
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      <Nav cart={cart} setCartOpen={setCartOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producten" element={<ProductsPage cart={cart} />} />
        <Route path="/verkooppunten" element={<StoresPage />} />
        <Route path="/over-ons" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacybeleid" element={<PrivacyPage />} />
        <Route path="/algemene-voorwaarden" element={<TermsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

// ---------- App ----------
export default function VivaceApp() {
  return (
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  );
}          <stop offset="15%" stopColor="#f5f2e4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#e8d98a" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#d4c468" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b8a84a" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0d050" />
          <stop offset="50%" stopColor="#f7dc6f" />
          <stop offset="100%" stopColor="#d4af2a" />
        </linearGradient>
        {/* Cream label */}
        <linearGradient id="bLabelBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7f3e8" />
          <stop offset="100%" stopColor="#efe8d8" />
        </linearGradient>
        {/* Sky for colosseum scene */}
        <linearGradient id="bSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="bShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="38%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="bClip">
          <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" />
        </clipPath>
        <clipPath id="bSceneClip">
          <rect x="26" y="142" width="58" height="34" />
        </clipPath>
      </defs>

      {/* Glass bottle body */}
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bLiquid)" />
      <path d="M38,30 L38,16 Q38,8 45,6 L65,6 Q72,8 72,16 L72,30 Q85,38 88,55 L88,340 Q88,355 75,358 L35,358 Q22,355 22,340 L22,55 Q25,38 38,30 Z" fill="url(#bShine)" />

      {/* Label background - cream */}
      <rect x="24" y="96" width="62" height="190" rx="2" fill="url(#bLabelBg)" clipPath="url(#bClip)" />
      <rect x="24" y="96" width="62" height="190" rx="2" fill="none" stroke="#2c5f8a" strokeWidth="1.5" clipPath="url(#bClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#bSceneClip)">
        <rect x="26" y="142" width="58" height="22" fill="url(#bSky)" />
        {/* Colosseum structure */}
        <rect x="32" y="152" width="46" height="14" fill="#c98a52" />
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={i} x={34 + i * 4} y="154" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="32" y="150" width="46" height="2.5" fill="#e8c896" />
        {/* golden rocky foreground */}
        <rect x="26" y="164" width="58" height="12" fill="#c9a23a" />
        <polygon points="28,176 33,166 38,176" fill="#b3892e" />
        <polygon points="40,176 46,167 52,176" fill="#bf9433" />
        <polygon points="54,176 60,168 66,176" fill="#b3892e" />
        <polygon points="68,176 74,166 80,176" fill="#bf9433" />
      </g>
      <rect x="26" y="142" width="58" height="34" fill="none" stroke="#2c5f8a" strokeWidth="1" clipPath="url(#bClip)" />

      {/* VIVACE wordmark */}
      <text x="55" y="195" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontWeight="bold" fill="#1f3a4d" letterSpacing="2.5" clipPath="url(#bClip)">VIVACE</text>
      <text x="55" y="207" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="#5a5240" letterSpacing="2" clipPath="url(#bClip)">LIMONCELLO</text>

      <line x1="32" y1="214" x2="78" y2="214" stroke="#2c5f8a" strokeWidth="0.6" opacity="0.4" clipPath="url(#bClip)" />

      <text x="55" y="226" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="5" fill="#5a5240" letterSpacing="1" clipPath="url(#bClip)">Italiano · 30% VOL · 500ml</text>
      <text x="55" y="237" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#bClip)">218 kcal/100ml · 75 kcal per shot (35ml)</text>

      {/* Lower blue accent band */}
      <rect x="24" y="266" width="62" height="16" fill="#2c5f8a" clipPath="url(#bClip)" />
      <text x="55" y="277" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill="#f0e8cc" letterSpacing="1.5" clipPath="url(#bClip)">€2 PER FLES NAAR IMPACT</text>

      {/* Cap & neck */}
      <rect x="38" y="0" width="34" height="22" rx="2" fill="#c8c8c8" />
      <rect x="38" y="0" width="34" height="22" rx="2" fill="none" stroke="#999" strokeWidth="0.5" />
      <text x="55" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#666" letterSpacing="1">VIVACE</text>
    </svg>
  );
}

function CanSVG({ size = 90 }) {
  const h = size * (220 / 90);
  return (
    <svg width={size} height={h} viewBox="0 0 90 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e0d9c0" />
          <stop offset="15%" stopColor="#f7f3e8" />
          <stop offset="50%" stopColor="#fbf8ee" />
          <stop offset="85%" stopColor="#efe8d8" />
          <stop offset="100%" stopColor="#d8cfb0" />
        </linearGradient>
        <linearGradient id="cSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c5f8a" />
          <stop offset="100%" stopColor="#4a85ab" />
        </linearGradient>
        <linearGradient id="cTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <clipPath id="cClip">
          <rect x="10" y="18" width="70" height="186" rx="8" />
        </clipPath>
        <clipPath id="cSceneClip">
          <rect x="14" y="56" width="62" height="36" />
        </clipPath>
      </defs>

      {/* Can body - cream */}
      <rect x="10" y="18" width="70" height="186" rx="8" fill="url(#cBody)" />

      {/* Blue accent stripes */}
      <rect x="10" y="44" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />
      <rect x="10" y="186" width="70" height="2.5" fill="#2c5f8a" clipPath="url(#cClip)" />

      {/* Colosseum illustrated scene */}
      <g clipPath="url(#cSceneClip)">
        <rect x="14" y="56" width="62" height="24" fill="url(#cSky)" />
        <rect x="20" y="68" width="50" height="14" fill="#c98a52" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={22 + i * 4} y="70" width="2" height="9" fill="#7a4f28" />
        ))}
        <rect x="20" y="66" width="50" height="2.5" fill="#e8c896" />
        <rect x="14" y="80" width="62" height="12" fill="#c9a23a" />
        <polygon points="18,92 24,82 30,92" fill="#b3892e" />
        <polygon points="32,92 39,83 46,92" fill="#bf9433" />
        <polygon points="48,92 55,81 62,92" fill="#b3892e" />
        <polygon points="64,92 71,83 78,92" fill="#bf9433" />
      </g>
      <rect x="14" y="56" width="62" height="36" fill="none" stroke="#2c5f8a" strokeWidth="0.8" clipPath="url(#cClip)" />

      {/* VIVACE wordmark */}
      <text x="45" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#1f3a4d" letterSpacing="2" clipPath="url(#cClip)">VIVACE</text>
      <text x="45" y="119" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" fill="#5a5240" letterSpacing="1.8" clipPath="url(#cClip)">LIMONCELLO SPRITZ</text>

      <line x1="22" y1="127" x2="68" y2="127" stroke="#2c5f8a" strokeWidth="0.5" opacity="0.4" clipPath="url(#cClip)" />

      <text x="45" y="138" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.5" fill="#5a5240" letterSpacing="0.8" clipPath="url(#cClip)">7% VOL · 250ml</text>
      <text x="45" y="147" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="#7a7260" letterSpacing="0.3" clipPath="url(#cClip)">95 kcal per blikje</text>

      {/* Lower blue band */}
      <rect x="10" y="160" width="70" height="14" fill="#2c5f8a" clipPath="url(#cClip)" />
      <text x="45" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4" fill="#f0e8cc" letterSpacing="1" clipPath="url(#cClip)">€2 PER FLES NAAR IMPACT</text>

      {/* Top & bottom */}
      <ellipse cx="45" cy="18" rx="35" ry="7" fill="url(#cTopGrad)" />
      <ellipse cx="45" cy="12" rx="8" ry="3" fill="#999" />
      <rect x="43" y="9" width="4" height="8" rx="2" fill="#888" />
      <ellipse cx="45" cy="204" rx="35" ry="7" fill="#999" />
    </svg>
  );
}

// ---------- Product data ----------
const PRODUCTS = {
  limoncello: {
    id: "limoncello",
    name: "Vivace Limoncello",
    type: "Onze Signature Fles",
    price: 24.95,
    abv: "30% VOL",
    size: "500ml",
    kcal: "218 kcal / 100ml · 75 kcal per shot (35ml)",
    onlineSellable: false,
    description:
      "Echte Italiaanse limoncello, gemaakt door een ambachtelijke distilleerderij hier in Nederland. Citrus, romig en ijskoud het lekkerst.",
    backLabel: '"Wij maken het. Jij drinkt het. Samen geven we door."',
  },
  spritz: {
    id: "spritz",
    name: "Vivace Spritz",
    type: "De Toekomst ⚡",
    price: 3.25,
    abv: "7% VOL",
    size: "250ml",
    kcal: "95 kcal per blikje (250ml)",
    onlineSellable: false,
    comingSoon: true,
    description:
      "Limoncello ontmoet bruisend water. Direct klaar om te drinken, recht uit het blikje. Fris, helder en onmiskenbaar Italiaans.",
    backLabel: '"Nu opentrekken."',
  },
};

// PLACEHOLDER DATA — replace name, address, city, and postcode with your
// real stockists' details. Once you have them, this is the only place you
// need to edit; the page below builds itself from this array automatically.
const STOCKISTS = [
  {
    name: "[Naam supermarkt]",
    type: "Supermarkt",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
  {
    name: "[Naam restaurant]",
    type: "Restaurant",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    products: ["limoncello"],
  },
];

// Builds a Google Maps embed URL from an address string. No API key needed
// for this basic embed format.
function mapsEmbedUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

function mapsLinkUrl(stockist) {
  const query = encodeURIComponent(`${stockist.name}, ${stockist.address}, ${stockist.postcode} ${stockist.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// ---------- Cart context (simple prop-drill, no localStorage) ----------
function useCart() {
  const [items, setItems] = useState({});

  const add = (id) => setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) =>
    setItems((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });
  const clear = () => setItems({});

  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const total = Object.entries(items).reduce(
    (sum, [id, qty]) => sum + PRODUCTS[id].price * qty,
    0
  );

  return { items, add, remove, clear, count, total };
}

// ---------- Nav ----------
function Nav({ cart, setCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#0a1628]/95 border-b border-[#1c3450]" : "bg-gradient-to-b from-[#0a1628]/90 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="font-serif text-2xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Vivace
        </Link>

        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  location.pathname === l.path ? "text-[#D4AF37]" : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white/80 hover:text-[#D4AF37] transition-colors"
            aria-label="Winkelwagen"
          >
            <ShoppingBag size={20} />
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <button className="md:hidden text-white/80" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#1c3450] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className="text-left text-sm uppercase tracking-wider text-white/70"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Cart Drawer ----------
function CartDrawer({ open, onClose, cart }) {
  if (!open) return null;
  const entries = Object.entries(cart.items);

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#050b14]/80" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#0f1f33] border-l border-[#234060] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#234060]">
          <h3 className="font-serif text-xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Winkelwagen
          </h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {entries.length === 0 && (
            <p className="text-white/40 text-sm">Je winkelwagen is leeg. Online bestellen volgt binnenkort.</p>
          )}
          {entries.map(([id, qty]) => {
            const p = PRODUCTS[id];
            return (
              <div key={id} className="flex gap-4 items-center">
                <div className="flex-shrink-0">
                  {id === "limoncello" ? (
                    <img
                      src="/images/vivace-bottle-hero.jpg"
                      alt="Vivace Limoncello"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  ) : (
                    <img
                      src="/images/vivace-can-hero.jpg"
                      alt="Vivace Limoncello Spritz"
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90">{p.name}</p>
                  <p className="text-xs text-white/40">€{p.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cart.remove(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm w-4 text-center">{qty}</span>
                  <button
                    onClick={() => cart.add(id)}
                    className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {entries.length > 0 && (
          <div className="p-6 border-t border-[#234060] space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Subtotaal</span>
              <span className="text-white">€{cart.total.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#D4AF37]/70 italic">€2 per fles naar impactprojecten — €{(cart.count * 2).toFixed(2)} bij deze bestelling.</p>
            <button className="w-full bg-[#D4AF37] text-black py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158] transition-colors">
              Afrekenen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Age gate ----------
function AgeGate({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6" style={{ backgroundColor: "#0a1628" }}>
      <div className="max-w-sm text-center">
        <p className="font-serif text-3xl text-[#D4AF37] tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace
        </p>
        <p className="text-white/70 text-sm mb-2">Ben je 18 jaar of ouder?</p>
        <p className="text-white/30 text-xs mb-8">We vragen dit omdat onze producten alcohol bevatten.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onConfirm(true)}
            className="bg-[#D4AF37] text-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[#E0C158]"
          >
            Ja, ik ben 18+
          </button>
          <button
            onClick={() => onConfirm(false)}
            className="border border-white/20 text-white/50 px-8 py-3 text-xs uppercase tracking-[0.15em]"
          >
            Nee
          </button>
        </div>
      </div>
    </div>
  );
}

function UnderageBlock() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#0a1628] flex items-center justify-center px-6 text-center" style={{ backgroundColor: "#0a1628" }}>
      <p className="text-white/50 text-sm max-w-sm">
        Je moet 18 jaar of ouder zijn om deze website te bezoeken. Drink geen alcohol als je jonger bent.
      </p>
    </div>
  );
}

// ---------- Welcome banner ----------
// Shows right after someone confirms they're 18+: a centered, prominent
// modal thanking them and confirming their purchase already contributes to
// an impact project. Auto-dismisses, and can also be closed manually.
function HeartIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M12 21s-7.5-4.6-10-9.1C0.4 8.6 1.8 5 5.4 5c2 0 3.4 1 4.6 2.6C11.2 6 12.6 5 14.6 5 18.2 5 19.6 8.6 18 11.9 16.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function WelcomeBanner({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
      <div
        className="absolute inset-0 bg-[#050b14]/70 animate-[fadeIn_0.4s_ease-out]"
        onClick={onClose}
      />
      <div className="relative pointer-events-auto bg-[#0F1F33] border border-[#D4AF37]/50 shadow-2xl shadow-black/60 px-8 py-10 md:px-14 md:py-12 max-w-lg w-full text-center animate-[popIn_0.45s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Subtle Italian tricolor accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#3A7A4E]" />
          <div className="flex-1 bg-[#F4EFE3]" />
          <div className="flex-1 bg-[#B5402E]" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Sluiten"
        >
          <X size={22} />
        </button>

        <div className="flex justify-center mb-6">
          <HeartIcon size={48} />
        </div>

        <p
          className="font-serif italic text-[#D4AF37] text-2xl md:text-3xl leading-snug mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Doe anders, geniet anders.
        </p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-2">
          Welkom bij Vivace. Met elke fles die wordt verkocht, draag je al bij aan een
          geselecteerd impactproject.
        </p>
        <p className="text-white/40 text-xs md:text-sm">
          €2 per fles, transparant en zonder omwegen.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ---------- Impact Counter ----------
// bottlesSold connects to real sales data later (e.g. backend or payment
// provider webhook). totalDonated is always derived from it — never set
// independently — so the €2-per-bottle math stays correct everywhere.
function ImpactCounter() {
  const [bottlesSold] = useState(0); // TODO: connect to real sales data later
  const totalDonated = bottlesSold * 2;

  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Actueel</p>
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {bottlesSold.toLocaleString("nl-NL")}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Flessen verkocht</p>
        </div>
        <div>
          <p
            className="font-serif text-[#D4AF37]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}
          >
            {`€${totalDonated.toLocaleString("nl-NL", { minimumFractionDigits: 0 })}`}
          </p>
          <p className="text-white/35 text-[11px] uppercase tracking-wider mt-2">Totaal gedoneerd</p>
        </div>
      </div>
      <p className="text-white/35 text-sm mt-8 max-w-sm mx-auto">
        €2 per verkochte fles, rechtstreeks naar geselecteerde impactprojecten.
      </p>
      <p className="text-white/15 text-[11px] mt-3 italic">
        Teller wordt binnenkort live gekoppeld aan onze verkoopdata.
      </p>
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-14 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 72% 48%, rgba(62,207,0,0.06) 0%, transparent 70%), radial-gradient(ellipse 45% 55% at 28% 58%, rgba(255,215,0,0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#C9A04E] mb-7">
            Gemaakt in Nederland · Italiaanse ziel
          </p>
          <h1
            className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-9"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="font-semibold block">Doe</span>
            <em className="italic text-[#D4AF37] block">anders,</em>
            geniet anders.
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-12">
            Vivace is een premium limoncello, gemaakt met een Italiaans recept en een Nederlands hart.
            Wie we zijn is minder belangrijk dan wat elke fles teweegbrengt:
            <strong className="text-white/85 font-medium"> €2 van elke verkochte fles gaat rechtstreeks naar geselecteerde impactprojecten.</strong> Transparant,
            schaalbaar, en onderdeel van elke aankoop.
          </p>
          <div className="flex gap-5 items-center flex-wrap">
            <Link
              to="/producten"
              className="bg-[#D4AF37] text-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#E0C158] transition-colors"
            >
              Ontdek Vivace
            </Link>
            <Link
              to="/over-ons"
              className="text-white/45 text-[11px] uppercase tracking-[0.14em] border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors"
            >
              Ons verhaal
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center mt-16 md:mt-0">
          <div className="w-full max-w-md md:max-w-lg">
            <img
              src="/images/vivace-bottle-hero.jpg"
              alt="Vivace Limoncello fles voor het Colosseum"
              className="w-full h-auto rounded-sm shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* Mission ticker */}
      <div className="bg-[#D4AF37] overflow-hidden">
        <div className="flex whitespace-nowrap py-4" style={{ animation: "ticker 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, rep) =>
            ["Doe anders", "€2 per fles naar impact", "Premium Italiaans recept", "Transparant en schaalbaar", "Italiaanse ziel · Nederlands hart", "Geniet anders"].map(
              (txt, i) => (
                <span key={`${rep}-${i}`} className="inline-flex items-center gap-4 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                  {txt}
                  <span className="w-1 h-1 rounded-full bg-black/25" />
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* The number */}
      <div className="bg-[#D4AF37] text-center py-24 px-6">
        <Reveal>
          <span className="font-serif font-bold text-black block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(100px, 18vw, 200px)", lineHeight: 0.85 }}>
            €2
          </span>
          <p className="text-black/50 text-[13px] font-semibold tracking-[0.3em] uppercase mt-6">
            Per verkochte fles, naar geselecteerde impactprojecten
          </p>
        </Reveal>
      </div>

      {/* Impact counter */}
      <div className="bg-[#0a1628] py-24 px-6 border-b border-[#1c3450]" style={{ backgroundColor: "#0a1628" }}>
        <Reveal>
          <ImpactCounter />
        </Reveal>
      </div>

      {/* Quick links to stockists */}
      <section className="px-6 md:px-14 py-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Nu te koop</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Te vinden bij supermarkten en restaurants
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          {STOCKISTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div className="border border-[#234060] p-6 flex items-center gap-4 hover:border-[#D4AF37]/30 transition-colors">
                <MapPin className="text-[#D4AF37] flex-shrink-0" size={20} />
                <div>
                  <p className="text-white/90 text-sm font-medium">{s.name}</p>
                  <p className="text-white/40 text-xs">{s.type} · {s.city}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Golden Hour Scene — the feeling, without a posed model. Moved to the
          end of the homepage so the impact model and stockists lead, and this
          atmospheric closer comes last. */}
      <section className="relative overflow-hidden" style={{ height: "640px" }}>
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #1a3a5c 0%, #3d6a8a 22%, #d98a4a 48%, #f0b25a 58%, #2c5f7a 70%, #1c4356 100%)",
          }}
        />
        {/* Distant coastline */}
        <svg className="absolute bottom-[42%] left-0 w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <polygon points="0,120 0,70 120,40 260,75 420,30 600,68 780,45 1000,80 1000,120" fill="#3a5f70" opacity="0.55" />
          <polygon points="0,120 0,90 180,60 380,95 560,55 760,90 1000,65 1000,120" fill="#2c4a58" opacity="0.7" />
        </svg>
        {/* Water */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            bottom: "30%",
            background: "linear-gradient(to bottom, #2c6a85 0%, #1e4f66 60%, #173e50 100%)",
          }}
        />
        {/* Soft glow on water */}
        <div
          className="absolute"
          style={{
            width: "160px",
            height: "180px",
            left: "50%",
            top: "58%",
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, rgba(255,217,138,0.28), rgba(255,217,138,0))",
            filter: "blur(6px)",
          }}
        />
        {/* Pool edge / terrace stone */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            top: "70%",
            background: "linear-gradient(to bottom, #e8dcc4 0%, #d9c9a6 40%, #c9b78f 100%)",
          }}
        />
        <div className="absolute left-0 right-0" style={{ top: "70%", height: "4px", background: "#1e4f66" }} />

        {/* Table with two glasses + lemons, foreground, off to one side */}
        <div className="absolute" style={{ right: "8%", bottom: "6%" }}>
          <svg width="260" height="140" viewBox="0 0 260 140">
            {/* Table surface */}
            <ellipse cx="130" cy="118" rx="120" ry="18" fill="#caa86a" opacity="0.9" />
            <ellipse cx="130" cy="116" rx="120" ry="16" fill="#d9bb82" />

            {/* Lemons */}
            <circle cx="60" cy="106" r="13" fill="#f0c43a" />
            <circle cx="78" cy="112" r="11" fill="#f3cd4f" />
            <ellipse cx="58" cy="101" rx="3" ry="2" fill="#7a9c3e" />

            {/* Glass 1 */}
            <path d="M150,60 L156,108 L172,108 L178,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M152,75 L156,108 L172,108 L176,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="164" y1="108" x2="164" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="164" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Glass 2 */}
            <path d="M190,60 L196,108 L212,108 L218,60 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <path d="M192,75 L196,108 L212,108 L216,75 Z" fill="#f0d24a" opacity="0.85" />
            <line x1="204" y1="108" x2="204" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            <ellipse cx="204" cy="121" rx="10" ry="2.5" fill="rgba(255,255,255,0.3)" />

            {/* Mint sprig */}
            <ellipse cx="168" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(-20 168 64)" />
            <ellipse cx="208" cy="64" rx="3" ry="6" fill="#5a8a3e" transform="rotate(15 208 64)" />
          </svg>
        </div>

        {/* Warm overlay tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent 40%)" }}
        />

        {/* Caption */}
        <div className="absolute left-6 md:left-14 bottom-10 md:bottom-14 z-10 max-w-md">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#E8D38A]/80 mb-3">Het gouden uur</p>
          <p
            className="font-serif italic text-2xl md:text-3xl text-white/95 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Twee glazen.<br />Een terras.<br />Een avond die niet eindigt.
          </p>
        </div>
      </section>

      <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function ProductsPage({ cart }) {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">De Producten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Twee manieren om Vivace te drinken
        </h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/5">
        {Object.values(PRODUCTS).map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <div className="bg-[#102338] p-10 md:p-12 flex flex-col items-center text-center gap-6 h-full">
              {p.id === "limoncello" ? (
                <img
                  src="/images/vivace-bottle-hero.jpg"
                  alt="Vivace Limoncello fles"
                  className="w-full max-w-[180px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              ) : (
                <img
                  src="/images/vivace-can-hero.jpg"
                  alt="Vivace Limoncello Spritz blikje"
                  className="w-full max-w-[150px] h-auto rounded-sm shadow-xl shadow-black/30"
                />
              )}

              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-2">{p.type}</p>
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-xs">{p.description}</p>
                <p className="text-[#D4AF37]/60 text-xs italic mb-4">{p.backLabel}</p>
                <p className="text-white/20 text-[11px] tracking-wide mb-1">
                  {p.abv} · {p.size}
                </p>
                <p className="text-white/15 text-[10px] tracking-wide mb-6">{p.kcal}</p>
              </div>

              <div className="w-full">
                {p.comingSoon ? (
                  <button
                    disabled
                    className="border border-white/15 text-white/35 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Binnenkort
                  </button>
                ) : p.onlineSellable ? (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-medium">€{p.price.toFixed(2)}</span>
                    <button
                      onClick={() => cart.add(p.id)}
                      className="bg-[#D4AF37] text-black px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#E0C158] transition-colors"
                    >
                      Voeg toe
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/verkooppunten"
                    className="border border-[#D4AF37]/40 text-[#D4AF37] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-[#D4AF37] hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    Vind in winkel <ChevronRight size={14} />
                  </Link>
                )}
              </div>
              {p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Vivace Spritz is in ontwikkeling. Binnenkort beschikbaar.
                </p>
              )}
              {!p.onlineSellable && !p.comingSoon && (
                <p className="text-white/25 text-[10px] max-w-xs">
                  Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een
                  erkende slijterij. Vivace Limoncello is daarom te koop bij onze partners.
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StoresPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Verkooppunten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vind Vivace bij jou in de buurt
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Vivace Limoncello is te koop bij supermarkten en restaurants. Vivace Spritz in blik is
          in ontwikkeling en volgt later.
        </p>
      </Reveal>

      <div className="space-y-10">
        {STOCKISTS.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <div className="border border-[#234060] overflow-hidden">
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <MapPin className="text-[#D4AF37] flex-shrink-0" size={22} />
                  <div>
                    <p className="text-white/90 font-medium">{s.name}</p>
                    <p className="text-white/40 text-sm">
                      {s.type} · {s.address}, {s.postcode} {s.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {s.products.map((pid) => (
                    <span key={pid} className="text-[10px] uppercase tracking-wider text-[#C9A04E] border border-[#C9A04E]/30 px-3 py-1">
                      {PRODUCTS[pid].name}
                    </span>
                  ))}
                  <a
                    href={mapsLinkUrl(s)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] uppercase tracking-wider text-white/50 border border-white/20 px-3 py-1.5 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                  >
                    Open in Maps <ChevronRight size={12} />
                  </a>
                </div>
              </div>
              <iframe
                title={`Kaart ${s.name}`}
                src={mapsEmbedUrl(s)}
                className="w-full h-64 border-t border-[#234060]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={STOCKISTS.length * 100}>
        <p className="text-white/25 text-xs mt-10 italic">
          Sta je hier nog niet bij en wil je Vivace verkopen? Neem contact met ons op via de
          contactpagina.
        </p>
      </Reveal>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons Verhaal</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vivace bestaat om iets terug te geven.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6 text-white/55 leading-relaxed text-[15px] mb-16">
          <p>
            Voor elke fles die we verkopen, gaat <strong className="text-white/85">€2 rechtstreeks
            naar geselecteerde impactprojecten.</strong> Geen bijzaak, geen marketingtruc die later is
            bedacht: het was vanaf het begin de reden om Vivace te bouwen.
          </p>
          <p>
            Het idee is ontstaan tijdens een reis naar Rome, waar het Colosseum en de kennismaking
            met authentieke Italiaanse limoncello samenkwamen. Maar winst alleen voelde nooit als
            een goede reden om een merk te starten. Dus werd de vraag simpel:{" "}
            <strong className="text-white/85">
              als dit geld kan opleveren, waarom zou dat geld dan niet net zo goed ergens anders
              voor werken?
            </strong>
          </p>
          <p>
            Zo werd Vivace een premium limoncello met een Italiaans recept en een Nederlands hart,
            gebouwd rond één vast principe: €2 per fles, transparant herleidbaar, naar mensen voor
            wie het leven zwaarder is dan het zou moeten zijn.
          </p>
          <p className="text-[#D4AF37]/80 font-medium">
            Dat is Vivace. Niet voor ons. Voor jou, en voor hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="bg-[#102338] border border-[#D4AF37]/10 p-10 mb-16 text-center">
          <p className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Voor het leven, van jou en van hen.
          </p>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="grid grid-cols-2 gap-6 text-center border-t border-[#234060] pt-12 mb-20 max-w-md mx-auto">
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€2</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Per fles naar impact</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>2</p>
            <p className="text-[10px] uppercase tracking-wider text-white/35 mt-2">Producten op de roadmap</p>
          </div>
        </div>
      </Reveal>

      {/* Impact model */}
      <Reveal delay={400}>
        <div className="border-t border-[#234060] pt-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Ons impactmodel</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            €2 per fles, naar geselecteerde impactprojecten
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <p className="text-white/55 leading-relaxed text-[15px]">
              Voor elke fles Vivace die verkocht wordt, doneren we €2 aan een selectie van
              impactprojecten. Geen vage belofte, geen ingewikkelde constructies: een vast bedrag,
              per fles, transparant te herleiden. Dat maakt het model net zo schaalbaar als het merk
              zelf — voor de consument thuis, én voor onze partners in retail en horeca.
            </p>
            <div className="bg-[#102338] border border-[#234060] p-8">
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€2,00</p>
              <p className="text-white/35 text-xs uppercase tracking-wider mb-6">Vast donatiebedrag per fles</p>
              <p className="text-[#D4AF37] text-3xl font-serif mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>100%</p>
              <p className="text-white/35 text-xs uppercase tracking-wider">Transparant herleidbaar naar verkochte flessen</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  // Replace YOUR_FORM_ID below with the ID Formspree gives you after creating
  // a form at formspree.io (free account, takes ~2 minutes, no credit card).
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-2xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Contact</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Laten we praten
        </h1>
        <p className="text-white/45 mb-12">
          Vragen over Vivace, interesse als verkooppunt, of gewoon nieuwsgierig? Stuur een bericht.
        </p>
      </Reveal>

      <Reveal delay={100}>
        {status === "sent" ? (
          <div className="border border-[#C9A04E]/30 p-8 text-center">
            <p className="text-[#C9A04E] font-medium mb-2">Bedankt voor je bericht!</p>
            <p className="text-white/40 text-sm">We nemen zo snel mogelijk contact met je op.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="naam"
              placeholder="Naam"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mailadres"
              required
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <textarea
              name="bericht"
              placeholder="Je bericht"
              required
              rows={5}
              className="w-full bg-[#102338] border border-[#234060] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#D4AF37] text-black px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[#E0C158] transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Versturen..." : "Verstuur bericht"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs">
                Er ging iets mis. Probeer het opnieuw of mail direct naar drinkvivace@gmail.com.
              </p>
            )}
          </form>
        )}
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-16 pt-10 border-t border-[#234060] text-white/35 text-sm space-y-1">
          <p>info@drinkvivace.nl</p>
          <p>drinkvivace@gmail.com <span className="text-white/20 text-xs">(tijdelijk, werkt al)</span></p>
          <p>Nederland</p>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- FAQ Page ----------
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#234060]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-serif text-white/90 text-base md:text-lg leading-snug pr-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {q}
        </span>
        <span className={`text-[#D4AF37] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronRight size={16} className="rotate-90" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 pr-8 text-white/45 text-sm md:text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

const FAQ_SECTIONS = [
  {
    title: "Het product",
    items: [
      {
        q: "Wat is Vivace Limoncello precies?",
        a: "Vivace is een limoncello van 30% ALC/VOL, gemaakt volgens een authentiek Italiaans recept. Geproduceerd in Nederland bij een ambachtelijke distilleerderij, met smaken die recht doen aan de Italiaanse traditie.",
      },
      {
        q: "Is Vivace in Italië gemaakt?",
        a: "Het recept is Italiaans, maar Vivace wordt geproduceerd in Nederland. Daarom staat op het etiket 'Prelibatezza Italiana' (Italiaanse lekkernij), in plaats van een claim dat het product zelf uit Italië komt.",
      },
      {
        q: "Welke ingrediënten zitten er in?",
        a: "Vivace bevat citroenschil, alcohol, water en suiker. Voor exacte ingrediënten en allergenen verwijzen we naar het etiket op de fles.",
      },
      {
        q: "Hoe drink je Vivace het beste?",
        a: "Traditioneel goed gekoeld als digestief, direct uit de vriezer. Vivace is ook heerlijk als basis voor een spritz: limoncello met prosecco en bruiswater over ijs.",
      },
      {
        q: "Hoeveel calorieën heeft Vivace?",
        a: "218 kcal per 100ml, wat neerkomt op ongeveer 75 kcal per shot van 35ml.",
      },
    ],
  },
  {
    title: "Bestellen & verkooppunten",
    items: [
      {
        q: "Waar kan ik Vivace kopen?",
        a: "Bekijk onze Verkooppunten-pagina voor een actueel overzicht van winkels en restaurants waar Vivace verkrijgbaar is.",
      },
      {
        q: "Kan ik Vivace direct via de website bestellen?",
        a: "Sterke drank (30% VOL) mag in Nederland alleen online verkocht worden door een erkende slijterij. Daarom verkopen we via onze fysieke verkooppunten in plaats van rechtstreeks via de site.",
      },
      {
        q: "Ben je een winkel of horecazaak en wil je Vivace verkopen?",
        a: "Mooi! Neem contact met ons op via de contactpagina met wat informatie over je zaak, dan nemen we snel contact op.",
      },
      {
        q: "Is er een minimumleeftijd om Vivace te kopen?",
        a: "Ja. Vivace is alleen bestemd voor personen van 18 jaar en ouder, zoals wettelijk vereist voor alcoholhoudende dranken in Nederland.",
      },
    ],
  },
  {
    title: "Vivace & impact",
    items: [
      {
        q: "Hoe werkt het donatiemodel van Vivace?",
        a: "Voor elke verkochte fles Vivace doneren we €2 aan geselecteerde impactprojecten. Een vast bedrag, per fles, onafhankelijk van marge of omzet.",
      },
      {
        q: "Waarom een vast bedrag per fles, in plaats van een percentage van de winst?",
        a: "Een vast bedrag is transparant en voorspelbaar — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt het model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, zonder dat dit afhangt van hoe een kwartaal er financieel uitziet.",
      },
      {
        q: "Welke projecten steunt Vivace?",
        a: "We doneren aan een selectie van impactprojecten. Voor de meest actuele informatie hierover kun je contact met ons opnemen.",
      },
      {
        q: "Hoe weet ik dat de donatie echt gebeurt?",
        a: "Transparantie vinden we belangrijk. Heb je vragen over hoe we dit bijhouden, neem dan gerust contact met ons op.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Vragen</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Veelgestelde vragen
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Alles wat je wilt weten over Vivace — van het product tot ons donatiemodel.
        </p>
      </Reveal>

      {FAQ_SECTIONS.map((section, i) => (
        <Reveal key={section.title} delay={i * 100}>
          <div className={i > 0 ? "mt-12" : ""}>
            <h2 className="font-serif text-2xl text-[#D4AF37] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {section.title}
            </h2>
            <div className="h-px w-full bg-[#1c3450] mb-2" />
            <div>
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal delay={400}>
        <div className="mt-16 text-center border-t border-[#234060] pt-10">
          <p className="text-white/40 text-sm mb-3">Staat je vraag er niet bij?</p>
          <Link
            to="/contact"
            className="text-[#D4AF37] font-serif italic text-lg border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Neem contact met ons op
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

// ---------- Recipe Page ----------
// ---------- Blog ----------
// Unified blog covering three post types: recept (recipe), nieuws (news),
// verkooppunt (new stockist announcement). Recipe posts carry the full
// ingredients/steps/serving-adjuster data; other types are simpler articles.
const BLOG_CATEGORIES = [
  { id: "alle", label: "Alle" },
  { id: "recept", label: "Recept" },
  { id: "nieuws", label: "Nieuws" },
  { id: "verkooppunt", label: "Verkooppunten" },
];

const BLOG_POSTS = [
  {
    id: "spritz-klassiek",
    type: "recept",
    title: "Vivace Limoncello Spritz — het klassieke recept",
    date: "2026-06-01",
    image: "/images/vivace-instagram-recepten-spritz.png",
    excerpt: "De originele: fris, lichtzoet en gevuld met bubbels. Het recept waarmee alles begon.",
    ingredients: [
      { amount: 5, unit: "cl", name: "Vivace Limoncello" },
      { amount: 10, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 3, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje munt (optioneel)" },
    ],
    steps: [
      "Vul een groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam, om de bubbels te behouden.",
      "Maak af met een scheutje bruiswater.",
      "Garneer met een schijfje citroen en eventueel een takje munt. Direct serveren.",
    ],
  },
  {
    id: "spritz-light",
    type: "recept",
    title: "Vivace Spritz Light — lichter en langer",
    date: "2026-06-01",
    excerpt: "Iets lichter en langer, met meer bruiswater. Perfect voor een lange, warme middag.",
    ingredients: [
      { amount: 4, unit: "cl", name: "Vivace Limoncello" },
      { amount: 8, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: 8, unit: "cl", name: "bruiswater" },
      { amount: null, unit: "", name: "schijfje citroen" },
    ],
    steps: [
      "Vul een groot longdrinkglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe.",
      "Vul aan met ruim bruiswater voor een lichtere, langere drank.",
      "Garneer met een schijfje citroen.",
    ],
  },
  {
    id: "spritz-intenso",
    type: "recept",
    title: "Vivace Spritz Intenso — voor de echte liefhebber",
    date: "2026-06-01",
    excerpt: "Voor wie de limoncello echt wil proeven: een stevigere pour met minder verdunning.",
    ingredients: [
      { amount: 7, unit: "cl", name: "Vivace Limoncello" },
      { amount: 7, unit: "cl", name: "prosecco, goed gekoeld" },
      { amount: null, unit: "", name: "schijfje citroen" },
      { amount: null, unit: "", name: "takje rozemarijn (optioneel)" },
    ],
    steps: [
      "Vul een tumbler of groot wijnglas met ijsklontjes.",
      "Schenk de Vivace Limoncello erover.",
      "Voeg de prosecco toe, langzaam.",
      "Garneer met een schijfje citroen en eventueel een takje rozemarijn.",
    ],
  },
  {
    id: "instagram-launch",
    type: "nieuws",
    title: "Vivace is live op Instagram",
    date: "2026-06-29",
    image: "/images/vivace-instagram-launch.png",
    excerpt: "Vivace is nu ook te volgen op Instagram. Volg @drinkvivace voor nieuwe recepten, verkooppunten en updates over ons impactmodel.",
    body: [
      "Vivace is nu ook te volgen op Instagram via @drinkvivace. Daar delen we als eerste nieuwe Spritz-recepten, aankondigingen van nieuwe verkooppunten, en updates over ons impactmodel.",
      "€2 van elke verkochte fles gaat naar geselecteerde impactprojecten — premium kwaliteit met een heldere belofte, bij elke borrel.",
      "Volg ons om op de hoogte te blijven, en laat gerust weten met wie jij je eerste glas Vivace zou delen.",
    ],
  },
  {
    id: "instagram-label-onthulling",
    type: "nieuws",
    title: "Het Vivace-etiket, onthuld",
    date: "2026-07-03",
    image: "/images/vivace-instagram-label-reveal.png",
    excerpt: "Simpel, met opzet. Geen opgevulde tekst over ons verhaal, wel een QR-code naar de rest. Zo ziet het etiket eruit dat straks op elke fles staat.",
    body: [
      "Deze week deelden we op Instagram het definitieve ontwerp van het Vivace-etiket.",
      "Bewust simpel: geen lange tekst over ons verhaal of ons impactmodel op de fles zelf. In plaats daarvan een kleine QR-code die rechtstreeks naar drinkvivace.nl leidt, waar het hele verhaal wel te lezen is.",
      "Het resultaat is een etiket dat op de plank meteen opvalt, zonder dat het overvol aanvoelt. Binnenkort te zien op echte flessen bij onze verkooppunten.",
    ],
  },
  {
    id: "voor-het-leven-van-jou-en-van-hen",
    type: "nieuws",
    title: "Voor het leven, van jou en van hen",
    date: "2026-07-11",
    image: "/images/vivace-instagram-giveback.png",
    excerpt: "Vivace is meer dan een likeur. €2 van elke fles gaat naar impactprojecten, geen bijzaak, maar de reden dat we bestaan.",
    body: [
      "Vivace is meer dan een likeur. Voor elke fles die we verkopen, geven we €2 terug aan mensen voor wie het leven zwaarder is dan het zou moeten zijn.",
      "Vivace betekent levendig, vol leven. Dat is wat we vieren: de avonden die te lang duren, de tafels die te vol staan, het gevoel dat er even niets anders hoeft te bestaan dan dit moment. Geïnspireerd door Rome, gemaakt in Nederland, gebouwd rond één simpel idee: het goede leven is pas compleet als je het deelt.",
      "Dus wanneer je een fles Vivace opent, doe je meer dan proosten. Je geeft iets door.",
      "Voor het leven, van jou en van hen.",
    ],
  },
  {
    id: "nieuw-impactmodel",
    type: "nieuws",
    title: "Vivace gaat over op een vast donatiebedrag: €2 per fles",
    date: "2026-06-20",
    excerpt: "We hebben ons impactmodel aangescherpt. In plaats van een percentage van de winst, doneren we nu een vast bedrag van €2 per verkochte fles — transparant en schaalbaar.",
    body: [
      "Vanaf nu doneert Vivace €2 voor elke verkochte fles aan geselecteerde impactprojecten. Dit vervangt ons eerdere model, waarbij we een deel van de winst doneerden.",
      "Waarom de verandering? Een vast bedrag per fles is voorspelbaar en transparant — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt ons model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, onafhankelijk van marges of hoe een kwartaal er financieel uitziet.",
      "Op onze website vind je een live teller die het aantal verkochte flessen en het totaal gedoneerde bedrag laat zien. Deze teller wordt de komende tijd gekoppeld aan onze echte verkoopdata.",
    ],
  },
  {
    id: "nieuwe-verkooppunt",
    type: "verkooppunt",
    title: "Vivace nu ook te koop bij een nieuw verkooppunt",
    date: "2026-06-15",
    excerpt: "We breiden uit! Vivace Limoncello is sinds deze week te koop bij een nieuw verkooppunt.",
    body: [
      "We zijn verheugd om aan te kondigen dat Vivace Limoncello vanaf deze week verkrijgbaar is bij een nieuw verkooppunt. Bekijk de volledige lijst en adressen op onze Verkooppunten-pagina.",
      "Ben je zelf een winkel, slijterij of horecazaak en wil je Vivace in je assortiment? Neem contact met ons op via de contactpagina — we denken graag mee.",
    ],
  },
  {
    id: "het-moment",
    type: "nieuws",
    title: "Voor het aperitief. Of gewoon omdat het kan.",
    date: "2026-07-18",
    image: "/images/vivace-instagram-het-moment.png",
    excerpt: "Je hoeft niet te wachten op een speciale gelegenheid. Vivace maakt gewone momenten een beetje beter.",
    body: [
      "Je hoeft niet te wachten op een speciale gelegenheid. Vivace is er voor het aperitief voor het eten, voor een rustige avond op het balkon, of voor geen enkele reden behalve dat het weekend is.",
      "Gekoeld uit de vriezer, puur in een klein glas, is vaak al genoeg.",
      "We zien Vivace niet als iets voor speciale momenten. We zien het als iets dat gewone momenten een beetje beter maakt. Een druppel Italiaanse zomer, ook op een doordeweekse dinsdag.",
    ],
  },
  {
    id: "waarom-eenmaal-per-jaar-doneren",
    type: "nieuws",
    title: "Waarom we €2 per fles sparen, niet meteen weggeven",
    date: "2026-07-18",
    image: "/images/vivace-instagram-giveback-jaarlijks.png",
    excerpt: "Elke fles legt €2 opzij. Aan het einde van het jaar doneren we het volledige bedrag in één keer, niet per verkoop.",
    body: [
      "Bij elke fles Vivace die verkocht wordt, leggen we €2 opzij voor impactprojecten. Niet als losse donatie bij elke verkoop, maar als onderdeel van een pot die het hele jaar door groeit.",
      "Aan het einde van het jaar tellen we alles op en maken we het volledige bedrag in één keer over aan de projecten die we dat jaar hebben geselecteerd.",
      "We kozen bewust voor deze aanpak, om twee redenen. Ten eerste schaal: honderd losse donaties van een paar euro verdwijnen, terwijl één substantieel bedrag een project echt vooruit kan helpen. Ten tweede zorgvuldigheid: door te wachten tot het einde van het jaar hebben we tijd om de juiste projecten te vinden en te beoordelen, in plaats van overhaaste keuzes te maken bij elke losse verkoop.",
      "Aan het einde van het jaar laten we precies zien waar het geld naartoe is gegaan: welk project, hoeveel, en waarom.",
    ],
  },
];

function formatRecipeAmount(amount, servings) {
  if (amount === null) return null;
  const scaled = Math.round(amount * servings * 10) / 10;
  return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
}

function formatBlogDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function BlogCard({ post, onOpen }) {
  return (
    <button
      onClick={() => onOpen(post.id)}
      className="text-left border border-[#234060] hover:border-[#D4AF37]/40 transition-colors flex flex-col h-full overflow-hidden"
    >
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
          {BLOG_CATEGORIES.find((c) => c.id === post.type)?.label || post.type}
        </span>
        <h3 className="font-serif text-xl text-white/90 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {post.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <span className="text-white/25 text-xs">{formatBlogDate(post.date)}</span>
      </div>
    </button>
  );
}

function RecipeBody({ post }) {
  const [servings, setServings] = useState(1);
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12">
      <div className="flex items-center justify-end mb-10">
        <div className="flex items-center gap-4">
          <span className="text-white/35 text-[10px] uppercase tracking-[0.15em]">Glazen</span>
          <div className="flex items-center gap-3 border border-[#234060]">
            <button
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Minder glazen"
            >
              <Minus size={14} />
            </button>
            <span className="font-serif text-[#D4AF37] text-base w-5 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {servings}
            </span>
            <button
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
              aria-label="Meer glazen"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Ingrediënten</p>
          <ul className="space-y-3">
            {post.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-white/80 text-sm border-b border-[#1c3450] pb-3">
                <span>{ing.name}</span>
                {ing.amount !== null && (
                  <span className="font-serif text-[#D4AF37] whitespace-nowrap" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {formatRecipeAmount(ing.amount, servings)} {ing.unit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A04E] mb-4">Bereiding</p>
          <ol className="space-y-4">
            {post.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-white/55 leading-relaxed">
                <span className="font-serif text-[#D4AF37] flex-shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-[#1c3450]">
        <p className="font-serif italic text-white/40 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Tip: bewaar je Vivace in de vriezer voor het koudste, meest verfrissende resultaat.
        </p>
        <p className="text-white/20 text-[11px] mt-4">Drink met aandacht, drink met mate. 18+.</p>
      </div>
      </div>
    </div>
  );
}

function ArticleBody({ post }) {
  return (
    <div className="bg-[#102338] border border-[#234060] overflow-hidden">
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-auto" />
      )}
      <div className="p-8 md:p-12 space-y-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-white/55 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

function BlogPage() {
  const [filter, setFilter] = useState("alle");
  const [openId, setOpenId] = useState(null);

  const filtered = filter === "alle" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.type === filter);
  const openPost = openId ? BLOG_POSTS.find((p) => p.id === openId) : null;

  if (openPost) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
        <button
          onClick={() => setOpenId(null)}
          className="text-white/40 text-[11px] uppercase tracking-wider mb-10 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
        >
          ← Terug naar blog
        </button>
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A04E]">
            {BLOG_CATEGORIES.find((c) => c.id === openPost.type)?.label}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl mt-3 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {openPost.title}
          </h1>
          <p className="text-white/30 text-xs mb-10">{formatBlogDate(openPost.date)}</p>
        </Reveal>
        <Reveal delay={100}>
          {openPost.type === "recept" ? <RecipeBody post={openPost} /> : <ArticleBody post={openPost} />}
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-5xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Blog</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Recepten, nieuws & verkooppunten
        </h1>
        <p className="text-white/45 max-w-lg mb-12">
          Alles op één plek: nieuwe manieren om Vivace te serveren, updates over ons impactmodel, en
          waar je Vivace als eerste kunt vinden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex items-center gap-2 mb-12 flex-wrap">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.14em] border transition-colors ${
                filter === c.id
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "text-white/50 border-[#234060] hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((post, i) => (
          <Reveal key={post.id} delay={150 + i * 80}>
            <BlogCard post={post} onOpen={setOpenId} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-[#D4AF37] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {title}
      </h2>
      <div className="text-white/55 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Privacybeleid
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Dit privacybeleid legt uit welke gegevens Vivace verzamelt,
          waarom, en welke rechten je hebt.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Vivace wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven bij de
            Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD Poortugaal,
            Nederland. Voor vragen over dit privacybeleid kun je contact opnemen via
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="2. Welke gegevens we verzamelen">
          <p>Wij verzamelen alleen de gegevens die je zelf actief met ons deelt, namelijk via het contactformulier op onze website:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>De inhoud van je bericht</li>
          </ul>
          <p>
            Wij gebruiken geen trackingcookies, geen advertentiepixels en verzamelen geen
            gegevens voor profilering of marketingdoeleinden zonder jouw expliciete toestemming.
          </p>
        </LegalSection>

        <LegalSection title="3. Waarom we deze gegevens verzamelen">
          <p>
            We gebruiken de gegevens uit het contactformulier uitsluitend om je vraag, opmerking of
            verzoek (bijvoorbeeld als potentiële verkooppartner) te kunnen beantwoorden. We gebruiken
            je gegevens niet voor geautomatiseerde besluitvorming en delen ze niet met derden voor
            commerciële doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="4. Hoe lang we gegevens bewaren">
          <p>
            Berichten via het contactformulier bewaren we niet langer dan noodzakelijk om je vraag
            te kunnen afhandelen, en in elk geval niet langer dan 24 maanden
            na het laatste contact, tenzij we wettelijk verplicht zijn gegevens langer te bewaren.
          </p>
        </LegalSection>

        <LegalSection title="5. Derde partijen">
          <p>
            Ons contactformulier wordt verwerkt via Formspree, een derde partij die berichten van
            het formulier naar ons doorstuurt. Voor meer informatie over hoe Formspree gegevens
            verwerkt, verwijzen we naar hun eigen privacybeleid.
          </p>
          <p>
            Onze website wordt gehost via Vercel. Standaard servertechnische gegevens (zoals
            IP-adres en tijdstip van bezoek) kunnen door onze hostingpartij worden gelogd voor
            beveiligings- en technische doeleinden.
          </p>
        </LegalSection>

        <LegalSection title="6. Jouw rechten">
          <p>Onder de AVG (GDPR) heb je het recht om:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Inzage te krijgen in de gegevens die we van je hebben</li>
            <li>Je gegevens te laten corrigeren of verwijderen</li>
            <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p>
            Wil je gebruikmaken van een van deze rechten? Stuur een e-mail naar
            info@drinkvivace.nl.
          </p>
        </LegalSection>

        <LegalSection title="7. Wijzigingen in dit beleid">
          <p>
            We kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest recente versie is
            altijd te vinden op deze pagina, met de datum van de laatste wijziging hierboven.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-3xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Juridisch</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Algemene voorwaarden
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Laatst bijgewerkt: 28 juni 2026. Deze voorwaarden zijn van toepassing op het gebruik van deze
          website en op de informatie die hierop wordt aangeboden.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <LegalSection title="1. Wie zijn wij">
          <p>
            Deze website wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven
            bij de Kamer van Koophandel onder nummer 86618806, gevestigd op Loevestein 18, 3171JD
            Poortugaal, Nederland. BTW-identificatienummer: NL004279162B10.
          </p>
        </LegalSection>

        <LegalSection title="2. Leeftijdsgrens">
          <p>
            Vivace Limoncello is een alcoholhoudend product (30% ALC/VOL) en is uitsluitend bestemd
            voor personen van 18 jaar en ouder. Door deze website te gebruiken bevestig je dat je
            18 jaar of ouder bent. Het is verboden alcohol te verkopen aan, of te laten consumeren
            door, personen onder de 18 jaar, conform de Nederlandse Alcoholwet.
          </p>
        </LegalSection>

        <LegalSection title="3. Verkoop via derde partijen">
          <p>
            Vivace Limoncello wordt niet rechtstreeks via deze website verkocht. Sterke drank (30%
            ALC/VOL of hoger) mag in Nederland alleen online verkocht worden door een hiervoor
            erkende slijterij. Vivace is daarom uitsluitend verkrijgbaar via de fysieke
            verkooppunten die op deze website worden vermeld. Voor vragen over prijs,
            beschikbaarheid of voorraad bij een specifiek verkooppunt verwijzen we je naar dat
            verkooppunt zelf.
          </p>
        </LegalSection>

        <LegalSection title="4. Impact- en donatiemodel">
          <p>
            Vivace doneert €2 per verkochte fles aan geselecteerde impactprojecten. Dit bedrag is
            vast en wordt niet beïnvloed door de verkoopprijs die door individuele verkooppunten
            wordt gehanteerd. De op deze website weergegeven tellers (aantal verkochte flessen en
            totaal gedoneerd bedrag) zijn indicatief en worden periodiek bijgewerkt; zie ook onze
            Onze Impact-pagina voor meer toelichting.
          </p>
        </LegalSection>

        <LegalSection title="5. Intellectueel eigendom">
          <p>
            Alle content op deze website — waaronder teksten, het Vivace-logo, productfoto's,
            illustraties en de vormgeving van het etiket — is eigendom van VVM Trading of wordt
            gebruikt met toestemming van de rechthebbende. Niets van deze website mag worden
            gekopieerd, verspreid of commercieel gebruikt zonder voorafgaande schriftelijke
            toestemming.
          </p>
        </LegalSection>

        <LegalSection title="6. Aansprakelijkheid">
          <p>
            We doen ons best om de informatie op deze website actueel en correct te houden, maar
            kunnen niet garanderen dat alle informatie op elk moment volledig juist of up-to-date
            is. VVM Trading is niet aansprakelijk voor schade die voortvloeit uit het gebruik van
            deze website of uit het gebruik van het product, behalve in gevallen van opzet of grove
            schuld, of voor zover dwingend Nederlands recht anders bepaalt.
          </p>
        </LegalSection>

        <LegalSection title="7. Toepasselijk recht">
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen worden
            voorgelegd aan de bevoegde rechter in Nederland.
          </p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>
            Vragen over deze voorwaarden? Neem contact met ons op via info@drinkvivace.nl.
          </p>
        </LegalSection>
      </Reveal>
    </div>
  );
}

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/producten", label: "Producten" },
    { path: "/verkooppunten", label: "Verkooppunten" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/over-ons", label: "Over ons" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-[#1c3450] px-6 md:px-14 py-14">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 items-center gap-8 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <p className="font-serif text-xl font-bold tracking-[0.2em] text-[#D4AF37] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Vivace
          </p>
          <a
            href="https://instagram.com/drinkvivace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#D4AF37] transition-colors"
            aria-label="Vivace op Instagram"
          >
            <InstagramIcon size={18} />
          </a>
        </div>
        <p className="font-serif italic text-sm text-white/20 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "Doe anders, geniet anders."
        </p>
        <ul className="flex gap-7 justify-center md:justify-end text-[11px] uppercase tracking-wider text-white/25 flex-wrap">
          {footerLinks.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className="hover:text-[#D4AF37] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-[11px] text-white/15 mt-10 pt-8 border-t border-[#1c3450]">
        © 2026 Vivace · Drink verantwoord. 18+
      </p>
      <div className="flex gap-6 justify-center text-[10px] uppercase tracking-wider text-white/20 mt-4">
        <Link to="/privacybeleid" className="hover:text-[#D4AF37] transition-colors">
          Privacybeleid
        </Link>
        <Link to="/algemene-voorwaarden" className="hover:text-[#D4AF37] transition-colors">
          Algemene voorwaarden
        </Link>
      </div>
    </footer>
  );
}

// ---------- App ----------
// Scrolls to top whenever the route changes, replacing the old
// useEffect([page]) behavior now that navigation uses real URLs.
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function AppShell() {
  const [ageConfirmed, setAgeConfirmed] = useState(null); // null | true | false
  const [showWelcome, setShowWelcome] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const handleAgeConfirm = (confirmed) => {
    setAgeConfirmed(confirmed);
    if (confirmed) setShowWelcome(true);
  };

  if (ageConfirmed === null) return <AgeGate onConfirm={handleAgeConfirm} />;
  if (ageConfirmed === false) return <UnderageBlock />;

  return (
    <div className="bg-[#0a1628] text-white min-h-screen font-sans" style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "#0a1628" }}>
      <ScrollToTop />
      {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
      <Nav cart={cart} setCartOpen={setCartOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producten" element={<ProductsPage cart={cart} />} />
        <Route path="/verkooppunten" element={<StoresPage />} />
        <Route path="/over-ons" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacybeleid" element={<PrivacyPage />} />
        <Route path="/algemene-voorwaarden" element={<TermsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

// ---------- App ----------
export default function VivaceApp() {
  return (
    <BrowserRouter>
      <AppShell />
      <Analytics />
    </BrowserRouter>
  );
}
