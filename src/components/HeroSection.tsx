import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Clock, ArrowDown } from 'lucide-react';
import { WeddingMonogram, BotanicalDivider, CallaLilyFlower, BotanicalCorner } from './CallaLilyDecorations';
import { WEDDING_DETAILS } from '../types/wedding';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroSection: React.FC<{ onOpenCalendar: () => void }> = ({ onOpenCalendar }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-17T13:00:00-03:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-16 overflow-hidden bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#F3EFE6]">
      {/* Botanical Corner Ornaments */}
      <BotanicalCorner position="top-left" className="absolute top-2 left-2 sm:top-6 sm:left-6 w-20 h-20 sm:w-28 sm:h-28" />
      <BotanicalCorner position="top-right" className="absolute top-2 right-2 sm:top-6 sm:right-6 w-20 h-20 sm:w-28 sm:h-28" />

      {/* Subtle Floating Calla Lily Accent */}
      <div className="absolute top-12 left-4 sm:left-12 opacity-30 pointer-events-none hidden md:block">
        <CallaLilyFlower className="w-20 h-32" />
      </div>
      <div className="absolute top-12 right-4 sm:right-12 opacity-30 pointer-events-none hidden md:block scale-x-[-1]">
        <CallaLilyFlower className="w-20 h-32" />
      </div>

      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="mb-4">
          <WeddingMonogram initials="S & G" className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-sm" />
        </div>

        {/* Elegant Subtitle */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#5A7360] font-medium mb-3">
          Com a bênção de Deus e de nossas famílias
        </p>

        {/* Bride & Groom Names */}
        <div className="my-2">
          <h1 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-6xl md:text-7xl font-light text-[#1C3829] tracking-tight leading-tight">
            Scheila Rodrigues Dihl
          </h1>
          <div className="flex items-center justify-center my-1 sm:my-2">
            <span className="font-['Alex_Brush',cursive] text-4xl sm:text-5xl text-[#C5A059] px-4 font-normal">
              e
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl sm:text-6xl md:text-7xl font-light text-[#1C3829] tracking-tight leading-tight">
            Gerson Martins
          </h2>
        </div>

        <p className="font-['Cormorant_Garamond',serif] italic text-lg sm:text-xl text-[#3D6349] max-w-xl mt-4 px-4 font-normal leading-relaxed">
          &ldquo;O amor tudo sofre, tudo crê, tudo espera, tudo suporta.&rdquo;
        </p>

        <BotanicalDivider className="my-6" />

        {/* Date, Time & Venue Bar */}
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xs border border-[#D5DDD6] rounded-2xl p-5 sm:p-6 shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left sm:divide-x sm:divide-[#E2E8E3]">
            {/* Date & Time */}
            <div className="flex items-center gap-3.5 pr-2">
              <div className="w-11 h-11 rounded-xl bg-[#2D5A3E]/10 flex items-center justify-center text-[#2D5A3E] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#5A7360] font-semibold">Data & Horário</p>
                <p className="text-base sm:text-lg font-semibold text-[#1C3829] font-['Cormorant_Garamond',serif]">
                  17 de Outubro de 2026
                </p>
                <p className="text-xs text-[#48634F] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> Às 13:00h (Sábado)
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-3.5 sm:pl-4">
              <div className="w-11 h-11 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#997732] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#5A7360] font-semibold">Local da Celebração</p>
                <p className="text-base sm:text-lg font-semibold text-[#1C3829] font-['Cormorant_Garamond',serif]">
                  Restaurante Coco Bambu
                </p>
                <p className="text-xs text-[#48634F]">
                  Tatuapé · São Paulo - SP
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-10 w-full max-w-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5A7360] font-medium mb-3">
            Contagem regressiva para o nosso grande dia
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Dias', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 border border-[#D1DCD3] rounded-xl py-3 px-1 sm:py-4 shadow-xs flex flex-col items-center"
              >
                <span className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl font-semibold text-[#1C3829] leading-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6B8572] font-medium mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
          <button
            onClick={() => scrollToSection('rsvp')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#2D5A3E] hover:bg-[#234731] text-white font-medium text-sm tracking-wide rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white/80" />
            Confirmar Presença (RSVP)
          </button>

          <button
            onClick={() => scrollToSection('local')}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F2ECE1] text-[#2D5A3E] border border-[#BACCC0] font-medium text-sm tracking-wide rounded-full shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            Local & Mapa
          </button>

          <button
            onClick={onOpenCalendar}
            className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-black/5 text-[#44634B] border border-transparent font-medium text-sm tracking-wide rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Salvar na Agenda
          </button>
        </div>

        {/* Subtle scroll down hint */}
        <button
          onClick={() => scrollToSection('detalhes')}
          aria-label="Ver mais detalhes"
          className="mt-12 text-[#68826F] hover:text-[#2D5A3E] transition-colors flex flex-col items-center gap-1 cursor-pointer"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium">Ver detalhes</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
