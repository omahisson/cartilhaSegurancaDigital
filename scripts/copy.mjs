import { mkdir as criarPasta, cp as copiarPasta } from 'node:fs/promises';

await criarPasta('dist/styles', { recursive: true });
await copiarPasta('src/styles', 'dist/styles', { recursive: true });

await copiarPasta('public', 'dist', { recursive: true });

console.log('✓ Site compilado em dist/');
