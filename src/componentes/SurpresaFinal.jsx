import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import * as dadosAlbum from "../data/album";
import "../SurpresaFinal.css";

const CAMINHO_MUSICA =
  "/assets/surpresa/minha-namorada.mp3";

const CAMINHO_CASAMENTO =
  "/assets/surpresa/casamento.jpg";

const PALAVRAS_POR_PAGINA = 105;

const fotosPadrao = Array.from(
  { length: 41 },
  (_, indice) => ({
    tipo: "foto",
    caminho: `/assets/surpresa/album/${indice + 1}.jpg`,
    nome: `${indice + 1}.jpg`,
  })
);

const videosPadrao = Array.from(
  { length: 6 },
  (_, indice) => ({
    tipo: "video",
    caminho: `/assets/surpresa/album/video${indice + 1}.mp4`,
    nome: `video${indice + 1}.mp4`,
  })
);

function separarTexto(texto = "") {
  if (!texto || typeof texto !== "string") {
    return [];
  }

  const paragrafosOriginais = texto
    .split(/\n\s*\n/)
    .map((paragrafo) => paragrafo.trim())
    .filter(Boolean);

  const paginas = [];
  let paginaAtual = [];
  let quantidadeAtual = 0;

  paragrafosOriginais.forEach((paragrafo) => {
    const palavras = paragrafo.split(/\s+/);

    if (palavras.length > PALAVRAS_POR_PAGINA) {
      if (paginaAtual.length > 0) {
        paginas.push(paginaAtual);
        paginaAtual = [];
        quantidadeAtual = 0;
      }

      for (
        let indice = 0;
        indice < palavras.length;
        indice += PALAVRAS_POR_PAGINA
      ) {
        paginas.push([
          palavras
            .slice(
              indice,
              indice + PALAVRAS_POR_PAGINA
            )
            .join(" "),
        ]);
      }

      return;
    }

    if (
      quantidadeAtual + palavras.length >
        PALAVRAS_POR_PAGINA &&
      paginaAtual.length > 0
    ) {
      paginas.push(paginaAtual);
      paginaAtual = [];
      quantidadeAtual = 0;
    }

    paginaAtual.push(paragrafo);
    quantidadeAtual += palavras.length;
  });

  if (paginaAtual.length > 0) {
    paginas.push(paginaAtual);
  }

  return paginas;
}

function pegarTextoDoObjeto(objeto) {
  if (!objeto) {
    return "";
  }

  if (typeof objeto === "string") {
    return objeto;
  }

  const propriedadesPossiveis = [
    "texto",
    "conteudo",
    "carta",
    "mensagem",
    "textoDepois",
    "textoApos",
    "text",
    "content",
  ];

  for (const propriedade of propriedadesPossiveis) {
    if (
      typeof objeto[propriedade] === "string" &&
      objeto[propriedade].trim().length > 40
    ) {
      return objeto[propriedade].trim();
    }
  }

  return "";
}

function pegarTituloDoObjeto(objeto, indice) {
  if (!objeto || typeof objeto === "string") {
    return `texto ${indice + 1}`;
  }

  return (
    objeto.titulo ||
    objeto.nome ||
    objeto.capitulo ||
    `texto ${indice + 1}`
  );
}

function descobrirTextos() {
  const encontrados = [];
  const textosJaAdicionados = new Set();

  function adicionar(texto, titulo) {
    if (
      typeof texto !== "string" ||
      texto.trim().length < 40
    ) {
      return;
    }

    const textoLimpo = texto.trim();

    if (textosJaAdicionados.has(textoLimpo)) {
      return;
    }

    textosJaAdicionados.add(textoLimpo);

    encontrados.push({
      titulo:
        titulo || `texto ${encontrados.length + 1}`,
      texto: textoLimpo,
    });
  }

  const capitulos =
    dadosAlbum.capitulosAlbum ||
    dadosAlbum.capitulos ||
    [];

  if (Array.isArray(capitulos)) {
    capitulos.forEach((capitulo, indice) => {
      adicionar(
        pegarTextoDoObjeto(capitulo),
        pegarTituloDoObjeto(capitulo, indice)
      );
    });
  }

  const colecoesPossiveis = [
    dadosAlbum.textosAlbum,
    dadosAlbum.textos,
    dadosAlbum.cartasAlbum,
    dadosAlbum.cartas,
  ];

  colecoesPossiveis.forEach((colecao) => {
    if (!Array.isArray(colecao)) {
      return;
    }

    colecao.forEach((item, indice) => {
      adicionar(
        pegarTextoDoObjeto(item),
        pegarTituloDoObjeto(item, indice)
      );
    });
  });

  Object.entries(dadosAlbum).forEach(
    ([nomeExportacao, valor]) => {
      if (
        typeof valor === "string" &&
        valor.trim().length > 200
      ) {
        adicionar(
          valor,
          nomeExportacao
            .replace(/([A-Z])/g, " $1")
            .replace(/[_-]/g, " ")
            .trim()
        );
      }
    }
  );

  return encontrados;
}

