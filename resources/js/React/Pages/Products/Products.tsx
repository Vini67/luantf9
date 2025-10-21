
import ProductList from "@app/js/React/components/ProductList/ProductList";
import ProductCreateForm from "@app/js/React/components/ProductCreateForm/ProductCreateForm";

export default function ProductsTwoCols() {

    return (
        <div className="row g-4">
            <ProductCreateForm />
            <ProductList />
        </div>
    );
}
