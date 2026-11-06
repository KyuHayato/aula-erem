// ============================================================================
// SISTEMA LANCHETECH - ATUALIZAÇÃO PARA RF06 E DESAFIO DO ESTUDANTE
// Conceitos: Funções modulares, toFixed(2), Template Literals e Validações
//
// GUIA DE ATUALIZAÇÃO PARA OS ALUNOS:
// - [MANTÉM IGUAL]: Códigos já construídos nas aulas anteriores.
// - [NOVO REQUISITO: RF06]: Códigos e funções novas a serem adicionadas.
// - [ALTERAR / REFATORAR: RF06]: Funções que existiam, mas foram atualizadas.
// ============================================================================

const nomeLanchonete = "LANCHETECH";
const taxaEmbalagemPadrao = 2.0;

let catalogoProdutos = [];
let listaDePedidos = [];

// ============================================================================
// 1. FUNÇÕES AUXILIARES E FORMATAÇÃO
// ============================================================================

// [ALTERAR / REFATORAR: RF06.3]
// Atualizado para usar toFixed(2) e replace(".", ",") para padrão brasileiro (ex: R$ 37,00)
// function formatarMoeda(valor) {
//   return `R$ ${valor.toFixed(2).replace(".", ",")}`;
// }
const formatarMoeda = valor => `R$ ${valor.toFixed(2).replace(".", ",")}`;

// [MANTÉM IGUAL]: Busca manual no catálogo com for...of (sem .find)
function buscarProdutoPorId(idProduto, listaProdutos = catalogoProdutos) {
  for (let produto of listaProdutos) {
    if (produto.id === idProduto) {
      return produto;
    }
  }
  return null;
}

// ============================================================================
// 2. FUNÇÕES DE CÁLCULO (MANTIDAS DO RF05)
// ============================================================================

// [MANTÉM IGUAL]: RF05.1 - Subtotal individual
function calcularSubtotalItem(preco, quantidade) {
  return preco * quantidade;
}

// [MANTÉM IGUAL]: RF05.2 - Cálculo puro do desconto
function calcularDesconto(subtotal) {
  if (subtotal >= 100) {
    return subtotal * 0.1; // 10%
  } else if (subtotal >= 50) {
    return subtotal * 0.05; // 5%
  } else {
    return 0; // Sem desconto
  }
}

// [MANTÉM IGUAL]: RF05.3 - Cálculo do total final com desconto e taxa
function calcularTotalFinal(subtotal, taxaEmbalagem) {
  let valorDesconto = calcularDesconto(subtotal);
  return subtotal - valorDesconto + taxaEmbalagem;
}

// [MANTÉM IGUAL]: Desafio D - Subtotal acumulado do pedido
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

// ============================================================================
// 3. NOVAS FUNÇÕES DO RF06 (STATUS E RESUMO FORMATADO)
// ============================================================================

// [NOVO REQUISITO: RF06.4]
// Avalia as condições do pedido e retorna a mensagem de confirmação ou recusa
function verificarStatusPedido(pedido, listaCatalogo) {
  // Se o pedido não tiver itens cadastrados
  if (pedido.itens.length === 0) {
    return "Pedido recusado: nenhum item informado.";
  }

  // Verifica se todos os itens existem no cardápio
  for (let item of pedido.itens) {
    let produto = buscarProdutoPorId(item.idProduto, listaCatalogo);

    if (produto === null) {
      return "Pedido recusado: item não encontrado no catálogo.";
    }
  }

  // Se passou em todas as verificações
  return "Pedido aprovado.";
}

// [ALTERAR / REFATORAR: RF06.1, RF06.2, RF06.3, RF06.4 e Desafio do Estudante]
// Gera exatamente a string com o formato visual exigido no desafio
function gerarResumoPedido(pedido, listaCatalogo, taxaEmbalagem) {
  // RF06.3: Cálculos financeiros utilizando as funções puras
  let subtotal = calcularTotalPedido(pedido.itens, listaCatalogo);
  let desconto = calcularDesconto(subtotal);
  let totalFinal = calcularTotalFinal(subtotal, taxaEmbalagem);

  // RF06.4: Obtenção do status do pedido
  let status = verificarStatusPedido(pedido, listaCatalogo);

  // RF06.2: Construção da lista de itens no formato: "Nome x Qtd R$ Valor"
  let linhasItens = "";
  for (let item of pedido.itens) {
    let produto = buscarProdutoPorId(item.idProduto, listaCatalogo);
    if (produto !== null) {
      let subtotalItem = calcularSubtotalItem(produto.preco, item.quantidade);
      linhasItens =
        linhasItens +
        `${produto.nome} x ${item.quantidade} ${formatarMoeda(subtotalItem)}\n`;
    }
  }

  // RF06.1, RF06.2, RF06.3, RF06.4: Montagem via Template Literals com toFixed(2)
  let resumo = `================================
${nomeLanchonete}
================================
Pedido: ${pedido.id}
Cliente: ${pedido.cliente}
ITENS DO PEDIDO
${linhasItens}Subtotal: ${formatarMoeda(subtotal)}
Desconto: ${formatarMoeda(desconto)}
Embalagem: ${formatarMoeda(taxaEmbalagem)}
--------------------------------
TOTAL: ${formatarMoeda(totalFinal)}
Status: ${status}
================================`;

  return resumo; // Retorna a string pronta para impressão
}

