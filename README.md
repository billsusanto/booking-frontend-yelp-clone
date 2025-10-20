# 🧠 Yelp-Level Booking Web App

A modern, high-quality booking web application inspired by Yelp, built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

![Booking App](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Modern UI/UX**: Clean, premium design with smooth animations
- **Home Page**: Hero search bar, category browsing, and featured business carousel
- **Search Results**: Advanced filtering, grid/list toggle, and mock map view
- **Business Details**: Image carousel, tabbed content, reviews, and booking flow
- **Booking Flow**: Date/time picker, guest selection, and confirmation modal
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG AA compliant with proper ARIA labels
- **Mock Data**: Frontend-only implementation with local JSON data

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/billsusanto/booking-frontend-yelp-clone.git

# Navigate to project directory
cd booking-frontend-yelp-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Date Handling**: date-fns

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── listings/
│   │   └── page.tsx        # Search results
│   └── business/
│       └── [id]/
│           └── page.tsx    # Business detail
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   ├── SearchBar.tsx       # Search input
│   ├── BusinessCard.tsx    # Business listing card
│   └── ...                 # Other components
├── data/
│   └── mockData.json       # Mock business data
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    └── mock/               # Mock images
```

## 🎨 Design System

- **Primary Color**: Coral Red (#FF6B6B)
- **Secondary Color**: Fresh Teal (#4ECDC4)
- **Accent Color**: Warm Yellow (#FFE66D)
- **Typography**: Inter (body), Poppins (headings)
- **Design Principles**: Mobile-first, minimal clicks, visual feedback

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This app is optimized for deployment on Netlify:

```bash
# Build command
npm run build

# Publish directory
.next
```

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
