@echo off
REM Quick Setup Script for Trishal Problem Reporting System
REM This script helps set up the backend and seed the union data

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   Trishal Problem Reporting System - Quick Setup          ║
echo ║   Setup Database and Seed Union Data                       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo ❌ Error: backend directory not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo 📦 Setting up backend environment...
echo.

cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📥 Installing backend dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ npm install failed!
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies already installed
)

echo.
echo 🌱 Seeding union data to MongoDB...
echo.

call npm run seed:unions

if errorlevel 1 (
    echo.
    echo ❌ Seeding failed! 
    echo Please check:
    echo   1. MongoDB connection string in .env file
    echo   2. MongoDB server is running
    echo   3. Internet connection is working
    pause
    exit /b 1
)

echo.
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   ✓ Setup Complete!                                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo.
echo 1. Start the backend server:
echo    cd backend
echo    npm run dev
echo.
echo 2. In another terminal, start the frontend:
echo    cd frontend
echo    npm start
echo.
echo 3. Open http://localhost:3000 in your browser
echo.
echo 4. Go to http://localhost:3000/report-problem to test
echo.
pause
