<!-- Animated Δ hero — CSS/SMIL animation plays on GitHub -->
<p align="center">
  <img src="./.github/assets/hero.svg" alt="buildbyhet — Het Patel's WebGL developer portfolio" width="100%" />
</p>

<p align="center">
  <a href="https://www.buildbyhet.me/"><img alt="Live" src="https://img.shields.io/badge/live-buildbyhet.me-9f55ff?style=for-the-badge&labelColor=0a0611" /></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&labelColor=0a0611" />
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-r0.185-7000ff?style=for-the-badge&logo=threedotjs&labelColor=0a0611" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&labelColor=0a0611" />
  <img alt="GLSL" src="https://img.shields.io/badge/GLSL-custom%20shaders-b985ff?style=for-the-badge&labelColor=0a0611" />
</p>

<p align="center">
  A portfolio that treats WebGL as narrative. Custom GLSL particle systems, a scroll-scrubbed
  camera, a full post-processing chain — and a strict three-tier fallback so it stays fast,
  accessible, and crawlable everywhere.
</p>

---

## ✦ The scenes

Every section is a real-time Three.js scene sharing one particle/post library — no canvas is a video.

<table>
  <tr>
    <td width="50%"><img src="./.github/assets/home-orbit.webp" alt="Void Orbit — homepage projects" /></td>
    <td width="50%"><img src="./.github/assets/hackathons-trajectory.webp" alt="Void Trajectory — hackathons" /></td>
  </tr>
  <tr>
    <td align="center"><b>/ — “Void Orbit”</b><br/><sub>An infinite orbital gallery. Scroll spins the ring; the Δ mark breathes.</sub></td>
    <td align="center"><b>/hackathons — “Void Trajectory”</b><br/><sub>A camera flies a curve past glass-slab stations, one per hackathon.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./.github/assets/journey-opening.webp" alt="/journey opening ritual" /></td>
    <td width="50%"><img src="./.github/assets/journey-ending.webp" alt="/journey — the assembled delta" /></td>
  </tr>
  <tr>
    <td align="center"><b>/journey — the opening ritual</b><br/><sub>“Class 9 to now. The honest version.” Particles rise; the Δ foreshadows.</sub></td>
    <td align="center"><b>/journey — the Δ assembles</b><br/><sub>Eight chapters scrub the scattered field into a single mark. Then a signature.</sub></td>
  </tr>
</table>

