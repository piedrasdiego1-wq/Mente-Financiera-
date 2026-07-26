// Mente Financiera — comportamiento base del sitio

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Aviso de cookies
  var banner = document.getElementById("cookie-banner");
  var acceptBtn = document.getElementById("cookie-accept");
  var consent = localStorage.getItem("mf_cookie_consent");

  if (banner && !consent) {
    banner.classList.add("visible");
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("mf_cookie_consent", "true");
      banner.classList.remove("visible");
    });
  }
});
