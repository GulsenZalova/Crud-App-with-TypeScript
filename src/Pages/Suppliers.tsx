import React, { useEffect, useState,SyntheticEvent} from 'react'
import { SuppliersModel } from '../Models/SuppliersModel'
import { SuppliersService } from '../Network/suppliers/SuppliresService'
function Suppliers() {
    const [suppliers,setSuppliers]=useState<SuppliersModel[]>([])
    const [newSuppliers,setNewSupliers]=useState({
        companyName:"",
        contactName:"",
        contactTitle:""
    })
    useEffect(()=>{
        const suppliersdata=new SuppliersService()
        suppliersdata.getAll()
        .then(res=>{
          setSuppliers(res.data)
            // console.log(suppliers)
        })
    },[])

    const handleChange=(e:SyntheticEvent)=>{
        const name=e.target.name
       const value=e.target.value

        setNewSupliers({
          ...newSuppliers,
           [name]:value
        }
        )
        // console.log(newSuppliers)
    }

    const handleSubmit=(e:SyntheticEvent)=>{
      e.preventDefault()

      const suppliersdata= new SuppliersService()
      suppliersdata.add(newSuppliers,"https://northwind.vercel.app/api/suppliers")
      suppliersdata.getAll()
      .then(res=>{
        setSuppliers(res.data)
      })
        // console.log("salam")
    }

    const handleDelete=(id:number)=>{
      const suppliersdata= new SuppliersService()
      suppliersdata.delete(`https://northwind.vercel.app/api/suppliers/${id}`)
      suppliersdata.getAll()
      .then(res=>{
        setSuppliers(res.data)
        console.log(suppliers)
      })
      // console.log(id)
    }
  return (
    <div>

      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="companyName">CompanyName</label>
            <input type="text" id='companyName' name='companyName' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactName">ContactName</label>
            <input type="text" id='contactName' name='contactName' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactTitle">ContactTitle</label>
            <input type="text" id='contactTitle' name='contactTitle' onChange={handleChange} />
          </div>
          <button>Add</button>
      </form>
      <table>
        <thead>
                <tr>
                <th>İd</th>
                <th>CompanyName</th>
                <th>ContactName</th>
                <th>ContactTitle</th>
                </tr>
        </thead>
        <tbody>
              {
                suppliers && (
                  suppliers.map((x)=>(
                       <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.companyName}</td>
                        <td>{x.contactName}</td>
                        <td>{x.contactTitle}</td>
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

export default Suppliers
