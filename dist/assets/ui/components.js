import { criarIcone } from '../lib/icons.js';
const enderecoLogotipo = 'https://www.ifsudestemg.edu.br/comunicacao-social/logos/logomarcas/if-sudeste-mg/logo_horizontal_ifsudestemg%281%29.png';
export function criarCabecalho(caminhoAtual) {
    const itensMenu = [['#/', 'Início'], ['#/fasciculos', 'Fascículos'], ['#/como-funciona', 'Como funciona'], ['#/sobre', 'Sobre'], ['#/referencias', 'Referências']];
    let navegacao = '';
    for (const [endereco, texto] of itensMenu) {
        const paginaSelecionada = caminhoAtual === endereco;
        const lendoFasciculo = caminhoAtual.startsWith('#/fasciculos/') && endereco === '#/fasciculos';
        let classeSelecionada = '';
        let atributoPaginaAtual = '';
        if (paginaSelecionada || lendoFasciculo) {
            classeSelecionada = ' is-active';
        }
        if (paginaSelecionada) {
            atributoPaginaAtual = 'aria-current="page"';
        }
        navegacao += `<a href="${endereco}" class="site-nav__link${classeSelecionada}" ${atributoPaginaAtual}>${texto}</a>`;
    }
    return `<header class="site-header" id="topo">`
        + `<div class="container header-layout">
  <a href="#/" class="brand" aria-label="Cartilha de Segurança Digital, ir para início"><img class="brand__logo" src="${enderecoLogotipo}" alt="IF Sudeste MG" /><span class="brand__fallback-title">IF Sudeste MG</span><span class="brand__text"><strong>Cartilha de segurança digital</strong><small>Computadores compartilhados</small></span></a>
  <button class="menu-toggle" type="button" aria-controls="menu-principal" aria-expanded="false" aria-label="Abrir menu">${criarIcone('menu', 24)}</button>
  <nav id="menu-principal" class="site-nav" aria-label="Navegação principal">${navegacao}<a class="site-nav__cta" href="#/fasciculos">Comece a ler ${criarIcone('arrow', 16)}</a>`
        + `</nav>
 </div>`
        + `</header>`;
}
export function criarRodape() {
    return `<footer class="footer">`
        + `<div class="container footer__main">`
        + `<div class="footer__identity">
 <img src="${enderecoLogotipo}" alt="Instituto Federal do Sudeste de Minas Gerais" class="footer__logo" loading="lazy" />
 <p class="footer__fallback">IF Sudeste MG<br/><small>Campus Juiz de Fora</small>`
        + `</p>
 <p>Educação digital para que mais pessoas usem computadores compartilhados com consciência e segurança.</p>
 </div>`
        + `<div>`
        + `<h3>Explore</h3><a href="#/fasciculos">Todos os fascículos</a><a href="#/como-funciona">A solução atual</a><a href="#/sobre">Sobre o projeto</a>`
        + `</div>`
        + `<div>`
        + `<h3>Conhecimento público</h3><a href="#/referencias">Fontes e referências</a><a href="https://www.ifsudestemg.edu.br/" target="_blank" rel="noopener noreferrer">IF Sudeste MG ${criarIcone('external', 13)}</a>`
        + `</div>`
        + `</div>
 <div class="container footer__bottom"><span>© 2026 · Projeto de Extensão · IF Sudeste MG · Campus Juiz de Fora</span>`
        + `</div>`
        + `</footer>`;
}
export function criarCaminhoNavegacao(itens) {
    let caminhoNavegacao = '';
    for (const item of itens) {
        caminhoNavegacao += '<span aria-hidden="true">/</span>';
        if (item.endereco) {
            caminhoNavegacao += `<a href="${item.endereco}">${item.texto}</a>`;
        }
        else {
            caminhoNavegacao += `<span aria-current="page">${item.texto}</span>`;
        }
    }
    return `<nav class="breadcrumb container" aria-label="Você está aqui"><a href="#/">Início</a>${caminhoNavegacao}</nav>`;
}
export function criarTituloSecao(subtitulo, titulo, descricao, acao) {
    return `<div class="section-heading">`
        + `<div>`
        + `<div class="eyebrow">${subtitulo}</div>`
        + `<h2>${titulo}</h2>${descricao ? `<p>${descricao}</p>` : ''}</div>${acao ?? ''}</div>`;
}
export function criarCartaoFasciculo(fasciculo) {
    return `<a class="fascicle-card" href="#/fasciculos/${fasciculo.endereco}" data-category="${fasciculo.categoria}" aria-label="Ler fascículo ${fasciculo.numero}: ${fasciculo.titulo}">`
        + `<div class="fascicle-card__top"><span class="fascicle-card__icon">${criarIcone(fasciculo.icone, 25)}</span><span class="fascicle-card__number">${fasciculo.numero} / 09</span>`
        + `</div><span class="tag tag--quiet">${fasciculo.categoria}</span>`
        + `<h3>${fasciculo.titulo}</h3>`
        + `<p>${fasciculo.resumo}</p>`
        + `<div class="fascicle-card__bottom"><span>${criarIcone('clock', 15)} ${fasciculo.tempoLeitura} de leitura</span><span class="card-arrow">${criarIcone('arrow', 19)}</span>`
        + `</div></a>`;
}
export function criarBotao(endereco, texto, estilo = 'primary') {
    return `<a href="${endereco}" class="button button--${estilo}">${texto} ${criarIcone('arrow', 18)}</a>`;
}
export function criarAviso(tipo, titulo, mensagem) {
    return `<aside class="notice notice--${tipo}" aria-label="${titulo}"><span class="notice__icon">${criarIcone(tipo === 'warning' ? 'info' : 'shield', 20)}</span>`
        + `<div>`
        + `<h3>${titulo}</h3>`
        + `<p>${mensagem}</p>`
        + `</div>`
        + `</aside>`;
}
