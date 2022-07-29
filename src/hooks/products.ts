import { useEffect, useState } from "react"
import { Iproduct } from "../models"
import axios, {AxiosError} from "axios"
export function useProducts(){
    const[products, setProducts] = useState<Iproduct[]>([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  function addPropuct(product: Iproduct){
    setProducts(prev => [...prev, product])
  }

  async function fetchProducts() {
    try{
      setErr('')
      setLoading(true)
    const response = await axios.get<Iproduct[]>('https://fakestoreapi.com/products?limit=5')
    setProducts(response.data)
    setLoading(false)
    }
    catch(e: unknown){
      const error = e as AxiosError;
      setLoading(false)
      setErr(error.message)
    }
    
  }

  useEffect(()=>{
    fetchProducts();
  }, [])
  return {
    products, err, loading, addPropuct
  }
}