import { badRequest } from "../utils/erro.js";

// Converte o parâmetro :id em inteiro; lança 400 se for inválido.
export function parseId(valor) {
    const id = Number(valor);
    if (!Number.isInteger(id) || id <= 0)
        throw badRequest("O id informado deve ser um inteiro positivo.");
    return id;
}

// CONTROLLER: só lida com HTTP (req/res). Regras ficam no service (SRP).
// Erros são repassados com next(err) para o errorHandler global.
export function createCanvasController(canvasService) {
    return {
        criar(req, res, next) {
            try {
                const canvas = canvasService.criar(req.body ?? {});
                res.status(201).json(canvas);
            } catch (err) {
                next(err);
            }
        },

        listar(req, res, next) {
            try {
                res.status(200).json(canvasService.listar());
            } catch (err) {
                next(err);
            }
        },

        buscarPorId(req, res, next) {
            try {
                res.status(200).json(
                    canvasService.buscarPorId(parseId(req.params.id)),
                );
            } catch (err) {
                next(err);
            }
        },

        atualizar(req, res, next) {
            try {
                const canvas = canvasService.atualizar(
                    parseId(req.params.id),
                    req.body ?? {},
                );
                res.status(200).json(canvas);
            } catch (err) {
                next(err);
            }
        },

        remover(req, res, next) {
            try {
                canvasService.remover(parseId(req.params.id));
                res.status(204).send();
            } catch (err) {
                next(err);
            }
        },
    };
}
