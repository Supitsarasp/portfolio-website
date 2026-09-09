# Portfolio — Supitsara Suanngam

แฟ้มสะสมผลงานภาษาไทยแบบหน้าเดียว สร้างด้วย React 19, Vite 8 และ Tailwind CSS 4 เก็บข้อมูลหลักไว้ในไฟล์เดียว พร้อม Resume, เอกสารผลงาน, ใบรับรอง และเครื่องมือเพิ่มรูปกิจกรรมที่ใช้เฉพาะในเครื่อง

โปรเจกต์รุ่นนี้มีข้อมูลเดิมครบ 8 โปรเจกต์ 2 กิจกรรม 7 ใบรับรอง และ 5 กลุ่มทักษะ ไม่มี `node_modules` หรือ `dist` ใน Source ZIP เพราะสร้างใหม่จาก `package-lock.json` ได้

## เริ่มใช้งานบน Windows

1. แตก ZIP ทั้งหมดก่อน ห้ามรันไฟล์จากหน้าต่าง ZIP
2. ติดตั้ง Node.js รุ่นที่ Vite รองรับ: `^20.19.0` หรือ `>=22.12.0`
3. ดับเบิลคลิก `START-WEBSITE.bat`
4. ครั้งแรกสคริปต์จะใช้ `npm.cmd ci` จึงต้องเชื่อมต่อ npm registry
5. เก็บหน้าต่างคำสั่งไว้ระหว่างใช้งาน กด `Ctrl+C` เพื่อปิด

อย่าดับเบิลคลิก `index.html` เพื่อเปิด React โดยตรง เพราะ asset และ module ต้องทำงานผ่าน HTTP และอาจทำให้เห็นหน้าขาว

ใช้ Terminal แทนไฟล์ `.bat` ได้:

```powershell
npm.cmd ci
npm.cmd run validate:content
npm.cmd run dev -- --open
```

## แก้ข้อมูลโดยไม่ทำให้หน้าขาว

ข้อมูลหลักอยู่ที่ `src/data/portfolioContent.json` ไม่ต้องไล่แก้ JSX หลายไฟล์

| ต้องการแก้ | ตำแหน่งใน JSON |
| --- | --- |
| ชื่อ อีเมล พื้นที่ GitHub/LinkedIn รูปโปรไฟล์ Resume | `personal` |
| การศึกษา ประวัติ และตำแหน่งที่สนใจ | `about` |
| ทักษะทั้ง 5 กลุ่ม | `skills` |
| การ์ด รายละเอียด ลิงก์ และ PDF ของผลงาน | `projects` |
| กิจกรรมและ ID ที่ผูกกับรูป | `activities` |
| ใบรับรอง รูป และลิงก์ | `certificates` |

ตัวอย่างโครงสร้างรายการโปรเจกต์ที่สำคัญ:

```json
{
  "id": "project-id-ห้ามซ้ำ",
  "title": "ชื่อโปรเจกต์",
  "image": "assets/project-cover.png",
  "tools": ["Postman", "GitHub"],
  "links": { "github": "https://github.com/USERNAME/REPOSITORY" },
  "evidence": [
    {
      "title": "เอกสารประกอบ",
      "type": "pdf",
      "description": "อธิบายว่าเอกสารนี้พิสูจน์อะไร",
      "url": "files/evidence.pdf",
      "sizeLabel": "PDF ประมาณ 2 MiB"
    }
  ]
}
```

กฎสำคัญ:

- ใช้ JSON ที่ถูกต้อง: key และข้อความต้องมี `"..."`, ห้ามมี comma หลังรายการสุดท้าย
- เก็บ `id` ของโปรเจกต์และกิจกรรมไม่ให้ซ้ำ และอย่าเปลี่ยน Activity ID หากยังใช้รูปเดิม
- Local asset ใส่ path จาก `public/` เช่น `public/files/report.pdf` ใช้ค่า `files/report.pdf`
- ใช้ URL แบบ `https://` สำหรับลิงก์ภายนอก ไม่ใช้ `javascript:` หรือ scheme ที่ไม่รู้จัก
- การแก้ JSON ไม่แก้ Resume PDF อัตโนมัติ ฉบับปัจจุบันคือ `public/files/Supitsara-Suanngam-Resume-Harvard.pdf` ให้ส่งออก PDF จาก Word ฉบับที่อนุมัติแล้วแทนที่ไฟล์นี้ โดย `Resume-TH.html` เป็นทางลัดเปิด PDF และไฟล์ชื่อเดิม `Supitsara-Suanngam-Resume-TH.pdf` เก็บสำเนาฉบับใหม่ไว้รองรับลิงก์เดิม

