import { autores } from '../data/references.js';
import { criarIcone } from '../lib/icons.js';
import { criarCaminhoNavegacao, criarAviso } from '../ui/components.js';
export function paginaSobre(): string {
  let listaOrientadores = '';
  for (const orientador of autores.orientadores) {
    listaOrientadores += `<div class="advisor"><span>${criarIcone('book', 20)}</span><strong>${orientador}</strong>`
      + `</div>`;
  }
  return `<main id="conteudo">${criarCaminhoNavegacao([{ texto: 'Sobre o projeto' }])}<section class="page-hero page-hero--light">`
    + `<div class="container">`
    + `<div class="eyebrow">Sobre · Pessoas e propósito</div>`
    + `<h1>Conhecimento que começa<br/>no laboratório e vai além.</h1>`
    + `<p>Um projeto de extensão do IF Sudeste MG que reúne desenvolvimento de software, aprendizado prático e conscientização sobre segurança digital.</p>`
    + `</div>`
    + `</section>
 <section class="section">`
    + `<div class="container about-lead">`
    + `<div>`
    + `<div class="eyebrow">Por que existimos</div>`
    + `<h2>Computadores compartilhados precisam proteger quem passa por eles.</h2>`
    + `</div>`
    + `<div class="about-lead__text">`
    + `<p>Um laboratório recebe muitas pessoas durante o dia. Quando navegadores preservam dados locais de autenticação, o próximo usuário pode encontrar vestígios do anterior. Essa preocupação motivou o projeto <strong>Hardening e Proteção de Sessões em Computadores Compartilhados no IF Sudeste MG (Campus Juiz de Fora)</strong>.</p>`
    + `<p>O trabalho articula uma medida técnica específica, a sanitização automática de perfis de navegadores, com orientações acessíveis ao público. A intenção extensionista é compartilhar aprendizados que possam ajudar outras escolas e instituições de ensino.</p>`
    + `</div>`
    + `</div>`
    + `</section>
 <section class="section section--light">`
    + `<div class="container">`
    + `<div class="eyebrow">O que construímos</div>`
    + `<h2>Duas entregas que se complementam.</h2>`
    + `<div class="deliverables">`
    + `<div><span class="deliverable-icon">${criarIcone('shield', 29)}</span>`
    + `<h3>Solução de sanitização</h3>`
    + `<p>Rotina automatizada para reduzir a persistência de dados locais de Google Chrome, Microsoft Edge e Mozilla Firefox no logon de computadores compartilhados. Evoluída até a versão documentada 3.0A.</p><a href="#/como-funciona" class="text-link">Conheça o funcionamento ${criarIcone('arrow', 17)}</a>`
    + `</div>`
    + `<div><span class="deliverable-icon">${criarIcone('book', 29)}</span>`
    + `<h3>Cartilha pública de segurança</h3>`
    + `<p>Fascículos com orientações sobre sessões, dados de navegação, senhas, arquivos baixados e cuidados em ambientes coletivos.</p><a href="#/fasciculos" class="text-link">Leia a cartilha ${criarIcone('arrow', 17)}</a>`
    + `</div>`
    + `</div>`
    + `</div>`
    + `</section>
 <section class="section">`
    + `<div class="container">`
    + `<div class="eyebrow">Quem faz</div>`
    + `<h2>Projeto acadêmico, impacto público.</h2>`
    + `<div class="team-layout">`
    + `<div class="person-card person-card--main">`
    + `<div class="person-avatar">${criarIcone('monitor', 30)}</div><span>Desenvolvimento e autoria</span>`
    + `<h3>${autores.desenvolvedor}</h3>`
    + `<p>${autores.curso} · ${autores.instituicao} · ${autores.campus}</p>`
    + `</div>`
    + `<div class="advisors">`
    + `<h3>Orientação acadêmica</h3>${listaOrientadores}</div>`
    + `</div>`
    + `</div>`
    + `</section>
 <section class="section section--light">`
    + `<div class="container two-col">`
    + `<div>`
    + `<div class="eyebrow">Responsabilidade editorial</div>`
    + `<h2>O que o site informa</h2>`
    + `<p>Este material apresenta dicas educativas e descreve a implementação da solução até a versão 3.0A conforme a documentação de arquitetura de 2026.</p>`
    + `</div>`
    + `<div>${criarAviso('info', 'Versão de referência: 3.0A', 'A rotina atual é disparada no logon do Windows e atua nos perfis locais dos navegadores. Não limpa Downloads, Documentos, Área de Trabalho ou dados armazenados na nuvem.')}</div>`
    + `</div>`
    + `</section>
 <section class="section">`
    + `<div class="container">`
    + `<div class="about-bottom">`
    + `<div>`
    + `<div class="eyebrow">Referências e transparência</div>`
    + `<h2>Uma boa prática também é mostrar de onde vêm as informações.</h2>`
    + `<p>As fontes incluem a proposta de extensão, a documentação técnica da implementação atual e materiais públicos de referência sobre segurança da informação e privacidade.</p>`
    + `</div><a class="button button--primary" href="#/referencias">Consulte as referências ${criarIcone('arrow', 18)}</a>`
    + `</div>`
    + `</div>`
    + `</section>
 </main>`;
}
