export const fotos = [
  {
    id: "campo",
    nome: "IMG_01.jpg",
    caminho:
      "/assets/buques/flores-do-campo.jpg",
  },
  {
    id: "rosa-01",
    nome: "IMG_02.jpg",
    caminho:
      "/assets/buques/rosas-cor-de-rosa-01.jpg",
  },
  {
    id: "rosa-02",
    nome: "IMG_03.jpg",
    caminho:
      "/assets/buques/rosas-cor-de-rosa-02.jpg",
  },
  {
    id: "coloridas",
    nome: "IMG_04.jpg",
    caminho:
      "/assets/buques/rosas-coloridas.jpg",
  },
  {
    id: "brancas",
    nome: "IMG_05.jpg",
    caminho:
      "/assets/buques/rosas-brancas.jpg",
  },
  {
    id: "alstroemerias",
    nome: "IMG_06.jpg",
    caminho:
      "/assets/buques/alstroemerias.jpg",
  },
];

export const videoReacao = {
  nome: "ela reagindo quando eu canto.mp4",
  caminho:
    "/assets/coisas-que-eu-noto/minha-maior-fa.mp4",
};

export const audiosEnigma = [
  {
    id: 1,
    nome: "gravação_01.mp3",
    caminho: "/assets/audios/audio-01.mp3",
  },
  {
    id: 2,
    nome: "gravação_02.mp3",
    caminho: "/assets/audios/audio-02.mp3",
  },
  {
    id: 3,
    nome: "gravação_03.mp3",
    caminho: "/assets/audios/audio-03.mp3",
  },
  {
    id: 4,
    nome: "gravação_04.mp3",
    caminho: "/assets/audios/audio-04.mp3",
  },
];

export const arquivosIdeias = [
  {
    id: "cozinha",
    nome: "01_cozinha.txt",
    conteudo: `anotação sem data

acordei primeiro e fui fazer café.

quando você apareceu, ainda com sono, já tinham duas canecas esperando na bancada.

primeiro número: quantas canecas estavam na bancada?`,
  },
  {
    id: "serie",
    nome: "02_serie.txt",
    conteudo: `continuar depois

a gente jurou que veria só mais um.

paramos no episódio sete porque alguém dormiu antes do final — não vou dizer quem.

segundo número: em qual episódio paramos?`,
  },
  {
    id: "lista",
    nome: "03_lista.txt",
    conteudo: `lista pra amanhã

[ ] comprar alguma coisa pro café
[ ] escolher o que vamos cozinhar
[ ] terminar a série
[ ] dormir sem colocar cinco alarmes

terceiro número: quantas coisas ainda faltam fazer?`,
  },
  {
    id: "alarme",
    nome: "04_alarme.txt",
    conteudo: `configuração do despertador

horário escolhido: 08:00

motivo: levantar cedo, fazer café e depois voltar pra cama porque nenhum dos dois queria realmente acordar.

quarto número: qual é a hora configurada? use apenas o primeiro número.`,
  },
];

export const textoBloco = `registro de entregas

01 — flores do campo
02 — rosas cor-de-rosa
03 — rosas cor-de-rosa
04 — rosas coloridas
05 — rosas brancas
06 — lírios
07 — alstroemérias
08 — gérberas

buquês registrados: 8
imagens encontradas: 6

dois registros não possuem imagem nesta pasta.

identifique os dois arquivos ausentes.`;

export const textoInstrucoes = `se você conseguiu entrar, então esse computador agora é seu por alguns minutos.

tem algumas coisas guardadas aqui que eu nunca organizei direito — ou talvez tenha organizado até demais.

abre as pastas, olha as fotos, lê os arquivos e presta atenção nos nomes. algumas coisas vão parecer normais e outras provavelmente não.

as pastas bloqueadas só abrem quando você resolve o enigma anterior.

não precisa correr. mexe em tudo, volta nos arquivos se precisar e usa fone quando chegar nos áudios.

se achar que acabou, provavelmente ainda não acabou.

começa pela pasta "meu amor".`;

