# Meydan

Sitesi olmayan ofislerin ortak ilan yeri. Pendik, Gebze ve İzmit’teki ofisler kendini anlatır, satılık veya kiralık daire bırakır.

A shared listing place for offices without a website. Offices in Pendik, Gebze, and İzmit introduce themselves and leave sale or rental listings.

![Kapak / Cover](ekran/ana.png)

![Ofisler / Offices](ekran/ofisler.png)

![Daire bırakma / Leave a listing](ekran/form.png)

## Kurulum / Setup

Tek klasör, üç dosya. / One folder, three files.

```bash
cd meydan-emlak
python3 -m http.server 8080
```

Aç / Open: http://127.0.0.1:8080

Sayfa içi bağlantılar `#ilanlar`, `#ofisler` ve `#ilan-ver` bölümlerine iner.

In-page links jump to `#ilanlar`, `#ofisler`, and `#ilan-ver`.

## Teknoloji / Stack

Tek **HTML** sayfası, `styles.css` ve `app.js`. Yazı tipleri **Instrument Serif** ve **Instrument Sans**. Ofis listesi ve ilanlar betiğin içindeki veriden çizilir. Şehir süzgeci İstanbul ve Kocaeli’yi ayırır. Form ofis, başlık, satılık veya kiralık, oda, metrekare, fiyat ve mahalle ister.

One **HTML** page, `styles.css`, and `app.js`. Typefaces are **Instrument Serif** and **Instrument Sans**. Offices and listings are drawn from data in the script. The city filter splits İstanbul and Kocaeli. The form asks for office, title, sale or rent, rooms, square meters, price, and neighborhood.
