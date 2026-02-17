// year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// donate page (safe to run even if elements don't exist)
(function () {
  const amountEl = document.getElementById("selectedAmount");
  const buttons = document.querySelectorAll(".js-amount");
  const customAmount = document.getElementById("customAmount");
  const useCustom = document.getElementById("useCustom");
  const form = document.getElementById("donationForm");
  const thanks = document.getElementById("thanks");

  if (!amountEl) return; // not on donate page

  const setAmount = (val) => {
    const n = Number(val);
    if (!Number.isFinite(n) || n <= 0) return;
    amountEl.textContent = String(n);
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setAmount(btn.dataset.amount));
  });

  if (useCustom && customAmount) {
    useCustom.addEventListener("click", () => setAmount(customAmount.value));
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (thanks) thanks.classList.remove("d-none");
      form.reset();
    });
  }
})();

// contact page
(function () {
  const form = document.getElementById("contactForm");
  const thanks = document.getElementById("contactThanks");
  if (!form || !thanks) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    thanks.classList.remove("d-none");
    form.reset();
  });
})();

// lightbox (gallery page)
(function () {
  const items = Array.from(document.querySelectorAll(".js-gallery"));
  if (items.length === 0) return;

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const btnClose = document.getElementById("lbClose");
  const btnPrev = document.getElementById("lbPrev");
  const btnNext = document.getElementById("lbNext");

  if (!lb || !lbImg || !lbCaption || !btnClose || !btnPrev || !btnNext) return;

  let idx = 0;

  const open = (i) => {
    idx = i;
    const el = items[idx];
    lbImg.src = el.src;
    lbCaption.textContent = el.alt || `Image ${idx + 1}/${items.length}`;
    lb.classList.remove("d-none");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lb.classList.add("d-none");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  };

  const prev = () => open((idx - 1 + items.length) % items.length);
  const next = () => open((idx + 1) % items.length);

  items.forEach((el, i) => {
    el.style.cursor = "zoom-in";
    el.addEventListener("click", () => open(i));
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  // click outside image closes
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  // keyboard controls
  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("d-none")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();

// back to top
(function(){
  const btn = document.getElementById("backToTop");
  if(!btn) return;

  const toggle = () => {
    if(window.scrollY > 300){
      btn.classList.remove("d-none");
    } else {
      btn.classList.add("d-none");
    }
  };

  window.addEventListener("scroll", toggle);

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})();

// events mini-calendar modal
(function () {
  const buttons = document.querySelectorAll(".cal-btn[data-event]");
  const modalEl = document.getElementById("eventModal");
  if (!buttons.length || !modalEl) return;

  const titleEl = document.getElementById("eventTitle");
  const metaEl = document.getElementById("eventMeta");
  const descEl = document.getElementById("eventDesc");

  const data = {
    adoption: {
      title: "Ημέρα Υιοθεσίας",
      meta: "10 Μαρτίου • 12:00–16:00 • Πάρκο Γουδή",
      desc: "Γνώρισε τα ζωάκια, μίλα με εθελοντές και κάνε αίτηση υιοθεσίας."
    },
    feeding: {
      title: "Δράση Σίτισης",
      meta: "18 Μαρτίου • 19:00–21:00 • Κέντρο Αθήνας",
      desc: "Ομαδική διανομή τροφής/νερού σε σημεία με αδέσποτα."
    },
    bazaar: {
      title: "Bazaar Αγάπης",
      meta: "30 Μαρτίου • 11:00–18:00 • Νέα Σμύρνη",
      desc: "Συγκεντρώνουμε πόρους για φάρμακα και στειρώσεις. Έλα να στηρίξεις!"
    }
  };

  const modal = new bootstrap.Modal(modalEl);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-event");
      const ev = data[key];
      if (!ev) return;

      if (titleEl) titleEl.textContent = ev.title;
      if (metaEl) metaEl.textContent = ev.meta;
      if (descEl) descEl.textContent = ev.desc;

      modal.show();
    });
  });
})();