ทุกครั้งหลังแก้ให้รัน:

```powershell
npm.cmd run validate:content
npm.cmd run build
```

ตัวตรวจจะบอก path ที่ผิด เช่น `projects[2].evidence` และตรวจ local asset ที่หาไม่พบก่อน build หากข้อมูลผิดตอนเปิดเว็บ โหมดพัฒนาจะแสดงรายละเอียดให้เจ้าของแก้ ส่วน Production แสดงข้อความทั่วไปโดยไม่เผยโครงสร้างภายใน

## เพิ่มและจัดการรูปกิจกรรม

1. รันเว็บด้วย `START-WEBSITE.bat` หรือ `npm run dev`
2. ไปส่วน “กิจกรรม” แล้วกด “เพิ่ม / จัดการรูปกิจกรรม”
3. เลือกรูป JPG, PNG หรือ WebP ได้สูงสุด 6 รูปต่อกิจกรรม ไฟล์ต้นฉบับไม่เกิน 15 MB ต่อรูป
4. ระบบย่อด้านยาวไม่เกิน 1,600 px และแปลงเป็น JPEG quality 0.84
5. ใส่คำบรรยาย เรียงลำดับ แล้วกดบันทึก
6. สร้าง `dist` ใหม่ก่อนอัปเดตเว็บออนไลน์

เครื่องมือนี้ทำงานเฉพาะ Vite dev server ที่ loopback มี host/origin/token checks, จำกัดชนิดและขนาดข้อมูล, ตรวจ stale revision และบันทึกผ่าน queue ห้ามนำ endpoint นี้ไปเปิดรับอินเทอร์เน็ต

การเอารูปออกจาก Gallery หมายถึงหยุดแสดงรูป ไม่ได้แปลว่าลบไฟล์ต้นฉบับอัตโนมัติ หากต้องนำไฟล์ออกจากเว็บที่เผยแพร่ ให้ตรวจก่อนว่าไม่ถูกใช้ในกิจกรรมอื่น เก็บสำเนานอก `public/dist` แล้วจึงลบและ deploy ใหม่ ไฟล์เดิมอาจยังอยู่ใน cache/CDN ตามวิธีโฮสต์

## Contact ทำงานอย่างไร

แบบฟอร์มเป็นระบบ “เตรียมอีเมล” ไม่ใช่ Direct Send:

- ตรวจช่องว่างล้วน รูปแบบอีเมล และความยาวก่อนสร้าง draft
- ปุ่ม “เปิดแอปอีเมล” ใช้ `mailto:` ผู้ใช้ต้องตรวจทานและกดส่งในแอปเอง
- ปุ่ม “คัดลอกข้อความ” ขอใช้ Clipboard หลังผู้ใช้กด
- ไม่มีข้อความ “ส่งสำเร็จ” ปลอม ไม่มี `setTimeout` จำลอง และไม่มี secret ใน Frontend

หากต้องการส่งตรงจากเว็บ ต้องเลือกบริการ/Backend และกรอกข้อมูลจริงของ deployment ก่อน API secret ต้องอยู่ฝั่ง Server ห้ามใส่ secret ใน `VITE_*` เพราะค่าดังกล่าวอยู่ใน JavaScript ที่ผู้ชมดาวน์โหลดได้

## Privacy, Cookies และบริการภายนอก

หน้าเว็บมีส่วน “ข้อมูลความเป็นส่วนตัว” และลิงก์จาก Contact/Footer ตามพฤติกรรมจริง:

- ซอร์สรุ่นนี้ไม่พบ Analytics, advertising pixel, Cookies, `localStorage` หรือ `sessionStorage` จึงไม่สร้าง Cookie banner ตกแต่ง
- ภาพปกบางโปรเจกต์โหลดจาก `opengraph.githubassets.com` โดยตั้ง `referrerPolicy="no-referrer"`
- GitHub/ใบรับรองภายนอกจะเปิดเมื่อผู้ชมกด แต่ผู้ให้บริการโฮสต์อาจบันทึก IP/การเข้าชมตามนโยบายของตน
- ต้องตรวจ deployment จริงอีกครั้งหากโฮสต์เพิ่ม script, analytics หรือ headers นอก repository

