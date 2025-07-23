import React, { useState } from 'react';
import '../AppStyles.css';

function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name.trim() === '' || description.trim() === '') {
            alert('Uzupełnij nazwę i opis!');
            return;
        }
        await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: name.trim(), description: description.trim()})
        });
        setName('');
        setDescription('');
        alert('Dodano!');
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nazwa produktu"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Opis"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={6}
                required
            />
            <button type="submit">Dodaj</button>
        </form>
    );
}

export default AddProduct;
