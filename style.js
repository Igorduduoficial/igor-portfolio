/* ============================================================
   DATA (Seus Projetos, Shorts e Contatos)
============================================================ */
const WORK = [
  // SUSPENSE
  {
    id: "suspense-01", title: "The Last Call", tag: "CASE_01", category: "suspense", placeholder: false,
    source: { type: "youtube", videoId: "" }, thumbnail: null,
    description: "A tension-driven short: original narration, frame by frame animations, sound design and motion built to keep the viewer locked in.",
    services: ["Video Editing", "Motion Design", "Sound Design"], software: ["Premiere Pro", "After Effects"]
  },
  {
    id: "suspense-02", title: "In production", tag: "CASE_02", category: "suspense", placeholder: true,
    source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: []
  },
  // STORYTELLING
  {
    id: "storytelling-01", title: "Signal Lost", tag: "CASE_03", category: "storytelling", placeholder: false,
    source: { type: "youtube", videoId: "" }, thumbnail: null,
    description: "An analog TV with static-filled eyes, modeled and animated in Blender, composited with tape-noise sound design.",
    services: ["3D Motion Design", "Compositing", "Sound Design"], software: ["Blender", "After Effects", "Premiere Pro"]
  },
  {
    id: "storytelling-02", title: "In production", tag: "CASE_04", category: "storytelling", placeholder: true,
    source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: []
  },
  // DOCUMENTARY
  {
    id: "documentary-01", title: "In production", tag: "CASE_05", category: "documentary", placeholder: true,
    source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: []
  },
  {
    id: "documentary-02", title: "In production", tag: "CASE_06", category: "documentary", placeholder: true,
    source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: []
  }
];

const SHORTS = [
  { id: "short-01", title: "Short Format 01", tag: "CLIP_01", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] },
  { id: "short-02", title: "Short Format 02", tag: "CLIP_02", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] },
  { id: "short-03", title: "Short Format 03", tag: "CLIP_03", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] },
  { id: "short-04", title: "Short Format 04", tag: "CLIP_04", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] }
];

const SHOWCASE_VIDEO = {
  id: "showcase-main", title: "Signal Lost",
  source: { type: "youtube", videoId: "" },
  description: "Featured project — 3D motion design in Blender, composited and sound-designed for an analog-horror feel.",
  services: ["3D Motion Design", "Sound Design"], software: ["Blender", "After Effects"]
};

// Seus Contatos Atualizados
const CONTACT = {
  email: "igoreditor.contact@gmail.com",
  instagram: "https://www.instagram.com/igoroeditor/"
};

/* ============================================================
   HELPERS & LOGIC
============================================================ */
function youtubeThumb(id) { return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }

function embedHTML(source, autoplay = true) {
  if (!source) return "";
  if (source.type === "youtube" && source.videoId) {
    const params = `rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;
    return `<iframe src="https://www.youtube-nocookie.com/embed/${source.videoId}?${params}" title="video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (source.type === "local" && source.src) {
    return `<video src="${source.src}" controls ${autoplay ? "autoplay" : ""} playsinline></video>`;
  }
  return `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-family:'DM Mono',monospace;font-size:0.78rem;">NO VIDEO SOURCE</div>`;
}

function thumbFor(item) {
  if (item.thumbnail) return item.thumbnail;
  if (item.source?.type === "youtube" && item.source.videoId) return youtubeThumb(item.source.videoId);
  return null;
}

/* WORK GRID (16:9) */
const grid = document.getElementById("grid");
let activeCat = "suspense";

function cardHTML(item, vertical = false) {
  const thumb = thumbFor(item);
  return `
    <article class="card ${item.placeholder ? "placeholder" : ""}" data-id="${item.id}" data-list="${vertical ? "shorts" : "work"}">
      <div class="card-media">
        <span class="card-tag">${item.tag || ""}</span>
        ${thumb ? `<img src="${thumb}" alt="">` : ""}
      </div>
      <div class="card-body">
        <div class="card-title">${item.placeholder ? "In production" : item.title}</div>
        <div class="card-sub">${item.placeholder ? "New case coming soon" : (item.services || []).slice(0, 2).join(" · ")}</div>
      </div>
    </article>`;
}

function renderGrid() {
  const items = WORK.filter(v => v.category === activeCat);
  grid.innerHTML = items.map(item => cardHTML(item, false)).join("");
  attachCardHandlers(grid, WORK);
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeCat = tab.dataset.cat;
    renderGrid();
  });
});
renderGrid();

/* SHORTS GRID (9:16) */
const shortsGrid = document.getElementById("shortsGrid");
shortsGrid.innerHTML = SHORTS.map(item => cardHTML(item, true)).join("");
attachCardHandlers(shortsGrid, SHORTS);

function attachCardHandlers(container, dataset) {
  container.querySelectorAll(".card:not(.placeholder)").forEach(card => {
    card.addEventListener("click", () => openProject(card.dataset.id, dataset));
  });
}

/* PROJECT MODAL */
const projectPanel = document.getElementById("projectPanel");
const panelBody = document.getElementById("panelBody");
document.getElementById("closePanel").addEventListener("click", closeProject);

function openProject(id, dataset) {
  const item = dataset.find(v => v.id === id);
  if (!item) return;
  panelBody.innerHTML = `
    <div class="panel-video">${embedHTML(item.source)}</div>
    <h2 class="panel-title">${item.title}</h2>
    <div class="panel-meta">
      <div><p class="mono label">SERVICES</p><ul>${(item.services || []).map(s => `<li>${s}</li>`).join("")}</ul></div>
      <div><p class="mono label">SOFTWARE</p><ul>${(item.software || []).map(s => `<li>${s}</li>`).join("")}</ul></div>
      <div><p class="mono label">DESCRIPTION</p><p>${item.description || ""}</p></div>
    </div>`;
  projectPanel.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProject() {
  projectPanel.classList.remove("open");
  panelBody.innerHTML = "";
  document.body.style.overflow = "";
}

/* SHOWCASE LOGIC (Abre a modal direto) */
const btnShowcase = document.getElementById("btnShowcase");
btnShowcase.addEventListener("click", () => {
  openProject(SHOWCASE_VIDEO.id, [SHOWCASE_VIDEO]);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectPanel.classList.contains("open")) closeProject();
});

/* CONTACT LINKS */
const contactLinks = document.getElementById("contactLinks");
const links = [
  { label: "EMAIL", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "INSTAGRAM", value: "@igoroeditor", href: CONTACT.instagram }
];
contactLinks.innerHTML = links.map(l => `
  <a class="contact-link" href="${l.href}" target="_blank" rel="noopener">
    <span class="mono">${l.label}</span><span class="arrow">${l.value} →</span>
  </a>
`).join("");

/* CUSTOM CURSOR */
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
if (window.matchMedia("(pointer: fine)").matches) {
  let started = false;
  window.addEventListener("mousemove", (e) => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    if (!started) { started = true; document.body.classList.add("cursor-ready"); }
  });
  document.querySelectorAll("a, button, .card").forEach(el => {
    el.addEventListener("mouseenter", () => { cursorRing.style.width = "48px"; cursorRing.style.height = "48px"; });
    el.addEventListener("mouseleave", () => { cursorRing.style.width = "32px"; cursorRing.style.height = "32px"; });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
