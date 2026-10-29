export type CategoriaFasciculo = 'Comece aqui' | 'Seus hábitos' | 'A proteção';
export type NomeIcone =
  'monitor'
  | 'door'
  | 'cookie'
  | 'download'
  | 'key'
  | 'refresh'
  | 'shield'
  | 'check'
  | 'arrow'
  | 'spark'
  | 'book'
  | 'info'
  | 'clock'
  | 'search'
  | 'external'
  | 'lock'
  | 'cloud'
  | 'menu'
  | 'close'
  | 'copy'
  | 'printer';
export interface Fasciculo {
  endereco: string;
  numero: string;
  categoria: CategoriaFasciculo;
  icone: NomeIcone;
  tempoLeitura: string;
  titulo: string;
  resumo: string;
  pergunta: string;
  tituloContexto: string;
  contexto: string[];
  tituloAcoes: string;
  acoes: string[];
  tituloProjeto: string;
  projeto: string;
  tituloAviso: string;
  aviso: string;
  mensagemFinal: string;
}
export interface Referencia {
  titulo: string;
  instituicao: string;
  endereco?: string;
  observacao?: string;
}
