import React, { useState, useEffect } from 'react';
import './App.css'; // Importa o CSS para o estilo

// --- Dados Simulados da Missão (Definidos fora para evitar recriação desnecessária) ---
const dadosMissao = {
  nomeComandante: 'Gabriel',
  planetaDestino: 'Krypton-5',
  fusoGalactico: 'Terra-24h',
  distanciaPercorrida: 85000000,
  distanciaTotal: 100000000,
  infoDestino: {
    nome: 'Krypton-5',
    temperatura: 45,
    gravidade: 1.5,
    descricao: 'Planeta quente e denso, com vastas planícies de silicato. Requer proteção térmica e anti-gravidade.',
    clima: 'Extremamente Quente',
  },
  previsao: [
    { clima: 'Alta Radiação Cósmica', umidadeSolar: 10, radiacaoCosmica: 95 },
    { clima: 'Ventos Solares Moderados', umidadeSolar: 40, radiacaoCosmica: 50 },
    { clima: 'Névoa Estelar', umidadeSolar: 75, radiacaoCosmica: 15 },
  ],
  relatorio: [
    '23:15: Ativação bem-sucedida do motor de dobra (Warp Drive).',
    '05:30: Correção de rota após detectar anomalia gravitacional.',
    '12:00: Relatório de consumo de energia dentro do esperado.',
    '18:45: Primeiras imagens visuais do Krypton-5 capturadas.',
  ]
};

