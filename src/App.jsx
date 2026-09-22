import { useCallback, useState } from "react";

import TelaBloqueio from "./componentes/TelaBloqueio";
import TelaLogin from "./componentes/TelaLogin";
import TelaCarregamento from "./componentes/TelaCarregamento";
import Desktop from "./componentes/Desktop";

import useRelogio from "./hooks/useRelogio";

import "./App.css";
import "./Desktop.css";
import "./Taskbar.css";
import "./Enigmas.css";

function App() {
  const [etapa, setEtapa] = useState("bloqueio");

  const {
    horario,
    dataBloqueio,
    dataDesktop,
  } = useRelogio();

  const abrirLogin = useCallback(() => {
    setEtapa("login");
  }, []);

  const iniciarCarregamento = useCallback(() => {
    setEtapa("carregando");
  }, []);

  const abrirDesktop = useCallback(() => {
    setEtapa("desktop");
  }, []);

  if (etapa === "bloqueio") {
    return (
      <TelaBloqueio
        horario={horario}
        dataBloqueio={dataBloqueio}
        aoEntrar={abrirLogin}
      />
    );
  }

  if (etapa === "login") {
    return (
      <TelaLogin
        aoDesbloquear={iniciarCarregamento}
      />
    );
  }

  if (etapa === "carregando") {
    return (
      <TelaCarregamento
        aoTerminar={abrirDesktop}
      />
    );
  }

  return (
    <Desktop
      horario={horario}
      dataDesktop={dataDesktop}
    />
  );
}

export default App;