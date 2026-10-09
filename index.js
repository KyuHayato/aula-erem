let nome = prompt("Qual o seu nome: ");
// RF01.1 Armazenar o nome do cliente.
let numPedido = Number(prompt("Qual o numero do pedido"));
// RF01.2 Armazenar o número identificador do pedido.
const nomeLanchonete = "LancheTech";
// RF01.3 Armazenar o nome da lanchonete.
let nomeProduto = prompt("Qual o nome do produto: ");
// RF01.4 Armazenar o produto inicialmente solicitado.
let preco = Number(prompt("Qual o preço do produto: "));
// RF01.5 Armazenar o preço unitário e a quantidade
let quantidade = Number(prompt("Qual a quantidade: "));
//exibir no console
const subtotal = preco * quantidade;
let taxaEmbalagem = 2;

let estoqueInicial = 20;
let estoqueFinal = estoqueInicial - quantidade;
let statusPedido;
//RF03.1 e RF03.2
if (quantidade <= 0 && quantidade > estoqueInicial) {
  statusPedido = false;
} else {
  statusPedido = true;
} //RF03.3 e RF03.4 e RF03.5
let valorTotalDesconto;
if (statusPedido == true && subtotal >= 100) {
  valorTotalDesconto = subtotal * 1.1;
} else if (statusPedido == true && subtotal >= 50 && subtotal < 100) {
  valorTotalDesconto = subtotal * 1.05;
} else {
  console.log("não ganha desconto");
  valorTotalDesconto = -subtotal;
}

if (statusPedido) {
  valorTotal = subtotal - valorTotalDesconto + taxaEmbalagem;
  //Mostrar para usuario é no final (saida)
  console.log("Cliente: ", nome);
  console.log("Numero: ", numPedido);
  console.log("Produto: ", nomeProduto);
  console.log("Preço unitario: R$", preco);
  console.log("Quantidade: ", quantidade);
  console.log("Estoque restante: ", estoqueFinal);
  console.log("Valor Total: R$", valorTotal.toFixed(2));
} else {
  console.log("Pedido recusado");
}
// if(condicao){ // SE
//   console.log("Pedido recusado");
// } else if(condicao) { // SENÃO SE
//   console.log("Pedido recusado");
// } else { //SENÃO (Se tudo der falso)
// console.log("Pedido recusado");
// }
//Exemplos
// let produtos = [] //array vazio
// produtos = ["Sanduiche",4,"Hamburguer",true, "Coxinha","Suco"]
// let tamanho = produtos.length // tamanho 4
// console.log(produtos[2])
// let pizzas = [
//   {
//     id: 1,
//     sabor: "4 Queijos",
//     estoque: 10,
//     tamanhos: ["Grande", "média", "brotinho"],
//   },
//   {
//     id: 2,
//     sabor: "Marguerita",
//     estoque: 8,
//     tamanhos: ["Grande"],
//   }
// ]
let condicao = 1
while (condicao < 5) {
  console.log("Mostrar valor")
  condicao++
}