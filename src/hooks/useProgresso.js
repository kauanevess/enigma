import { useEffect, useState } from "react";
import { pastas } from "../data/arquivos";

const CHAVE_PROGRESSO = "meu-amor-progresso";

const progressoInicial = {
  desbloqueadas: ["detalhes"],
  concluidas: [],
};

function carregarProgresso() {
  try {
    const progressoSalvo = localStorage.getItem(CHAVE_PROGRESSO);

    if (!progressoSalvo) {
      return progressoInicial;
    }

    return JSON.parse(progressoSalvo);
  } catch {
    return progressoInicial;
  }
}

function useProgresso() {
  const [progresso, setProgresso] = useState(carregarProgresso);

  useEffect(() => {
    localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
  }, [progresso]);

  function estaDesbloqueada(idPasta) {
    return progresso.desbloqueadas.includes(idPasta);
  }

  function estaConcluida(idPasta) {
    return progresso.concluidas.includes(idPasta);
  }

  function concluirFase(idPasta) {
    const pastaAtual = pastas.find((pasta) => pasta.id === idPasta);

    if (!pastaAtual) {
      return;
    }

    setProgresso((progressoAnterior) => {
      const novasConcluidas = progressoAnterior.concluidas.includes(idPasta)
        ? progressoAnterior.concluidas
        : [...progressoAnterior.concluidas, idPasta];

      const novasDesbloqueadas =
        pastaAtual.desbloqueia &&
        !progressoAnterior.desbloqueadas.includes(pastaAtual.desbloqueia)
          ? [
              ...progressoAnterior.desbloqueadas,
              pastaAtual.desbloqueia,
            ]
          : progressoAnterior.desbloqueadas;

      return {
        desbloqueadas: novasDesbloqueadas,
        concluidas: novasConcluidas,
      };
    });
  }

  function reiniciarProgresso() {
    localStorage.removeItem(CHAVE_PROGRESSO);
    setProgresso(progressoInicial);
  }

  return {
    progresso,
    estaDesbloqueada,
    estaConcluida,
    concluirFase,
    reiniciarProgresso,
  };
}

export default useProgresso;