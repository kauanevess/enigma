import {
  FaFolderOpen,
  FaPlay,
} from "react-icons/fa";

function EnigmaFinal({
  aoAbrirSurpresa,
  aoFechar,
}) {
  return (
    <section className="janela-enigma">
      <header className="barra-janela">
        <span>mega-surpresa.exe</span>

        <button
          className="fechar-janela"
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
        >
          ×
        </button>
      </header>

      <div className="conteudo-enigma">
        <FaFolderOpen className="icone-enigma-grande" />

        <p className="rotulo-enigma">
          ÚLTIMO ARQUIVO
        </p>

        <h2>arquivo anexado encontrado</h2>

        <p className="instrucao-enigma">
          o sistema encontrou um álbum que não
          estava listado nas outras pastas.
        </p>

        <button
          type="button"
          onClick={aoAbrirSurpresa}
        >
          <FaPlay />
          executar arquivo
        </button>
      </div>
    </section>
  );
}

export default EnigmaFinal;