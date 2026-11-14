// Registra método, URL, status e tempo de cada requisição.
export function logger(req, res, next) {
    const inicio = Date.now();
    res.on("finish", () => {
        const ms = Date.now() - inicio;
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`,
        );
    });
    next();
}
