import type{ Categoria } from "./Produto.ts";
// [MANTÉM IGUAL]: RF05.1 - Subtotal individual
function calcularSubtotalItem(preco: number, quantidade: number): number {
  return preco * quantidade;
}
// [MANTÉM IGUAL]: RF05.2 - Cálculo puro do desconto
const calcularDesconto = (subtotal: number) => {
  if (subtotal >= 100) {
    return subtotal * 0.1; // 10%
  } else if (subtotal >= 50) {
    return subtotal * 0.05; // 5%
  } else {
    return 0; // Sem desconto
  }   
}
const mostrarMensagem = (mensagem: string, categoria: Categoria): void => {
  console.log(mensagem);
}
type Exemplo = string | boolean;
function exemplo(valor: number, outro: Exemplo): void {
  console.log("Exemplo de função");
}