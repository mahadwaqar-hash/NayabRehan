import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { designerData } from '../../data/portfolioData';
import { createWhatsAppUrl } from '../../utils/whatsapp';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = createWhatsAppUrl(
    `Hello Nayaab, I am viewing your Commercial Lawn & Textile Print Portfolio and would like to connect.`
  );

  return (
    <footer className="py-10 sm:py-16 px-2 sm:px-4 xl:px-6 w-full max-w-[98vw] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="clay-card-dark p-5 sm:p-12 xl:p-16 rounded-tl-[3.5rem] sm:rounded-tl-[5rem] rounded-br-[3.5rem] sm:rounded-br-[5rem] rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl border border-white/10 space-y-8 sm:space-y-12 shadow-2xl relative overflow-hidden"
      >
        {/* Typographic Watermark */}
        <div className="watermark-text -bottom-16 -right-6 text-[180px] xl:text-[260px] text-white/[0.02]">
          NR
        </div>

        {/* Top Grid - Stacks cleanly into 1 column on mobile, 12 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start relative z-10">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md bg-ivory text-black flex items-center justify-center font-serif text-2xl font-bold shadow-clay-light-sm shrink-0">
                {designerData.monogram}
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-ivory uppercase">
                  {designerData.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-orange tracking-wider uppercase font-bold">
                  {designerData.title}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-ivory/85 leading-relaxed max-w-md font-medium">
              {designerData.statement}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-sans text-sm">
            <p className="text-orange uppercase tracking-wide font-bold text-xs sm:text-sm">
              NAVIGATION //
            </p>
            <ul className="space-y-2.5 text-ivory/95 font-semibold text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-orange transition-colors inline-block py-0.5">
                  01. Home
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="hover:text-orange transition-colors inline-block py-0.5">
                  02. Collections &amp; Lookbook
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange transition-colors inline-block py-0.5">
                  03. Inquire / Consultation
                </Link>
              </li>
              <li>
                <a
                  href={designerData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange transition-colors inline-flex items-center gap-1 py-0.5"
                >
                  <span>04. LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-orange" />
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Details */}
          <div className="md:col-span-3 space-y-3 font-sans text-sm">
            <p className="text-orange uppercase tracking-wide font-bold text-xs sm:text-sm">
              STUDIO //
            </p>
            <div className="space-y-2.5 text-ivory/90 font-medium text-sm sm:text-base">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-1" />
                <span>{designerData.studioLocation}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                <span>{designerData.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with WhatsApp Trigger & Scroll to Top - Stacks gracefully on mobile */}
        <div className="pt-6 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-4 font-sans text-xs sm:text-sm text-ivory/85 relative z-10 font-semibold">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="clay-pill-orange px-6 py-3 text-white font-bold flex items-center justify-center gap-2 shadow-clay-orange hover:scale-105 transition-transform touch-target text-center"
            >
              <span>WhatsApp Direct Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-ivory/80 font-semibold text-center sm:text-left text-xs sm:text-sm">
              Lahore, Pakistan
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
            <span className="text-xs sm:text-sm text-ivory/70">
              © {CURRENT_YEAR} {designerData.name}. All Rights Reserved.
            </span>
            <button
              onClick={scrollToTop}
              className="hover:text-orange transition-colors flex items-center gap-1.5 focus:outline-none font-bold cursor-pointer py-1 px-2"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
