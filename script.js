(function () {
  "use strict";

  // Mobile navigation toggle
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Booking form handling
  var form = document.getElementById("bookForm");
  var status = document.getElementById("formStatus");

  if (form) {
    // Prevent past dates
    var dateInput = document.getElementById("date");
    if (dateInput) {
      var today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var name = document.getElementById("name").value.trim();
      status.textContent =
        "Thanks, " + name + "! We’ve received your request and will confirm your slot shortly via call or WhatsApp on +234 806 629 5902.";
      form.reset();

      if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
      }
    });
  }

  // Scroll reveal for sections
  var revealEls = document.querySelectorAll(
    ".section-head, .service-card, .stylist-card, .testimonial, .hero-copy, .hero-media, .book-copy, .book-form"
  );

  revealEls.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
