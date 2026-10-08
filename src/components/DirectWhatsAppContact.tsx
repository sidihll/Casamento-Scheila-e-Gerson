import React from 'react';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../types/wedding';
import { formatWhatsAppUrl } from '../lib/supabase';
import { BotanicalDivider } from './CallaLilyDecorations';

export const DirectWhatsAppContact: React.FC = () => {
  const directLink = formatWhatsAppUrl(
    WEDDING_DETAILS.telefoneContato,
    WEDDING_DETAILS.whatsappMensagemPadrao
  );

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center">
      <div className="bg-[#FAF8F5] border border-[#DDD6C8] rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A7360] font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          Dúvidas ou Mensagem Direta
        </div>

        <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-4xl font-light text-[#1C3829]">
          Fale Diretamente com os Noivos
        </h3>

        <p className="text-xs sm:text-sm text-[#4E785B] max-w-lg mx-auto mt-2 leading-relaxed">
          Tem alguma dúvida sobre a cerimônia, trajes, localização ou gostaria de falar diretamente com Scheila e Gerson?
          Nosso canal de WhatsApp está à sua disposição.
        </p>

        <BotanicalDivider className="my-5" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <a
            href={directLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-medium shadow-xs hover:shadow-md transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white/90" />
            Conversar no WhatsApp
          </a>

          <a
            href="tel:+5511999999999"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F2ECE1] text-[#2D5A3E] border border-[#BACCC0] text-sm font-medium transition-colors shadow-xs"
          >
            <PhoneCall className="w-4 h-4 text-[#2D5A3E]" />
            Ligar para os Noivos
          </a>
        </div>

        <p className="text-[11px] text-[#7A9382] mt-4">
          Link oficial direto com mensagem pré-configurada via WhatsApp
        </p>
      </div>
    </section>
  );
};
