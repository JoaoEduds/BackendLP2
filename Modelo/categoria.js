import CategoriaDAO from "../Persistencia/categoriaDAO";

export default class Categoria{
    #codigo;
    #descricao;

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo=novoCodigo;
    } 

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    //construtor (criador de um categoria)
    constructor(codigo=0, descricao=""){
        this.#codigo=codigo;
        this.#descricao=descricao;
    }

    //override do método toJSON
    //o método toJSON é chamado automaticamente quando uma categoria
    //precisar ser convertido no formato JSON
    toJSON(){
        return{
            "codigo": this.#codigo,
            "descricao": this.#descricao
        }
    }

    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async editar(){
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this);
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async consultar(){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(this);
    }
}
