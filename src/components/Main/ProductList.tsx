'use client';

import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '@/types/product';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map(doc => doc.data()) as Product[]);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
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

export default ProductList;

