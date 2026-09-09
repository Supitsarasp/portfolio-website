# รายงานการลดขนาดและการรักษาข้อมูล

## สรุป

ไฟล์ที่ได้รับเป็นรุ่นที่ตัด `node_modules` และ `dist` มาแล้ว จึงใช้ ZIP ปัจจุบันเป็น baseline และไม่นับการลดจากรุ่นเก่าประมาณ 251 MiB เป็นผลงานครั้งนี้

| รายการ | Bytes | MiB |
| --- | ---: | ---: |
| Input ZIP `Portfolioo.zip` | 112,231,696 | 107.03 |
| Input source เมื่อแตกไฟล์ (66 files) | 114,275,470 | 108.98 |
| Output source ก่อน ZIP ไม่รวม `node_modules/dist/cache` (68 files) | 114,279,473 | 108.99 |
| Output Source ZIP | 112,162,565 | 106.97 |
| Production `dist` ที่สร้างเพื่อตรวจ (ไม่รวมใน Source ZIP, 26 files) | 114,316,720 | 109.02 |

ขนาดอาจเพิ่มเล็กน้อยจากรายงาน/validation/tests ที่จำเป็น แม้นำ scaffold และ dependencies ที่ไม่ใช้ออกแล้ว แหล่งขนาดหลักคือ PDF ต้นฉบับ 2 ไฟล์รวม 107,998,399 bytes ซึ่งไม่ได้แก้คุณภาพหรือ duplicate ใน Source ZIP

## ไฟล์ที่นำออก

| ไฟล์/รายการ | ขนาด input | เหตุผล | วิธีคืน |
| --- | ---: | --- | --- |
| `src/App.css` | 2,891 bytes | CSS scaffold ไม่ถูก import | ดึงจาก ZIP input หากต้องใช้เป็น reference |
| `public/assets/hero.png` | 13,057 bytes | ภาพ scaffold เดิม ไม่ถูกอ้างใน JSON/JSX/CSS/HTML/docs/scripts | ดึงจาก ZIP input |
| `public/assets/react.svg` | 4,126 bytes | Vite scaffold ไม่ถูกอ้าง | ดึงจาก ZIP input |
| `public/assets/vite.svg` | 8,709 bytes | Vite scaffold ไม่ถูกอ้าง | ดึงจาก ZIP input |
| `public/icons.svg` | 5,031 bytes | icon sprite เดิมไม่ถูกอ้าง; หน้าเว็บใช้ `lucide-react` | ดึงจาก ZIP input |
| `tailwind.config.js` | 873 bytes | config รูปแบบเดิมไม่ถูกโหลด; Tailwind v4 theme อยู่ใน `src/index.css` และ build ผ่านโดยไม่มีไฟล์นี้ | ดึงจาก ZIP input |
| `clsx`, `framer-motion`, `react-router-dom`, `tailwind-merge` | dependency metadata | ไม่พบ import ใน source; ถอนผ่าน npm และอัปเดต lockfile | `npm install clsx framer-motion react-router-dom tailwind-merge` เฉพาะเมื่อเพิ่มการใช้งานจริง |

นำออกเฉพาะ target ที่ตรวจด้วย `rg` ครอบคลุม JSON, dynamic path helpers, JSX, CSS, HTML, README และ scripts แล้วไม่พบ reference จากนั้นรัน clean tests/build ซ้ำ

## สิ่งที่คงไว้

- PDF ผลงาน `LittleKids .pdf` และ `Share U.pdf`
- Resume PDF และ `Resume-TH.html`
- รูปโปรเจกต์ ใบรับรอง profile และ `รับเรื่องร้องเรียน.png`
- `public/activities/gallery.json` และ `tools/activity-editor.*`
- `package-lock.json`, Vite/PostCSS config และ Windows scripts
- `legacy/generate-components.original.cjs`
- `OFL-Sarabun.txt`, `OFL-PlayfairDisplay.txt`, `SOURCE.txt` และฟอนต์ local

ไม่ลบรูป/PDF ที่เป็นข้อมูลต้นฉบับเพียงเพื่อไล่ตัวเลขขนาด และไม่ลบไฟล์รูปที่ยังอาจเป็นผลงานของเจ้าของ

## Data-preservation verification

ไฟล์สำคัญต่อไปนี้เปรียบเทียบกับ input แบบ byte-for-byte แล้วตรงกัน:

