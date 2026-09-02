import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import HERO_BG from "./assets/hero-bg.png";
import LOGO from "./assets/logoweb.png";
import galeria1 from "./assets/gallery/imagen1.jpg";
import galeria2 from "./assets/gallery/imagen2.jpg";
import galeria3 from "./assets/gallery/imagen3.jpg";

// Fotos de tus eventos: pon los archivos en src/assets/gallery/ y agrégalos aquí.
// Ejemplo (descomenta y ajusta los nombres de archivo a los tuyos):
// import galeria1 from "./assets/gallery/terraza-rio.jpg";
// import galeria2 from "./assets/gallery/santa-marta.jpg";

/**
 * De Caro DJ — Portfolio
 * Stack: React + Tailwind (utility classes only, no compiler needed)
 * Fonts: "Orbitron" (display, angular — acorde al logo) + "Inter" (body) via Google Fonts
 *
 * ASSETS: copia hero-bg.png y logo.png (incluidos junto a este archivo) a la carpeta
 * /public/assets/ de tu proyecto, o ajusta las rutas de abajo (HERO_BG, LOGO) a donde
 * los alojes tú.
 *
 * Cómo usar en un proyecto real:
 * 1. npm install framer-motion (opcional, si quieres animaciones más ricas)
 * 2. Copia este componente + los assets a tu proyecto.
 * 3. Reemplaza los datos de EVENTS, GALLERY y SOCIALS con los tuyos.
 */
const WHATSAPP_NUMBER = "573023029945";
const WHATSAPP_MESSAGE =
  "¡Hola De Caro! Vi tu página y quiero contratarte para un evento. ¿Me cuentas disponibilidad y tarifa?";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
 

const GENRES = [
  { name: "Champeta", group: "urbano" },
  { name: "Dancehall", group: "urbano" },
  { name: "Reggaetón", group: "urbano" },
  { name: "Afro house", group: "crossover" },
  { name: "Latin house", group: "crossover" },
  { name: "Tech house", group: "crossover" },
  { name: "Disco", group: "crossover" },
  { name: "Nu-disco", group: "crossover" },
];

// Reemplaza cada "url" con el link real de tu track/set en SoundCloud
// (el link que copias desde "Compartir" en SoundCloud, ej: https://soundcloud.com/tu-usuario/nombre-del-set)
const SOUNDCLOUD_TRACKS = [
  {
    title: "Set #1 — Champeta / Afro house",
    url: "https://soundcloud.com/tu-usuario/set-1",
  },
  {
    title: "Set #2 — Dancehall / Tech house",
    url: "https://soundcloud.com/tu-usuario/set-2",
  },
  {
    title: "Set #3 — Latin house / Nu-disco",
    url: "https://soundcloud.com/tu-usuario/set-3",
  },
];

// Ajusta este texto a tu gusto — es tu historia en primera persona
const BIO = {
  years: "1 año y medio",
  paragraphs: [
    "Empecé a mezclar hace año y medio y desde el primer set supe que esto era lo mío: la mezcla de la champeta y el dancehall de acá de la costa con sonidos que vienen de otros lados, como el afro house y el tech house.",
    "Mi propuesta es ese cruce — llevar el groove urbano de Barranquilla a un formato que también suena en un rooftop o en una fiesta electrónica, sin perder la esencia costeña.",
  ],
  favoriteGenres: ["Champeta", "Afro house", "Dancehall"],
};

// Agrega tus fotos: image es el import de arriba, caption es el texto que aparece al pasar el mouse
const GALLERY = [
  { id: 1, image: galeria1, caption: "Country Club — Barranquilla" },
  { id: 2, image: galeria2, caption: "La Otra Restaurante Bar - Barranquilla" },
  { id: 3, image: galeria3, caption: "La Unica Restaurante — Barranquilla" },
  // { id: 1, image: galeria1, caption: "Set en vivo — Terraza Río" },
  // { id: 2, image: galeria2, caption: "Backstage, Santa Marta" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "SoundCloud", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "#" },
];

