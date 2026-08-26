// ================== BASES DE DATOS DEL JUEGO ==================
// Portado tal cual del script de Python original.

const EQUIPOS_FPC = [
  "América de Cali 👹", "Atlético Bucaramanga 🐆", "Atlético Huila 💛", "Atlético Nacional 🟢",
  "Cortuluá 🚜", "Deportes Quindío ☕", "Deportes Tolima 💼", "Deportivo Cali 💚",
  "Deportivo Pereira 🐺", "Envigado F.C. 🍊", "Independiente Medellín 🔴🔵",
  "Independiente Santa Fe 🦁", "Junior de Barranquilla 🦈", "Millonarios 🐴",
  "Once Caldas ⚪", "Unión Magdalena 🍌"
];

const VARIANTES_COLOMBIA = ["Colombia 🇨🇴", "Colombia (96) 🇨🇴🔥", "Colombia 90 🇨🇴🧔🏻‍♂️", "Super C 🇨🇴⚡"];

const RESTO_SELECCIONES = [
  "Argentina 🇦🇷", "Bolivia 🇧🇴", "Brasil 🇧🇷", "Chile 🇨🇱", "Ecuador 🇪🇨", "Paraguay 🇵🇾",
  "Perú 🇵🇪", "Uruguay 🇺🇾", "Venezuela 🇻🇪", "México 🇲🇽", "Estados Unidos 🇺🇸"
];

const EUROPA_ISS = [
  "Alemania 🇩🇪", "Austria 🇦🇹", "Bélgica 🇧🇪", "Bulgaria 🇧🇬", "Dinamarca 🇩🇰",
  "Escocia 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "España 🇪🇸", "Francia 🇫🇷", "Gales 🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Grecia 🇬🇷",
  "Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Irlanda 🇮🇪", "Irlanda del Norte 🇬🇧", "Italia 🇮🇹",
  "Noruega 🇳🇴", "Países Bajos 🇳🇱", "Polonia 🇵🇱", "Portugal 🇵🇹",
  "Rumania 🇷🇴", "Rusia 🇷🇺", "Suecia 🇸🇪", "Suiza 🇨🇭", "Turquía 🇹🇷"
];

const AMERICA_ISS = [
  "Argentina 🇦🇷", "Bolivia 🇧🇴", "Brasil 🇧🇷", "Chile 🇨🇱", "Colombia 🇨🇴",
  "Ecuador 🇪🇨", "Estados Unidos 🇺🇸", "México 🇲🇽", "Paraguay 🇵🇾",
  "Perú 🇵🇪", "Uruguay 🇺🇾", "Venezuela 🇻🇪"
];

const RESTO_MUNDO_ISS = ["Camerún 🇨🇲", "Corea del Sur 🇰🇷", "Japón 🇯🇵", "Marruecos 🇲🇦", "Nigeria 🇳🇬"];

const ISS = [...EUROPA_ISS, ...AMERICA_ISS, ...RESTO_MUNDO_ISS];

const CLUBES_INTERNACIONALES = [
  "Boca Juniors 🟦🟡", "River Plate ⚪🔴", "Juventus ⚪⚫", "Peñarol 🟡⚫", "Real Madrid 👑", "Barcelona 🔵🔴"
];

const RIVALES_TOP = [
  "América de Cali 👹", "Millonarios 🐴", "Perú 🇵🇪", "Argentina 🇦🇷", "Brasil 🇧🇷",
  "Boca Juniors 🟦🟡", "River Plate ⚪🔴", "Junior de Barranquilla 🦈",
  "Paraguay 🇵🇾", "Uruguay 🇺🇾", "Envigado F.C. 🍊", "Deportivo Pereira 🐺"
];

// ================== HELPERS ALEATORIOS ==================

function sample(arr, n) {
  const copia = [...arr];
  const resultado = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
}

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ================== FUNCIONES DE SELECCIÓN (idénticas al script.py) ==================

function obtenerFpc(cantidadTotal, priorizarSantaFe = false) {
  let disponibles = [...EQUIPOS_FPC];
  if (priorizarSantaFe) {
    disponibles = disponibles.filter(e => e !== "Independiente Santa Fe 🦁");
    const rivales = sample(disponibles, cantidadTotal - 1);
    return ["Independiente Santa Fe 🦁", ...rivales];
  }
  return sample(disponibles, cantidadTotal);
}

