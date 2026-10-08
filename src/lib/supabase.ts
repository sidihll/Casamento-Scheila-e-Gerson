import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RSVPData } from '../types/wedding';

const LOCAL_STORAGE_KEY = 'casamento_scheila_gerson_rsvps';
const SUPABASE_CONFIG_KEY = 'casamento_supabase_custom_credentials';

// Check environment variables first, then local fallback credentials if saved
function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes('your-project')) {
    return { url: envUrl, key: envKey };
  }

  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.key) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage errors
  }

  return { url: '', key: '' };
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const { url, key } = getSupabaseCredentials();
  if (url && key) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (err) {
      console.warn('Erro ao inicializar Supabase:', err);
      return null;
    }
  }

  return null;
}

export function isSupabaseReady(): boolean {
  return !!getSupabase();
}

export function saveCustomSupabaseConfig(url: string, key: string) {
  if (url && key) {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url: url.trim(), key: key.trim() }));
    supabaseInstance = null; // Reset to recreate
    return true;
  }
  return false;
}

// Format phone number to clean WhatsApp link: https://wa.me/55...
export function formatWhatsAppUrl(phone: string, text?: string): string {
  if (!phone) return '';
  const digitsOnly = phone.replace(/\D/g, '');
  
  // If user entered without country code (e.g. 11987654321), append 55 (Brazil)
  let cleanNumber = digitsOnly;
  if (digitsOnly.length === 10 || digitsOnly.length === 11) {
    cleanNumber = `55${digitsOnly}`;
  } else if (!digitsOnly.startsWith('55') && digitsOnly.length < 13) {
    cleanNumber = `55${digitsOnly}`;
  }

  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${cleanNumber}${encodedText}`;
}

// Generate Brazilian phone display format: (11) 98765-4321
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// SQL Schema script for the user to create the table and storage policies in Supabase SQL editor
export const SUPABASE_SQL_SCHEMA = `-- ================================================================
-- CASAMENTO SCHEILA RODRIGUES DIHL & GERSON MARTINS
-- Script SQL completo para o painel Supabase (SQL Editor)
-- ================================================================

-- 1. CRIAÇÃO DA TABELA DE CONFIRMAÇÕES (RSVP)
create table if not exists public.rsvps (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null,
  telefone text not null,
  whatsapp_url text,
  presenca text not null check (presenca in ('confirmado', 'recusado')),
  acompanhantes integer default 0 check (acompanhantes >= 0),
  nomes_acompanhantes text,
  restricoes_alimentares text,
  mensagem text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ÍNDICES PARA CONSULTAS RÁPIDAS
create index if not exists idx_rsvps_created_at on public.rsvps (created_at desc);
create index if not exists idx_rsvps_presenca on public.rsvps (presenca);
create index if not exists idx_rsvps_email on public.rsvps (email);

-- 3. ATIVAR ROW LEVEL SECURITY (RLS) NA TABELA
alter table public.rsvps enable row level security;

-- Limpar políticas existentes para evitar duplicidade ao reexecutar
drop policy if exists "Permitir inserção anônima de confirmações" on public.rsvps;
drop policy if exists "Permitir leitura de confirmações" on public.rsvps;
drop policy if exists "Permitir atualização de confirmações" on public.rsvps;

-- POLÍTICA 1: Permitir que convidados (público / anon) enviem confirmações
create policy "Permitir inserção anônima de confirmações"
  on public.rsvps
  for insert
  to anon, authenticated
  with check (true);

-- POLÍTICA 2: Permitir leitura das confirmações para o painel dos noivos
create policy "Permitir leitura de confirmações"
  on public.rsvps
  for select
  to anon, authenticated
  using (true);

-- POLÍTICA 3: Permitir atualização caso o convidado queira ajustar dados
create policy "Permitir atualização de confirmações"
  on public.rsvps
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- ================================================================
-- 4. POLÍTICAS DE ARMAZENAMENTO DE ARQUIVOS (SUPABASE STORAGE)
-- (Caso deseje salvar fotos, comprovantes ou anexos no bucket)
-- ================================================================

-- Criar o bucket público 'casamento' caso não exista
insert into storage.buckets (id, name, public)
values ('casamento', 'casamento', true)
on conflict (id) do update set public = true;

-- Limpar políticas de storage anteriores
drop policy if exists "Permitir upload público no bucket casamento" on storage.objects;
drop policy if exists "Permitir visualização pública no bucket casamento" on storage.objects;

-- POLÍTICA STORAGE 1: Permitir upload de imagens / arquivos pelos convidados
create policy "Permitir upload público no bucket casamento"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'casamento');

-- POLÍTICA STORAGE 2: Permitir leitura pública dos arquivos do casamento
create policy "Permitir visualização pública no bucket casamento"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'casamento');
`;

// Save RSVP to Supabase (with automatic local storage backup)
export async function submitRSVP(rsvp: RSVPData): Promise<{
  success: boolean;
  source: 'supabase' | 'local';
  error?: string;
  data: RSVPData;
}> {
  const record: RSVPData = {
    ...rsvp,
    id: rsvp.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `rsvp_${Date.now()}`),
    created_at: new Date().toISOString(),
    whatsapp_url: formatWhatsAppUrl(rsvp.telefone),
  };

  // Always back up to LocalStorage
  saveToLocalStorage(record);

  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('rsvps').insert([
        {
          id: record.id,
          nome: record.nome,
          email: record.email,
          telefone: record.telefone,
          whatsapp_url: record.whatsapp_url,
          presenca: record.presenca,
          acompanhantes: record.acompanhantes,
          nomes_acompanhantes: record.nomes_acompanhantes || '',
          restricoes_alimentares: record.restricoes_alimentares || '',
          mensagem: record.mensagem || '',
          created_at: record.created_at,
        },
      ]);

      if (error) {
        console.warn('Supabase insert warning (salvo localmente como contingência):', error);
        return {
          success: true,
          source: 'local',
          error: error.message,
          data: record,
        };
      }

      return {
        success: true,
        source: 'supabase',
        data: record,
      };
    } catch (err: any) {
      console.warn('Erro ao conectar com Supabase, salvo localmente:', err);
      return {
        success: true,
        source: 'local',
        error: err?.message,
        data: record,
      };
    }
  }

  // If Supabase is not yet configured, cleanly store in localStorage
  return {
    success: true,
    source: 'local',
    data: record,
  };
}

function saveToLocalStorage(record: RSVPData) {
  try {
    const list = getLocalRSVPs();
    const updated = [record, ...list.filter((item) => item.id !== record.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Falha ao salvar no localStorage:', err);
  }
}

export function getLocalRSVPs(): RSVPData[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function fetchAllRSVPs(): Promise<{ data: RSVPData[]; source: 'supabase' | 'local' }> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return { data: data as RSVPData[], source: 'supabase' };
      }
    } catch (err) {
      console.warn('Falha ao carregar do Supabase, usando local:', err);
    }
  }

  return { data: getLocalRSVPs(), source: 'local' };
}
