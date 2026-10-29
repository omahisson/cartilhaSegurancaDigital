import type { Fasciculo } from '../types.js';

export const fasciculos: Fasciculo[] = [
  {
    endereco: "computadores-compartilhados",
    numero: "01",
    categoria: "Comece aqui",
    icone: "monitor",
    tempoLeitura: "3 min",
    titulo: "Um computador, muitas pessoas",
    resumo: "Entenda por que um laboratório exige cuidados diferentes de um computador pessoal.",
    pergunta: "Você usaria uma conta pessoal em uma máquina que outra pessoa utilizará daqui a poucos minutos?",
    tituloContexto: "O que muda quando o computador é compartilhado?",
    contexto: [
      "Em laboratórios, diferentes estudantes e professores utilizam a mesma estação ao longo do dia. Cada pessoa acessa seus próprios sites, plataformas e serviços.",
      "Parte dessas interações pode deixar dados no navegador, inclusive depois que uma janela é fechada. Isso pode facilitar acessos indevidos por quem utilizar a máquina depois."
    ],
    tituloAcoes: "Hábitos que ajudam",
    acoes: [
      "Use somente os serviços necessários e evite armazenar informações pessoais no computador.",
      "Encerre suas sessões em sites acadêmicos, e-mails e demais serviços antes de sair.",
      "Verifique se deixou arquivos pessoais nas pastas do Windows."
    ],
    tituloProjeto: "Onde o projeto entra",
    projeto: "A solução desenvolvida no IF Sudeste MG foi criada para reduzir a permanência de dados locais de navegadores entre os usos de computadores compartilhados. Na versão 3.0A, ela executa a limpeza automaticamente durante o logon do Windows.",
    tituloAviso: "Lembre-se",
    aviso: "Um computador compartilhado precisa tanto de medidas técnicas quanto de hábitos seguros. Nenhum mecanismo isolado elimina todos os riscos.",
    mensagemFinal: "Ao dividir um computador, você também divide a responsabilidade de não deixar dados para trás."
  },
  {
    endereco: "cookies-e-sessoes",
    numero: "02",
    categoria: "Comece aqui",
    icone: "cookie",
    tempoLeitura: "4 min",
    titulo: "O que o navegador guarda?",
    resumo: "Cookies, histórico, cache e outros dados podem sobreviver ao fechamento da janela.",
    pergunta: "Se o navegador foi fechado, por que um site pode continuar reconhecendo quem entrou?",
    tituloContexto: "A diferença entre fechar e limpar",
    contexto: [
      "Navegadores armazenam informações localmente para manter preferências, acelerar páginas e facilitar o acesso a serviços. Cookies, dados de sites e outros artefatos podem permanecer no perfil após o navegador ser fechado.",
      "Alguns desses dados podem participar da manutenção de uma sessão autenticada. Por isso, fechar a janela não significa necessariamente encerrar a autenticação no serviço."
    ],
    tituloAcoes: "O que fazer",
    acoes: [
      "Saia da conta pelo próprio site, quando houver a opção de encerrar a sessão.",
      "Evite a opção “manter conectado” em computadores coletivos.",
      "Não confunda histórico de downloads com os arquivos baixados de verdade."
    ],
    tituloProjeto: "O que a solução remove",
    projeto: "O mecanismo de sanitização remove diretórios locais de perfil dos navegadores contemplados. Isso alcança informações persistidas nesses perfis, como dados de navegação e autenticação locais.",
    tituloAviso: "Uma distinção importante",
    aviso: "Remover dados locais não significa invalidar sessões no servidor, apagar arquivos armazenados em nuvem ou revogar o acesso de outros dispositivos.",
    mensagemFinal: "Fechar uma janela é diferente de encerrar a sessão e de limpar dados persistentes."
  },
  {
    endereco: "encerre-suas-sessoes",
    numero: "03",
    categoria: "Seus hábitos",
    icone: "door",
    tempoLeitura: "3 min",
    titulo: "Saia da conta antes de sair da sala",
    resumo: "O botão “Sair” ainda é um dos aliados mais simples da sua privacidade.",
    pergunta: "Você fechou a aba do e-mail. A conta foi realmente desconectada?",
    tituloContexto: "Uma ação pequena com impacto real",
    contexto: [
      "Sites podem manter a autenticação ativa por meio de cookies ou tokens. Dependendo da aplicação, fechar o navegador não revoga a sessão.",
      "Usar a opção de sair do próprio serviço é uma maneira importante de reduzir a chance de reutilização indevida da sessão."
    ],
    tituloAcoes: "Antes de deixar o computador",
    acoes: [
      "Faça logout nos e-mails, sistemas acadêmicos e demais plataformas utilizadas.",
      "Feche os navegadores somente depois de concluir as tarefas e salvar seus trabalhos necessários.",
      "Se suspeitar que deixou uma sessão aberta, acesse o serviço de outro dispositivo e procure a opção de encerrar outras sessões, quando disponível."
    ],
    tituloProjeto: "Como a automação complementa isso",
    projeto: "No próximo logon do Windows, quando a tarefa agendada é disparada, o software tenta encerrar navegadores e remover seus perfis locais. Trata-se de uma proteção complementar, não de um substituto para o logout.",
    tituloAviso: "Atenção ao momento da execução",
    aviso: "A implementação atual é acionada no logon, e não imediatamente ao fechar a janela, fazer logoff ou reiniciar. Não presuma que a máquina foi sanitizada antes de um novo logon.",
    mensagemFinal: "Encerre suas sessões conscientemente. A automação reduz um risco adicional, mas não substitui esse cuidado."
  },
  {
    endereco: "senhas-salvas",
    numero: "04",
    categoria: "Seus hábitos",
    icone: "key",
    tempoLeitura: "3 min",
    titulo: "Não deixe suas senhas salvas",
    resumo: "Facilidade para entrar também pode significar facilidade para outra pessoa entrar.",
    pergunta: "Salvar a senha parece prático. Mas para quem será prático na próxima aula?",
    tituloContexto: "O risco do preenchimento automático",
    contexto: [
      "Navegadores podem armazenar credenciais e sugerir logins em visitas futuras. Em um computador coletivo, essa conveniência pode expor informações pessoais se o perfil for reutilizado.",
      "Mesmo que a limpeza local seja automatizada, é mais seguro evitar que a credencial seja salva nesse ambiente."
    ],
    tituloAcoes: "Práticas recomendadas",
    acoes: [
      "Recuse a oferta de salvar senhas no navegador de um laboratório.",
      "Não habilite a sincronização de informações pessoais com um perfil de navegador compartilhado.",
      "Ative autenticação em duas etapas nos serviços que oferecem essa proteção."
    ],
    tituloProjeto: "Proteção automatizada",
    projeto: "A remoção dos diretórios de perfil pode eliminar credenciais armazenadas localmente nesses diretórios. A solução documentada, porém, não configura políticas globais do Windows ou dos navegadores para impedir o salvamento de senhas.",
    tituloAviso: "Não se apoie só na limpeza",
    aviso: "Dados sincronizados com a nuvem ou armazenados fora dos perfis cobertos não são eliminados por essa rotina.",
    mensagemFinal: "No computador compartilhado, use a senha. Não a deixe guardada."
  },
  {
    endereco: "arquivos-baixados",
    numero: "05",
    categoria: "Seus hábitos",
    icone: "download",
    tempoLeitura: "3 min",
    titulo: "Downloads não desaparecem",
    resumo: "A limpeza do navegador não apaga o PDF, a foto ou o trabalho que você salvou no Windows.",
    pergunta: "Você baixou seu histórico escolar em PDF. Ele ainda está no computador?",
    tituloContexto: "A diferença entre o histórico e o arquivo",
    contexto: [
      "O navegador pode registrar que um arquivo foi baixado. Esse registro faz parte dos dados do navegador. Mas o arquivo salvo em Downloads, Documentos ou Área de Trabalho existe fora do perfil que o projeto remove.",
      "Por isso, apagar os dados de navegação não implica apagar documentos, imagens, planilhas ou PDFs baixados no computador."
    ],
    tituloAcoes: "Cuidados com seus arquivos",
    acoes: [
      "Antes de sair, abra a pasta Downloads e confira se salvou documentos pessoais.",
      "Remova seus próprios arquivos que não devem permanecer na máquina.",
      "Quando precisar conservar um documento, guarde-o em um destino pessoal seguro e confirme que a cópia não ficou esquecida no computador."
    ],
    tituloProjeto: "Limite explícito da versão 3.0A",
    projeto: "A rotina remove os perfis locais do Google Chrome, Microsoft Edge e Mozilla Firefox. Ela não limpa pastas de arquivos pessoais do Windows, como Downloads, Documentos e Área de Trabalho.",
    tituloAviso: "Não confunda duas operações",
    aviso: "Limpeza de navegação ≠ limpeza completa do computador. A proteção dos seus arquivos baixados também depende de você.",
    mensagemFinal: "Antes de sair do laboratório, olhe a pasta Downloads. O que ficou ali pode continuar acessível."
  },
  {
    endereco: "sincronizacao-na-nuvem",
    numero: "06",
    categoria: "Seus hábitos",
    icone: "cloud",
    tempoLeitura: "3 min",
    titulo: "Seus dados podem estar na nuvem",
    resumo: "Limpeza local não equivale a apagar dados sincronizados ou encerrar sessões remotas.",
    pergunta: "Se os dados sumiram deste computador, desapareceram também da sua conta?",
    tituloContexto: "Onde a informação realmente está?",
    contexto: [
      "Serviços de e-mail, armazenamento e navegadores podem guardar informações em servidores externos. Isso permite acessar os mesmos dados em outros dispositivos.",
      "A sanitização dos arquivos locais é útil, mas não alcança por si só o que continua armazenado ou autenticado em serviços remotos."
    ],
    tituloAcoes: "O que fazer",
    acoes: [
      "Evite ativar sincronização pessoal no navegador do laboratório.",
      "Saia da conta nos serviços utilizados e, se necessário, revise as sessões ativas nas configurações de segurança da conta.",
      "Não presuma que a remoção do perfil local apaga arquivos da sua nuvem."
    ],
    tituloProjeto: "Escopo real do software",
    projeto: "O software opera no contexto do usuário do Windows e exclui dados dos diretórios locais de perfil dos navegadores. Ele não elimina informações armazenadas em serviços externos ou sincronizados.",
    tituloAviso: "Um cuidado extra",
    aviso: "Sair da conta e revogar sessões em um serviço são operações controladas pelo próprio serviço; a rotina de sanitização local não garante essas operações.",
    mensagemFinal: "Privacidade exige entender a diferença entre o que está no computador e o que está na sua conta online."
  },
  {
    endereco: "protecao-automatica",
    numero: "07",
    categoria: "A proteção",
    icone: "refresh",
    tempoLeitura: "4 min",
    titulo: "Como a limpeza automática funciona?",
    resumo: "Conheça o fluxo real de sanitização da versão 3.0A no logon do Windows.",
    pergunta: "Como uma máquina compartilhada pode começar uma nova sessão com menos dados deixados no navegador?",
    tituloContexto: "Uma rotina planejada para o logon",
    contexto: [
      "Quando o usuário realiza logon no Windows, uma tarefa do Agendador de Tarefas inicia a orquestração em PowerShell. A rotina busca encerrar os processos dos navegadores contemplados, remove os diretórios locais de perfil e verifica o resultado.",
      "O método de exclusão adotado na versão 3.0A usa System.IO.Directory.Delete() do .NET. O fluxo mantém timeout, tentativas limitadas e diagnóstico quando habilitado."
    ],
    tituloAcoes: "O que o usuário precisa saber",
    acoes: [
      "A limpeza não depende de clicar manualmente em um botão durante o uso comum.",
      "Se você mantiver algo importante somente no perfil do navegador, ele poderá ser removido pela rotina.",
      "Salve trabalhos antes de encerrar a sessão e evite depender de dados locais do navegador."
    ],
    tituloProjeto: "O que é verificado",
    projeto: "A solução verifica a remoção dos diretórios e mantém resultados independentes para Chrome, Edge e Firefox. O código de saída interno distingue sucesso de falha; não há garantia absoluta de sucesso em todo ambiente.",
    tituloAviso: "Limite operacional",
    aviso: "A rotina foi projetada para operar em computadores compartilhados no contexto do usuário, sem privilégios administrativos na operação normal. Windows 7 não é suportado.",
    mensagemFinal: "A rotina não apenas tenta limpar: ela verifica o resultado e registra falhas conforme o modo de execução."
  },
  {
    endereco: "limites-da-protecao",
    numero: "08",
    categoria: "A proteção",
    icone: "shield",
    tempoLeitura: "4 min",
    titulo: "O que essa proteção não resolve?",
    resumo: "Conhecer as fronteiras de uma solução faz parte de usá-la com segurança.",
    pergunta: "Uma rotina automática pode substituir todos os cuidados de quem usa o computador?",
    tituloContexto: "Segurança não é uma promessa absoluta",
    contexto: [
      "A sanitização local de perfis reduz a persistência de dados de navegação, mas não transforma uma estação compartilhada em ambiente livre de riscos.",
      "A implementação atual trata especificamente os perfis dos três navegadores contemplados. Outros aplicativos, arquivos externos, dados de nuvem e estados remotos não estão cobertos por essa rotina."
    ],
    tituloAcoes: "O que continua sendo necessário",
    acoes: [
      "Encerrar sessões em cada serviço e não salvar credenciais.",
      "Cuidar de arquivos baixados e de outros dados fora do navegador.",
      "Manter hábitos seguros e seguir as orientações da instituição."
    ],
    tituloProjeto: "Limitações documentadas",
    projeto: "Windows 7 não é suportado. A janela do PowerShell pode aparecer brevemente no logon. O desempenho e a confiabilidade fora dos cenários testados ainda requerem validação adicional.",
    tituloAviso: "Uma limitação que merece destaque",
    aviso: "A execução ocorre no logon e pode encerrar navegadores e excluir preferências, extensões ou outros dados salvos localmente nos perfis.",
    mensagemFinal: "Uma solução confiável explica tanto o que entrega quanto o que permanece fora do seu alcance."
  },
  {
    endereco: "checklist-de-saida",
    numero: "09",
    categoria: "Seus hábitos",
    icone: "check",
    tempoLeitura: "2 min",
    titulo: "Antes de sair, confira",
    resumo: "Um pequeno checklist para transformar informação em cuidado diário.",
    pergunta: "Faltam trinta segundos para sair da sala. O que você não deveria esquecer?",
    tituloContexto: "Três cuidados antes de levantar",
    contexto: [
      "Uma boa prática é simples o bastante para caber na rotina. O objetivo não é decorar termos técnicos, mas impedir que a próxima pessoa encontre informações que deveriam permanecer privadas."
    ],
    tituloAcoes: "Seu checklist",
    acoes: [
      "Saí das minhas contas em sistemas acadêmicos, e-mails e outros serviços.",
      "Não deixei senhas salvas, sincronizações pessoais ou dados importantes no navegador.",
      "Verifiquei Downloads, Documentos e Área de Trabalho para não esquecer arquivos pessoais."
    ],
    tituloProjeto: "O papel do projeto",
    projeto: "A automação atua sobre os perfis locais dos navegadores durante o logon do Windows, ajudando a reduzir a persistência de dados entre usuários. As ações deste checklist continuam sendo importantes.",
    tituloAviso: "Lembrete final",
    aviso: "A limpeza automática não substitui logout nem apaga os arquivos baixados. Segurança funciona melhor quando tecnologia e pessoas atuam juntas.",
    mensagemFinal: "A sua parte começa antes de sair. A tecnologia entra como proteção complementar."
  }
];

export const categorias = ["Todos", "Comece aqui", "Seus hábitos", "A proteção"] as const;

export function buscarFasciculo(endereco: string): Fasciculo | undefined {
  for (const fasciculo of fasciculos) {
    if (fasciculo.endereco === endereco) {
      return fasciculo;
    }
  }

  return undefined;
}
