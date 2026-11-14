import { HttpError } from "../utils/erro.js";

export function errorHandler(err, req, res, next) {
    // Erros de negócio/validação conhecidos
    if (err instanceof HttpError) {
        return res.status(err.status).json({ erro: err.message });
    }

    // JSON malformado no corpo da requisição
    if (err.type === "entity.parse.failed") {
        return res
            .status(400)
            .json({ erro: "JSON inválido no corpo da requisição." });
    }

    // Qualquer outro erro inesperado
    console.error(err);
    return res.status(500).json({ erro: "Erro interno do servidor." });
}
