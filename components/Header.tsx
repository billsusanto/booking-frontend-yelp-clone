'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, Heart } from 'lucide-react'
import { Button } from './ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-display font-bold text-neutral-900 hidden sm:block">
            BookNow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/listings"
            className="text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/#categories"
            className="text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/#top-rated"
            className="text-sm font-medium text-neutral-700 hover:text-primary-500 transition-colors"
          >
            Top Rated
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="small"
            className="hidden sm:flex"
            aria-label="Favorites"
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="small"
            className="hidden sm:flex"
            aria-label="Sign in"
          >
            <User className="w-4 h-4 mr-1" />
            Sign In
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="small"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-200 bg-white"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/listings"
                className="block text-base font-medium text-neutral-700 hover:text-primary-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/#categories"
                className="block text-base font-medium text-neutral-700 hover:text-primary-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/#top-rated"
                className="block text-base font-medium text-neutral-700 hover:text-primary-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Top Rated
              </Link>
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <Button variant="outline" size="medium" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}