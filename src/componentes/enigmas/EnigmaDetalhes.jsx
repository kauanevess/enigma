import { useState } from "react";
import {
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!?;:_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function EnigmaDetalhes({
  aoConcluir,
  aoFechar,
}) {
  const [resposta, setResposta] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [concluido, setConcluido] =
    useState(false);

  function verificar(evento) {
    evento.preventDefault();

    const texto = normalizarTexto(resposta);

    const encontrouLirios =
      texto.includes("lirios");

    const encontrouGerberas =
      texto.includes("gerberas");

    if (!encontrouLirios || !encontrouGerberas) {
      setMensagem(
        "ainda falta localizar um ou mais registros. compare a lista com todas as imagens da pasta."
      );

      return;
    }

    localStorage.setItem(
      "fragmento-buques",
      "68"
    );

    setMensagem("");
    setConcluido(true);

    if (aoConcluir) {
      aoConcluir();
    }
  }

  return (
    <section className="janela-enigma">
      <header className="barra-janela">
        <span>localizar_arquivos.exe</span>

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
        {concluido ? (
          <div className="enigma-concluido">
            <FaCheckCircle />

            <p className="rotulo-enigma">
              VERIFICAÇÃO CONCLUÍDA
            </p>

            <h2>dois arquivos estavam ausentes</h2>

            <div className="resultado-arquivos">
              <p>06_lirios.jpg</p>
              <p>08_gerberas.jpg</p>
            </div>

            <p>
              as posições dos arquivos ausentes
              formaram o primeiro fragmento:
            </p>

            <strong className="fragmento-recuperado">
              68
            </strong>

            <button
              type="button"
              onClick={aoFechar}
            >
              continuar
            </button>
          </div>
        ) : (
          <>
            <FaSearch className="icone-enigma-grande" />

            <p className="rotulo-enigma">
              ARQUIVOS INCOMPLETOS
            </p>

            <h2>
              dois registros da lista não possuem
              imagem nesta pasta
            </h2>

            <p className="instrucao-enigma">
              abra o arquivo{" "}
              <strong>
                registro_de_entregas.txt
              </strong>
              , compare a lista com as seis fotos
              e informe os dois buquês ausentes.
            </p>

            <form onSubmit={verificar}>
              <input
                type="text"
                value={resposta}
                onChange={(evento) => {
                  setResposta(evento.target.value);
                  setMensagem("");
                }}
                placeholder="digite os dois registros ausentes"
                autoComplete="off"
                autoFocus
              />

              <button
                type="submit"
                disabled={!resposta.trim()}
              >
                verificar arquivos
              </button>
            </form>

            {mensagem && (
              <p className="erro-enigma">
                {mensagem}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default EnigmaDetalhes;