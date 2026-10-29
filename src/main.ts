import { criarCabecalho, criarRodape } from './ui/components.js';
import { paginaInicial } from './pages/home.js';
import { paginaFasciculos } from './pages/fascicles.js';
import { paginaFasciculo } from './pages/article.js';
import { paginaFuncionamento } from './pages/technology.js';
import { paginaSobre } from './pages/about.js';
import { paginaReferencias } from './pages/references.js';
import { fasciculos, buscarFasciculo } from './data/fascicles.js';
import { criarIcone } from './lib/icons.js';

const elementoPrincipal = document.getElementById('app');

if (!elementoPrincipal) {
  throw new Error('Elemento principal não encontrado.');
}

const conteudoSite = elementoPrincipal;

function carregarPagina(): void {
  let caminho = window.location.hash || '#/';

  if (!caminho.startsWith('#/')) {
    caminho = '#/';
  }

  caminho = caminho.split('?')[0] || '#/';
  const partesEndereco = caminho.slice(2).split('/');
  const pagina = partesEndereco[0];
  const enderecoFasciculo = partesEndereco[1];
  let conteudo = '';
  let titulo = 'Cartilha de Segurança Digital';

  switch (pagina) {
    case '':
      conteudo = paginaInicial();
      break;
    case 'fasciculos':
      if (enderecoFasciculo) {
        conteudo = paginaFasciculo(enderecoFasciculo);
        const fasciculo = buscarFasciculo(enderecoFasciculo);
        titulo = `${fasciculo?.titulo || 'Fascículo'} | Cartilha`;
      } else {
        conteudo = paginaFasciculos();
        titulo = 'Fascículos | Cartilha';
      }
      break;
    case 'como-funciona':
      conteudo = paginaFuncionamento();
      titulo = 'Como funciona | Cartilha';
      break;
    case 'sobre':
      conteudo = paginaSobre();
      titulo = 'Sobre o projeto | Cartilha';
      break;
    case 'referencias':
      conteudo = paginaReferencias();
      titulo = 'Referências | Cartilha';
      break;
    default:
      conteudo = `<main id="conteudo"><div class="container not-found"><h1>Essa página não foi encontrada.</h1><a class="button button--primary" href="#/">Voltar ao início ${criarIcone('arrow', 17)}</a></div></main>`;
      titulo = 'Página não encontrada | Cartilha';
  }

  conteudoSite.innerHTML = criarCabecalho(caminho) + conteudo + criarRodape();
  document.title = titulo;

  configurarMenu();
  configurarLogotipos();

  if (pagina === 'fasciculos' && !enderecoFasciculo) {
    configurarFiltros();
  }

  if (pagina === 'fasciculos' && enderecoFasciculo) {
    configurarLeitura();
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function configurarMenu(): void {
  const botaoMenu = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const menu = document.getElementById('menu-principal');

  if (!botaoMenu || !menu) {
    return;
  }

  botaoMenu.addEventListener('click', () => {
    const abrirMenu = botaoMenu.getAttribute('aria-expanded') !== 'true';
    botaoMenu.setAttribute('aria-expanded', String(abrirMenu));
    botaoMenu.setAttribute('aria-label', abrirMenu ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', abrirMenu);
  });
}

function configurarLogotipos(): void {
  const logotipoCabecalho = document.querySelector<HTMLImageElement>('.brand__logo');
  const logotipoRodape = document.querySelector<HTMLImageElement>('.footer__logo');

  logotipoCabecalho?.addEventListener('error', () => {
    logotipoCabecalho.hidden = true;
    document.querySelector('.brand__fallback-title')?.classList.add('is-visible');
  });

  logotipoRodape?.addEventListener('error', () => {
    logotipoRodape.hidden = true;
    document.querySelector('.footer__fallback')?.classList.add('is-visible');
  });
}

function normalizarTexto(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
}

function configurarFiltros(): void {
  let categoriaSelecionada = 'Todos';
  const campoBusca = document.querySelector<HTMLInputElement>('#fascicle-search');
  const botoesCategoria = document.querySelectorAll<HTMLButtonElement>('.filter-chip');
  const cartoes = document.querySelectorAll<HTMLElement>('.fascicle-card');
  const contadorResultados = document.getElementById('result-count');
  const mensagemSemResultados = document.getElementById('empty-results');

  function atualizarResultados(): void {
    const busca = normalizarTexto(campoBusca?.value.trim() || '');
    let totalEncontrado = 0;

    for (let indice = 0; indice < cartoes.length; indice++) {
      const cartao = cartoes[indice];
      const fasciculo = fasciculos[indice];

      if (!cartao) {
        continue;
      }

      let mostrarCartao = false;

      if (fasciculo) {
        const correspondeCategoria = categoriaSelecionada === 'Todos' || categoriaSelecionada === fasciculo.categoria;
        const textoFasciculo = `${fasciculo.titulo} ${fasciculo.resumo} ${fasciculo.pergunta} ${fasciculo.categoria}`;
        const correspondeBusca = normalizarTexto(textoFasciculo).includes(busca);
        mostrarCartao = correspondeCategoria && correspondeBusca;
      }

      cartao.hidden = !mostrarCartao;

      if (mostrarCartao) {
        totalEncontrado++;
      }
    }

    if (contadorResultados) {
      const descricao = totalEncontrado === 1 ? 'fascículo encontrado' : 'fascículos encontrados';
      contadorResultados.textContent = `${totalEncontrado} ${descricao}`;
    }

    if (mensagemSemResultados) {
      mensagemSemResultados.hidden = totalEncontrado !== 0;
    }
  }

  campoBusca?.addEventListener('input', atualizarResultados);

  for (const botaoCategoria of botoesCategoria) {
    botaoCategoria.addEventListener('click', () => {
      categoriaSelecionada = botaoCategoria.dataset.filter || 'Todos';

      for (const botao of botoesCategoria) {
        const selecionado = botao === botaoCategoria;
        botao.classList.toggle('is-selected', selecionado);
        botao.setAttribute('aria-pressed', String(selecionado));
      }

      atualizarResultados();
    });
  }
}

function configurarLeitura(): void {
  const atalhos = document.querySelectorAll<HTMLAnchorElement>('.article-sidebar a[href^="#"]:not([href^="#/"])');

  for (const atalho of atalhos) {
    atalho.addEventListener('click', (evento) => {
      evento.preventDefault();
      const secao = document.getElementById(atalho.hash.slice(1));
      secao?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.getElementById('print-page')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('copy-page-link')?.addEventListener('click', copiarEnderecoPagina);
}

async function copiarEnderecoPagina(): Promise<void> {
  const mensagemCopia = document.getElementById('copy-result');

  try {
    await navigator.clipboard.writeText(window.location.href);

    if (mensagemCopia) {
      mensagemCopia.textContent = 'Link copiado.';
    }
  } catch {
    if (mensagemCopia) {
      mensagemCopia.textContent = 'Não foi possível copiar automaticamente. Copie o endereço na barra do navegador.';
    }
  }
}

window.addEventListener('hashchange', carregarPagina);
carregarPagina();
