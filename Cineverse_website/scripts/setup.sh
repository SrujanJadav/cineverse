#!/bin/bash

echo "🎬 CineVerse Setup Script"
echo "=========================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version) found"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check Java
if command -v java &> /dev/null; then
    echo "✅ Java $(java -version 2>&1 | head -n 1) found"
else
    echo "❌ Java not found. Please install Java 17+"
    exit 1
fi

# Check Maven
if command -v mvn &> /dev/null; then
    echo "✅ Maven $(mvn --version | head -n 1) found"
else
    echo "❌ Maven not found. Please install Maven 3.6+"
    exit 1
fi

# Check Docker
if command -v docker &> /dev/null; then
    echo "✅ Docker $(docker --version) found"
else
    echo "❌ Docker not found. Please install Docker"
    exit 1
fi

echo ""
echo "All prerequisites met!"
echo ""

# Setup frontend
echo "Setting up frontend..."
cd frontend
cp .env.example .env
npm install
echo "✅ Frontend setup complete"
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start services: docker-compose up -d"
echo "2. Or run manually: See QUICK_START.md"
echo "3. Access frontend: http://localhost:3000"
echo ""
