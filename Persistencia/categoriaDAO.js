import Categoria from "../Modelo/categoria";
import conectar from "./Conexao";

export default class CategoriaDAO{
    constructor(){
        this.init();
    }
    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(codigo)
                );
            `;
            await conexao.executa(sql);
            await conexao.release(conexao);


        }catch(error){
            console.log("Erro ao iniciar a tabela categoria");
        }
    }
    async gravar(categoria){
        if (categoria instanceof Categoria){
            const conexao = await conectar();
            const sql = "INSET INTO categoria(descricao) VALUES ?";
            const parametro = [categoria.descricao];
            const resultado = await conexao.executa(sql,parametro);
            categoria.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    async editar(categoria){
        const conexao = await conectar();
        const sql = "UPDATE categoria SET descricao = ?";
        const parametro = [categoria.descricao];
        await conexao.executa(sql,parametro);
        await conexao.release();
    }

    async excluir(categoria){
        const conexao = await conectar();
        const sql = "DELETE FROM categoria WHERE codigo = ?";
        const parametro = [categoria.descricao];
        await conexao.executa(sql,parametro);
        await conexao.release();
    }

    async consultar(categoria){
        const conexao = await conectar();
        const sql = "SELECT * FROM categoria ORDER BY descricao";
        [registros, campos] = await conexao.query(sql);
        let listaCategoria = [];
        for(const registro of registros){
            const categoria = new Categoria(
                registro['codigo'],
                registro['descricao']
            );
        }
        return listaCategoria
    }
}