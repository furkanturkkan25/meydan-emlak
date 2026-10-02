const OFFICES = [
  { id: "bolge", name: "Bölge Emlak", city: "İstanbul", district: "Pendik", address: "Kaynarca, Aydınlı Yolu Cd. No:179/A", phone: "0216 390 20 23", tel: "+902163902023" },
  { id: "turnam", name: "Turnam Gayrimenkul ve İnşaat", city: "İstanbul", district: "Pendik", address: "Necmettin Erbakan Cd. No:74/B", phone: "0532 478 83 63", tel: "+905324788363" },
  { id: "utku", name: "Utku Gayrimenkul Danışmanlık", city: "İstanbul", district: "Pendik", address: "Doğu Mah., Ece Sok. No:9", phone: "0536 598 55 75", tel: "+905365985575" },
  { id: "vizyon", name: "Vizyon Gayrimenkul", city: "Kocaeli", district: "Gebze", address: "Hacıhalil, Atatürk Cd. No:22", phone: "0533 327 61 45", tel: "+905333276145" },
  { id: "ayisigi", name: "Ayışığı Gayrimenkul", city: "Kocaeli", district: "Gebze", address: "902/1. Sk. No:6F", phone: "0545 393 44 92", tel: "+905453934492" },
  { id: "sener", name: "Şener Gayrimenkul", city: "Kocaeli", district: "Gebze", address: "Gençlik Cd. No:45 D:6", phone: "0536 587 00 34", tel: "+905365870034" },
  { id: "enbir", name: "Enbir Gayrimenkul", city: "Kocaeli", district: "Gebze", address: "Tatlıkuyu, Güney Yanyol Cd. No:236/6", phone: "0262 644 16 61", tel: "+902626441661" },
  { id: "asaf", name: "Gebze Emlak Asaf Yapı", city: "Kocaeli", district: "Gebze", address: "6. Sk. No:3", phone: "0532 650 08 36", tel: "+905326500836" },
  { id: "vefahane", name: "Vefahane Gayrimenkul", city: "Kocaeli", district: "İzmit", address: "Alemdar Cd. No:39 Kat:2", phone: "0538 288 32 05", tel: "+905382883205" },
  { id: "saricicek", name: "Hasan Sarıçiçek Gayrimenkul", city: "Kocaeli", district: "İzmit", address: "Sanayi Mah. Koray Sk. No:16", phone: "0530 558 53 78", tel: "+905305585378" },
  { id: "anilis", name: "Anılış Gayrimenkul", city: "Kocaeli", district: "İzmit", address: "Banu Sk. No:52 D:1A", phone: "0532 203 50 99", tel: "+905322035099" }
];

const PHOTOS = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
];

