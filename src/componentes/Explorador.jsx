import { useRef, useState } from "react";
import {
  FaCheckCircle,
  FaFileAlt,
  FaFileVideo,
  FaFolder,
  FaKey,
  FaLightbulb,
  FaLock,
} from "react-icons/fa";
import {
  dicasPastas,
  fotos,
  pastas,
  textoBloco,
} from "../data/arquivos";
import {
  dicaLinguinha,
  fotosLinguinha,
  relatorioLinguinha,
} from "../data/linguinha";
import {
  dicaNossaMusica,
  investigacaoNossaMusica,
  videosNossaMusica,
} from "../data/nossamusica";
import {
  dicaBananao,
  fotosBananao,
  relatorioBananao,
  videoBananao,
} from "../data/bananao";

function Explorador({
  pastaAtual,
  aoAbrirPasta,
  aoVoltar,
  aoFechar,
  aoAbrirFoto,
  aoAbrirVideo,
  aoAbrirTexto,
  aoAbrirEnigma,
  estaDesbloqueada,
  estaConcluida,
}) {
  const [aviso, setAviso] = useState("");
  const temporizadorAviso = useRef(null);

  const pastaSelecionada = pastas.find(
    (pasta) => pasta.id === pastaAtual
  );

  function nomeDaPasta(pasta) {
    if (pasta.id === "rascunhos") {
      return "linguinha";
    }

    if (pasta.id === "audios") {
      return "nossa música";
    }

    if (pasta.id === "ideias") {
      return "combinação suspeita";
    }

    return pasta.nome;
  }

  function mostrarAviso(texto) {
    setAviso(texto);

    if (temporizadorAviso.current) {
      clearTimeout(temporizadorAviso.current);
    }

    temporizadorAviso.current = setTimeout(() => {
      setAviso("");
    }, 3000);
  }

  function abrirPasta(pasta) {
    if (!estaDesbloqueada(pasta.id)) {
      mostrarAviso(
        "essa pasta está bloqueada. resolva o enigma anterior para continuar."
      );
      return;
    }

    if (pasta.id === "surpresa") {
      aoAbrirEnigma("surpresa");
      return;
    }

    setAviso("");
    aoAbrirPasta(pasta.id);
  }

  function abrirDica() {
    let conteudo = dicasPastas[pastaAtual];

    if (pastaAtual === "rascunhos") {
      conteudo = dicaLinguinha;
    }

    if (pastaAtual === "audios") {
      conteudo = dicaNossaMusica;
    }

    if (pastaAtual === "ideias") {
      conteudo = dicaBananao;
    }

    aoAbrirTexto({
      titulo: "LEIA_SE_TRAVAR.txt",
      conteudo,
    });
  }

  function renderizarDica() {
    return (
      <button
        className="item-arquivo arquivo-dica"
        type="button"
        onDoubleClick={abrirDica}
      >
        <FaLightbulb className="icone-dica" />
        <span>LEIA_SE_TRAVAR.txt</span>
      </button>
    );
  }

  function renderizarExecutavel(nome) {
    return (
      <button
        className="item-arquivo item-enigma"
        type="button"
        onDoubleClick={() =>
          aoAbrirEnigma(pastaAtual)
        }
      >
        <FaKey className="icone-enigma" />
        <span>{nome}</span>
      </button>
    );
  }

  function renderizarInicio() {
    return pastas.map((pasta) => {
      const desbloqueada = estaDesbloqueada(
        pasta.id
      );

      const concluida = estaConcluida(
        pasta.id
      );

      return (
        <button
          key={pasta.id}
          className={`item-arquivo ${
            !desbloqueada ? "bloqueado" : ""
          }`}
          type="button"
          onDoubleClick={() => abrirPasta(pasta)}
        >
          <span className="icone-arquivo-wrapper">
            {pasta.id === "surpresa" ? (
              <FaKey className="icone-executavel" />
            ) : (
              <FaFolder className="icone-pasta" />
            )}

            {!desbloqueada && (
              <FaLock className="cadeado-arquivo" />
            )}

            {concluida && (
              <FaCheckCircle className="arquivo-concluido" />
            )}
          </span>

          <span>{nomeDaPasta(pasta)}</span>

          {!desbloqueada && (
            <small>bloqueado</small>
          )}

          {concluida && (
            <small>concluído</small>
          )}
        </button>
      );
    });
  }

  function renderizarDetalhes() {
    return (
      <>
        {fotos.map((foto) => (
          <button
            key={foto.id}
            className="item-arquivo"
            type="button"
            onDoubleClick={() =>
              aoAbrirFoto(foto)
            }
          >
            <img
              className="miniatura-foto"
              src={foto.caminho}
              alt=""
            />

            <span>{foto.nome}</span>
          </button>
        ))}

        <button
          className="item-arquivo"
          type="button"
          onDoubleClick={() =>
            aoAbrirTexto({
              titulo:
                "registro_de_entregas.txt",
              conteudo: textoBloco,
            })
          }
        >
          <FaFileAlt className="icone-texto" />
          <span>registro_de_entregas.txt</span>
        </button>

        {renderizarDica()}

        {renderizarExecutavel(
          "localizar_arquivos.exe"
        )}
      </>
    );
  }

  function renderizarLinguinha() {
    return (
      <>
        {fotosLinguinha.map((foto) => (
          <button
            key={foto.id}
            className="item-arquivo"
            type="button"
            onDoubleClick={() =>
              aoAbrirFoto(foto)
            }
          >
            <img
              className="miniatura-foto"
              src={foto.caminho}
              alt=""
            />

            <span>{foto.nome}</span>
          </button>
        ))}

        <button
          className="item-arquivo"
          type="button"
          onDoubleClick={() =>
            aoAbrirTexto({
              titulo:
                "relatorio_corrompido.txt",
              conteudo: relatorioLinguinha,
            })
          }
        >
          <FaFileAlt className="icone-texto" />
          <span>relatorio_corrompido.txt</span>
        </button>

        {renderizarDica()}

        {renderizarExecutavel(
          "verificar_sequencia.exe"
        )}
      </>
    );
  }

  function renderizarNossaMusica() {
    return (
      <>
        {videosNossaMusica.map((video) => (
          <button
            key={video.id}
            className="item-arquivo"
            type="button"
            onDoubleClick={() =>
              aoAbrirVideo(video)
            }
          >
            <FaFileVideo className="icone-video" />
            <span>{video.nome}</span>
          </button>
        ))}

        <button
          className="item-arquivo"
          type="button"
          onDoubleClick={() =>
            aoAbrirTexto({
              titulo:
                "assinatura_de_audio.txt",
              conteudo:
                investigacaoNossaMusica,
            })
          }
        >
          <FaFileAlt className="icone-texto" />
          <span>assinatura_de_audio.txt</span>
        </button>

        {renderizarDica()}

        {renderizarExecutavel(
          "identificar_faixa.exe"
        )}
      </>
    );
  }

  function renderizarBananao() {
    return (
      <>
        {fotosBananao.map((foto) => (
          <button
            key={foto.id}
            className="item-arquivo"
            type="button"
            onDoubleClick={() =>
              aoAbrirFoto(foto)
            }
          >
            <img
              className="miniatura-foto"
              src={foto.caminho}
              alt=""
            />

            <span>{foto.nome}</span>
          </button>
        ))}

        <button
          className="item-arquivo"
          type="button"
          onDoubleClick={() =>
            aoAbrirVideo(videoBananao)
          }
        >
          <FaFileVideo className="icone-video" />
          <span>{videoBananao.nome}</span>
        </button>

        <button
          className="item-arquivo"
          type="button"
          onDoubleClick={() =>
            aoAbrirTexto({
              titulo:
                "relatorio_visual.txt",
              conteudo: relatorioBananao,
            })
          }
        >
          <FaFileAlt className="icone-texto" />
          <span>relatorio_visual.txt</span>
        </button>

        {renderizarDica()}

        {renderizarExecutavel(
          "verificar_padrao.exe"
        )}
      </>
    );
  }

  let nomePastaAtual =
    pastaSelecionada?.nome || pastaAtual;

  if (pastaAtual === "rascunhos") {
    nomePastaAtual = "linguinha";
  }

  if (pastaAtual === "audios") {
    nomePastaAtual = "nossa música";
  }

  if (pastaAtual === "ideias") {
    nomePastaAtual =
      "combinação suspeita";
  }

  return (
    <section className="explorador">
      <header className="barra-janela">
        <span>Explorador de Arquivos</span>

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
            onClick={aoFechar}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
      </header>

      <div className="barra-navegacao">
        <button
          type="button"
          onClick={aoVoltar}
          disabled={pastaAtual === "inicio"}
          aria-label="Voltar"
        >
          ←
        </button>

        <div className="caminho-explorador">
          Este Computador › meu amor
          {pastaAtual !== "inicio" &&
            ` › ${nomePastaAtual}`}
        </div>
      </div>

      <div className="conteudo-explorador">
        <aside className="menu-lateral">
          <span>⌂ Início</span>
          <span>▣ Área de Trabalho</span>
          <span>▤ Documentos</span>
          <span>▧ Imagens</span>
        </aside>

        <div className="area-principal-explorador">
          {aviso && (
            <p className="aviso-bloqueio">
              <FaLock />
              {aviso}
            </p>
          )}

          <div className="arquivos">
            {pastaAtual === "inicio" &&
              renderizarInicio()}

            {pastaAtual === "detalhes" &&
              renderizarDetalhes()}

            {pastaAtual === "rascunhos" &&
              renderizarLinguinha()}

            {pastaAtual === "audios" &&
              renderizarNossaMusica()}

            {pastaAtual === "ideias" &&
              renderizarBananao()}
          </div>
        </div>
      </div>

      <footer className="rodape-explorador">
        <span>
          {pastaAtual === "inicio"
            ? `${pastas.length} itens`
            : "arquivos protegidos"}
        </span>
      </footer>
    </section>
  );
}

export default Explorador;