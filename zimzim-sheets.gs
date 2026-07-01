/*  Zim-Zim — Google Sheets lid qabul qiluvchi (Apps Script)
    Formadan kelgan ma'lumotni jadvalga yozadi.

    ULASH TARTIBI:
    1) Pastdagi SHEET_ID ga o'z jadvalingiz ID sini qo'ying.
    2) Deploy → New deployment → tur: Web app
         Execute as:      Me
         Who has access:  Anyone
    3) Chiqqan Web app URL (.../exec bilan tugaydi) ni index.html ichidagi
       SHEET_URL = "" qatoriga qo'shtirnoq ichiga joylang.
*/

const SHEET_ID   = "1_4D3usa0VL8KuPsvYRm1x2dk1Kdm6smhl7T7-W7-Nw8";   // jadval ID (oldindan qo'yilgan)
const SHEET_NAME = "Lidlar";               // varaq nomi (bo'lmasa o'zi yaratiladi)

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(30000);
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // birinchi marta — sarlavha qatori
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Sana", "Yo'nalish", "Hozirgi usul", "Muammo", "Shahar", "Ism", "Telefon"]);
    }

    const p = (e && e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : {};
    sheet.appendRow([
      new Date(),
      p.type    || "",
      p.method  || "",
      p.problem || "",
      p.city    || "",
      p.name    || "",
      "'" + (p.phone || "")   // boshida ' — telefon matn bo'lib qoladi (+90 va nol yo'qolmaydi)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Brauzerda URL ochib tekshirish uchun
function doGet() {
  return ContentService
    .createTextOutput("Zim-Zim lid endpoint ishlayapti ✅")
    .setMimeType(ContentService.MimeType.TEXT);
}
