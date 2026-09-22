import {
  useEffect,
  useRef,
  useState,
} from "react";
import "../Musica.css";
import {
  FaCompactDisc,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from "react-icons/fa";
import { musicaCompleta } from "../data/nossamusica";

function formatarTempo(segundos) {
  if (
    !Number.isFinite(segundos) ||
    segundos < 0
  ) {
    return "0:00";
  }

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(
    segundos % 60
  )
    .toString()
    .padStart(2, "0");

  return `${minutos}:${segundosRestantes}`;
}

function ReprodutorMusica({ aoFechar }) {
  const audioRef = useRef(null);

  const [tocando, setTocando] =
    useState(false);

  const [tempoAtual, setTempoAtual] =
    useState(0);

  const [duracao, setDuracao] =
    useState(0);

  const [volume, setVolume] =
    useState(0.8);

  const [erroCapa, setErroCapa] =
    useState(false);

  const [erroAudio, setErroAudio] =
    useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    audio.volume = volume;

    const tentativa = audio.play();

    if (tentativa) {
      tentativa
        .then(() => {
          setTocando(true);
        })
        .catch(() => {
          setTocando(false);
        });
    }

    return () => {
      audio.pause();
    };
  }, []);

  function alternarReproducao() {
    const audio = audioRef.current;

    if (!audio || erroAudio) {
      return;
    }

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setTocando(true);
        })
        .catch(() => {
          setErroAudio(true);
          setTocando(false);
        });

      return;
    }

    audio.pause();
    setTocando(false);
  }

  function atualizarTempo() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setTempoAtual(audio.currentTime);
  }

  function carregarDuracao() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setDuracao(audio.duration);
    setErroAudio(false);
  }

  function alterarTempo(evento) {
    const novoTempo = Number(
      evento.target.value
    );

    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime =
      novoTempo;

    setTempoAtual(novoTempo);
  }

  function alterarVolume(evento) {
    const novoVolume = Number(
      evento.target.value
    );

    setVolume(novoVolume);

    if (audioRef.current) {
      audioRef.current.volume =
        novoVolume;
    }
  }

  function musicaTerminou() {
    setTocando(false);
    setTempoAtual(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  function fecharPlayer() {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    aoFechar();
  }

  return (
    <section className="janela-musica">
      <header className="barra-janela">
        <span>nossa_musica.exe</span>

        <div className="controles-janela">
          <button
            type="button"
            aria-label="Minimizar"
          >
            ─
          </button>

          <button
            type="button"
            aria-label="Maximizar"
          >
            □
          </button>

          <button
            className="fechar-janela"
            type="button"
            onClick={fecharPlayer}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      </header>

      <div className="conteudo-musica">
        <div
          className={`capa-musica ${
            tocando ? "capa-tocando" : ""
          }`}
        >
          {!erroCapa ? (
            <img
              src={musicaCompleta.capa}
              alt="Capa da nossa música"
              onError={() =>
                setErroCapa(true)
              }
            />
          ) : (
            <FaCompactDisc />
          )}

          <div className="brilho-capa" />
        </div>

        <div className="informacoes-musica">
          <span className="tocando-agora">
            TOCANDO AGORA
          </span>

          <h2>{musicaCompleta.titulo}</h2>

          <p className="artista-musica">
            {musicaCompleta.artista}
          </p>

          <p className="mensagem-musica">
            {musicaCompleta.mensagem}
          </p>
        </div>

        <audio
          ref={audioRef}
          src={musicaCompleta.caminho}
          preload="metadata"
          onTimeUpdate={atualizarTempo}
          onLoadedMetadata={carregarDuracao}
          onEnded={musicaTerminou}
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          onError={() => {
            setErroAudio(true);
            setTocando(false);
          }}
        />

        {erroAudio && (
          <p className="erro-player">
            não foi possível carregar a música.
            confira o arquivo em
            public/assets/musicas.
          </p>
        )}

        <div className="progresso-musica">
          <input
            type="range"
            min="0"
            max={duracao || 0}
            step="0.1"
            value={tempoAtual}
            onChange={alterarTempo}
            aria-label="Progresso da música"
          />

          <div className="tempos-musica">
            <span>
              {formatarTempo(tempoAtual)}
            </span>

            <span>
              {formatarTempo(duracao)}
            </span>
          </div>
        </div>

        <div className="controles-musica">
          <button
            className="botao-play-musica"
            type="button"
            onClick={alternarReproducao}
            disabled={erroAudio}
            aria-label={
              tocando
                ? "Pausar música"
                : "Reproduzir música"
            }
          >
            {tocando ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>

          <div className="controle-volume">
            <FaVolumeUp />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={alterarVolume}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReprodutorMusica;