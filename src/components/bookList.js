import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function BookList() { 

    const [books, setBooks] = useState([]); 
    
    useEffect( () => { // first array
        const axios = require('axios').default;
        axios.get('http://localhost:3000/posts')
            .then(resp => {
                setBooks(resp.data);
            })
    }, [])  
    
    const removeFromList = id => { //delet book 
        const axios = require('axios').default;
        axios.delete(`http://localhost:3000/posts/${id}`)

        axios.get('http://localhost:3000/posts') // sets second array (after deleting book)
        .then(resp => {
            setBooks(resp.data);
        })
    }

    const empty = <h1>Your books list is empty, add book press on "Add Book"</h1>
    const booksList =  
        books && books.map( (el) => {
            return(
                <div className="book-wrapper"  key={el.book.id}>
                    <h3> {el.book.title} </h3>
                    <span> author: {el.book.author} </span>
                    <span>category: {el.book.category} </span>
                    <span>ISBN: {el.book.isbn} </span>

                    <div className="btn-grup-action">
                    
                        <Link to={"/Edit/" + el.id } >
                            <button className="add-book-btn btn">
                                Edit
                            </button>
                        </Link>

                        <button
                            onClick={ () => removeFromList(el.id) }
                            className="btn">
                            Delete
                        </button>
                    </div>
                </div>
            )
    });
    
    return (
        <div className="book-card">
            { books.length > 0 ? booksList : empty }
        </div>
    )
}
