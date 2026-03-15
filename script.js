document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const serviceCards = document.querySelectorAll(".service-card");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");

  let activeTestimonial = 0;
  let testimonialTimer = null;

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) {
        return;
      }

      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      siteNav?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  serviceCards.forEach((card) => {
    const button = card.querySelector(".service-toggle");

    button?.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.textContent = isOpen ? "Hide deliverables" : "View deliverables";
    });
  });

  function showTestimonial(index) {
    testimonialCards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeTestimonial = index;
  }

  function startTestimonials() {
    if (!testimonialCards.length) {
      return;
    }

    testimonialTimer = window.setInterval(() => {
      const next = (activeTestimonial + 1) % testimonialCards.length;
      showTestimonial(next);
    }, 4500);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      window.clearInterval(testimonialTimer);
      showTestimonial(index);
      startTestimonials();
    });
  });

  showTestimonial(0);
  startTestimonials();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;
        const target = Number.parseInt(element.dataset.count || "0", 10);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 40));

        const tick = () => {
          current = Math.min(target, current + increment);
          element.textContent = current;

          if (current < target) {
            window.requestAnimationFrame(tick);
          }
        };

        tick();
        counterObserver.unobserve(element);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const business = String(data.get("business") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !business || !message) {
      formStatus.textContent = "Please fill in every field before sending.";
      formStatus.classList.add("is-error");
      return;
    }

    formStatus.textContent = `Thanks, ${name}. Your inquiry is ready to send. Connect this form to Formspree, Netlify Forms, or your CRM next.`;
    formStatus.classList.remove("is-error");
    contactForm.reset();
  });
});
