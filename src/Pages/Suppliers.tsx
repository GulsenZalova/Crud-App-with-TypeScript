import React, { useEffect, useState, SyntheticEvent } from 'react'
import { SuppliersModel } from '../Models/SuppliersModel'
import { SuppliersService } from '../Network/suppliers/SuppliresService'
import { Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Suppliers() {
  const [suppliers, setSuppliers] = useState<SuppliersModel[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedsuppliers,setUpdatedSuppliers]=useState(
    {
      id:null,
      companyName: "",
      contactName: "",
      contactTitle: ""
    }
  )
  const [newSuppliers, setNewSupliers] = useState({
    companyName: "",
    contactName: "",
    contactTitle: ""
  })
  useEffect(() => {
    const suppliersdata = new SuppliersService()
    suppliersdata.getAll()
      .then(res => {
        setSuppliers(res.data)
        // console.log(suppliers)
      })
  }, [])


  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleOk = () => {
    setIsModalOpen(false);
    const suppliersdata = new SuppliersService()
    suppliersdata.update(updatedsuppliers, `/suppliers/${updatedsuppliers.id}`)
    .then(()=>{
      suppliersdata.getAll()
      .then(res => {
        setSuppliers(res.data)
      })
      toast("İnformation has been updated!")
    })
  
      console.log(updatedsuppliers)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: SyntheticEvent) => {
    const name = e.target.name
    const value = e.target.value

    setNewSupliers({
      ...newSuppliers,
      [name]: value
    }
    )
    // console.log(newSuppliers)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if(newSuppliers.companyName!="" && newSuppliers.contactName!="" && newSuppliers.contactTitle!=""){
      const suppliersdata = new SuppliersService()
    suppliersdata.add(newSuppliers, "/suppliers")
    .then(()=>{
      suppliersdata.getAll()
      .then(res => {
        setSuppliers(res.data)
      })
      toast("İnformation added!")
    })
    }else{
      alert("Fill in the information completely")
    }
  }

  const handleDelete = (id: number) => {
    const suppliersdata = new SuppliersService()
    suppliersdata.delete(`/suppliers/${id}`)
    .then(()=>{
      suppliersdata.getAll()
      .then(res => {
        setSuppliers(res.data)
      })
      toast("İnformation deleted!")
    })
    // console.log(id)
  }

  const handleUpdate = (item: SyntheticEvent) => {
    setIsModalOpen(true);
    setUpdatedSuppliers({
      id:item.id,
      companyName: item.companyName,
      contactName: item.contactName,
      contactTitle: item.contactName
      })
      console.log(item)
  }
  const handleUpdated=(e:any)=>{
    const name = e.target.name
    const value = e.target.value
    // console.log(e.target.name)
    // console.log(e.target.value)
    setUpdatedSuppliers(
      {
        ...updatedsuppliers,
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
        <button className='addbtn'>Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>İd</th>
            <th>CompanyName</th>
            <th>ContactName</th>
            <th>ContactTitle</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {
            suppliers && (
              suppliers.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.companyName}</td>
                  <td>{x.contactName}</td>
                  <td>{x.contactTitle}</td>
                  <td><button className='deletebtn' onClick={() => handleDelete(x.id)}>Delete</button></td>
                  <td><button className='updatebtn' onClick={()=> handleUpdate(x) }>Open Modal</button></td>
                </tr>
              ))
            )
          }

          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
          {
          updatedsuppliers && (
           <div className='modal'>
              <div>
                <label htmlFor="CompanyName">CompanyName</label>
              <input type="text" value={updatedsuppliers.companyName} name='companyName' id='CompanyName' onChange={handleUpdated} />
              </div>
              <div>
                <label htmlFor="ContactName">ContactName</label>
              <input type="text" value={updatedsuppliers.contactName} name='contactName' id={"ContactName"} onChange={handleUpdated} />
              </div>
              <div>
                <label htmlFor="ContactTitle">ContactTitle</label>
              <input type="text" value={updatedsuppliers.contactTitle} name='contactTitle' onChange={handleUpdated} /> 
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

export default Suppliers
