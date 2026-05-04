/**
 * Optional "pull a card" deck — include script + <div id="play-footer-deck-root"></div> where it should mount.
 */
(function () {
  "use strict";

  var ACCENT = "#000000";
  var ROOT_ID = "play-footer-deck-root";

  /** @type {{ tag: string, pillBg: string, pillColor: string, quote: string, subtitle?: string }[]} */
  var PLAY_FOOTER_CARDS = [
    { tag: "MHCI+D", pillBg: "#e3eef6", pillColor: "#1e3a5f", quote: "I'm in the UW MHCI+D program — human-centered design with engineers and researchers in the same room.", subtitle: "Seattle, rain, and a lot of sticky notes." },
    { tag: "Research", pillBg: "#f0e8f4", pillColor: "#5b3d6b", quote: "The best insight usually shows up after you stop trying to sound smart and start listening for hesitation.", subtitle: "Silence is data too." },
    { tag: "Product", pillBg: "#e8f4ea", pillColor: "#2d5a3d", quote: "I like shipping enough to feel the edge cases — not so much that I confuse motion with progress.", subtitle: "Small loops, honest scope." },
    { tag: "Play", pillBg: "#fdf3e4", pillColor: "#8a5a1c", quote: "This page exists because not everything I care about fits in a case study PDF.", subtitle: "Writing, making, wandering on purpose." },
    { tag: "Matcha", pillBg: "#e8f6f0", pillColor: "#2f6b52", quote: "If you email me about matcha spots in Seattle, I will take it as a serious design brief.", subtitle: "Ceremonial-grade curiosity." },
    { tag: "Access", pillBg: "#e8eef8", pillColor: "#314a7a", quote: "Accessibility isn't a checklist pass — it's noticing who gets quietly excluded when we optimize for the default.", subtitle: "From an article I still mean." },
    { tag: "AI + design", pillBg: "#f2f2f7", pillColor: "#3a3a45", quote: "AI tools changed my speed; they didn't replace my judgment. The craft is in what you refuse to automate away.", subtitle: "Workflows evolve, taste doesn't." },
    { tag: "Communities", pillBg: "#fceee8", pillColor: "#7a3a28", quote: "Some problems only make sense when you design with the people who live them — not for them as an abstract audience.", subtitle: "Maps, trust, and messy reality." },
    { tag: "Hot take", pillBg: "#fff4e5", pillColor: "#8a4b00", quote: "If your research only produces quotes you could have guessed, you didn't go deep enough.", subtitle: "Polite but true." },
    { tag: "Collaboration", pillBg: "#e6f4f8", pillColor: "#1a5f6e", quote: "The best teams disagree kindly in front of the work — not behind it.", subtitle: "Critique is a gift when it's specific." },
    { tag: "Seattle", pillBg: "#e5edf5", pillColor: "#2c4a66", quote: "Grey skies make high-contrast typography feel like home.", subtitle: "Environmental cue, half joke." },
    { tag: "Story", pillBg: "#f5ebe8", pillColor: "#6b4a3d", quote: "People don't remember bullet points; they remember the moment the room leaned in.", subtitle: "Narrative is interface." },
    { tag: "Shipping", pillBg: "#eaf6ec", pillColor: "#356842", quote: "A prototype in the browser beats a perfect deck in the folder.", subtitle: "Bias toward contact with reality." },
    { tag: "Detail", pillBg: "#eeeaf8", pillColor: "#4a3d7a", quote: "Microcopy is where empathy becomes concrete — one line can undo ten minutes of confusion.", subtitle: "Words are design." },
    { tag: "Learning", pillBg: "#e8f2fc", pillColor: "#254a7a", quote: "Grad school didn't give me answers; it gave me better questions and faster ways to test them.", subtitle: "Still in progress." },
    { tag: "Systems", pillBg: "#eef1f5", pillColor: "#374151", quote: "I enjoy making complex things legible — telecom, payments, safety tools — without flattening the nuance.", subtitle: "Clarity without dumbing down." },
    { tag: "Honesty", pillBg: "#fce8ec", pillColor: "#7a2842", quote: "I'd rather say 'I don't know yet' than defend a guess dressed as certainty.", subtitle: "Trust compounds." },
    { tag: "Hello", pillBg: "#e8faf3", pillColor: "#1d6b4d", quote: "If something here resonated, I'd love to hear what you're building.", subtitle: "Seriously — say hi." },
  ];

  var DECK_CSS =
    "#" +
    ROOT_ID +
    " { --pfd-accent: " +
    ACCENT +
    "; font-family: 'General Sans', Arial, sans-serif; }\n" +
    "#" +
    ROOT_ID +
    " .pfd-wrap { max-width: 380px; margin: 0 auto; }\n" +
    "@media (min-width: 901px) { #" +
    ROOT_ID +
    " .pfd-wrap { margin: 0 0 0 auto; } }\n" +
    "#" +
    ROOT_ID +
    " .pfd-stage { position: relative; min-height: 420px; perspective: 1200px; }\n" +
    "#" +
    ROOT_ID +
    " .pfd-card {\n" +
    "  position: absolute; left: 0; right: 0; top: 0;\n" +
    "  border-radius: 18px; border: 1px solid rgba(17,24,39,0.08);\n" +
    "  background: #fff; box-shadow: 0 18px 50px rgba(17,24,39,0.08);\n" +
    "  min-height: 400px; padding: 28px 24px 24px;\n" +
    "  display: flex; flex-direction: column; align-items: center; text-align: center;\n" +
    "  cursor: pointer; user-select: none;\n" +
    "  -webkit-tap-highlight-color: transparent;\n" +
    "  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease;\n" +
    "  transform-origin: 50% 60%;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-card:focus-visible { outline: 2px solid var(--pfd-accent); outline-offset: 4px; }\n" +
    "#" +
    ROOT_ID +
    " .pfd-card.pfd-fly-out {\n" +
    "  pointer-events: none;\n" +
    "  transform: translateY(-115%) rotate(-7deg) scale(0.92);\n" +
    "  opacity: 0;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-card.pfd-fly-in-start {\n" +
    "  transform: translateY(55%) scale(0.94) rotate(4deg);\n" +
    "  opacity: 0;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-card.pfd-fly-in-end {\n" +
    "  transform: translateY(0) scale(1) rotate(0deg);\n" +
    "  opacity: 1;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-photo {\n" +
    "  width: 112px; height: 112px; border-radius: 50%; object-fit: cover;\n" +
    "  border: 3px solid rgba(27, 42, 107,0.35); margin-bottom: 18px;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-name {\n" +
    "  font-size: 15px; font-weight: 600; letter-spacing: 0.04em;\n" +
    "  text-transform: lowercase; color: #111827; margin-bottom: 10px;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-hint {\n" +
    "  font-size: 14px; color: #6b7280; line-height: 1.5; max-width: 220px;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-hint em { font-style: normal; font-weight: 600; color: var(--pfd-accent); }\n" +
    "#" +
    ROOT_ID +
    " .pfd-pill {\n" +
    "  display: inline-block; font-size: 10px; font-weight: 600;\n" +
    "  letter-spacing: 0.12em; text-transform: uppercase;\n" +
    "  padding: 7px 14px; border-radius: 999px; margin-bottom: 20px;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-quote {\n" +
    "  font-size: 17px; font-weight: 600; color: #111827; line-height: 1.45;\n" +
    "  letter-spacing: -0.02em; text-align: left; width: 100%;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-sub {\n" +
    "  margin-top: 16px; font-size: 14px; color: #6b7280; line-height: 1.5;\n" +
    "  font-style: italic; text-align: left; width: 100%;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-toolbar {\n" +
    "  display: flex; align-items: center; justify-content: space-between;\n" +
    "  gap: 12px; margin-top: 22px; flex-wrap: wrap;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-count {\n" +
    "  font-size: 12px; color: #6b7280; font-weight: 500;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-count b { color: #111827; font-weight: 600; }\n" +
    "#" +
    ROOT_ID +
    " .pfd-shuffle {\n" +
    "  font-family: inherit; font-size: 12px; font-weight: 600;\n" +
    "  letter-spacing: 0.06em; text-transform: uppercase;\n" +
    "  padding: 10px 18px; border-radius: 999px;\n" +
    "  border: 1px solid rgba(27, 42, 107,0.45); background: rgba(27, 42, 107,0.12);\n" +
    "  color: #2f5c45; cursor: pointer; transition: background 0.2s, border-color 0.2s;\n" +
    "}\n" +
    "#" +
    ROOT_ID +
    " .pfd-shuffle:hover { background: rgba(27, 42, 107,0.2); border-color: rgba(27, 42, 107,0.65); }\n" +
    "#" +
    ROOT_ID +
    " .pfd-shuffle:focus-visible { outline: 2px solid var(--pfd-accent); outline-offset: 2px; }\n" +
    "#" +
    ROOT_ID +
    " .pfd-label {\n" +
    "  font-size: 10px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;\n" +
    "  color: #9ca3af; margin-bottom: 12px; width: 100%; text-align: left;\n" +
    "}\n" +
    ".play-site-footer { background: #f0efe8 !important; }\n" +
    ".play-site-footer__inner {\n" +
    "  max-width: 1120px; margin: 0 auto; padding: 0 40px;\n" +
    "  display: grid; grid-template-columns: 1fr 1fr;\n" +
    "  gap: clamp(32px, 5vw, 56px); align-items: start;\n" +
    "  font-family: 'General Sans', Arial, sans-serif;\n" +
    "}\n" +
    ".play-site-footer__left { min-width: 0; max-width: 680px; }\n" +
    ".play-site-footer__right { min-width: 0; }\n" +
    "@media (max-width: 900px) {\n" +
    "  .play-site-footer__inner { grid-template-columns: 1fr; }\n" +
    "}\n";

  function shuffle(arr) {
    var a = arr.slice();
    var i = a.length;
    var j, t;
    while (i) {
      j = Math.floor(Math.random() * i--);
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function injectCss() {
    if (document.getElementById("play-footer-deck-styles")) return;
    var el = document.createElement("style");
    el.id = "play-footer-deck-styles";
    el.textContent = DECK_CSS;
    document.head.appendChild(el);
  }

  function buildBackFace() {
    var card = document.createElement("div");
    card.className = "pfd-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Pull a card — tap to learn something");
    card.dataset.face = "back";

    var img = document.createElement("img");
    img.className = "pfd-photo";
    img.src = "/photo.png";
    img.alt = "Kanishka Balaji";
    img.width = 112;
    img.height = 112;
    img.decoding = "async";

    var name = document.createElement("div");
    name.className = "pfd-name";
    name.textContent = "kanishka balaji";

    var hint = document.createElement("p");
    hint.className = "pfd-hint";
    hint.innerHTML = "<em>tap</em> to learn something";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(hint);
    return card;
  }

  function buildFaceCard(data) {
    var card = document.createElement("div");
    card.className = "pfd-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Card: " + data.tag + ". Tap for next.");
    card.dataset.face = "face";

    var pill = document.createElement("span");
    pill.className = "pfd-pill";
    pill.textContent = data.tag;
    pill.style.background = data.pillBg;
    pill.style.color = data.pillColor;

    var quote = document.createElement("p");
    quote.className = "pfd-quote";
    quote.textContent = data.quote;

    card.appendChild(pill);
    card.appendChild(quote);

    if (data.subtitle) {
      var sub = document.createElement("p");
      sub.className = "pfd-sub";
      sub.textContent = data.subtitle;
      card.appendChild(sub);
    }

    return card;
  }

  function init() {
    var root = document.getElementById(ROOT_ID);
    if (!root) return;

    injectCss();

    var deckOrder = shuffle(PLAY_FOOTER_CARDS);
    var faceIndex = 0;
    var showingBack = true;
    var tapCount = 0;
    var busy = false;

    var wrap = document.createElement("div");
    wrap.className = "pfd-wrap";

    var label = document.createElement("div");
    label.className = "pfd-label";
    label.textContent = "Pull a card";

    var stage = document.createElement("div");
    stage.className = "pfd-stage";

    var toolbar = document.createElement("div");
    toolbar.className = "pfd-toolbar";

    var countEl = document.createElement("div");
    countEl.className = "pfd-count";
    function renderCount() {
      countEl.innerHTML = "Cards pulled: <b>" + tapCount + "</b>";
    }
    renderCount();

    var shuffleBtn = document.createElement("button");
    shuffleBtn.type = "button";
    shuffleBtn.className = "pfd-shuffle";
    shuffleBtn.textContent = "Shuffle deck";

    toolbar.appendChild(countEl);
    toolbar.appendChild(shuffleBtn);

    var currentEl = buildBackFace();
    stage.appendChild(currentEl);

    wrap.appendChild(label);
    wrap.appendChild(stage);
    wrap.appendChild(toolbar);
    root.appendChild(wrap);

    function replaceTopCard(nextEl, flyIn) {
      stage.innerHTML = "";
      if (flyIn) {
        nextEl.classList.add("pfd-fly-in-start");
        stage.appendChild(nextEl);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            nextEl.classList.remove("pfd-fly-in-start");
            nextEl.classList.add("pfd-fly-in-end");
            setTimeout(function () {
              nextEl.classList.remove("pfd-fly-in-end");
            }, 500);
          });
        });
      } else {
        stage.appendChild(nextEl);
      }
      currentEl = nextEl;
    }

    function attachCardHandlers(el) {
      el.addEventListener("click", onCardTap);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardTap();
        }
      });
    }

    function onCardTap() {
      if (busy) return;
      busy = true;

      var outgoing = currentEl;
      outgoing.classList.add("pfd-fly-out");

      window.setTimeout(function afterFly() {
        tapCount++;
        renderCount();

        var next;
        if (showingBack) {
          showingBack = false;
          faceIndex = 0;
          next = buildFaceCard(deckOrder[faceIndex]);
        } else {
          faceIndex++;
          if (faceIndex >= deckOrder.length) {
            showingBack = true;
            faceIndex = 0;
            next = buildBackFace();
          } else {
            next = buildFaceCard(deckOrder[faceIndex]);
          }
        }

        replaceTopCard(next, true);
        attachCardHandlers(currentEl);
        busy = false;
      }, 500);
    }

    attachCardHandlers(currentEl);

    shuffleBtn.addEventListener("click", function () {
      if (busy) return;
      deckOrder = shuffle(PLAY_FOOTER_CARDS);
      tapCount = 0;
      renderCount();
      showingBack = true;
      faceIndex = 0;

      if (currentEl.dataset.face === "back") {
        return;
      }

      busy = true;
      var outgoing = currentEl;
      outgoing.classList.add("pfd-fly-out");
      window.setTimeout(function () {
        var next = buildBackFace();
        replaceTopCard(next, true);
        attachCardHandlers(currentEl);
        busy = false;
      }, 500);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
