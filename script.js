/* ============================================================
   Zakky Aulia Aldrin — portfolio interactions (Neo-Vibrant)
   Canvas blobs + Lenis smooth scroll + GSAP/ScrollTrigger.
   Degrades gracefully if libraries fail or motion is reduced.
   ============================================================ */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- WhatsApp deep link (pre-fills message, user presses Send) ---------- */
const WHATSAPP_PHONE_NUMBER = "6287869030753";
const DEFAULT_WHATSAPP_MESSAGE = `Hi Zakky 👋

I recently visited your portfolio website and was impressed by your work and experience. I'd love to connect and discuss potential opportunities, collaborations, or simply exchange ideas.

Looking forward to hearing from you!`;

function buildWhatsAppUrl(phoneNumber = WHATSAPP_PHONE_NUMBER, message = DEFAULT_WHATSAPP_MESSAGE) {
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobileDevice) {
    return `whatsapp://send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
  }
  return `https://web.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
}

function initWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.setAttribute("href", `https://wa.me/${WHATSAPP_PHONE_NUMBER}`);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const whatsappWindow = window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
      if (!whatsappWindow) {
        window.location.href = buildWhatsAppUrl();
      }
    });
  });
}

/* ---------- Typewriter greeting ---------- */
const greetings = ["Hi", "Hola", "Konnichiwa", "Bonjour", "Annyeong", "Marhaban", "Ciao"];
const typeTarget = document.querySelector("#typewriter");
let greetingIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeGreeting() {
  if (!typeTarget || prefersReducedMotion) {
    if (typeTarget) typeTarget.textContent = greetings[0];
    return;
  }
  const current = greetings[greetingIndex];
  typeTarget.textContent = isDeleting
    ? current.slice(0, Math.max(letterIndex - 1, 0))
    : current.slice(0, letterIndex + 1);
  letterIndex = isDeleting ? letterIndex - 1 : letterIndex + 1;

  let delay = isDeleting ? 44 : 82;
  if (!isDeleting && letterIndex === current.length) {
    delay = 1250;
    isDeleting = true;
  }
  if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    greetingIndex = (greetingIndex + 1) % greetings.length;
    delay = 320;
  }
  window.setTimeout(typeGreeting, delay);
}

/* ---------- Rotating focus word ---------- */
function initRotor() {
  const el = document.querySelector(".rotor");
  if (!el) return;
  const words = (el.dataset.words || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (words.length < 2 || prefersReducedMotion) return;
  let i = 0;
  window.setInterval(() => {
    el.classList.add("is-swapping");
    window.setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove("is-swapping");
    }, 360);
  }, 2600);
}

/* ---------- Icons + year + meters ---------- */
function initIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.9 } });
}
function initYear() {
  const el = document.querySelector("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}
function prepMeters() {
  document.querySelectorAll(".skill-meter").forEach((meter) => {
    const level = Math.min(100, Math.max(0, Number(meter.dataset.level) || 0));
    const fill = meter.querySelector(".meter-fill");
    if (fill) fill.style.setProperty("--fill", level + "%");
  });
}

/* ---------- Interactive blob background ---------- */
function initCanvas() {
  const canvas = document.querySelector(".bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const palette = [
    [139, 108, 255],
    [198, 242, 78],
    [255, 106, 61],
    [52, 227, 207],
    [139, 108, 255],
  ];
  let w = 0, h = 0, dpr = 1;
  const blobs = [];
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  resize();

  for (let i = 0; i < palette.length; i++) {
    blobs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.min(w, h) * (0.24 + Math.random() * 0.16),
      vx: (Math.random() - 0.5) * 0.16 * dpr,
      vy: (Math.random() - 0.5) * 0.16 * dpr,
      depth: 0.4 + Math.random() * 0.8,
      c: palette[i],
    });
  }

  function paint() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    const ox = (mouse.x - 0.5) * 60 * dpr;
    const oy = (mouse.y - 0.5) * 60 * dpr;
    blobs.forEach((b) => {
      const cx = b.x + ox * b.depth;
      const cy = b.y + oy * b.depth;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
      g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.34)`);
      g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
  }

  function tick() {
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    blobs.forEach((b) => {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r;
      if (b.y > h + b.r) b.y = -b.r;
    });
    paint();
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", (e) => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = e.clientY / window.innerHeight;
  }, { passive: true });

  if (prefersReducedMotion) {
    paint(); // single static frame
  } else {
    requestAnimationFrame(tick);
  }
}

/* ---------- Fallback reveal ---------- */
function revealAll() {
  document.querySelectorAll("[data-reveal], [data-hero]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  document.querySelectorAll(".skill-meter").forEach((m) => m.classList.add("is-filled"));
  document.querySelectorAll("[data-exp-card]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
  });
  document.querySelectorAll("#experience .timeline-axis").forEach((el) => (el.style.transform = "scaleY(1)"));
  document.querySelectorAll("#experience .timeline-node").forEach((el) => (el.style.transform = "scale(1)"));
}

/* ---------- Nav (smooth scroll + progress) ---------- */
function initNavBasics(lenis) {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.1 });
      else target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });
}
function setActiveNav(id) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.getAttribute("href") === "#" + id;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
function updateProgress(fraction) {
  const bar = document.querySelector(".scroll-progress span");
  if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, fraction))})`;
}

/* ---------- Wrap each headline line for clip reveal ---------- */
function prepHeadlineLines() {
  const lines = document.querySelectorAll("#about-title .line");
  const inners = [];
  lines.forEach((line) => {
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    inners.push(inner);
  });
  return inners;
}

/* ---------- Magnetic ---------- */
function initMagnetic(gsap) {
  if (prefersReducedMotion || window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.35,
        y: (e.clientY - (r.top + r.height / 2)) * 0.35,
        duration: 0.4,
        ease: "power3.out",
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    });
  });
}

