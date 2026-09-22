import { useState } from "react";
import {
  FaCheckCircle,
  FaImages,
  FaKey,
} from "react-icons/fa";
import { codigoLinguinha } from "../../data/linguinha";

function limparCodigo(valor) {
  return valor.replace(/\D/g, "").slice(0, 8);
}

function EnigmaRascunhos({ aoConcluir, aoFechar }) {
  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [concluido, setConcluido] = useState(false);

  function verificar(evento) {
    evento.preventDefault();

    if (codigo.length !== 8) {
      setMensagem(
        "o sistema espera os números de quatro imagens."
      );
      return;
    }

    if (codigo !== codigoLinguinha) {
      setMensagem(
        "essa sequência não corresponde aos quatro arquivos marcados."
      );
      return;
    }

    localStorage.setItem(
      "fragmento-linguinha",
      "41"
    );

    setConcluido(true);
    setMensagem(
      "sequência confirmada. um novo fragmento foi recuperado."
    );

    aoConcluir("rascunhos");
  }

  return (
    <section className="janela-enigma">
      <header className="barra-janela">
        <span>verificador de imagens</span>

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

            <h2>nenhuma foto normal encontrada</h2>

            <p>
              11 arquivos analisados.
              <br />
              4 registros identificados.
              <br />
              0 fotos normais encontradas.
            </p>

            <div className="fragmento-recuperado">
              <span>fragmento recuperado</span>
              <strong>41</strong>
            </div>

            <button type="button" onClick={aoFechar}>
              continuar
            </button>
          </div>
        ) : (
          <>
            <FaImages className="icone-enigma-grande" />

            <p className="rotulo-enigma">
              BANCO DE IMAGENS CORROMPIDO
            </p>

            <h2>identifique os quatro arquivos marcados</h2>

            <p className="instrucao-enigma">
              leia o relatório, compare as 11 imagens e
              digite os números na ordem indicada.
            </p>

            <form onSubmit={verificar}>
              <div className="entrada-codigo-linguinha">
                <FaKey />

                <input
                  className="campo-codigo"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  value={codigo}
                  onChange={(evento) => {
                    setCodigo(
                      limparCodigo(evento.target.value)
                    );
                    setMensagem("");
                  }}
                  placeholder="00000000"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <span className="contador-codigo">
                {codigo.length}/8 números
              </span>

              <button type="submit">
                verificar sequência
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

export default EnigmaRascunhos;