# 🚀 Clone & Redeploy Guide - BookNow Yelp Clone

Complete step-by-step instructions to clone and deploy the BookNow booking application to your own Netlify site.

---

## 🎯 Quick Overview

**Original Site:** https://booking-yelp-clone.netlify.app  
**GitHub Repo:** https://github.com/billsusanto/booking-frontend-yelp-clone  
**Tech Stack:** Next.js 14.2.18 + TypeScript + Tailwind CSS + Framer Motion  

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **Git** installed ([Download](https://git-scm.com/))
- ✅ **Netlify account** (free tier works) ([Sign up](https://app.netlify.com/signup))
- ✅ **GitHub account** (optional, for your own fork)

---

## 🔄 Method 1: Quick Deploy to Netlify (Recommended)

### Step 1: Fork the Repository (Optional)

If you want your own copy:

1. Go to https://github.com/billsusanto/booking-frontend-yelp-clone
2. Click **"Fork"** in the top right
3. This creates a copy in your GitHub account

### Step 2: Deploy to Netlify

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Log in or sign up

2. **Import from Git**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub

3. **Select Repository**
   - Find and select: `billsusanto/booking-frontend-yelp-clone`
   - (Or your fork if you created one)

4. **Configure Build Settings**
   
   Netlify should auto-detect, but verify:
   
   ```
   Build command:    npm run build
   Publish directory: out
   ```

5. **Advanced Settings** (click "Show advanced")
   
   Add environment variables:
   
   ```
   NODE_VERSION = 18.17.0
   NPM_FLAGS = --legacy-peer-deps
   NEXT_TELEMETRY_DISABLED = 1
   ```

6. **Deploy Site**
   - Click **"Deploy site"**
   - Wait 3-5 minutes for build to complete
   - Your site will be live at: `https://[random-name].netlify.app`

7. **Custom Domain** (Optional)
   - Go to **Site settings** → **Domain management**
   - Click **"Add custom domain"**
   - Set your preferred name: `your-name-yelp-clone.netlify.app`

---

## 💻 Method 2: Local Development → Deploy

### Step 1: Clone the Repository

```bash
# Clone the repo
git clone https://github.com/billsusanto/booking-frontend-yelp-clone.git

# Navigate to directory
cd booking-frontend-yelp-clone

# Check you're on the main branch
git branch
```

### Step 2: Install Dependencies

```bash
# Install all packages (this may take 2-3 minutes)
npm install

# If you encounter peer dependency warnings, use:
npm install --legacy-peer-deps
```

### Step 3: Run Development Server

```bash
# Start the dev server
npm run dev

# App will open at: http://localhost:3000
```

**Test the app locally:**
- ✅ Home page loads with search bar
- ✅ Categories are clickable
- ✅ Featured carousel works
- ✅ Search functionality works
- ✅ Business detail pages load

### Step 4: Build for Production

```bash
# Create production build
npm run build

# This creates the 'out' directory with static files
```

**Verify the build:**
```bash
# Check the output directory
ls -la out/

# Should contain:
# - index.html
# - listings/ (directory)
# - business/ (directory)
# - _next/ (directory with JS/CSS)
# - data/ (mock data)
```

### Step 5: Deploy to Netlify

#### Option A: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Team: [Your team]
# - Site name: your-yelp-clone
# - Build command: npm run build
# - Directory: out

# Deploy to production
netlify deploy --prod

# Your site is live!
```

#### Option B: Drag & Drop

1. Go to: https://app.netlify.com/drop
2. Drag the entire `out` folder
3. Site deploys instantly!
4. Claim the site to keep it

---

## 🔧 Method 3: Clone and Customize

### Step 1: Fork and Clone

```bash
# Fork on GitHub first, then:
git clone https://github.com/YOUR-USERNAME/booking-frontend-yelp-clone.git
cd booking-frontend-yelp-clone
```

### Step 2: Customize (Optional)

#### Change Site Name and Branding

Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Site Name - Book Local Businesses',
  description: 'Your custom description',
}
```

#### Update Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#FF6B6B', // Change to your brand color
  },
  // ... other colors
}
```

#### Modify Mock Data

Edit `public/data/mockData.json`:
- Add your own businesses
- Update images, descriptions, reviews
- Customize categories

### Step 3: Commit Your Changes

```bash
git add .
git commit -m "Customize branding and content"
git push origin main
```

### Step 4: Deploy

Follow **Method 1** to deploy your customized version!

---

## 🎨 What You're Deploying

### Pages
- **Home** (`/`) - Hero search, categories, featured carousel
- **Listings** (`/listings`) - Search results with filters
- **Business Detail** (`/business/[id]`) - Detail pages with booking flow

### Features
- ✅ Search functionality with autocomplete
- ✅ Category filtering (Restaurant, Cafe, Spa, Gym, Hotel, etc.)
- ✅ Advanced filters (rating, price, open now)
- ✅ Grid/List view toggle
- ✅ Business details with image carousel
- ✅ Review system with ratings
- ✅ Mock booking flow (date/time picker)
- ✅ Fully responsive design
- ✅ Smooth animations
- ✅ WCAG AA accessible

### Tech Stack
- **Framework:** Next.js 14.2.18 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4.17
- **Animation:** Framer Motion 11.11.17
- **Icons:** Lucide React 0.460.0
- **Date Handling:** date-fns 4.1.0

---

## 📊 Project Structure

```
booking-frontend-yelp-clone/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── listings/
│   │   └── page.tsx            # Search results
│   └── business/
│       └── [id]/
│           └── page.tsx        # Business detail
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Rating.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Skeleton.tsx
│   ├── Header.tsx              # Navigation
│   ├── Footer.tsx              # Footer
│   ├── SearchBar.tsx           # Search component
│   └── BusinessCard.tsx        # Business cards
├── public/
│   └── data/
│       └── mockData.json       # Mock business data (8 businesses)
├── lib/
│   └── utils.ts                # Utility functions
├── package.json                # Dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── netlify.toml                # Netlify build settings
```

---

## 🔍 Troubleshooting

### Build Fails on Netlify

**Error:** "Build script returned non-zero exit code"

**Solutions:**
1. **Check Node version:** Set to 18.17.0 in build settings
2. **Use legacy peer deps:** Add `NPM_FLAGS=--legacy-peer-deps`
3. **Clear cache:** Deploy settings → Clear cache and retry
4. **Try Method 2:** Build locally, then use Netlify CLI

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution:**
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Dependencies Installation Fails

**Error:** "npm install fails with peer dependency errors"

**Solution:**
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or use npm 7+ which handles peer deps better
npm install -g npm@latest
npm install
```

### Build Output is Empty

**Error:** "out directory is empty after build"

**Solution:**
```bash
# Ensure static export is enabled
# Check next.config.js has:
output: 'export'

# Clean and rebuild
rm -rf .next out
npm run build
```

### Images Not Loading

**Error:** "Images return 404"

**Solution:**
- Images are from Unsplash (external)
- Check internet connection
- Unsplash URLs should work without API key for basic usage

---

## ⚡ Performance Tips

### Optimize Build Times

1. **Enable build caching** (already configured in `netlify.toml`)
2. **Use npm ci** instead of npm install in CI/CD
3. **Skip telemetry:** `NEXT_TELEMETRY_DISABLED=1`

### Improve Site Speed

1. **Use Netlify CDN** (automatic)
2. **Enable asset compression** (configured)
3. **Set cache headers** (configured in `netlify.toml`)
4. **Optimize images:** Already using Next.js Image component

---

## 🎯 Customization Ideas

### Easy Customizations

1. **Change Colors:**
   - Edit `tailwind.config.ts`
   - Update primary/secondary/accent colors

2. **Add More Businesses:**
   - Edit `public/data/mockData.json`
   - Follow the same structure

3. **Modify Categories:**
   - Edit `app/page.tsx`
   - Update the categories array

4. **Custom Domain:**
   - In Netlify: Site settings → Domain management
   - Add your custom domain

### Advanced Customizations

1. **Connect Real Backend:**
   - Replace mock data with API calls
   - Update `lib/utils.ts` → `fetchMockData()`

2. **Add Authentication:**
   - Install NextAuth.js
   - Add user login/signup pages

3. **Real Booking System:**
   - Integrate with Stripe for payments
   - Add booking confirmation emails

4. **Search Enhancement:**
   - Add Google Places API
   - Real location search

---

## 📚 Resources

### Documentation
- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Netlify:** https://docs.netlify.com
- **Framer Motion:** https://www.framer.com/motion

### Support
- **GitHub Issues:** https://github.com/billsusanto/booking-frontend-yelp-clone/issues
- **Netlify Community:** https://answers.netlify.com
- **Next.js Discord:** https://nextjs.org/discord

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] All dependencies installed: `npm install`
- [ ] Local build successful: `npm run build`
- [ ] Dev server works: `npm run dev`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Mock data loads correctly
- [ ] Images display properly
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Search functionality works
- [ ] Filters work correctly

---

## 🎊 Success Criteria

Your deployment is successful when:

1. ✅ Site is accessible at your Netlify URL
2. ✅ Home page loads with search bar
3. ✅ Categories are clickable
4. ✅ Featured carousel displays businesses
5. ✅ Search results page works with filters
6. ✅ Business detail pages load correctly
7. ✅ Booking modal opens and functions
8. ✅ Site is responsive on mobile
9. ✅ No console errors in browser
10. ✅ Images load from Unsplash

---

## 🚀 Go Live!

**Recommended Path:**

1. **Try Method 1 first** (Netlify Dashboard)
   - Easiest and most reliable
   - Automatic deployments on git push

2. **If issues, use Method 2** (Local Build + CLI)
   - Full control over build process
   - Debug locally before deploying

3. **For instant preview, use Method 3** (Drag & Drop)
   - Perfect for testing
   - No configuration needed

**Your app will be live at:** `https://your-site-name.netlify.app`

---

## 💡 Pro Tips

1. **Automatic Deployments:**
   - Push to GitHub → Netlify auto-deploys
   - Perfect for continuous updates

2. **Preview Deployments:**
   - Every branch gets its own preview URL
   - Test before merging to main

3. **Environment Variables:**
   - Use Netlify UI for sensitive data
   - Never commit API keys to GitHub

4. **Custom 404 Page:**
   - Already configured in Next.js
   - Customizable in `app/not-found.tsx`

5. **Analytics:**
   - Enable Netlify Analytics
   - Track visitor stats and performance

---

**Happy Deploying! 🎉**

Your Yelp-style booking app is production-ready and waiting to go live!

For questions or issues, open an issue on GitHub or check the troubleshooting section above.