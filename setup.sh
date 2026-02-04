#!/bin/bash

# Quick Setup Script for Trishal Problem Reporting System
# This script helps set up the backend and seed the union data

clear
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Trishal Problem Reporting System - Quick Setup          ║"
echo "║   Setup Database and Seed Union Data                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "📦 Setting up backend environment..."
echo ""

cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📥 Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ npm install failed!"
        exit 1
    fi
    echo "✓ Dependencies installed"
else
    echo "✓ Dependencies already installed"
fi

echo ""
echo "🌱 Seeding union data to MongoDB..."
echo ""

npm run seed:unions

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Seeding failed!"
    echo "Please check:"
    echo "  1. MongoDB connection string in .env file"
    echo "  2. MongoDB server is running"
    echo "  3. Internet connection is working"
    exit 1
fi

echo ""
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   ✓ Setup Complete!                                        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo ""
echo "1. Start the backend server:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. In another terminal, start the frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "4. Go to http://localhost:3000/report-problem to test"
echo ""