// --- Componente DashboardEspacial (Contém a lógica de agregação) ---
function DashboardEspacial() {

  // --- Componentes Auxiliares Aninhados ---

  const SaudacaoComandante = ({ nome }) => (
    <h3 className="saudacao">Olá, Comandante {nome}! Sua missão aguarda.</h3>
  );

  const DataGalactica = ({ fuso, planeta }) => {
    const [dataAtual, setDataAtual] = useState(new Date());

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    });

    const tick = () => {
      setDataAtual(new Date());
    }

    const hora = dataAtual.toLocaleTimeString('pt-BR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const diaSemana = ['Solar', 'Plasma', 'Gravidade', 'Órbita', 'Astro', 'Quasar', 'Buraco Negro'][dataAtual.getDay()];
    const dia = dataAtual.getDate();
    const mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][dataAtual.getMonth()];
    const anoGalactico = dataAtual.getFullYear() + 2500;

    return (
      <div className="data-galactica">
        <p className="data-texto">
          Data Estelar: **{diaSemana}, {dia}-{mes}-{anoGalactico}**
        </p>
        <p className="hora-texto">
          Horário ({fuso} - {planeta}): **{hora}**
        </p>
      </div>
    );
  };

  const StatusMissao = ({ distanciaPercorrida, distanciaTotal, progresso, destino }) => {
    const progressoFixo = progresso.toFixed(1);
    const maxPontos = distanciaTotal;
    const pontos = distanciaPercorrida;
    const corBarra = progresso < 30 ? '#d9534f' : (progresso < 70 ? '#f0ad4e' : '#5cb85c');

    return (
      <div className="status-missao">
        <h3 className="module-title">Status da Missão</h3>
        <h4 className="destino-label">Destino: {destino}</h4>
        <p className="pontos-info">Distância Percorrida: {pontos.toLocaleString()} / {maxPontos.toLocaleString()} km</p>
        <div className="progress-bar-container" style={{
          width: '100%',
          height: '25px',
          backgroundColor: '#444',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 5px rgba(0, 255, 255, 0.5) inset'
        }}>
          <div style={{
            width: `${progressoFixo}%`,
            height: '100%',
            backgroundColor: corBarra,
            transition: 'all 0.5s ease',
            borderRadius: '12px',
            boxShadow: `0 0 10px ${corBarra}77`
          }}>
          </div>
        </div>
        <p className="progresso-percentual">{progressoFixo}% Completo</p>
      </div>
    );
  };

  const InfoPlaneta = ({ info }) => {
    const { nome, temperatura, gravidade, descricao, clima } = info;

    const getIconeClima = (clima) => {
      const icones = {
        'extremamente quente': '🔥',
        'frio intenso': '🥶',
        'tempestades de poeira': '🌪️',
        'atmosfera densa': '🌫️',
        'estável': '✨',
      };
      return icones[clima.toLowerCase()] || '🌍';
    };

    const getCorTemperatura = (temp) => {
      if (temp < 0) return '#4a90e2';
      if (temp < 30) return '#f5a623';
      return '#d0021b';
    };

    return (
      <div className="info-planeta">
        <h3 className="module-title">Planeta Destino: {nome}</h3>
        <div className="clima-icon" style={{ fontSize: '40px', margin: '10px 0' }}>
          {getIconeClima(clima)}
        </div>
        <div className="detalhes">
          <p>
            <strong>Temperatura:</strong>
            <span style={{ color: getCorTemperatura(temperatura), fontWeight: 'bold' }}>
              {temperatura}°C
            </span>
          </p>
          <p><strong>Clima:</strong> {clima}</p>
          <p><strong>Gravidade:</strong> {gravidade} g</p>
          <p className="descricao-planeta">{descricao}</p>
        </div>
      </div>
    );
  };

  const PrevisaoEspacial = ({ previsoes }) => {
    const getIcone = (clima) => {
      const icones = {
        'alta radiação cósmica': '☢️',
        'ventos solares moderados': '💨',
        'névoa estelar': '🌌',
        'campo eletromagnético estável': '🛡️',
        'chuva de meteoros': '☄️'
      };
      return icones[clima.toLowerCase()] || '🌟';
    };

    return (
      <div className="previsao-espacial">
        <h3 className="module-title">Previsão do Tempo Espacial</h3>
        <div className="previsao-grid">
          {previsoes.map((previsao, index) => (
            <div key={index} className="previsao-card">
              <div className="icone-previsao">{getIcone(previsao.clima)}</div>
              <p className="clima-nome">**{previsao.clima}**</p>
              <p>Umidade Solar: {previsao.umidadeSolar}%</p>
              <p>Radiação Cósmica: <span className={previsao.radiacaoCosmica > 80 ? 'alerta-alto' : ''}>
                {previsao.radiacaoCosmica} uSv
              </span></p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RelatorioBordo = ({ eventos }) => (
    <div className="relatorio-bordo">
      <h3 className="module-title">Relatório de Bordo (Eventos)</h3>
      <ol className="eventos-lista">
        {eventos.map((evento, index) => (
          <li key={index} className="evento-item">
            {evento}
          </li>
        ))}
      </ol>
    </div>
  );

  // --- Lógica Principal do Dashboard ---
  const progresso = (dadosMissao.distanciaPercorrida / dadosMissao.distanciaTotal) * 100;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Painel de Comando Interplanetário</h1>
      <h2 className="dashboard-subtitle">Missão: {dadosMissao.planetaDestino}</h2>

      <SaudacaoComandante nome={dadosMissao.nomeComandante} />

      <div className="dashboard-grid">
        <div className="module full-width">
          <DataGalactica fuso={dadosMissao.fusoGalactico} planeta={dadosMissao.planetaDestino} />
        </div>

        <div className="module">
          <StatusMissao
            distanciaPercorrida={dadosMissao.distanciaPercorrida}
            distanciaTotal={dadosMissao.distanciaTotal}
            progresso={progresso}
            destino={dadosMissao.planetaDestino}
          />
        </div>

        <div className="module">
          <RelatorioBordo eventos={dadosMissao.relatorio} />
        </div>

        <div className="module module-planet-info">
          <InfoPlaneta info={dadosMissao.infoDestino} />
        </div>

        <div className="module full-width">
          <PrevisaoEspacial previsoes={dadosMissao.previsao} />
        </div>
      </div>

      <footer className="dashboard-footer">
        Comando Principal Online - Versão 3.14.15
      </footer>
    </div>
  );
}

// --- Componente Principal App (Exportado) ---
function App() {
  return (
    <div className="main-app">
      <DashboardEspacial />
    </div>
  );
}

export default App;