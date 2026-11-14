// MODEL: persistência em memória (array).
const canvases = [];
let proximoId = 1;

export const canvasModel = {
    listar() {
        return [...canvases];
    },

    buscarPorId(id) {
        return canvases.find((c) => c.id === id);
    },

    criar({ titulo, largura, altura }) {
        const canvas = {
            id: proximoId++,
            titulo,
            largura,
            altura,
            criadoEm: new Date().toISOString(),
        };
        canvases.push(canvas);
        return canvas;
    },

    atualizar(id, dados) {
        const canvas = canvases.find((c) => c.id === id);
        if (!canvas) return undefined;
        Object.assign(canvas, dados);
        return canvas;
    },

    remover(id) {
        const indice = canvases.findIndex((c) => c.id === id);
        if (indice === -1) return false;
        canvases.splice(indice, 1);
        return true;
    },
};
