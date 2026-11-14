import { Router } from "express";

export function createNodeRouter(nodeController) {
    const router = Router();

    router.post("/", nodeController.criar);
    router.get("/", nodeController.listar); // aceita ?canvasId=
    router.get("/:id", nodeController.buscarPorId);
    router.put("/:id", nodeController.atualizar);
    router.delete("/:id", nodeController.remover);

    return router;
}
