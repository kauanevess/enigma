import { useState } from "react";
import {
  FaFileAlt,
  FaFolder,
} from "react-icons/fa";
import BarraTarefas from "./BarraTarefas";
import BlocoNotas from "./BlocoNotas";
import Explorador from "./Explorador";
import ReprodutorMusica from "./ReprodutorMusica";
import ReprodutorVideo from "./ReprodutorVideo";
import SurpresaFinal from "./SurpresaFinal";
import VisualizadorFoto from "./VisualizadorFoto";
import GerenciadorEnigmas from "./enigmas/GerenciadorEnigmas";
import useProgresso from "../hooks/useProgresso";
import { textoInstrucoes } from "../data/arquivos";

function Desktop({ horario, dataDesktop }) {
  const [pastaAberta, setPastaAberta] =
    useState(false);

  const [pastaAtual, setPastaAtual] =
    useState("inicio");

  const [arquivoAberto, setArquivoAberto] =
    useState(null);

  const [enigmaAberto, setEnigmaAberto] =
    useState(null);

  const [musicaAberta, setMusicaAberta] =
    useState(false);

  const [
    surpresaFinalAberta,
    setSurpresaFinalAberta,
  ] = useState(false);

  const {
    estaDesbloqueada,
    estaConcluida,
    concluirFase,
  } = useProgresso();

  function abrirInstrucoes() {
    setArquivoAberto({
      tipo: "texto",
      titulo: "ABRIR PRIMEIRO.txt",
      conteudo: textoInstrucoes,
    });

    setEnigmaAberto(null);
  }

  function abrirPastaMeuAmor() {
    setPastaAtual("inicio");
    setPastaAberta(true);
    setArquivoAberto(null);
    setEnigmaAberto(null);
  }

  function abrirPasta(idPasta) {
    setPastaAtual(idPasta);
    setArquivoAberto(null);
    setEnigmaAberto(null);
  }

  function voltarPasta() {
    if (pastaAtual !== "inicio") {
      setPastaAtual("inicio");
    }
  }

  function fecharExplorador() {
    setPastaAberta(false);
    setPastaAtual("inicio");
    setArquivoAberto(null);
    setEnigmaAberto(null);
  }

  function abrirFoto(foto) {
    setArquivoAberto({
      tipo: "foto",
      dados: foto,
    });

    setEnigmaAberto(null);
  }

  function abrirVideo(video) {
    setArquivoAberto({
      tipo: "video",
      dados: video,
    });

    setEnigmaAberto(null);
  }

  function abrirTexto(arquivo) {
    setArquivoAberto({
      tipo: "texto",
      titulo: arquivo.titulo,
      conteudo: arquivo.conteudo,
    });

    setEnigmaAberto(null);
  }

  function abrirEnigma(fase) {
    setEnigmaAberto(fase);
    setArquivoAberto(null);
  }

  function fecharArquivo() {
    setArquivoAberto(null);
  }

  function fecharEnigma() {
    setEnigmaAberto(null);
  }

  function concluirEnigma() {
    if (!enigmaAberto) {
      return;
    }

    concluirFase(enigmaAberto);
  }

  function abrirMusica() {
    setEnigmaAberto(null);
    setArquivoAberto(null);
    setMusicaAberta(true);
  }

  function fecharMusica() {
    setMusicaAberta(false);
  }

  function abrirSurpresa() {
    setEnigmaAberto(null);
    setArquivoAberto(null);
    setMusicaAberta(false);
    setSurpresaFinalAberta(true);
  }

  function fecharSurpresa() {
    setSurpresaFinalAberta(false);
  }

  return (
    <main className="desktop-shell">
      <section className="desktop">
        <button
          className="atalho-desktop atalho-instrucoes"
          type="button"
          onDoubleClick={abrirInstrucoes}
          aria-label="Abrir instruções"
        >
          <FaFileAlt className="icone-desktop-texto" />

          <span className="nome-atalho">
            ABRIR PRIMEIRO.txt
          </span>
        </button>

        <button
          className="atalho-desktop atalho-meu-amor"
          type="button"
          onDoubleClick={abrirPastaMeuAmor}
          aria-label="Abrir pasta meu amor"
        >
          <FaFolder className="icone-desktop-pasta" />

          <span className="nome-atalho">
            meu amor
          </span>
        </button>

        {pastaAberta && (
          <Explorador
            pastaAtual={pastaAtual}
            aoAbrirPasta={abrirPasta}
            aoVoltar={voltarPasta}
            aoFechar={fecharExplorador}
            aoAbrirFoto={abrirFoto}
            aoAbrirVideo={abrirVideo}
            aoAbrirTexto={abrirTexto}
            aoAbrirEnigma={abrirEnigma}
            estaDesbloqueada={
              estaDesbloqueada
            }
            estaConcluida={estaConcluida}
          />
        )}

        {arquivoAberto?.tipo === "texto" && (
          <BlocoNotas
            titulo={arquivoAberto.titulo}
            conteudo={arquivoAberto.conteudo}
            aoFechar={fecharArquivo}
          />
        )}

        {arquivoAberto?.tipo === "foto" && (
          <VisualizadorFoto
            foto={arquivoAberto.dados}
            aoFechar={fecharArquivo}
          />
        )}

        {arquivoAberto?.tipo === "video" && (
          <ReprodutorVideo
            key={arquivoAberto.dados.caminho}
            video={arquivoAberto.dados}
            aoFechar={fecharArquivo}
          />
        )}

        {enigmaAberto && (
          <GerenciadorEnigmas
            fase={enigmaAberto}
            aoConcluir={concluirEnigma}
            aoAbrirMusica={abrirMusica}
            aoAbrirSurpresa={abrirSurpresa}
            aoFechar={fecharEnigma}
          />
        )}

        {musicaAberta && (
          <ReprodutorMusica
            aoFechar={fecharMusica}
          />
        )}

        {surpresaFinalAberta && (
          <SurpresaFinal
            aoFechar={fecharSurpresa}
          />
        )}

        <BarraTarefas
          horario={horario}
          dataDesktop={dataDesktop}
        />
      </section>
    </main>
  );
}

export default Desktop;