function obtenerFpc1v1Random() {
  const pareja = sample(EQUIPOS_FPC, 2);
  return [`Jugador 1: ${pareja[0]}`, `Jugador 2: ${pareja[1]}`];
}

function obtenerSantaFeVsRandomAmpliado() {
  const fpcSinSf = EQUIPOS_FPC.filter(e => e !== "Independiente Santa Fe 🦁");
  let bolsaRivales = Array.from(new Set([...fpcSinSf, ...CLUBES_INTERNACIONALES, ...RESTO_SELECCIONES]));
  if (Math.random() < 0.5) {
    bolsaRivales.push(choice(VARIANTES_COLOMBIA));
  }
  const rival = choice(bolsaRivales);
  return ["Jugador 1: Independiente Santa Fe 🦁", `Jugador 2: ${rival}`];
}

function obtenerCopaAmerica(cantidadTotal, priorizarColombia = false) {
  let poolCompleto = [...RESTO_SELECCIONES];
  if (priorizarColombia) {
    const colombiaSeleccionada = choice(VARIANTES_COLOMBIA);
    const rivales = sample(poolCompleto, cantidadTotal - 1);
    return [colombiaSeleccionada, ...rivales];
  }
  const colombiaOpcion = choice(VARIANTES_COLOMBIA);
  poolCompleto.push(colombiaOpcion);
  return sample(poolCompleto, cantidadTotal);
}

function obtenerColombiaVsRandom() {
  const colombiaSeleccionada = choice(VARIANTES_COLOMBIA);
  const rival = choice(RESTO_SELECCIONES);
  return [`Jugador 1: ${colombiaSeleccionada}`, `Jugador 2: ${rival}`];
}

function obtenerAmerica1v1Random() {
  const poolCompleto = [...RESTO_SELECCIONES, choice(VARIANTES_COLOMBIA)];
  const pareja = sample(poolCompleto, 2);
  return [`Jugador 1: ${pareja[0]}`, `Jugador 2: ${pareja[1]}`];
}

function obtenerIssModo(opcion) {
  const colombiaOficial = "Colombia 🇨🇴";
  switch (opcion) {
    case "1": {
      const equipo = choice(ISS);
      return [`Tu Selección: ${equipo}`];
    }
    case "2": {
      const rivales = AMERICA_ISS.filter(e => e !== colombiaOficial);
      const rival = choice(rivales);
      return [`Jugador 1: ${colombiaOficial}`, `Jugador 2: ${rival}`];
    }
    case "3": {
      const rival = choice(EUROPA_ISS);
      return [`Jugador 1: ${colombiaOficial}`, `Jugador 2: ${rival}`];
    }
    case "4": {
      const poolRivales = [...AMERICA_ISS.filter(e => e !== colombiaOficial), ...EUROPA_ISS];
      const rival = choice(poolRivales);
      return [`Jugador 1: ${colombiaOficial}`, `Jugador 2: ${rival}`];
    }
    case "5": {
      const pareja = sample(EUROPA_ISS, 2);
      return [`Jugador 1: ${pareja[0]}`, `Jugador 2: ${pareja[1]}`];
    }
    case "6": {
      const pareja = sample(AMERICA_ISS, 2);
      return [`Jugador 1: ${pareja[0]}`, `Jugador 2: ${pareja[1]}`];
    }
    case "7": {
      const pareja = sample(ISS, 2);
      return [`Jugador 1: ${pareja[0]}`, `Jugador 2: ${pareja[1]}`];
    }
    default:
      return [];
  }
}

function obtenerMundialClubes(cantidadTotal, priorizarSantaFe = false) {
  const colombianos = obtenerFpc(2, priorizarSantaFe);
  let internacionales;
  if (cantidadTotal === 6) {
    internacionales = sample(CLUBES_INTERNACIONALES, 4);
  } else {
    internacionales = shuffle(CLUBES_INTERNACIONALES);
  }
  return [...colombianos, ...internacionales];
}

function obtenerPartidosTop(cantidadTotal) {
  const rivales = sample(RIVALES_TOP, cantidadTotal - 1);
  return ["Independiente Santa Fe 🦁", ...rivales];
}

function obtenerTotalRandom(cantidadTotal) {
  let bolsa = Array.from(new Set([...EQUIPOS_FPC, ...CLUBES_INTERNACIONALES, ...RESTO_SELECCIONES]));
  if (Math.random() < 0.5) {
    bolsa.push(choice(VARIANTES_COLOMBIA));
  }
  return sample(bolsa, cantidadTotal);
}

