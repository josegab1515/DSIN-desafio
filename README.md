# 🕹️ PROTOCOLO PROMETHEUS // SISTEMA F.O.G.O.
### Ferramenta Onisciente de Gestão e Operações de Trânsito e Mobilidade Urbana
**DSIN CODERCHALLENGE 2026 — ETAPA BÔNUS (PROJETO CAMPEÃO)**

> *"Uma cidade que pensa à frente. Construa uma visão integrada da mobilidade urbana, transforme dados em decisões e mostre a PROMETHEUS o que uma boa solução é capaz de antecipar."*

---

## 🌟 Visão Geral & Diferenciais Inovadores

O **SISTEMA F.O.G.O.** foi construído com uma identidade visual temática imersiva em **Pixel Art / Retro-Futurista CICC (Centro Integrado de Comando e Controle)** inspirada no universo arcade e no codinome PROMETHEUS, combinada com arquitetura de software de nível empresarial:

1. **Design System Dual Inteligente:**
   * 🕹️ **Modo Arcade / Pixel Art:** Estética retro 16-bit com fontes bitmap (*Silkscreen*, *Press Start 2P*, *VT323*), molduras com chanfros táteis, scanlines CRT e síntese sonora chiptune nativa via **Web Audio API** (sem arquivos externos de áudio!).
   * 👔 **Modo Modern High-Tech (Clean Dark):** Alternador no cabeçalho que converte instantaneamente toda a interface e o mapa para um layout corporativo minimalista de alta precisão.
2. **"Roda de Primeira com um Sorriso no Rosto":**
   * Sem dependências de Docker ou bancos de dados externos lentos/frágeis. A base inicia instantaneamente pré-carregada com dados realistas da cidade de **Marília/SP (sede da DSIN)**: corredores viários (Av. Sampaio Vidal, Tiradentes, Esmeraldas, Rodovia SP-294 KM 451), viaturas da Guarda Municipal, PM, motos de trânsito e sensores IoT.
   * Persistência em `localStorage` com suporte total a **Exportação e Importação de Backup JSON** e botão de restauração.
3. **Simulador de Telemetria Viva:**
   * Micro-deslocamento em tempo real de viaturas em patrulha.
   * Flutuação térmica de chips IoT, variação de tensão e sinal de rede.
   * Botão para **Simular Incidente Aleatório** em tempo real com disparo de alerta sonoro.

---

## 🏗️ As 3 Partes do Desafio F.O.G.O. 100% Resolvidas

### 1ª Parte – Inventário Inteligente da Cidade
- **Catalogação Completa de Ativos IoT:**
  - Radares de velocidade, avanço de semáforo e conversão proibida calibrados em cruzamentos reais de Marília/SP.
  - Câmeras de videomonitoramento com visão noturna, resolução 4K, cor e IA LPR (leitura de placas).
  - Balança rodoviária de pesagem em movimento (WIM - Weigh in Motion) na Rodovia SP-294.
  - Veículos autônomos de fiscalização da Zona Azul e totens de autoatendimento (Pix/Cartão/Solar).
  - Patinetes elétricos compartilhados com cerca virtual (Geofence).
  - Viaturas da Guarda Municipal, viaturas da Polícia Militar, motos dos agentes e drone aéreo RTK.
- **Visor Holográfico 3D & Telemetria em Tempo Real:**
  - **Google Street View 360° Embutido:** Visualização real e panorâmica do cruzamento sem sair do painel.
- **Polimorfismo Dinâmico de Atributos:** Formulário modal reativo que adapta os campos técnicos específicos de acordo com a categoria selecionada.
- **Rastreamento de Manutenções:** Classificação de necessidade (Nenhuma, Imediata ou Agendada/Periódica) com data limite e emissão de O.S.
- **Cadastro Integrado de Agentes:** Agentes de trânsito, Guardas Municipais e Policiais Militares (matrícula, corporação, canal de rádio, viatura vinculada e status).

### 2ª Parte – Central de Operações da Cidade (CICC)
- **Dashboard Integrado com Mapa Interativo (Leaflet):**
  - Marcadores temáticos em Pixel Art para cada tipo de equipamento e agente operacional.
  - Halos de alerta pulsantes para equipamentos furtados ou com manutenção imediata pendente.
  - Centralização suave por coordenadas (`flyTo`) sem recuo indesejado ou bugs de câmera.
  - Filtros dinâmicos rápidos por tipo de equipamento, situação, bairro/região, órgão responsável e manutenções urgentes.
