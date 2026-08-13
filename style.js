/* =====================================
   CATEGORY FILTER
===================================== */

const categories = document.querySelectorAll(".category");

const cards = document.querySelectorAll(".work-card");


function showCategory(category) {

  cards.forEach((card) => {

    if (card.dataset.category === category) {

      card.classList.remove("hidden");

    } else {

      card.classList.add("hidden");

    }

  });

}


categories.forEach((button) => {

  button.addEventListener("click", () => {

    categories.forEach((item) => {

      item.classList.remove("active");

    });


    button.classList.add("active");


    const category = button.dataset.category;


    showCategory(category);

  });

});


/*
   Categoria inicial:

   SUSPENSE
*/

showCategory("suspense");



/* =====================================
   PROJECT MODAL
===================================== */

const modal = document.querySelector(".modal");

const closeModalButton =
  document.querySelector(".modal-close");

const modalTitle =
  document.querySelector(".modal-title");

const modalType =
  document.querySelector(".modal-type");



cards.forEach((card) => {

  const media =
    card.querySelector(".media");


  media.addEventListener("click", () => {

    const title =
      card.dataset.title;

    const type =
      card.dataset.type;


    modalTitle.textContent = title;

    modalType.textContent = type;


    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";

  });

});



/* =====================================
   CLOSE MODAL
===================================== */

function closeModal() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


closeModalButton.addEventListener(
  "click",
  closeModal
);



/*
   Fecha clicando fora
*/

modal.addEventListener(
  "click",
  (event) => {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);



/*
   Fecha com ESC
*/

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);



/* =====================================
   SHOWCASE VIDEO
===================================== */

/*
   Quando você colocar:

   assets/showcase.mp4

   no HTML, o vídeo poderá ser
   reproduzido automaticamente.

   O vídeo precisa estar:

   muted
   autoplay
   loop
   playsinline
*/


const showcase =
  document.querySelector(
    ".showcase-video"
  );


if (showcase) {

  showcase
    .play()
    .catch(() => {

      /*
        Alguns navegadores
        bloqueiam autoplay.

        Nesse caso não fazemos
        nada e o usuário poderá
        iniciar o vídeo manualmente.
      */

    });

}



/* =====================================
   CUSTOM CURSOR
===================================== */

const dot =
  document.querySelector(
    ".cursor-dot"
  );


const ring =
  document.querySelector(
    ".cursor-ring"
  );



if (
  window.matchMedia(
    "(min-width: 1000px)"
  ).matches
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      dot.style.display =
        "block";

      ring.style.display =
        "block";


      dot.style.transform =
        `translate(
          ${event.clientX - 2.5}px,
          ${event.clientY - 2.5}px
        )`;


      ring.style.transform =
        `translate(
          ${event.clientX - 14}px,
          ${event.clientY - 14}px
        )`;

    }
  );

}
