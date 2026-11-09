document.addEventListener("DOMContentLoaded", () => {
  // Project detail mapping data
  const details = {
    "project-n8n": [
      "Workflow automations in n8n",
      "Automations that take repetitive analyst work off the plate."
    ],
    "project-talk": [
      "Are dashboards still necessary with AI agents?",
      "A talk on what analysts keep, and what they hand over, once agents can answer questions directly."
    ]
  };

  // Single-Page Hash Routing
  function route() {
    const hash = (location.hash || "").slice(1) || "top";
    let view = "home";

    if (hash === "projects") {
      view = "projects";
    } else if (hash === "writing") {
      view = "writing";
    } else if (details[hash]) {
      view = "detail";
      document.getElementById("d-title").textContent = details[hash][0];
      document.getElementById("d-desc").textContent = details[hash][1];
    }

    document.body.setAttribute("data-view", view);

    // Update active nav state
    document.querySelectorAll("nav a").forEach((link) => {
      if (link.getAttribute("data-nav") === view) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Scroll positioning
    if (view === "home") {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", route);
  route();

  // Add Dynamic Feature 1: Header Shadow on Scroll
  const header = document.querySelector("header.top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Add Dynamic Feature 2: Smooth Scroll Reveal Animation
  const animateItems = document.querySelectorAll(".item, .entry");
  animateItems.forEach((item) => item.classList.add("fade-in"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  animateItems.forEach((item) => observer.observe(item));
});
