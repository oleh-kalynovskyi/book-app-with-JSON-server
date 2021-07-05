import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function AddBook() {

    const [book, setBook] = useState( '' ); // book storage 
    const [change, setChange] = useState(false); // saving notification

    const handleSubmit = ( e ) => {
        e.preventDefault();
        e.target.reset();
        // adding info about added book
        const axios = require('axios').default;
        axios.post('http://localhost:3000/posts',  {
            book
        })
        // notification about saving
        setChange(true)
        setTimeout(() => { setChange(false) }, 1000);
    }

    const id = Math.random() // create id
    return (
        <div className="add-book-comp">

            { change ? <h1 className="modal">Book added</h1> : null }

            <h1>
                Add book to List
            </h1>

            <form action="http://localhost:3000/posts"
                className="add-book-form"
                name="book"
                onSubmit={ handleSubmit } >

                <label htmlFor="title">Book name</label>
                <input 
                    required
                    autoComplete="off"
                    id="title"
                    type="text" 
                    name="title"
                    onChange={(e) => setBook({...book, title: e.target.value, id })}  />  {/* id - here setting individual id number */}

                <label htmlFor="author">Author name</label>
                <input 
                    required
                    autoComplete="off"
                    id="author"
                    type="text" 
                    name="author"
                    onChange={(e) => setBook({...book, author: e.target.value})} />
                    
                <label htmlFor="category">Category</label>
                <select 
                    required
                    autoComplete="off"
                    id="category"
                    name="category"
                    onChange={(e) => setBook({...book, category: e.target.value})}>
                    <option value="">-</option>
                    <option value="Action and Adventure">Action and Adventure</option>
                    <option value="Classics">Classics</option>
                    <option value="Detective and Mystery">Detective and Mystery</option>
                    <option value="Historical Fiction">Historical Fiction</option>
                    <option value="Horror">Horror</option>
                </select>

                <label htmlFor="isbn">ISBN</label>
                <input 
                    required
                    autoComplete="off"
                    id="isbn"
                    type="number" 
                    name="isbn"
                    onChange={(e) => setBook({...book, isbn: e.target.value })} />

                <div className="btn-grup-action">

                    <button className="add-book-btn btn">
                        Add book
                    </button>

                    <Link to={"/books-app"} >
                        <button className="add-book-btn btn">
                            back to Book list
                        </button>
                    </Link>

                </div>

            </form>
        </div>
    )
};
