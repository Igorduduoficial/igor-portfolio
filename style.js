/* =========================
   FILTER PROJECTS
========================= */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.filter;

        projects.forEach(project => {

            const projectCategory = project.dataset.category;

            if (
                category === "all" ||
                projectCategory === category
            ) {
                project.style.display = "";
            } else {
                project.style.display = "none";
            }

        });

    });

});


/* =========================
   PROJECT MODAL
========================= */

const modal = document.querySelector(".project-modal");
const modalClose = document.querySelector(".modal-close");

const modalTitle = document.querySelector("#modalTitle");
const modalType = document.querySelector("#modalType");

projects.forEach(project => {

    project.addEventListener("click", () => {

        const title = project.dataset.title;
        const type = project.dataset.type;

        modalTitle.textContent = title;
        modalType.textContent = type;

        modal.classList.add("open");

        document.body.style.overflow = "hidden";

    });

});


/* CLOSE MODAL */

function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

}

modalClose.addEventListener("click", closeModal);


/* CLOSE WITH ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* CLOSE CLICKING OUTSIDE */

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});