// ================== CONFIGURACIÓN DE MENÚS ==================

const MENU_PRINCIPAL = [
  { icon: "🇨🇴", label: "Clubes del FPC", key: "fpc" },
  { icon: "🏆", label: "Copa América", key: "copa" },
  { icon: "🎮", label: "International Superstar Soccer", key: "iss" },
  { icon: "🌍", label: "Mundial de Clubes", key: "mundial" },
  { icon: "🤪", label: "Total Random", key: "random" },
  { icon: "⭐", label: "Partidos TOP", key: "top" }
];

const SUBMENUS = {
  fpc: {
    titulo: "CLUBES DEL FPC",
    opciones: [
      { label: "Santa Fe vs Random (+ Copa América)", nombre: "Santa Fe vs Random", run: () => obtenerSantaFeVsRandomAmpliado() },
      { label: "1vs1 FPC 96 (2 equipos al azar)", nombre: "1vs1 FPC 96", run: () => obtenerFpc1v1Random() },
      { label: "Liga Corta (6) — Prioridad Santa Fe", nombre: "Liga Corta (Prioridad Santa Fe)", run: () => obtenerFpc(6, true) },
      { label: "Torneo Relámpago (8) — Prioridad Santa Fe", nombre: "Torneo Relámpago (Prioridad Santa Fe)", run: () => obtenerFpc(8, true) },
      { label: "Liga Corta Al Azar (6)", nombre: "Liga Corta (Azar)", run: () => obtenerFpc(6, false) },
      { label: "Torneo Relámpago Al Azar (8)", nombre: "Torneo Relámpago (Azar)", run: () => obtenerFpc(8, false) }
    ]
  },
  copa: {
    titulo: "COPA AMÉRICA",
    opciones: [
      { label: "Colombia vs Random (1v1)", nombre: "Colombia vs Random", run: () => obtenerColombiaVsRandom() },
      { label: "1vs1 Random América", nombre: "1vs1 Random América", run: () => obtenerAmerica1v1Random() },
      { label: "Liga Corta (6) — Prioridad Colombia", nombre: "Liga Corta (Prioridad Colombia)", run: () => obtenerCopaAmerica(6, true) },
      { label: "Torneo Relámpago (8) — Prioridad Colombia", nombre: "Torneo Relámpago (Prioridad Colombia)", run: () => obtenerCopaAmerica(8, true) },
      { label: "Liga Corta Al Azar (6)", nombre: "Liga Corta (Azar)", run: () => obtenerCopaAmerica(6, false) },
      { label: "Torneo Relámpago Al Azar (8)", nombre: "Torneo Relámpago (Azar)", run: () => obtenerCopaAmerica(8, false) }
    ]
  },
  iss: {
    titulo: "INTERNATIONAL SUPERSTAR SOCCER",
    opciones: [
      { label: "Copa del Mundo (1 selección al azar)", nombre: "Copa del Mundo", run: () => obtenerIssModo("1") },
      { label: "Colombia vs Selecciones de América", nombre: "Colombia vs América", run: () => obtenerIssModo("2") },
      { label: "Colombia vs Selecciones de Europa", nombre: "Colombia vs Europa", run: () => obtenerIssModo("3") },
      { label: "Colombia vs Random (América y Europa)", nombre: "Colombia vs Random", run: () => obtenerIssModo("4") },
      { label: "Versus Europa (2 selecciones)", nombre: "Versus Europa", run: () => obtenerIssModo("5") },
      { label: "Versus América (2 selecciones)", nombre: "Versus América", run: () => obtenerIssModo("6") },
      { label: "Versus Total Random (2 selecciones)", nombre: "Versus Total Random", run: () => obtenerIssModo("7") }
    ]
  },
  mundial: {
    titulo: "MUNDIAL DE CLUBES",
    opciones: [
      { label: "Liga Corta (6) — Prioridad Santa Fe", nombre: "Liga Corta (Prioridad Santa Fe)", run: () => obtenerMundialClubes(6, true) },
      { label: "Torneo Relámpago (8) — Prioridad Santa Fe", nombre: "Torneo Relámpago (Prioridad Santa Fe)", run: () => obtenerMundialClubes(8, true) },
      { label: "Liga Corta Al Azar (6)", nombre: "Liga Corta (Azar)", run: () => obtenerMundialClubes(6, false) },
      { label: "Torneo Relámpago Al Azar (8)", nombre: "Torneo Relámpago (Azar)", run: () => obtenerMundialClubes(8, false) }
    ]
  },
  random: {
    titulo: "TOTAL RANDOM",
    opciones: [
      { label: "Liga Corta (6 equipos)", nombre: "Liga Corta", run: () => obtenerTotalRandom(6) },
      { label: "Torneo Relámpago (8 equipos)", nombre: "Torneo Relámpago", run: () => obtenerTotalRandom(8) }
    ]
  },
  top: {
    titulo: "PARTIDOS TOP",
    opciones: [
      { label: "Liga Corta (6 equipos)", nombre: "Liga Corta", run: () => obtenerPartidosTop(6) },
      { label: "Torneo Relámpago (8 equipos)", nombre: "Torneo Relámpago", run: () => obtenerPartidosTop(8) }
    ]
  }
};

