import { useEffect, useState } from "react";
import loginApi from "@app/js/services/api/loginApi";
import productListApi from "@app/js/services/api/productListApi";
import ProductList from "@app/js/React/components/ProductList/ProductList";
import Counter from "@app/js/React/components/Counter/Counter";
import ProductCreateForm from "../../components/ProductCreateForm/ProductCreateForm";
import { ProductModel } from "@app/js/app.types";

export default function Example() {

    const [productList, setProductList] = useState<ProductModel[] | "error">();

    const [page, setPage] = useState<"Counter" | "List Products">("Counter");

    useEffect(() => {
        if (page === "Counter") {
            return;
        }

        (async () => {
            const data = await loginApi("user1@unifaat.com", "123456");

            if ("error" in data) {
                return;
            }

            listApi();
        })();
    }, [page]);

    const listApi = async () => {
        const resp = await productListApi();
        if ("error" in resp) return setProductList("error");
        setProductList(resp.rows);
    };

    const createProductHandler = () => {
        listApi();
    }

    const deleteProductHandler = () => {
        listApi();
    }

    const PageContent: React.JSX.Element =
        page === "Counter" ? (
            <div className="row g-4 justify-content-center align-items-center min-vh-50">
                <div className="col-auto d-flex justify-content-center align-items-center">
                    <Counter />
                </div>
            </div>
        ) : (
            <div className="row g-4">
                <ProductCreateForm onCreate={createProductHandler} />
                <ProductList products={productList} onDelete={deleteProductHandler} />
            </div>
        );


    return (
        <div className="row g-4">
            <ul className="nav nav-tabs mb-4 justify-content-center">
                {["Counter", "List Products"].map((item) => (
                    <li key={item} className="nav-item">
                        <button
                            className={`nav-link ${page === item ? "active" : ""}`}
                            onClick={() => setPage(item as typeof page)}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
            {PageContent}
        </div>
    );
}
