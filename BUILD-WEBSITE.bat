@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo กรุณาติดตั้ง Node.js รุ่น LTS จาก https://nodejs.org แล้วเปิดไฟล์นี้อีกครั้ง
  pause
  exit /b 1
)
if not exist "node_modules\vite\package.json" (
  echo กำลังติดตั้งแพ็กเกจ กรุณารอสักครู่...
  call npm.cmd ci
  if errorlevel 1 (
    echo ติดตั้งไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตและรุ่น Node.js แล้วลองใหม่
    pause
    exit /b 1
  )
)
call npm.cmd run build
if errorlevel 1 (
  echo สร้างเว็บไม่สำเร็จ กรุณาตรวจข้อความด้านบน
) else (
  echo สร้างเว็บสำเร็จแล้ว นำไฟล์ทั้งหมดในโฟลเดอร์ dist ขึ้นโฮสต์ได้เลย
)
pause
