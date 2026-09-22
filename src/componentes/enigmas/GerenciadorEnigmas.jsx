import EnigmaDetalhes from "./EnigmaDetalhes";
import EnigmaRascunhos from "./EnigmaRascunhos";
import EnigmaAudios from "./EnigmaAudios";
import EnigmaIdeias from "./EnigmaIdeias";
import EnigmaFinal from "./EnigmaFinal";

function GerenciadorEnigmas({
  fase,
  aoConcluir,
  aoAbrirMusica,
  aoAbrirSurpresa,
  aoFechar,
}) {
  if (!fase) {
    return null;
  }

  if (fase === "detalhes") {
    return (
      <EnigmaDetalhes
        aoConcluir={aoConcluir}
        aoFechar={aoFechar}
      />
    );
  }

  if (fase === "rascunhos") {
    return (
      <EnigmaRascunhos
        aoConcluir={aoConcluir}
        aoFechar={aoFechar}
      />
    );
  }

  if (fase === "audios") {
    return (
      <EnigmaAudios
        aoConcluir={aoConcluir}
        aoAbrirMusica={aoAbrirMusica}
        aoFechar={aoFechar}
      />
    );
  }

  if (fase === "ideias") {
    return (
      <EnigmaIdeias
        aoConcluir={aoConcluir}
        aoFechar={aoFechar}
      />
    );
  }

  if (fase === "surpresa") {
    return (
      <EnigmaFinal
        aoConcluir={aoConcluir}
        aoAbrirSurpresa={aoAbrirSurpresa}
        aoFechar={aoFechar}
      />
    );
  }

  return null;
}

export default GerenciadorEnigmas;