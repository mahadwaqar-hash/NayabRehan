import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, type Variants } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Copy, Check, Phone, ArrowUpRight, Send } from 'lucide-react';
import { designerData, collectionsData } from '../data/portfolioData';
import { createWhatsAppUrl, formatContactInquiryMessage } from '../utils/whatsapp';
import { RotatingStamp } from '../components/typography/RotatingStamp';
import { SplitTextReveal } from '../components/typography/SplitTextReveal';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
  </svg>
);

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Custom WhatsApp Message Composer state
  const [customMessage, setCustomMessage] = useState(
    'Hello Nayaab, I reviewed your Commercial Lawn portfolio and would like to discuss design opportunities.'
  );
  const [activePreset, setActivePreset] = useState<string>('Lawn');

  const messagePresets = [
    {
      id: 'Lawn',
      label: '👗 Commercial Lawn Inquiries',
      text: 'Hello Nayaab, I reviewed your Commercial Lawn Collection portfolio and would like to inquire regarding collection licensing, volume runs, and production specs.',
    },
    {
      id: 'Hiring',
      label: '💼 Brand Role & Recruiting',
      text: 'Hello Nayaab, I am reaching out on behalf of our fashion brand regarding a textile & lawn print designer role. We would love to discuss opportunities with you.',
    },
    {
      id: 'Print',
      label: '🎨 Digital Print Commission',
      text: 'Hello Nayaab, I am interested in commissioning original botanical print repeats and digital textile design files for our upcoming seasonal drop.',
    },
    {
      id: 'TechPack',
      label: '📦 Line Sheets & Repeat Specs',
      text: 'Hello Nayaab, could you please share full line sheets, color separation files, and technical repeat specifications for your lawn collection?',
    },
    {
      id: 'Direct',
      label: '💬 Quick Introduction',
      text: 'Hello Nayaab, I am connecting directly from your online portfolio to introduce myself and discuss a potential creative collaboration.',
    },
  ];

  const [form, setForm] = useState({
    name: '',
    phone: '',
    inquiryType: 'Commercial Lawn Collection Inquiries',
    targetCollection: collectionsData[0].title,
    notes: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(designerData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(designerData.formattedPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSelectPreset = (preset: typeof messagePresets[0]) => {
    setActivePreset(preset.id);
    setCustomMessage(preset.text);
  };

  const handleSendWhatsApp = () => {
    const url = createWhatsAppUrl(customMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedText = formatContactInquiryMessage(form);
    const url = createWhatsAppUrl(formattedText);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const cardPopVariant: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: i * 0.06,
      },
    }),
  };

  return (
    <div className="pt-16 sm:pt-20 xl:pt-24 pb-16 sm:pb-20 space-y-8 sm:space-y-12 overflow-hidden w-full">
      <Helmet>
        <title>Inquire &amp; Connect | Nayaab Rehan — Brand Portfolio</title>
        <meta
          name="description"
          content="Connect with Nayaab Rehan for commercial lawn collections, textile design collaborations, and brand inquiries in Lahore, Pakistan."
        />
        <link rel="canonical" href="https://nayabrehan.com/contact" />
      </Helmet>

      {/* =========================================================================
          1. WIDESCREEN ASYMMETRICAL TYPOGRAPHIC HEADER
         ========================================================================= */}
      <section className="w-full max-w-[98vw] mx-auto px-2.5 sm:px-4 xl:px-6 relative">
        <div className="watermark-text -top-10 sm:-top-14 -left-3 text-[90px] sm:text-[200px] xl:text-[280px] tracking-tighter pointer-events-none select-none">
          CONNECT
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardPopVariant}
          className="clay-card p-4 sm:p-8 xl:p-12 border border-white/80 space-y-3 sm:space-y-4 relative z-10 w-full rounded-tl-[2.5rem] sm:rounded-tl-[4rem] rounded-br-[2.5rem] sm:rounded-br-[4.5rem] rounded-tr-xl sm:rounded-tr-2xl rounded-bl-2xl sm:rounded-bl-3xl shadow-xl sm:shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="clay-pill-orange px-4 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold shadow-clay-orange">
                  BRAND &amp; RECRUITER INQUIRIES // LAHORE
                </span>

                <a
                  href={designerData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-pill-ivory px-3.5 py-1.5 text-xs sm:text-[13px] font-sans tracking-wide uppercase font-bold text-black flex items-center gap-1.5 border border-white/80 shadow-sm hover:text-orange transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span>LinkedIn Profile ↗</span>
                </a>
              </div>

              <SplitTextReveal
                text="Connect, Collaborate & Hire"
                as="h1"
                className="font-serif text-3xl sm:text-5xl xl:text-7xl font-normal text-black tracking-tight leading-[1.05]"
                highlightWord="Collaborate"
                highlightClass="font-script text-orange font-normal text-4xl sm:text-6xl xl:text-8xl inline-block px-1"
              />

              <p className="font-sans text-sm sm:text-base text-black/90 max-w-2xl leading-relaxed font-medium">
                Connect with Nayaab Rehan regarding commercial lawn collections, digital textile print commissions, full-time brand design roles, or private studio consultations.
              </p>
            </div>

            <div className="hidden sm:block ml-auto lg:ml-0 shrink-0">
              <RotatingStamp
                text="DESIGN STUDIO • NAYAAB REHAN • LAHORE • "
                centerText="CONNECT"
                className="w-16 h-16 sm:w-24 sm:h-24"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. ASYMMETRIC GRID: CUSTOM MESSAGE COMPOSER & FORM (7 COLS) + STUDIO DESK (5 COLS)
         ========================================================================= */}
      <section className="w-full max-w-[98vw] mx-auto px-2.5 sm:px-4 xl:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Interactive WhatsApp Custom Message Thingy + Detailed Brief Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 2A. INTERACTIVE WHATSAPP CUSTOM MESSAGE COMPOSER */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardPopVariant}
              custom={0}
              className="clay-card p-4 sm:p-7 xl:p-8 border border-white/80 space-y-4 relative overflow-hidden rounded-tl-[2.2rem] sm:rounded-tl-[3.5rem] rounded-br-[2.2rem] sm:rounded-br-[3.5rem] rounded-tr-xl sm:rounded-tr-2xl rounded-bl-xl sm:rounded-bl-2xl shadow-xl"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-black/10">
                <div>
                  <span className="font-sans text-xs sm:text-[13px] text-orange uppercase tracking-wide font-bold flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-orange" />
                    <span>INSTANT WHATSAPP DIRECT MESSAGE //</span>
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-black">
                    Custom WhatsApp Message
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="clay-pill-ivory px-3 py-1 text-xs font-mono font-bold text-black border border-white/80">
                    {designerData.formattedPhone}
                  </span>
                </div>
              </div>

              {/* Preset Chips */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] uppercase tracking-wider text-black/70 font-bold block">
                  Quick Message Templates (Click to apply):
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {messagePresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
                        activePreset === preset.id
                          ? 'bg-orange text-white shadow-clay-orange scale-102 ring-1 ring-black/10'
                          : 'bg-ivory text-black border border-white/80 hover:bg-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live WhatsApp Bubble Preview */}
              <div className="clay-inset p-3 sm:p-4 rounded-2xl border border-white/60 bg-[#E8E1D5]/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-sans text-black/75">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>WhatsApp Chat with Nayaab Rehan ({designerData.formattedPhone})</span>
                  </span>
                  <span className="text-[11px] font-sans text-black/60 font-semibold">Online</span>
                </div>

                {/* Chat Bubble */}
                <div className="bg-[#E7FFDB] text-black text-xs sm:text-sm p-3.5 rounded-2xl rounded-tr-none shadow-md border border-emerald-300/40 space-y-1.5">
                  <p className="whitespace-pre-line font-sans leading-relaxed text-black/90 font-medium">
                    {customMessage || "Type your custom message..."}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-900/60 font-sans font-medium">
                    <span>Just now</span>
                    <span>✓✓</span>
                  </div>
                </div>
              </div>

              {/* Editable Text Area to customize */}
              <div className="space-y-1.5">
                <label className="block font-sans text-xs uppercase tracking-wide text-black font-bold">
                  Edit or Add Custom Notes:
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full clay-inset p-3 text-sm font-sans text-black focus:outline-none border border-white/60 rounded-xl font-medium"
                  placeholder="Personalize your message before sending to WhatsApp..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="clay-pill-orange px-6 sm:px-8 py-3 text-sm sm:text-base font-sans uppercase tracking-wide font-bold flex items-center justify-center gap-2 shadow-clay-orange hover:scale-104 transition-transform cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to WhatsApp ({designerData.formattedPhone})</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="clay-pill-ivory px-4 py-3 text-xs sm:text-sm font-sans uppercase tracking-wide font-bold flex items-center justify-center gap-1.5 border border-white/80 cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-orange" />
                      <span className="text-orange">Copied Phone!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black/70" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* 2B. FORMAL STRUCTURED INQUIRY FORM */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardPopVariant}
              custom={1}
              className="clay-card p-4 sm:p-7 xl:p-8 border border-white/80 space-y-4 relative overflow-hidden rounded-tl-[2.2rem] sm:rounded-tl-[3.5rem] rounded-br-[2.2rem] sm:rounded-br-[3.5rem] rounded-tr-xl sm:rounded-tr-2xl rounded-bl-xl sm:rounded-bl-2xl shadow-xl"
            >
              <div className="space-y-1 pb-1 border-b border-black/10">
                <span className="font-sans text-xs sm:text-[13px] text-orange uppercase tracking-wide font-bold">
                  STRUCTURED CLIENT BRIEF //
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-black">
                  Send Comprehensive Project Brief
                </h3>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide text-black mb-1 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brand Buyer / Recruiter Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full clay-inset px-4 py-2.5 text-sm font-sans text-black focus:outline-none border border-white/60 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide text-black mb-1 font-bold">
                      Your WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 0000000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full clay-inset px-4 py-2.5 text-sm font-sans text-black focus:outline-none border border-white/60 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide text-black mb-1 font-bold">
                      Inquiry Intent
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full clay-inset px-4 py-2.5 text-sm font-sans text-black focus:outline-none border border-white/60 rounded-xl font-medium"
                    >
                      <option value="Commercial Lawn Collection Inquiries">Commercial Lawn Collection Inquiries</option>
                      <option value="Brand Design Roles & Recruiting">Brand Design Roles &amp; Recruiting</option>
                      <option value="Digital Print Commission">Digital Print Commission</option>
                      <option value="Line Sheet & Tech Pack Request">Line Sheet &amp; Tech Pack Request</option>
                      <option value="Custom Order / Bespoke Fitting">Custom Order / Bespoke Fitting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wide text-black mb-1 font-bold">
                      Collection / Page of Interest
                    </label>
                    <select
                      value={form.targetCollection}
                      onChange={(e) => setForm({ ...form, targetCollection: e.target.value })}
                      className="w-full clay-inset px-4 py-2.5 text-sm font-sans text-black focus:outline-none border border-white/60 rounded-xl font-medium"
                    >
                      {collectionsData.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.archiveNumber} — {c.title}
                        </option>
                      ))}
                      <option value="Full Portfolio Review">
                        Full Portfolio Review (All 29 Designs)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-wide text-black mb-1 font-bold">
                    Design Brief, Role Details or Timeline
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Detail brand requirements, collection timeline, or role description..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full clay-inset p-3 text-sm font-sans text-black focus:outline-none border border-white/60 rounded-xl font-medium"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row justify-start gap-3">
                  <button
                    type="submit"
                    className="clay-pill-orange px-7 py-3 text-sm font-sans uppercase tracking-wide font-bold flex items-center justify-center gap-2 shadow-clay-orange hover:scale-104 transition-transform cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Brief via WhatsApp ↗</span>
                  </button>
                </div>
              </form>

              {/* Email Correspondence Bar */}
              <div className="pt-3 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-sans text-black relative z-10 font-bold">
                <span>Email Correspondence:</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-black hover:text-orange flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer self-start sm:self-auto"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-orange" />
                      <span className="text-orange font-bold">Copied {designerData.email}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-orange" />
                      <span className="underline">{designerData.email}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Direct Contact & LinkedIn Studio Desk (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Studio Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardPopVariant}
              custom={1}
              className="clay-card-dark p-6 sm:p-8 xl:p-10 rounded-tr-[3.5rem] sm:rounded-tr-[5rem] rounded-bl-[3rem] sm:rounded-bl-[4rem] rounded-tl-xl sm:rounded-tl-2xl rounded-br-xl sm:rounded-br-2xl border border-white/10 space-y-5 relative overflow-hidden shadow-2xl"
            >
              <div className="watermark-text -bottom-8 right-2 text-[100px] sm:text-[130px] text-white/[0.04] pointer-events-none select-none">
                NR
              </div>

              <div className="relative z-10 space-y-1">
                <span className="font-sans text-xs sm:text-sm text-orange uppercase tracking-wide font-bold">
                  DESIGN STUDIO // LAHORE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl xl:text-4xl font-medium text-ivory">
                  {designerData.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ivory/90 uppercase font-bold tracking-wide">
                  {designerData.title}
                </p>
              </div>

              <div className="space-y-3.5 text-sm font-sans text-ivory/95 pt-4 border-t border-white/15 relative z-10 font-medium">
                {/* WhatsApp Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-orange flex-shrink-0" />
                  <span className="font-bold">{designerData.formattedPhone}</span>
                  <span className="text-xs text-orange font-semibold">(WhatsApp Direct)</span>
                </div>

                {/* Studio Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                  <span>{designerData.studioLocation}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-orange flex-shrink-0" />
                  <span className="break-all">{designerData.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 relative z-10 space-y-3">
                <p className="font-sans text-xs sm:text-[13px] text-ivory/85 uppercase tracking-wide font-bold">
                  DIRECT CONTACT CHANNELS
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={createWhatsAppUrl(`Hello Nayaab, I am reaching out to discuss design opportunities.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-pill-orange px-5 py-3 text-xs sm:text-sm font-sans uppercase tracking-wide font-bold inline-flex items-center justify-center gap-2 shadow-clay-orange hover:scale-104 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>

                  <a
                    href={designerData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clay-pill-ivory px-5 py-3 text-xs sm:text-sm font-sans uppercase tracking-wide font-bold inline-flex items-center justify-center gap-2 border border-white/90 hover:scale-104 transition-transform text-black"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[#0077B5]" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Dedicated LinkedIn Feature Card for Recruiters & Brands */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardPopVariant}
              custom={2}
              className="clay-card p-5 sm:p-6 rounded-2xl border border-white/80 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0077B5] text-white flex items-center justify-center shadow-md shrink-0">
                    <LinkedInIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-orange font-bold block">
                      PROFESSIONAL RECRUITING //
                    </span>
                    <h4 className="font-serif text-lg font-bold text-black">
                      LinkedIn Profile
                    </h4>
                  </div>
                </div>

                <a
                  href={designerData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-pill-orange px-3.5 py-1.5 text-xs font-sans uppercase tracking-wide font-bold flex items-center gap-1 shadow-clay-orange hover:scale-105 transition-transform shrink-0"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                View Nayaab Rehan's professional credentials, experience, and endorsements on LinkedIn:
              </p>

              <a
                href={designerData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-orange hover:underline break-all block font-semibold"
              >
                {designerData.linkedinUrl}
              </a>
            </motion.div>

            {/* Commercial Textile Specifications Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardPopVariant}
              custom={3}
              className="clay-card p-5 sm:p-6 rounded-bl-[2.5rem] sm:rounded-bl-[3.5rem] rounded-tr-[2.5rem] sm:rounded-tr-[3rem] rounded-tl-xl rounded-br-xl border border-white/80 space-y-2 shadow-xl"
            >
              <span className="font-sans text-xs sm:text-[13px] text-orange uppercase tracking-wide font-bold block">
                COMMERCIAL TEXTILE PORTFOLIO //
              </span>
              <p className="font-sans text-xs sm:text-sm text-black/90 leading-relaxed font-medium">
                Complete design files, color separation specs, repeat alignments, and high-res photography portfolios available upon request for brand recruiters and production partners.
              </p>
            </motion.div>

          </div>

        </div>
      </section>
    </div>
  );
};
