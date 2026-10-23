let catalogoProdutos = [];
let continuarCadastro = true;
const nomeLanchonete = "LancheTech";
do {
  let nome = prompt("Nome do produto:");
  let preco = Number(prompt("Qual o preço?"));
  let estoque = Number(prompt("Qual o estoque?"));
  let produto = {
    id: catalogoProdutos.length + 1,
    nome: nome,
    preco: preco,
    estoque: estoque,
  };
  catalogoProdutos.push(produto);
  let resposta = prompt("Quer continuar cadastrando? (s/n)");
  continuarCadastro =
    resposta.toLowerCase() === "s" || resposta.toLowerCase() === "sim";
} while (continuarCadastro);
alert(catalogoProdutos);

