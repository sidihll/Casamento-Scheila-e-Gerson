import React from 'react';
import { X, Calendar as CalendarIcon, Download, ExternalLink } from 'lucide-react';
import { WEDDING_DETAILS } from '../types/wedding';

export const CalendarModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Google Calendar URL
  // Event on 17/10/2026 from 13:00 to 18:00 BRT (UTC-3) => 16:00 to 21:00 UTC
  const startTime = '20261017T160000Z';
  const endTime = '20261017T210000Z';
  const eventTitle = encodeURIComponent('Casamento de Scheila Rodrigues Dihl e Gerson Martins');
  const eventDetails = encodeURIComponent(
    'Celebração do casamento de Scheila e Gerson no Restaurante Coco Bambu Tatuapé às 13:00h.'
  );
  const eventLocation = encodeURIComponent(
    `${WEDDING_DETAILS.local}, ${WEDDING_DETAILS.endereco}, ${WEDDING_DETAILS.cidade}`
  );

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&details=${eventDetails}&location=${eventLocation}`;

  // Generate .ics file for Apple Calendar / Outlook
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Casamento Scheila e Gerson//PT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:casamento-scheila-gerson-20261017@casamento.com`,
      'DTSTAMP:20261001T000000Z',
      'DTSTART:20261017T160000Z',
      'DTEND:20261017T210000Z',
      'SUMMARY:Casamento Scheila Rodrigues Dihl & Gerson Martins',
      'DESCRIPTION:Celebração do casamento de Scheila & Gerson no Restaurante Coco Bambu Tatuapé.',
      `LOCATION:${WEDDING_DETAILS.local}\\, ${WEDDING_DETAILS.endereco}\\, ${WEDDING_DETAILS.cidade}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Casamento_Scheila_e_Gerson.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-[#D5DDD6] relative">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#5A7360] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#2D5A3E]/10 text-[#2D5A3E] flex items-center justify-center mx-auto mb-3">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <h3 className="font-['Cormorant_Garamond',serif] text-2xl font-medium text-[#1C3829]">
            Salvar na sua Agenda
          </h3>
          <p className="text-xs text-[#52735C] mt-1">
            17 de Outubro de 2026 às 13:00h · Restaurante Coco Bambu
          </p>
        </div>

        <div className="space-y-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-[#2D5A3E] hover:bg-[#234731] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <ExternalLink className="w-4 h-4" />
            Adicionar ao Google Agenda
          </a>

          <button
            onClick={handleDownloadICS}
            className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#F2ECE1] text-[#2D5A3E] border border-[#BACCC0] text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            Baixar Arquivo iCal (.ics) / Apple / Outlook
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#7A9382] hover:text-[#2D5A3E] font-medium cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
