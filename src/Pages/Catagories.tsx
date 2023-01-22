import React, { useEffect, useState,SyntheticEvent} from 'react'
import { CatagoriesModel } from '../Models/CatagoriesModel'
import { CatagoriesService } from '../Network/catagories/CatagoriesService'
function Catagories() {
  const [catagories,setCatacories]=useState<CatagoriesModel[]>([])
  const [newCatagories,setNewCatagories]=useState({
    name:"",
    description:"",
})
  const handleChange=(e:SyntheticEvent)=>{
   const name=e.target.name
   const value=e.target.value

   setNewCatagories({
      ...newCatagories,
       [name]:value
    }
    )
    // console.log(newProducts)
}
  useEffect(()=>{
    let catagoriesdata=new CatagoriesService()
    catagoriesdata.getAll()
    .then(res=>{
      setCatacories(res.data)
      // console.log(catagories)
    })
  },[])

  const handleSubmit=(e:SyntheticEvent)=>{
    e.preventDefault()
    let catagoriesdata=new CatagoriesService()
    catagoriesdata.add(newCatagories,"https://northwind.vercel.app/api/categories")
    catagoriesdata.getAll()
    .then(res=>{
      setCatacories(res.data)
    })
      console.log(catagories)
  }
  const handleDelete=(id:number)=>{
    let catagoriesdata=new CatagoriesService()
    catagoriesdata.delete(`https://northwind.vercel.app/api/categories/${id}`)
    catagoriesdata.getAll()
    .then(res=>{
      setCatacories(res.data)
      console.log(catagories)
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
            <label htmlFor="description">dDscription</label>
            <input type="text" id='description' name='description' onChange={handleChange} />
          </div>
          <button>Add</button>
      </form>
        <table>
        <thead>
                <tr>
                <th>İd</th>
                <th>Name</th>
                <th>Description</th>
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

export default Catagories