function misturarMidias(fotos, videos) {
  const resultado = [];
  const intervalo = Math.max(
    2,
    Math.ceil(fotos.length / Math.max(videos.length, 1))
  );

  let indiceVideo = 0;

  fotos.forEach((foto, indice) => {
    resultado.push(foto);

    if (
      (indice + 1) % intervalo === 0 &&
      videos[indiceVideo]
    ) {
      resultado.push(videos[indiceVideo]);
      indiceVideo += 1;
    }
  });

  while (indiceVideo < videos.length) {
    resultado.push(videos[indiceVideo]);
    indiceVideo += 1;
  }

  return resultado;
}

function criarPaginas() {
  const textos = descobrirTextos();
  const midias = misturarMidias(
    fotosPadrao,
    videosPadrao
  );

  const paginas = [];
  const quantidadeCapitulos = Math.max(
    textos.length,
    4
  );

  const midiasPorCapitulo = Math.ceil(
    midias.length / quantidadeCapitulos
  );

  for (
    let capitulo = 0;
    capitulo < quantidadeCapitulos;
    capitulo += 1
  ) {
    const inicio = capitulo * midiasPorCapitulo;
    const fim = inicio + midiasPorCapitulo;
    const midiasCapitulo = midias.slice(inicio, fim);

    for (
      let indice = 0;
      indice < midiasCapitulo.length;
      indice += 3
    ) {
      paginas.push({
        tipo: "midias",
        capitulo: `memórias ${capitulo + 1}`,
        itens: midiasCapitulo.slice(
          indice,
          indice + 3
        ),
      });
    }

    const textoAtual = textos[capitulo];

    if (textoAtual) {
      const partes = separarTexto(textoAtual.texto);

      partes.forEach((paragrafos, indiceParte) => {
        paginas.push({
          tipo: "texto",
          titulo: textoAtual.titulo,
          paragrafos,
          continuacao: indiceParte > 0,
        });
      });
    }
  }

  paginas.push({
    tipo: "casamento",
  });

  paginas.push({
    tipo: "leitura",
  });

  if (paginas.length % 2 !== 0) {
    paginas.push({
      tipo: "vazia",
    });
  }

  return paginas;
}

function VideoAlbum({ item, paginaVisivel }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    video.volume = 0;

    if (paginaVisivel) {
      video.currentTime = 0;

      const tentativa = video.play();

      if (tentativa?.catch) {
        tentativa.catch(() => {});
      }
    } else {
      video.pause();
    }

    return () => {
      video.pause();
    };
  }, [paginaVisivel, item.caminho]);

  return (
    <video
      ref={videoRef}
      src={item.caminho}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      controls
      disablePictureInPicture
    />
  );
}

