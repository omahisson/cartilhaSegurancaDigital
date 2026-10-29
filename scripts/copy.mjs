import { mkdir as criarPasta, cp as copiarPasta, copyFile as copiarArquivo } from 'node:fs/promises';

await criarPasta('dist/styles', { recursive: true });
await copiarPasta('src/styles', 'dist/styles', { recursive: true });

for (const arquivo of ['index.html', 'favicon.svg', 'robots.txt', 'logo-if-sudeste-mg.png']) {
  await copiarArquivo(`public/${arquivo}`, `dist/${arquivo}`);
}

console.log('✓ Site compilado em dist/');
