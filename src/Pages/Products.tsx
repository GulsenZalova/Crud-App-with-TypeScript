import React, { useEffect, useState,SyntheticEvent } from 'react'
import { ProductsModel } from '../Models/ProductsModel'
import { ProductsService } from '../Network/products/ProductService'
function Products() {
  const [products,setProducts]=useState<ProductsModel[]>([])
  const [newProducts,setNewProducts]=useState({
    name:"",
    unitPrice:null,
    unitsInStock:null
})
  const handleChange=(e:SyntheticEvent)=>{
   const name=e.target.name
   const value=e.target.value

   setNewProducts({
      ...newProducts,
       [name]:value
    }
    )
    // console.log(newProducts)
}

  useEffect(()=>{
    const productsdata= new ProductsService() 
    productsdata.getAll()
    .then(res=>{
      setProducts(res.data)
      // console.log(res.data)
    })
  },[])

  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault()
    const productsdata= new ProductsService() 
    productsdata.add(newProducts,"https://northwind.vercel.app/api/products")
    productsdata.getAll()
    .then(res=>{
      setProducts(res.data)
    })
      console.log(newProducts)
  }
  const handleDelete=(id:number)=>{
    const productsdata= new ProductsService()
    productsdata.delete(`https://northwind.vercel.app/api/products/${id}`)
    productsdata.getAll()
    .then(res=>{
      setProducts(res.data)
      console.log(products)
    })
    // console.log(id)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' name='name' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="unitPrice">UnitPrice</label>
            <input type="text" id='unitPrice' name='unitPrice' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="UnitsInStock">UnitsInStock</label>
            <input type="text" id='UnitsInStock' name='unitsInStock' onChange={handleChange} />
          </div>
          <button>Add</button>
      </form>
        <table>
        <thead>
                <tr>
                <th>İd</th>
                <th>Name</th>
                <th>UnitPrice</th>
                <th>UnitsInStock</th>
                </tr>
        </thead>
        <tbody>
              {
                products && (
                products.map((x,i)=>(
                       <tr key={i}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.unitPrice}</td>
                        <td>{x.unitsInStock}</td>
                        <td><button onClick={()=>handleDelete(x.id)}>Delete</button></td>
                       </tr> 
                    ))
                )
              }
        </tbody>
      </table>
    </div>
  )
}

export default Products
