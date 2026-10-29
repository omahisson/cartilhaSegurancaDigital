import { createServer as criarServidor } from 'node:http';
import { readFile as lerArquivo, stat as consultarArquivo } from 'node:fs/promises';
import { extname as obterExtensao, resolve as resolverCaminho, sep as separadorPastas } from 'node:path';
import { fileURLToPath as converterEnderecoArquivo } from 'node:url';

const pastaSite = resolverCaminho(converterEnderecoArquivo(new URL('../dist/', import.meta.url)));
const porta = Number.parseInt(process.env.PORT || '4173', 10);
const tiposConteudo = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const servidor = criarServidor(async (requisicao, resposta) => {
  if (requisicao.method !== 'GET' && requisicao.method !== 'HEAD') {
    resposta.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let caminhoSolicitado;

  try {
    const endereco = new URL(requisicao.url || '/', 'http://localhost');
    caminhoSolicitado = decodeURIComponent(endereco.pathname);
  } catch {
    resposta.writeHead(400).end('Caminho invalido');
    return;
  }

  const caminhoArquivo = resolverCaminho(pastaSite, caminhoSolicitado === '/' ? 'index.html' : caminhoSolicitado.slice(1));

  if (caminhoArquivo !== pastaSite && !caminhoArquivo.startsWith(pastaSite + separadorPastas)) {
    resposta.writeHead(403).end('Acesso negado');
    return;
  }

  try {
    const informacoesArquivo = await consultarArquivo(caminhoArquivo);

    if (!informacoesArquivo.isFile()) {
      resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Arquivo nao encontrado');
      return;
    }

    const conteudo = await lerArquivo(caminhoArquivo);
    const extensao = obterExtensao(caminhoArquivo).toLowerCase();

    resposta.writeHead(200, {
      'Content-Type': tiposConteudo[extensao] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    resposta.end(requisicao.method === 'HEAD' ? undefined : conteudo);
  } catch (erro) {
    if (erro?.code === 'ENOENT' || erro?.code === 'EISDIR') {
      resposta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Arquivo nao encontrado');
      return;
    }

    console.error('Erro ao servir arquivo:', erro);
    resposta.writeHead(500).end('Erro interno');
  }
});

servidor.on('error', (erro) => {
  if (erro.code === 'EADDRINUSE') {
    console.error(`A porta ${porta} ja esta em uso. Encerre a outra instancia ou defina PORT=4174.`);
  } else {
    console.error(erro);
  }

  process.exitCode = 1;
});

servidor.listen(porta, '127.0.0.1', () => {
  console.log(`\n✓ Cartilha disponivel em http://localhost:${porta}/`);
  console.log('  Ctrl+C para encerrar.\n');
});
