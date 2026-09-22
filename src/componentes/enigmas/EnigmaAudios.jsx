import { useState } from "react";
import {
  FaCheckCircle,
  FaCompactDisc,
  FaMusic,
} from "react-icons/fa";
import {
  respostasNossaMusica,
} from "../../data/nossamusica";

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!?'"´`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function EnigmaAudios({
  aoConcluir,
  aoAbrirMusica,
  aoFechar,
}) {
  const [resposta, setResposta] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [concluido, setConcluido] =
    useState(false);

  function verificar(evento) {
    evento.preventDefault();

    const respostaNormalizada =
      normalizarTexto(resposta);

    const acertou = respostasNossaMusica.some(
      (respostaCorreta) =>
        normalizarTexto(respostaCorreta) ===
        respostaNormalizada
    );

    if (!acertou) {
      setMensagem(
        "essa assinatura de áudio não corresponde aos registros."
      );
      return;
    }

    localStorage.setItem(
      "musica-identificada",
      "deixa tudo como tá"
    );

    setConcluido(true);
    setMensagem(
      "assinatura reconhecida. a faixa original foi recuperada."
    );

    aoConcluir("audios");
  }

  function abrirMusica() {
    if (aoAbrirMusica) {
      aoAbrirMusica();
      return;
    }

    aoFechar();
  }

  return (
    <section className="janela-enigma">
      <header className="barra-janela">
        <span>identificar_faixa.exe</span>

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
              FAIXA IDENTIFICADA
            </p>

            <h2>Deixa Tudo Como Tá</h2>

            <p>
              lugares diferentes, dias diferentes
              e a mesma música encontrando a gente
              de novo.
            </p>

            <button
              type="button"
              onClick={abrirMusica}
            >
              <FaMusic />
              abrir nossa música
            </button>
          </div>
        ) : (
          <>
            <div className="icone-disco-enigma">
              <FaCompactDisc />
            </div>

            <p className="rotulo-enigma">
              ASSINATURA DE ÁUDIO
            </p>

            <h2>
              qual música conecta todos os registros?
            </h2>

            <p className="instrucao-enigma">
              assista aos vídeos encontrados na
              pasta e digite o nome completo da
              faixa.
            </p>

            <form onSubmit={verificar}>
              <div className="entrada-musica">
                <FaMusic />

                <input
                  type="text"
                  value={resposta}
                  onChange={(evento) => {
                    setResposta(
                      evento.target.value
                    );
                    setMensagem("");
                  }}
                  placeholder="nome completo da música"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <button type="submit">
                identificar faixa
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

export default EnigmaAudios;