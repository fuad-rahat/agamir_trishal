@echo off
REM Verification Script - Confirms all components are in place
REM Usage: verify-installation.bat

cls
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                   SYSTEM VERIFICATION TOOL                   ║
echo ║           Problem Reporting System - Complete Check          ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion
set ERRORS=0
set WARNINGS=0

echo ═══════════════════════════════════════════════════════════════
echo  1. CHECKING CORE DIRECTORIES
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "backend" (
    echo ✅ backend\
) else (
    echo ❌ backend\ (MISSING)
    set /a ERRORS+=1
)

if exist "frontend" (
    echo ✅ frontend\
) else (
    echo ❌ frontend\ (MISSING)
    set /a ERRORS+=1
)

if exist "backend\scripts" (
    echo ✅ backend\scripts\
) else (
    echo ❌ backend\scripts\ (MISSING)
    set /a ERRORS+=1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  2. CHECKING CREATED FILES
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "backend\scripts\seedUnions.js" (
    echo ✅ backend\scripts\seedUnions.js
) else (
    echo ❌ backend\scripts\seedUnions.js (MISSING)
    set /a ERRORS+=1
)

if exist "frontend\src\utils\unionMapping.js" (
    echo ✅ frontend\src\utils\unionMapping.js
) else (
    echo ❌ frontend\src\utils\unionMapping.js (MISSING)
    set /a ERRORS+=1
)

if exist "setup.bat" (
    echo ✅ setup.bat
) else (
    echo ❌ setup.bat (MISSING)
    set /a ERRORS+=1
)

if exist "setup.sh" (
    echo ✅ setup.sh
) else (
    echo ❌ setup.sh (MISSING)
    set /a ERRORS+=1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  3. CHECKING DOCUMENTATION FILES
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "QUICK_START_GUIDE.md" (
    echo ✅ QUICK_START_GUIDE.md
) else (
    echo ❌ QUICK_START_GUIDE.md (MISSING)
    set /a ERRORS+=1
)

if exist "SYSTEM_VERIFICATION_CHECKLIST.md" (
    echo ✅ SYSTEM_VERIFICATION_CHECKLIST.md
) else (
    echo ❌ SYSTEM_VERIFICATION_CHECKLIST.md (MISSING)
    set /a ERRORS+=1
)

if exist "PROBLEM_REPORTING_INTEGRATION_GUIDE.md" (
    echo ✅ PROBLEM_REPORTING_INTEGRATION_GUIDE.md
) else (
    echo ❌ PROBLEM_REPORTING_INTEGRATION_GUIDE.md (MISSING)
    set /a ERRORS+=1
)

if exist "PROBLEM_REPORTING_COMPLETE_INTEGRATION.md" (
    echo ✅ PROBLEM_REPORTING_COMPLETE_INTEGRATION.md
) else (
    echo ❌ PROBLEM_REPORTING_COMPLETE_INTEGRATION.md (MISSING)
    set /a ERRORS+=1
)

if exist "TESTING_CHECKLIST.md" (
    echo ✅ TESTING_CHECKLIST.md
) else (
    echo ❌ TESTING_CHECKLIST.md (MISSING)
    set /a ERRORS+=1
)

if exist "DOCUMENTATION_INDEX.md" (
    echo ✅ DOCUMENTATION_INDEX.md
) else (
    echo ❌ DOCUMENTATION_INDEX.md (MISSING)
    set /a ERRORS+=1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  4. CHECKING MODIFIED FILES
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "backend\package.json" (
    echo ✅ backend\package.json
) else (
    echo ❌ backend\package.json (MISSING)
    set /a ERRORS+=1
)

if exist "frontend\src\pages\ReportProblemPage.js" (
    echo ✅ frontend\src\pages\ReportProblemPage.js
) else (
    echo ❌ frontend\src\pages\ReportProblemPage.js (MISSING)
    set /a ERRORS+=1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  5. CHECKING REQUIRED TOOLS
echo ═══════════════════════════════════════════════════════════════
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo ✅ node installed
) else (
    echo ❌ node not found
    set /a WARNINGS+=1
)

where npm >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo ✅ npm installed
) else (
    echo ❌ npm not found
    set /a WARNINGS+=1
)

where git >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo ✅ git installed
) else (
    echo ⚠️  git not found
    set /a WARNINGS+=1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  6. CHECKING DEPENDENCIES INSTALLED
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "backend\node_modules" (
    echo ✅ Backend dependencies installed
) else (
    echo ⚠️  Backend dependencies not installed
    echo    Run: cd backend ^&^& npm install
    set /a WARNINGS+=1
)

if exist "frontend\node_modules" (
    echo ✅ Frontend dependencies installed
) else (
    echo ⚠️  Frontend dependencies not installed
    echo    Run: cd frontend ^&^& npm install
    set /a WARNINGS+=1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  7. CHECKING ENVIRONMENT CONFIGURATION
echo ═══════════════════════════════════════════════════════════════
echo.

if exist "backend\.env" (
    echo ✅ Backend .env file exists
) else (
    echo ⚠️  Backend .env file not found
    echo    Create it with MongoDB URI
    set /a WARNINGS+=1
)

if exist "frontend\.env" (
    echo ✅ Frontend .env file exists
) else (
    if exist "frontend\.env.local" (
        echo ✅ Frontend .env.local file exists
    ) else (
        echo ⚠️  Frontend .env file not found
        echo    Create it with REACT_APP_API_URL
        set /a WARNINGS+=1
    )
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo  SUMMARY
echo ═══════════════════════════════════════════════════════════════
echo.

if %ERRORS% equ 0 (
    echo ✅ All files present
) else (
    echo ❌ %ERRORS% file(s) missing
)

if %WARNINGS% equ 0 (
    echo ✅ All checks passed
) else (
    echo ⚠️  %WARNINGS% warning(s)
)

echo.

if %ERRORS% equ 0 (
    if %WARNINGS% equ 0 (
        echo 🎉 SYSTEM READY FOR TESTING
        echo.
        echo Next steps:
        echo   1. Verify backend and frontend can start:
        echo      cd backend ^&^& npm run dev
        echo      cd frontend ^&^& npm start
        echo.
        echo   2. Run the testing checklist:
        echo      Read TESTING_CHECKLIST.md
        echo.
        echo   3. Submit your first problem:
        echo      Go to http://localhost:3000/report-problem
        echo.
    ) else (
        echo ⚠️  SYSTEM MOSTLY READY - Address warnings first
        echo.
        echo Run these commands:
        echo   cd backend ^&^& npm install
        echo   cd frontend ^&^& npm install
        echo   npm run seed:unions  (from backend directory)
        echo.
    )
) else (
    echo ❌ SYSTEM NOT READY - Fix errors first
    echo.
    echo Please check the files listed with ❌ above
    echo.
)

echo ═══════════════════════════════════════════════════════════════
echo.

pause
