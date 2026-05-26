(() => {
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  const closeMenu = () => {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    document.body.classList.add("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("nav-open");
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (links) {
    links.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Smooth scrolling for hash links (if any)
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Support form (prototype behavior only)
  const form = document.querySelector("[data-support-form]");
  const message = document.querySelector("[data-form-message]");
  if (form && message) {
    const setMsg = (text, tone = "neutral") => {
      message.textContent = text;
      message.style.color =
        tone === "ok"
          ? "rgba(11, 22, 48, 0.78)"
          : tone === "bad"
            ? "rgba(160, 0, 40, 0.78)"
            : "rgba(11, 22, 48, 0.74)";
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const fullName = String(data.get("fullName") || "").trim();
      const email = String(data.get("email") || "").trim();
      const description = String(data.get("description") || "").trim();

      if (!fullName || !email || !description) {
        setMsg("Please fill in your name, email, and issue description.", "bad");
        return;
      }

      // Fake ticket number
      const ticket = `ZON-${Math.floor(100000 + Math.random() * 900000)}`;
      setMsg(`Request submitted. Ticket ${ticket} created (prototype).`, "ok");
      form.reset();
      form.querySelector("#fullName")?.focus();
    });

    form.addEventListener("reset", () => setMsg(""));
  }
})();

