import { fasciculos, buscarFasciculo } from '../data/fascicles.js';
import { criarIcone } from '../lib/icons.js';
import { criarCaminhoNavegacao, criarAviso } from '../ui/components.js';
export function paginaFasciculo(endereco: string): string {
  const fasciculo = buscarFasciculo(endereco);
  if (!fasciculo) return `<main id="conteudo">`
    + `<div class="container not-found">`
    + `<h1>Fascículo não encontrado</h1><a href="#/fasciculos" class="button button--primary">Explorar fascículos ${criarIcone('arrow', 18)}</a>`
    + `</div>`
    + `</main>`;
  const indice = fasciculos.indexOf(fasciculo);
  const proximo = fasciculos[(indice + 1) % fasciculos.length] || fasciculo;
  const anterior = fasciculos[(indice + fasciculos.length - 1) % fasciculos.length] || fasciculo;
  let paragrafosContexto = '';
  for (const paragrafo of fasciculo.contexto) {
    paragrafosContexto += `<p>${paragrafo}</p>`;
  }
  let listaOrientacoes = '';
  for (let indiceOrientacao = 0; indiceOrientacao < fasciculo.acoes.length; indiceOrientacao++) {
    const numeroOrientacao = String(indiceOrientacao + 1).padStart(2, '0');
    const orientacao = fasciculo.acoes[indiceOrientacao];
    listaOrientacoes += `<li><span>${numeroOrientacao}</span>`
      + `<p>${orientacao}</p>`
      + `</li>`;
  }
  return `<main id="conteudo">${criarCaminhoNavegacao([{ texto: 'Fascículos', endereco: '#/fasciculos' }, { texto: fasciculo.titulo }])}<section class="article-hero">`
    + `<div class="container article-hero__grid">`
    + `<div>`
    + `<div class="eyebrow">Fascículo ${fasciculo.numero} / 09 · ${fasciculo.categoria}</div>`
    + `<h1>${fasciculo.titulo}</h1>`
    + `<p>${fasciculo.resumo}</p>`
    + `<div class="article-meta"><span>${criarIcone('clock', 17)} ${fasciculo.tempoLeitura} de leitura</span><span>${criarIcone('book', 17)} Leitura independente</span>`
    + `</div>`
    + `</div>`
    + `<div class="article-hero__art" aria-hidden="true">`
    + `<div class="article-hero__circle">${criarIcone(fasciculo.icone, 82)}</div>`
    + `<div class="article-hero__index">${fasciculo.numero}</div>`
    + `</div>`
    + `</div>`
    + `</section>
 <div class="container article-body">`
    + `<div class="article-main">
  <section id="pergunta" class="article-question"><span class="article-mini-label">Antes de continuar, pense nisso:</span>`
    + `<h2>${fasciculo.pergunta}</h2>`
    + `</section>
  <section id="entenda" class="prose-section">`
    + `<div class="eyebrow">Entenda o problema</div>`
    + `<h2>${fasciculo.tituloContexto}</h2>${paragrafosContexto}</section>
  <section id="acoes" class="prose-section">`
    + `<div class="eyebrow">Na prática</div>`
    + `<h2>${fasciculo.tituloAcoes}</h2>`
    + `<ul class="action-list">${listaOrientacoes}</ul>`
    + `</section>
  <section id="projeto" class="prose-section project-explainer">`
    + `<div class="eyebrow">O projeto de extensão</div>`
    + `<h2>${fasciculo.tituloProjeto}</h2>`
    + `<p>${fasciculo.projeto}</p>`
    + `</section>
  ${criarAviso('warning', fasciculo.tituloAviso, fasciculo.aviso)}
  <div class="article-takeaway"><span>${criarIcone('spark', 24)}</span>`
    + `<div><strong>Para levar com você</strong>`
    + `<p>${fasciculo.mensagemFinal}</p>`
    + `</div>`
    + `</div>
  <div class="article-actions">`
    + `<button id="copy-page-link" class="text-button" type="button">${criarIcone('copy', 17)} Copiar link</button>`
    + `<button id="print-page" class="text-button" type="button">${criarIcone('printer', 17)} Imprimir</button><span id="copy-result" class="screen-reader-only" role="status" aria-live="polite"></span>`
    + `</div>
  <nav class="article-pagination" aria-label="Outros fascículos"><a href="#/fasciculos/${anterior.endereco}"><span>${criarIcone('arrow', 18)} Anterior</span><strong>${anterior.titulo}</strong></a><a href="#/fasciculos/${proximo.endereco}"><span>Próximo ${criarIcone('arrow', 18)}</span><strong>${proximo.titulo}</strong></a>`
    + `</nav>
 </div>`
    + `<aside class="article-sidebar">`
    + `<div class="sidebar-sticky"><span class="sidebar-label">Nesta página</span><a href="#pergunta">A pergunta</a><a href="#entenda">Entenda o risco</a><a href="#acoes">O que fazer</a><a href="#projeto">O que o projeto faz</a>`
    + `<div class="sidebar-divider">`
    + `</div><a href="#/fasciculos" class="sidebar-all">${criarIcone('book', 17)} Todos os fascículos</a>`
    + `</div>`
    + `</aside>`
    + `</div>
 </main>`;
}
