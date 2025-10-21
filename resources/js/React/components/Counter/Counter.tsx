import { useState } from "react";
import InputNumber from "../InputNumber/InputNumber";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import "./styles.css";

export default function Counter() {
    const [quantity, setQuantity] = useState(0);

    const inputNumberChangeHandler = (value: number) => {
        setQuantity(value);
    };

    const addClickHandler = () => {
        setQuantity((prev) => {
            return ++prev;
        })
    }

    const subClickHandler = () => {
        setQuantity((prev) => {
            if (prev === 0) {
                return prev
            }
            return --prev;
        })
    }

    const changeTextHandler = (value: string) => {
        console.log(value);
    }

    return (
        <>
            <div className="container d-flex justify-content-center my-4">
                <div className="d-flex align-items-center">
                    <div className="btn-group" role="group">
                        <Button onClick={subClickHandler} classList="bg-danger">
                            <i className="fa-solid fa-minus"></i>
                        </Button>
                        <InputNumber value={quantity} onChange={inputNumberChangeHandler} />
                        <Button onClick={addClickHandler}>
                            <i className="fa-solid fa-plus"></i>
                        </Button>
                    </div>

                </div>

            </div>
            <InputText onChange={changeTextHandler} />
        </>
    );
}
