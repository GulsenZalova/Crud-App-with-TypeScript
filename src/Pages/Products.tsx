import React, { useEffect, useState,SyntheticEvent } from 'react'
import { ProductsModel } from '../Models/ProductsModel'
import { ProductsService } from '../Network/products/ProductService'
import { Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Local{
  localSituation:boolean
}
function Products({localSituation}:Local) {
  const [products,setProducts]=useState<ProductsModel[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newProducts,setNewProducts]=useState<ProductsModel>({
    name:"",
    unitPrice:undefined,
    unitsInStock:undefined
})
const [updatedproducts,setUpdatedproducts]=useState<ProductsModel>(
  {
    id:undefined,
    name: "",
    unitPrice: undefined,
    unitsInStock: undefined
  }
)
const handleOk = () => {
  if(localSituation){
    setIsModalOpen(false);
    const productsdata= new ProductsService() 
    productsdata.update(updatedproducts, `/products/${updatedproducts.id}`)
    .then(()=>{
      productsdata.getAll()
      .then(res => {
        setProducts(res.data)
      })
      toast("─░nformation has been updated!")
    })
  }else{
    alert("please register!!!")
  }
};

  const handleChange=(e:any)=>{
   const name=e.target.name
   const value=e.target.value

   setNewProducts({
      ...newProducts,
       [name]:value
    }
    )
}
const handleCancel = () => {
  setIsModalOpen(false);
};
  useEffect(()=>{
    const productsdata= new ProductsService() 
    productsdata.getAll()
    .then(res=>{
      setProducts(res.data)
    })
  },[])

  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault()
    if(localSituation){
      if(newProducts.name!="" && newProducts.unitPrice!=null && newProducts.unitsInStock!=null){
        const productsdata= new ProductsService() 
        productsdata.add(newProducts,"/products")
        .then(()=>{
          productsdata.getAll()
          .then(res => {
            setProducts(res.data)
          })
          toast("─░nformation added!")
        })
      }else{
        alert("Fill in the information completely")
      }
    }else{
      alert("please register!!!")
    }
  }
  const handleDelete=(id:number)=>{
    if(localSituation){
      const productsdata= new ProductsService()
      productsdata.delete(`/products/${id}`)
      .then(()=>{
        productsdata.getAll()
        .then(res => {
          setProducts(res.data)
        })
        toast("─░nformation deleted!")
      })
    }else{
      alert("please register!!!")
    }

  }
  const handleUpdate = (item:any) => {
    setIsModalOpen(true);
    setUpdatedproducts({
      id:item.id,
      name: item.name,
      unitPrice: item.unitPrice,
      unitsInStock: item.unitsInStock
      })
  }
  const handleUpdated=(e:any)=>{
    const name = e.target.name
    const value = e.target.value
    setUpdatedproducts(
      {
        ...updatedproducts,
        [name]: value
      }
    )
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
                <th>─░d</th>
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
                products.map((x:any,i:number)=>(
                       <tr key={i}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.unitPrice}</td>
                        <td>{x.unitsInStock}</td>
                        <td><button  className='deletebtn' onClick={()=>handleDelete(x.id)}>Delete</button></td>
                        <td><button   className='updatebtn' onClick={()=> handleUpdate(x)}>Update</button></td>
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
              <label htmlFor="Units─░nStock">Units─░nStock</label>
             <input type="text" value={updatedproducts.unitsInStock}  name='unitsInStock' id={"Units─░nStock"} onChange={handleUpdated} /> 
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