// ================== ESTADO Y RENDER ==================

let ultimaAccion = null; // para "repetir sorteo"
let ultimoContexto = { categoria: null, nombreModalidad: null };

const $ = (sel) => document.querySelector(sel);

const elMenuPrincipal = $("#menu-principal");
const elListaPrincipal = $("#lista-principal");
const elMenuSub = $("#menu-sub");
const elListaSub = $("#lista-sub");
const elSubTitle = $("#sub-title");
const elMenuResultados = $("#menu-resultados");
const elListaResultados = $("#lista-resultados");
const elResultadoTitle = $("#resultado-title");
const elBreadcrumb = $("#breadcrumb");

function mostrarPanel(panel) {
  [elMenuPrincipal, elMenuSub, elMenuResultados].forEach(p => p.classList.add("hidden"));
  panel.classList.remove("hidden");
}

function renderMenuPrincipal() {
  elBreadcrumb.textContent = "MENÚ PRINCIPAL";
  elListaPrincipal.innerHTML = "";
  MENU_PRINCIPAL.forEach((item, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "menu-item";
    btn.innerHTML = `<span class="cursor-arrow">▶</span><span class="opacity-60">${i + 1}.</span> <span>${item.icon} ${item.label}</span>`;
    btn.addEventListener("click", () => renderSubmenu(item.key));
    li.appendChild(btn);
    elListaPrincipal.appendChild(li);
  });
  mostrarPanel(elMenuPrincipal);
}

function renderSubmenu(categoriaKey) {
  const categoria = SUBMENUS[categoriaKey];
  elBreadcrumb.textContent = `MENÚ PRINCIPAL ▸ ${categoria.titulo}`;
  elSubTitle.textContent = categoria.titulo;
  elListaSub.innerHTML = "";
  categoria.opciones.forEach((opcion, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "menu-item";
    btn.innerHTML = `<span class="cursor-arrow">▶</span><span class="opacity-60">${i + 1}.</span> <span>${opcion.label}</span>`;
    btn.addEventListener("click", () => ejecutarSorteo(categoriaKey, opcion));
    li.appendChild(btn);
    elListaSub.appendChild(li);
  });
  mostrarPanel(elMenuSub);
}

function ejecutarSorteo(categoriaKey, opcion) {
  ultimaAccion = opcion.run;
  ultimoContexto = { categoria: SUBMENUS[categoriaKey].titulo, nombreModalidad: opcion.nombre };
  const equipos = opcion.run();
  renderResultados(equipos);
}

function renderResultados(equipos) {
  elBreadcrumb.textContent = `${ultimoContexto.categoria} ▸ ${ultimoContexto.nombreModalidad}`;
  elResultadoTitle.textContent = `${ultimoContexto.nombreModalidad}`;
  elListaResultados.innerHTML = "";
  equipos.forEach((equipo, i) => {
    const li = document.createElement("li");
    li.className = "resultado-fila";
    li.style.animationDelay = `${i * 90}ms`;
    const numero = String(i + 1).padStart(2, "0");
    li.innerHTML = `<span class="num">${numero}</span><span>${equipo}</span>`;
    elListaResultados.appendChild(li);
  });
  mostrarPanel(elMenuResultados);
}

// ================== EVENTOS ==================

$("#btn-volver-principal").addEventListener("click", renderMenuPrincipal);

$("#btn-repetir").addEventListener("click", () => {
  if (ultimaAccion) {
    const equipos = ultimaAccion();
    renderResultados(equipos);
  }
});

$("#btn-nuevo").addEventListener("click", renderMenuPrincipal);

// ================== INICIO ==================

renderMenuPrincipal();