const KEY = "meydan-v1";
const state = load();
let city = "hepsi";

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      about: raw.about && typeof raw.about === "object" ? raw.about : {},
      listings: Array.isArray(raw.listings) ? raw.listings : []
    };
  } catch {
    return { about: {}, listings: [] };
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function officeById(id) {
  return OFFICES.find((o) => o.id === id);
}

function money(n) {
  return new Intl.NumberFormat("tr-TR").format(n) + " TL";
}

function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderListings() {
  const box = document.getElementById("ilan-list");
  const rows = state.listings.filter((l) => city === "hepsi" || officeById(l.office)?.city === city);
  if (!rows.length) {
    box.innerHTML = `<p class="empty">Bu tarafta henüz daire yok. Aşağıdan ofisinizdeki ilanı bırakın.</p>`;
    return;
  }
  box.innerHTML = rows.map((l, i) => {
    const o = officeById(l.office);
    return `<a class="ilan" href="#ilan/${esc(l.id)}" style="animation-delay:${i * 40}ms">
      <img src="${esc(l.photo)}" alt="">
      <div>
        <p class="kind">${l.kind === "kiralik" ? "Kiralık" : "Satılık"} · ${esc(l.rooms)} · ${esc(l.sqm)} m²</p>
        <h3>${esc(l.title)}</h3>
        <p class="who">${esc(o ? o.name : "Ofis")} · ${esc(l.place)}, ${esc(o ? o.district : "")}</p>
        <p class="price">${money(l.price)}</p>
      </div>
    </a>`;
  }).join("");
}

function renderOffices() {
  document.getElementById("ofis-list").innerHTML = OFFICES.map((o) => `
    <a class="ofis" href="#ofis/${esc(o.id)}">
      <strong>${esc(o.name)}</strong>
      <span>${esc(o.district)}, ${esc(o.city)}</span>
    </a>
  `).join("");
}

function fillSelect(selected) {
  const sel = document.querySelector("#form select[name=office]");
  sel.innerHTML = OFFICES.map((o) => `<option value="${esc(o.id)}">${esc(o.name)} · ${esc(o.district)}</option>`).join("");
  if (selected) sel.value = selected;
  syncAbout();
}

function syncAbout() {
  const id = document.querySelector("#form select[name=office]").value;
  const area = document.querySelector("#form textarea[name=about]");
  if (document.activeElement !== area) area.value = state.about[id] || "";
}

function openSheet(html) {
  document.getElementById("sheet-body").innerHTML = html;
  const sheet = document.getElementById("sheet");
  sheet.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("sheet-x").focus();
}

function closeSheet() {
  document.getElementById("sheet").hidden = true;
  document.body.style.overflow = "";
  if (location.hash.startsWith("#ilan/") || location.hash.startsWith("#ofis/")) {
    history.pushState(null, "", location.pathname + location.search);
  }
}

function showListing(id) {
  const l = state.listings.find((x) => x.id === id);
  if (!l) return closeSheet();
  const o = officeById(l.office);
  openSheet(`
    <img class="sheet-hero" src="${esc(l.photo)}" alt="">
    <p class="kind">${l.kind === "kiralik" ? "Kiralık" : "Satılık"} · ${esc(l.rooms)} · ${esc(l.sqm)} m²</p>
    <h2 id="sheet-title">${esc(l.title)}</h2>
    <p class="price">${money(l.price)}</p>
    <p>${esc(l.place)}${o ? `, ${esc(o.district)} / ${esc(o.city)}` : ""}</p>
    <p class="about">${esc(l.note || "Bu ilana not düşülmemiş.")}</p>
    ${o ? `<p>Ofis: <a href="#ofis/${esc(o.id)}">${esc(o.name)}</a><br><a class="phone" href="tel:${esc(o.tel)}">${esc(o.phone)}</a></p>` : ""}
    <button type="button" class="textlink" id="sil" style="background:none;border:0;padding:0;cursor:pointer;text-decoration:underline">Bu ilanı kaldır</button>
  `);
  document.getElementById("sil").onclick = () => {
    state.listings = state.listings.filter((x) => x.id !== id);
    save();
    closeSheet();
    renderListings();
  };
}

function showOffice(id) {
  const o = officeById(id);
  if (!o) return closeSheet();
  const about = state.about[id] || "";
  const mine = state.listings.filter((l) => l.office === id);
  openSheet(`
    <p class="kind">${esc(o.district)} / ${esc(o.city)}</p>
    <h2 id="sheet-title">${esc(o.name)}</h2>
    <p>${esc(o.address)}</p>
    <p><a class="phone" href="tel:${esc(o.tel)}">${esc(o.phone)}</a></p>
    <p class="about">${about ? esc(about) : "Bu ofis henüz kendini anlatmadı."}</p>
    <h3>Daireleri</h3>
    <div class="mini">
      ${mine.length ? mine.map((l) => `<a href="#ilan/${esc(l.id)}">${esc(l.title)} · ${money(l.price)}</a>`).join("") : "<p>Henüz daire bırakılmamış.</p>"}
    </div>
    <form id="about-form">
      <label>Kendinizden bahsedin
        <textarea name="about" rows="4" maxlength="600">${esc(about)}</textarea>
      </label>
      <button class="btn" type="submit">Yazıyı kaydet</button>
    </form>
    <p><a href="#ilan-ver" id="bu-ofis">Bu ofis adına ilan bırak</a></p>
  `);
  document.getElementById("about-form").onsubmit = (e) => {
    e.preventDefault();
    state.about[id] = new FormData(e.target).get("about").toString().trim();
    save();
    showOffice(id);
  };
  document.getElementById("bu-ofis").onclick = () => {
    closeSheet();
    document.querySelector("#form select[name=office]").value = id;
    syncAbout();
  };
}

function route() {
  const h = location.hash;
  if (h.startsWith("#ilan/")) showListing(decodeURIComponent(h.slice(6)));
  else if (h.startsWith("#ofis/")) showOffice(decodeURIComponent(h.slice(6)));
  else closeSheet();
}

document.querySelectorAll(".filters button").forEach((btn) => {
  btn.onclick = () => {
    city = btn.dataset.city;
    document.querySelectorAll(".filters button").forEach((b) => b.classList.toggle("is-on", b === btn));
    renderListings();
  };
});

document.getElementById("sheet-x").onclick = closeSheet;
document.getElementById("sheet").onclick = (e) => {
  if (e.target.id === "sheet") closeSheet();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSheet();
});

const form = document.getElementById("form");
form.querySelector("select[name=office]").onchange = syncAbout;
form.onsubmit = (e) => {
  e.preventDefault();
  const err = document.getElementById("form-err");
  const data = new FormData(form);
  const sqm = Number(String(data.get("sqm")).replace(/\D/g, ""));
  const price = Number(String(data.get("price")).replace(/\D/g, ""));
  const title = String(data.get("title") || "").trim();
  const place = String(data.get("place") || "").trim();
  if (!title || !place || !sqm || !price) {
    err.hidden = false;
    err.textContent = "Başlık, semt, metrekare ve fiyat gerekli. Metrekare ile fiyat rakam olmalı.";
    return;
  }
  err.hidden = true;
  const office = String(data.get("office"));
  const about = String(data.get("about") || "").trim();
  if (about) state.about[office] = about;
  const listing = {
    id: crypto.randomUUID(),
    office,
    title,
    place,
    kind: String(data.get("kind")),
    rooms: String(data.get("rooms")),
    sqm,
    price,
    note: String(data.get("note") || "").trim(),
    photo: PHOTOS[state.listings.length % PHOTOS.length]
  };
  state.listings.unshift(listing);
  save();
  form.reset();
  fillSelect(office);
  city = "hepsi";
  document.querySelectorAll(".filters button").forEach((b) => b.classList.toggle("is-on", b.dataset.city === "hepsi"));
  renderListings();
  location.hash = "#ilan/" + listing.id;
};

fillSelect();
renderOffices();
renderListings();
window.addEventListener("hashchange", route);
route();
