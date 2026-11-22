import { spawn as iniciarProcesso } from 'node:child_process';
import { cp as copiarPasta, mkdir as criarPasta } from 'node:fs/promises';
import { watch as observarPasta } from 'node:fs';
import { resolve as resolverCaminho } from 'node:path';
import { fileURLToPath as converterEnderecoArquivo } from 'node:url';

const pastaProjeto = resolverCaminho(converterEnderecoArquivo(new URL('..', import.meta.url)));
const caminhoCompilador = resolverCaminho(pastaProjeto, 'node_modules/typescript/bin/tsc');
const caminhoConfiguracao = resolverCaminho(pastaProjeto, 'tsconfig.json');

function compilarProjeto() {
  return new Promise((concluir, rejeitar) => {
    const processo = iniciarProcesso(process.execPath, [caminhoCompilador, '-p', caminhoConfiguracao], {
      cwd: pastaProjeto,
      stdio: 'inherit'
    });

    processo.on('error', rejeitar);
    processo.on('exit', (codigoSaida) => {
      if (codigoSaida === 0) {
        concluir();
      } else {
        rejeitar(new Error(`TypeScript terminou com codigo ${codigoSaida}`));
      }
    });
  });
}

async function copiarArquivos() {
  await criarPasta(resolverCaminho(pastaProjeto, 'dist/styles'), { recursive: true });
  await copiarPasta(resolverCaminho(pastaProjeto, 'src/styles'), resolverCaminho(pastaProjeto, 'dist/styles'), { recursive: true });

  await copiarPasta(resolverCaminho(pastaProjeto, 'public'), resolverCaminho(pastaProjeto, 'dist'), { recursive: true });
}

try {
  console.log('Compilando a cartilha...');
  await compilarProjeto();
  await copiarArquivos();

  const compilador = iniciarProcesso(process.execPath, [caminhoCompilador, '-p', caminhoConfiguracao, '--watch', '--preserveWatchOutput'], {
    cwd: pastaProjeto,
    stdio: 'inherit'
  });

  compilador.on('error', (erro) => {
    console.error('Falha ao iniciar observador TypeScript:', erro);
  });

  let filaCopias = Promise.resolve();

  function atualizarArquivos() {
    filaCopias = filaCopias.then(copiarArquivos).catch((erro) => {
      console.error('Erro ao copiar arquivos estáticos:', erro);
    });
  }

  const observadores = [
    observarPasta(resolverCaminho(pastaProjeto, 'src/styles'), atualizarArquivos),
    observarPasta(resolverCaminho(pastaProjeto, 'public'), { recursive: true }, atualizarArquivos)
  ];

  process.on('SIGINT', () => {
    for (const observador of observadores) {
      observador.close();
    }

    compilador.kill();
    process.exit(0);
  });

  console.log('Desenvolvimento: alteracoes de TS e CSS sao acompanhadas. Atualize a pagina no navegador apos editar.');
  await import('./serve.mjs');
} catch (erro) {
  console.error('Nao foi possivel iniciar o modo de desenvolvimento:', erro.message);
  console.error('Execute npm install antes de npm run dev.');
  process.exitCode = 1;
}
