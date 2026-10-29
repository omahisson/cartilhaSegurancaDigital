import { fasciculos, categorias } from '../data/fascicles.js';
import { criarIcone } from '../lib/icons.js';
import { criarCaminhoNavegacao, criarCartaoFasciculo } from '../ui/components.js';
export function paginaFasciculos() {
    let filtros = '';
    for (const categoria of categorias) {
        const selecionada = categoria === 'Todos';
        let classeSelecionada = '';
        if (selecionada) {
            classeSelecionada = ' is-selected';
        }
        filtros += `<button type="button" class="filter-chip${classeSelecionada}" data-filter="${categoria}" aria-pressed="${selecionada}">${categoria}</button>`;
    }
    let cartoes = '';
    for (const fasciculo of fasciculos) {
        cartoes += criarCartaoFasciculo(fasciculo);
    }
    return `<main id="conteudo">${criarCaminhoNavegacao([{ texto: 'Fascículos' }])}<section class="page-hero page-hero--light">`
        + `<div class="container">`
        + `<div class="eyebrow">Biblioteca de dicas</div>`
        + `<h1>Fascículos</h1>`
        + `<p>Uma pergunta por vez. Escolha o assunto mais útil para você e comece por qualquer página.</p>`
        + `<div class="explore-controls">`
        + `<label class="search-box" for="fascicle-search">${criarIcone('search', 20)}<input id="fascicle-search" type="search" placeholder="Buscar por tema, dúvida ou palavra-chave" autocomplete="off" aria-label="Buscar fascículos" />`
        + `</label>`
        + `<div class="filter-group" role="group" aria-label="Filtrar por categoria">${filtros}</div>`
        + `</div>`
        + `</div>`
        + `</section>`
        + `<section class="section section--cards">`
        + `<div class="container">`
        + `<p class="result-count" id="result-count">9 fascículos disponíveis</p>`
        + `<div class="card-grid" id="fascicle-grid">${cartoes}</div>`
        + `<p id="empty-results" class="empty-results" hidden>Nenhum fascículo encontrado. Experimente outra palavra ou categoria.</p>`
        + `</div>`
        + `</section>`
        + `</main>`;
}
