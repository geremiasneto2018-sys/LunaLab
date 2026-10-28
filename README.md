# LunaLab • Laboratório Astronômico Lunar

LunaLab é uma aplicação web astronômica e educacional de alta precisão, desenvolvida exclusivamente com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)**, sem qualquer dependência de bibliotecas ou frameworks externos.

O projeto segue um modelo de desenvolvimento incremental baseado em especificações científicas e funcionais rigorosas.

---

## 🌟 Especificações Implementadas

### 🌔 Especificação 1 — Visualização Interativa das Fases da Lua
- **RF01 — Exibição das oito fases:** Apresentação sequencial das 8 fases lunares (Lua Nova, Lua Crescente, Quarto Crescente, Gibosa Crescente, Lua Cheia, Gibosa Minguante, Quarto Minguante e Lua Minguante).
- **RF02 — Representação visual fidedigna:** Renderizador procedural em Canvas calculando com precisão geométrica a linha do terminador esférico, mares basálticos (*Imbrium*, *Serenitatis*, *Tranquillitatis*), crateras reais com sistemas de raios ejetados (*Tycho*, *Copernicus*) e suporte óptico ao **Hemisfério Sul (Brasil)** e **Hemisfério Norte**.
- **RF03 — Seleção interativa:** 8 cartões interativos com miniaturas em tempo real, botões Anterior/Próxima, modo de ciclo contínuo e navegação por teclado (teclas `1` a `8` e setas `←` / `→`).
- **RF04 — Nome e descrição dinâmica:** Painel em glassmorphism apresentando nome em português, subtítulo internacional, mecânica celeste, parâmetros técnicos (horários de nascer/pôr, iluminação, idade e elongação) e curiosidades científicas.

### ⏱️ Especificação 2 — Simulação do Ciclo Lunar
- **RF05 — Simulação animada do ciclo sinódico:** Animação fluida e contínua via `requestAnimationFrame` simulando a translação e variação de iluminação ao longo de um ciclo lunar de **29,5 dias**. Inicia na Lua Nova, evolui progressivamente pelas fases crescentes até a Lua Cheia, percorre as fases minguantes e retorna suavemente à Lua Nova. A renderização física reutiliza com alta eficiência o motor gráfico desenvolvido na Spec 1.
- **RF06 — Controles completos da simulação:**
  - **Iniciar:** Começa ou retoma a animação, prevenindo múltiplas execuções simultâneas.
  - **Pausar:** Interrompe a animação, preservando o dia atual e a iluminação congelados.
  - **Reiniciar:** Interrompe a simulação, reseta o tempo para o dia 0,0, restaura a Lua Nova e zera a barra de progresso.
- **RF07 — Contador de dias e sincronização de fase:** Exibição em tempo real do dia aproximado no formato `Dia 12,4 de 29,5`, com porcentagem do ciclo, porcentagem de iluminação instantânea e identificação automática da fase lunar correspondente.
- **RF08 — Controle de velocidade:** Quatro velocidades selecionáveis em tempo real (`0,5x — Lenta`, `1x — Normal`, `2x — Rápida`, `4x — Muito rápida`), alterando o ritmo da simulação instantaneamente sem reiniciar o ciclo.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica, acessibilidade via atributos ARIA (`tablist`, `tabpanel`, `progressbar`, `aria-live`).
- **CSS3:** Sistema de design espacial escuro, glassmorphism com `backdrop-filter`, paleta de alto contraste, animações de brilho lunar e layout 100% responsivo para mobile, tablet e desktop.
- **JavaScript Puro (Vanilla JS):** Arquitetura orientada a módulos e estados independentes, cálculo de tempo delta (`deltaTime`), física trigonométrica e sintetizador de áudio harmônico via Web Audio API.
- **HTML5 Canvas API:** Renderização procedural da superfície e projeção esférica ortográfica do terminador lunar.

---

## 🚀 Como Executar Localmente

Como o projeto é construído exclusivamente com tecnologias web nativas, não requer instalação de dependências ou build:

1. Clone o repositório:
   ```bash
   git clone https://github.com/geremiasneto2018-sys/LunaLab.git
   cd LunaLab
   ```

2. Abra o arquivo `index.html` em qualquer navegador moderno, ou inicie um servidor HTTP local:
   ```bash
   python -m http.server 8080
   ```
   Acesse no navegador: `http://localhost:8080`

---

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
| :--- | :--- |
| `←` / `→` | Navegar entre fases (Visualizador - Spec 1) |
| `1` a `8` | Selecionar fase específica (Visualizador - Spec 1) |
| `Espaço` | Alternar Reprodução/Pausa (Simulador na Spec 2 ou Ciclo na Spec 1) |
| `R` | Reiniciar simulação para o Dia 0 (Simulador - Spec 2) |