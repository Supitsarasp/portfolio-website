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
call npm.cmd run validate:content
if errorlevel 1 (
  echo ข้อมูลเว็บไซต์ไม่ถูกต้อง กรุณาแก้ field ตามข้อความด้านบน แล้วลองใหม่
  pause
  exit /b 1
)
echo เปิดหน้าต่างนี้ค้างไว้ระหว่างใช้งานเว็บ กด Ctrl+C เมื่อต้องการปิด
call npm.cmd run dev -- --open
pause
