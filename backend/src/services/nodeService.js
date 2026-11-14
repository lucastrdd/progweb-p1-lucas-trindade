import { badRequest, notFound, unprocessable } from "../utils/erro.js";

const textoValido = (v) => typeof v === "string" && v.trim() !== "";
const numeroValido = (v) => typeof v === "number" && Number.isFinite(v);
const idValido = (v) => Number.isInteger(v) && v > 0;

// Valida os campos. Em modo parcial (PUT), só valida o que foi enviado.
function validar(dados = {}, { parcial = false } = {}) {
    const { canvasId, posX, posY, conteudo } = dados;

    if (!parcial || canvasId !== undefined) {
        if (!idValido(canvasId))
            throw badRequest(
                'O campo "canvasId" é obrigatório e deve ser um inteiro positivo.',
            );
    }
    if (!parcial || posX !== undefined) {
        if (!numeroValido(posX))
            throw badRequest(
                'O campo "posX" é obrigatório e deve ser um número.',
            );
    }
    if (!parcial || posY !== undefined) {
        if (!numeroValido(posY))
            throw badRequest(
                'O campo "posY" é obrigatório e deve ser um número.',
            );
    }
    if (!parcial || conteudo !== undefined) {
        if (!textoValido(conteudo))
            throw badRequest(
                'O campo "conteudo" é obrigatório e não pode ser vazio.',
            );
    }
    if (
        parcial &&
        [canvasId, posX, posY, conteudo].every((v) => v === undefined)
    ) {
        throw badRequest(
            "Envie ao menos um campo para atualizar: canvasId, posX, posY ou conteudo.",
        );
    }
}

// DIP: depende de canvasModel apenas para verificar integridade referencial.
export function createNodeService({ nodeModel, canvasModel }) {
    const obterOuFalhar = (id) => {
        const node = nodeModel.buscarPorId(id);
        if (!node) throw notFound(`Node com id ${id} não encontrado.`);
        return node;
    };

    // Integridade referencial: o canvas pai precisa existir (422 se não existir).
    const garantirCanvasExiste = (canvasId) => {
        if (!canvasModel.buscarPorId(canvasId)) {
            throw unprocessable(
                `Canvas com id ${canvasId} não existe; não é possível associar o node.`,
            );
        }
    };

    return {
        criar(dados = {}) {
            validar(dados); // 400
            garantirCanvasExiste(dados.canvasId); // 422
            return nodeModel.criar({
                canvasId: dados.canvasId,
                posX: dados.posX,
                posY: dados.posY,
                conteudo: dados.conteudo.trim(),
            });
        },

        listar(canvasId) {
            return nodeModel.listar({ canvasId });
        },

        buscarPorId(id) {
            return obterOuFalhar(id);
        },

        atualizar(id, dados = {}) {
            obterOuFalhar(id); // 404
            validar(dados, { parcial: true }); // 400
            if (dados.canvasId !== undefined)
                garantirCanvasExiste(dados.canvasId); // 422

            // Atualiza somente os campos permitidos e enviados
            const camposPermitidos = {};
            for (const campo of ["canvasId", "posX", "posY", "conteudo"]) {
                if (dados[campo] !== undefined) {
                    camposPermitidos[campo] =
                        campo === "conteudo"
                            ? dados[campo].trim()
                            : dados[campo];
                }
            }
            return nodeModel.atualizar(id, camposPermitidos);
        },

        remover(id) {
            obterOuFalhar(id);
            nodeModel.remover(id);
        },
    };
}
