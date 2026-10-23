const nomeLanchonete = "LancheTech";
let catalogoProdutos = [];
// ============================================================================
// 1. FUNÇÕES AUXILIARES E MODULARES
// ============================================================================
// Formata valores numéricos para o padrão de moeda R$ 00.00
function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2)}`;
}

// Desafio B: Busca manual no catálogo usando for...of (sem .find)
function buscarProdutoPorId(idProduto) {
  for (let produto of catalogoProdutos) {
    if (produto.id === idProduto) {
      return produto; // Retorna o objeto encontrado
    }
  }
  return null; // Retorna nulo se não encontrar
}

// RF04.3: Calcula o subtotal individual de um produto
function calcularSubtotalItem(preco, quantidade) {
  return preco * quantidade;
}
// ============================================================================
// 2. CADASTRO DE PRODUTOS NO CATÁLOGO (do...while)
// ============================================================================
function cadastrarProdutos() {
  alert(
    `Bem-vindo à ${nomeLanchonete}!\nVamos iniciar o cadastro dos produtos no cardápio.`,
  );

  let continuarCadastro = true;

  do {
    let nome = prompt("Nome do produto:");
    let preco = Number(prompt("Preço unitário (ex: 18.50):"));
    let estoque = Number(prompt("Quantidade em estoque:"));

    let novoProduto = {
      id: catalogoProdutos.length + 1,
      nome: nome,
      preco: preco,
      estoque: estoque,
    };
    catalogoProdutos.push(novoProduto);

    let resposta = prompt("Deseja cadastrar mais um produto? (s/n)");
    continuarCadastro =
      resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  } while (continuarCadastro);
}
// ============================================================================
// 3. EXIBIÇÃO DO CARDÁPIO (Desafio A)
// ============================================================================
function montarTextoCardapio() {
  let textoCardapio = `=== CARDÁPIO ${nomeLanchonete.toUpperCase()} ===\n\n`;

  // Percorre o catálogo com for...of
  for (let produto of catalogoProdutos) {
    textoCardapio =
      textoCardapio +
      `${produto.id} - ${produto.nome}: ${formatarMoeda(produto.preco)} (Estoque: ${produto.estoque})\n`;
  }
  return textoCardapio;
}
// ============================================================================
// 4. REGISTRO DO PEDIDO COM MÚLTIPLOS ITENS (RF04.2 / Desafio B)
// ============================================================================
function criarPedidoCliente() {
  alert(montarTextoCardapio());

  let nomeCliente = prompt("Qual o nome do cliente?");
  let numPedido = Number(prompt("Número do pedido:"));

  // RF04.2: Objeto do pedido contendo um array de itens
  let pedido = {
    id: numPedido,
    cliente: nomeCliente,
    itens: [],
  };

  let adicionarMaisItens = true;

  while (adicionarMaisItens) {
    let idEscolhido = Number(
      prompt(`${montarTextoCardapio()}\nDigite o CÓDIGO do produto desejado:`),
    );
    let produtoEncontrado = buscarProdutoPorId(idEscolhido);

    if (produtoEncontrado === null) {
      alert("Código inválido! Tente novamente.");
    } else {
      let qtdDesejada = Number(
        prompt(`Quantas unidades de "${produtoEncontrado.nome}" você deseja?`),
      );

      if (qtdDesejada <= 0) {
        alert("Quantidade inválida! Informe um número maior que zero.");
      } else if (qtdDesejada > produtoEncontrado.estoque) {
        alert(
          `Estoque insuficiente! Temos apenas ${produtoEncontrado.estoque} unidades.`,
        );
      } else {
        // Baixa imediata no estoque do produto
        produtoEncontrado.estoque = produtoEncontrado.estoque - qtdDesejada;

        // Adiciona o item ao pedido
        pedido.itens.push({
          idProduto: produtoEncontrado.id,
          quantidade: qtdDesejada,
        });

        alert(`Adicionado: ${qtdDesejada}x ${produtoEncontrado.nome}`);
      }
    }

    let resposta = prompt("Deseja adicionar mais algum produto? (s/n)");
    adicionarMaisItens =
      resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  }

  return pedido;
}
// ============================================================================
// 5. PROCESSAMENTO E NOTA FISCAL (RF04.3, RF04.4, RF04.5, Desafio C)
// ============================================================================
function emitirNotaFiscal(pedido) {
  let subtotalPedido = 0; // RF04.4: Acumulador de total
  let taxaEmbalagem = 2.0;
  let linhasDosItens = "";

  // RF04.3 e RF04.5: Percorre os itens do pedido com for...of
  for (let item of pedido.itens) {
    let produto = buscarProdutoPorId(item.idProduto);
    let subtotalItem = calcularSubtotalItem(produto.preco, item.quantidade);

    // Acumula o valor da compra
    subtotalPedido = subtotalPedido + subtotalItem;

    // Constrói a linha de cada item: Produto x Qtd: R$ Subtotal
    linhasDosItens =
      linhasDosItens +
      `${produto.nome} x ${item.quantidade}: ${formatarMoeda(subtotalItem)}\n`;
  }

  let totalFinal = subtotalPedido + taxaEmbalagem;

  // Montagem da nota fiscal visual usando Template String multilinha
  let notaFiscal = `==============================
    ${nomeLanchonete} - NOTA FISCAL
==============================
Pedido Nº: ${pedido.id}
Cliente:   ${pedido.cliente}
------------------------------
ITENS:
${linhasDosItens}------------------------------
Subtotal:          ${formatarMoeda(subtotalPedido)}
Taxa de Embalagem: ${formatarMoeda(taxaEmbalagem)}
VALOR TOTAL:       ${formatarMoeda(totalFinal)}
==============================`;

  alert(notaFiscal);
  console.log(notaFiscal);
}
// ============================================================================
// 6. PROCESSAR VÁRIOS PEDIDOS (Desafio D - Repetições Aninhadas)
// ============================================================================
function processarVariosPedidos(listaDePedidos) {
  console.log("\n=== PROCESSAMENTO DE TODOS OS PEDIDOS DO DIA ===");

  // Repetição EXTERNA: percorre a fila de pedidos
  for (let pedido of listaDePedidos) {
    // Repetição INTERNA: executada dentro da função emitirNotaFiscal
    emitirNotaFiscal(pedido);
  }
}
// ============================================================================
// EXECUÇÃO DO FLUXO PRINCIPAL
// ============================================================================

// 1. Cadastra os lanches no cardápio
cadastrarProdutos();

// 2. Verifica se há produtos cadastrados antes de liberar o pedido
if (catalogoProdutos.length > 0) {
  let pedidoRealizado = criarPedidoCliente();

  // 3. Emite a nota fiscal caso o cliente tenha selecionado itens válidos
  if (pedidoRealizado.itens.length > 0) {
    emitirNotaFiscal(pedidoRealizado);
  } else {
    alert("Nenhum item foi selecionado. Pedido cancelado.");
  }
} else {
  alert("Nenhum produto cadastrado no sistema.");
}
