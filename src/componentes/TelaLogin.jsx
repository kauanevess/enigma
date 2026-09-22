import { useState } from "react";

function TelaLogin({ aoDesbloquear }) {
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tentativas, setTentativas] = useState(0);

  function entrar(evento) {
    evento.preventDefault();

    if (senha === "150526") {
      setMensagem("");
      aoDesbloquear();
      return;
    }

    const novaTentativa = tentativas + 1;

    setTentativas(novaTentativa);
    setSenha("");

    if (novaTentativa === 1) {
      setMensagem("dica: não é uma senha aleatória");
    } else if (novaTentativa === 2) {
      setMensagem("dica: foi quando a gente começou oficialmente");
    } else {
      setMensagem("dica: use apenas os números da nossa data");
    }
  }

  return (
    <main className="tela sistema">
      <div className="fundo fundo-login" />

      <section className="login">
        <img
          className="perfil"
          src="/assets/perfil.jpg"
          alt="Foto de perfil"
        />

        <h1>Kauã Neves</h1>

        <form onSubmit={entrar}>
          <div className="campo-senha">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={senha}
              onChange={(evento) => {
                const somenteNumeros = evento.target.value.replace(
                  /\D/g,
                  ""
                );

                setSenha(somenteNumeros);
                setMensagem("");
              }}
              placeholder="PIN"
              autoComplete="off"
              autoFocus
            />

            <button type="submit" aria-label="Entrar">
              →
            </button>
          </div>
        </form>

        {mensagem && (
          <p className="mensagem-erro">{mensagem}</p>
        )}
      </section>
    </main>
  );
}

export default TelaLogin;