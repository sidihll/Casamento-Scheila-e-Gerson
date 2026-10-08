import React, { useState } from 'react';
import { Calendar, Heart, MapPin, Gift, MessageCircle, Lock, Sparkles } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { CeremonyDetails } from './components/CeremonyDetails';
import { RSVPForm } from './components/RSVPForm';
import { GiftRegistry } from './components/GiftRegistry';
import { DirectWhatsAppContact } from './components/DirectWhatsAppContact';
import { CalendarModal } from './components/CalendarModal';
import { AdminGuestListModal } from './components/AdminGuestListModal';
import { CallaLilyFlower, BotanicalDivider, WeddingMonogram } from './components/CallaLilyDecorations';
import { WEDDING_DETAILS } from './types/wedding';

export default function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C3E2D] flex flex-col font-['Montserrat',sans-serif]">
      {/* Elegant Floating Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E2DDD5]/70 py-3 px-4 sm:px-8 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl font-light text-[#1C3829] tracking-wider group-hover:text-[#2D5A3E] transition-colors">
              S & G
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-medium hidden sm:inline">
              17.10.2026
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-6 text-xs font-medium text-[#48634F]">
            <button
              onClick={() => scrollTo('local')}
              className="hover:text-[#1C3829] transition-colors py-1 cursor-pointer hidden sm:block"
            >
              O Local
            </button>
            <button
              onClick={() => scrollTo('presentes')}
              className="hover:text-[#1C3829] transition-colors py-1 cursor-pointer hidden sm:block"
            >
              Presentes & PIX
            </button>
            <button
              onClick={() => scrollTo('rsvp')}
              className="px-4 py-2 rounded-full bg-[#2D5A3E] hover:bg-[#234731] text-white text-xs font-medium tracking-wide shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white/80" />
              Confirmar Presença
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero with Monogram, Names & Countdown */}
        <HeroSection onOpenCalendar={() => setIsCalendarOpen(true)} />

        {/* 2. Venue & Ceremony at Coco Bambu Tatuapé */}
        <CeremonyDetails />

        {/* 3. RSVP Form (Core requirement with name, email, phone with WhatsApp link, Supabase readiness without Supabase button) */}
        <RSVPForm onOpenCalendar={() => setIsCalendarOpen(true)} />

        {/* 4. Direct WhatsApp Contact with Scheila & Gerson */}
        <DirectWhatsAppContact />

        {/* 5. Gift Registry & PIX */}
        <GiftRegistry />
      </main>

      {/* Footer */}
      <footer className="bg-[#1C2C20] text-[#D8E4DA] pt-16 pb-10 px-4 border-t border-[#293F2E] relative overflow-hidden">
        {/* Delicate background flora */}
        <div className="absolute -bottom-10 left-10 opacity-10 pointer-events-none hidden md:block">
          <CallaLilyFlower className="w-36 h-48" />
        </div>
        <div className="absolute -bottom-10 right-10 opacity-10 pointer-events-none hidden md:block scale-x-[-1]">
          <CallaLilyFlower className="w-36 h-48" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-4">
            <WeddingMonogram initials="S & G" className="w-24 h-24 brightness-125" />
          </div>

          <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-light text-white tracking-wide">
            {WEDDING_DETAILS.noiva} &amp; {WEDDING_DETAILS.noivo}
          </h3>

          <p className="font-['Cormorant_Garamond',serif] italic text-base text-[#BACCC0] mt-2 max-w-md mx-auto">
            &ldquo;Grandes coisas fez o Senhor por nós, pelas quais estamos alegres.&rdquo;
          </p>

          <p className="text-xs text-[#8FA392] mt-4">
            17 de Outubro de 2026 · Coco Bambu Tatuapé · São Paulo - SP
          </p>

          <BotanicalDivider className="my-8 opacity-40" />

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#7B9280] gap-4">
            <p>
              Feito com muito amor para o casamento de Scheila &amp; Gerson.
            </p>

            {/* Subtle couple access button (no public Supabase button anywhere) */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#A2B8A8] hover:text-white transition-colors cursor-pointer opacity-80 hover:opacity-100"
              title="Acesso exclusivo para os noivos visualizarem a lista e relatórios"
            >
              <Lock className="w-3 h-3 text-[#C5A059]" />
              Área dos Noivos
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      <AdminGuestListModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
