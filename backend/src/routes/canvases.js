import { Router } from "express";

export function createCanvasRouter(canvasController) {
    const router = Router();

    router.post("/", canvasController.criar);
    router.get("/", canvasController.listar);
    router.get("/:id", canvasController.buscarPorId);
    router.put("/:id", canvasController.atualizar);
    router.delete("/:id", canvasController.remover);

    return router;
}
