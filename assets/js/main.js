(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var get = function (path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S);
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Textos simples ---------- */
  $$("[data-bind]").forEach(function (el) {
    var v = get(el.getAttribute("data-bind"));
    if (typeof v === "string") el.textContent = v;
  });
  $$('[data-bind-full="brand"]').forEach(function (el) {
    el.textContent = S.brand.name + " " + S.brand.suffix;
  });
  document.title = S.brand.name + " " + S.brand.suffix;
  $("#year").textContent = new Date().getFullYear();

  var t = S.hero.title || [];
  if (t.length) {
    $("#hero-title").innerHTML =
      '<em class="block">' + esc(t[0]) + "</em>" +
      (t[1] ? "<strong>" + esc(t[1]) + "</strong>" : "");
  }

  /* ---------- Logo ---------- */
  $$("img[src$='logo.png']").forEach(function (img) {
    if (S.brand.logo) img.src = S.brand.logo;
    if (img.alt) img.alt = S.brand.name + " " + S.brand.suffix;
  });

  /* ---------- Medios con placeholder ---------- */
  function mediaBlock(src, title, alt, focus) {
    var wrap = document.createElement("div");
    wrap.className = "media";
    wrap.innerHTML =
      '<div class="ph"><span class="ph-title">' + esc(title) + "</span></div>";
    if (src) {
      var img = new Image();
      img.alt = alt || title;
      img.loading = "lazy";
      img.decoding = "async";
      img.onload = function () { img.classList.add("is-loaded"); wrap.classList.add("has-img"); };
      img.onerror = function () { img.remove(); };
      if (focus) img.style.objectPosition = focus;
      img.src = src;
      wrap.appendChild(img);
    }
    return wrap;
  }

  /* ---------- Reel del hero ---------- */
  var video = $("#hero-video");
  var reel = S.hero.reel || {};
  if (video && reel.src) {
    if (reel.poster) {
      var p = new Image();
      p.onload = function () {
        video.poster = reel.poster;
        var ph = $(".hero-placeholder");
        ph.style.background = "url('" + reel.poster + "') center / cover no-repeat";
        ph.style.animation = "none";
      };
      p.src = reel.poster;
    }
    if (reel.srcWebm) {
      var s1 = document.createElement("source");
      s1.src = reel.srcWebm; s1.type = "video/webm";
      video.appendChild(s1);
    }
    var s2 = document.createElement("source");
    s2.src = reel.src; s2.type = "video/mp4";
    video.appendChild(s2);
    video.addEventListener("loadeddata", function () {
      video.classList.add("is-ready");
      if (reduceMotion) video.pause();
    });
    video.load();
  }


  /* ---------- Galería ---------- */
  var gallery = $("#gallery");
  var visibleProjects = S.projects.filter(function (p) { return !p.oculto; });
  var filtersEl = $("#filters");
  var active = "Todo";
  var RATIO = { tall: 5 / 4, wide: 10 / 16, square: 1 };

  function projectCard(p) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";
    btn.setAttribute("data-layout", p.layout || "square");
    btn.setAttribute("aria-label", p.title + ", " + p.category + ". Ver detalles");
    btn.appendChild(mediaBlock(p.cover, p.title, p.title, p.focus));

    var badge = p.ejemplo
      ? '<span class="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-md bg-cocoa-900/60 border border-peach/10 text-smoke">Ejemplo</span>'
      : "";
    var html =
      badge +
      '<div class="caption-rest absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">' +
        '<span class="font-display text-2xl sm:text-3xl leading-none drop-shadow">' + esc(p.title) + "</span>" +
        '<span class="text-[11px] uppercase tracking-[0.2em] text-paper/80 num">' + esc(p.year) + "</span>" +
      "</div>" +
      '<div class="overlay rounded-2xl backdrop-blur-md bg-cocoa-900/60 border border-peach/10 p-5">' +
        '<div class="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-smoke">' +
          "<span>" + esc(p.category) + '</span><span class="num">' + esc(p.year) + "</span></div>" +
        '<p class="font-display text-2xl sm:text-3xl mt-2 leading-tight">' + esc(p.title) + "</p>" +
        '<p class="text-[13px] text-smoke mt-1">' + esc(p.client) + " · " + esc(p.role) + "</p>" +
        '<span class="inline-flex items-center gap-2 text-[13px] mt-4">Ver proyecto <span aria-hidden="true">→</span></span>' +
      "</div>";
    btn.insertAdjacentHTML("beforeend", html);
    btn.addEventListener("click", function () { openProject(p); });
    return btn;
  }

  function renderGallery() {
    var list = visibleProjects.filter(function (p) { return active === "Todo" || p.category === active; });
    gallery.innerHTML = "";
    var twoCols = window.matchMedia("(min-width: 768px)").matches;
    var cols = [document.createElement("div"), document.createElement("div")];
    cols.forEach(function (c) { c.className = "gallery-col"; });
    var heights = [0, 0.17];   // la columna derecha empieza más abajo
    var widths = [7, 5];

    list.forEach(function (p, i) {
      var card = projectCard(p);
      card.setAttribute("data-reveal", "");
      card.style.setProperty("--d", (i % 2) * 90 + "ms");
      if (!twoCols) { cols[0].appendChild(card); return; }
      var target = heights[0] <= heights[1] ? 0 : 1;
      cols[target].appendChild(card);
      heights[target] += widths[target] * (RATIO[p.layout] || 1) / 7 + 0.04;
    });

    gallery.appendChild(cols[0]);
    if (twoCols && cols[1].children.length) gallery.appendChild(cols[1]);
    if (!list.length) {
      gallery.innerHTML = '<p class="text-smoke">Aún no hay proyectos en esta categoría.</p>';
    }
    observeReveals(gallery);
  }

  var cats = ["Todo"];
  visibleProjects.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
  if (visibleProjects.length < 6 || cats.length < 3) filtersEl.hidden = true;
  cats.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = c;
    b.setAttribute("aria-pressed", c === active ? "true" : "false");
    b.addEventListener("click", function () {
      active = c;
      $$(".chip", filtersEl).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      renderGallery();
    });
    filtersEl.appendChild(b);
  });

  var lastTwo = window.matchMedia("(min-width: 768px)").matches;
  window.addEventListener("resize", function () {
    var now = window.matchMedia("(min-width: 768px)").matches;
    if (now !== lastTwo) { lastTwo = now; renderGallery(); }
  });

  /* ---------- Modal de proyecto ---------- */
  var dialog = $("#project-dialog");
  function embedUrl(url) {
    if (!url) return "";
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] + "?rel=0&modestbranding=1";
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return "https://player.vimeo.com/video/" + vm[1] + "?title=0&byline=0&portrait=0";
    return "";
  }
  function openProject(p) {
    var media = $("#pd-media");
    media.innerHTML = "";
    var src = embedUrl(p.video);
    if (src) {
      media.innerHTML = '<iframe class="absolute inset-0 w-full h-full" src="' + esc(src) +
        '" title="' + esc(p.title) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else {
      media.appendChild(mediaBlock(p.cover, p.title));
    }
    var shots = [p.cover].concat(p.gallery || []).filter(Boolean);
    var thumbs = $("#pd-thumbs");
    thumbs.hidden = src || shots.length < 2;
    thumbs.innerHTML = shots.map(function (u, i) {
      return '<button type="button" class="pd-thumb" data-src="' + esc(u) + '" aria-current="' + (i === 0) +
        '" aria-label="Ver imagen ' + (i + 1) + '"><img src="' + esc(u) + '" alt="" loading="lazy"></button>';
    }).join("");
    $$(".pd-thumb", thumbs).forEach(function (b) {
      b.addEventListener("click", function () {
        media.innerHTML = "";
        media.appendChild(mediaBlock(b.getAttribute("data-src"), p.title));
        $$(".pd-thumb", thumbs).forEach(function (x) { x.setAttribute("aria-current", String(x === b)); });
      });
    });
    $("#pd-cat").textContent = p.category + (p.ejemplo ? " · Ejemplo" : "");
    $("#pd-title").textContent = p.title;
    $("#pd-summary").textContent = p.summary || "";
    var rows = [["Cliente", p.client], ["Año", p.year], ["Servicio", p.role]];
    var metaHtml = rows.map(function (r) {
      return '<div class="flex justify-between gap-6 py-3 border-t border-peach/10"><dt class="text-ash">' + esc(r[0]) +
        '</dt><dd class="text-right num">' + esc(r[1]) + "</dd></div>";
    }).join("");
    if (p.video) {
      metaHtml += '<a class="btn btn-ghost mt-6" href="' + esc(p.video) + '" target="_blank" rel="noopener">Abrir video <span class="arrow" aria-hidden="true">↗</span></a>';
    }
    $("#pd-meta").innerHTML = metaHtml;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeProject() {
    $("#pd-media").innerHTML = "";
    if (dialog.open) dialog.close();
  }
  $("#pd-close").addEventListener("click", closeProject);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closeProject(); });
  dialog.addEventListener("close", function () { $("#pd-media").innerHTML = ""; });

  /* ---------- Quiénes somos ---------- */
  var team = S.team || { intro: [], people: [] };
  $("#team-intro").innerHTML = team.intro.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("#team").innerHTML = team.people.map(function (m, i) {
    return '<article class="rounded-3xl backdrop-blur-md bg-cocoa-900/60 border border-peach/10 p-6 sm:p-7 flex flex-col gap-5 transition-all duration-300 ease-in-out hover:border-peach/30' +
      (i % 2 ? " sm:mt-10" : "") + '">' +
      '<div class="team-photo" data-photo="' + esc(m.photo || "") + '" hidden></div>' +
      "<div>" +
        '<p class="eyebrow !text-peach mb-2">' + esc(m.role) + "</p>" +
        '<h3 class="font-display text-3xl leading-tight">' + esc(m.name) + "</h3>" +
        '<p class="mt-3 text-smoke leading-relaxed">' + esc(m.bio) + "</p>" +
      "</div>" +
    "</article>";
  }).join("");
  $$(".team-photo").forEach(function (box) {
    var src = box.getAttribute("data-photo");
    if (!src) return;
    var img = new Image();
    img.alt = "";
    img.onload = function () { box.appendChild(img); box.hidden = false; };
    img.src = src;
  });

  /* ---------- Servicios (acordeón) ---------- */
  $("#services").innerHTML = S.services.map(function (s, i) {
    var id = "svc-" + i;
    return '<div class="acc-item">' +
      '<button class="acc-btn" type="button" aria-expanded="' + (i === 0) + '" aria-controls="' + id + '">' +
        '<span class="acc-title font-display text-3xl sm:text-4xl leading-tight">' + esc(s.title) + "</span>" +
        '<span class="acc-icon relative" aria-hidden="true"><span></span><span></span></span>' +
      "</button>" +
      '<div class="acc-panel" id="' + id + '" role="region"><div>' +
        '<div class="pb-8 max-w-xl">' +
          '<p class="text-smoke leading-relaxed">' + esc(s.body) + "</p>" +
          '<ul class="mt-5 flex flex-wrap gap-2">' + (s.deliverables || []).map(function (d) {
            return '<li class="text-[12px] px-3 py-1.5 rounded-full border border-peach/10 text-paper/85">' + esc(d) + "</li>";
          }).join("") + "</ul>" +
        "</div>" +
      "</div></div>" +
    "</div>";
  }).join("");
  $$(".acc-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") === "true" ? "false" : "true");
    });
  });

  /* ---------- Contacto ---------- */
  var email = S.contact.email;
  $("#email-text").textContent = email;
  $("#copy-email").addEventListener("click", function () {
    var b = this;
    var done = function () { b.textContent = "Copiado"; setTimeout(function () { b.textContent = "Copiar"; }, 1800); };
    var fallback = function () {
      var r = document.createRange(); r.selectNodeContents($("#email-text"));
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      b.textContent = "Seleccionado";
    };
    try {
      navigator.clipboard.writeText(email).then(done, fallback);
    } catch (e) { fallback(); }
  });

  var socialsHtml = (S.socials || []).filter(function (s) { return s.url; }).map(function (s) {
    return '<li><a class="chip inline-flex gap-2" href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
      esc(s.label) + (s.handle ? ' <span class="text-ash">' + esc(s.handle) + "</span>" : "") +
      ' <span aria-hidden="true">↗</span></a></li>';
  });
  $("#socials").innerHTML = socialsHtml.join("");
  $("#socials").hidden = !socialsHtml.length;

  var footerSocials = (S.socials || []).filter(function (s) { return s.url; });
  $("#footer-socials").innerHTML = footerSocials.map(function (s) {
    return '<li><a class="nav-link transition-all duration-300 ease-in-out" href="' + esc(s.url) +
      '" target="_blank" rel="noopener">' + esc(s.label) + "</a></li>";
  }).join("");

  /* ---------- WhatsApp ---------- */
  var waNumber = String(S.contact.whatsapp || "").replace(/\D/g, "");
  function waUrl(text) {
    return "https://wa.me/" + waNumber + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  if (waNumber) {
    var waDefault = waUrl(S.contact.whatsappMessage);
    $("#wa-text").textContent = S.contact.whatsappDisplay || "+" + waNumber;
    $("#wa-link").href = waDefault;
    $("#wa-block").hidden = false;
    $("#wa-submit").hidden = false;
    if (!S.contact.formEndpoint) {
      $("#email-submit").hidden = true;
      $("#wa-submit").className = "btn btn-solid justify-center";
      $("#wa-submit").innerHTML = 'Enviar por WhatsApp <span class="arrow" aria-hidden="true">→</span>';
    }

    var heroContact = $("#hero-contact");
    if (heroContact) {
      heroContact.href = waDefault;
      heroContact.target = "_blank";
      heroContact.rel = "noopener";
      heroContact.setAttribute("aria-label", "Cotiza tu proyecto por WhatsApp");
    }

    var waFloat = $("#wa-float");
    waFloat.href = waDefault;
    waFloat.hidden = false;
    var toggleFloat = function () {
      waFloat.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", toggleFloat, { passive: true });
    toggleFloat();
  }

  $("#f-type").innerHTML = (S.contact.projectTypes || []).map(function (t) {
    return "<option>" + esc(t) + "</option>";
  }).join("");

  var form = $("#contact-form");
  var status = $("#form-status");
  function setError(id, msg) {
    var el = $('[data-error-for="' + id + '"]');
    if (!el) return;
    el.textContent = msg || "";
    el.hidden = !msg;
  }
  ["f-name", "f-email", "f-msg"].forEach(function (id) {
    $("#" + id).addEventListener("input", function () { setError(id, ""); });
  });
  function validate(requireEmail) {
    var name = $("#f-name").value.trim();
    var mail = $("#f-email").value.trim();
    var msg = $("#f-msg").value.trim();
    var ok = true;
    if (!name) { setError("f-name", "Escribe tu nombre."); ok = false; }
    if ((requireEmail || mail) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setError("f-email", "Escribe un correo válido, por ejemplo ana@tumarca.mx."); ok = false;
    }
    if (msg.length < 10) { setError("f-msg", "Cuéntame un poco más del proyecto."); ok = false; }
    return ok ? { name: name, mail: mail, msg: msg } : null;
  }

  $("#wa-submit").addEventListener("click", function () {
    if (!waNumber) return;
    var v = validate(false);
    if (!v) return;
    var date = $("#f-date").value;
    var lines = [
      "Hola, soy " + v.name + ".",
      "Proyecto: " + $("#f-type").value + (date ? " · Fecha tentativa: " + date : ""),
      "",
      v.msg,
    ];
    if (v.mail) lines.push("", "Correo: " + v.mail);
    var a = document.createElement("a");
    a.href = waUrl(lines.join("\n"));
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    status.textContent = "Abriendo WhatsApp con tu mensaje. Si no se abre, escríbenos al " + (S.contact.whatsappDisplay || "+" + waNumber) + ".";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = validate(true);
    if (!v) return;
    var name = v.name;

    var data = new FormData(form);
    if (S.contact.formEndpoint) {
      status.textContent = "Enviando…";
      fetch(S.contact.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = "Gracias, " + name + ". Te respondemos en menos de 48 horas.";
        })
        .catch(function () {
          status.textContent = "No se pudo enviar. Escríbenos directo a " + email + ".";
        });
    } else {
      status.textContent = "Por ahora escríbenos directo a " + email + " con estos datos.";
    }
  });

  /* ---------- Menú móvil ---------- */
  var menuBtn = $("#menu-btn"), menu = $("#mobile-menu");
  menuBtn.addEventListener("click", function () {
    var open = menu.hidden;
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("[data-close-menu]").forEach(function (a) {
    a.addEventListener("click", function () { menu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); });
  });

  /* Sección activa en el menú */
  var links = $$(".nav-link[href^='#']");
  if ("IntersectionObserver" in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.setAttribute("aria-current", l.getAttribute("href") === "#" + en.target.id ? "true" : "false"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["trabajo", "nosotros", "servicios", "contacto"].forEach(function (id) { var s = document.getElementById(id); if (s) secObs.observe(s); });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  var revealObs = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove("is-pending"); revealObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  }
  function observeReveals(root) {
    if (!revealObs) return;
    var vh = window.innerHeight;
    $$("[data-reveal]", root).forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) return; // lo que ya está en pantalla se queda visible
      el.classList.add("is-pending");
      revealObs.observe(el);
    });
  }

  renderGallery();
  observeReveals(document);

  /* Entrada del titular del hero */
  if (!reduceMotion) {
    var ht = $("#hero-title");
    ht.classList.add("is-pending");
    requestAnimationFrame(function () { requestAnimationFrame(function () { ht.classList.remove("is-pending"); }); });
  }
})();
