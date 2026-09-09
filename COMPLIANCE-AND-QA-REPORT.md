# รายงาน Compliance, Privacy, Accessibility, Security และ QA

โปรเจกต์: Portfolio — Supitsara Suanngam  
ขอบเขต: Source ZIP ที่ได้รับ, source/config/data, local assets, dependency lockfile และ production build ที่สร้างในสภาพแวดล้อมนี้  
ข้อจำกัด: รายงานนี้เป็นการตรวจทางวิศวกรรม ไม่ใช่คำรับรองว่าเว็บไซต์ “ถูกกฎหมาย 100%” และไม่แทนคำปรึกษาจากนักกฎหมาย

## 1. Executive Summary

- ✅ FIXED — ลบข้อความ 4 จุดตามคำขอโดยไม่ลบประวัติการศึกษา/ข้อมูลใน Resume อัตโนมัติ
- ✅ FIXED — จัด Skills 5 ใบให้มีโครงสร้างเดียวกัน ขนาดสมดุล มี list semantics และ hover ที่เคารพ reduced motion
- ✅ FIXED — Contact แสดงพฤติกรรมตามจริงว่าเป็นการเตรียม `mailto:` เพิ่ม validation และ fallback เมื่อ Clipboard ใช้ไม่ได้ ไม่มี fake success
- ✅ FIXED — เพิ่มศูนย์กลางตรวจ/normalize `portfolioContent.json`, pre-build validation, unsafe URL scheme check, local asset check และ Error Boundary เพื่อลดโอกาสหน้าขาวแบบไร้คำอธิบาย
- ✅ FIXED — เพิ่มข้อมูลความเป็นส่วนตัวที่ Contact/Footer โดยไม่สร้าง Cookie banner ที่ไม่มีการทำงานจริง
- ✅ FIXED — เปลี่ยนคำอธิบาย ShareU จาก “พันธมิตรหลัก” เป็น “กลุ่มพันธมิตรที่เสนอใน Business Model” เพื่อลดความเข้าใจว่าเป็นความร่วมมือจริง
- ✅ FIXED — รักษา Activity Editor แบบ local-only และเพิ่มการแสดงสถานะเมื่อ Gallery manifest โหลดไม่ได้แทนการกลบ error ทั้งหมด
- ✅ FIXED — `npm ci`, lint, content validation, tests 8/8, production build และ dependency audit ผ่าน
- 🧪 NOT VERIFIED — ไม่ได้ยืนยัน layout/interaction ด้วยภาพจากเบราว์เซอร์จริง เพราะเบราว์เซอร์ทดสอบไม่สามารถเข้าถึง localhost ของ workspace; ห้ามนับ source inspection หรือ `curl` เป็น visual QA
- 🟡 OWNER INPUT REQUIRED — Hosting provider/config, retention/logging, สิทธิ์เผยแพร่ภาพ/เอกสาร, ตัวเลขผลทดสอบ และสถานะลิงก์ภายนอกต้องยืนยันโดยเจ้าของ

## 2. Critical Risks Found

ไม่พบหลักฐาน Critical issue ใน source ที่ตรวจ ไม่มี secret, checkout, account system, database รับ Contact หรือ analytics/pixel ใน entry point ที่ใช้งานจริง

การไม่พบใน source ไม่ยืนยันว่า deployment จริงไม่มี script/headers/logging เพิ่มจากผู้ให้บริการโฮสต์

## 3. High Priority Issues

| สถานะ | ประเด็น | ผลดำเนินการ |
| --- | --- | --- |
| ✅ FIXED | ตัวแปลงข้อมูลเรียก `.map`, `Object.entries` และ field โดยสมมติ schema ถูกต้อง | เพิ่ม validator/normalizer, path-specific errors, asset check, prebuild และ Error Boundary |
| ✅ FIXED | Contact อาศัย browser validation ซึ่งช่องว่างล้วนยังอาจผ่าน และ Clipboard API อาจไม่มี | เพิ่ม trim/length/email validation, encoded draft และ explicit Clipboard fallback |
| ✅ FIXED | ShareU อาจสื่อว่ามีพันธมิตรจริง | ระบุว่าเป็น “กลุ่มพันธมิตรที่เสนอใน Business Model” |
| 🟡 OWNER INPUT REQUIRED | ตัวเลข 126 Test Case, 34 tests, Coverage 99%, 95 checks และผลลัพธ์อื่น | เก็บข้อมูลเดิม ไม่กล่าวหาว่าปลอม; เจ้าของต้องเทียบ repository/เอกสารก่อนเผยแพร่ |
| 🟡 OWNER INPUT REQUIRED | เอกสาร/รูปอาจมีข้อมูลบุคคลอื่น | ต้องยืนยันสิทธิ์เผยแพร่และทำ public copy ที่ปิดข้อมูลเมื่อจำเป็น |

