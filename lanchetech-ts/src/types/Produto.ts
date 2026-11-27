export type Categoria = 
    |'massas'
    | 'comida japonesa'
    | 'sobremesa'
    | 'salgado'
    | 'bebida'

export interface Produto {
    nome: string;
    preco: number;
    quantidade: number;
    categoria: string;
    descricao?: string; // Campo opcional
}

let produto1: Produto;

produto1 = {
    nome: 'X-Tudo',
    preco: 15.00,
    quantidade: 25,
    categoria: 'salgado'
};