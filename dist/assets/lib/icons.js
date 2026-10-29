const desenhosIcones = {
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    door: '<path d="M4 20h16M7 20V4l10-2v18"/><path d="m11 12 2 0"/>',
    cookie: '<path d="M20 13a8 8 0 1 1-9-9 5 5 0 0 0 9 9Z"/><circle cx="8.5" cy="12" r=".8"/><circle cx="13.5" cy="17" r=".8"/><circle cx="15" cy="9" r=".8"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M5 17v4h14v-4"/>',
    key: '<circle cx="8" cy="16" r="4"/><path d="m11 13 9-9 2 2-2 2-2-2-2 2 2 2-3 3"/>',
    refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9a7 7 0 0 1 12-2l2.5 5M18.5 15a7 7 0 0 1-12 2L4 12"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
    book: '<path d="M12 7C8 4 5 5 2 5v15c3-1 6-1 10 1 4-2 7-2 10-1V5c-3 0-6-1-10 2Zm0 0v14"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/>',
    lock: '<rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3m-4 4v3"/>',
    cloud: '<path d="M8 19h10a4 4 0 0 0 0-8 6 6 0 0 0-11-2 5 5 0 0 0 1 10Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    printer: '<path d="M6 9V3h12v6M6 18H4V9h16v9h-2"/><path d="M6 15h12v6H6z"/>'
};
export function criarIcone(nome, tamanho = 20) {
    return `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${desenhosIcones[nome]}</svg>`;
}