## 4. Medium Priority Issues

| สถานะ | ประเด็น | ผลดำเนินการ |
| --- | --- | --- |
| ✅ FIXED | Skills ใบแรกใช้ `row-span-2` ทำให้สัดส่วนไม่สมดุล | ใช้ grid 1/2/3 คอลัมน์และจัดแถวสุดท้ายให้อยู่กึ่งกลางบนจอกว้าง |
| ✅ FIXED | Gallery loader ใช้ `catch(() => {})` กลบทุก error | แยก `AbortError` และแจ้งผู้ชมเมื่อโหลดรูปไม่ได้ แต่คงรายละเอียดกิจกรรม |
| ✅ FIXED | ภาพปกภายนอกส่ง Referrer ได้ | เพิ่ม `referrerPolicy="no-referrer"` และ `<meta name="referrer" content="no-referrer">` |
| ✅ FIXED | ขนาด PDF hardcode ตาม `project.id` | ย้ายขนาดจริงไป metadata `evidence.sizeLabel` |
| 🟡 OWNER INPUT REQUIRED | CSP/security headers ขึ้นกับ Static Host | ไม่ใส่ policy แบบเดาเพราะอาจทำ HMR/รูป/PDF พัง; ตั้งหลังยืนยัน host และทดสอบ deployment |

## 5. Low Priority Improvements

- ✅ FIXED — ถอน dependencies ที่ไม่ถูก import: `clsx`, `framer-motion`, `react-router-dom`, `tailwind-merge`
- ✅ FIXED — นำ Vite/React scaffold ที่ไม่ถูกอ้างออก: `src/App.css`, `public/assets/hero.png`, `react.svg`, `vite.svg`, `public/icons.svg`, `tailwind.config.js`
- ✅ FIXED — เพิ่ม `npm run test` และ `npm run validate:content`
- ✅ FIXED — `START-WEBSITE.bat` ตรวจข้อมูลก่อนเริ่ม dev server

## 6. Changes Actually Implemented

1. ลบ “เปิดรับโอกาสร่วมงาน” ใน Hero
2. ลบ badge “ผู้สมัครสหกิจศึกษา” และ subtitle “ประวัติ การศึกษา และเป้าหมาย” ใน About
3. ลบ `about.education[0].status` ที่ทำให้แสดง bullet/บรรทัด “นักศึกษาชั้นปีที่ 4 • เปิดรับสหกิจศึกษา ปี 2026–2027”
4. ปรับ Skills 5 กลุ่มโดยไม่ตัด tag เดิม
5. ปรับ Contact validation/draft/Clipboard fallback เพิ่ม feedback ทุกครั้งที่กดเตรียมอีเมล และย้าย focus ไปผลลัพธ์
6. เพิ่ม `Privacy.jsx` และลิงก์จาก Footer/Contact
7. เพิ่ม content normalization, URL scheme checks, duplicate ID checks, local asset validation และ Error Boundary
8. เพิ่ม tests สำหรับ schema/URL/Contact โดยรักษา Activity Editor tests เดิม
9. ปรับ Gallery error handling, Project PDF metadata และ Referrer policy
10. ลด dependency/scaffold ที่พิสูจน์ว่าไม่ถูกอ้าง โดยคง PDF, Resume, ภาพผลงาน, ใบรับรอง, profile, Gallery, editor, lockfile, licenses และ legacy reference

## 7. Files Modified

ไฟล์สำคัญที่แก้/เพิ่ม:

- `src/components/Hero.jsx`, `About.jsx`, `Skills.jsx`, `Contact.jsx`, `Activities.jsx`, `ProjectModal.jsx`, `ProjectVisual.jsx`, `Footer.jsx`, `Privacy.jsx`, `PortfolioErrorBoundary.jsx`
- `src/data/portfolioContent.json`, `portfolioData.js`, `normalizePortfolio.js`
- `src/utils/assets.js`, `contact.js`, `src/index.css`, `src/main.jsx`, `src/App.jsx`
- `tools/validate-content.mjs`, `tools/content-validation.test.mjs`
- `package.json`, `package-lock.json`, `index.html`, `START-WEBSITE.bat`, `README.md`, `START-HERE.html`

