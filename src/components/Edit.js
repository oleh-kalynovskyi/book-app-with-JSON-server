import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Edit() {
    const id = useParams().id;
    const parseInt = Number.parseFloat( id ); 

    const [book, setBook] = useState(''); // book storage 
    const [change, setChange] = useState(false); // saving notification

    useEffect( () => {
        const axios = require('axios').default;
        axios.get('http://localhost:3000/posts')
        .then(resp => {
            const book = resp.data.filter( el => el.id === parseInt) //defining book for display
            setBook(book[0].book)
        })
    }, [])
    
    function edit (e) {
        e.preventDefault();

        const axios = require('axios').default;
        axios.put(`http://localhost:3000/posts/${parseInt}`,  { //defining item to make changes
            book
        })

        if( axios ) { // notification about saving change
            setChange(true)
            setTimeout(() => { setChange(false) }, 1000);
        }
    }

    return (
        <form className="add-book-form">

            { change ? <h1 className="modal">Saved</h1> : null }

            <label htmlFor="author">Book name</label>
            <input 
                type="text" 
                name="" 
                id="" 
                value={book.title}
                onChange={(e) => setBook({...book, title: e.target.value})} />

            <label htmlFor="author">Author name</label>
            <input 
                type="text" 
                name="" 
                id="" 
                value={book.author}
                onChange={(e) => setBook({...book, author: e.target.value})} />

            <label htmlFor="author">Category</label>
            <select 
                required
                id="category"
                name="category"
                value={book.category}
                onChange={(e) => setBook({...book, category: e.target.value})}>
                <option value="other">other</option>
                <option value="Action and Adventure">Action and Adventure</option>
                <option value="Classics">Classics</option>
                <option value="Detective and Mystery">Detective and Mystery</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Horror">Horror</option>
            </select>

            <label htmlFor="author">ISBN</label>
            <input 
                type="text" 
                name="" 
                id="" 
                value={book.isbn}
                onChange={(e) => setBook({...book, isbn: e.target.value})} />

            <div className="btn-grup-action">
                
                <button className="add-book-btn btn" onClick={edit}>
                    Set
                </button>

                <Link to={"/books-app"} >
                    <button className="add-book-btn btn">
                        Cancel
                    </button>
                </Link> 

            </div>
        </form>
    )
}