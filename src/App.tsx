import { useEffect, useState } from 'react';
import Catagories from './Pages/Catagories'
import Suppliers from './Pages/Suppliers'
import Products from './Pages/Products'
import LoginForm from './Components/LoginForm';
import AdminPanel from './Pages/AdminPanel';
interface Local{
  localSituation:boolean
}
import './App.css'
import { Link,Routes,Route } from "react-router-dom";
function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [localSituation,setLocalSituation]=useState<boolean>(false)
 useEffect(()=>{
  if(localStorage.getItem("loginInfos")===null){
    setLocalSituation(false)
}else{
  setLocalSituation(true)
}
 },[localSituation])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const logout=()=>{
    localStorage.removeItem("loginInfos")
    setLocalSituation(false)
  }
  return (
    <>
      <header>
          <nav>
             <ul>
              <li><Link className='link' to={"/"}>Suppliers</Link></li>
              <li><Link className='link' to={"/products"}>Products</Link></li>
              <li><Link className='link' to={"/catagories"}>Categories</Link></li>
              <li><Link className='link' to={"/admin"}>Admin</Link></li>
              {
                localSituation==true ? (
               <>
                  <li><button className='login-logout' onClick={logout}>Logout</button></li>
               </>
                ) : (
                  <li><button className='login-logout' onClick={showModal}>Login</button></li>
                )
              }
              
             </ul>
          </nav>
      </header>
      <LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} localSituation={localSituation} setLocalSituation={setLocalSituation}  />
     {
      <Routes>
        <Route path='/' element={<Suppliers localSituation={localSituation}/>}></Route>
        <Route path='/products' element={<Products localSituation={localSituation}/>}></Route>
        <Route path='/catagories' element={<Catagories localSituation={localSituation}/>}></Route>
        <Route path='/catagories' element={<Catagories localSituation={localSituation}/>}></Route>
        <Route path='/admin' element={<AdminPanel/>}></Route>
      </Routes>
     }
    </>
  )
}
export default App
