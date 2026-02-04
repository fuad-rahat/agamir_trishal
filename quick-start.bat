@echo off
REM Quick Start Script for Trishal Civic Map (Windows)

echo.
echo ================================
echo Trishal Civic Map - Quick Start
echo ================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo XX Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK Node.js %NODE_VERSION% detected
echo.

REM Backend Setup
echo.
echo Packages Setting up Backend...
cd backend
call npm install
echo OK Backend dependencies installed
echo.

REM Frontend Setup
echo.
echo Packages Setting up Frontend...
cd ..\frontend
call npm install
echo OK Frontend dependencies installed
echo.

REM Instructions
echo.
echo ================================
echo Setup Complete! [SUCCESS]
echo ================================
echo.
echo To start the application:
echo.
echo Command Prompt 1 - Backend:
echo   cd backend
echo   npm start
echo.
echo Command Prompt 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo Then open: http://localhost:3000
echo.
echo Admin Panel:
echo   URL: http://localhost:3000/admin/login
echo   Email: admin@trishal.local
echo   Password: admin123
echo.
echo For more info, read README.md or SETUP_GUIDE.md
echo.
pause
