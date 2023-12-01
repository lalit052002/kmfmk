import React, { useEffect, useState, useMemo } from 'react'
import '../styeles/home.css'
import { useSelector, useDispatch } from 'react-redux'
import Search from './Search';
import { useNavigate } from 'react-router-dom';
import { fetchProduct } from '../utils/productSlice';
const Home = () => {


  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { products, Filter } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const limit = recordsPerPage;
  const offset = (currentPage - 1) * recordsPerPage;
 

  React.useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);


  const handleScroll = () => {

    
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight &&
      !loading
    ) {
 
      setCurrentPage((prevPage) => prevPage + 1);

    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, offset]);


  const record = useMemo(() => {
    let computed = products; 
    if (Filter) {

      computed = computed.filter(
        todo =>
          todo.title.toLowerCase().startsWith(Filter.toLowerCase())
      );
    }

    let data=products.slice(products.length-3,products.length);

    if (offset <= products.length)
      if (offset + limit > products.length) {
        data = computed.slice(
          offset, products.length)
        } else {
        data = computed.slice(
          offset, offset + limit
        );
      }
     
  return data;
  }, [products, offset, limit, currentPage, Filter]);

   

  const addP = () => {
    navigate('/add');
  }; 

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">E-commerce</a>
          <form className="nn d-flex">
            <button className="btn btn-dark w-40 fw-bold" type="submit" onClick={addP}>Add Product</button>

            <div><Search /></div>
          </form>
        </div>
      </nav>

      <div className='containerL'>

        {
          record.map((item, index) =>
            < div className="card" style={{ width: "18rem" }}>
              <img src={item.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h6 className="card-title">{item.title}</h6>
                <p className="card-text">{item.description}</p>
                <a href={`/update/${item.id}`} className="btn btn-primary">Edit</a>
              </div>

            </div>
          )
        }
      </div >

    </>
  )
}

export default Home



