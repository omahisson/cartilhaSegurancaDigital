import { criarIcone } from '../lib/icons.js';
import { criarCaminhoNavegacao, criarAviso } from '../ui/components.js';
export function paginaFuncionamento(): string {
  const etapas = [
    ['01', 'Logon do Windows', 'O usuário entra no sistema operacional da estação compartilhada.'],
    ['02', 'Tarefa agendada', 'O Agendador de Tarefas inicia a rotina em PowerShell.'],
    ['03', 'Encerramento dos navegadores', 'A rotina encerra os processos Chrome, Edge e Firefox e aguarda confirmação.'],
    ['04', 'Remoção dos perfis', 'O método .NET remove recursivamente os diretórios locais de perfil.'],
    ['05', 'Validação e tentativas', 'O sistema verifica a remoção e pode repetir a operação de forma limitada.'],
    ['06', 'Resultado interno', 'Chrome, Edge e Firefox recebem resultados individuais; o código de saída reflete o sucesso ou a falha.']
  ];
  const resultadosTestes = [['PowerShell', '3.377 ms', 100], ['CMD', '1.994 ms', 59.05], ['.NET', '1.690 ms', 50.04]] as const;
  let listaEtapas = '';
  for (const [numero, tituloEtapa, descricaoEtapa] of etapas) {
    listaEtapas += `<div class="process-step"><span class="process-step__num">${numero}</span>`
      + `<h3>${tituloEtapa}</h3>`
      + `<p>${descricaoEtapa}</p>`
      + `</div>`;
  }
  let barrasComparacao = '';
  for (const [metodo, tempo, porcentagem] of resultadosTestes) {
    let classeMelhorResultado = '';
    if (metodo === '.NET') {
      classeMelhorResultado = 'bar--best';
    }
    barrasComparacao += `<div class="bar-row">`
      + `<div><strong>${metodo}</strong><b>${tempo}</b>`
      + `</div>`
      + `<div class="bar-track"><span style="width:${porcentagem}%" class="${classeMelhorResultado}"></span>`
      + `</div>`
      + `</div>`;
  }
  return `<main id="conteudo">${criarCaminhoNavegacao([{ texto: 'Como funciona' }])}<section class="page-hero page-hero--green">`
    + `<div class="container">`
    + `<div class="eyebrow eyebrow--white">Por trás da proteção</div>`
    + `<h1>Da preocupação à<br/>proteção automatizada.</h1>`
    + `<p>Conheça o que a versão 3.0A realmente faz nos computadores compartilhados e o que os testes demonstraram.</p>`
    + `</div>`
    + `</section>
 <section class="section">`
    + `<div class="container">`
    + `<div class="narrow-intro">`
    + `<div class="eyebrow">A implementação atual</div>`
    + `<h2>O processo começa no logon, não no logoff.</h2>`
    + `<p>A solução usa uma tarefa agendada e orquestração em PowerShell. A exclusão dos diretórios locais de perfil é realizada com <code>System.IO.Directory.Delete()</code>, do .NET, mantendo verificação de resultados e tentativas limitadas.</p>`
    + `</div>`
    + `<div class="process-grid">${listaEtapas}</div>`
    + `<div class="browser-badges"><span>${criarIcone('monitor', 18)} Google Chrome</span><span>${criarIcone('monitor', 18)} Microsoft Edge</span><span>${criarIcone('monitor', 18)} Mozilla Firefox</span>`
    + `</div>`
    + `</div>`
    + `</section>
 <section class="section section--light">`
    + `<div class="container two-col">`
    + `<div>`
    + `<div class="eyebrow">Evolução documentada</div>`
    + `<h2>O projeto evoluiu porque os testes mostraram onde melhorar.</h2>`
    + `<p>Da primeira rotina à versão atual, cada etapa trouxe mais controle sobre o resultado da limpeza.</p>`
    + `<div class="version-timeline">`
    + `<div><b>1.0</b><span>Agosto de 2026</span>`
    + `<p>Limpeza automática inicial dos perfis no logon.</p>`
    + `</div>`
    + `<div><b>2.0</b><span>Setembro de 2026</span>`
    + `<p>Diagnóstico por etapa, timeout, retry e verificação.</p>`
    + `</div>`
    + `<div><b>3.0</b><span>Setembro de 2026</span>`
    + `<p>Investigação dos métodos de remoção.</p>`
    + `</div>`
    + `<div><b>3.0A</b><span>Outubro de 2026</span>`
    + `<p>Seleção do método .NET após comparação experimental.</p>`
    + `</div>`
    + `</div>`
    + `</div>`
    + `<div class="benchmark">`
    + `<div class="eyebrow">Benchmark comparativo · 06/10/2026</div>`
    + `<h3>Tempo total observado</h3>`
    + `<div class="bars">${barrasComparacao}</div>`
    + `<p class="benchmark-footnote">Comparação exploratória em três computadores distintos, cada um com um método.</p>`
    + `</div>`
    + `</div>`
    + `</section>
 <section class="section">`
    + `<div class="container">`
    + `<div class="eyebrow">Escopo e transparência</div>`
    + `<h2>O que a solução faz. E o que ela não faz.</h2>`
    + `<div class="scope-grid">`
    + `<div class="scope-panel scope-panel--yes">`
    + `<h3>${criarIcone('check', 23)} Dentro do escopo</h3>`
    + `<ul>`
    + `<li>Sanitização de perfis locais de Chrome, Edge e Firefox.</li>`
    + `<li>Execução automática durante o logon do Windows.</li>`
    + `<li>Verificação de remoção e diagnóstico, quando habilitado.</li>`
    + `<li>Operação normal sem exigir privilégios administrativos.</li>`
    + `</ul>`
    + `</div>`
    + `<div class="scope-panel scope-panel--no">`
    + `<h3>${criarIcone('info', 23)} Fora do escopo</h3>`
    + `<ul>`
    + `<li>Arquivos baixados em Downloads, Documentos ou Área de Trabalho.</li>`
    + `<li>Dados mantidos em servidores e serviços em nuvem.</li>`
    + `<li>Revogação garantida de sessões remotas.</li>`
    + `<li>Hardening abrangente de firewall, antivírus ou políticas globais.</li>`
    + `<li>Compatibilidade com Windows 7.</li>`
    + `</ul>`
    + `</div>`
    + `</div>${criarAviso('warning', 'Uma proteção verificável não é infalível', 'A remoção pode falhar em situações específicas. A janela do PowerShell ainda pode aparecer brevemente e a confiabilidade fora dos cenários testados requer validação adicional.')}</div>`
    + `</section>
 </main>`;
}
