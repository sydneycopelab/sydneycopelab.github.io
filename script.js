const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const menuLabel = document.querySelector(".menu-label");
const navLinks = document.querySelectorAll(".site-nav a");
const filterButtons = document.querySelectorAll("[data-filter]");
const publicationItems = document.querySelectorAll("[data-category]");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("[data-year]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuLabel) menuLabel.textContent = "Menu";
};

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  if (menuLabel) menuLabel.textContent = isOpen ? "Close" : "Menu";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    publicationItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (year) year.textContent = String(new Date().getFullYear());

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
