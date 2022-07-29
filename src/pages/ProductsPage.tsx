import React, { useContext, useState } from 'react';
import { CreateProduct } from '../components/CreateProduct';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import {Product} from '../components/Product'
import { ModalContext } from '../context/ModalContext';
import { useProducts } from '../hooks/products';
import { Iproduct } from '../models';

export function ProductsPage(){
    const {loading, err, products, addPropuct} = useProducts()

  const {modal, open, close} = useContext(ModalContext)

  const createHandler = (product: Iproduct) => {
    close()
    addPropuct(product)
  }

  return (
    <div className='container mx-auto max-w-2xl pt-5'>
        {loading && <Loader/>}
        {err && <ErrorMessage error={err}/>}
        {products.map(product => <Product product={product} key={product.id}/>)}
      
        {modal && <Modal title='Create new product' onClose={() => close()}>
          <CreateProduct onCreate={createHandler}/>
        </Modal>}
        <button className='absolute bottom-5 right-5 rounded-full bg-red-500 text-white text-2xl py-2 px-4 font-bold' onClick={() => open()}>+</button>
    </div> 
  )
}