import { useEffect } from "react";

function TelaCarregamento({ aoTerminar }) {
  useEffect(() => {
    const tempo = setTimeout(() => {
      aoTerminar();
    }, 2500);

    return () => clearTimeout(tempo);
  }, [aoTerminar]);

  return (
    <main className="tela sistema">
      <div className="fundo fundo-login" />

      <section className="carregando">
        <img
          className="perfil"
          src="/assets/perfil.jpg"
          alt="Foto de perfil"
        />

        <p>Bem-vindo</p>

        <div className="pontos">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}

export default TelaCarregamento;