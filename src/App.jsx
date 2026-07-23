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

// PLACEHOLDER DATA — replace name, address, city, postcode, lat, and lng with
// your real stockists' details. Once you have them, this is the only place
// you need to edit; both the list below and the combined map build themselves
// from this array automatically.
//
// To find lat/lng for a real address: search the address on Google Maps,
// right-click the exact pin location, and tap the coordinates that appear
// at the top of the menu (they copy straight to your clipboard) — then
// paste the two numbers in as lat and lng below.
const STOCKISTS = [
  {
    name: "[Naam supermarkt]",
    type: "Supermarkt",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    lat: null,
    lng: null,
    products: ["limoncello"],
  },
  {
    name: "[Naam slijterij]",
    type: "Slijterij",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    lat: null,
    lng: null,
    products: ["limoncello"],
  },
  {
    name: "[Naam restaurant]",
    type: "Restaurant",
    address: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    lat: null,
    lng: null,
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

// Combined overview map showing every stockist at once. Uses Leaflet with
// OpenStreetMap tiles — no Google Maps API key needed, no cost, no key to
// manage. Reads lat/lng straight from STOCKISTS; entries without coordinates
// yet are simply skipped until they're filled in.
function StoresMap({ stockists }) {
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const markersRef = React.useRef([]);

  useEffect(() => {
    if (!window.L || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = window.L.map(mapRef.current, { scrollWheelZoom: false }).setView([52.15, 5.3], 7);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(mapInstance.current);
    }

    markersRef.current.forEach((m) => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    const goldIcon = window.L.divIcon({
      className: "",
      html: '<div style="width:16px;height:16px;border-radius:50%;background:#D4AF37;border:2px solid #0C1526;box-shadow:0 0 0 2px rgba(212,175,55,0.35);"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    const valid = stockists.filter((s) => typeof s.lat === "number" && typeof s.lng === "number");

    valid.forEach((s) => {
      const marker = window.L.marker([s.lat, s.lng], { icon: goldIcon })
        .addTo(mapInstance.current)
        .bindPopup(`<strong>${s.name}</strong><br/>${s.type}<br/>${s.address}, ${s.postcode} ${s.city}`);
      markersRef.current.push(marker);
    });

    if (valid.length > 0) {
      const bounds = window.L.latLngBounds(valid.map((s) => [s.lat, s.lng]));
      mapInstance.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [stockists]);

  const hasAnyCoords = stockists.some((s) => typeof s.lat === "number" && typeof s.lng === "number");

  return (
    <div>
      <div ref={mapRef} className="w-full h-96 border border-[#234060]" style={{ background: "#102338" }} />
      {!hasAnyCoords && (
        <p className="text-white/25 text-xs mt-3 italic">
          Kaart vult zich automatisch zodra er lat/lng-coördinaten zijn ingevuld bij je
          verkooppunten (zie de STOCKISTS-lijst in de code).
        </p>
      )}
    </div>
  );
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

// ---------- SEO ----------
// Lightweight per-route SEO helper. No react-helmet dependency: directly
// updates document.title and the meta description tag on mount / when the
// route's SEO data changes. Falls back to a sensible default description
// tag if one isn't already present in index.html.
function useSEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
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
    { path: "/onze-impact", label: "Impact" },
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
  useSEO({
    title: "Vivace Limoncello — Doe anders, geniet anders",
    description:
      "Vivace is premium Italiaanse limoncello, geproduceerd in Nederland. Voor elke fles die wordt verkocht, gaat €1 naar geselecteerde impactprojecten.",
  });

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
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-8">
            Vivace is een premium limoncello, gemaakt met een Italiaans recept en een Nederlands hart.
            <strong className="text-white/85 font-medium"> €1 van elke verkochte fles gaat naar geselecteerde impactprojecten.</strong>
          </p>
          <Link
            to="/onze-impact"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.14em] border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors pb-1 mb-8"
          >
            Ontdek ons impactmodel <ChevronRight size={14} />
          </Link>
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

      {/* The number — short teaser only; full impact story lives on /onze-impact */}
      <div className="bg-[#D4AF37] text-center py-24 px-6">
        <Reveal>
          <span className="font-serif font-bold text-black block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(100px, 18vw, 200px)", lineHeight: 0.85 }}>
            €1
          </span>
          <p className="text-black/50 text-[13px] font-semibold tracking-[0.3em] uppercase mt-6">
            Per verkochte fles, naar geselecteerde impactprojecten
          </p>
          <Link
            to="/onze-impact"
            className="inline-flex items-center gap-1.5 text-black text-[11px] font-bold uppercase tracking-[0.14em] border-b-2 border-black/40 hover:border-black transition-colors pb-1 mt-6"
          >
            Lees over ons impactmodel <ChevronRight size={14} />
          </Link>
        </Reveal>
      </div>

      {/* Quick links to stockists */}
      <section className="px-6 md:px-14 py-24 max-w-5xl mx-auto">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Nu te koop</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Te vinden bij supermarkten, slijterijen en restaurants
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

      {/* Golden Hour Scene — real photo of the mood instead of a hand-drawn
          illustration. Sits last on the homepage as an atmospheric closer. */}
      <section className="relative overflow-hidden" style={{ height: "640px" }}>
        <img
          src="/images/vivace-golden-hour.jpg"
          alt="Twee glazen Vivace spritz bij zonsondergang op een terras in Rome"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Warm overlay tint for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05) 45%, transparent 65%)" }}
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
  useSEO({
    title: "Producten — Vivace Limoncello",
    description:
      "Ontdek Vivace Limoncello (30% VOL, 500ml) en de aankomende Vivace Spritz in blik. Premium Italiaans recept, geproduceerd in Nederland.",
  });

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
  useSEO({
    title: "Verkooppunten — Vivace Limoncello",
    description:
      "Vind Vivace Limoncello bij supermarkten, slijterijen en restaurants bij jou in de buurt. Bekijk alle verkooppunten op de kaart.",
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Verkooppunten</p>
        <h1 className="font-serif text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Vind Vivace bij jou in de buurt
        </h1>
        <p className="text-white/45 max-w-lg mb-14">
          Vivace Limoncello is te koop bij supermarkten, slijterijen en restaurants. Vivace Spritz
          in blik is in ontwikkeling en volgt later.
        </p>
      </Reveal>

      <Reveal delay={50}>
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Alle verkooppunten op de kaart</p>
          <StoresMap stockists={STOCKISTS} />
        </div>
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
  useSEO({
    title: "Over ons — Vivace Limoncello",
    description:
      "Het verhaal achter Vivace: premium Italiaanse limoncello, ambachtelijk geproduceerd in Nederland, met een impactmodel dat vanaf het begin is meegebouwd.",
  });

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
            Het idee is ontstaan tijdens een reis naar Rome, waar het Colosseum en de kennismaking
            met authentieke Italiaanse limoncello samenkwamen. Maar winst alleen voelde nooit als
            een goede reden om een merk te starten.
          </p>
          <p>
            Zo werd Vivace een premium limoncello met een Italiaans recept en een Nederlands hart —
            gebouwd rond één vast principe: <strong className="text-white/85">€1 per verkochte fles gaat naar
            geselecteerde impactprojecten,</strong> transparant en herleidbaar.
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

      {/* The product itself: real ingredients, real distillery, now that both are settled */}
      <Reveal delay={250}>
        <div className="border-t border-[#234060] pt-16 mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">De limoncello zelf</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Drie ingrediënten. Geen omwegen.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4 text-white/55 leading-relaxed text-[15px]">
              <p>
                Vivace bestaat uit de schil van biologische Sorrento-citroenen van de Amalfikust,
                pure suiker en graanalcohol. Geen kunstmatige kleur- of smaakstoffen, geen omwegen
                — gewoon de citroenschil die het werk doet, zoals in het originele Italiaanse recept.
              </p>
              <p>
                Vivace wordt ambachtelijk geproduceerd door{" "}
                <strong className="text-white/85">Stokerij Klopman</strong> in Rotterdam: een
                distilleerderij die het hele proces verzorgt, van citroenschil tot afgevulde fles.
                Italiaans recept, Nederlands vakmanschap.
              </p>
            </div>
            <div className="bg-[#0f1f33] border border-[#234060] p-8 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#C9A04E] mb-1">Ingrediënten</p>
                <p className="text-white/70 text-sm">Schil van (biologische) Sorrento-citroenen, suiker, graanalcohol</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#C9A04E] mb-1">Geproduceerd door</p>
                <p className="text-white/70 text-sm">Stokerij Klopman, Rotterdam</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#C9A04E] mb-1">Land van oorsprong</p>
                <p className="text-white/70 text-sm">Geproduceerd in Nederland</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Impact model lives on its own page now — short teaser + link here */}
      <Reveal delay={300}>
        <div className="border-t border-[#234060] pt-16 text-center">
          <p className="font-serif text-4xl text-[#D4AF37] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>€1</p>
          <p className="text-[10px] uppercase tracking-wider text-white/35 mb-8">Per fles naar impact</p>
          <p className="text-white/55 leading-relaxed text-[15px] max-w-lg mx-auto mb-6">
            Waarom we voor een vast bedrag per fles kozen, hoe het donatiemodel werkt, en waar we
            nu in dat proces staan — dat staat allemaal op onze Impact-pagina.
          </p>
          <Link
            to="/onze-impact"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.14em] border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors pb-1"
          >
            Bekijk ons impactmodel <ChevronRight size={14} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

function ImpactPage() {
  useSEO({
    title: "Onze Impact — €1 per fles naar sociale impact | Vivace Limoncello",
    description:
      "Ontdek hoe Vivace premium limoncello combineert met sociale impact: €1 van elke verkochte fles gaat naar geselecteerde impactprojecten. Transparant duurzaam ondernemen, geen omwegen.",
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-14 max-w-4xl mx-auto">
      <Reveal>
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Onze Impact</p>
        <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          €1 per fles. Geen omwegen, geen kleine lettertjes.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6 text-white/55 leading-relaxed text-[15px] mb-16">
          <p>
            Voor elke fles Vivace die verkocht wordt, leggen we <strong className="text-white/85">€1
            opzij voor zorgvuldig geselecteerde impactprojecten.</strong> Geen percentage van de winst, geen
            constructie die verandert als een kwartaal tegenzit: een vast bedrag, per fles,
            ongeacht de verkoopprijs die een winkel of horecazaak hanteert.
          </p>
          <p>
            Dat vaste bedrag is een bewuste keuze. Het is voorspelbaar voor onszelf, transparant
            voor onze partners in retail en horeca, en schaalbaar met het merk: hoe meer flessen we
            verkopen, hoe meer impact we maken.
          </p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="bg-[#0a1628] border border-[#1c3450] py-16 px-6 mb-16 -mx-6 md:-mx-14">
          <ImpactCounter />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="border-t border-[#234060] pt-16 mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Waarom we jaarlijks doneren</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Eén keer per jaar, in plaats van per verkoop
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed text-[15px]">
            <p>
              Bij elke fles die verkocht wordt, leggen we €1 opzij in een pot die het hele jaar
              door groeit. Aan het einde van het jaar tellen we alles op en maken we het volledige
              bedrag in één keer over aan de projecten die we dat jaar hebben geselecteerd.
            </p>
            <p>
              Dat is een bewuste keuze, om twee redenen. Schaal: honderd losse donaties van een
              paar euro verdwijnen, terwijl één substantieel bedrag een project echt vooruit kan
              helpen. En zorgvuldigheid: door te wachten tot het einde van het jaar hebben we tijd
              om de juiste projecten te vinden en te beoordelen, in plaats van overhaaste keuzes te
              maken bij elke losse verkoop. Zo zorgen we voor een grotere, betekenisvollere impact
              dan wanneer we elk bedrag los zouden wegschenken.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={225}>
        <div className="border-t border-[#234060] pt-16 mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Impactprojecten</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Onze eerste projecten: binnenkort bekend
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed text-[15px] mb-8">
            <p>
              We hebben er bewust voor gekozen om nog geen specifieke projecten te noemen. Zodra we
              onze selectie zorgvuldig hebben afgerond, maken we hier — en op onze{" "}
              <Link to="/blog" className="text-[#D4AF37] border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors">
                blog
              </Link>{" "}
              — bekend welke projecten we steunen, en waarom.
            </p>
          </div>
          <div className="border border-dashed border-[#D4AF37]/30 p-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A04E] mb-3">Binnenkort</p>
            <p className="font-serif italic text-xl md:text-2xl text-[#D4AF37]/80" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Onze impactprojecten worden hier zichtbaar zodra ze zijn geselecteerd.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={250}>
        <div className="border-t border-[#234060] pt-16 mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Waar we nu staan</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Eerlijk over waar we in het proces zitten
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed text-[15px]">
            <p>
              Vivace is jong, en dat geldt ook voor ons impactmodel. We zijn nog niet zo ver dat we
              een specifiek project kunnen noemen of een eerste donatiebedrag kunnen laten zien —
              dat komt aan het einde van dit eerste volledige verkoopjaar. Wat we nu al vastleggen
              is hóe het werkt, zodat we onszelf daar later aan kunnen houden.
            </p>
            <p>
              Zodra de eerste donatie een feit is, delen we hier en via onze{" "}
              <Link to="/blog" className="text-[#D4AF37] border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors">
                blog
              </Link>{" "}
              precies welk project we steunen, hoeveel we hebben gedoneerd, en waarom.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={275}>
        <div className="border-t border-[#234060] pt-16 mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Waarom premium en impact samengaan</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Kwaliteit en betekenis hoeven geen tegenpolen te zijn
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed text-[15px]">
            <p>
              Vivace is er niet ondanks het premium karakter van het product, maar juist dankzij
              een merk dat op eigen kracht kan bestaan. Een zorgvuldig recept, ambachtelijke
              productie en een eerlijke prijs zijn wat Vivace laat groeien — en die groei is precies
              wat het mogelijk maakt om structureel iets terug te geven.
            </p>
            <p>
              We geloven dat genieten en teruggeven elkaar niet hoeven uit te sluiten. Een goed
              glas limoncello en een zinvolle bijdrage aan iemand anders' leven kunnen prima naast
              elkaar bestaan — en dat is precies wat Vivace wil laten zien: dat duurzaam
              ondernemen en een premium ervaring hand in hand kunnen gaan.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="border-t border-[#234060] pt-16 mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-4">Voor retailers en partners</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Een model waar je op kunt bouwen
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed text-[15px]">
            <p>
              Voor supermarkten, slijterijen, horecazaken en andere partners is voorspelbaarheid
              belangrijk. Daarom houden we het donatiemodel eenvoudig en consistent: een vast
              bedrag per fles, ongeacht de verkoopprijs die jij hanteert, en communicatie die
              nooit verder gaat dan wat we daadwerkelijk hebben gedaan.
            </p>
            <p>
              We claimen geen donaties die nog niet zijn gedaan, en noemen geen projecten die nog
              niet zijn geselecteerd. Wat we wél beloven: zodra er resultaten zijn, delen we ze
              openlijk — met jou, en met de consument die de fles bij jou koopt.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={325}>
        <div className="bg-[#102338] border border-[#D4AF37]/10 p-10 text-center">
          <p className="font-serif italic text-2xl md:text-3xl text-[#D4AF37] leading-snug mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Voor het leven, van jou en van hen.
          </p>
          <p className="text-white/40 text-sm mb-6">Vragen over ons impactmodel? We beantwoorden ze graag.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-semibold uppercase tracking-[0.14em] border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors pb-1"
          >
            Neem contact op <ChevronRight size={14} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

function ContactPage() {
  useSEO({
    title: "Contact — Vivace Limoncello",
    description:
      "Vragen over Vivace, interesse als verkooppunt, of gewoon nieuwsgierig? Neem contact op met VVM Trading, de exploitant van Vivace Limoncello.",
  });

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
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-3">Geleverd door</p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Vivace wordt geëxploiteerd door VVM Trading.
          </p>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9A04E] mb-3">Geproduceerd door</p>
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
        a: "Vivace is een limoncello van 30% ALC/VOL, gemaakt volgens een authentiek Italiaans recept. Vivace wordt ambachtelijk geproduceerd door Stokerij Klopman in Rotterdam, met smaken die recht doen aan de Italiaanse traditie.",
      },
      {
        q: "Is Vivace in Italië gemaakt?",
        a: "Het recept is Italiaans, maar Vivace wordt geproduceerd in Nederland, bij Stokerij Klopman in Rotterdam. Daarom staat op het etiket 'Prelibatezza Italiana' (Italiaanse lekkernij), in plaats van een claim dat het product zelf uit Italië komt.",
      },
      {
        q: "Welke ingrediënten zitten er in?",
        a: "Vivace bevat drie ingrediënten: de schil van biologische Sorrento-citroenen van de Amalfikust, pure suiker en graanalcohol. Geen kunstmatige kleur- of smaakstoffen. Voor de volledige, actuele ingrediëntenlijst en allergeneninformatie verwijzen we naar het etiket op de fles.",
      },
      {
        q: "Waar wordt Vivace geproduceerd?",
        a: "Bij Stokerij Klopman, Van Nelleweg 1, Kelder 3, 3044 BC Rotterdam. Een ambachtelijke distilleerderij die het hele productieproces verzorgt, van citroenschil tot afgevulde fles. Vivace zelf wordt geëxploiteerd door VVM Trading.",
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
        a: "Voor elke verkochte fles Vivace doneren we €1 aan geselecteerde impactprojecten. Een vast bedrag, per fles, onafhankelijk van marge of omzet. Lees meer op onze Onze Impact-pagina.",
      },
      {
        q: "Waarom een vast bedrag per fles, in plaats van een percentage van de winst?",
        a: "Een vast bedrag is transparant en voorspelbaar — voor onszelf, voor onze partners in retail en horeca, en voor jou als consument. Het maakt het model ook schaalbaar: hoe meer flessen we verkopen, hoe meer impact we maken, zonder dat dit afhangt van hoe een kwartaal er financieel uitziet.",
      },
      {
        q: "Welke projecten steunt Vivace?",
        a: "We zijn op dit moment bezig met het zorgvuldig selecteren van onze eerste impactprojecten. Zodra deze selectie is afgerond, delen we dit op onze Onze Impact-pagina en via onze blog.",
      },
      {
        q: "Is er al een donatie gedaan?",
        a: "Nog niet. We doneren eenmaal per jaar het volledige, opgespaarde bedrag in één keer, zodat de impact groter en betekenisvoller is. De eerste donatie volgt aan het einde van ons eerste volledige verkoopjaar.",
      },
    ],
  },
];

function FAQPage() {
  useSEO({
    title: "Veelgestelde vragen — Vivace Limoncello",
    description:
      "Antwoorden op veelgestelde vragen over Vivace Limoncello: het product, verkooppunten en ons impactmodel.",
  });

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
  useSEO({
    title: "Blog — Recepten, nieuws & verkooppunten | Vivace Limoncello",
    description:
      "Recepten voor Vivace Spritz, nieuws over ons impactmodel, en updates over nieuwe verkooppunten. Alles op één plek.",
  });

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
  useSEO({
    title: "Privacybeleid — Vivace Limoncello",
    description: "Lees hoe Vivace Limoncello, geëxploiteerd door VVM Trading, omgaat met jouw persoonsgegevens.",
  });

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
            Vivace Limoncello wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven bij de
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
  useSEO({
    title: "Algemene voorwaarden — Vivace Limoncello",
    description: "De algemene voorwaarden voor het gebruik van de Vivace Limoncello website, geëxploiteerd door VVM Trading.",
  });

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
            Vivace Limoncello wordt geëxploiteerd door VVM Trading (eenmanszaak), ingeschreven
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
            totaal gedoneerd bedrag) zijn indicatief en worden periodiek bijgewerkt; zie ook onze{" "}
            <Link to="/onze-impact" className="text-[#D4AF37] border-b border-[#D4AF37]/40 hover:border-[#D4AF37] transition-colors">
              Onze Impact-pagina
            </Link>{" "}
            voor meer toelichting.
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
    { path: "/onze-impact", label: "Impact" },
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
        <Route path="/onze-impact" element={<ImpactPage />} />
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
