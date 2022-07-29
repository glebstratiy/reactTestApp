import axios from "axios";
import { setegid } from "process";
import React, { useState } from "react";
import { Iproduct } from "../models";
import { ErrorMessage } from "./ErrorMessage";

const productData: Iproduct = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
}

interface CreateProductProps{
    onCreate: (product: Iproduct) => void
}

export function CreateProduct({onCreate}: CreateProductProps){
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('')

        if(value.trim().length === 0){
            setError('Please enter valid title')
            return
        }

        productData.title = value;
        const response = await axios.post<Iproduct>('https://fakestoreapi.com/products', productData)
        onCreate(response.data)
    }
    return(
        <form onSubmit={submitHandler}>
            <input type="text" className="border py-2 px-4 mb-2 w-full outline-none" placeholder="Enter product title..." value={value} onChange={changeHandler}/>
            {error &&<ErrorMessage error={error}/>}
            <button className="py-2 px-4 bg-yellow-400 border hover:text-white" type="submit">Create</button>
        </form>
    )
}