รายการไฟล์ที่นำออกและเหตุผลอยู่ใน `SIZE-OPTIMIZATION.md`

## 8. Accessibility Fixes

- ✅ FIXED — Skill tags ใช้ `<ul>/<li>` และการ์ดข้อมูลไม่เพิ่ม `tabindex`/pointer interaction ปลอม
- ✅ FIXED — ไอคอนตกแต่งใน Skill cards ใช้ `aria-hidden`
- ✅ FIXED — Contact status ใช้ `role="status"` และ `aria-live="polite"`
- ✅ FIXED — Error state ของ Gallery แจ้งข้อความโดยส่วนข้อมูลกิจกรรมยังอ่านได้
- ✅ RETAINED — skip link, semantic sections/headings, label/input associations, native `<dialog>`, Escape, focus return, visible focus, reduced motion, image alt และ mobile menu `aria-expanded`
- 🧪 NOT VERIFIED — manual keyboard order, zoom/reflow 400%, contrast sampling, screen reader announcement และ modal focus containment ต้องตรวจใน browser/assistive technology จริง

## 9. Privacy & Cookie Fixes

- ✅ FIXED — เพิ่มคำอธิบาย data flow ของ Contact, Clipboard, external images/links และ hosting logs ที่อาจเกิดขึ้น
- ✅ FIXED — ไม่กล่าวว่า “ไม่เก็บข้อมูลใดเลย” และไม่สร้าง policy ของ host จากการเดา
- ⚪ NOT APPLICABLE — ไม่สร้าง Cookie consent banner เพราะ source ไม่พบ non-essential cookies/tracking ที่ต้อง block ก่อน consent
- 🟡 OWNER INPUT REQUIRED — ตรวจ deployment จริงอีกครั้ง หาก host/plugin เพิ่ม analytics, cookies, CDN logs หรือ form service

## 10. Tracking / Third-Party Services Found

| Service | โหลดเมื่อใด | ข้อมูลที่อาจเห็น | สถานะ |
| --- | --- | --- | --- |
| `opengraph.githubassets.com` | อัตโนมัติเมื่อภาพปก 6 โปรเจกต์เข้าหน้า/viewport | IP, request metadata; Referrer ถูกปิดจากหน้าเว็บ | ✅ DISCLOSED |
| GitHub/GitHub Pages | เมื่อกดลิงก์; และตาม host จริงหาก deploy ที่ GitHub Pages | Provider logs/IP ตามนโยบาย | ✅ DISCLOSED |
| Coursera S3 certificate URLs | เมื่อกด “ดูใบรับรอง” 3 รายการ | Provider logs/request metadata | ✅ DISCLOSED |
| Email app/provider | เมื่อผู้ใช้กดเปิดแอปและเลือกส่ง | ชื่อ อีเมล หัวข้อ ข้อความ | ✅ DISCLOSED |

GitHub ระบุว่า GitHub Pages บันทึก IP ของผู้เข้าชมเพื่อความปลอดภัย ดู [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection)

## 11. Copyright / Asset Issues

| Asset | สถานะ | เหตุผล/สิ่งที่ต้องทำ |
| --- | --- | --- |
| Sarabun/Playfair Display | LIKELY SAFE | มี OFL และ `SOURCE.txt`; เก็บไฟล์ใบอนุญาตครบ |
| `lucide-react` icons | LIKELY SAFE | ใช้ dependency ที่ประกาศใน lockfile; ตรวจ license ตอนเผยแพร่ repository |
| Profile/ผลงาน/ใบรับรอง/PDF | NEEDS LICENSE VERIFICATION | เป็นไฟล์ต้นฉบับที่ผู้ใช้ให้มา แต่ source ไม่มีเอกสารยืนยันสิทธิ์เผยแพร่/ความยินยอมของบุคคลอื่น |
| GitHub OpenGraph previews | NEEDS LICENSE VERIFICATION | เป็น preview ของ repository ที่ระบุ; ตรวจสิทธิ์ของภาพใน repository ต้นทาง |

ไม่แทนผลงานจริงด้วย stock/mock assets และไม่กล่าวว่าเป็น infringement เพียงเพราะยังไม่มีหลักฐาน license ใน ZIP

## 12. Forms & Data Collection

