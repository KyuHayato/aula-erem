let catalogoProdutos = [];
let tamanhoCatalogo = 0;
let continuarCadastro = false;
do {
  catalogoProdutos[catalogoProdutos].nome = prompt("Nome do produto: ");
  catalogoProdutos[tamanhoCatalogo].preco = prompt("Qual o preço: ");
  catalogoProdutos[tamanhoCatalogo].estoque = prompt("Qual o estoque: ");
  continuarCadastro = Boolean(prompt("Quer continuar cadastrando? "));
  tamanhoCatalogo++
} while (continuarCadastro);
console.log(catalogoProdutos)