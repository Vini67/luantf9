import Product from "../../../Models/Product.js"; // Sequelize model

export default async function ListProductController(req, res) {
  try {
    const { search = "", page = 1 } = req.query;
    const limit = 6;
    const offset = (page - 1) * limit;

    // Consulta com filtro de busca
    const whereClause = search
      ? { name: { [Op.like]: `%${search}%` } } // Sequelize: LIKE '%search%'
      : {};

    // Importar Op do Sequelize
    const { Op } = require("sequelize");

    // Busca paginada
    const { rows: products, count: total } = await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      data: products,
      current_page: Number(page),
      last_page: totalPages,
      total,
    });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return res.status(500).json({ error: error.message });
  }
}
