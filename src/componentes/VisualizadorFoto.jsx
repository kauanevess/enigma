function VisualizadorFoto({ foto, aoFechar }) {
  if (!foto) {
    return null;
  }

  return (
    <section className="visualizador visualizador-foto">
      <header className="barra-janela">
        <span>{foto.nome} — Fotos</span>

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
        <img
          src={foto.caminho}
          alt={foto.nome}
          draggable={false}
        />
      </div>

      <footer className="rodape-visualizador">
        <span>{foto.nome}</span>
      </footer>
    </section>
  );
}

export default VisualizadorFoto;