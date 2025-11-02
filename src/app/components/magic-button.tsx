'use client';

import { ButtonProps } from "@headlessui/react";
import { useEffect, useState } from "react";
import Button from "./button";

export default function MagicButton(props: ButtonProps) {
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        if(count > 2) {
            throw new Error('Unexpected error');
        }
    }, [count]);

    return (
        <Button {...props} onClick={() => setCount(count + 1)}>
            Magic Button
        </Button>
    )
}