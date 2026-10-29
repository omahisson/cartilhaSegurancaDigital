import { referencias } from '../data/references.js';
import { criarIcone } from '../lib/icons.js';
import { criarCaminhoNavegacao, criarAviso } from '../ui/components.js';
export function paginaReferencias(): string {
  let gruposReferencias = '';
  let indiceGrupo = 0;
  for (const [grupo, fontes] of Object.entries(referencias)) {
    let listaReferencias = '';
    for (const referencia of fontes) {
      let tituloReferencia = referencia.titulo;
      let observacaoReferencia = '';
      if (referencia.endereco) {
        tituloReferencia = `<a href="${referencia.endereco}" target="_blank" rel="noopener noreferrer">${referencia.titulo} ${criarIcone('external', 15)}</a>`;
      }
      if (referencia.observacao) {
        observacaoReferencia = `<p>${referencia.observacao}</p>`;
      }
      listaReferencias += `<div class="reference-item"><span class="reference-item__icon">${criarIcone('book', 19)}</span>`
        + `<div>`
        + `<h3>${tituloReferencia}</h3>`
        + `<div class="reference-item__publisher">${referencia.instituicao}</div>${observacaoReferencia}</div>`
        + `</div>`;
    }
    gruposReferencias += `<section class="reference-group" id="refs-${indiceGrupo}">`
      + `<div class="eyebrow">0${indiceGrupo + 1} · Fontes</div>`
      + `<h2>${grupo}</h2>`
      + `<div class="references-list">${listaReferencias}</div>`
      + `</section>`;
    indiceGrupo++;
  }
  return `<main id="conteudo">${criarCaminhoNavegacao([{ texto: 'Referências' }])}<section class="page-hero page-hero--light">`
    + `<div class="container">`
    + `<div class="eyebrow">Fontes consultadas</div>`
    + `<h1>Referências</h1>`
    + `<p>Segurança digital pede informação verificável. Aqui estão as fontes documentais e públicas que orientaram o projeto e esta cartilha.</p>`
    + `</div>`
    + `</section>`
    + `<section class="section">`
    + `<div class="container references-layout">`
    + `<div class="references-main">${gruposReferencias}</div>`
    + `<aside class="references-sidebar">`
    + `<div class="references-sidebar__sticky">${criarAviso('info', 'Separação de fontes', 'O plano de extensão descreve objetivos e propostas. A arquitetura documenta o que foi efetivamente implementado.')}</div>`
    + `</aside>`
    + `</div>`
    + `</section>`
    + `</main>`;
}