// ============================================================================
// 4. CADASTRO DE PRODUTOS E CARDÁPIO
// ============================================================================

// [MANTÉM IGUAL]: Cadastro inicial de produtos no cardápio
function cadastrarProdutos() {
  alert(
    `Bem-vindo à ${nomeLanchonete}!\nVamos cadastrar os produtos do cardápio.`,
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

// [MANTÉM IGUAL]: Montagem do cardápio
function montarTextoCardapio() {
  let textoCardapio = `=== CARDÁPIO ${nomeLanchonete} ===\n\n`;

  for (let produto of catalogoProdutos) {
    textoCardapio =
      textoCardapio +
      `${produto.id} - ${produto.nome}: ${formatarMoeda(produto.preco)} (Estoque: ${produto.estoque})\n`;
  }

  return textoCardapio;
}

// ============================================================================
// 5. REGISTRO DE PEDIDOS
// ============================================================================

// [MANTÉM IGUAL]: Registro de um único pedido
function criarPedidoCliente() {
  alert(montarTextoCardapio());

  let nomeCliente = prompt("Qual o nome do cliente?");
  let numPedido = Number(prompt("Número identificador do pedido:"));

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
    let produtoEncontrado = buscarProdutoPorId(idEscolhido, catalogoProdutos);

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
        // Baixa imediata de estoque
        produtoEncontrado.estoque = produtoEncontrado.estoque - qtdDesejada;

        pedido.itens.push({
          idProduto: produtoEncontrado.id,
          quantidade: qtdDesejada,
        });

        alert(`Adicionado: ${qtdDesejada}x ${produtoEncontrado.nome}`);
      }
    }

    let resposta = prompt(
      "Deseja adicionar mais algum produto neste mesmo pedido? (s/n)",
    );
    adicionarMaisItens =
      resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  }

  return pedido;
}

// [MANTÉM IGUAL]: Cadastro de vários pedidos
function cadastrarVariosPedidos() {
  let registrarOutroPedido = true;

  while (registrarOutroPedido) {
    let novoPedido = criarPedidoCliente();

    if (novoPedido.itens.length > 0) {
      listaDePedidos.push(novoPedido);
      alert(`Pedido #${novoPedido.id} registrado com sucesso!`);
    } else {
      alert("Nenhum item adicionado. Pedido cancelado.");
    }

    let resposta = prompt(
      "Deseja registrar OUTRO pedido para outro cliente? (s/n)",
    );
    registrarOutroPedido =
      resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
  }
}

// ============================================================================
// 6. PROCESSAMENTO E EMISSÃO DE NOTAS (RF06 E DESAFIO DO ESTUDANTE)
// ============================================================================

// [ALTERAR / REFATORAR]: Processa os pedidos e imprime a string retornada
// function processarVariosPedidos(pedidos, catalogo) {
//   alert(`\nProcessando ${pedidos.length} pedido(s)...`);

//   for (let pedido of pedidos) {
//     // A função retorna a string formatada
//     let textoResumo = gerarResumoPedido(pedido, catalogo, taxaEmbalagemPadrao);

//     // Critério do Desafio: exibir na tela (alert) e no terminal (console.log)
//     alert(textoResumo);
//     console.log(textoResumo);
//   }
// }
//Refatorando função com Arrow Function
const processarVariosPedidos = (pedidos, catalogo) => {
  alert(`\nProcessando ${pedidos.length} pedido(s)...`);
  for (let pedido of pedidos) {
    // A função retorna a string formatada
    let textoResumo = gerarResumoPedido(pedido, catalogo, taxaEmbalagemPadrao);

    // Critério do Desafio: exibir na tela (alert) e no terminal (console.log)
    alert(textoResumo);
    console.log(textoResumo);
  }
};

// ============================================================================
// 7. FLUXO PRINCIPAL DO PROGRAMA
// ============================================================================

// 1. Cadastra os produtos no cardápio
cadastrarProdutos();

// 2. Se houver produtos cadastrados, inicia o registro dos pedidos
if (catalogoProdutos.length > 0) {
  cadastrarVariosPedidos();

  // 3. Processa e exibe todos os resumos
  if (listaDePedidos.length > 0) {
    processarVariosPedidos(listaDePedidos, catalogoProdutos);
  } else {
    alert("Nenhum pedido foi realizado.");
  }
} else {
  alert("Nenhum produto cadastrado no sistema.");
}
