import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../utils/productSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState();
    const navigate = useNavigate();

    const handleInputChange = (e) => { 
        
        if (e.target.value===" ") {
            e.target.value = e.target.value.trim();
        }
        
        setText(e.target.value);
        dispatch(setFilter(text))
    }


    return (
        <>
            <form onSubmit={(e) => e.preventDefault} className="d-flex mb-3">
                <input className="form-control me-2  text-cyan-950" list="datalistOptions" id="exampleDataList" type='text' name='name' placeholder='search...' value={text} onChange={handleInputChange} />
               
                <button onClick={() => navigate('/')} className="btn btn-dark w-40 fw-bold ">clear filter</button>
            </form>
        </>
    )
}

export default Search