- Contact ใช้ React state ใน browser, `mailto:` และ Clipboard ไม่มี request ไป Backend
- ฟอร์มตรวจ name/email/subject/message, trim whitespace, จำกัด 100/180/150/1500 ตัวอักษร และ encode subject/body
- ผู้รับถูกกำหนดจาก `personal.email`; ผู้กรอกเลือก recipient ไม่ได้
- ไม่มี direct send, auto retry, fake success หรือ API secret
- 🟡 OWNER INPUT REQUIRED — หากต้องการ Direct Send ต้องระบุ host/form provider/domain verification/retention/anti-spam และเก็บ secret ฝั่ง Server

## 13. Marketing Claims Removed/Rewritten

- ✅ FIXED — ลบข้อความ UI 4 จุดตามคำขอ
- ✅ FIXED — ShareU แยก “กลุ่มพันธมิตรที่เสนอใน Business Model” จากความร่วมมือจริง
- ✅ RETAINED AS UNVERIFIED OWNER CONTENT — ตัวเลข Test Case/tests/Coverage/checks เพราะมีบริบทเป็นผลที่บันทึกในโปรเจกต์ แต่ยังเข้าถึง repository เพื่อเทียบหลักฐานไม่ได้
- 🟡 OWNER INPUT REQUIRED — `ICDL: การใช้งาน Spreadsheets` ใช้ issuer “Huawei” ใน JSON ควรเทียบกับภาพใบรับรองจริง

## 14. Legal Pages Created/Modified

- เพิ่ม section “ข้อมูลความเป็นส่วนตัว” ที่ตรงกับการทำงานจริงและเข้าถึงจาก Footer/Contact
- ⚪ NOT APPLICABLE — ไม่สร้าง Refund, payment, cancellation หรือ subscription policy เพราะไม่มีระบบเหล่านั้น
- ⚪ NOT APPLICABLE — ไม่เพิ่ม Terms ยาว/ข้อจำกัดความรับผิดที่เดาเขตอำนาจสำหรับ Portfolio แบบ static
- ไม่เปิดเผยที่อยู่บ้าน เลขทะเบียน หรือเบอร์โทรศัพท์เพิ่ม

## 15. Information Still Needed From Owner

1. Static hosting provider, domain, deployment method และ server/CDN logs/retention
2. ยืนยันว่าจะใช้ GitHub Pages จริงหรือ host อื่น
3. หลักฐานตัวเลขผลทดสอบ/coverage/checks ในแต่ละ repository
4. สิทธิ์เผยแพร่ภาพบุคคลอื่น โลโก้ ใบรับรอง และเอกสารที่แนบ
5. ตรวจ issuer ของ ICDL และข้อมูลชื่อ/ปี/GPA/Resume ให้เป็นปัจจุบัน
6. ถ้าต้องการ Direct Send: provider, endpoint/server runtime, verified sender domain, anti-spam และ retention policy

## 16. Items Requiring Legal Review

| Potential regulation | Why it may apply | Actual website behavior | Missing facts | Risk |
| --- | --- | --- | --- | --- |
| Thailand PDPA | เจ้าของอยู่ไทยและอาจมีการประมวลผลข้อมูลผู้ติดต่อ/host logs | Form อยู่ใน browser แล้วผู้ใช้ส่งผ่าน email provider; host อาจ log IP | Host, controller details, retention, purpose/legal basis ของ deployment จริง | 🟠 LEGAL REVIEW RECOMMENDED |
| GDPR/UK GDPR/ePrivacy | อาจเกี่ยวข้องเมื่อมุ่งให้บริการ/ติดตามบุคคลในเขตนั้น | ไม่พบ analytics/cookies; มี external image requests | กลุ่มผู้ชม/การ targeting, host/CDN location และ logs | เงื่อนไขยังไม่ครบ |
| CCPA/CPRA | ขึ้นกับประเภทธุรกิจ/threshold และการขายหรือแชร์ข้อมูล | ไม่พบการขาย/โฆษณา/บัญชีผู้ใช้ | สถานะธุรกิจและ traffic | ⚪ NOT APPLICABLE จาก source ปัจจุบัน; ทบทวนเมื่อขอบเขตเปลี่ยน |
| Consumer protection | อาจเกี่ยวกับคำกล่าวอ้างที่ทำให้เข้าใจผิด | ไม่มี checkout; มีตัวเลขผลงานเจ้าของ | หลักฐานของตัวเลข/ความร่วมมือ | 🟠 REVIEW CONTENT |
| Accessibility obligations | ขึ้นกับองค์กร ผู้ชม และเขตอำนาจ | เพิ่มแนวปฏิบัติด้าน accessibility หลายจุด | ยังไม่มี formal conformance audit | 🟠 REVIEW IF REQUIRED |

