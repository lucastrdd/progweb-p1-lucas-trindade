# TESTES.md — Testes manuais (Thunder Client / Postman)

Base URL: `http://localhost:3000`

## Canvas

| #   | Cenário                       | Método e URL        | Body (JSON)                                                 | Esperado                    |
| --- | ----------------------------- | ------------------- | ----------------------------------------------------------- | --------------------------- |
| 1   | Criar canvas (sucesso)        | `POST /canvases`    | `{"titulo":"Mapa Mental A","largura":1200,"altura":800}`    | **201** + canvas com `id:1` |
| 2   | Criar segundo canvas          | `POST /canvases`    | `{"titulo":"Fluxograma B","largura":1000,"altura":600}`     | **201** + `id:2`            |
| 3   | Criar canvas com título vazio | `POST /canvases`    | `{"titulo":"  ","largura":1200,"altura":800}`               | **400**                     |
| 4   | Criar canvas sem largura      | `POST /canvases`    | `{"titulo":"X","altura":800}`                               | **400**                     |
| 5   | Listar canvases               | `GET /canvases`     | —                                                           | **200** + array com 2 itens |
| 6   | Buscar canvas por ID          | `GET /canvases/1`   | —                                                           | **200**                     |
| 7   | Buscar canvas inexistente     | `GET /canvases/999` | —                                                           | **404**                     |
| 8   | ID inválido                   | `GET /canvases/abc` | —                                                           | **400**                     |
| 9   | Atualizar canvas              | `PUT /canvases/1`   | `{"titulo":"Mapa Mental A v2","largura":1400,"altura":900}` | **200** + dados atualizados |
| 10  | Atualizar com título vazio    | `PUT /canvases/1`   | `{"titulo":"","largura":1400,"altura":900}`                 | **400**                     |
| 11  | Atualizar canvas inexistente  | `PUT /canvases/999` | `{"titulo":"X","largura":1,"altura":1}`                     | **404**                     |

## Node

| #   | Cenário                            | Método e URL              | Body (JSON)                                                      | Esperado                     |
| --- | ---------------------------------- | ------------------------- | ---------------------------------------------------------------- | ---------------------------- |
| 12  | Criar node (sucesso)               | `POST /nodes`             | `{"canvasId":1,"posX":100,"posY":50,"conteudo":"Ideia central"}` | **201** + `id:1`             |
| 13  | Criar 2º node no canvas 1          | `POST /nodes`             | `{"canvasId":1,"posX":300,"posY":120,"conteudo":"Subtópico"}`    | **201** + `id:2`             |
| 14  | Criar node no canvas 2             | `POST /nodes`             | `{"canvasId":2,"posX":10,"posY":10,"conteudo":"Início"}`         | **201** + `id:3`             |
| 15  | Criar node com conteúdo vazio      | `POST /nodes`             | `{"canvasId":1,"posX":0,"posY":0,"conteudo":""}`                 | **400**                      |
| 16  | Criar node sem posX                | `POST /nodes`             | `{"canvasId":1,"posY":0,"conteudo":"A"}`                         | **400**                      |
| 17  | Criar node com canvas inexistente  | `POST /nodes`             | `{"canvasId":999,"posX":0,"posY":0,"conteudo":"Órfão"}`          | **422**                      |
| 18  | Listar todos os nodes              | `GET /nodes`              | —                                                                | **200** + 3 itens            |
| 19  | Filtro 1:N — canvas 1              | `GET /nodes?canvasId=1`   | —                                                                | **200** + apenas nodes 1 e 2 |
| 20  | Filtro 1:N — canvas 2              | `GET /nodes?canvasId=2`   | —                                                                | **200** + apenas node 3      |
| 21  | Filtro com valor inválido          | `GET /nodes?canvasId=abc` | —                                                                | **400**                      |
| 22  | Buscar node por ID                 | `GET /nodes/1`            | —                                                                | **200**                      |
| 23  | Buscar node inexistente            | `GET /nodes/999`          | —                                                                | **404**                      |
| 24  | Atualizar posição                  | `PUT /nodes/1`            | `{"posX":250,"posY":75}`                                         | **200** + nova posição       |
| 25  | Atualizar conteúdo                 | `PUT /nodes/1`            | `{"conteudo":"Ideia central (revisada)"}`                        | **200**                      |
| 26  | Atualizar com conteúdo vazio       | `PUT /nodes/1`            | `{"conteudo":""}`                                                | **400**                      |
| 27  | Mover node para canvas inexistente | `PUT /nodes/1`            | `{"canvasId":999}`                                               | **422**                      |
| 28  | Atualizar node inexistente         | `PUT /nodes/999`          | `{"posX":1}`                                                     | **404**                      |

## Remoção

| #   | Cenário                    | Método e URL            | Body | Esperado            |
| --- | -------------------------- | ----------------------- | ---- | ------------------- |
| 29  | Remover node               | `DELETE /nodes/2`       | —    | **204** (sem corpo) |
| 30  | Remover node já removido   | `DELETE /nodes/2`       | —    | **404**             |
| 31  | Remover canvas (cascata)   | `DELETE /canvases/1`    | —    | **204**             |
| 32  | Buscar canvas removido     | `GET /canvases/1`       | —    | **404**             |
| 33  | Nodes do canvas removido   | `GET /nodes?canvasId=1` | —    | **200** + `[]`      |
| 34  | Remover canvas inexistente | `DELETE /canvases/999`  | —    | **404**             |

## Extras

| #   | Cenário          | Método e URL     | Body         | Esperado |
| --- | ---------------- | ---------------- | ------------ | -------- |
| 35  | JSON malformado  | `POST /canvases` | `{"titulo":` | **400**  |
| 36  | Rota inexistente | `GET /qualquer`  | —            | **404**  |
