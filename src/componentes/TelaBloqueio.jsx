function TelaBloqueio({ horario, dataBloqueio, aoEntrar }) {
  return (
    <main
      className="tela tela-bloqueio"
      onClick={aoEntrar}
    >
      <div className="fundo fundo-bloqueio" />

      <section className="relogio">
        <strong>{horario}</strong>
        <span>{dataBloqueio}</span>
      </section>

      <p className="instrucao">clique para entrar</p>
    </main>
  );
}

export default TelaBloqueio;