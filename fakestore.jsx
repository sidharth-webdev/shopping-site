import axios from "axios";
import { useEffect, useState } from "react"
import "./fakestore.css";
import React from "react";

export function Fakestore(){

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([{id:0, title:'', price:0, category:'', description:'', image:'', rating:{rate:0, count:0}}]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(cartItems.length);

    function LoadCategories(){
        axios.get(`https://fakestoreapi.com/products/categories`)
        .then(async (response) => {
             await response.data.unshift('all');
             setCategories(await response.data);
        })
    }
    

        function LoadProducts(url){
        axios.get(url)
        .then(response=>{
            setProducts(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        LoadProducts(`https://fakestoreapi.com/products`);
    },[]);
 
    function handleCategoryChange(e){
        if(e.target.value==='all') {
            LoadProducts(`https://fakestoreapi.com/products`);
        } else {
            LoadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`);
        }
    }

    function handleAddToCartClick(product){
        cartItems.push(product);
        setCartCount(cartItems.length);
        alert(`${product.title}\nAdded to Cart`);
    }

    return(
        <div className="container-fluid">
            <header className="d-flex bg-light justify-content-between p-2 mt-3">
                <div className="h3">Fakestore.</div>
                <div>
                    <span> <a>Home</a> </span>
                    <span className="mx-4"> <a>Electronics</a></span>
                    <span> <a>Jewelery</a> </span>
                </div>
                <div>
                    <button data-bs-toggle="modal" data-bs-target="#cart" className="btn bi bi-cart4 position-relative">
                        <span className="badge bg-danger position-absolute rounded rounded-circle">{cartCount}</span>
                    </button>
                    <div className="modal fade" id="cart">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>Your Cart Items</h3>
                                    <button className="btn btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Preview</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartItems.map(item=><tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>
                                                        <img  width="50" height="50" src={item.image}/>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="mt-4 row">
                <nav className="col-2">
                    <div>
                        <label className="form-label fw-bold">Select Category</label>
                        <div>
                            <select onChange={handleCategoryChange} className="form-select">
                                {
                                    categories.map(category=><option value={category} key={category}> {category.toUpperCase()} </option>)
                                }
                            </select>
                        </div>
                    </div>
                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto" style={{height:'450px'}}>
                    {
                        products.map(product=>
                            <div key={product.id} className="card m-2 p-2" style={{width:'200px'}}>
                                <img src={product.image} className="card-img-top" height="120" />
                                <div className="card-header" style={{height:'100px'}}>
                                    {product.title}
                                </div>
                                <div className="card-body">
                                    <dl>
                                        <dt>Price</dt>
                                        <dd>{product.price}</dd>
                                        <dt>Rating</dt>
                                        <dd>{product.rating.rate} <span className="bi bi-star-fill text-success"></span> </dd>
                                    </dl>
                                </div>
                                <div className="card-footer">
                                    <button onClick={()=> handleAddToCartClick(product)} className="btn btn-warning bi bi-cart4 w-100"> Add to Cart</button>
                                </div>
                            </div>
                        )
                    }  
                </main>
            </section>
        </div>
    )
}