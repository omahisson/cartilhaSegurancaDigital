import { readFile as lerArquivo, writeFile as gravarArquivo } from 'node:fs/promises';

const arquivosEstilo = ['base', 'layout', 'components', 'pages'];
let estilos = '';

for (const arquivo of arquivosEstilo) {
  estilos += await lerArquivo(`dist/styles/${arquivo}.css`, 'utf8');
  estilos += '\n';
}

const arquivosCodigo = [
  'lib/icons.js',
  'data/fascicles.js',
  'data/references.js',
  'ui/components.js',
  'pages/home.js',
  'pages/fascicles.js',
  'pages/article.js',
  'pages/technology.js',
  'pages/about.js',
  'pages/references.js',
  'main.js'
];

let codigo = '';

for (const arquivo of arquivosCodigo) {
  const conteudo = await lerArquivo(`dist/assets/${arquivo}`, 'utf8');
  codigo += conteudo.replace(/^import\s+.*?;\s*$/gm, '').replace(/^export\s+/gm, '');
  codigo += '\n';
}

const imagemLogotipo = await lerArquivo('dist/logo-if-sudeste-mg.png');
const logotipoEmbutido = `data:image/png;base64,${imagemLogotipo.toString('base64')}`;
codigo = codigo.replace("'./logo-if-sudeste-mg.png'", `'${logotipoEmbutido}'`);

let pagina = await lerArquivo('dist/index.html', 'utf8');
pagina = pagina.replaceAll(/\s*<link rel="stylesheet"[^>]*>/g, '');
pagina = pagina.replace(/<script type="module" src="\.\/assets\/main\.js"><\/script>/, `<style>${estilos}</style><script defer>\n(()=>{\n${codigo}\n})();\n</script>`);
pagina = pagina.replace('<link rel="icon" href="./favicon.svg" type="image/svg+xml" />', '');

await gravarArquivo('../cartilha-previa-offline.html', pagina, 'utf8');
console.log('✓ Prévia autônoma criada: cartilha-previa-offline.html');