ข้อความนี้ไม่ใช่การรับรองว่าเว็บไซต์ถูกกฎหมายทุกเขตอำนาจ อ่านรายการข้อมูลที่ยังต้องกรอกและหัวข้อที่ควรตรวจทางกฎหมายใน `COMPLIANCE-AND-QA-REPORT.md`

## Build และ Deploy

```powershell
npm.cmd ci
npm.cmd run test
npm.cmd run build
```

หรือดับเบิลคลิก `BUILD-WEBSITE.bat` แล้วนำ “เนื้อหาภายใน” โฟลเดอร์ `dist` ไปยัง Static Host ห้าม deploy Source ZIP ตรง ๆ

`vite.config.js` ใช้ `base: './'` และ asset helper รองรับทั้ง root path กับ repository subpath เช่น `/portfolio/` ไฟล์ PDF ขนาดใหญ่โหลดเมื่อผู้ชมกดเท่านั้น ไม่ได้ฝังให้ดาวน์โหลดทุกครั้งที่เปิดหน้า

ข้อจำกัด GitHub ที่ตรวจจากเอกสารทางการ:

- Web uploader รับไฟล์ได้ไม่เกิน 25 MiB
- Git เตือนเมื่อไฟล์เกิน 50 MiB แต่ยัง push ได้
- GitHub บล็อกไฟล์เดี่ยวเกิน 100 MiB

ดังนั้น `LittleKids .pdf` ขนาด 83.49 MiB ต้องใช้ Git command แทน Web uploader และจะได้รับคำเตือน แต่ยังไม่ถูกบังคับให้ใช้ Git LFS จากขนาดไฟล์เพียงอย่างเดียว ดู [About large files on GitHub](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)

## คำสั่งตรวจสอบ

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd run validate:content
npm.cmd run test
npm.cmd run build
```

`npm run test` ตรวจทั้ง Activity Editor, schema/content, URL scheme และ Contact draft โดยใช้โฟลเดอร์ชั่วคราว ไม่เปลี่ยนรูปจริง

## โครงสร้างสำคัญ

| ไฟล์ / โฟลเดอร์ | หน้าที่ |
| --- | --- |
| `src/components/` | ส่วนแสดงผลแต่ละส่วนและ Error Boundary |
| `src/data/portfolioContent.json` | ข้อมูลที่เจ้าของแก้เป็นหลัก |
| `src/data/normalizePortfolio.js` | ตรวจ/ปรับ optional fields ก่อน render |
| `public/activities/` | Gallery manifest และรูปกิจกรรมที่บันทึก |
| `public/assets/` | ภาพผลงาน ใบรับรอง และ PDF ต้นฉบับ |
| `public/files/` | Resume และไฟล์ผลงานเพิ่มเติม |
| `public/fonts/` | ฟอนต์ local และใบอนุญาต OFL/SOURCE |
| `tools/` | Activity Editor, validation และ tests |
| `legacy/` | Reference ต้นฉบับ ห้ามรันเขียนทับเว็บรุ่นนี้ |

## ก่อนส่งสมัครงาน

- ตรวจชื่อ อีเมล GPA ปีการศึกษา และข้อมูลใน Resume ให้เป็นปัจจุบัน
- ใส่รูปกิจกรรมจริงและตรวจสิทธิ์เผยแพร่ของภาพ/ข้อมูลบุคคลอื่น
- เปิดลิงก์ GitHub, Demo, PDF และอีเมลจาก deployment จริงอีกครั้ง
- เตรียมอธิบายที่มาของตัวเลข Test Case, tests, Coverage และ checks จาก repository/เอกสารต้นฉบับ
- โปรเจกต์ ShareU และ LITTLEKIDS เป็นต้นแบบ/โปรเจกต์ออกแบบตามข้อมูลเดิม ไม่ควรนำเสนอเป็นระบบ Production หรืองานลูกค้าจริง

ดูผลตรวจทั้งหมดที่ `COMPLIANCE-AND-QA-REPORT.md` และรายละเอียดขนาด/ไฟล์ที่นำออกที่ `SIZE-OPTIMIZATION.md`
