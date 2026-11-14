// MODEL: persistência em memória dos nós (entidade filha de Canvas).
const nodes = [];
let proximoId = 1;

export const nodeModel = {
    // Filtro opcional por canvasId (relação 1:N)
    listar({ canvasId } = {}) {
        if (canvasId === undefined) return [...nodes];
        return nodes.filter((n) => n.canvasId === canvasId);
    },

    buscarPorId(id) {
        return nodes.find((n) => n.id === id);
    },

    criar({ canvasId, posX, posY, conteudo }) {
        const node = {
            id: proximoId++,
            canvasId,
            posX,
            posY,
            conteudo,
            criadoEm: new Date().toISOString(),
        };
        nodes.push(node);
        return node;
    },

    atualizar(id, dados) {
        const node = nodes.find((n) => n.id === id);
        if (!node) return undefined;
        Object.assign(node, dados);
        return node;
    },

    remover(id) {
        const indice = nodes.findIndex((n) => n.id === id);
        if (indice === -1) return false;
        nodes.splice(indice, 1);
        return true;
    },

    // Usado para exclusão em cascata quando um canvas é removido
    removerPorCanvasId(canvasId) {
        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].canvasId === canvasId) nodes.splice(i, 1);
        }
    },
};
