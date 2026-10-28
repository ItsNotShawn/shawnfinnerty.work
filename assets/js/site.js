(function () {
  "use strict";
  var root = document.documentElement;
  var motionOn = function () { return !root.classList.contains("no-motion"); };

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
    var i = 0, timer = null, paused = !motionOn(), hovering = false;
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
    var grid = document.querySelector(".pf-grid");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        if (grid && motionOn()) { grid.classList.remove("is-switching"); void grid.offsetWidth; grid.classList.add("is-switching"); }
        apply(b.dataset.filter, true);
      });
    });
    if (grid) grid.addEventListener("animationend", function () { grid.classList.remove("is-switching"); });
    var fromHash = function () { var h = location.hash.slice(1); if (h && h !== "about") apply(h, false); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  /* Picture settings menu (Glow / Fuzz / Scanlines / Motion), remembered per visitor */
  var fx = document.querySelector("[data-fx]");
  var fxListeners = [];
  if (fx) {
    var openBtn = fx.querySelector(".fx__open"), panel = fx.querySelector(".fx__panel");
    var rows = Array.prototype.slice.call(fx.querySelectorAll("[data-fx-key]"));
    var save = function () {
      var o = {};
      try { o = JSON.parse(localStorage.getItem("sf-fx") || "{}"); } catch (e) {}
      rows.forEach(function (r) { if (r.dataset.fxKey) o[r.dataset.fxKey] = r.getAttribute("aria-checked") === "true"; });
      try { localStorage.setItem("sf-fx", JSON.stringify(o)); } catch (e) {}
    };
    rows.forEach(function (r) {
      var k = r.dataset.fxKey;
      r.setAttribute("aria-checked", String(!root.classList.contains("no-" + k)));
      r.addEventListener("click", function () {
        var on = r.getAttribute("aria-checked") !== "true";
        r.setAttribute("aria-checked", String(on));
        root.classList.toggle("no-" + k, !on);
        save();
        fxListeners.forEach(function (fn) { fn(k, on); });
      });
    });
    var setOpen = function (o) {
      panel.hidden = !o;
      openBtn.setAttribute("aria-expanded", String(o));
      if (o) rows[0].focus();
    };
    openBtn.addEventListener("click", function () { setOpen(panel.hidden); });
    fx.querySelector("[data-fx-close]").addEventListener("click", function () { setOpen(false); openBtn.focus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setOpen(false); openBtn.focus(); } });
    document.addEventListener("click", function (e) { if (!panel.hidden && !fx.contains(e.target)) setOpen(false); });
  }

  /* Channel idents: loop videos play while on screen; scroll-mode videos scrub with the page */
  var vids = Array.prototype.slice.call(document.querySelectorAll("video[data-ident]"));
  if (vids.length) {
    var visible = new Set();
    var loops = vids.filter(function (v) { return v.dataset.ident !== "scroll"; });
    var scrubs = vids.filter(function (v) { return v.dataset.ident === "scroll"; });
    var syncLoops = function () {
      loops.forEach(function (v) {
        if (motionOn() && visible.has(v)) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
        syncLoops();
      }, { threshold: 0.2 });
      vids.forEach(function (v) { io.observe(v); });
    } else { vids.forEach(function (v) { visible.add(v); }); syncLoops(); }

    var ticking = false;
    var scrub = function () {
      ticking = false;
      if (!motionOn()) return;
      scrubs.forEach(function (v) {
        if (!visible.has(v) || !v.duration) return;
        // one full play-through per ~2 screen heights of scrolling, wrapping around
        var period = window.innerHeight * 2;
        var t = ((window.scrollY % period) / period) * v.duration;
        if (v.fastSeek) v.fastSeek(t); else v.currentTime = t;
      });
    };
    scrubs.forEach(function (v) { v.loop = false; v.addEventListener("loadedmetadata", scrub); });
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(scrub); } }, { passive: true });
    fxListeners.push(function (k) { if (k === "motion") { syncLoops(); scrub(); } });
  }


  /* Intensity: Low / Med / High (cycles), remembered with the other settings */
  var levelBtn = document.querySelector("[data-fx-level-btn]");
  if (levelBtn) {
    levelBtn.addEventListener("click", function () {
      var cur = parseInt(root.getAttribute("data-fx-level") || "3", 10);
      var next = cur >= 3 ? 1 : cur + 1;
      root.setAttribute("data-fx-level", String(next));
      try { var o = JSON.parse(localStorage.getItem("sf-fx") || "{}"); o.level = String(next); localStorage.setItem("sf-fx", JSON.stringify(o)); } catch (e) {}
    });
  }

  /* RGB split: each channel drifts AWAY from the mouse, by its own amount and angle
     (red farthest, blue less, green barely); together they add back up to white.
     Floaty: the split eases slowly toward where it wants to be (about a second to settle),
     and is stronger the farther the cursor is from the centre of the screen. */
  var rgbNodes = {};
  ["lg-r", "lg-g", "lg-b", "sm-r", "sm-g", "sm-b"].forEach(function (id) { rgbNodes[id] = document.querySelector('[data-rgb="' + id + '"]'); });
  var levelK = function () { return { "1": .6, "2": 1.1, "3": 1.8 }[root.getAttribute("data-fx-level") || "3"] || 1.8; };
  var CH = { r: { mag: 1, rot: 16 }, g: { mag: .3, rot: -35 }, b: { mag: .65, rot: -14 } };   // per-color personality
  var SIZE = { lg: 2.8, sm: .75 };                                                             // px at Intensity 1
  var EASE = 0.06;                                                                             // lower = floatier
  var REST = { x: -.7, y: -.25 };                                                              // no mouse: drift left, slightly up
  var cur = { x: REST.x, y: REST.y }, tgt = { x: REST.x, y: REST.y }, loop = null;
  var drawAt = function (v) {
    var k = levelK(), ang = Math.atan2(v.y, v.x), len = Math.hypot(v.x, v.y);
    Object.keys(SIZE).forEach(function (sz) {
      Object.keys(CH).forEach(function (c) {
        var n = rgbNodes[sz + "-" + c]; if (!n) return;
        var a = ang + CH[c].rot * Math.PI / 180, m = SIZE[sz] * CH[c].mag * k * len;
        n.setAttribute("dx", (Math.cos(a) * m).toFixed(2));
        n.setAttribute("dy", (Math.sin(a) * m).toFixed(2));
      });
    });
  };
  /* Following the cursor is something the visitor drives, so it isn't switched off by the Motion setting
     (or the system's reduce-animations preference); those only stop the ambient animations. */
  var tick = function () {
    var dx = tgt.x - cur.x, dy = tgt.y - cur.y;
    if (Math.abs(dx) + Math.abs(dy) < 0.004) {
      cur.x = tgt.x; cur.y = tgt.y; drawAt(cur); clearInterval(loop); loop = null; return;
    }
    cur.x += dx * EASE; cur.y += dy * EASE;
    drawAt(cur);
  };
  var wake = function () { if (!loop) loop = setInterval(tick, 33); };   // ~30 updates/sec, only while drifting
  drawAt(cur);
  var lvBtn = document.querySelector("[data-fx-level-btn]");
  if (lvBtn) lvBtn.addEventListener("click", function () { setTimeout(function () { drawAt(cur); }, 0); });

  if (document.body.classList.contains("theme-screen")) {
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;                       // finger drags don't steer it
      var lx = (e.clientX / window.innerWidth) * 2 - 1, ly = ((e.clientY / window.innerHeight) * 2 - 1) * .8;
      var len = Math.hypot(lx, ly);
      if (len < .08) { tgt.x = REST.x * .5; tgt.y = REST.y * .5; }
      else {
        var s = .55 + .45 * Math.min(len, 1);                      // farther from centre = stronger
        tgt.x = (-lx / len) * s; tgt.y = (-ly / len) * s;          // pointing away from the cursor
      }
      wake();
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", function () { tgt.x = REST.x; tgt.y = REST.y; wake(); });
  }
})();
