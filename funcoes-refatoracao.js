// ============================================================================
// GUIA DE ATUALIZAÇÃO: LANCHETECH (RF05 & DESAFIOS)
// Instruções para os alunos:
// 1. Procure pelas tags [NOVO REQUISITO] e implemente as funções indicadas.
// 2. Procure pelas tags [ALTERAR / REFATORAR] para atualizar o código antigo.
// 3. Os trechos com [MANTÉM IGUAL] já estão prontos da última aula.
// ============================================================================

const nomeLanchonete = "LancheTech";
const taxaEmbalagemPadrao = 2.0;

let catalogoProdutos = [];

// [NOVO]: Array para armazenar todos os pedidos cadastrados no sistema
let listaDePedidos = [];

// ============================================================================
// 1. FUNÇÕES AUXILIARES
// ============================================================================

// [MANTÉM IGUAL]: Formatação de moeda
function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2)}`;
}

// [MANTÉM IGUAL]: Busca linear manual no catálogo com for...of
function buscarProdutoPorId(idProduto, listaProdutos = catalogoProdutos) {
  for (let produto of listaProdutos) {
    if (produto.id === idProduto) {
      return produto;
    }
  }
  return null;
}

// ============================================================================
// 2. NOVAS FUNÇÕES MODULARES (RF05 E DESAFIOS A, B, C, D)
// ============================================================================
// [NOVO REQUISITO: RF05.1 / Desafio A]
// Função para calcular o subtotal de um único item (preço * quantidade)
function calcularSubtotalItem(preco, quantidade) {
  return preco * quantidade;
}
// [NOVO REQUISITO: RF05.2 / Desafio B]
// Função de cálculo de desconto com regra comercial:
// - A partir de R$ 100 -> 10% de desconto
// - A partir de R$ 50  -> 5% de desconto
// - Menor que R$ 50    -> sem desconto (0)
// ATENÇÃO: Esta é uma função pura: apenas recebe o subtotal e retorna o valor, sem alert ou console.log!
function calcularDesconto(subtotal) {
  if (subtotal >= 100) {
    return subtotal * 0.10;
  } else if (subtotal >= 50) {
    return subtotal * 0.05;
  } else {
    return 0;
  }
}

// [NOVO REQUISITO: RF05.3 / Desafio C]
// Composição de funções: reutiliza calcularDesconto() para calcular o total a pagar
function calcularTotalFinal(subtotal, taxaEmbalagem) {
  let valorDesconto = calcularDesconto(subtotal);
  let totalComDesconto = subtotal - valorDesconto + taxaEmbalagem;
  return totalComDesconto;
}

// [NOVO REQUISITO: Desafio D]
// Função calcularTotalPedido(itens, catalogo):
// 1. Recebe a lista de itens do pedido e o catálogo de produtos
// 2. Percorre os itens com for...of
// 3. Busca o produto com buscarProdutoPorId()
// 4. Calcula o subtotal chamando calcularSubtotalItem()
// 5. Retorna o valor acumulado de todos os itens do pedido
function calcularTotalPedido(itens, listaCatalogo) {
  let subtotalAcumulado = 0;

  for (let item of itens) {
    let produto = buscarProdutoPorId(item.idProduto, listaCatalogo);

    if (produto !== null) {
      let subtotalItem = calcularSubtotalItem(produto.preco, item.quantidade);
      subtotalAcumulado = subtotalAcumulado + subtotalItem;
    }
  }
  return subtotalAcumulado;
}

// [ALTERAR / REFATORAR: RF05.4 / Desafio do Estudante]
// Refatoramos a antiga "emitirNotaFiscal": agora a função gerarResumoPedido()
// REUTILIZA as funções de cálculo criadas acima e retorna o texto formatado.
function gerarResumoPedido(pedido, listaCatalogo, taxaEmbalagem) {
  // Chamada das funções modulares criadas no RF05:
  let subtotal = calcularTotalPedido(pedido.itens, listaCatalogo);
  let desconto = calcularDesconto(subtotal);
  let totalFinal = calcularTotalFinal(subtotal, taxaEmbalagem);

  let linhasItens = "";

  for (let item of pedido.itens) {
    let produto = buscarProdutoPorId(item.idProduto, listaCatalogo);
    if (produto !== null) {
      let subtotalItem = calcularSubtotalItem(produto.preco, item.quantidade);
      linhasItens = linhasItens + `${produto.nome} x ${item.quantidade}: ${formatarMoeda(subtotalItem)}\n`;
    }
  }

  // Template string com o resumo financeiro completo (com desconto)
  let notaFiscal = `==============================
       ${nomeLanchonete} - NOTA FISCAL
