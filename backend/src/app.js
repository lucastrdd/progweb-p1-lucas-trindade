import express from "express";

import { canvasModel } from "./models/canvasModel.js";
import { nodeModel } from "./models/nodeModel.js";
import { createCanvasService } from "./services/canvasService.js";
import { createNodeService } from "./services/nodeService.js";
import { createCanvasController } from "./controllers/canvasController.js";
import { createNodeController } from "./controllers/nodeController.js";
import { createCanvasRouter } from "./routes/canvases.js";
import { createNodeRouter } from "./routes/nodes.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./utils/erro.js";

const canvasService = createCanvasService({ canvasModel, nodeModel });
const nodeService = createNodeService({ nodeModel, canvasModel });

const canvasController = createCanvasController(canvasService);
const nodeController = createNodeController(nodeService);

const app = express();

app.use(express.json());
app.use(logger);

app.use("/canvases", createCanvasRouter(canvasController));
app.use("/nodes", createNodeRouter(nodeController));

// Rota inexistente -> 404 padronizado
app.use((req, res, next) =>
    next(notFound(`Rota ${req.method} ${req.originalUrl} não encontrada.`)),
);

// Tratamento global de erros (sempre por último)
app.use(errorHandler);

export default app;