function Section({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function Loader({ logo }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#0B0F0D" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <style>{`
        @keyframes glitchShiftR {
          0%, 100% { transform: translate(0, 0); opacity: 0.9; }
          20% { transform: translate(-3px, 1px); opacity: 0.6; }
          40% { transform: translate(2px, -1px); opacity: 0.9; }
          60% { transform: translate(-2px, 0); opacity: 0.5; }
          80% { transform: translate(3px, 1px); opacity: 0.9; }
        }
        @keyframes glitchShiftB {
          0%, 100% { transform: translate(0, 0); opacity: 0.9; }
          20% { transform: translate(3px, -1px); opacity: 0.5; }
          40% { transform: translate(-2px, 1px); opacity: 0.9; }
          60% { transform: translate(2px, 0); opacity: 0.6; }
          80% { transform: translate(-3px, -1px); opacity: 0.9; }
        }
        @keyframes glitchSlice {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(10% 0 70% 0); }
          20% { clip-path: inset(60% 0 5% 0); }
          30% { clip-path: inset(30% 0 40% 0); }
          40% { clip-path: inset(0 0 0 0); }
          55% { clip-path: inset(80% 0 2% 0); }
          70% { clip-path: inset(0 0 0 0); }
          85% { clip-path: inset(20% 0 55% 0); }
        }
        .loader-logo-wrap { position: relative; width: min(70vw, 380px); }
        .loader-logo-base { position: relative; width: 100%; display: block; animation: glitchSlice 2.4s steps(1) infinite; }
        .loader-logo-r, .loader-logo-b {
          position: absolute; top: 0; left: 0; width: 100%; display: block;
          mix-blend-mode: screen;
        }
        .loader-logo-r { filter: brightness(1) sepia(1) saturate(6) hue-rotate(-50deg); animation: glitchShiftR 1.8s infinite; }
        .loader-logo-b { filter: brightness(1) sepia(1) saturate(6) hue-rotate(140deg); animation: glitchShiftB 1.8s infinite; }
      `}</style>
      <div className="flex flex-col items-center gap-6">
        <div className="loader-logo-wrap">
          <img src={logo} alt="" className="loader-logo-r" />
          <img src={logo} alt="" className="loader-logo-b" />
          <img src={logo} alt="De Caro DJ" className="loader-logo-base" />
        </div>
        <motion.p
          className="text-xs tracking-[0.3em]"
          style={{ color: "#7FE8A6" }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          CARGANDO
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function DeCaroDJ() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Sonidos", href: "#sonidos" },
    { label: "Mixes", href: "#mixes" },
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <AnimatePresence>{loading && <Loader logo={LOGO} />}</AnimatePresence>
      <div
        className="min-h-screen w-full"
        style={{
          background: "#0B0F0D",
          color: "#F2F4F1",
          fontFamily: "'Inter', sans-serif",
        }}
      >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Inter:wght@400;500&display=swap');
        .font-display { font-family: 'Orbitron', sans-serif; letter-spacing: 0.02em; }
        .accent-glow { text-shadow: 0 0 24px rgba(127,232,166,0.25); }
        ::selection { background: #7FE8A6; color: #0B0F0D; }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.7; }
          94% { opacity: 1; }
        }
        .glitch-scan {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .glitch-scan::before {
          content: ''; position: absolute; left: 0; right: 0; height: 40%;
          background: linear-gradient(180deg, transparent, rgba(127,232,166,0.06), transparent);
          animation: scanline 7s linear infinite;
        }
        .hero-frame { animation: flicker 6s infinite; }
      `}</style>

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(11,15,13,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(127,232,166,0.12)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-display text-lg tracking-tight" style={{ color: "#F2F4F1" }}>
            DE CARO <span style={{ color: "#7FE8A6" }}>DJ</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#8C9992" }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="md:hidden text-sm px-3 py-1.5 rounded"
            style={{ border: "1px solid rgba(242,244,241,0.2)" }}
            onClick={() => setNavOpen((v) => !v)}
          >
            {navOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm" style={{ color: "#8C9992" }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setNavOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <div
        id="top"
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden hero-frame px-6"
        style={{ minHeight: "100vh", paddingTop: "96px", paddingBottom: "48px" }}
      >
        {/* Fondo con la imagen glitch/halftone — se mueve más lento que el scroll (parallax) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
            y: bgY,
            scale: bgScale,
          }}
        />
        {/* Degradado radial: tapa el logo incrustado en el centro de la imagen de fondo,
            deja visibles las siluetas a los lados */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at center, rgba(11,15,13,0.92) 0%, rgba(11,15,13,0.5) 55%, transparent 80%)",
          }}
        />
        {/* Degradado para que el texto siga siendo legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(11,15,13,0.4) 0%, rgba(11,15,13,0.75) 55%, #0B0F0D 100%)" }}
        />
        <div className="glitch-scan" />
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7FE8A6 0%, transparent 70%)", filter: "blur(40px)" }}
        />

        <motion.div
          className="max-w-6xl mx-auto relative flex flex-col items-center text-center"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-widest mb-8"
            style={{ color: "#7FE8A6" }}
          >
            Barranquilla · Colombia
          </motion.p>
          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            src={LOGO}
            alt="De Caro DJ"
            className="w-full max-w-md md:max-w-xl accent-glow"
            style={{ filter: "drop-shadow(0 0 30px rgba(127,232,166,0.2))" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-xl text-lg"
            style={{ color: "#8C9992" }}
          >
            Champeta, dancehall y reggaetón que se cruzan con afro house, latin house,
            tech house, disco y nu-disco. Sets que van del barrio al rooftop sin perder el groove.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#mixes"
              className="px-6 py-3 rounded-full font-medium text-sm transition-transform hover:scale-105"
              style={{ background: "#7FE8A6", color: "#0B0F0D" }}
            >
              Escuchar mixes
            </a>
            <a
              href="#contacto"
              className="px-6 py-3 rounded-full font-medium text-sm transition-colors"
              style={{ border: "1px solid rgba(242,244,241,0.25)", color: "#F2F4F1" }}
            >
              Contratar para evento
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* SONIDOS */}
      <Section id="sonidos" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-2">Sonidos</h2>
          <p className="mb-10" style={{ color: "#8C9992" }}>
            Dos mundos, una sola sesión.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl" style={{ background: "#12171D", border: "1px solid rgba(127,232,166,0.1)" }}>
              <p className="text-xs tracking-widest mb-4" style={{ color: "#7FE8A6" }}>
                URBANO
              </p>
              <div className="flex flex-wrap gap-2">
                {GENRES.filter((g) => g.group === "urbano").map((g) => (
                  <span
                    key={g.name}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{ background: "rgba(242,244,241,0.05)", color: "#F2F4F1" }}
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: "#12171D", border: "1px solid rgba(127,232,166,0.1)" }}>
              <p className="text-xs tracking-widest mb-4" style={{ color: "#7FE8A6" }}>
                CROSSOVER / ELECTRÓNICA
              </p>
              <div className="flex flex-wrap gap-2">
                {GENRES.filter((g) => g.group === "crossover").map((g) => (
                  <span
                    key={g.name}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{ background: "rgba(242,244,241,0.05)", color: "#F2F4F1" }}
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MIXES */}
      <Section id="mixes" className="px-6 py-24" style={{ background: "#0E1310" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-2">Mixes y videos</h2>
          <p className="mb-10" style={{ color: "#8C9992" }}>
            Sesiones grabadas en vivo y en estudio, directo desde SoundCloud.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOUNDCLOUD_TRACKS.map((track, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#12171D" }}>
                <iframe
                  title={track.title}
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    track.url
                  )}&color=%237FE8A6&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
                />
                <div className="p-4">
                  <p className="font-medium text-sm">{track.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs" style={{ color: "#5A6660" }}>
            ¿No ves tus sets? Cambia las URLs en <code>SOUNDCLOUD_TRACKS</code> por los links reales
            (botón "Compartir" en cada track de SoundCloud).
          </p>
        </div>
      </Section>

      {/* SOBRE MÍ */}
      <Section id="sobre-mi" className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Sobre mí</h2>
            <p style={{ color: "#8C9992" }}>{BIO.years} detrás de los platos.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {BIO.favoriteGenres.map((g) => (
                <span
                  key={g}
                  className="px-4 py-2 rounded-full text-sm"
                  style={{ background: "rgba(127,232,166,0.1)", color: "#7FE8A6" }}
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {BIO.paragraphs.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed" style={{ color: "#F2F4F1" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* GALERIA */}
      <Section id="galeria" className="px-6 py-24" style={{ background: "#0E1310" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-2">Galería</h2>
          <p className="mb-10" style={{ color: "#8C9992" }}>
            Momentos en vivo de mis eventos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.length === 0 && (
              <div
                className="col-span-2 md:col-span-3 rounded-xl p-8 text-center text-sm"
                style={{ border: "1px dashed rgba(242,244,241,0.15)", color: "#5A6660" }}
              >
                Agrega tus fotos en el array <code>GALLERY</code> (arriba del componente) para que
                aparezcan aquí.
              </div>
            )}
            {GALLERY.map((g) => (
              <div
                key={g.id}
                className="aspect-square rounded-xl flex items-end p-4 relative overflow-hidden group cursor-pointer"
                style={{ background: "linear-gradient(160deg, #1A211C, #0B0F0D)" }}
              >
                <img
                  src={g.image}
                  alt={g.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <p
                  className="text-xs relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#F2F4F1" }}
                >
                  {g.caption}
                </p>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6), transparent 60%)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-5xl mb-4">
                Llevemos el set
                <br />a tu evento
              </h2>
              <p style={{ color: "#8C9992" }}>Barranquilla, Colombia · Disponible para bodas, fiestas y clubs</p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-medium text-sm w-fit flex items-center gap-2"
              style={{ background: "#7FE8A6", color: "#0B0F0D" }}
            >
              Escribir por WhatsApp <FaWhatsapp className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="text-sm hover:text-white transition-colors" style={{ color: "#8C9992" }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <footer className="px-6 py-8 text-center text-xs" style={{ color: "#5A6660", borderTop: "1px solid rgba(242,244,241,0.06)" }}>
        © {new Date().getFullYear()} De Caro DJ. Todos los derechos reservados.
      </footer>
      </div>
    </>
  );
}