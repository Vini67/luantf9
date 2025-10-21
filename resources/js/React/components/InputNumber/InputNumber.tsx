import { useEffect, useState } from "react";
import { InputNumberProps } from "./InputNumber.types";

export default function InputNumber({ onChange, value = 0 }: InputNumberProps) {
    const [quantity, setQuantity] = useState<number>(value);

    useEffect(() => {
        setQuantity(value);
    }, [value]);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const onlyNumber = target.value.replace(/[^\d]/g, "");
        const value = Number(onlyNumber || "0");
        setQuantity(value);
        onChange?.(value);
    };

    console.log("render", quantity, value);

    return (
        <input
            type="text"
            className="form-control form-control-lg text-center"
            value={quantity}
            onChange={inputChangeHandler}
        />
    );
}
