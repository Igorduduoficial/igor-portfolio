/* ============================================================
   CATÁLOGO DE VÍDEOS — edite só este arquivo
   ============================================================

   Pra ADICIONAR ou TROCAR um vídeo, copie um bloco { ... } inteiro
   e mude os valores.

   CAMPOS:
   id           -> texto único, sem espaço
   title        -> nome do projeto
   tag          -> etiqueta curta estilo "case file" (ex: "CASE_01")
   category     -> para WORK: "suspense" | "storytelling" | "documentary"
   source       -> { type:"youtube", videoId:"..." }  OU
                    { type:"local", src:"videos/arquivo.mp4" }
   thumbnail    -> caminho de imagem, ou null (usa a do YouTube automático)
   description  -> texto curto sobre o projeto
   services     -> lista do que você fez
   software     -> lista de programas usados
   placeholder  -> true enquanto o vídeo ainda não existe
   ============================================================ */

const WORK = [
  // ---------- SUSPENSE ----------
  {
    id: "the-last-call",
    title: "The Last Call",
    tag: "CASE_01",
    category: "suspense",
    placeholder: false,
    source: { type: "youtube", videoId: "" }, // <- cole o videoId do storytime animado
    thumbnail: null,
    description: "A Reddit storytime rebuilt as a tension-driven short: original narration, the creator's artwork animated frame by frame, sound design and motion built to keep the viewer locked in until the last line.",
    services: ["Video Editing", "Motion Design", "Sound Design"],
    software: ["Premiere Pro", "After Effects"]
  },
  {
    id: "suspense-02",
    title: "In production",
    tag: "CASE_02",
    category: "suspense",
    placeholder: true,
    source: { type: "youtube", videoId: "" },
    thumbnail: null, description: "", services: [], software: []
  },

  // ---------- STORYTELLING ----------
  {
    id: "signal-lost",
    title: "Signal Lost",
    tag: "CASE_03",
    category: "storytelling",
    placeholder: true, // troque para false quando a TV com olhos estiver pronta
    source: { type: "local", src: "videos/signal-lost.mp4" },
    thumbnail: null,
    description: "An analog TV with static-filled eyes, modeled and animated in Blender, composited with tape-noise sound design — a signature piece built to show range beyond straight edits.",
    services: ["3D Motion Design", "Compositing", "Sound Design"],
    software: ["Blender", "After Effects", "Premiere Pro"]
  },
  {
    id: "storytelling-02",
    title: "In production",
    tag: "CASE_04",
    category: "storytelling",
    placeholder: true,
    source: { type: "youtube", videoId: "" },
    thumbnail: null, description: "", services: [], software: []
  },

  // ---------- DOCUMENTARY ----------
  {
    id: "documentary-01",
    title: "In production",
    tag: "CASE_05",
    category: "documentary",
    placeholder: true,
    source: { type: "youtube", videoId: "" },
    thumbnail: null, description: "", services: [], software: []
  },
  {
    id: "documentary-02",
    title: "In production",
    tag: "CASE_06",
    category: "documentary",
    placeholder: true,
    source: { type: "youtube", videoId: "" },
    thumbnail: null, description: "", services: [], software: []
  },
];

/* ============================================================
   SHORTS — seção separada, vídeos verticais 9:16
   ============================================================ */
const SHORTS = [
  { id: "short-01", title: "In production", tag: "CLIP_01", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] },
  { id: "short-02", title: "In production", tag: "CLIP_02", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] },
  { id: "short-03", title: "In production", tag: "CLIP_03", placeholder: true, source: { type: "youtube", videoId: "" }, thumbnail: null, description: "", services: [], software: [] },
];

/* ============================================================
   SHOWCASE — o vídeo em destaque na seção SHOWCASE
   ============================================================ */
const SHOWCASE_VIDEO = { type: "youtube", videoId: "" }; // cole aqui o videoId da sua mini apresentação
const SHOWCASE_TITLE = "Signal Lost";
const SHOWCASE_NOTE = "Featured project — 3D motion design in Blender, composited and sound-designed for an analog-horror feel.";

/* ============================================================
   CONTATO
   ============================================================ */
const CONTACT = {
  email: "igoreditor.contact@gmail.com",
  instagram: "https://www.instagram.com/igoroeditor/",
  discord: "" // ainda não definido — deixe vazio que o site esconde esse link sozinho
};
