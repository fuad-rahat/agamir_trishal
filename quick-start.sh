#!/bin/bash
# Quick Start Script for Trishal Civic Map

echo "================================"
echo "Trishal Civic Map - Quick Start"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version) detected"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✓ Backend dependencies installed"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd ../frontend
npm install
echo "✓ Frontend dependencies installed"
echo ""

# Instructions
echo "================================"
echo "Setup Complete! 🎉"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Admin Panel:"
echo "  URL: http://localhost:3000/admin/login"
echo "  Email: admin@trishal.local"
echo "  Password: admin123"
echo ""
echo "For more info, read README.md or SETUP_GUIDE.md"
echo ""
