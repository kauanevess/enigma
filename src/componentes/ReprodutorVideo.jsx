import { useState } from "react";

function ReprodutorVideo({ video, aoFechar }) {
  const [terminou, setTerminou] = useState(false);

  if (!video) {
    return null;
  }

  const legenda =
    video.legenda ||
    "eu sabia exatamente qual seria a sua reação kkkkk";

  return (
    <section className="visualizador visualizador-video">
      <header className="barra-janela">
        <span>{video.nome} — Reprodutor de Mídia</span>

        <div className="controles-janela">
          <button type="button" aria-label="Minimizar">
            ─
          </button>

          <button type="button" aria-label="Maximizar">
            □
          </button>

          <button
            className="fechar-janela"
            type="button"
            onClick={aoFechar}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      </header>

      <div className="visualizador-conteudo">
        <video
          controls
          autoPlay
          playsInline
          onPlay={() => setTerminou(false)}
          onEnded={() => setTerminou(true)}
        >
          <source
            src={video.caminho}
            type="video/mp4"
          />

          Seu navegador não conseguiu abrir o vídeo.
        </video>
      </div>

      {terminou && (
        <p className="legenda-video">{legenda}</p>
      )}
    </section>
  );
}

export default ReprodutorVideo;