/**
 * ============================================================================
 * LunaLab - JavaScript Principal (script.js)
 * 
 * ESPECIFICAÇÃO 1: Visualização Interativa das Fases da Lua
 * - RF01: Exibir as oito fases lunares.
 * - RF02: Apresentar uma representação visual correta de cada fase.
 * - RF03: Permitir selecionar as fases por botões interativos.
 * - RF04: Mostrar nome e descrição da fase selecionada.
 * 
 * ESPECIFICAÇÃO 2: Simulação Interativa do Ciclo Lunar
 * - RF05: Simulação animada da progressão lunar (0 a 29,5 dias) via requestAnimationFrame.
 * - RF06: Controles da simulação (Iniciar, Pausar, Reiniciar).
 * - RF07: Contador de dias ("Dia 12,4 de 29,5") e sincronização de fase atual.
 * - RF08: Controle de velocidade em tempo real (0,5x, 1x, 2x, 4x).
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. BASE DE DADOS ASTRONÔMICA: AS OITO FASES LUNARES (RF01 & RF04)
     -------------------------------------------------------------------------- */
  const LUNAR_PHASES = [
    {
      id: 0,
      number: '01',
      name: 'Lua Nova',
      intlName: 'New Moon • Novilúnio',
      phaseAngle: 0, // 0 rad
      illuminationPercent: 0,
      illuminationLabel: '0%',
      ageDays: 0.0,
      elongation: '0° (Conjunção Solar)',
      riseTime: '~06:00 (Amanhecer)',
      setTime: '~18:00 (Entardecer)',
      visibility: 'Invisível a olho nu no céu noturno',
      nextPhase: 'Lua Crescente',
      sunDirection: 'Alinhada atrás da Lua',
      summary: 'A Lua está posicionada diretamente entre a Terra e o Sol. Sua face iluminada aponta exclusivamente para longe de nós, tornando seu disco invisível da Terra.',
      description: 'Durante a fase de Lua Nova (novilúnio), o satélite natural cruza a abóbada celeste quase em sincronia com o Sol, nascendo ao amanhecer e pondo-se ao entardecer. Por causa da inclinação de cerca de 5° da órbita lunar em relação à eclíptica terrestre, ela geralmente passa acima ou abaixo do Sol. Quando o alinhamento coincide com o plano orbital (nodos lunares), testemunhamos um eclipse solar total ou anular.',
      curiosity: 'É o marco inicial do mês sinódico (lunação), período que dura em média 29 dias, 12 horas e 44 minutos.'
    },
    {
      id: 1,
      number: '02',
      name: 'Lua Crescente',
      intlName: 'Waxing Crescent • Crescente Côncava',
      phaseAngle: Math.PI * 0.25, // 45°
      illuminationPercent: 25,
      illuminationLabel: '~25%',
      ageDays: 3.7,
      elongation: '45° (A leste do Sol)',
      riseTime: '~09:00 (Manhã)',
      setTime: '~21:00 (Início da noite)',
      visibility: 'Baixa no céu ocidental logo após o crepúsculo',
      nextPhase: 'Quarto Crescente',
      sunDirection: 'Luz Solar incide pelo lado crescente',
      summary: 'Uma graciosa foice prateada surge no crepúsculo. O restante do disco lunar torna-se suavemente perceptível pela luz refletida da própria Terra (Brilho da Terra).',
      description: 'À medida que a Lua se afasta angularmente do Sol em sua trajetória orbital anti-horária (vista do polo norte terrestre), uma fatia crescente da sua face visível começa a refletir luz solar direta. Durante as primeiras noites desta fase, o fenômeno do "Brilho da Terra" (luz cinérea) ilumina tenuamente a porção em sombra, permitindo contemplar o contorno completo do globo lunar.',
      curiosity: 'Leonardo da Vinci desvendou cientificamente o enigma do Brilho da Terra no início do século XVI, registrando no Códice Leicester que se tratava do reflexo dos oceanos e nuvens da Terra.'
    },
    {
      id: 2,
      number: '03',
      name: 'Quarto Crescente',
      intlName: 'First Quarter • Quadratura Crescente',
      phaseAngle: Math.PI * 0.5, // 90°
      illuminationPercent: 50,
      illuminationLabel: '50%',
      ageDays: 7.4,
      elongation: '90° (Quadratura Leste)',
      riseTime: '~12:00 (Meio-dia)',
      setTime: '~00:00 (Meia-noite)',
      visibility: 'No alto do céu ao pôr do sol, põe-se à meia-noite',
      nextPhase: 'Gibosa Crescente',
      sunDirection: 'Iluminação lateral em 90°',
      summary: 'Exatamente metade do disco lunar visível está iluminado. A linha do terminador corta a Lua ao meio com dramaticidade de relevos e sombras.',
      description: 'O satélite completou um quarto de sua órbita ao redor do nosso planeta. Visto da Terra, o ângulo formado entre Sol, Terra e Lua é de exatos 90° (quadratura). A linha divisória entre a luz e a escuridão — chamada de terminador lunar — projeta sombras alongadas sobre as bordas das crateras e cordilheiras, proporcionando o momento ideal para observação telescópica.',
      curiosity: 'Nas marés terrestres, as fases de Quarto Crescente e Quarto Minguante geram as "Marés de Quadratura" (marés mortas), onde a amplitude entre preamar e baixa-mar é a menor do mês.'
    },
    {
      id: 3,
      number: '04',
      name: 'Gibosa Crescente',
      intlName: 'Waxing Gibbous • Crescente Convexa',
      phaseAngle: Math.PI * 0.75, // 135°
      illuminationPercent: 75,
      illuminationLabel: '~75%',
      ageDays: 11.1,
      elongation: '135° (A leste do Sol)',
      riseTime: '~15:00 (Meio da tarde)',
      setTime: '~03:00 (Madrugada)',
      visibility: 'Visível durante a maior parte da noite e início da madrugada',
      nextPhase: 'Lua Cheia',
      sunDirection: 'Iluminação oblíqua dominante',
      summary: 'Mais da metade do disco visível reluz no firmamento. A Lua assume aspecto corcunda ou ovalado, caminhando celeremente rumo ao plenilúnio.',
      description: 'O termo "gibosa" provém do latim gibbus ("corcunda" ou "protuberância"). A fração iluminada ultrapassa os 50% e cresce dia após dia. É a fase em que os grandes mares basálticos centrais e orientais, como o Mare Imbrium e o Mare Serenitatis, brilham com nitidez astronômica inconfundível.',
      curiosity: 'É uma das melhores fases para fotografar os detalhes do bordo lunar, pois as crateras ocidentais ainda apresentam sombras com excelente profundidade óptica.'
    },
    {
      id: 4,
      number: '05',
      name: 'Lua Cheia',
      intlName: 'Full Moon • Plenilúnio',
      phaseAngle: Math.PI, // 180°
      illuminationPercent: 100,
      illuminationLabel: '100%',
      ageDays: 14.8,
      elongation: '180° (Oposição Celestial)',
      riseTime: '~18:00 (Pôr do sol)',
      setTime: '~06:00 (Nascer do sol)',
      visibility: 'Brilha durante toda a noite, do crepúsculo à aurora',
      nextPhase: 'Gibosa Minguante',
      sunDirection: 'Frontal (Oposição ao Sol)',
      summary: 'A Terra situa-se aproximadamente entre o Sol e a Lua. Toda a face lunar voltada para nós está intensamente banhada por luz solar.',
      description: 'Durante o plenilúnio, a Lua nasce exatamente quando o Sol se põe no horizonte oposto e domina os céus pela noite inteira. Por não haver sombras tangenciais sobre as crateras centrais, a Lua Cheia parece plana; em contrapartida, os sistemas de raios brilhantes ejetados por impactos monumentais (como os raios de Tycho e Copernicus) tornam-se incrivelmente evidentes.',
      curiosity: 'Apenas nesta fase ocorrem os eclipses lunares, momento em que a Lua mergulha no cone de sombra (umbra e penumbra) projetado pela Terra no espaço.'
    },
    {
      id: 5,
      number: '06',
      name: 'Gibosa Minguante',
      intlName: 'Waning Gibbous • Minguante Convexa',
      phaseAngle: Math.PI * 1.25, // 225°
      illuminationPercent: 75,
      illuminationLabel: '~75%',
      ageDays: 18.5,
      elongation: '135° (A oeste do Sol)',
      riseTime: '~21:00 (Início da noite)',
      setTime: '~09:00 (Manhã)',
      visibility: 'Nasce tarde da noite e perdura no céu após o nascer do sol',
      nextPhase: 'Quarto Minguante',
      sunDirection: 'Luz incide pelo flanco minguante',
      summary: 'Após o ápice da plenitude, a escuridão começa a penetrar o disco lunar pelo lado oposto, reduzindo gradualmente a sua área iluminada.',
      description: 'A Lua segue agora a sua metade minguante da órbita. Embora continue iluminada em mais de 75%, o terminador começa a cobrir as planícies e crateras que foram as primeiras a se iluminar no início do ciclo. Pode ser facilmente avistada pela manhã, contrastando de forma suave e majestosa contra o azul do céu diurno.',
      curiosity: 'Astrônomos antigos a chamavam de Lua Disseminadora, associando seu declínio ao repouso e contemplação nos calendários tradicionais.'
    },
    {
      id: 6,
      number: '07',
      name: 'Quarto Minguante',
      intlName: 'Last / Third Quarter • Quadratura Minguante',
      phaseAngle: Math.PI * 1.5, // 270°
      illuminationPercent: 50,
      illuminationLabel: '50%',
      ageDays: 22.1,
      elongation: '90° (Quadratura Oeste)',
      riseTime: '~00:00 (Meia-noite)',
      setTime: '~12:00 (Meio-dia)',
      visibility: 'Nasce à meia-noite, visível pela madrugada e manhã',
      nextPhase: 'Lua Minguante',
      sunDirection: 'Iluminação lateral em 270°',
      summary: 'Três quartos do ciclo orbital foram percorridos. Metade do disco lunar visível está reluzente, exatamente oposta ao Quarto Crescente.',
      description: 'A Lua se encontra novamente em quadratura celeste com o Sol, porém a 90° a oeste deste. A porção leste do disco agora está mergulhada na noite lunar, enquanto a porção oeste permanece ensolarada. É ideal para astrônomos amadores que apreciam observar a Lua nas primeiras horas da aurora.',
      curiosity: 'Assim como no Quarto Crescente, a força gravitacional combinada do Sol e da Lua age em ângulos retos, atenuando as marés oceânicas na Terra.'
    },
    {
      id: 7,
      number: '08',
      name: 'Lua Minguante',
      intlName: 'Waning Crescent • Minguante Côncava',
      phaseAngle: Math.PI * 1.75, // 315°
      illuminationPercent: 25,
      illuminationLabel: '~25%',
      ageDays: 25.8,
      elongation: '45° (A oeste do Sol)',
      riseTime: '~03:00 (Madrugada)',
      setTime: '~15:00 (Meio da tarde)',
      visibility: 'Fina foice no horizonte leste antes do amanhecer',
      nextPhase: 'Lua Nova',
      sunDirection: 'Luz rasteira anunciando o novilúnio',
      summary: 'Uma delicada foice curva que precede a aurora, despedindo-se da visibilidade noturna antes de recomeçar o ciclo cósmico.',
      description: 'A derradeira fase do ciclo de lunação revela uma fina borda iluminada apontando na direção do Sol nascente. Com a aproximação angular em relação ao astro-rei, a cada dia que passa a Lua se torna mais estreita e mais difícil de distinguir no clarão da aurora, até mergulhar novamente na fase de Lua Nova.',
      curiosity: 'Nos países de língua árabe e em civilizações do Oriente Médio, o avistamento a olho nu desta foice ou da primeira foice crescente determinava o início e o término de meses sagrados como o Ramadã.'
    }
  ];

  /* --------------------------------------------------------------------------
     2. ESTADOS DA APLICAÇÃO (ESPECIFICAÇÃO 1 E 2 SEPARADOS)
     -------------------------------------------------------------------------- */
  // Estado da Especificação 1 (Visualizador de Fases)
  const viewerState = {
    currentPhaseIndex: 0,
    targetAngle: 0,
    currentRenderAngle: 0,
    isAutoplaying: false,
    autoplayTimer: null
  };

  // Estado da Especificação 2 (Simulador do Ciclo Lunar)
  const simState = {
    isRunning: false,
    currentDay: 0.0,
    totalDays: 29.5,
    speed: 1.0, // 0.5, 1.0, 2.0, 4.0
    animationFrameId: null,
    lastTimestamp: null,
    baseSecondsPerCycle: 29.5 // 1 segundo real = 1 dia lunar na velocidade 1x
  };

  // Estado Global Compartilhado
  const globalState = {
    activeTab: 'viewer', // 'viewer' ou 'simulator'
    hemisphere: 'south', // 'south' (Brasil default) ou 'north'
    soundEnabled: false
  };

  /* --------------------------------------------------------------------------
     3. ELEMENTOS DO DOM
     -------------------------------------------------------------------------- */
  const elements = {
    // Abas de navegação
    tabBtnViewer: document.getElementById('tab-btn-viewer'),
    tabBtnSimulator: document.getElementById('tab-btn-simulator'),
    viewViewer: document.getElementById('view-viewer'),
    viewSimulator: document.getElementById('view-simulator'),

    // Fundo Cósmico
    starsCanvas: document.getElementById('stars-canvas'),

    // Seletor de Hemisfério & Som
    btnHemiSouth: document.getElementById('btn-hemi-south'),
    btnHemiNorth: document.getElementById('btn-hemi-north'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    soundIcon: document.getElementById('sound-icon'),

    // --- ELEMENTOS DA ESPECIFICAÇÃO 1 ---
    moonCanvas: document.getElementById('moon-main-canvas'),
    moonCanvasWrapper: document.getElementById('moon-canvas-wrapper'),
    lunarCorona: document.getElementById('lunar-corona'),
    sunlightBadge: document.getElementById('sunlight-direction'),
    btnPrevPhase: document.getElementById('btn-prev-phase'),
    btnNextPhase: document.getElementById('btn-next-phase'),
    btnAutoplay: document.getElementById('btn-autoplay'),
    autoplayIcon: document.getElementById('autoplay-icon'),
    phasesButtonContainer: document.getElementById('phases-button-container'),

    quickIllumination: document.getElementById('quick-illumination'),
    quickAge: document.getElementById('quick-age'),
    quickElongation: document.getElementById('quick-elongation'),

    phaseIndexDisplay: document.getElementById('phase-index-display'),
    phaseTitle: document.getElementById('phase-title'),
    phaseIntlTitle: document.getElementById('phase-intl-title'),
    phaseSummary: document.getElementById('phase-summary'),
    phaseDescription: document.getElementById('phase-description'),
    paramRise: document.getElementById('param-rise'),
    paramSet: document.getElementById('param-set'),
    paramVisibility: document.getElementById('param-visibility'),
    paramNextPhase: document.getElementById('param-next-phase'),
    phaseCuriosity: document.getElementById('phase-curiosity'),

    // --- ELEMENTOS DA ESPECIFICAÇÃO 2 (SIMULADOR) ---
    simMoonCanvas: document.getElementById('sim-moon-canvas'),
    simLunarCorona: document.getElementById('sim-lunar-corona'),
    simSunText: document.getElementById('sim-sun-text'),
    simCurrentPhaseName: document.getElementById('sim-current-phase-name'),
    simDayDisplay: document.getElementById('sim-day-display'),
    simPercentTag: document.getElementById('sim-percent-tag'),
    simIlluminationDisplay: document.getElementById('sim-illumination-display'),
    simProgressTrack: document.getElementById('sim-progress-track'),
    simProgressFill: document.getElementById('sim-progress-fill'),

    simBtnPlay: document.getElementById('sim-btn-play'),
    simBtnPause: document.getElementById('sim-btn-pause'),
    simBtnReset: document.getElementById('sim-btn-reset'),
    speedIndicatorBadge: document.getElementById('speed-indicator-badge'),
    speedButtons: document.querySelectorAll('.speed-pill-btn')
  };

  /* --------------------------------------------------------------------------
     4. ÁUDIO SINTETIZADO (Web Audio API - Efeitos Espaciais Nativos)
     -------------------------------------------------------------------------- */
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playCelestialChime(frequency = 528) {
    if (!globalState.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, audioCtx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.55);
    } catch (e) {
      // Ignorar caso políticas do navegador restrinjam
    }
  }

  /* --------------------------------------------------------------------------
     5. TEXTURA PROCEDURAL DA LUA (REUTILIZÁVEL - RF02 & RF05)
     -------------------------------------------------------------------------- */
  let lunarTextureCanvas = null;

  function createProceduralMoonTexture(size = 800) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const radius = size * 0.48;
    const cx = size / 2;
    const cy = size / 2;

    // Disco base da Lua com gradiente sutil de regolito
    const baseGrad = ctx.createRadialGradient(cx - radius * 0.1, cy - radius * 0.1, 0, cx, cy, radius);
    baseGrad.addColorStop(0, '#f2f4fc');
    baseGrad.addColorStop(0.55, '#d6dcf2');
    baseGrad.addColorStop(0.85, '#b0b8d4');
    baseGrad.addColorStop(1, '#78829e');

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    // Ruído de regolito lunar
    const noiseGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    noiseGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    noiseGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.05)');
    noiseGrad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
    ctx.fillStyle = noiseGrad;
    ctx.fillRect(0, 0, size, size);

    // Pintura dos Grandes Mares Lunares Basálticos
    const maria = [
      { x: cx - radius * 0.28, y: cy - radius * 0.26, rx: radius * 0.35, ry: radius * 0.3, rot: -0.2, color: 'rgba(55, 62, 85, 0.65)' }, // Imbrium
      { x: cx + radius * 0.25, y: cy - radius * 0.28, rx: radius * 0.22, ry: radius * 0.2, rot: 0.1, color: 'rgba(50, 56, 78, 0.7)' },   // Serenitatis
      { x: cx + radius * 0.35, y: cy - radius * 0.05, rx: radius * 0.24, ry: radius * 0.19, rot: 0.3, color: 'rgba(46, 52, 74, 0.72)' },  // Tranquillitatis
      { x: cx + radius * 0.58, y: cy - radius * 0.18, rx: radius * 0.14, ry: radius * 0.12, rot: 0, color: 'rgba(42, 48, 68, 0.75)' },   // Crisium
      { x: cx + radius * 0.42, y: cy + radius * 0.18, rx: radius * 0.2, ry: radius * 0.17, rot: -0.1, color: 'rgba(48, 55, 76, 0.68)' },  // Fecunditatis
      { x: cx + radius * 0.15, y: cy + radius * 0.22, rx: radius * 0.18, ry: radius * 0.15, rot: 0.2, color: 'rgba(52, 58, 80, 0.65)' },  // Nectaris
      { x: cx - radius * 0.22, y: cy + radius * 0.25, rx: radius * 0.24, ry: radius * 0.22, rot: -0.25, color: 'rgba(50, 57, 78, 0.68)' } // Nubium
    ];

    maria.forEach(m => {
      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.rotate(m.rot);
      ctx.filter = 'blur(16px)';
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, m.rx, m.ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Raio de Impacto de Tycho
    const tychoX = cx - radius * 0.12;
    const tychoY = cy + radius * 0.68;

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.lineWidth = 1.8;
    ctx.filter = 'blur(2px)';
    for (let a = 0; a < Math.PI * 2; a += 0.25) {
      const rayLen = radius * (0.4 + Math.random() * 0.7);
      ctx.beginPath();
      ctx.moveTo(tychoX, tychoY);
      ctx.lineTo(tychoX + Math.cos(a) * rayLen, tychoY + Math.sin(a) * rayLen);
      ctx.stroke();
    }
    ctx.restore();

    // Crateras
    const craters = [
      { x: tychoX, y: tychoY, r: 16 },
      { x: cx - radius * 0.35, y: cy - radius * 0.08, r: 18 },
      { x: cx - radius * 0.52, y: cy - radius * 0.1, r: 12 },
      { x: cx - radius * 0.6, y: cy - radius * 0.35, r: 14 },
      { x: cx + radius * 0.05, y: cy - radius * 0.52, r: 17 }
    ];

    craters.forEach(c => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(c.x + 2, c.y + 1, c.r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 24, 38, 0.65)';
      ctx.fill();
      ctx.restore();
    });

    // Limb Darkening
    const limbGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius);
    limbGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    limbGrad.addColorStop(0.85, 'rgba(10, 15, 30, 0.25)');
    limbGrad.addColorStop(1, 'rgba(5, 8, 20, 0.75)');
    ctx.fillStyle = limbGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    return canvas;
  }

  /* --------------------------------------------------------------------------
     6. MOTOR DE RENDERIZAÇÃO LUNAR FÍSICA (RF02 & RF05 - TOTALMENTE REUTILIZADO)
     -------------------------------------------------------------------------- */
  /**
   * Renderiza a fase da Lua calculando com precisão esférica a linha do terminador.
   * Reutilizada tanto pelo visualizador (Spec 1) quanto pelo simulador (Spec 2).
   */
  function renderLunarPhase(ctx, width, height, angle, hemisphere = 'south', isThumbnail = false) {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.46;

    let normAngle = angle % (Math.PI * 2);
    if (normAngle < 0) normAngle += Math.PI * 2;

    if (!lunarTextureCanvas) {
      lunarTextureCanvas = createProceduralMoonTexture(800);
    }

    ctx.save();

    // Máscara do disco lunar
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Desenha textura iluminada
    ctx.drawImage(lunarTextureCanvas, cx - radius, cy - radius, radius * 2, radius * 2);

    // Inversão de orientação astronômica conforme hemisfério
    // Sul (Brasil): Crescente ("C"), luz à esquerda | Minguante ("D"), luz à direita.
    // Norte: Crescente ("D"), luz à direita | Minguante ("C"), luz à esquerda.
    const flipDirection = (hemisphere === 'south') ? -1 : 1;
    const cosAngle = Math.cos(normAngle);
    const isWaxing = normAngle <= Math.PI;

    ctx.beginPath();
    if (isWaxing) {
      const shadowSide = flipDirection < 0 ? 1 : -1;
      ctx.arc(cx, cy, radius, -Math.PI / 2, Math.PI / 2, shadowSide > 0 ? false : true);
      ctx.ellipse(cx, cy, Math.max(0.1, radius * Math.abs(cosAngle)), radius, 0, Math.PI / 2, -Math.PI / 2, (cosAngle > 0 ? (shadowSide < 0) : (shadowSide > 0)));
    } else {
      const shadowSide = flipDirection < 0 ? -1 : 1;
      ctx.arc(cx, cy, radius, -Math.PI / 2, Math.PI / 2, shadowSide > 0 ? false : true);
      ctx.ellipse(cx, cy, Math.max(0.1, radius * Math.abs(cosAngle)), radius, 0, Math.PI / 2, -Math.PI / 2, (cosAngle < 0 ? (shadowSide < 0) : (shadowSide > 0)));
    }

    ctx.closePath();

    // Preenchimento com luz cinérea (Earthshine realista)
    ctx.fillStyle = isThumbnail ? 'rgba(8, 12, 24, 0.96)' : 'rgba(7, 10, 22, 0.94)';
    ctx.fill();

    // Penumbra ao longo do terminador
    if (!isThumbnail) {
      ctx.strokeStyle = 'rgba(5, 8, 18, 0.7)';
      ctx.lineWidth = 4;
      ctx.filter = 'blur(3px)';
      ctx.stroke();
      ctx.filter = 'none';
    }

    // Brilho do limbo
    if (normAngle > 0.05 && normAngle < Math.PI * 2 - 0.05) {
      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.94, cx, cy, radius);
      rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      rimGrad.addColorStop(1, 'rgba(240, 245, 255, 0.35)');
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /* --------------------------------------------------------------------------
     7. LÓGICA DA ESPECIFICAÇÃO 1: VISUALIZADOR DE FASES (RF01 - RF04)
     -------------------------------------------------------------------------- */
  let isViewerAnimating = false;

  function animateViewerTerminator() {
    if (!isViewerAnimating) return;

    let diff = viewerState.targetAngle - viewerState.currentRenderAngle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    if (Math.abs(diff) < 0.005) {
      viewerState.currentRenderAngle = viewerState.targetAngle;
      isViewerAnimating = false;
    } else {
      viewerState.currentRenderAngle += diff * 0.12;
    }

    const ctx = elements.moonCanvas.getContext('2d');
    renderLunarPhase(ctx, elements.moonCanvas.width, elements.moonCanvas.height, viewerState.currentRenderAngle, globalState.hemisphere, false);

    if (isViewerAnimating) {
      requestAnimationFrame(animateViewerTerminator);
    }
  }

  function startPhaseAnimation(newAngle) {
    viewerState.targetAngle = newAngle;
    isViewerAnimating = true;
    requestAnimationFrame(animateViewerTerminator);
  }

  function updatePhaseDetails(phase) {
    elements.phaseIndexDisplay.textContent = `FASE ${phase.id + 1} DE 8`;
    elements.phaseTitle.textContent = phase.name;
    elements.phaseIntlTitle.textContent = phase.intlName;
    elements.phaseSummary.textContent = phase.summary;
    elements.phaseDescription.textContent = phase.description;

    elements.paramRise.textContent = phase.riseTime;
    elements.paramSet.textContent = phase.setTime;
    elements.paramVisibility.textContent = phase.visibility;
    elements.paramNextPhase.textContent = phase.nextPhase;
    elements.phaseCuriosity.textContent = phase.curiosity;

    elements.quickIllumination.textContent = phase.illuminationLabel;
    elements.quickAge.textContent = `${phase.ageDays.toFixed(1)} dias`;
    elements.quickElongation.textContent = phase.elongation;

    // Brilho da corona
    const coronaOpacity = 0.05 + (phase.illuminationPercent / 100) * 0.35;
    const coronaScale = 0.85 + (phase.illuminationPercent / 100) * 0.35;
    elements.lunarCorona.style.opacity = coronaOpacity.toString();
    elements.lunarCorona.style.transform = `translate(-50%, -50%) scale(${coronaScale})`;

    // Direção solar
    let sunText = 'Luz Solar';
    if (phase.id === 0) {
      sunText = 'Sol atrás da Lua';
    } else if (phase.id === 4) {
      sunText = 'Sol oposto à Terra';
    } else if (globalState.hemisphere === 'south') {
      sunText = (phase.id < 4) ? '☀️ Luz Solar ←' : '→ Luz Solar ☀️';
    } else {
      sunText = (phase.id < 4) ? '→ Luz Solar ☀️' : '☀️ Luz Solar ←';
    }
    elements.sunlightBadge.querySelector('.sun-text').textContent = sunText;

    // Atualiza botões
    const allButtons = elements.phasesButtonContainer.querySelectorAll('.phase-card-btn');
    allButtons.forEach((btn, idx) => {
      if (idx === phase.id) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  function buildInteractivePhaseButtons() {
    elements.phasesButtonContainer.innerHTML = '';

    LUNAR_PHASES.forEach((phase, index) => {
      const btn = document.createElement('button');
      btn.className = `phase-card-btn ${index === viewerState.currentPhaseIndex ? 'active' : ''}`;
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === viewerState.currentPhaseIndex ? 'true' : 'false');
      btn.setAttribute('aria-label', `Fase ${phase.number}: ${phase.name}`);
      btn.title = `Selecionar ${phase.name} (${phase.illuminationLabel} iluminada)`;

      const thumbWrapper = document.createElement('div');
      thumbWrapper.className = 'phase-thumb-wrapper';

      const thumbCanvas = document.createElement('canvas');
      thumbCanvas.className = 'phase-thumb-canvas';
      thumbCanvas.width = 104;
      thumbCanvas.height = 104;
      thumbCanvas.dataset.phaseIndex = index;

      thumbWrapper.appendChild(thumbCanvas);

      const orderSpan = document.createElement('span');
      orderSpan.className = 'phase-card-order';
      orderSpan.textContent = `FASE ${phase.number}`;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'phase-card-name';
      nameSpan.textContent = phase.name;

      const badgeSpan = document.createElement('span');
      badgeSpan.className = 'phase-card-badge';
      badgeSpan.textContent = phase.illuminationLabel;

      btn.appendChild(thumbWrapper);
      btn.appendChild(orderSpan);
      btn.appendChild(nameSpan);
      btn.appendChild(badgeSpan);

      btn.addEventListener('click', () => {
        selectPhase(index);
      });

      elements.phasesButtonContainer.appendChild(btn);

      const thumbCtx = thumbCanvas.getContext('2d');
      renderLunarPhase(thumbCtx, thumbCanvas.width, thumbCanvas.height, phase.phaseAngle, globalState.hemisphere, true);
    });
  }

  function reRenderAllThumbnails() {
    const thumbCanvases = elements.phasesButtonContainer.querySelectorAll('.phase-thumb-canvas');
    thumbCanvases.forEach((canvas) => {
      const idx = parseInt(canvas.dataset.phaseIndex, 10);
      const phase = LUNAR_PHASES[idx];
      const ctx = canvas.getContext('2d');
      renderLunarPhase(ctx, canvas.width, canvas.height, phase.phaseAngle, globalState.hemisphere, true);
    });
  }

  function selectPhase(newIndex, playSound = true) {
    if (newIndex < 0) newIndex = LUNAR_PHASES.length - 1;
    if (newIndex >= LUNAR_PHASES.length) newIndex = 0;

    viewerState.currentPhaseIndex = newIndex;
    const selected = LUNAR_PHASES[newIndex];

    startPhaseAnimation(selected.phaseAngle);
    updatePhaseDetails(selected);

    if (playSound) {
      const baseFreq = 440 + newIndex * 40;
      playCelestialChime(baseFreq);
    }
  }

  function nextPhase() {
    selectPhase(viewerState.currentPhaseIndex + 1);
  }

  function prevPhase() {
    selectPhase(viewerState.currentPhaseIndex - 1);
  }

  function toggleAutoplay() {
    if (viewerState.isAutoplaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function startAutoplay() {
    viewerState.isAutoplaying = true;
    elements.btnAutoplay.classList.add('playing');
    elements.autoplayIcon.textContent = '⏸';
    document.getElementById('autoplay-text').textContent = 'Pausar Ciclo';

    viewerState.autoplayTimer = setInterval(() => {
      nextPhase();
    }, 2400);
  }

  function stopAutoplay() {
    viewerState.isAutoplaying = false;
    elements.btnAutoplay.classList.remove('playing');
    elements.autoplayIcon.textContent = '▶';
    document.getElementById('autoplay-text').textContent = 'Ciclo Contínuo';

    if (viewerState.autoplayTimer) {
      clearInterval(viewerState.autoplayTimer);
      viewerState.autoplayTimer = null;
    }
  }

  /* --------------------------------------------------------------------------
     8. LÓGICA DA ESPECIFICAÇÃO 2: SIMULADOR DO CICLO LUNAR (RF05 - RF08)
     -------------------------------------------------------------------------- */
  /**
   * Determina o nome astronômico da fase de acordo com o dia atual do ciclo (0 a 29,5).
   * @param {number} day - Dia atual do ciclo sinódico.
   * @returns {string} - Nome da fase lunar.
   */
  function getPhaseNameForDay(day) {
    // Ciclo sinódico de 29,5 dias dividido proporcionalmente entre as 8 fases
    // Nova: ~0.0 - 1.8 dias
    // Crescente: ~1.8 - 5.5 dias
    // Quarto Crescente: ~5.5 - 9.2 dias (pico em 7.4)
    // Gibosa Crescente: ~9.2 - 12.9 dias
    // Cheia: ~12.9 - 16.6 dias (pico em 14.75)
    // Gibosa Minguante: ~16.6 - 20.3 dias
    // Quarto Minguante: ~20.3 - 24.0 dias (pico em 22.1)
    // Minguante: ~24.0 - 27.7 dias
    // Nova: ~27.7 - 29.5 dias
    if (day < 1.84 || day >= 27.66) return 'Lua Nova';
    if (day < 5.53) return 'Lua Crescente';
    if (day < 9.22) return 'Quarto Crescente';
    if (day < 12.91) return 'Gibosa Crescente';
    if (day < 16.59) return 'Lua Cheia';
    if (day < 20.28) return 'Gibosa Minguante';
    if (day < 23.97) return 'Quarto Minguante';
    return 'Lua Minguante';
  }

  /**
   * Atualiza todos os elementos visuais, textos, barra de progresso e canvas do simulador.
   */
  function updateSimulatorUI() {
    const day = simState.currentDay;
    const total = simState.totalDays;

    // Ângulo de fase: 0 a 2*PI radianos
    const phaseAngle = (day / total) * (Math.PI * 2);

    // Porcentagem de iluminação visível: k = (1 - cos(theta)) / 2
    const illuminationFrac = (1 - Math.cos(phaseAngle)) / 2;
    const illuminationPercent = (illuminationFrac * 100).toFixed(1);

    // 1. Contador de Dias (RF07: "Dia 12,4 de 29,5")
    const formattedDay = day.toFixed(1).replace('.', ',');
    elements.simDayDisplay.textContent = `Dia ${formattedDay} de 29,5`;

    // 2. Porcentagem do ciclo e iluminação
    const cyclePercent = ((day / total) * 100).toFixed(1);
    elements.simPercentTag.textContent = `${cyclePercent}% do Ciclo`;
    elements.simIlluminationDisplay.innerHTML = `Iluminação Atual: <strong>${illuminationPercent}%</strong>`;

    // 3. Barra de Progresso
    elements.simProgressFill.style.width = `${(day / total) * 100}%`;
    elements.simProgressTrack.setAttribute('aria-valuenow', day.toFixed(1));

    // 4. Nome da Fase Atual (RF07)
    const phaseName = getPhaseNameForDay(day);
    elements.simCurrentPhaseName.textContent = phaseName;

    // 5. Renderização no Canvas da Simulação (RF05 - Reutilizando renderLunarPhase)
    const simCtx = elements.simMoonCanvas.getContext('2d');
    renderLunarPhase(simCtx, elements.simMoonCanvas.width, elements.simMoonCanvas.height, phaseAngle, globalState.hemisphere, false);

    // 6. Brilho da Corona Luminosa do Simulador
    const coronaOpacity = 0.05 + illuminationFrac * 0.35;
    const coronaScale = 0.85 + illuminationFrac * 0.35;
    elements.simLunarCorona.style.opacity = coronaOpacity.toString();
    elements.simLunarCorona.style.transform = `translate(-50%, -50%) scale(${coronaScale})`;

    // 7. Indicador de Direção Solar
    let sunText = 'Luz Solar';
    if (day < 1 || day > 28.5) {
      sunText = 'Sol atrás da Lua';
    } else if (day >= 14 && day <= 15.5) {
      sunText = 'Sol oposto à Terra';
    } else if (globalState.hemisphere === 'south') {
      sunText = (day < 14.75) ? '☀️ Luz Solar ←' : '→ Luz Solar ☀️';
    } else {
      sunText = (day < 14.75) ? '→ Luz Solar ☀️' : '☀️ Luz Solar ←';
    }
    elements.simSunText.textContent = sunText;
  }

  /**
   * Loop de simulação com requestAnimationFrame e cálculo em tempo real baseado em deltaTime.
   */
  function simulationLoop(timestamp) {
    if (!simState.isRunning) return;

    if (!simState.lastTimestamp) {
      simState.lastTimestamp = timestamp;
    }

    let deltaSeconds = (timestamp - simState.lastTimestamp) / 1000;
    // Proteção contra saltos anormais se a aba for minimizada
    if (deltaSeconds > 0.1) deltaSeconds = 0.1;
    simState.lastTimestamp = timestamp;

    // Velocidade: baseSecondsPerCycle = 29.5s (1 dia lunar/s a 1x)
    const daysPerSecond = (simState.totalDays / simState.baseSecondsPerCycle) * simState.speed;
    simState.currentDay += deltaSeconds * daysPerSecond;

    // Ciclo contínuo: ao atingir 29,5 dias, reinicia suavemente em 0
    if (simState.currentDay >= simState.totalDays) {
      simState.currentDay = simState.currentDay % simState.totalDays;
    }

    // Atualiza a interface da simulação
    updateSimulatorUI();

    // Próximo frame
    simState.animationFrameId = requestAnimationFrame(simulationLoop);
  }

  /**
   * Inicia ou retoma a animação (RF06).
   */
  function startSimulation() {
    if (simState.isRunning) return; // Evita múltiplas animações simultâneas

    // Se a Spec 1 estiver em autoplay, interrompe para evitar conflito
    if (viewerState.isAutoplaying) {
      stopAutoplay();
    }

    simState.isRunning = true;
    simState.lastTimestamp = null;

    // Atualiza estados dos botões
    elements.simBtnPlay.disabled = true;
    elements.simBtnPause.disabled = false;

    playCelestialChime(580);
    simState.animationFrameId = requestAnimationFrame(simulationLoop);
  }

  /**
   * Pausa a animação, preservando o dia e iluminação exibidos (RF06).
   */
  function pauseSimulation() {
    if (!simState.isRunning) return;

    simState.isRunning = false;
    if (simState.animationFrameId) {
      cancelAnimationFrame(simState.animationFrameId);
      simState.animationFrameId = null;
    }

    elements.simBtnPlay.disabled = false;
    elements.simBtnPause.disabled = true;
  }

  /**
   * Reinicia a animação: interrompe, retorna ao dia 0 e exibe Lua Nova (RF06).
   */
  function resetSimulation() {
    pauseSimulation();
    simState.currentDay = 0.0;
    updateSimulatorUI();

    elements.simBtnPlay.disabled = false;
    elements.simBtnPause.disabled = true;
    playCelestialChime(440);
  }

  /**
   * Altera a velocidade da simulação sem reiniciar o ciclo (RF08).
   * @param {number} newSpeed - 0.5, 1.0, 2.0 ou 4.0
   */
  function setSimulationSpeed(newSpeed) {
    simState.speed = newSpeed;

    // Atualiza classes ativas nos botões
    elements.speedButtons.forEach(btn => {
      const btnSpeed = parseFloat(btn.dataset.speed);
      if (btnSpeed === newSpeed) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Atualiza badge descritivo
    let label = '1x — Normal';
    if (newSpeed === 0.5) label = '0,5x — Lenta';
    else if (newSpeed === 2.0) label = '2x — Rápida';
    else if (newSpeed === 4.0) label = '4x — Muito rápida';

    elements.speedIndicatorBadge.textContent = label;
  }

  /* --------------------------------------------------------------------------
     9. GERENCIADOR DE ABAS (ESPECIFICAÇÃO 1 VS ESPECIFICAÇÃO 2)
     -------------------------------------------------------------------------- */
  function switchTab(target) {
    if (globalState.activeTab === target) return;
    globalState.activeTab = target;

    if (target === 'viewer') {
      elements.tabBtnViewer.classList.add('active');
      elements.tabBtnViewer.setAttribute('aria-selected', 'true');
      elements.tabBtnSimulator.classList.remove('active');
      elements.tabBtnSimulator.setAttribute('aria-selected', 'false');

      elements.viewViewer.classList.add('active');
      elements.viewSimulator.classList.remove('active');

      // Re-renderiza o canvas da Spec 1
      const ctx = elements.moonCanvas.getContext('2d');
      renderLunarPhase(ctx, elements.moonCanvas.width, elements.moonCanvas.height, viewerState.currentRenderAngle, globalState.hemisphere, false);
    } else {
      elements.tabBtnSimulator.classList.add('active');
      elements.tabBtnSimulator.setAttribute('aria-selected', 'true');
      elements.tabBtnViewer.classList.remove('active');
      elements.tabBtnViewer.setAttribute('aria-selected', 'false');

      elements.viewSimulator.classList.add('active');
      elements.viewViewer.classList.remove('active');

      // Atualiza renderização da Spec 2
      updateSimulatorUI();
    }
  }

  /* --------------------------------------------------------------------------
     10. FUNDO CÓSMICO DINÂMICO (CANVAS DE ESTRELAS E NEBULOSAS)
     -------------------------------------------------------------------------- */
  function setupCosmicBackground() {
    const canvas = elements.starsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numStars = Math.min(220, Math.floor((width * height) / 6000));
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        twinkleSpeed: Math.random() * 0.03 + 0.01
      });
    }

    function renderStars() {
      ctx.clearRect(0, 0, width, height);

      const spaceGrad = ctx.createRadialGradient(width / 2, height / 2, width * 0.1, width / 2, height / 2, width * 0.8);
      spaceGrad.addColorStop(0, '#0a0e20');
      spaceGrad.addColorStop(1, '#05070e');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        star.alpha = Math.max(0.15, Math.min(0.95, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${star.alpha})`;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = 'rgba(160, 200, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(renderStars);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    renderStars();
  }

  /* --------------------------------------------------------------------------
     11. PARALLAX INTERATIVO 3D (FEEDBACK TÁTIL)
     -------------------------------------------------------------------------- */
  function setupParallaxEffect() {
    const wrapper = elements.moonCanvasWrapper;
    if (!wrapper) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -12;
      const tiltY = (x / (rect.width / 2)) * 12;

      elements.moonCanvas.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      elements.moonCanvas.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  /* --------------------------------------------------------------------------
     12. NAVEGAÇÃO POR TECLADO
     -------------------------------------------------------------------------- */
  function setupKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (globalState.activeTab === 'viewer') {
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            nextPhase();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            prevPhase();
            break;
          case ' ':
            e.preventDefault();
            toggleAutoplay();
            break;
          case '1': case '2': case '3': case '4':
          case '5': case '6': case '7': case '8':
            e.preventDefault();
            const targetIndex = parseInt(e.key, 10) - 1;
            selectPhase(targetIndex);
            break;
        }
      } else if (globalState.activeTab === 'simulator') {
        switch (e.key) {
          case ' ':
            e.preventDefault();
            if (simState.isRunning) {
              pauseSimulation();
            } else {
              startSimulation();
            }
            break;
          case 'r': case 'R':
            e.preventDefault();
            resetSimulation();
            break;
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. INICIALIZAÇÃO DA APLICAÇÃO
     -------------------------------------------------------------------------- */
  function init() {
    // 1. Fundo cósmico
    setupCosmicBackground();

    // 2. Constrói botões das 8 fases na Spec 1 (RF01 & RF03)
    buildInteractivePhaseButtons();

    // 3. Renderiza fase inicial no visualizador (Spec 1)
    const initialPhase = LUNAR_PHASES[viewerState.currentPhaseIndex];
    viewerState.currentRenderAngle = initialPhase.phaseAngle;
    viewerState.targetAngle = initialPhase.phaseAngle;

    const ctx = elements.moonCanvas.getContext('2d');
    renderLunarPhase(ctx, elements.moonCanvas.width, elements.moonCanvas.height, viewerState.currentRenderAngle, globalState.hemisphere, false);
    updatePhaseDetails(initialPhase);

    // 4. Inicializa o simulador na Lua Nova (Spec 2 - RF05, RF06, RF07)
    updateSimulatorUI();

    // 5. Conecta controles da Spec 1
    elements.btnPrevPhase.addEventListener('click', prevPhase);
    elements.btnNextPhase.addEventListener('click', nextPhase);
    elements.btnAutoplay.addEventListener('click', toggleAutoplay);

    // 6. Conecta controles da Spec 2 (RF06 & RF08)
    elements.simBtnPlay.addEventListener('click', startSimulation);
    elements.simBtnPause.addEventListener('click', pauseSimulation);
    elements.simBtnReset.addEventListener('click', resetSimulation);

    elements.speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = parseFloat(btn.dataset.speed);
        setSimulationSpeed(speed);
      });
    });

    // 7. Conecta abas de navegação
    elements.tabBtnViewer.addEventListener('click', () => switchTab('viewer'));
    elements.tabBtnSimulator.addEventListener('click', () => switchTab('simulator'));

    // 8. Conecta Seletor de Hemisfério (afeta ambas as especificações)
    elements.btnHemiSouth.addEventListener('click', () => {
      if (globalState.hemisphere === 'south') return;
      globalState.hemisphere = 'south';
      elements.btnHemiSouth.classList.add('active');
      elements.btnHemiSouth.setAttribute('aria-pressed', 'true');
      elements.btnHemiNorth.classList.remove('active');
      elements.btnHemiNorth.setAttribute('aria-pressed', 'false');

      // Atualiza visualizador
      renderLunarPhase(ctx, elements.moonCanvas.width, elements.moonCanvas.height, viewerState.currentRenderAngle, globalState.hemisphere, false);
      reRenderAllThumbnails();
      updatePhaseDetails(LUNAR_PHASES[viewerState.currentPhaseIndex]);

      // Atualiza simulador
      updateSimulatorUI();
    });

    elements.btnHemiNorth.addEventListener('click', () => {
      if (globalState.hemisphere === 'north') return;
      globalState.hemisphere = 'north';
      elements.btnHemiNorth.classList.add('active');
      elements.btnHemiNorth.setAttribute('aria-pressed', 'true');
      elements.btnHemiSouth.classList.remove('active');
      elements.btnHemiSouth.setAttribute('aria-pressed', 'false');

      renderLunarPhase(ctx, elements.moonCanvas.width, elements.moonCanvas.height, viewerState.currentRenderAngle, globalState.hemisphere, false);
      reRenderAllThumbnails();
      updatePhaseDetails(LUNAR_PHASES[viewerState.currentPhaseIndex]);

      updateSimulatorUI();
    });

    // 9. Conecta Som
    elements.soundToggleBtn.addEventListener('click', () => {
      globalState.soundEnabled = !globalState.soundEnabled;
      elements.soundIcon.textContent = globalState.soundEnabled ? '🔊' : '🔇';
      elements.soundToggleBtn.title = globalState.soundEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros';
      if (globalState.soundEnabled) {
        initAudio();
        playCelestialChime(660);
      }
    });

    // 10. Efeitos táteis e teclado
    setupParallaxEffect();
    setupKeyboardNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
