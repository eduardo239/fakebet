// funçao que recebe um array de duracoes de filmes e retorna o numero minimo de dias para assistir todos os filmes, duracao maxima de 3 hoas por dia
// exemplo de entrada: [1.09, 1.04, 1.25, 2.5, 1.75], saida: 3

const findMinDays = (duracoes) => {
  let duracaoTotal = 0;
  let dias = 0;
  let order = duracoes.sort((a, b) => a - b);
  let len = order.length;

  for (let i = 0; i < order.length; i++) {
    let first = order[i];
    let last = order[len - 1];

    order.find((item, index) => console.log(item));

    if (first + last <= 3) {
      console.log(1);
    }
  }
};

findMinDays([1.09, 1.04, 1.25, 2.5, 1.75]);
