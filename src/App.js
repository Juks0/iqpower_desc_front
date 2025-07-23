import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {
  const [tab, setTab] = useState('add');

  return (
      <div>
        <button onClick={() => setTab('add')}>Dodaj opis</button>
        <button onClick={() => setTab('list')}>Lista</button>
        {tab === 'add' && <AddProduct />}
        {tab === 'list' && <ProductList />}
      </div>
  );
}

export default App;
