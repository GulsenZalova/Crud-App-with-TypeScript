import React, { useState,SyntheticEvent } from 'react'
import { Modal } from 'antd';
function LoginForm({isModalOpen,setIsModalOpen,setLocalSituation}) {
    const [loginInfos,setLoginİnfos]=useState({
        name:"",
        email:""
    })

    const handleOk = () => {
        setIsModalOpen(false);
        localStorage.setItem("loginInfos",JSON.stringify(loginInfos))
        setLocalSituation(true)
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const handleLogin=(e:SyntheticEvent)=>{
        const name=e.target.name
        const value=e.target.value
        setLoginİnfos({
            ...loginInfos,
           [name]:value
        })
      }
  return (
    <div>
        <Modal title="Login" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='modal'>
              <div>
                <label htmlFor="Name">Name</label>
                <input type="text"name='name' id='Name' onChange={handleLogin}  />
              </div>
              <div>
               <label htmlFor="Email">Email</label>
              <input type="text"  name='email' id='Email' onChange={handleLogin} />
              </div>
           </div>
      </Modal>
    </div>
  )
}

export default LoginForm
