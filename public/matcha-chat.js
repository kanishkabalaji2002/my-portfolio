/**
 * Timed contact chat (matches components/Footer.tsx ChatAnimation).
 * Keep JOKES in sync with lib/jokes.ts
 */
(function () {
  var JOKES = [
    "I don't bite. Monkeys do though. Just saying.",
    "Terrified of monkeys, in case you were wondering.",
    "Research-driven, caffeine-fueled, occasionally sarcastic.",
    "Detail-driven to a fault.",
    "Always up way too late. Morning me disagrees.",
    "Horror movie enthusiast. Rom-coms are scary in a different way.",
    "Changed schools 10 times in 9 years. Adaptability is my default mode.",
    "Proud owner of 50+ Barbies. Judge quietly.",
    "Had 7 cavities once. I floss now. Mostly.",
    "Adaptive by necessity and by choice.",
    "Endlessly curious about what people do versus what they say they do.",
    "I love a good FigJam board and a chaotic sticky-note wall.",
    "Currently in Seattle, usually hunting for good matcha.",
  ];

  var MAIL = "kanishkabalaji2002@gmail.com";
  var MAILTO = "mailto:" + MAIL;

  function pickJoke() {
    return JOKES[Math.floor(Math.random() * JOKES.length)] || "";
  }

  function rowAvatar() {
    return (
      '<div style="width:36px;height:36px;border-radius:50%;overflow:hidden;flex-shrink:0;border:1px solid rgba(15,23,42,0.08);">' +
      '<img src="/photo.png" alt="Kanishka Balaji" width="36" height="36" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:center 25%;display:block;" />' +
      "</div>"
    );
  }

  function typingBubble(animationName) {
    var anim = animationName || "matchaBounceTyping";
    return (
      '<div style="background:#f3f4f6;border-radius:18px 18px 18px 4px;padding:12px 16px;display:flex;gap:4px;align-items:center;">' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#9ca3af;display:inline-block;animation:' +
      anim +
      ' 1.2s infinite 0s;"></span>' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#9ca3af;display:inline-block;animation:' +
      anim +
      ' 1.2s infinite 0.2s;"></span>' +
      '<span style="width:7px;height:7px;border-radius:50%;background:#9ca3af;display:inline-block;animation:' +
      anim +
      ' 1.2s infinite 0.4s;"></span></div>'
    );
  }

  function mount(root) {
    if (!root || root.getAttribute("data-matcha-mounted")) return;
    root.setAttribute("data-matcha-mounted", "1");
    root.style.minHeight = "160px";

    var jokeElId = "matcha-joke-" + Math.random().toString(36).slice(2);
    root.innerHTML =
      '<div class="matcha-step-0" style="display:flex;align-items:flex-start;gap:12px;">' +
      rowAvatar() +
      typingBubble(root.getAttribute("data-bounce-name") || "matchaBounceTyping") +
      "</div>" +
      '<div class="matcha-step-1-msg" style="display:none;align-items:flex-start;gap:12px;margin-bottom:16px;">' +
      rowAvatar() +
      '<div style="background:#f3f4f6;border-radius:18px 18px 18px 4px;padding:10px 16px;max-width:400px;">' +
      '<p style="font-family:\'General Sans\',sans-serif;font-size:14px;color:#111827;margin:0;">Want to work together? Just want to chat?</p></div></div>' +
      '<div class="matcha-step-1-type" style="display:none;align-items:flex-start;gap:12px;">' +
      rowAvatar() +
      typingBubble(root.getAttribute("data-bounce-name") || "matchaBounceTyping") +
      "</div>" +
      '<div class="matcha-step-2-msg" style="display:none;align-items:flex-start;gap:12px;margin-bottom:16px;">' +
      rowAvatar() +
      '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
      '<div style="background:#f3f4f6;border-radius:18px 18px 18px 4px;padding:10px 16px;">' +
      '<p style="font-family:\'General Sans\',sans-serif;font-size:14px;color:#111827;margin:0;">Email me at: ' +
      '<a href="' +
      MAILTO +
      '" style="color:#111827;font-weight:600;text-decoration:underline;">' +
      MAIL +
      "</a></p></div>" +
      '<a href="' +
      MAILTO +
      '" aria-label="Send email to Kanishka" title="Send email" style="width:36px;height:36px;border-radius:50%;border:1px solid #e5e7eb;background:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;flex-shrink:0;">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a></div></div>' +
      '<div class="matcha-step-2-type" style="display:none;align-items:flex-start;gap:12px;">' +
      rowAvatar() +
      typingBubble(root.getAttribute("data-bounce-name") || "matchaBounceTyping") +
      "</div>" +
      '<div class="matcha-step-3-msg" style="display:none;align-items:flex-start;gap:12px;">' +
      rowAvatar() +
      '<div style="background:#f3f4f6;border-radius:18px 18px 18px 4px;padding:10px 16px;">' +
      '<p id="' +
      jokeElId +
      '" style="font-family:\'General Sans\',sans-serif;font-size:14px;color:#111827;margin:0;"></p></div></div>';

    var jokeP = document.getElementById(jokeElId);
    if (jokeP) jokeP.textContent = pickJoke();

    var q0 = root.querySelector(".matcha-step-0");
    var m1 = root.querySelector(".matcha-step-1-msg");
    var t1 = root.querySelector(".matcha-step-1-type");
    var m2 = root.querySelector(".matcha-step-2-msg");
    var t2 = root.querySelector(".matcha-step-2-type");
    var m3 = root.querySelector(".matcha-step-3-msg");

    function show(el, flex) {
      if (!el) return;
      el.style.display = flex ? "flex" : "none";
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show(q0, false);
      show(m1, true);
      show(t1, false);
      show(m2, true);
      show(t2, false);
      show(m3, true);
      return;
    }

    show(q0, true);
    show(m1, false);
    show(t1, false);
    show(m2, false);
    show(t2, false);
    show(m3, false);

    setTimeout(function () {
      show(q0, false);
      show(m1, true);
      show(t1, true);
    }, 800);
    setTimeout(function () {
      show(t1, false);
      show(m2, true);
      show(t2, true);
    }, 2000);
    setTimeout(function () {
      show(t2, false);
      show(m3, true);
    }, 3800);
  }

  function boot() {
    document.querySelectorAll("[data-matcha-chat]").forEach(mount);
  }

  // Next.js and other late-loaded scripts often run after DOMContentLoaded — still mount.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
