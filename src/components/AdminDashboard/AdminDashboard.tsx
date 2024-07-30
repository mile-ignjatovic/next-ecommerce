'use client';

// src/components/Admin/AdminDashboard.js
import { useState, useEffect } from 'react';
import { auth, db } from '../../utils/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Product } from '@/types/product';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      setProducts(productsSnapshot.docs.map((doc) => doc.data() as Product));
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await addDoc(collection(db, 'products'), {
      name,
      description,
      price: parseFloat(price),
    });
    setName('');
    setDescription('');
    setPrice('');
  };

  const handleLogout = () => {
    auth.signOut();
    window.location.href = '/admin/login';
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
        />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