- **Indicadores Gerais (KPIs):** Total de dispositivos IoT, % de disponibilidade da rede urbana, equipamentos indisponíveis, agentes em atividade e manutenções imediatas pendentes.
- **Feed de Ocorrências Críticas:** Alertas em tempo real com severidade, link direto para focar no mapa e botão para resolver a ocorrência.
- **Saúde Operacional Consolidada:** Matriz por bairros classificando setores em *Normal*, *Atenção* ou *Crítico*, respondendo instantaneamente se algo está acontecendo na cidade agora.
- **Drawer de Telemetria Técnica:** Clique em qualquer marcador para inspecionar gráficos de temperatura, voltagem, sinal de rede dBm e histórico.

### 3ª Parte – Cidade Preditiva (O Amanhã da Mobilidade)
- **Simulador de Cenários Futuristas "What-If":**
  - O que acontece amanhã? Simulação interativa por horizontes: *Hoje*, *Amanhã (Terça-Feira)*, *Fim de Semana* e *Dia de Pagamento*.
  - Simulação de impacto climático: *Tempo Seco (1.0x)*, *Chuva Leve (+25%)* e *Tempestade (+55%)*.
  - Teste de decisão operacional em tempo real: adicione viaturas simuladas em bairros críticos e veja o índice de risco despencar na hora!
- **Mapa de Calor Geográfico/Topológico Interativo:**
  - Mini mapa vetorial SVG de Marília com manchas térmicas radiais e gradientes pulsantes nos bairros vulneráveis.
- **Linha do Tempo Preditiva 24h:**
  - Curva de projeção horária de fluxo, espera semafórica em segundos e probabilidade de acidentes com modo de reprodução automática (Autoplay).
- **Previsão de Falhas de Hardware (MTBF & RUL):**
  - Curva de degradação residual (Remaining Useful Life) ao longo de 5 semanas, alerta de parada iminente e cálculo financeiro de custos evitados (R$ 28.400/mês).
- **Detecção de Anomalias com Curva Normal de Gauss:**
  - Gráfico de distribuição normal ilustrando os limites de tolerância ($\pm 2\sigma$) e pontos anômalos detectados ($|Z| > 2.5\sigma$).
- **Fichas Técnicas dos Modelos (Explainable AI - XAI):**
  - Modal com documentação transparente de cada algoritmo: alvo previsto, features consideradas, metodologia estatística e benefício prático na decisão.
- **Boletim Executivo Preditivo para Gabinete:**
  - Relatório executivo completo formatado para impressão ou exportação em PDF.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js v18+ (testado e homologado com Node v24).
* Navegador moderno (Chrome, Firefox, Edge, Safari, Opera).

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/josegab1515/DSIN-desafio.git
cd DSIN-desafio

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o seu navegador e acerte a URL informada pelo terminal:
👉 **`http://localhost:5173/`**

Para gerar o bundle de produção compilado:
```bash
npm run build
npm run preview
```

---

## 🤖 Declaração de Transparência sobre Uso de IA

Em estrito cumprimento às instruções do Desafio:
> *"O uso de IA para auxiliar no projeto é opcional. Mas se fizer uso de alguma, mencione qual(is), assim PROMETHEUS saberá de qual ficar com ciúmes! Também é importante que você demonstre que tem entendimento daquilo que ela construiu."*

* **IA Utilizada:** Antigravity / Gemini 3.8 Flash (Google DeepMind).
* **Entendimento Técnico & Domínio do Código:**
  * O código-fonte é 100% modular, componentizado em TypeScript e estruturado nos princípios SOLID e Clean Code.
  * O motor de áudio utiliza a **Web Audio API nativa** para gerar ondas `square`, `sawtooth` e `triangle` em frequências musicais exatas sem requisições HTTP adicionais.
  * Os algoritmos preditivos utilizam estatística de desvio padrão ($Z = \frac{x - \mu}{\sigma}$) e matriz de risco multicritério.
  * Todas as decisões de arquitetura e lógica de negócios estão documentadas na aba **"MANUAL / IA"** dentro da própria aplicação em execução.

---

## 🛠️ Stack Tecnológica

* **Frontend:** React 19 + TypeScript + Vite
* **Mapas & Geoprocessamento:** Leaflet + React-Leaflet
* **Design & Estética:** Vanilla CSS moderno + Design System Pixel Art 8-Bit / 16-Bit + Temas modulares
* **Áudio:** Web Audio API (Chiptune Oscillator Synthesizer)
* **Ícones:** SVG Pixel Art artesanal + Lucide React
* **Persistência:** LocalStorage Engine com Backup JSON

---

*Desenvolvido para o desafio da DSIN Tecnologia.* 🚀
