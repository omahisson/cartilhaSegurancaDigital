# Você saiu do computador. Seus dados também?

Site público da Cartilha de Segurança Digital do projeto de extensão **Hardening e Proteção de Sessões em Computadores Compartilhados no IF Sudeste MG, Campus Juiz de Fora**.

**Status:** primeira versão para revisão editorial, ainda não publicada oficialmente.

## O que está incluído

- Início com narrativa curta, explicação dos riscos e chamadas para leitura;
- nove fascículos independentes, com busca por texto e filtros por assunto;
- página "Como funciona" com o fluxo da implementação **3.0A** e resultado do benchmark, incluindo ressalvas metodológicas;
- página "Sobre" com contexto extensionista, autoria e orientadores;
- página "Referências" com fontes documentais e institucionais;
- versão responsiva, navegação via teclado, impressão dos fascículos e opção de copiar link;
- indicação explícita de que **arquivos baixados em Downloads, Documentos ou Área de Trabalho não são excluídos pela solução**.

## Como executar no Windows (CMD, PowerShell ou terminal da IDE)

Abra a pasta `cartilha-seguranca-digital` no VS Code ou VSCodium (menu **Arquivo → Abrir Pasta**). No terminal integrado:

```bat
npm install
npm run dev
```

Acesse **http://localhost:4173/** no navegador. Durante o desenvolvimento, alterações nos módulos TypeScript são compiladas automaticamente, e alterações de CSS/HTML são copiadas; **atualize a página** no navegador para conferir as mudanças.

Se quiser apenas abrir o site (com build de produção), use `npm start`.

## Como visualizar no Linux com interface gráfica

Caso tenha também `cartilha-previa-offline.html`, abra-o pelo gerenciador de arquivos com duplo clique. O arquivo é uma prévia autônoma, sem instalar nada.

Para trabalhar no código-fonte, abra esta pasta pelo menu **Arquivo → Abrir Pasta** do VS Code, VSCodium ou outra IDE gráfica. No terminal integrado, execute `npm install` e `npm run dev`.

A pasta `dist/` contém a versão compilada para uma futura hospedagem estática. **Não é necessário Python** para visualizar o projeto localmente.

## Arquitetura

Site estático feito com **TypeScript, HTML e CSS**, sem backend, sem banco de dados e sem dependências JavaScript de execução. Não há coleta de dados dos leitores, cookies de rastreamento ou analytics no código entregue.

Os nomes das funções, variáveis e campos dos dados estão em português. O arquivo `src/main.ts` cuida da navegação, do menu, da busca e das ações de leitura. Cada arquivo de `src/pages/` monta uma página, e `src/ui/components.ts` reúne os elementos usados em mais de uma tela.

Para alterar os textos dos fascículos e das referências, edite os arquivos de `src/data/`. Para alterar o visual, edite `src/styles/`. A pasta `dist/` é gerada pelo comando `npm run build`.

```text
cartilha-seguranca-digital/
├── public/                  HTML de entrada, favicon e robots.txt
├── src/
│   ├── data/                Fascículos, créditos e referências
│   ├── lib/                 Ícones SVG reutilizáveis
│   ├── pages/               Início, fascículos, leitura, arquitetura, sobre e referências
│   ├── ui/                  Cabeçalho, rodapé, cards, notas e botões
│   ├── styles/              Tokens, layout, componentes e estilos de páginas
│   ├── main.ts              Navegação, busca, filtros e ações acessíveis
│   └── types.ts             Contratos e tipagem
├── scripts/                 Build e geração da prévia offline
├── dist/                    Arquivos estáticos compilados
└── package.json
```

### Comandos

- `npm run dev`: inicia o servidor local na porta 4173 e observa alterações de TypeScript, HTML e CSS (recarregamento manual do navegador);
- `npm start`: compila e inicia o servidor local sem modo de observação;
- `npm run build`: compila o TypeScript e copia arquivos estáticos para `dist/`;
- `npm run check`: valida o TypeScript em modo estrito;
- `npm run serve`: serve a versão já compilada de `dist/` usando Node.js;
- `node scripts/offline-preview.mjs`: cria `../cartilha-previa-offline.html` após o build.

A navegação usa fragmentos `#/...`, de modo que funciona em hospedagens estáticas sem regras de reescrita de URL.

## Fidelidade ao projeto

- Implementação **atual** descrita: sanitização dos perfis locais de Chrome, Edge e Firefox, **disparada no logon** do Windows, com orquestração PowerShell e remoção via .NET;
- implementação descrita na arquitetura de outubro de 2026, distinta de elementos planejados na proposta original (como logoff/reinício);
- a solução não elimina Downloads, Documentos, Área de Trabalho, nem dados armazenados em serviços remotos;
- Windows 7 é uma limitação conhecida; execução totalmente invisível não é garantida;
- benchmark .NET 1.690ms, CMD 1.994ms, PowerShell 3.377ms; três máquinas diferentes, portanto não se pode atribuir todo o ganho somente à técnica de exclusão.

## Marca institucional

A paleta visual é baseada no verde, vermelho e branco da identidade dos Institutos Federais. A logomarca horizontal colorida é referenciada a partir do portal oficial do IF Sudeste MG:

https://www.ifsudestemg.edu.br/comunicacao-social/logos/logomarcas/if-sudeste-mg/logo_horizontal_ifsudestemg%281%29.png/view

O arquivo original não está incluído nesta entrega; o site faz referência ao endereço público (e exibe uma alternativa textual caso não carregue). **Antes de publicar**, obtenha o arquivo oficial, substitua a referência remota por uma cópia local e valide a aplicação no Manual de Uso da Marca disponibilizado pela instituição.

## Revisão antes da publicação

1. Validar com orientadores e equipe o texto final e os créditos públicos.
2. Confirmar permissões de publicação da marca institucional e da documentação técnica.
3. Caso pretendam publicar artefatos do software, criar seção específica após a validação institucional e revisão de segurança.
4. Realizar testes finais de acessibilidade e responsividade em navegadores/dispositivos reais.
5. Definir endereço oficial, HTTPS e o responsável editorial pelo conteúdo.

## Fontes utilizadas

- Proposta de projeto de extensão (2026), fornecida pela equipe;
- Documento de Arquitetura de Software e Histórico de Versões 3.0A (2026), fornecido pela equipe;
- [Cartilha de Segurança para Internet do CERT.br](https://cartilha.cert.br/);
- fontes bibliográficas e institucionais listadas dentro do site.
