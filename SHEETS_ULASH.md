# Formani Google Sheets'ga ulash

Kimdir formani to'ldirib yuborsa, javoblari avtomatik jadvalga tushadi:
**Sana · Yo'nalish · Hozirgi usul · Muammo · Shahar · Ism · Telefon**

Bor-yo'g'i 4 qadam.

---

## 1-qadam. Jadval yarating va ID sini oling

1. [sheets.new](https://sheets.new) — yangi bo'sh jadval oching, nomini "Zim-Zim Lidlar" qo'ying.
2. Jadval havolasidan **ID** ni oling. Havola shunday ko'rinadi:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEf...uzunKod...`**`/edit`
   — qalin qism (`/d/` va `/edit` orasidagi) — bu ID.

## 2-qadam. Skriptni joylang

1. Jadvalда yuqoridan **Extensions → Apps Script**.
2. Ochilgan oynadagi hamma kodni o'chirib, **`zimzim-sheets.gs`** faylidagi kodni to'liq joylang.
3. Kod boshidagi `SHEET_ID = "BU_YERGA_JADVAL_ID"` qatoriga 1-qadamda olgan ID'ni qo'shtirnoq ichiga qo'ying.
4. Yuqoridan 💾 (Save) bosing.

## 3-qadam. Web app qilib chiqaring (deploy)

1. Yuqorida **Deploy → New deployment**.
2. Tур tanlash (⚙️ tishli belgi) → **Web app**.
3. Sozlamalar:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`  ← bu muhim!
4. **Deploy** → Google ruxsat so'raydi → o'z akkauntingiz bilan ruxsat bering
   (agar "Google hasn't verified" chiqsa: **Advanced → Go to ... (unsafe) → Allow** — bu o'z skriptingiz, xavfsiz).
5. Chiqqan **Web app URL** ni nusxalang (`.../exec` bilan tugaydi).
6. **Tekshirish:** o'sha URL'ni brauzerда oching — "Zim-Zim lid endpoint ishlayapti ✅" chiqsa, tayyor.

## 4-qadam. URL'ni saytga qo'ying

1. **`index.html`** faylini oching.
2. Boshiga yaqin joyda shu qatorni toping:
   ```js
   const SHEET_URL = "";
   ```
3. Qo'shtirnoq ichiga 3-qadamda olgan URL'ni joylang:
   ```js
   const SHEET_URL = "https://script.google.com/macros/s/AKfy.../exec";
   ```
4. `index.html` ni saqlab, GitHub/Vercel'ga **qayta deploy** qiling.

---

## Tekshirish

Saytni ochib, formani to'ldirib **"Talebi gönder"** bosing → jadvalда yangi qator paydo bo'lishi kerak.

## Eslatmalar

- **Telefon** ustunida boshida `'` bor — bu ataylab, `+90` va nol yo'qolmasligi uchun. Ko'rinishда oddiy raqam bo'lib turadi.
- Skriptni keyin o'zgartirsangiz: **Deploy → Manage deployments → ✏️ → New version → Deploy** (URL o'zgarmaydi).
- Bu ulanish forma javoblarini jadvalga yozadi. **Meta Pixel "Lead"** hodisasi ham ishlashда davom etadi — ikkalasi birga.
- Xohlasangiz, keyin har yangi lid tushganда **Telegram'ga xabar** yuborishni ham qo'shsa bo'ladi.
