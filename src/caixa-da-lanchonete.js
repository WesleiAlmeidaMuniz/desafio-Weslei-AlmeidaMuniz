class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {

    // Verificar se a forma de pagamento é válida
    const formasPagamentoValidas = ["dinheiro", "debito", "credito"];
    if (!formasPagamentoValidas.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Variável para o valor total da compra
    let valorTotal = 0;

    // Iterar sobre os itens do pedido
    for (const item of itens) {
      const codigo = item.split(',') // Separa o item da Quantidade
      const quantidade = codigo[1]

      //Validação da Quantidade
      if (Number(quantidade) === 0) {
        return "Quantidade inválida!";
      }

      // Verificar se o item é válido
      if (!cardapioValor(codigo[0])) {
        return "Item inválido!";
      }

      // Calcular o valor do item com base na quantidade
      const valorItem = cardapioValor(codigo[0]) * quantidade;

      // Verificar se há item principal para o chantily
      if (["chantily"].includes(codigo[0])) {
        const codigosItensPrincipais = ["cafe"];
        const codigosItensExtras = ["chantily"];

        const itemPrincipal = itens.findIndex(item => codigosItensPrincipais.includes(item.split(',')[0]));
        const itemExtra = itens.findIndex(item => codigosItensExtras.includes(item.split(',')[0]));

        if (itemExtra !== -1 && itemPrincipal === -1) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      // Verificar se há item principal para o queijo
      if (["queijo"].includes(codigo[0])) {
        const codigosItensPrincipais = ["sanduiche"];
        const codigosItensExtras = ["queijo"];

        const itemPrincipal = itens.findIndex(item => codigosItensPrincipais.includes(item.split(',')[0]));
        const itemExtra = itens.findIndex(item => codigosItensExtras.includes(item.split(',')[0]));

        if (itemExtra !== -1 && itemPrincipal === -1) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      // Soma do item no valor total
      valorTotal += valorItem;
    }

    // Aplicar desconto ou acréscimo de acordo com a forma de pagamento
    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95; // Aplicar desconto de 5%
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03; // Aplicar acréscimo de 3%
    }

    // Verificar se há itens no carrinho de compra
    if (valorTotal === 0) {
      return "Não há itens no carrinho de compra!";
    }

    // Retornar o valor total formatado
    const valorTotalFormatado = (valorTotal * 1).toFixed(2).replace('.', ',');
    return `R$ ${valorTotalFormatado}`;

  }
}

function cardapioValor(codigo) {
  const cardapio = {
    cafe: 3.00,
    chantily: 1.50,
    suco: 6.20,
    sanduiche: 6.50,
    queijo: 2.00,
    salgado: 7.25,
    combo1: 9.50,
    combo2: 7.50,
  };

  return cardapio[codigo];
}


export { CaixaDaLanchonete };
