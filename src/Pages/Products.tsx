import React, { useEffect, useState,SyntheticEvent } from 'react'
import { ProductsModel } from '../Models/ProductsModel'
import { ProductsService } from '../Network/products/ProductService'
import { Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Products() {
  const [products,setProducts]=useState<ProductsModel[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProducts,setNewProducts]=useState({
    name:"",
    unitPrice:null,
    unitsInStock:null
})
const [updatedproducts,setUpdatedproducts]=useState(
  {
    id:null,
    name: "",
    unitPrice: "",
    unitsInStock: ""
  }
)
const handleOk = () => {
  setIsModalOpen(false);
  const productsdata= new ProductsService() 
  productsdata.update(updatedproducts, `/products/${updatedproducts.id}`)
  .then(()=>{
    productsdata.getAll()
    .then(res => {
      setProducts(res.data)
    })
    toast("İnformation has been updated!")
  })

    // console.log(updatedsuppliers)
};

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
const handleCancel = () => {
  setIsModalOpen(false);
};
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
    if(newProducts.name!="" && newProducts.unitPrice!="" && newProducts.unitsInStock1!=""){
      const productsdata= new ProductsService() 
      productsdata.add(newProducts,"/products")
      .then(()=>{
        productsdata.getAll()
        .then(res => {
          setProducts(res.data)
        })
        toast("İnformation added!")
      })
    }else{
      alert("Fill in the information completely")
    }
 
      console.log(newProducts)
  }
  const handleDelete=(id:number)=>{
    const productsdata= new ProductsService()
    productsdata.delete(`/products/${id}`)
    .then(()=>{
      productsdata.getAll()
      .then(res => {
        setProducts(res.data)
      })
      toast("İnformation deleted!")
    })
    // console.log(id)
  }
  const handleUpdate = (item: SyntheticEvent) => {
    setIsModalOpen(true);
    setUpdatedproducts({
      id:item.id,
      name: item.name,
      unitPrice: item.unitPrice,
      unitsInStock: item.unitsInStock
      })
      console.log(item)
  }
  const handleUpdated=(e:any)=>{
    const name = e.target.name
    const value = e.target.value
    // console.log(e.target.name)
    // console.log(e.target.value)
    setUpdatedproducts(
      {
        ...updatedproducts,
        [name]: value
      }
    )
    // console.log(updatedsuppliers)
  }
  return (
    <div className='crudContainer'>
      <ToastContainer />
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
          <button className='addbtn'>Add</button>
      </form>
        <table>
        <thead>
                <tr>
                <th>İd</th>
                <th>Name</th>
                <th>UnitPrice</th>
                <th>UnitsInStock</th>
                <th>Delete</th>
                <th>Update</th>
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
                        <td><button  className='deletebtn' onClick={()=>handleDelete(x.id)}>Delete</button></td>
                        <td><button   className='updatebtn' onClick={()=> handleUpdate(x)}>Open Modal</button></td>
                       </tr> 
                    ))
                )
              }
                 <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
          {
          updatedproducts && (
           <div className='modal'>
              <div>
                <label htmlFor="Name">Name</label>
                <input type="text" value={updatedproducts.name} name='name' id='Name' onChange={handleUpdated} />
              </div>
              <div>
               <label htmlFor="UnitPrice">UnitPrice</label>
              <input type="text" value={updatedproducts.unitPrice} name='unitPrice' id='UnitPrice' onChange={handleUpdated} />
              </div>
             <div>
              <label htmlFor="UnitsİnStock">UnitsİnStock</label>
             <input type="text" value={updatedproducts.unitsInStock}  name='unitsInStock' id={"UnitsİnStock"} onChange={handleUpdated} /> 
             </div>
           </div>
            )
          }
          </Modal>
        </tbody>
      </table>
    </div>
  )
}

export default Products
