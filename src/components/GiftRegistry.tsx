import React, { useState } from 'react';
import { Gift, Copy, Check, Heart, Sparkles, Coffee, Plane, UtensilsCrossed } from 'lucide-react';
import { WEDDING_DETAILS } from '../types/wedding';
import { BotanicalDivider } from './CallaLilyDecorations';

export const GiftRegistry: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_DETAILS.pixChave);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const giftOptions = [
    {
      title: 'Brinde dos Noivos',
      desc: 'Um brinde com espumante especial para celebrar nossa união.',
      icon: Sparkles,
      suggested: 'R$ 100',
    },
    {
      title: 'Jantar Romântico',
      desc: 'Um almoço/jantar delicioso no Coco Bambu durante a comemoração.',
      icon: UtensilsCrossed,
      suggested: 'R$ 250',
    },
    {
      title: 'Passeio na Lua de Mel',
      desc: 'Ajude os noivos a eternizarem memórias inesquecíveis na viagem.',
      icon: Plane,
      suggested: 'R$ 400',
    },
    {
      title: 'Café da Manhã a Dois',
      desc: 'Começar a vida a dois com muito amor e doçura.',
      icon: Coffee,
      suggested: 'R$ 150',
    },
  ];

  return (
    <section id="presentes" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-6">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#5A7360] font-semibold mb-2">
          Lista de Presentes & Carinho
        </p>
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-5xl font-light text-[#1C3829]">
          Cotas & Presentes
        </h2>
        <p className="text-sm sm:text-base text-[#4F6C56] max-w-xl mx-auto mt-3">
          O maior presente é a sua presença e o seu abraço no nosso casamento! Se desejar nos presentear, disponibilizamos nossa chave PIX para cotas da nossa nova vida e lua de mel.
        </p>
        <BotanicalDivider className="my-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left: PIX Card */}
        <div className="bg-white border border-[#D5DDD6] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A3E]/10 text-[#2D5A3E] flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-medium text-[#1C3829]">
                  Chave PIX dos Noivos
                </h3>
                <p className="text-xs text-[#52735C]">
                  Transferência instantânea segura
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4E785B] leading-relaxed mb-6">
              Você pode enviar qualquer valor de coração. Toda contribuição nos ajudará a construir nosso lar e momentos inesquecíveis.
            </p>

            <div className="bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl p-4 mb-4">
              <p className="text-[11px] uppercase tracking-wider text-[#6B8572] font-semibold mb-1">
                Chave PIX (E-mail):
              </p>
              <div className="flex items-center justify-between gap-2 overflow-hidden">
                <code className="text-xs sm:text-sm font-mono text-[#1C3829] truncate select-all">
                  {WEDDING_DETAILS.pixChave}
                </code>
                <button
                  onClick={handleCopyPix}
                  className="px-3 py-1.5 rounded-lg bg-[#2D5A3E] hover:bg-[#234731] text-white text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-[#6B8572] flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
              Titular: <strong>{WEDDING_DETAILS.pixNome}</strong>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#EEF2EF] text-xs text-[#7A9382]">
            Agradecemos imensamente por todo o carinho e generosidade!
          </div>
        </div>

        {/* Right: Cotas Simbólicas */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-[#5A7360] font-semibold mb-2">
            Sugestões Simbólicas de Cotas:
          </p>
          {giftOptions.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={i}
                className="bg-white/80 border border-[#D5DDD6] rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs hover:border-[#BACCC0] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C5A059]/15 text-[#997732] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#1C3829]">{opt.title}</h4>
                    <p className="text-[11px] text-[#52735C] line-clamp-1">{opt.desc}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-[#2D5A3E]">{opt.suggested}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
