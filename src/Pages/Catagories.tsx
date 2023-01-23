import React, { useEffect, useState,SyntheticEvent} from 'react'
import { CatagoriesModel } from '../Models/CatagoriesModel'
import { CatagoriesService } from '../Network/catagories/CatagoriesService'
import { Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Catagories({localSituation}) {
  const [catagories,setCatacories]=useState<CatagoriesModel[]>([])
  const [newCatagories,setNewCatagories]=useState({
    name:"",
    description:"",
})
const [isModalOpen, setIsModalOpen] = useState(false);
const [updatedcategories,setupdatedCategories]=useState(
  {
    id:null,
    name: "",
    description: "",
  }
)
  const handleChange=(e:SyntheticEvent)=>{
   const name=e.target.name
   const value=e.target.value

   setNewCatagories({
      ...newCatagories,
       [name]:value
    }
    )
}
  useEffect(()=>{
    let catagoriesdata=new CatagoriesService()
    catagoriesdata.getAll()
    .then(res=>{
      setCatacories(res.data)
    })
  },[])
  const handleOk = () => {
    if(localSituation){
      setIsModalOpen(false);
    let catagoriesdata=new CatagoriesService()
    catagoriesdata.update(updatedcategories, `/categories/${updatedcategories.id}`)
    .then(()=>{
      catagoriesdata.getAll()
      .then(res => {
        setCatacories(res.data)
      })
      toast("İnformation has been updated!")
    })
    }else{
      alert("please register!!!")
    }
  };
  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault()
   if(localSituation){
    if(newCatagories.name!="" && newCatagories.description!=""){
      let catagoriesdata=new CatagoriesService()
      catagoriesdata.add(newCatagories,"/categories")
      .then(()=>{
        catagoriesdata.getAll()
        .then(res => {
          setCatacories(res.data)
        })
        toast("İnformation added!")
      })
     }else{
      alert("Fill in the information completely")
     }
   }else{
    alert("please register!!!")
   }
   
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleDelete=(id:number)=>{
  if(localSituation){
    let catagoriesdata=new CatagoriesService()
    catagoriesdata.delete(`/categories/${id}`)
    .then(()=>{
      catagoriesdata.getAll()
      .then(res => {
        setCatacories(res.data)
      })
      toast("İnformation deleted!")
    })
  }else{
    alert("please register!!!")
  }
  }

  const handleUpdate = (item: SyntheticEvent) => {
    setIsModalOpen(true);
    setupdatedCategories({
      id:item.id,
      name: item.name,
      description: item.description,
      })
  }
  const handleUpdated=(e:any)=>{
    const name = e.target.name
    const value = e.target.value
    setupdatedCategories(
      {
        ...updatedcategories,
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
            <label htmlFor="description">Description</label>
            <input type="text" id='description' name='description' onChange={handleChange} />
          </div>
          <button className='addbtn'>Add</button>
      </form>
        <table>
        <thead>
                <tr>
                <th>İd</th>
                <th>Name</th>
                <th>Description</th>
                <th>Delete</th>
                <th>Update</th>
                </tr>
        </thead>
        <tbody>
              {
                catagories && (
                catagories.map((x)=>(
                       <tr key={x.id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.description}</td>
                        <td><button className='deletebtn' onClick={()=>handleDelete(x.id)}>Delete</button></td>
                        <td><button className='updatebtn' onClick={()=> handleUpdate(x) }>Update</button></td>
                       </tr> 
                    ))
                )
              }
                <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
          {
          updatedcategories && (
           <div className='modal'>
              <div>
                <label htmlFor="Name">Name</label>
              <input type="text" value={updatedcategories.name} name='name' id={"Name"} onChange={handleUpdated} />
              </div>
              <div>
                <label htmlFor="Description">Description</label>
              <input type="text" value={updatedcategories.description} name='description' id='Description' onChange={handleUpdated} />
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

export default Catagories