/* ---------- Tilt + spotlight ---------- */
function initTilt(gsap) {
  if (prefersReducedMotion || window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", px * 100 + "%");
      card.style.setProperty("--my", py * 100 + "%");
      gsap.to(card, {
        rotateY: (px - 0.5) * 5,
        rotateX: (0.5 - py) * 5,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    });
  });
}

/* ---------- Motion core ---------- */
function initMotion() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const Lenis = window.Lenis;

  if (!gsap || !ScrollTrigger) {
    revealAll();
    initNavBasics(null);
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      updateProgress(max > 0 ? window.scrollY / max : 0);
    }, { passive: true });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (prefersReducedMotion) {
    revealAll();
    initNavBasics(null);
    setupScrollSpy(ScrollTrigger);
    return;
  }

  let lenis = null;
  if (Lenis) {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ scroll, limit }) => updateProgress(limit > 0 ? scroll / limit : 0));
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    window.addEventListener("scroll", () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      updateProgress(max > 0 ? window.scrollY / max : 0);
    }, { passive: true });
  }

  initNavBasics(lenis);

  /* Hero entrance */
  const lines = prepHeadlineLines();
  gsap.set(lines, { yPercent: 110 });
  gsap.set(['[data-hero="1"]', '[data-hero="3"]', '[data-hero="4"]', '[data-hero="5"]', '[data-hero="6"]', '[data-hero="7"]'], { y: 26 });

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .to('[data-hero="1"]', { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    .to('[data-hero="2"]', { opacity: 1, duration: 0.1 }, 0.2)
    .to(lines, { yPercent: 0, duration: 0.95, stagger: 0.12 }, 0.24)
    .to('[data-hero="3"]', { opacity: 1, y: 0, duration: 0.6 }, 0.55)
    .to('[data-hero="4"]', { opacity: 1, y: 0, duration: 0.6 }, 0.68)
    .to('[data-hero="5"]', { opacity: 1, y: 0, duration: 0.6 }, 0.8)
    .to('[data-hero="6"]', { opacity: 1, y: 0, duration: 0.6 }, 0.92)
    .to('[data-hero="7"]', { opacity: 1, y: 0, duration: 0.5 }, 1.05)
    .to('[data-hero="portrait"]', { opacity: 1, duration: 1.0 }, 0.35);

  /* Standalone reveals */
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest(".timeline, .project-grid, .skills-layout")) return;
    gsap.fromTo(el, { opacity: 0, y: 42 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 84%" },
    });
  });

  /* Stagger groups (experience timeline has its own dedicated animation) */
  [".project-grid", ".skills-layout"].forEach((sel) => {
    const parent = document.querySelector(sel);
    if (!parent) return;
    const kids = parent.querySelectorAll("[data-reveal]");
    if (!kids.length) return;
    gsap.fromTo(kids, { opacity: 0, y: 48 }, {
      opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: parent, start: "top 82%" },
    });
  });

  /* Experience timeline: line grows, indicators pop, cards de-blur in */
  initExperience(gsap, ScrollTrigger);

  /* Skill meters */
  document.querySelectorAll(".skill-meter").forEach((meter) => {
    ScrollTrigger.create({ trigger: meter, start: "top 88%", onEnter: () => meter.classList.add("is-filled") });
  });

  setupScrollSpy(ScrollTrigger);
  initMagnetic(gsap);
  initTilt(gsap);
  ScrollTrigger.refresh();
}

/* ---------- Experience timeline entrance ---------- */
function initExperience(gsap, ScrollTrigger) {
  const timeline = document.querySelector("#experience .timeline");
  if (!timeline) return;
  const axis = timeline.querySelector(".timeline-axis");
  const nodes = timeline.querySelectorAll(".timeline-node");
  const cards = timeline.querySelectorAll("[data-exp-card]");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: timeline, start: "top 78%" },
    defaults: { ease: "power3.out" },
  });

  if (axis) tl.fromTo(axis, { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: "power2.out" }, 0);
  tl.fromTo(nodes, { scale: 0 }, { scale: 1, duration: 0.5, stagger: 0.18, ease: "back.out(1.7)" }, 0.2);
  tl.fromTo(
    cards,
    { opacity: 0, y: 30, filter: "blur(8px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.18 },
    0.25
  );
}

function setupScrollSpy(ScrollTrigger) {
  document.querySelectorAll("main .section").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => { if (self.isActive) setActiveNav(section.id); },
    });
  });
}

/* ---------- Boot ---------- */
initIcons();
initYear();
initWhatsAppLinks();
prepMeters();
initCanvas();
typeGreeting();
initRotor();
try {
  initMotion();
} catch (err) {
  console.error("Motion init failed, falling back to static reveal:", err);
  revealAll();
}

window.addEventListener("load", () => {
  initIcons();
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
});
