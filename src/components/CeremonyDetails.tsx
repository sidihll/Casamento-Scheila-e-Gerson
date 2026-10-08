import React from 'react';
import { MapPin, Navigation, Clock, Utensils, Sparkles, Car, Shirt } from 'lucide-react';
import { BotanicalDivider, CallaLilyFlower } from './CallaLilyDecorations';
import { WEDDING_DETAILS } from '../types/wedding';

export const CeremonyDetails: React.FC = () => {
  return (
    <section id="local" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-6">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-[#5A7360] font-semibold mb-2">
          Celebração & Recepção
        </p>
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-5xl font-light text-[#1C3829]">
          Restaurante Coco Bambu Tatuapé
        </h2>
        <p className="text-sm sm:text-base text-[#4F6C56] max-w-2xl mx-auto mt-3">
          Escolhemos um espaço acolhedor e com gastronomia inesquecível para celebrar o nosso amor e compartilhar esse momento único com vocês.
        </p>
        <BotanicalDivider className="my-6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Venue Card & Maps */}
        <div className="lg:col-span-7 bg-white border border-[#D5DDD6] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Espaço Exclusivo
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-medium text-[#1C3829]">
                Coco Bambu Conceito
              </h3>
              <p className="text-sm text-[#4E785B] font-medium mt-1">
                {WEDDING_DETAILS.endereco}
              </p>
              <p className="text-xs text-[#6B8572]">
                {WEDDING_DETAILS.cidade} · CEP: {WEDDING_DETAILS.cep}
              </p>
            </div>
            <div className="hidden sm:block opacity-60">
              <CallaLilyFlower className="w-14 h-20" />
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative w-full h-56 rounded-xl overflow-hidden border border-[#DDE5DF] bg-[#EAF0EC] mb-6">
            <iframe
              title="Mapa Restaurante Coco Bambu Tatuape"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=Coco+Bambu+Rua+Azevedo+Soares+2150+Tatuape+Sao+Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          {/* Direct Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WEDDING_DETAILS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2D5A3E] hover:bg-[#234731] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              Abrir no Google Maps
            </a>

            <a
              href={WEDDING_DETAILS.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-[#F2ECE1] text-[#2D5A3E] border border-[#B3C8BA] text-xs sm:text-sm font-medium transition-colors shadow-xs"
            >
              <Navigation className="w-4 h-4 text-[#2D5A3E]" />
              Navegar com Waze
            </a>
          </div>

          {/* Valet & Parking note */}
          <div className="mt-6 pt-5 border-t border-[#EAEFEA] flex items-start gap-3 text-xs text-[#526D59]">
            <Car className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <span>
              <strong>Estacionamento & Valet:</strong> O Coco Bambu Tatuapé dispõe de serviço de manobrista no próprio local para maior comodidade e segurança dos convidados.
            </span>
          </div>
        </div>

        {/* Right Column: Timeline & Recommendations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Day Timeline */}
          <div className="bg-[#FAF8F3] border border-[#DDD6C8] rounded-2xl p-6 shadow-xs">
            <h4 className="font-['Cormorant_Garamond',serif] text-xl font-medium text-[#1C3829] flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              Programação do Dia
            </h4>
            
            <div className="space-y-4 relative pl-4 border-l-2 border-[#BACCC0]">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A059] border-2 border-white" />
                <p className="text-xs font-semibold text-[#C5A059]">12:45</p>
                <p className="text-sm font-medium text-[#1C3829]">Chegada dos Convidados</p>
                <p className="text-xs text-[#637D6B]">Recepção e boas-vindas no salão reservado</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2D5A3E] border-2 border-white" />
                <p className="text-xs font-semibold text-[#2D5A3E]">13:00</p>
                <p className="text-sm font-medium text-[#1C3829]">Cerimônia Religiosa & Bênção</p>
                <p className="text-xs text-[#637D6B]">A celebração do amor de Scheila & Gerson</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2D5A3E] border-2 border-white" />
                <p className="text-xs font-semibold text-[#2D5A3E]">13:45</p>
                <p className="text-sm font-medium text-[#1C3829]">Almoço Comemorativo & Brinde</p>
                <p className="text-xs text-[#637D6B]">Gastronomia especial Coco Bambu e confraternização</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A059] border-2 border-white" />
                <p className="text-xs font-semibold text-[#C5A059]">16:00</p>
                <p className="text-sm font-medium text-[#1C3829]">Corte do Bolo & Sobremesa</p>
                <p className="text-xs text-[#637D6B]">Momentos doces e fotos com os noivos</p>
              </div>
            </div>
          </div>

          {/* Dress Code Box */}
          <div className="bg-white border border-[#D5DDD6] rounded-2xl p-6 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A3E]/10 flex items-center justify-center text-[#2D5A3E] shrink-0">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-['Cormorant_Garamond',serif] text-xl font-medium text-[#1C3829]">
                  Traje: Esporte Fino / Passeio
                </h4>
                <p className="text-xs text-[#526D59] mt-1 leading-relaxed">
                  Para uma celebração elegante durante a tarde. Sinta-se à vontade e sofisticado(a). A paleta floral do casamento é inspirada em tons verdes e copo de leite.
                </p>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mt-4 pt-3 border-t border-[#EEF2EF] flex items-center justify-between text-xs text-[#6B8572]">
              <span className="font-medium">Paleta do casamento:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#1C3829] border border-white shadow-xs" title="Verde Esmeralda Profundo" />
                <span className="w-5 h-5 rounded-full bg-[#4E785B] border border-white shadow-xs" title="Verde Sálvia" />
                <span className="w-5 h-5 rounded-full bg-[#A2B8A8] border border-white shadow-xs" title="Eucalipto Suave" />
                <span className="w-5 h-5 rounded-full bg-[#FCFAF7] border border-[#DDD] shadow-xs" title="Copo de Leite (Branco Pérola)" />
                <span className="w-5 h-5 rounded-full bg-[#D4AF37] border border-white shadow-xs" title="Dourado Champanhe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
