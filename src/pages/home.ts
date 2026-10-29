import { criarIcone } from '../lib/icons.js';
import { fasciculos } from '../data/fascicles.js';
import { criarBotao, criarCartaoFasciculo, criarAviso, criarTituloSecao } from '../ui/components.js';
export function paginaInicial(): string {
  const indicesDestaque = [1, 2, 4, 8];
  let cartoesDestaque = '';
  for (const indice of indicesDestaque) {
    const fasciculo = fasciculos[indice];
    if (fasciculo) {
      cartoesDestaque += criarCartaoFasciculo(fasciculo);
    }
  }
  return `<main id="conteudo">
  <section class="hero">`
    + `<div class="hero__pattern" aria-hidden="true">`
    + `</div>`
    + `<div class="container hero__grid">
   <div class="hero__copy">
    <h1>Você saiu do computador.<br/><em>Seus dados também?</em>`
    + `</h1>
    <p>Em um laboratório, muita gente usa a mesma máquina. Descubra quais informações podem permanecer depois da sua navegação e como se proteger.</p>
    <div class="hero__actions">${criarBotao('#/fasciculos', 'Explore os fascículos')}${criarBotao('#/como-funciona', 'Conheça o projeto', 'secondary')}</div>
   </div>
   <div class="hero-art" aria-label="Ilustração de um computador com dados do navegador e uma pasta Downloads que exige atenção" role="img">
     <div class="art-halo">`
    + `</div>`
    + `<div class="art-dots" aria-hidden="true">`
    + `</div>
     <div class="art-window">`
    + `<div class="art-window__chrome"><i></i><i></i><i></i><span>computador compartilhado</span><span class="art-window__shield">${criarIcone('shield', 16)}</span>`
    + `</div>
      <div class="art-window__body">`
    + `<div class="art-avatar">${criarIcone('monitor', 31)}</div>`
    + `<div class="art-window__title">Você encerrou a navegação.</div>`
    + `<p>Mas o que ficou por aqui?</p>`
    + `<div class="art-chip"><span>${criarIcone('cookie', 18)}</span> Cookies e sessões <b>?</b>`
    + `</div>`
    + `<div class="art-chip"><span>${criarIcone('clock', 18)}</span> Histórico e cache <b>?</b>`
    + `</div>`
    + `<div class="art-chip art-chip--red"><span>${criarIcone('download', 18)}</span> Arquivos baixados <b>!</b>`
    + `</div>`
    + `</div>
     </div>`
    + `<div class="art-floating art-floating--bottom">${criarIcone('info', 19)} Downloads não são apagados</div>
   </div>
  </div>`
    + `</section>
  <div class="soft-band">`
    + `<div class="container soft-band__grid">`
    + `<div><span class="soft-band__icon">${criarIcone('monitor', 23)}</span><span><b>Ambientes coletivos</b><small>Um computador, muitos usuários</small></span>`
    + `</div>`
    + `<div><span class="soft-band__icon">${criarIcone('cookie', 23)}</span><span><b>Dados que persistem</b><small>Cookies, histórico e sessões</small></span>`
    + `</div>`
    + `<div><span class="soft-band__icon">${criarIcone('shield', 23)}</span><span><b>Proteção complementar</b><small>Tecnologia e hábitos seguros</small></span>`
    + `</div>`
    + `</div>`
    + `</div>
  <section class="section story-section">`
    + `<div class="container story-grid">`
    + `<div>`
    + `<div class="eyebrow">01 · O problema</div>`
    + `<h2>O próximo usuário não deveria encontrar vestígios do anterior.</h2>`
    + `<p>Uma estudante consulta o e-mail, acessa o sistema acadêmico e baixa um documento. Ao terminar, fecha o navegador. Parece o fim da história. <strong>Nem sempre é.</strong>`
    + `</p>`
    + `<p>Dados podem continuar armazenados no perfil do navegador. E um PDF baixado continuará no computador até que alguém o remova.</p>${criarBotao('#/fasciculos/computadores-compartilhados', 'Entenda esse risco', 'secondary')}</div>
  <div class="story-steps">`
    + `<div class="story-step"><span>01</span>`
    + `<div>`
    + `<h3>Uma pessoa utiliza</h3>`
    + `<p>Contas, sites, arquivos e plataformas acadêmicas.</p>`
    + `</div>${criarIcone('monitor', 23)}</div>`
    + `<div class="story-step"><span>02</span>`
    + `<div>`
    + `<h3>A navegação termina</h3>`
    + `<p>Fechar o navegador pode deixar dados locais persistentes.</p>`
    + `</div>${criarIcone('door', 23)}</div>`
    + `<div class="story-step story-step--accent"><span>03</span>`
    + `<div>`
    + `<h3>Outra pessoa chega</h3>`
    + `<p>Informações esquecidas podem continuar acessíveis.</p>`
    + `</div>${criarIcone('info', 23)}</div>`
    + `</div>`
    + `</div>`
    + `</section>
  <section class="section section--light" id="fasciculos-destaque">`
    + `<div class="container">${criarTituloSecao('02 · Aprenda no seu ritmo', 'Uma dica por vez, sem complicação.', undefined, `<a class="text-link" href="#/fasciculos">Ver todos os fascículos ${criarIcone('arrow', 18)}</a>`)}<div class="card-grid">${cartoesDestaque}</div>`
    + `</div>`
    + `</section>
  <section class="section">`
    + `<div class="container">`
    + `<div class="split-head">`
    + `<div class="eyebrow">03 · A solução desenvolvida</div>`
    + `<h2>O software ajuda.<br/><span>O cuidado continua sendo seu.</span>`
    + `</h2>`
    + `<p>No IF Sudeste MG, uma rotina foi desenvolvida para reduzir a persistência de dados locais dos navegadores em computadores compartilhados. Na versão atual, a execução acontece no logon do Windows.</p>`
    + `</div>`
    + `<div class="capability-grid">`
    + `<div><span class="capability-icon">${criarIcone('refresh', 25)}</span>`
    + `<h3>Automatiza</h3>`
    + `<p>A tarefa agendada inicia a sanitização de Chrome, Edge e Firefox durante o logon.</p>`
    + `</div>`
    + `<div><span class="capability-icon">${criarIcone('check', 25)}</span>`
    + `<h3>Verifica</h3>`
    + `<p>A rotina confere se os perfis foram removidos e identifica possíveis falhas.</p>`
    + `</div>`
    + `<div><span class="capability-icon capability-icon--red">${criarIcone('download', 25)}</span>`
    + `<h3>Tem limites claros</h3>`
    + `<p>Downloads, Documentos, Área de Trabalho e dados em nuvem não são eliminados pela solução.</p>`
    + `</div>`
    + `</div>
  <div class="home-technical-link">${criarBotao('#/como-funciona', 'Veja como funciona')}<span>Versão documentada: <strong>3.0A</strong></span>`
    + `</div>`
    + `</div>`
    + `</section>
  <section class="section final-call">`
    + `<div class="container final-call__grid">`
    + `<div>`
    + `<div class="eyebrow eyebrow--white">04 · Antes de sair</div>`
    + `<h2>Trinta segundos de atenção podem proteger suas informações.</h2>`
    + `<p>Não dependa apenas da limpeza automática. Faça logout, cuide das suas senhas e confira os arquivos que ficaram no computador.</p>${criarBotao('#/fasciculos/checklist-de-saida', 'Confira o checklist', 'secondary')}</div>`
    + `<div class="final-checks"><span>${criarIcone('check', 20)} Sair das contas</span><span>${criarIcone('check', 20)} Não salvar senhas</span><span>${criarIcone('check', 20)} Conferir Downloads</span>`
    + `</div>`
    + `</div>`
    + `</section>
  <section class="container home-last-note">${criarAviso('info', 'Um projeto de extensão para além do laboratório', 'O conteúdo é público e busca ajudar alunos, professores e outras instituições a compreender riscos e adotar práticas seguras em computadores compartilhados.')} </section>
 </main>`;
}
