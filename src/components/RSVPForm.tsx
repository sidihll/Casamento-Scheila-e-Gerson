import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Heart, User, Mail, Phone, MessageSquare, AlertCircle, Utensils, Users, Send, ExternalLink } from 'lucide-react';
import { RSVPData, WEDDING_DETAILS } from '../types/wedding';
import { submitRSVP, formatPhoneNumber, formatWhatsAppUrl } from '../lib/supabase';
import { BotanicalDivider, CallaLilyFlower } from './CallaLilyDecorations';

export const RSVPForm: React.FC<{ onOpenCalendar: () => void }> = ({ onOpenCalendar }) => {
  const [formData, setFormData] = useState<RSVPData>({
    nome: '',
    email: '',
    telefone: '',
    presenca: 'confirmado',
    acompanhantes: 0,
    nomes_acompanhantes: '',
    restricoes_alimentares: '',
    mensagem: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, telefone: formatted }));
  };

  const handleCompanionsCount = (count: number) => {
    setFormData((prev) => ({
      ...prev,
      acompanhantes: count,
      nomes_acompanhantes: count === 0 ? '' : prev.nomes_acompanhantes,
    }));
  };

  const currentWhatsAppLink = formData.telefone
    ? formatWhatsAppUrl(
        formData.telefone,
        `Olá! Aqui é ${formData.nome || 'convidado(a)'} do casamento de Scheila & Gerson.`
      )
    : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.nome.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    if (!formData.telefone.trim() || formData.telefone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Por favor, informe um telefone válido com DDD (mínimo 10 dígitos).');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitRSVP(formData);

      if (result.success) {
        setSubmittedData(result.data);

        // Confetti celebration if confirmed
        if (formData.presenca === 'confirmado') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2D5A3E', '#4E785B', '#C5A059', '#FCFAF7', '#8FA392'],
          });
        }
      } else {
        setErrorMessage('Houve uma instabilidade temporária, mas tentamos novamente.');
      }
    } catch (err: any) {
      setErrorMessage('Não foi possível registrar agora. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      presenca: 'confirmado',
      acompanhantes: 0,
      nomes_acompanhantes: '',
      restricoes_alimentares: '',
      mensagem: '',
    });
  };

  // WhatsApp text to notify couple directly
  const coupleWhatsAppMessage = submittedData
    ? `Olá Scheila e Gerson! ${
        submittedData.presenca === 'confirmado'
          ? `Acabei de confirmar minha presença no casamento de vocês no Coco Bambu dia 17/10/2026!`
          : `Agradeço muito o carinho pelo convite do casamento, mas infelizmente não poderei comparecer.`
      } Meu nome é ${submittedData.nome}${
        submittedData.acompanhantes > 0 ? ` (iremos em ${submittedData.acompanhantes + 1} pessoas)` : ''
      }. Grande abraço!`
    : '';

  const sendToCoupleWhatsAppUrl = formatWhatsAppUrl(
    WEDDING_DETAILS.telefoneContato,
    coupleWhatsAppMessage
  );

  return (
    <section id="rsvp" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-6">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#5A7360] font-semibold mb-2">
          Confirmação de Presença
        </p>
        <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-5xl font-light text-[#1C3829]">
          Celebre Conosco esse Momento
        </h2>
        <p className="text-sm sm:text-base text-[#4F6C56] max-w-xl mx-auto mt-3">
          Sua presença é fundamental para tornar nosso dia inesquecível. Por gentileza, confirme até{' '}
          <strong>01 de Outubro de 2026</strong> para organizarmos os lugares no Coco Bambu com carinho.
        </p>
        <BotanicalDivider className="my-6" />
      </div>

      <div className="bg-white border border-[#D5DDD6] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle floral accents */}
        <div className="absolute -top-10 -right-10 opacity-20 pointer-events-none hidden sm:block">
          <CallaLilyFlower className="w-36 h-48" />
        </div>

        {submittedData ? (
          /* Success Screen */
          <div className="text-center py-6 px-2 sm:px-8">
            <div className="w-16 h-16 rounded-full bg-[#2D5A3E]/10 text-[#2D5A3E] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl text-[#1C3829] font-medium">
              {submittedData.presenca === 'confirmado'
                ? 'Presença Confirmada com Sucesso!'
                : 'Agradecemos a sua resposta!'}
            </h3>

            <p className="text-sm sm:text-base text-[#4E785B] max-w-md mx-auto mt-2 leading-relaxed">
              {submittedData.presenca === 'confirmado'
                ? `Muito obrigado, ${submittedData.nome}! Estamos contando os dias para celebrar este momento especial com você no Coco Bambu Tatuapé.`
                : `Sentiremos sua falta, ${submittedData.nome}. Agradecemos o carinho e consideração por nos avisar.`}
            </p>

            {/* Summary Details */}
            <div className="my-6 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl p-5 max-w-lg mx-auto text-left text-xs sm:text-sm text-[#3E5545] space-y-2">
              <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                <span className="text-[#6B8572]">Convidado(a):</span>
                <span className="font-semibold text-[#1C3829]">{submittedData.nome}</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                <span className="text-[#6B8572]">E-mail:</span>
                <span className="font-medium text-[#1C3829]">{submittedData.email}</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                <span className="text-[#6B8572]">Telefone WhatsApp:</span>
                <span className="font-medium text-[#1C3829]">{submittedData.telefone}</span>
              </div>
              {submittedData.presenca === 'confirmado' && (
                <>
                  <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                    <span className="text-[#6B8572]">Acompanhantes:</span>
                    <span className="font-medium text-[#1C3829]">
                      {submittedData.acompanhantes === 0 ? 'Nenhum (Apenas você)' : `${submittedData.acompanhantes} acompanhante(s)`}
                    </span>
                  </div>
                  {submittedData.nomes_acompanhantes && (
                    <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                      <span className="text-[#6B8572]">Nomes:</span>
                      <span className="font-medium text-[#1C3829] text-right">{submittedData.nomes_acompanhantes}</span>
                    </div>
                  )}
                  {submittedData.restricoes_alimentares && (
                    <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                      <span className="text-[#6B8572]">Restrições alimentares:</span>
                      <span className="font-medium text-[#1C3829] text-right">{submittedData.restricoes_alimentares}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Direct WhatsApp Confirmation Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto mt-6">
              <a
                href={sendToCoupleWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium text-xs sm:text-sm shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                Avisar Noivos pelo WhatsApp
              </a>

              {submittedData.presenca === 'confirmado' && (
                <button
                  onClick={onOpenCalendar}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2D5A3E] hover:bg-[#234731] text-white font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Salvar na Agenda
                </button>
              )}
            </div>

            <button
              onClick={handleReset}
              className="mt-6 text-xs text-[#52735C] hover:text-[#2D5A3E] underline font-medium cursor-pointer"
            >
              Fazer outra confirmação ou alterar dados
            </button>
          </div>
        ) : (
          /* Active Registration Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-2.5">
                Você poderá comparecer ao nosso casamento? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.presenca === 'confirmado'
                      ? 'border-[#2D5A3E] bg-[#2D5A3E]/5 ring-1 ring-[#2D5A3E]'
                      : 'border-[#D5DDD6] hover:border-[#BACCC0] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="presenca"
                    value="confirmado"
                    checked={formData.presenca === 'confirmado'}
                    onChange={() => setFormData({ ...formData, presenca: 'confirmado' })}
                    className="accent-[#2D5A3E] w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1C3829]">Sim! Estarei presente ✨</p>
                    <p className="text-xs text-[#52735C]">Celebrarei com Scheila & Gerson</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.presenca === 'recusado'
                      ? 'border-[#917540] bg-[#FAF6EC] ring-1 ring-[#917540]'
                      : 'border-[#D5DDD6] hover:border-[#BACCC0] bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="presenca"
                    value="recusado"
                    checked={formData.presenca === 'recusado'}
                    onChange={() => setFormData({ ...formData, presenca: 'recusado' })}
                    className="accent-[#917540] w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1C3829]">Infelizmente não poderei 🤍</p>
                    <p className="text-xs text-[#52735C]">Enviarei boas energias e orações</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-1.5">
                Nome Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718B79]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Maria Carolina da Silva"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-sm text-[#1C3829] focus:outline-none focus:ring-2 focus:ring-[#2D5A3E] focus:bg-white transition-all placeholder:text-[#9FB1A5]"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-1.5">
                  E-mail *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718B79]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@exemplo.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-sm text-[#1C3829] focus:outline-none focus:ring-2 focus:ring-[#2D5A3E] focus:bg-white transition-all placeholder:text-[#9FB1A5]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744]">
                    Telefone (WhatsApp) *
                  </label>
                  {currentWhatsAppLink && (
                    <a
                      href={currentWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#25D366] hover:text-[#1EA952] font-semibold inline-flex items-center gap-1"
                      title="Link direto para WhatsApp gerado"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Link wa.me ativo
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#718B79]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 98765-4321"
                    maxLength={15}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-sm text-[#1C3829] focus:outline-none focus:ring-2 focus:ring-[#2D5A3E] focus:bg-white transition-all placeholder:text-[#9FB1A5]"
                  />
                </div>
                <p className="text-[11px] text-[#6E8877] mt-1">
                  Formatado com link direto para WhatsApp (<code className="text-[#2D5A3E]">https://wa.me/...</code>)
                </p>
              </div>
            </div>

            {/* Companions and details (only if attending) */}
            {formData.presenca === 'confirmado' && (
              <div className="space-y-4 pt-2 border-t border-[#EEF2EF]">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-2 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#5A7360]" />
                    Quantidade de Acompanhantes
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => handleCompanionsCount(num)}
                        className={`w-11 h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          formData.acompanhantes === num
                            ? 'bg-[#2D5A3E] text-white shadow-xs'
                            : 'bg-[#FAF8F5] text-[#3D5744] border border-[#CCD8CF] hover:bg-[#EAE5DC]'
                        }`}
                      >
                        {num === 0 ? 'Apenas eu' : `+${num}`}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.acompanhantes > 0 && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-1.5">
                      Nome(s) do(s) Acompanhante(s)
                    </label>
                    <input
                      type="text"
                      value={formData.nomes_acompanhantes}
                      onChange={(e) => setFormData({ ...formData, nomes_acompanhantes: e.target.value })}
                      placeholder="Ex: Carlos Dihl (Cônjuge) e Sofia Dihl (Filha, 8 anos)"
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-sm text-[#1C3829] focus:outline-none focus:ring-2 focus:ring-[#2D5A3E] focus:bg-white transition-all placeholder:text-[#9FB1A5]"
                    />
                  </div>
                )}

                {/* Dietary Requirements (Coco Bambu seafood consideration) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-1.5 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-[#5A7360]" />
                    Restrições Alimentares / Observações (Coco Bambu)
                  </label>
                  <input
                    type="text"
                    value={formData.restricoes_alimentares}
                    onChange={(e) => setFormData({ ...formData, restricoes_alimentares: e.target.value })}
                    placeholder="Ex: Alergia a frutos do mar, Vegetariano, Sem glúten..."
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-sm text-[#1C3829] focus:outline-none focus:ring-2 focus:ring-[#2D5A3E] focus:bg-white transition-all placeholder:text-[#9FB1A5]"
                  />
                  <p className="text-[11px] text-[#6E8877] mt-1">
                    Como o Coco Bambu tem especialidade em frutos do mar e carnes, avise-nos caso possua alguma alergia ou dieta especial.
                  </p>
                </div>
              </div>
            )}

            {/* Heartfelt Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#3D5744] mb-1.5 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#C5A059]" />
                Mensagem com Carinho aos Noivos (Opcional)
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Deixe uma mensagem especial, bênção ou votos de felicidade para Scheila e Gerson..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-sm text-[#1C3829] focus:outline-none focus:ring-2 focus:ring-[#2D5A3E] focus:bg-white transition-all placeholder:text-[#9FB1A5]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 bg-[#2D5A3E] hover:bg-[#234731] disabled:bg-[#779180] text-white font-medium text-sm sm:text-base tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registrando sua confirmação...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {formData.presenca === 'confirmado' ? 'Confirmar Presença no Casamento' : 'Enviar Resposta'}
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
