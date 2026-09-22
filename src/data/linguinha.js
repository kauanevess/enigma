export const fotosLinguinha = Array.from(
  { length: 11 },
  (_, indice) => {
    const numero = String(indice + 1).padStart(2, "0");

    return {
      id: `linguinha-${numero}`,
      numero,
      nome: `IMG_${numero}.jpg`,
      caminho: `/assets/linguinha/IMG_${numero}.jpg`,
    };
  }
);

export const relatorioLinguinha = `RELATÓRIO DE RECUPERAÇÃO

Foram encontradas 11 imagens com o mesmo padrão:

duas pessoas e uma completa incapacidade de tirar uma foto normal.

Entre todas as imagens, quatro arquivos foram marcados pelo sistema.

ARQUIVO 1

O beijo que errou o caminho aconteceu ao lado de algo amarelo.

ARQUIVO 2

O próximo registro foi feito dentro de um carro.

ARQUIVO 3

Depois, encontre a única imagem em que nós dois escondemos os olhos.

ARQUIVO 4

Por último, procure a foto feita no escuro em que nenhum de nós usava óculos escuros.

Anote o número de cada imagem e mantenha exatamente essa ordem.

Exemplo:

01020304`;

export const dicaLinguinha = `os números fazem parte dos nomes das imagens.

você precisa encontrar quatro fotos:

1. procure a flor amarela;
2. procure o interior de um carro;
3. procure duas pessoas usando óculos escuros;
4. procure uma foto noturna sem óculos escuros.

junte os números sem espaços.`;

export const codigoLinguinha = "06110401";