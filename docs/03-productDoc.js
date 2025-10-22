export default {
    "/api/products": {
        get: {
            summary: "Listar produtos",
            tags: ["Produtos"],
            parameters: [
                {
                    name: "limit",
                    in: "query",
                    schema: { type: "integer", default: 100 },
                    description: "Número máximo de registros"
                },
                {
                    name: "offset",
                    in: "query",
                    schema: { type: "integer", default: 0 },
                    description: "Deslocamento para paginação"
                },
                {
                    name: "orderBy",

                    in: "query",
                    schema: {
                        type: "string",
                        default: "id,asc",
                        enum: ["id,asc", "id,desc", "created_at,asc", "created_at,desc", "updated_at,asc", "updated_at,desc"],
                    },
                    description: "Campo e direção de ordenação"
                }
            ],
            responses: {
                200: {
                    description: "Lista de usuários"
                },
                400: {
                    description: "Erro de validação (limit excedido)"
                }
            }
        },
        post: {
            summary: "Inserir produto",
            tags: ["Produtos"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["nome", "price"],
                            properties: {
                                nome: { type: "string" },
                                price: { type: "integer" }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: "Criado com sucesso" },
                400: { description: "Campos obrigatório" }
            }
        }
    },
    "/api/products/{id}": {
        get: {
            summary: "Obter produto por ID",
            tags: ["Produtos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                200: { description: "Produto encontrado" },
                404: { description: "Não encontrado" }
            }
        },
        put: {
            summary: "Atualizar produtos",
            tags: ["Produtos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: { type: "string" },
                                price: { type: "number" }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: "Atualizado com sucesso" },
                400: { description: "Nenhum campo informado" },
                404: { description: "Produto não encontrado" }
            }
        },
        delete: {
            summary: "Remover produto",
            tags: ["Produtos"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" }
                }
            ],
            responses: {
                204: { description: "Removido com sucesso" },
                404: { description: "Produto não encontrado" }
            }
        }
    },
};