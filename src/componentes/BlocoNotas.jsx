function BlocoNotas({
  titulo = "Sem título",
  conteudo = "",
  aoFechar,
}) {
  return (
    <section className="bloco-notas">
      <header className="barra-janela">
        <span>{titulo} — Bloco de Notas</span>

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

      <nav className="menu-bloco">
        <span>Arquivo</span>
        <span>Editar</span>
        <span>Exibir</span>
      </nav>

      <textarea
        value={conteudo}
        readOnly
        spellCheck={false}
      />
    </section>
  );
}

export default BlocoNotas;