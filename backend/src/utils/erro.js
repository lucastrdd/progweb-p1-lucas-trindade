// Classe customizada de erro HTTP.
// Os services lançam esses erros e o errorHandler os converte em resposta.
export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "HttpError";
        this.status = status;
    }
}

export const badRequest = (msg) => new HttpError(400, msg); // campos inválidos/ausentes
export const notFound = (msg) => new HttpError(404, msg); // recurso inexistente
export const unprocessable = (msg) => new HttpError(422, msg); // violação de regra relacional