แหล่งทางการ: [พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562](https://ratchakitcha.soc.go.th/documents/17082307.pdf) และ [สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล](https://pdpc.or.th/)

## 17. Testing Performed

ผลจริงในสภาพแวดล้อมนี้:

| การตรวจ | ผล |
| --- | --- |
| `npm ci` | ✅ ผ่าน; clean install 68 packages ก่อนถอน unused dependencies |
| `npm run lint` | ✅ ผ่าน |
| `npm run validate:content` | ✅ ผ่าน: 8 โปรเจกต์, 2 กิจกรรม, 7 ใบรับรอง, 5 กลุ่มทักษะ |
| `npm run test` | ✅ ผ่าน 8/8 (Activity Editor 5 + schema/contact 3) |
| `npm run build` | ✅ ผ่าน Vite 8.2.2 |
| `npm audit --omit=dev --json` | ✅ 0 vulnerabilities ใน production dependency graph ณ เวลาตรวจ |
| Root/subpath static checks | ✅ `/` และ `/portfolio/`; HTML ใช้ relative JS/CSS; TTF/JPG/PDF/JSON ได้ MIME และขนาดถูกต้อง |
| Production editor exposure | ✅ ไม่พบ `__activity-editor`, `__activity-api` หรือปุ่มแก้รูปใน `dist` |
| PDF inspection | ✅ 10/34/1 หน้า; ไม่มี JavaScript/encryption; hash ตรง input |
| Browser visual QA | 🧪 NOT VERIFIED — cloud browser เปิด localhost ไม่ได้ |
| `npm run preview` | 🧪 NOT VERIFIED — Node 24 ใน environment คืน `uv_interface_addresses`; production files จึงทดสอบผ่าน temporary static server แทน |
| External repository status | 🧪 NOT VERIFIED — การเข้าถึง GitHub repository ถูกจำกัดใน environment; ต้องเปิดจาก deployment จริง |

ไม่มีการส่งอีเมลจริง ไม่มีการ publish/deploy และไม่มีการทดสอบที่เปลี่ยน Gallery จริง

## 18. Remaining Risks

- Visual layout ที่ 375/390/768/1280/1440, keyboard/focus และ screen reader ยังต้องตรวจด้วย browser จริง
- Remote project previews สร้าง third-party request; ทางเลือก privacy สูงกว่าคือใช้ภาพ local ที่เจ้าของมีสิทธิ์ แต่ยังไม่สร้างภาพแทนโดยไม่มีต้นฉบับ
- Host headers/CSP/HSTS/cache policy ไม่อยู่ใน ZIP และต้องตั้งตามผู้ให้บริการ
- External links, repository evidence และ certificate URLs อาจเปลี่ยนหลังวันที่ตรวจ
- ข้อมูลต้นฉบับขนาดใหญ่ทำให้ clone/deploy ช้า แม้ยังต่ำกว่า hard limit ต่อไฟล์ของ GitHub

## 19. Size Before/After and Data Preservation

- Input Source ZIP: `112,231,696 bytes` (ประมาณ `107.03 MiB`)
- Output Source ZIP: `112,162,565 bytes` (ประมาณ `106.97 MiB`)
- รายละเอียด extracted/source/dist, files removed, recovery, counts และ hashes อยู่ใน `SIZE-OPTIMIZATION.md`
- PDF, Resume, ภาพผลงาน, ใบรับรอง, profile, Gallery, font licenses และ legacy reference ที่กำหนดให้รักษายังคงอยู่
- ไม่ลดคุณภาพภาพ/PDF และ PDF สำคัญยังมี SHA-256 ตรง input

## 20. วิธีใช้งานหลังแตก ZIP

1. เปิด `START-HERE.html`
2. ติดตั้ง Node รุ่นที่รองรับและรัน `START-WEBSITE.bat`
3. แก้ข้อมูลที่ `src/data/portfolioContent.json`
4. รัน `npm.cmd run test` และ `npm.cmd run build`
5. Deploy เฉพาะเนื้อหาใน `dist`
6. ก่อนส่งสมัครงาน ให้ทำ Owner checklist ในหัวข้อ 15 และ visual QA บนเครื่อง Windows/โทรศัพท์จริง
7. หากต้องการ Direct Send ต้องตั้งค่าบริการจริงก่อน; รุ่นนี้ใช้ `mailto:` อย่างตรงไปตรงมา
