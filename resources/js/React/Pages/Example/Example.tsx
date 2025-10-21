import { useEffect, useState } from "react";
import loginApi from "@app/js/services/api/loginApi";
import productListApi from "@app/js/services/api/productListApi";
import ProductList from "@app/js/React/components/ProductList/ProductList";
import Counter from "@app/js/React/components/Counter/Counter";
import ProductCreateForm from "../../components/ProductCreateForm/ProductCreateForm";
import productCreateApi from "@app/js/services/api/productCreateApi";
import { ProductModel } from "@app/js/app.types";

export default function Example() {

    const [productList, setProductList] = useState<ProductModel[] | "error">();

    useEffect(() => {
        (async () => {
            const data = await loginApi("user1@example.com", "123456");

            if ("error" in data) {
                return;
            }

            listApi();
        })();
    }, []);

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

    return (
        <div>
            <div className="row g-4">
                <ProductCreateForm onCreate={createProductHandler} />
                <ProductList products={productList} onDelete={deleteProductHandler} />
            </div>
            <Counter />
        </div>
    );
}
