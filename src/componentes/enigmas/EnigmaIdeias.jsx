import { useState } from "react";
import {
  FaCheckCircle,
  FaPalette,
  FaSearch,
} from "react-icons/fa";
import {
  mensagemBananao,
  respostasBananao,
} from "../../data/bananao";

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!?'"´`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function EnigmaIdeias({
  aoConcluir,
  aoFechar,
}) {
  const [resposta, setResposta] =
    useState("");

  const [mensagem, setMensagem] =
    useState("");

  const [concluido, setConcluido] =
    useState(false);

  function verificar(evento) {
    evento.preventDefault();

    const respostaNormalizada =
      normalizarTexto(resposta);

    const acertou = respostasBananao.some(
      (respostaCorreta) =>
        normalizarTexto(respostaCorreta) ===
        respostaNormalizada
    );

    if (!acertou) {
      setMensagem(
        "o sistema reconheceu a cor, mas não reconheceu esse nome."
      );
      return;
    }

    localStorage.setItem(
      "padrao-visual-identificado",
      "bananão"
    );

    setConcluido(true);
    setMensagem(mensagemBananao.texto);

    aoConcluir("ideias");
  }

  return (
    <section className="janela-enigma">
      <header className="barra-janela">
        <span>verificar_padrao.exe</span>

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
              PADRÃO CONFIRMADO
            </p>

            <h2>{mensagemBananao.titulo}</h2>

            <div className="resultado-bananao">
              <span>
                cor predominante
                <strong>amarelo</strong>
              </span>

              <span>
                nível de combinação
                <strong>
                  completamente desnecessário
                </strong>
              </span>

              <span>
                identificação oficial
                <strong>BANANÃO</strong>
              </span>
            </div>

            <p>
              último arquivo desbloqueado.
            </p>

            <button
              type="button"
              onClick={aoFechar}
            >
              abrir último arquivo
            </button>
          </div>
        ) : (
          <>
            <div className="icone-bananao">
              <FaPalette />
            </div>

            <p className="rotulo-enigma">
              ANÁLISE DE PADRÃO VISUAL
            </p>

            <h2>
              qual foi o nome dado a essa combinação?
            </h2>

            <p className="instrucao-enigma">
              analise as seis imagens e o registro
              em vídeo. A resposta não é apenas
              uma cor.
            </p>

            <form onSubmit={verificar}>
              <div className="entrada-bananao">
                <FaSearch />

                <input
                  type="text"
                  value={resposta}
                  onChange={(evento) => {
                    setResposta(
                      evento.target.value
                    );
                    setMensagem("");
                  }}
                  placeholder="nome oficial do padrão"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <button type="submit">
                verificar padrão
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

export default EnigmaIdeias;