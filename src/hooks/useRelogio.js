import { useEffect, useState } from "react";

function useRelogio() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const horario = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dataBloqueio = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const dataDesktop = agora.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return {
    horario,
    dataBloqueio,
    dataDesktop,
  };
}

export default useRelogio;