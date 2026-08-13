/* ==========================================================================
   Dawson Landscaping & Maintenance — Front-end behaviour
   1. Sticky header state
   2. Mobile navigation toggle
   3. Scroll reveal animations
   4. Before / After comparison slider
   5. Testimonial slider
   6. Quote form submission (demo handler)
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------- 1. Sticky header state */
  var header = document.querySelector(".site-header");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------ 2. Mobile navigation toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------ 3. Scroll reveal animations */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(function () {
            entry.target.classList.add("is-visible");
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* -------------------------------------- 4. Before / After image slider */
  var compare = document.querySelector(".compare");
  var compareBefore = document.querySelector(".compare__before");
  var compareHandle = document.querySelector(".compare__handle");
  var compareRange = document.querySelector(".compare-range");

  function setComparePosition(value) {
    var pos = Math.max(0, Math.min(100, value));
    if (compareBefore) compareBefore.style.clipPath = "inset(0 " + (100 - pos) + "% 0 0)";
    if (compareHandle) compareHandle.style.left = pos + "%";
    if (compareRange) compareRange.value = String(Math.round(pos));
  }

  if (compare) {
    var dragging = false;

    var fromClientX = function (clientX) {
      var rect = compare.getBoundingClientRect();
      setComparePosition(((clientX - rect.left) / rect.width) * 100);
    };

    compare.addEventListener("pointerdown", function (event) {
      dragging = true;
      compare.setPointerCapture(event.pointerId);
      fromClientX(event.clientX);
    });

    compare.addEventListener("pointermove", function (event) {
      if (dragging) fromClientX(event.clientX);
    });

    ["pointerup", "pointercancel"].forEach(function (type) {
      compare.addEventListener(type, function () {
        dragging = false;
      });
    });
  }

  if (compareRange) {
    compareRange.addEventListener("input", function (event) {
      setComparePosition(Number(event.target.value));
    });
  }

  /* ------------------------------------------------ 5. Testimonial slider */
  var slides = Array.prototype.slice.call(document.querySelectorAll("[data-review]"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("[data-review-dot]"));
  var prevBtn = document.querySelector("[data-review-prev]");
  var nextBtn = document.querySelector("[data-review-next]");
  var current = 0;
  var timer;

  function showReview(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.hidden = i !== current;
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-current", String(i === current));
    });
  }

  function startAutoplay() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      showReview(current + 1);
    }, 6500);
  }

  if (slides.length) {
    showReview(0);
    startAutoplay();

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        showReview(current - 1);
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        showReview(current + 1);
        startAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showReview(i);
        startAutoplay();
      });
    });
  }

  /* -------------------------------------------------- 6. Quote form demo */
  /* Replace the timeout below with a real POST to your mail handler,
     e.g. fetch("/send-quote.php", { method: "POST", body: new FormData(form) }) */
  document.querySelectorAll(".quote-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var status = form.querySelector(".form-status");
      var label = button ? button.textContent : "";

      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }

      window.setTimeout(function () {
        form.reset();
        if (button) {
          button.disabled = false;
          button.textContent = label;
        }
        if (status) {
          status.textContent = "Thanks! We'll call you back within 1 business hour.";
        }
      }, 700);
    });
  });
})();
