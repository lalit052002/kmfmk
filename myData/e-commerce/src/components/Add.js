
import React, { useState, useEffect, useRef, useInsertionEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { add, postData, getProduct, update, getData } from "../utils/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";


const initialState = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
        rate: 3.9,
        count: 120
    }
};



const Add = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { data } = useSelector(state => state.product);

    const [state, setState] = useState(initialState);

    const dumy=data;
   
    const { title,
        price,
        description,
        category } = state;
              

    useEffect(() => {

        dispatch(getData(id));
        setState({
            ...data,
        });

    }, [dispatch, id]);

// console.log(data);


    const handleSubmit = (e) => {
        e.preventDefault();


        if (!title || !price || !description || title.charAt(0) == ' ') {
            toast.error("Field not be empty or whitespace character");
        } else {

            if (!id) {
                dispatch(postData(state))
                toast.success("product added successfully")
            }
            else {
                dispatch(update(state))
                toast.success("product updated successfully")
            }

            setTimeout(() => navigate('/'), 1000)
        }

    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });

    };


    return (
        <>


            <div className="form__container d-flex felx-column align-items-center justify-content-center  mt-5">
                <form onSubmit={handleSubmit}>
                    <h4 className="form__heading">Please Fill the data</h4>
                    <hr />

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={title || ""}
                            onChange={handleInputChange} required
                        />


                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="price"
                            className="form-control"
                            value={price || ""}
                            onChange={handleInputChange}
                            id="price"

                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description "
                            name="description"
                            placeholder="description"
                            value={description || ""}
                            onChange={handleInputChange} required
                        />


                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            placeholder=" Category.."
                            value={category || ""}
                            onChange={handleInputChange} required
                        />
                    </div>





                    <input type="submit" className="form__button" value={id ? "Update" : "Save"} />

                </form>
            </div>
        </>
    )
}

export default Add


