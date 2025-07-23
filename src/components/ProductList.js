import React, { useEffect, useState } from 'react';
import '../AppStyles.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(res => res.json())
            .then(setProducts);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Czy na pewno chcesz usunąć ten produkt?')) return;
        const res = await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts(products.filter(p => p.id !== id));
            if (selected && selected.id === id) setSelected(null);
        } else {
            alert('Błąd podczas usuwania');
        }
    };

    return (
        <div className="flex container">
            <div className="product-list">
                <ul>
                    {products.map(prod => (
                        <li
                            key={prod.id}
                            className={selected?.id === prod.id ? 'selected' : ''}
                            onClick={() => setSelected(prod)}
                        >
                            <span>{prod.name}</span>
                            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(prod.id); }} title="Usuń produkt">
                                Usuń
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-detail">
                {selected ? (
                    <p>{selected.description}</p>
                ) : (
                    <p>Wybierz produkt</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;
