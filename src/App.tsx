import Catagories from './Pages/Catagories'
import Suppliers from './Pages/Suppliers'
import Products from './Pages/Products'
import './App.css'
import { Link,Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
      <header>
          <nav>
             <ul>
              <Link className='link' to={"/"}>Suppliers</Link>
              <Link className='link' to={"/products"}>Products</Link>
              <Link className='link' to={"/catagories"}>Catagories</Link>
             </ul>
          </nav>
      </header>
     {
      <Routes>
        <Route path='/' element={<Suppliers/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/catagories' element={<Catagories/>}></Route>
      </Routes>
     }
    </>
  )
}
export default App