==============================
Pedido Nº: ${pedido.id}
Cliente:   ${pedido.cliente}
------------------------------
ITENS:
${linhasItens}------------------------------
Subtotal:          ${formatarMoeda(subtotal)}
Desconto:         -${formatarMoeda(desconto)}
Taxa de Embalagem: ${formatarMoeda(taxaEmbalagem)}
TOTAL A PAGAR:     ${formatarMoeda(totalFinal)}
==============================`;

  return notaFiscal;
}

// ============================================================================
// 3. ETAPAS DE CADASTRO E CARDÁPIO
// ============================================================================

// [MANTÉM IGUAL]: Cadastro inicial de produtos no cardápio
function cadastrarProdutos() {
  alert(`Bem-vindo à ${nomeLanchonete}!\nVamos iniciar o cadastro dos produtos no cardápio.`);

  let continuarCadastro = true;

  do {
    let nome = prompt("Nome do produto:");
    let preco = Number(prompt("Preço unitário (ex: 18.50):"));
    let estoque = Number(prompt("Quantidade em estoque:"));

    let novoProduto = {
      id: catalogoProdutos.length + 1,
      nome: nome,
      preco: preco,
      estoque: estoque
    };

    catalogoProdutos.push(novoProduto);

    let resposta = prompt("Deseja cadastrar mais um produto no cardápio? (s/n)");
    continuarCadastro = resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  } while (continuarCadastro);
}

// [MANTÉM IGUAL]: Montagem do texto do cardápio
function montarTextoCardapio() {
  let textoCardapio = `=== CARDÁPIO ${nomeLanchonete.toUpperCase()} ===\n\n`;

  for (let produto of catalogoProdutos) {
    textoCardapio = textoCardapio + `${produto.id} - ${produto.nome}: ${formatarMoeda(produto.preco)} (Estoque: ${produto.estoque})\n`;
  }

  return textoCardapio;
}

// [MANTÉM IGUAL]: Registro de um único pedido com múltiplos itens (RF04.2)
function criarPedidoCliente() {
  alert(montarTextoCardapio());

  let nomeCliente = prompt("Qual o nome do cliente?");
  let numPedido = Number(prompt("Número identificador do pedido:"));

  let pedido = {
    id: numPedido,
    cliente: nomeCliente,
    itens: []
  };

  let adicionarMaisItens = true;

  while (adicionarMaisItens) {
    let idEscolhido = Number(
      prompt(`${montarTextoCardapio()}\nDigite o CÓDIGO do produto desejado:`)
    );
    let produtoEncontrado = buscarProdutoPorId(idEscolhido, catalogoProdutos);

    if (produtoEncontrado === null) {
      alert("Código de produto inválido! Tente novamente.");
    } else {
      let qtdDesejada = Number(
        prompt(`Quantas unidades de "${produtoEncontrado.nome}" você deseja?`)
      );

      if (qtdDesejada <= 0) {
        alert("Quantidade inválida! Informe um número maior que zero.");
      } else if (qtdDesejada > produtoEncontrado.estoque) {
        alert(`Estoque insuficiente! Temos apenas ${produtoEncontrado.estoque} unidades.`);
      } else {
        produtoEncontrado.estoque = produtoEncontrado.estoque - qtdDesejada;

        pedido.itens.push({
          idProduto: produtoEncontrado.id,
          quantidade: qtdDesejada
        });

        alert(`Adicionado: ${qtdDesejada}x ${produtoEncontrado.nome}`);
      }
    }

    let resposta = prompt("Deseja adicionar mais algum produto neste mesmo pedido? (s/n)");
    adicionarMaisItens = resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  }
  return pedido;
}
// ============================================================================
// 4. PROCESSAMENTO DE VÁRIOS PEDIDOS (RF05.5)
// ============================================================================
// [NOVO]: Permite cadastrar múltiplos pedidos em fila usando um laço while
function cadastrarVariosPedidos() {
  let registrarOutroPedido = true;

  while (registrarOutroPedido) {
    let novoPedido = criarPedidoCliente();

    // Valida se o cliente adicionou ao menos um item
    if (novoPedido.itens.length > 0) {
      listaDePedidos.push(novoPedido);
      alert(`Pedido #${novoPedido.id} registrado com sucesso!`);
    } else {
      alert("Nenhum item adicionado. Pedido cancelado.");
    }

    let resposta = prompt("Deseja registrar OUTRO pedido para outro cliente? (s/n)");
    registrarOutroPedido = resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  }
}

// [ALTERAR / REFATORAR: RF05.5 e Desafio D]
// Repetição Aninhada:
// - Repetição Externa (aqui): percorre a listaDePedidos com for...of
// - Repetição Interna (dentro de gerarResumoPedido): percorre os itens de cada pedido
function processarVariosPedidos(pedidos, catalogo) {
  alert(`\nProcessando notas fiscais de ${pedidos.length} pedido(s)...`);

  for (let pedido of pedidos) {
    // Reutiliza a função gerarResumoPedido para cada pedido da lista
    let notaFiscal = gerarResumoPedido(pedido, catalogo, taxaEmbalagemPadrao);

    alert(notaFiscal);
    console.log(notaFiscal);
  }
}

// ============================================================================
// 5. FLUXO PRINCIPAL (ALTERAR)
// ============================================================================

// 1. Cadastro inicial do cardápio
cadastrarProdutos();

// [ALTERAR]: Em vez de processar apenas 1 pedido, agora cadastramos vários e processamos a lista completa
if (catalogoProdutos.length > 0) {
  // Registra 1 ou mais pedidos interativamente
  cadastrarVariosPedidos();

  // Se houver pedidos válidos cadastrados, emite todas as notas
  if (listaDePedidos.length > 0) {
    processarVariosPedidos(listaDePedidos, catalogoProdutos);
  } else {
    alert("Nenhum pedido foi concluído.");
  }
} else {
  alert("Nenhum produto cadastrado no catálogo. Sistema encerrado.");
}