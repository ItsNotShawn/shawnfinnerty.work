(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* VCR tape counter on the homepage */
  var clock = document.querySelector("[data-osd-clock]");
  if (clock) {
    var start = Date.now();
    var tick = function () {
      var s = Math.floor((Date.now() - start) / 1000);
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      clock.textContent = h + ":" + String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
    };
    tick();
    setInterval(tick, 1000);
  }

  /* Now Playing carousel */
  var np = document.querySelector("[data-nowplaying]");
  if (np) {
    var slides = Array.prototype.slice.call(np.querySelectorAll(".np-slide"));
    var toggle = np.querySelector("[data-np-toggle]");
    var i = 0, timer = null, paused = reduceMotion, hovering = false;
    var show = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.hidden = k !== i; });
    };
    var schedule = function () {
      clearInterval(timer);
      if (!paused && !hovering && slides.length > 1) timer = setInterval(function () { show(i + 1); }, 6000);
    };
    var setPaused = function (p) {
      paused = p;
      if (toggle) {
        toggle.innerHTML = p ? "&#9654;" : "&#10074;&#10074;";
        toggle.setAttribute("aria-label", p ? "Play rotation" : "Pause rotation");
      }
      schedule();
    };
    np.querySelector("[data-np-prev]").addEventListener("click", function () { show(i - 1); schedule(); });
    np.querySelector("[data-np-next]").addEventListener("click", function () { show(i + 1); schedule(); });
    if (toggle) toggle.addEventListener("click", function () { setPaused(!paused); });
    np.addEventListener("mouseenter", function () { hovering = true; schedule(); });
    np.addEventListener("mouseleave", function () { hovering = false; schedule(); });
    np.addEventListener("focusin", function () { hovering = true; schedule(); });
    np.addEventListener("focusout", function () { hovering = false; schedule(); });
    if (slides.length < 2) np.querySelector(".nowplaying__controls").hidden = true;
    setPaused(paused);
  }

  /* Portfolio channel guide filter (supports links like /portfolio/#games) */
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  if (buttons.length) {
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-channels]"));
    var status = document.querySelector("[data-filter-status]");
    var apply = function (id, updateHash) {
      if (!buttons.some(function (b) { return b.dataset.filter === id; })) id = "all";
      var count = 0;
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === id)); });
      cards.forEach(function (c) {
        var match = id === "all" || c.dataset.channels.split(" ").indexOf(id) !== -1;
        c.hidden = !match;
        // featured cards only span two columns when showing everything
        c.classList.toggle("pf-card--featured", match && id === "all" && c.dataset.featured === "true");
        if (match) count++;
      });
      if (status) status.textContent = count + (count === 1 ? " project" : " projects") + " shown";
      if (updateHash) history.replaceState(null, "", id === "all" ? location.pathname : "#" + id);
    };
    cards.forEach(function (c) { c.dataset.featured = String(c.classList.contains("pf-card--featured")); });
    buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.filter, true); }); });
    var fromHash = function () { var h = location.hash.slice(1); if (h && h !== "about") apply(h, false); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }
})();