function PaginaMidias({ pagina, paginaVisivel }) {
  return (
    <div className="conteudo-pagina conteudo-memorias">
      <span className="titulo-capitulo">
        {pagina.capitulo}
      </span>

      <div
        className={`colagem-livro colagem-${pagina.itens.length}`}
      >
        {pagina.itens.map((item, indice) => (
          <figure
            className={`polaroide-livro polaroide-${indice + 1}`}
            key={`${item.caminho}-${indice}`}
          >
            <span className="fita-polaroide" />

            {item.tipo === "video" ? (
              <VideoAlbum
                item={item}
                paginaVisivel={paginaVisivel}
              />
            ) : (
              <img
                src={item.caminho}
                alt={item.nome}
                draggable="false"
              />
            )}

            <figcaption>{item.nome}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function PaginaTexto({ pagina }) {
  return (
    <div className="conteudo-pagina pagina-carta">
      <span className="grampo-papel" />

      <div className="papel-carta">
        {!pagina.continuacao && (
          <span className="titulo-carta">
            {pagina.titulo}
          </span>
        )}

        {pagina.paragrafos.map(
          (paragrafo, indice) => (
            <p
              key={`${indice}-${paragrafo.slice(
                0,
                25
              )}`}
            >
              {paragrafo}
            </p>
          )
        )}
      </div>
    </div>
  );
}

function PaginaCasamento() {
  return (
    <div className="conteudo-pagina pagina-casamento">
      <figure className="polaroide-casamento">
        <span className="fita-polaroide" />

        <img
          src={CAMINHO_CASAMENTO}
          alt="simulação do nosso casamento"
          draggable="false"
        />

        <figcaption>
          arquivo_adiantado.jpg
        </figcaption>
      </figure>

      <p className="observacao-casamento">
        aparentemente esse arquivo veio parar na pasta
        errada
      </p>
    </div>
  );
}

function PaginaLeitura() {
  return (
    <div className="conteudo-pagina pagina-leitura">
      <div className="marcador-final">
        <span>K + G</span>
      </div>

      <p>aguarde a leitura</p>
    </div>
  );
}

function Pagina({
  pagina,
  numero,
  paginaVisivel = true,
}) {
  if (!pagina) {
    return null;
  }

  return (
    <>
      {pagina.tipo === "midias" && (
        <PaginaMidias
          pagina={pagina}
          paginaVisivel={paginaVisivel}
        />
      )}

      {pagina.tipo === "texto" && (
        <PaginaTexto pagina={pagina} />
      )}

      {pagina.tipo === "casamento" && (
        <PaginaCasamento />
      )}

      {pagina.tipo === "leitura" && (
        <PaginaLeitura />
      )}

      {pagina.tipo === "vazia" && (
        <div className="conteudo-pagina pagina-vazia" />
      )}

      <span className="numero-pagina">{numero}</span>
    </>
  );
}

function SurpresaFinal({ aoFechar }) {
  const audioRef = useRef(null);
  const livroRef = useRef(null);
  const temporizadorRef = useRef(null);

  const paginas = useMemo(() => criarPaginas(), []);

  const [livroAberto, setLivroAberto] =
    useState(false);
  const [paginaAtual, setPaginaAtual] =
    useState(0);
  const [virando, setVirando] =
    useState("");
  const [tocando, setTocando] =
    useState(false);
  const [semSom, setSemSom] =
    useState(false);
  const [telaCheia, setTelaCheia] =
    useState(false);
  const [erroMusica, setErroMusica] =
    useState(false);

  const esquerda = paginas[paginaAtual];
  const direita = paginas[paginaAtual + 1];

  const ultimoPar =
    paginaAtual >= paginas.length - 2;

  useEffect(() => {
    function atualizarTelaCheia() {
      setTelaCheia(Boolean(document.fullscreenElement));
    }

    document.addEventListener(
      "fullscreenchange",
      atualizarTelaCheia
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        atualizarTelaCheia
      );

      clearTimeout(temporizadorRef.current);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const temTexto =
      esquerda?.tipo === "texto" ||
      direita?.tipo === "texto";

    audio.volume = temTexto ? 0.14 : 0.48;
  }, [esquerda, direita]);

  async function iniciarMusica() {
    const audio = audioRef.current;

    if (!audio) {
      setErroMusica(true);
      return;
    }

    try {
      audio.muted = false;
      audio.volume = 0.48;

      if (audio.readyState === 0) {
        audio.load();
      }

      await audio.play();

      setTocando(true);
      setSemSom(false);
      setErroMusica(false);
    } catch (erro) {
      console.error("Erro ao iniciar a música:", erro);
      setTocando(false);
      setErroMusica(true);
    }
  }

  function abrirLivro() {
    setLivroAberto(true);

    iniciarMusica();

    livroRef.current
      ?.requestFullscreen?.()
      .catch(() => {});
  }

  function virarPagina(direcao) {
    if (virando) {
      return;
    }

    if (
      direcao === "proxima" &&
      ultimoPar
    ) {
      return;
    }

    if (
      direcao === "anterior" &&
      paginaAtual === 0
    ) {
      return;
    }

    setVirando(direcao);

    temporizadorRef.current = setTimeout(() => {
      setPaginaAtual((anterior) =>
        direcao === "proxima"
          ? Math.min(
              anterior + 2,
              paginas.length - 2
            )
          : Math.max(anterior - 2, 0)
      );

      setVirando("");
    }, 650);
  }

  async function alternarMusica() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await iniciarMusica();
      return;
    }

    audio.pause();
    setTocando(false);
  }

  async function alternarSom() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.muted) {
      audio.muted = false;
      setSemSom(false);

      if (audio.paused) {
        await iniciarMusica();
      }
    } else {
      audio.muted = true;
      setSemSom(true);
    }
  }

  async function alternarTelaCheia() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await livroRef.current?.requestFullscreen?.();
      }
    } catch {
      // Continua aberto mesmo sem tela cheia.
    }
  }

  async function fechar() {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // Continua fechando normalmente.
      }
    }

    aoFechar();
  }

  return (
    <section
      className={`surpresa-final ${
        livroAberto ? "livro-foi-aberto" : ""
      }`}
      ref={livroRef}
    >
      <audio
        ref={audioRef}
        src={CAMINHO_MUSICA}
        preload="auto"
        loop
        onPlay={() => {
          setTocando(true);
          setErroMusica(false);
        }}
        onPause={() => setTocando(false)}
        onError={() => {
          setErroMusica(true);
          setTocando(false);
        }}
      />

      <button
        className="fechar-surpresa"
        type="button"
        onClick={fechar}
        aria-label="Fechar surpresa"
      >
        ×
      </button>

      {!livroAberto ? (
        <div className="mesa-livro">
          <div className="livro-fechado">
            <div className="lombada-livro" />

            <div className="detalhe-capa detalhe-superior" />
            <div className="detalhe-capa detalhe-inferior" />

            <div className="moldura-capa">
              <span className="iniciais-capa">
                K + G
              </span>

              <span className="linha-capa" />

              <span className="subtitulo-capa">
                nossas memórias
              </span>
            </div>

            <button
              className="abrir-livro"
              type="button"
              onClick={abrirLivro}
            >
              abrir o livro
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="controles-livro">
            <button
              type="button"
              onClick={alternarMusica}
              aria-label={
                tocando
                  ? "Pausar música"
                  : "Tocar música"
              }
            >
              {tocando ? <FaPause /> : <FaPlay />}
            </button>

            <button
              type="button"
              onClick={alternarSom}
              aria-label={
                semSom
                  ? "Ativar som"
                  : "Silenciar música"
              }
            >
              {semSom ? (
                <FaVolumeMute />
              ) : (
                <FaVolumeUp />
              )}
            </button>

            <button
              type="button"
              onClick={alternarTelaCheia}
              aria-label="Alternar tela cheia"
            >
              {telaCheia ? (
                <FaCompress />
              ) : (
                <FaExpand />
              )}
            </button>
          </div>

          {erroMusica && (
            <button
              className="botao-iniciar-musica"
              type="button"
              onClick={iniciarMusica}
            >
              <FaPlay />
              iniciar música
            </button>
          )}

          <div
            className={`livro-aberto ${
              virando
                ? `livro-virando livro-virando-${virando}`
                : ""
            }`}
          >
            <div className="capa-traseira-livro" />

            <article className="pagina-livro pagina-esquerda">
              <Pagina
                key={`esquerda-${paginaAtual}`}
                pagina={esquerda}
                numero={paginaAtual + 1}
                paginaVisivel={!virando}
              />
            </article>

            <div className="centro-livro" />

            <article className="pagina-livro pagina-direita">
              <Pagina
                key={`direita-${paginaAtual + 1}`}
                pagina={direita}
                numero={paginaAtual + 2}
                paginaVisivel={!virando}
              />
            </article>

            {virando && (
              <div
                className={`folha-virando folha-${virando}`}
              />
            )}
          </div>

          <nav className="navegacao-livro">
            <button
              type="button"
              disabled={
                paginaAtual === 0 ||
                Boolean(virando)
              }
              onClick={() =>
                virarPagina("anterior")
              }
            >
              <FaChevronLeft />
              anterior
            </button>

            <span>
              {Math.floor(paginaAtual / 2) + 1} /{" "}
              {Math.ceil(paginas.length / 2)}
            </span>

            <button
              type="button"
              disabled={
                ultimoPar ||
                Boolean(virando)
              }
              onClick={() =>
                virarPagina("proxima")
              }
            >
              próxima
              <FaChevronRight />
            </button>
          </nav>
        </>
      )}
    </section>
  );
}

export default SurpresaFinal;