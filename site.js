// Confirm this number receives WhatsApp messages before going live.
const WA_NUMBER = "919411676974";
const wa = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// Mobile menu
const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// Product order links
document.querySelectorAll("[data-item]").forEach(a => {
  a.href = wa(`Namaste, I’d like to order: ${a.dataset.item}. Please share price and availability.`);
  a.target = "_blank"; a.rel = "noopener";
});

// Admission form -> WhatsApp message
const f=document.getElementById("admForm"); if(f) f.addEventListener("submit", e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const err = document.getElementById("err");
  if (!v("pname") || !v("phone")) { err.textContent = "कृपया नाम और फ़ोन नंबर भरें। Please enter name and phone number."; return; }
  if (!document.getElementById("consent").checked) { err.textContent = "कृपया सहमति वाले बॉक्स पर टिक करें। Please tick the consent box."; return; }
  err.textContent = "";
  const needs = [...document.querySelectorAll("input[name=need]:checked")].map(c => c.value).join(", ");
  const lines = [
    "प्रवेश जानकारी / Admission enquiry",
    `अभिभावक: ${v("pname")}`,
    `फ़ोन: ${v("phone")}`,
    v("age") && `बच्चे की उम्र: ${v("age")}`,
    v("place") && `गाँव/शहर: ${v("place")}`,
    needs && `ज़रूरत: ${needs}`,
    v("udid") && `UDID/प्रमाण पत्र: ${v("udid")}`,
    v("time") && `कॉल का समय: ${v("time")}`,
    v("msg") && `संदेश: ${v("msg")}`
  ].filter(Boolean);
  window.open(wa(lines.join("\n")), "_blank", "noopener");
});