| ไฟล์ | SHA-256 |
| --- | --- |
| `public/assets/LittleKids .pdf` | `b6da61bec58a2da4ee2fd8c22ddfb3692e6e10090ff19a500dc0f5f0dde92f4e` |
| `public/assets/Share U.pdf` | `e9faff74aa6a2f538b80841b98ae8ba4bbe0d8f8f2fb7b3ee45fdc8a28fe38ad` |
| `public/files/Supitsara-Suanngam-Resume-TH.pdf` | `4a69c163e40e888c64e35a88f0028249f0b229f80192582349583bd5c73ffeec` |
| `public/files/Resume-TH.html` | `b2b47fe8e2639a14dce94d2cf6e21ff804c72fdac92a1b0b3e9dfa95ab132ccd` |
| `public/profile.jpg` | `93eb64ee13bc2803e09127b3bd35f356b68deadb1605ed1624f906fa20c22cce` |
| `public/fonts/OFL-Sarabun.txt` | `b26cae1321380296ba8311b632a397d5eac11b47197f9d0aa0b9310f1531ad60` |
| `public/fonts/OFL-PlayfairDisplay.txt` | `566be814f8e96e93dfa16101331557eb6b5467e9e03f627c0910fe93ca12300e` |
| `public/fonts/SOURCE.txt` | `03a38d5711080cc740ed792e0ef7b8df5400ac66803e9a0d0095b8687422bfb7` |

PDF inspection:

- LITTLEKIDS: 10 หน้า, Tagged, ไม่มี JavaScript, ไม่เข้ารหัส, 87,545,147 bytes
- ShareU: 34 หน้า, Tagged, ไม่มี JavaScript, ไม่เข้ารหัส, 20,453,252 bytes
- Resume: 1 หน้า A4, ไม่มี JavaScript, ไม่เข้ารหัส, 25,716 bytes

## Quality changes

- ไม่มีการ downsample, recompress หรือ rewrite PDF/รูป
- ไม่มีการ subset/แปลงฟอนต์
- ไม่มีการเปลี่ยนข้อความใน Resume/PDF ต้นฉบับ
- การลดขนาดมาจาก scaffold/dependency metadata ที่ไม่ใช้ และการไม่แพ็ก generated files ซ้ำ

## Packaging allowlist/exclusions

Source ZIP ต้องมีโฟลเดอร์ `Test/` และตัดเฉพาะ:

```text
Test/node_modules/
Test/dist/
Test/.vite/
Test/coverage/
Test/*.log
```

ตัวอย่าง PowerShell หลังรัน tests/build แล้ว:

```powershell
Compress-Archive -Path .\Test\* -DestinationPath .\Portfolioo-fixed-verified-source.zip
```

ก่อนใช้ `Compress-Archive` ต้องนำ `node_modules` และ `dist` ออกจากสำเนาสำหรับแพ็ก หรือใช้รายการไฟล์ที่เจาะจง เพราะ `.gitignore` ไม่ทำให้โปรแกรม ZIP ข้ามไฟล์ให้อัตโนมัติ

## Production build

สร้าง `dist` สำเร็จเพื่อทดสอบ แต่ไม่รวมใน Source ZIP และไม่สร้าง Production ZIP แยก เพราะจะทำ asset/PDF ชุดเดียวกันซ้ำอีกราว 109 MiB โดยไม่จำเป็น ผู้ใช้สร้างใหม่ได้ด้วย:

```powershell
npm.cmd ci
npm.cmd run test
npm.cmd run build
```

## ข้อจำกัด

- Source ZIP ไม่ใช่ชุดเปิดออฟไลน์ทันที การติดตั้งครั้งแรกต้องเข้าถึง npm registry
- PDF `LittleKids .pdf` ขนาด 83.49 MiB เกิน 25 MiB ของ GitHub Web uploader และเกินระดับเตือน 50 MiB แต่ต่ำกว่า hard limit 100 MiB ของ regular Git ตาม [GitHub Docs](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- การเก็บ PDF ต้นฉบับไว้ครบทำให้ไม่สามารถลด ZIP ลงมากโดยไม่เปลี่ยนคุณภาพ/คุณสมบัติเอกสาร
- หากต้องการไฟล์เว็บขนาดเล็กจริง ให้ทำ web-optimized copy แยกจากต้นฉบับและตรวจ text, links, tags, pages และ visual quality ก่อน แต่ไม่ได้ทำในงานนี้เพราะต้องรักษาต้นฉบับครบ