> **See it live → [buildbyhet.me](https://www.buildbyhet.me/)** · [/journey](https://www.buildbyhet.me/journey) · [/hackathons](https://www.buildbyhet.me/hackathons)

---

## ✦ Architecture

One shared `components/webgl` library feeds every scene; each page owns only its choreography.

```mermaid
flowchart TB
  subgraph P ["▲ Next.js 14 · Pages Router"]
    direction LR
    Home["/ · Void Orbit"]
    Hack["/hackathons · Void Trajectory"]
    Journey["/journey · My Journey"]
    Certs["/certifications"]
    Geo["/web-developer-in/[city]<br/>programmatic SEO"]
    Ask["/api/askhet · Ask Het (AI)"]
  end

  subgraph L ["◈ components/webgl · shared library"]
    direction LR
    Tiers["tiers.js<br/>detectTier"]
    Post["PostFX<br/>bloom · CA · vignette · grain"]
    Slab["GlassSlab<br/>fresnel glass + placeholder"]
    Mono["Monolith · ParticleField<br/>ParticleBloom"]
    Shade["shaders/*.glsl<br/>slab · particles · post"]
  end

  subgraph J ["◆ /journey scene graph"]
    direction LR
    Scene["JourneyScene"]
    JMono["JourneyMonolith<br/>scatter → Δ"]
    Stars["GuideStars"]
    Slabs["MemorySlabs"]
    Audio["JourneyAudio<br/>Web Audio lowpass"]
  end

  Home --> L
  Hack --> Slab
  Certs --> L
  Journey --> Scene
  Scene --> JMono & Stars & Slabs & Post
  JMono --> Shade
  Slab --> Shade
  Post --> Shade

  classDef page fill:#160c26,stroke:#7000ff,color:#e9e4f5;
  classDef lib fill:#120a1e,stroke:#8b31ff,color:#e9e4f5;
  classDef jn fill:#0e0a1a,stroke:#b985ff,color:#e9e4f5;
  class Home,Hack,Journey,Certs,Geo,Ask page;
  class Tiers,Post,Slab,Mono,Shade lib;
  class Scene,JMono,Stars,Slabs,Audio jn;
```

### The render stack, layer by layer

<p align="center">
  <img src="./.github/assets/render-stack.svg" alt="Isometric render stack of the /journey page" width="620" />
</p>

---

## ✦ Three-tier rendering

The scene is progressive enhancement, not a requirement. The **text is always real DOM** — the WebGL is the enhancement on top.

```mermaid
flowchart LR
  V([Visitor]) --> Q{"WebGL?<br/>reduced-motion?<br/>viewport?"}
  Q -->|"desktop · WebGL ok"| T1["<b>Tier 1</b><br/>full scene · bloom<br/>parallax · DPR 2"]
  Q -->|"mobile"| T2["<b>Tier 2</b><br/>straight path · ½ particles<br/>bloom off · DPR 1.5"]
  Q -->|"reduced-motion · no WebGL · context-lost"| T3["<b>Tier 3</b><br/>semantic DOM / typeset essay<br/>fully crawlable"]

  classDef t fill:#130b22,stroke:#9f55ff,color:#efe9f7;
  class T1,T2,T3 t;
  style Q fill:#0e0a1a,stroke:#b985ff,color:#e9e4f5
  style V fill:#160c26,stroke:#7000ff,color:#e9e4f5
```

If a WebGL context is ever lost mid-session, the page **falls back to Tier 3 in place** — no blank canvas, ever.

---

## ✦ How the Δ assembles (`/journey`)

A single native scroll drives everything; the scene just reads `scroll.p` each frame.

```mermaid
flowchart LR
  S([Native scroll]) -->|"ScrollTrigger scrub 0.4"| P["scroll.p 0→1"]
  P --> Cam["camera along<br/>CatmullRom curve"]
  P --> Conv["Δ convergence"]
  P --> Arc["atmosphere arc<br/>fog · saturation · accent"]
  P --> Beh["per-chapter<br/>particle behaviours"]

  Conv --> GPU["JourneyMonolith (GLSL)<br/>mix(aScatter, Δtarget, lp)"]
  Beh --> GPU
  Arc --> GPU
  GPU --> Draw[[per-frame draw]]
  Cam --> Draw
  Draw --> FX["PostFX composite"]

  classDef n fill:#130b22,stroke:#8b31ff,color:#efe9f7;
  class P,Cam,Conv,Arc,Beh,GPU,FX n;
  style S fill:#160c26,stroke:#7000ff,color:#e9e4f5
  style Draw fill:#0e0a1a,stroke:#b985ff,color:#e9e4f5
```

Each chapter gives the field its own character — aimless drift, two guide stars that persist,
a self-organising lattice, two exchanging streams, a redirect-and-curl, a downward sag — all
faded out by assembly so nothing fights the final lock.

---

## ✦ Tech stack

| Layer | Tools |
| :-- | :-- |
| **Framework** | Next.js 14 (Pages Router) · React 18 · TypeScript |
| **3D / GPU** | Three.js r0.185 · custom GLSL (vertex + fragment) · EffectComposer post chain |
| **Motion** | GSAP 3 · ScrollTrigger · ScrollToPlugin · Framer Motion |
| **Audio** | Web Audio API (lowpass filter chain) · Howler |
| **Styling** | Tailwind CSS 3 · SCSS Modules · CSS custom-property design tokens |
| **Media** | `sharp` build-time WebP pipeline · `ffmpeg` video compression |
| **Deploy** | Vercel (push-to-`main`) |

---

## ✦ Project structure

```
devfolio/
├─ pages/                     Next.js routes
│  ├─ index.js                Void Orbit — projects ring
│  ├─ hackathons.js           Void Trajectory — flythrough
│  ├─ journey.js              My Journey — narrative scroll
│  ├─ certifications.js
│  └─ api/askhet.ts           "Ask Het" AI endpoint
├─ components/
│  ├─ webgl/                  shared 3D library
│  │  ├─ tiers.js             capability detection → Tier 1/2/3
│  │  ├─ PostFX.js            bloom · chromatic aberration · vignette · grain
│  │  ├─ GlassSlab.js         fresnel glass slab + placeholder pipeline
│  │  ├─ Monolith · ParticleField · ParticleBloom
│  │  └─ shaders/             slab · particles · post GLSL
│  └─ Journey/                the /journey scene
│     ├─ JourneyScene.js      camera curve · atmosphere arc · raycast
│     ├─ JourneyMonolith.js   the assembling Δ (isolated shader)
│     ├─ GuideStars · MemorySlabs · JourneyAudio · SignatureDraw
│     └─ JourneyEssay.js      Tier-3 crawlable long-form
└─ constants.js               all content (projects, hackathons, journey)
```

---

## ✦ Run it locally

```bash
bun install     # or: npm install
bun dev         # or: npm run dev
```

Open **http://localhost:3000**.

```bash
bun run build   # production build
```

> **Media pipeline:** raw originals stay out of git; `sharp` emits optimised `_opt` WebP and
> only referenced PDFs / compressed video are committed.

---

<p align="center">
  <sub>Built by <a href="https://www.buildbyhet.me/">Het Patel</a> · every pixel on this site is code.</sub>
</p>
