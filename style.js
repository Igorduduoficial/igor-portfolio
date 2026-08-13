// ============================================================
// Helpers de vídeo
// ============================================================
function youtubeThumb(id){ return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }

function embedHTML(source, autoplay = true){
  if (!source) return "";
  if (source.type === "youtube" && source.videoId){
    const params = `rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;
    return `<iframe src="https://www.youtube-nocookie.com/embed/${source.videoId}?${params}"
      title="video" frameborder="0" referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
  }
  if (source.type === "local" && source.src){
    return `<video src="${source.src}" controls ${autoplay ? "autoplay" : ""} playsinline></video>`;
  }
  return `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-family:'DM Mono',monospace;font-size:0.78rem;">NO VIDEO SOURCE — edit data.js</div>`;
}

function thumbFor(item){
  if (item.thumbnail) return item.thumbnail;
  if (item.source?.type === "youtube" && item.source.videoId) return youtubeThumb(item.source.videoId);
  return null;
}

// ============================================================
// WORK GRID — filtra por categoria, sem aba "All"
// ============================================================
const grid = document.getElementById("grid");
let activeCat = "suspense";

function cardHTML(item, vertical = false){
  const thumb = thumbFor(item);
  return `
    <article class="card ${item.placeholder ? "placeholder" : ""}" data-id="${item.id}" data-list="${vertical ? "shorts" : "work"}">
      <div class="card-media">
        <span class="card-tag">${item.tag || ""}</span>
        ${thumb ? `<img src="${thumb}" alt="">` : ""}
      </div>
      <div class="card-body">
        <div class="card-title">${item.placeholder ? "In production" : item.title}</div>
        <div class="card-sub">${item.placeholder ? "New case coming soon" : (item.services || []).slice(0,2).join(" · ")}</div>
      </div>
    </article>`;
}

function renderGrid(){
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

// ============================================================
// SHORTS GRID — seção separada, sempre vertical
// ============================================================
const shortsGrid = document.getElementById("shortsGrid");
shortsGrid.innerHTML = SHORTS.map(item => cardHTML(item, true)).join("");
attachCardHandlers(shortsGrid, SHORTS);

function attachCardHandlers(container, dataset){
  container.querySelectorAll(".card:not(.placeholder)").forEach(card => {
    card.addEventListener("click", () => openProject(card.dataset.id, dataset));
  });
}

// ============================================================
// PROJECT PANEL
// ============================================================
const projectPanel = document.getElementById("projectPanel");
const panelBody = document.getElementById("panelBody");
document.getElementById("closePanel").addEventListener("click", closeProject);

function openProject(id, dataset){
  const item = dataset.find(v => v.id === id);
  if (!item) return;
  panelBody.innerHTML = `
    <div class="panel-video">${embedHTML(item.source)}</div>
    <h2 class="panel-title">${item.title}</h2>
    <div class="panel-meta">
      <div><p class="mono label">SERVICES</p><ul>${(item.services||[]).map(s=>`<li>${s}</li>`).join("")}</ul></div>
      <div><p class="mono label">SOFTWARE</p><ul>${(item.software||[]).map(s=>`<li>${s}</li>`).join("")}</ul></div>
      <div><p class="mono label">DESCRIPTION</p><p>${item.description||""}</p></div>
    </div>`;
  projectPanel.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeProject(){
  projectPanel.classList.remove("open");
  panelBody.innerHTML = "";
  document.body.style.overflow = "";
}

// ============================================================
// SHOWCASE — botão de verdade, sem ícone de play falso.
// Toca dentro do próprio frame, sem modal.
// ============================================================
const showcaseFrame = document.getElementById("showcaseFrame");
const showcaseThumb = document.getElementById("showcaseThumb");
const showcaseEmbed = document.getElementById("showcaseEmbed");
const btnShowcase = document.getElementById("btnShowcase");
const showcaseClose = document.getElementById("showcaseClose");

document.getElementById("showcaseTitle").textContent = SHOWCASE_TITLE || "";
document.getElementById("showcaseNote").textContent = SHOWCASE_NOTE || "";

if (SHOWCASE_VIDEO?.type === "youtube" && SHOWCASE_VIDEO.videoId){
  showcaseThumb.style.backgroundImage = `url(${youtubeThumb(SHOWCASE_VIDEO.videoId)})`;
  showcaseThumb.style.backgroundSize = "cover";
  showcaseThumb.style.backgroundPosition = "center";
}

function playShowcase(){
  showcaseEmbed.innerHTML = embedHTML(SHOWCASE_VIDEO);
  showcaseFrame.classList.add("playing");
  btnShowcase.textContent = "PLAYING";
}
function stopShowcase(){
  showcaseFrame.classList.remove("playing");
  showcaseEmbed.innerHTML = "";
  btnShowcase.textContent = "SHOWCASE ↗";
}
btnShowcase.addEventListener("click", () => {
  showcaseFrame.classList.contains("playing") ? stopShowcase() : playShowcase();
});
showcaseClose.addEventListener("click", stopShowcase);

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (showcaseFrame.classList.contains("playing")) stopShowcase();
  if (projectPanel.classList.contains("open")) closeProject();
});

// ============================================================
// CONTATO — monta os links a partir de data.js, esconde o que estiver vazio
// ============================================================
const contactLinks = document.getElementById("contactLinks");
const links = [];
if (CONTACT.email) links.push({ label: "EMAIL", value: CONTACT.email, href: `mailto:${CONTACT.email}` });
if (CONTACT.instagram) links.push({ label: "INSTAGRAM", value: "@igoroeditor", href: CONTACT.instagram });
if (CONTACT.discord) links.push({ label: "DISCORD", value: "Talk to me", href: CONTACT.discord });
contactLinks.innerHTML = links.map(l => `
  <a class="contact-link" href="${l.href}" target="_blank" rel="noopener">
    <span class="mono">${l.label}</span><span class="arrow">${l.value} →</span>
  </a>`).join("");

// ============================================================
// CURSOR CUSTOMIZADO (só em desktop / mouse)
// ============================================================
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
if (window.matchMedia("(pointer: fine)").matches){
  window.addEventListener("mousemove", (e) => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
  document.querySelectorAll("a, button, .card").forEach(el => {
    el.addEventListener("mouseenter", () => { cursorRing.style.width = "48px"; cursorRing.style.height = "48px"; });
    el.addEventListener("mouseleave", () => { cursorRing.style.width = "32px"; cursorRing.style.height = "32px"; });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