export const pastas = [
  {
    id: "detalhes",
    nome: "flores",
    ordem: 1,
    bloqueadaInicialmente: false,
    desbloqueia: "rascunhos",
  },
  {
    id: "rascunhos",
    nome: "linguinha",
    ordem: 2,
    bloqueadaInicialmente: true,
    desbloqueia: "audios",
  },
  {
    id: "audios",
    nome: "áudios",
    ordem: 3,
    bloqueadaInicialmente: true,
    desbloqueia: "ideias",
  },
  {
    id: "ideias",
    nome: "ideias",
    ordem: 4,
    bloqueadaInicialmente: true,
    desbloqueia: "surpresa",
  },
  {
    id: "surpresa",
    nome: "mega-surpresa.exe",
    ordem: 5,
    bloqueadaInicialmente: true,
    desbloqueia: null,
  },
];

export const enigmas = {
  detalhes: {
    titulo: "verificação de acesso",
    tipo: "resposta",
    pergunta:
      "mesmo de longe, qual coisa sua eu sempre percebo?",
    respostas: [
      "quando eu não estou bem",
      "quando eu nao estou bem",
      "quando não estou bem",
      "quando nao estou bem",
      "quando estou mal",
    ],
    mensagemErro:
      "a resposta está em algum dos arquivos dessa pasta.",
    mensagemAcerto:
      "acesso concedido. uma nova pasta foi desbloqueada.",
  },

  rascunhos: {
    titulo: "rascunho incompleto",
    tipo: "ordenar",
    partes: [
      "não importa",
      "onde a gente vá morar,",
      "eu só quero",
      "acordar do seu lado.",
    ],
    mensagemAcerto:
      "rascunho recuperado. pasta de áudios desbloqueada.",
  },

  audios: {
    titulo: "frequência protegida",
    tipo: "sequencia",
    descricao:
      "escute os arquivos na ordem e descubra a frase escondida.",
    respostas: [
      "eu quero viver com você",
      "eu quero viver com voce",
    ],
    mensagemErro:
      "a sequência ainda não foi reconhecida.",
    mensagemAcerto:
      "sequência reconhecida. pasta de ideias desbloqueada.",
  },

  ideias: {
    titulo: "projeto confidencial",
    tipo: "codigo",
    descricao:
      "os quatro arquivos dessa pasta escondem um código. leia na ordem dos nomes.",
    respostas: ["2748"],
    mensagemErro:
      "esse não é o código do projeto.",
    mensagemAcerto:
      "código reconhecido. último arquivo desbloqueado.",
  },

  surpresa: {
    titulo: "confirmação final",
    tipo: "final",
    descricao:
      "o sistema precisa confirmar que é realmente você antes de abrir.",
  },
};

export const dicasPastas = {
  detalhes: `não tente descobrir o nome das flores apenas olhando as imagens.

abra o arquivo "registro_de_entregas.txt" e compare a lista com as fotos disponíveis.

existem 8 entregas registradas, mas apenas 6 imagens na pasta.

descubra quais são os dois buquês que aparecem na lista, mas não possuem uma foto correspondente.

escreva os dois nomes separados por "e".`,

  rascunhos: `os números necessários estão nos nomes das imagens.

procure, nesta ordem:

1. a foto com algo amarelo ao lado do rosto;
2. a foto tirada dentro de um carro;
3. a foto em que nós dois usamos óculos escuros;
4. a foto noturna em que nenhum dos dois usa óculos escuros.

junte os quatro números sem espaços.`,

  audios: `não precisa decorar tudo que foi dito.

escute os quatro arquivos na ordem numérica.

preste atenção principalmente nas últimas palavras de cada gravação.

quando forem colocadas juntas, elas formam uma única frase.`,

  ideias: `cada arquivo entrega uma parte diferente do código.

não basta encontrar os números: a ordem dos arquivos também importa.

anote cada número antes de abrir o verificador.`,

  surpresa: `essa é a última parte do sistema.

revise os fragmentos recuperados nos enigmas anteriores.

eles não foram mostrados por acaso.`,
};