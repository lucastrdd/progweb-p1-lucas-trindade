import { badRequest, notFound } from "../utils/erro.js";

const textoValido = (v) => typeof v === "string" && v.trim() !== "";
const numeroPositivo = (v) =>
    typeof v === "number" && Number.isFinite(v) && v > 0;

// Valida o corpo; lança 400 em caso de problema.
function validar({ titulo, largura, altura } = {}) {
    if (!textoValido(titulo))
        throw badRequest(
            'O campo "titulo" é obrigatório e não pode ser vazio.',
        );
    if (!numeroPositivo(largura))
        throw badRequest(
            'O campo "largura" deve ser um número maior que zero.',
        );
    if (!numeroPositivo(altura))
        throw badRequest('O campo "altura" deve ser um número maior que zero.');
}

// DIP: o service recebe suas dependências por injeção,
// em vez de importá-las diretamente.
export function createCanvasService({ canvasModel, nodeModel }) {
    const obterOuFalhar = (id) => {
        const canvas = canvasModel.buscarPorId(id);
        if (!canvas) throw notFound(`Canvas com id ${id} não encontrado.`);
        return canvas;
    };

    return {
        criar(dados) {
            validar(dados);
            return canvasModel.criar({
                titulo: dados.titulo.trim(),
                largura: dados.largura,
                altura: dados.altura,
            });
        },

        listar() {
            return canvasModel.listar();
        },

        buscarPorId(id) {
            return obterOuFalhar(id);
        },

        atualizar(id, dados) {
            obterOuFalhar(id);
            validar(dados);
            return canvasModel.atualizar(id, {
                titulo: dados.titulo.trim(),
                largura: dados.largura,
                altura: dados.altura,
            });
        },

        // Regra de integridade: ao remover um canvas, seus nós também são removidos (cascata),
        // evitando nós "órfãos".
        remover(id) {
            obterOuFalhar(id);
            nodeModel.removerPorCanvasId(id);
            canvasModel.remover(id);
        },
    };
}
