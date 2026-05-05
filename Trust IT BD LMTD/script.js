"use strict";

/* DOM READY */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initCountUp();
  initForm();
  initBackToTop();
  initActiveNavLink();
});

/* ── 1. THEME TOGGLE (Dark / Light)*/
function initTheme() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // Load saved preference
  const saved = localStorage.getItem("tit-theme");
  if (saved === "light") applyLight();

  btn.addEventListener("click", () => {
    document.body.classList.contains("light") ? applyDark() : applyLight();
  });

  function applyLight() {
    document.body.classList.add("light");
    btn.textContent = "☀️";
    btn.setAttribute("aria-label", "Switch to dark mode");
    localStorage.setItem("tit-theme", "light");
  }

  function applyDark() {
    document.body.classList.remove("light");
    btn.textContent = "🌙";
    btn.setAttribute("aria-label", "Switch to light mode");
    localStorage.setItem("tit-theme", "dark");
  }
}

/* ── 2. NAVBAR SCROLL EFFECT*/
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── 3. HAMBURGER / MOBILE MENU */
function initHamburger() {
  const burger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  if (!burger || !mobileNav) return;

  burger.addEventListener("click", () => {
    const isOpen = burger.classList.toggle("open");
    mobileNav.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  function closeMobileMenu() {
    burger.classList.remove("open");
    mobileNav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  }
}

/* ── 4. SMOOTH SCROLL */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const navH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-h",
          ),
          10,
        ) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* ── 5. SCROLL REVEAL (IntersectionObserver) */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );

  items.forEach((el) => observer.observe(el));
}

/* ── 6. COUNT-UP ANIMATION  */
function initCountUp() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1800;
        let start = null;

        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => observer.observe(el));
}

/* ── 7. CONTACT FORM VALIDATION */
function initForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");
  if (!form) return;

  /* --- Helpers --- */
  const get = (id) => document.getElementById(id);

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    // Optional field — accepts BD numbers like 017XXXXXXXX or empty
    return (
      phone === "" || /^(\+?880|0)?1[3-9]\d{8}$/.test(phone.replace(/\s/g, ""))
    );
  }

  function setError(fieldId, errorId, condition) {
    const field = get(fieldId);
    const err = get(errorId);
    if (!field || !err) return condition;

    if (condition) {
      field.classList.add("error");
      err.classList.add("show");
    } else {
      field.classList.remove("error");
      err.classList.remove("show");
    }
    return condition;
  }

  /* --- Live blur validation --- */
  [
    {
      field: "name",
      error: "nameErr",
      check: () => get("name").value.trim().length < 2,
    },
    {
      field: "email",
      error: "emailErr",
      check: () => !isValidEmail(get("email").value.trim()),
    },
    {
      field: "phone",
      error: "phoneErr",
      check: () => !isValidPhone(get("phone").value.trim()),
    },
    {
      field: "message",
      error: "msgErr",
      check: () => get("message").value.trim().length < 20,
    },
  ].forEach(({ field, error, check }) => {
    const el = get(field);
    if (el) {
      el.addEventListener("blur", () => setError(field, error, check()));
      el.addEventListener("input", () => {
        // Clear error on typing
        el.classList.remove("error");
        get(error)?.classList.remove("show");
      });
    }
  });

  /* --- Submit --- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameVal = get("name")?.value.trim() ?? "";
    const emailVal = get("email")?.value.trim() ?? "";
    const phoneVal = get("phone")?.value.trim() ?? "";
    const msgVal = get("message")?.value.trim() ?? "";

    const e1 = setError("name", "nameErr", nameVal.length < 2);
    const e2 = setError("email", "emailErr", !isValidEmail(emailVal));
    const e3 = setError("phone", "phoneErr", !isValidPhone(phoneVal));
    const e4 = setError("message", "msgErr", msgVal.length < 20);

    if (e1 || e2 || e3 || e4) {
      // Scroll to first error
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
      return;
    }

    /* Simulate async submission */
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    await new Promise((resolve) => setTimeout(resolve, 1500));

    form.style.display = "none";
    success.classList.add("show");
  });
}

/* ── 8. BACK TO TOP BUTTON */
function initBackToTop() {
  const btn = document.getElementById("back-top");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── 9. ACTIVE NAV LINK ON SCROLL */
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a[href^='#']");
  if (!sections.length || !links.length) return;

  const navH = 80;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id,
            );
          });
        }
      });
    },
    { rootMargin: `-${navH}px 0px -55% 0px`, threshold: 0 },
  );

  sections.forEach((s) => observer.observe(s));
}

// careers
function applyJob(title) {
  document.getElementById("applyForm").style.display = "block";
  document.getElementById("jobTitle").innerText = title;
}
document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault(); // page reload off

  // form hide
  this.style.display = "none";

  // success message show
  document.getElementById("successMsg").style.display = "block";
});
