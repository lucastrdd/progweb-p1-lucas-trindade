import { badRequest } from "../utils/erro.js";
import { parseId } from "./canvasController.js";

export function createNodeController(nodeService) {
    return {
        criar(req, res, next) {
            try {
                const node = nodeService.criar(req.body ?? {});
                res.status(201).json(node);
            } catch (err) {
                next(err);
            }
        },

        // Suporta GET /nodes e GET /nodes?canvasId=1
        listar(req, res, next) {
            try {
                let canvasId;
                if (req.query.canvasId !== undefined) {
                    const n = Number(req.query.canvasId);
                    if (!Number.isInteger(n) || n <= 0)
                        throw badRequest(
                            'O query param "canvasId" deve ser um inteiro positivo.',
                        );
                    canvasId = n;
                }
                res.status(200).json(nodeService.listar(canvasId));
            } catch (err) {
                next(err);
            }
        },

        buscarPorId(req, res, next) {
            try {
                res.status(200).json(
                    nodeService.buscarPorId(parseId(req.params.id)),
                );
            } catch (err) {
                next(err);
            }
        },

        atualizar(req, res, next) {
            try {
                const node = nodeService.atualizar(
                    parseId(req.params.id),
                    req.body ?? {},
                );
                res.status(200).json(node);
            } catch (err) {
                next(err);
            }
        },

        remover(req, res, next) {
            try {
                nodeService.remover(parseId(req.params.id));
                res.status(204).send();
            } catch (err) {
                next(err);
            }
        },
    };
}
