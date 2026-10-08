import React, { useState, useEffect } from 'react';
import { X, Users, Download, Database, CheckCircle2, XCircle, Search, ExternalLink, Copy, Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { RSVPData } from '../types/wedding';
import { fetchAllRSVPs, isSupabaseReady, saveCustomSupabaseConfig, SUPABASE_SQL_SCHEMA, formatWhatsAppUrl } from '../lib/supabase';

export const AdminGuestListModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'convidados' | 'supabase'>('convidados');
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPresence, setFilterPresence] = useState<'todos' | 'confirmado' | 'recusado'>('todos');
  
  // Custom Supabase credentials form state
  const [supabaseUrlInput, setSupabaseUrlInput] = useState('');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState('');
  const [configSuccess, setConfigSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await fetchAllRSVPs();
    setRsvps(res.data);
    setDataSource(res.source);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Stats calculation
  const totalConfirmados = rsvps.filter((r) => r.presenca === 'confirmado');
  const totalRecusados = rsvps.filter((r) => r.presenca === 'recusado');
  const totalAcompanhantes = totalConfirmados.reduce((acc, curr) => acc + (Number(curr.acompanhantes) || 0), 0);
  const totalPessoasConfirmadas = totalConfirmados.length + totalAcompanhantes;

  // Filtered list
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.telefone.includes(searchTerm);

    const matchesPresence = filterPresence === 'todos' ? true : r.presenca === filterPresence;
    return matchesSearch && matchesPresence;
  });

  const handleExportCSV = () => {
    const headers = [
      'Nome',
      'Presença',
      'Email',
      'Telefone',
      'Link WhatsApp',
      'Qtd Acompanhantes',
      'Nomes Acompanhantes',
      'Restrições Alimentares',
      'Mensagem',
      'Data de Registro',
    ];

    const rows = filteredRsvps.map((r) => [
      `"${r.nome.replace(/"/g, '""')}"`,
      r.presenca === 'confirmado' ? 'Confirmado' : 'Não Comparecerá',
      `"${r.email}"`,
      `"${r.telefone}"`,
      `"${r.whatsapp_url || formatWhatsAppUrl(r.telefone)}"`,
      r.acompanhantes || 0,
      `"${(r.nomes_acompanhantes || '').replace(/"/g, '""')}"`,
      `"${(r.restricoes_alimentares || '').replace(/"/g, '""')}"`,
      `"${(r.mensagem || '').replace(/"/g, '""')}"`,
      r.created_at || '',
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `casamento_scheila_gerson_lista_convidados_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (saveCustomSupabaseConfig(supabaseUrlInput, supabaseKeyInput)) {
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 3000);
      loadData();
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#D5DDD6] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAEFEA] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5A7360]">Painel dos Noivos</span>
              <span className="text-xs text-[#8FA392]">·</span>
              <span className="text-xs font-medium text-[#2D5A3E] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Acesso Reservado
              </span>
            </div>
            <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-medium text-[#1C3829]">
              Gestão de Convidados & Configurações
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar painel"
            className="p-2 rounded-full hover:bg-black/5 text-[#5A7360] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 border-b border-[#EAEFEA] bg-[#FAF8F5]/50 gap-4">
          <button
            onClick={() => setActiveTab('convidados')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'convidados'
                ? 'border-[#2D5A3E] text-[#2D5A3E]'
                : 'border-transparent text-[#7A9382] hover:text-[#2D5A3E]'
            }`}
          >
            <Users className="w-4 h-4" />
            Lista de Presença ({rsvps.length})
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'supabase'
                ? 'border-[#2D5A3E] text-[#2D5A3E]'
                : 'border-transparent text-[#7A9382] hover:text-[#2D5A3E]'
            }`}
          >
            <Database className="w-4 h-4" />
            Banco de Dados & Supabase
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'convidados' ? (
            <div>
              {/* Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B8572] font-semibold">Total Assentos</p>
                  <p className="text-2xl font-bold text-[#2D5A3E] font-['Cormorant_Garamond',serif]">
                    {totalPessoasConfirmadas}
                  </p>
                  <p className="text-[10px] text-[#7A9382]">Coco Bambu Tatuapé</p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B8572] font-semibold">Confirmados</p>
                  <p className="text-2xl font-bold text-[#1C3829] font-['Cormorant_Garamond',serif]">
                    {totalConfirmados.length}
                  </p>
                  <p className="text-[10px] text-[#7A9382]">Convites titulares</p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B8572] font-semibold">Acompanhantes</p>
                  <p className="text-2xl font-bold text-[#C5A059] font-['Cormorant_Garamond',serif]">
                    {totalAcompanhantes}
                  </p>
                  <p className="text-[10px] text-[#7A9382]">Adicionais</p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl p-3.5">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B8572] font-semibold">Não Comparecerão</p>
                  <p className="text-2xl font-bold text-gray-500 font-['Cormorant_Garamond',serif]">
                    {totalRecusados.length}
                  </p>
                  <p className="text-[10px] text-[#7A9382]">Avisaram ausência</p>
                </div>
              </div>

              {/* Action & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[#7A9382]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome, email ou telefone..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-[#1C3829] focus:outline-none focus:ring-1 focus:ring-[#2D5A3E]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <select
                    value={filterPresence}
                    onChange={(e: any) => setFilterPresence(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-[#1C3829] focus:outline-none cursor-pointer"
                  >
                    <option value="todos">Todos os registros</option>
                    <option value="confirmado">Apenas Confirmados</option>
                    <option value="recusado">Apenas Ausências</option>
                  </select>

                  <button
                    onClick={loadData}
                    title="Atualizar lista"
                    className="p-2 rounded-xl border border-[#CCD8CF] bg-white hover:bg-[#FAF8F5] text-[#2D5A3E] cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleExportCSV}
                    disabled={filteredRsvps.length === 0}
                    className="px-3.5 py-2 rounded-xl bg-[#2D5A3E] hover:bg-[#234731] disabled:bg-gray-300 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Exportar CSV / Excel
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="border border-[#CCD8CF] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs text-[#2C3E2D]">
                  <thead className="bg-[#F5F2EB] text-[#5A7360] font-semibold border-b border-[#CCD8CF]">
                    <tr>
                      <th className="p-3">Convidado(a)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">WhatsApp / Telefone</th>
                      <th className="p-3">Acompanhantes</th>
                      <th className="p-3">Restrições (Coco Bambu)</th>
                      <th className="p-3">Mensagem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEFEA]">
                    {filteredRsvps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-[#7A9382]">
                          Nenhum convidado encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredRsvps.map((rsvp, idx) => {
                        const waLink = rsvp.whatsapp_url || formatWhatsAppUrl(rsvp.telefone);
                        return (
                          <tr key={rsvp.id || idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                            <td className="p-3">
                              <p className="font-semibold text-[#1C3829]">{rsvp.nome}</p>
                              <p className="text-[11px] text-[#6B8572]">{rsvp.email}</p>
                            </td>

                            <td className="p-3">
                              {rsvp.presenca === 'confirmado' ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D5A3E]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A3E]" /> Confirmado
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                                  <XCircle className="w-3.5 h-3.5 text-gray-400" /> Ausente
                                </span>
                              )}
                            </td>

                            <td className="p-3">
                              <div className="flex items-center gap-1.5">
                                <span>{rsvp.telefone}</span>
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded text-[#25D366] hover:bg-[#25D366]/10"
                                    title="Abrir WhatsApp direto do convidado"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </td>

                            <td className="p-3">
                              {rsvp.acompanhantes > 0 ? (
                                <div>
                                  <span className="font-semibold text-[#1C3829]">+{rsvp.acompanhantes}</span>
                                  {rsvp.nomes_acompanhantes && (
                                    <p className="text-[10px] text-[#6B8572] max-w-xs truncate">
                                      {rsvp.nomes_acompanhantes}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-[#8FA392]">Apenas titular</span>
                              )}
                            </td>

                            <td className="p-3">
                              {rsvp.restricoes_alimentares ? (
                                <span className="text-[#997732] font-medium bg-[#FAF6EC] px-2 py-0.5 rounded text-[11px]">
                                  {rsvp.restricoes_alimentares}
                                </span>
                              ) : (
                                <span className="text-[#8FA392]">-</span>
                              )}
                            </td>

                            <td className="p-3">
                              {rsvp.mensagem ? (
                                <p className="text-[11px] text-[#4E785B] max-w-xs italic line-clamp-2" title={rsvp.mensagem}>
                                  &ldquo;{rsvp.mensagem}&rdquo;
                                </p>
                              ) : (
                                <span className="text-[#8FA392]">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Supabase Configuration Tab */
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-[#FAF8F5] border border-[#CCD8CF] rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2D5A3E]/10 text-[#2D5A3E] flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-[#1C3829]">
                      Integração Pronta com Supabase
                    </h4>
                    <p className="text-xs text-[#52735C] mt-1 leading-relaxed">
                      O sistema já está 100% programado e pronto para gravar diretamente na sua tabela do Supabase. Conforme solicitado, nenhum botão ou marca pública do Supabase é exibido para os convidados.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAEFEA] flex items-center justify-between text-xs">
                  <span className="text-[#6B8572]">Status da Conexão:</span>
                  <span className={`font-semibold flex items-center gap-1.5 ${isSupabaseReady() ? 'text-[#2D5A3E]' : 'text-[#C5A059]'}`}>
                    <span className={`w-2 h-2 rounded-full ${isSupabaseReady() ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                    {isSupabaseReady() ? 'Conectado ao Supabase com Sucesso' : 'Modo de Armazenamento Local Ativo (Pronto para conectar)'}
                  </span>
                </div>
              </div>

              {/* SQL Schema helper */}
              <div className="bg-white border border-[#CCD8CF] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-[#3D5744]">
                    Script SQL para criar a tabela no Supabase
                  </h5>
                  <button
                    onClick={handleCopySql}
                    className="px-3 py-1 rounded-lg bg-[#2D5A3E] hover:bg-[#234731] text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar Script SQL
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[#6B8572] mb-3">
                  Cole este código no SQL Editor do seu projeto Supabase para criar a tabela com suporte a RLS:
                </p>
                <pre className="p-3 bg-[#1C281F] text-[#D2E2D5] rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>

              {/* Custom Credentials Input */}
              <form onSubmit={handleSaveSupabaseConfig} className="bg-white border border-[#CCD8CF] rounded-2xl p-5 space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-[#3D5744]">
                  Vincular Chaves do Supabase
                </h5>
                <p className="text-xs text-[#6B8572]">
                  Você pode configurar as variáveis no arquivo <code>.env</code> (<code>VITE_SUPABASE_URL</code> e <code>VITE_SUPABASE_ANON_KEY</code>) ou salvá-las diretamente abaixo:
                </p>

                {configSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Chaves salvas com sucesso! O sistema está pronto e sincronizado.
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-[#3D5744] mb-1">
                    Supabase Project URL (VITE_SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://xyzcompany.supabase.co"
                    value={supabaseUrlInput}
                    onChange={(e) => setSupabaseUrlInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-[#1C3829] focus:outline-none focus:ring-1 focus:ring-[#2D5A3E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#3D5744] mb-1">
                    Supabase Anon Key (VITE_SUPABASE_ANON_KEY)
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseKeyInput}
                    onChange={(e) => setSupabaseKeyInput(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#CCD8CF] rounded-xl text-[#1C3829] focus:outline-none focus:ring-1 focus:ring-[#2D5A3E]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2D5A3E] hover:bg-[#234731] text-white text-xs font-medium rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Salvar e Conectar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
