#!/usr/bin/env bash

# Verification Script - Confirms all components are in place
# Usage: bash verify-installation.sh

clear
echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                   SYSTEM VERIFICATION TOOL                   ║"
echo "║           Problem Reporting System - Complete Check          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

ERRORS=0
WARNINGS=0

check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ $1 (MISSING)"
        ((ERRORS++))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo "✅ $1/"
    else
        echo "❌ $1/ (MISSING)"
        ((ERRORS++))
    fi
}

check_command() {
    if command -v "$1" &> /dev/null; then
        echo "✅ $1 installed"
    else
        echo "⚠️  $1 not found"
        ((WARNINGS++))
    fi
}

echo "═══════════════════════════════════════════════════════════════"
echo " 1. CHECKING CORE DIRECTORIES"
echo "═══════════════════════════════════════════════════════════════"
echo ""

check_dir "backend"
check_dir "frontend"
check_dir "backend/scripts"
check_dir "frontend/src"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " 2. CHECKING CREATED FILES"
echo "═══════════════════════════════════════════════════════════════"
echo ""

check_file "backend/scripts/seedUnions.js"
check_file "frontend/src/utils/unionMapping.js"
check_file "setup.bat"
check_file "setup.sh"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " 3. CHECKING DOCUMENTATION FILES"
echo "═══════════════════════════════════════════════════════════════"
echo ""

check_file "QUICK_START_GUIDE.md"
check_file "SYSTEM_VERIFICATION_CHECKLIST.md"
check_file "PROBLEM_REPORTING_INTEGRATION_GUIDE.md"
check_file "PROBLEM_REPORTING_COMPLETE_INTEGRATION.md"
check_file "TESTING_CHECKLIST.md"
check_file "DOCUMENTATION_INDEX.md"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " 4. CHECKING MODIFIED FILES"
echo "═══════════════════════════════════════════════════════════════"
echo ""

check_file "backend/package.json"
check_file "frontend/src/pages/ReportProblemPage.js"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " 5. CHECKING REQUIRED TOOLS"
echo "═══════════════════════════════════════════════════════════════"
echo ""

check_command "node"
check_command "npm"
check_command "git"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " 6. CHECKING DEPENDENCIES INSTALLED"
echo "═══════════════════════════════════════════════════════════════"
echo ""

if [ -d "backend/node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend dependencies not installed (run: cd backend && npm install)"
    ((WARNINGS++))
fi

if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed (run: cd frontend && npm install)"
    ((WARNINGS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " 7. CHECKING ENVIRONMENT CONFIGURATION"
echo "═══════════════════════════════════════════════════════════════"
echo ""

if [ -f "backend/.env" ]; then
    echo "✅ Backend .env file exists"
else
    echo "⚠️  Backend .env file not found (create it with MongoDB URI)"
    ((WARNINGS++))
fi

if [ -f "frontend/.env" ] || [ -f "frontend/.env.local" ]; then
    echo "✅ Frontend .env file exists"
else
    echo "⚠️  Frontend .env file not found (create it with REACT_APP_API_URL)"
    ((WARNINGS++))
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo " SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo "✅ All files present"
else
    echo "❌ $ERRORS file(s) missing"
fi

if [ $WARNINGS -eq 0 ]; then
    echo "✅ All checks passed"
else
    echo "⚠️  $WARNINGS warning(s)"
fi

echo ""
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "🎉 SYSTEM READY FOR TESTING"
    echo ""
    echo "Next steps:"
    echo "  1. Verify backend and frontend can start:"
    echo "     cd backend && npm run dev"
    echo "     cd frontend && npm start"
    echo ""
    echo "  2. Run the testing checklist:"
    echo "     Read TESTING_CHECKLIST.md"
    echo ""
    echo "  3. Submit your first problem:"
    echo "     Go to http://localhost:3000/report-problem"
    echo ""
elif [ $ERRORS -eq 0 ] && [ $WARNINGS -gt 0 ]; then
    echo "⚠️  SYSTEM MOSTLY READY - Address warnings first"
    echo ""
    echo "Run these commands:"
    echo "  cd backend && npm install"
    echo "  cd frontend && npm install"
    echo "  npm run seed:unions  # from backend directory"
    echo ""
else
    echo "❌ SYSTEM NOT READY - Fix errors first"
    echo ""
    echo "Please check the files listed with ❌ above"
    echo ""
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
