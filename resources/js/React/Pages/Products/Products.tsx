
import React, { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination"; // ajuste para o caminho correto

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Correção: usar number ao invés de NodeJS.Timeout
  const debounceRef = useRef<number | null>(null);

  const fetchProducts = async (query = "", pageNum = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?search=${query}&page=${pageNum}`);
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.last_page || 1);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      fetchProducts(search, page);
    }, 500);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [search, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Produtos</h2>

      {/* Campo de busca */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de produtos */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="row">
          {products.map((prod) => (
            <div className="col-md-4 mb-3" key={prod.id}>
              <div className="card">
                <div className="card-body">
                  <h5>{prod.name}</h5>
                  <p>{prod.description}</p>
                  <p><strong>R$ {prod.price}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
