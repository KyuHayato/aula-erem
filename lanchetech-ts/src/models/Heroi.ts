type Genero = 'masculino' | 'feminino' | 'outro'

export class Heroi {
    // Atributos (Características do herói)
    nome: string;
    raca: string;
    idade: number;
    genero: Genero;
    poder: string;
    universo: string;
    constructor(
        nome:string,
        raca:string,
        idade:number,
        genero:Genero,
        poder:string,
        universo:string,
    ) {
        this.nome = nome;
        this.raca = raca;
        this.idade = idade;
        this.genero = genero;
        this.poder = poder;
        this.universo = universo;
    }
    // Metodos (Ações do herói)
    atacar():void {}
    defender():void {}
    salvar():void {}
}

const jhonsFih = new Heroi(
    'Jhons Fih',
    'Humano',
    30,
    'masculino',
    'Força',
    'Marvel',
);