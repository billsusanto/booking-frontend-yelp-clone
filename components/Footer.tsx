'use client'

import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-display font-bold">BookNow</span>
            </div>
            <p className="text-sm text-neutral-400">
              Discover and book the best local businesses for dining, wellness, and more.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-base mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-neutral-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-base mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-neutral-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Main St, Irvine, CA 92618</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:hello@booknow.com" className="hover:text-white transition-colors">
                  hello@booknow.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+19495550123" className="hover:text-white transition-colors">
                  (949) 555-0123
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} BookNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}