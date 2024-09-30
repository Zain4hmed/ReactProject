import React, { useEffect, useState } from 'react';

// Navbar Component
const Navbar = ({ cartCount }) => ( // Accept cartCount as a prop
  <nav className="bg-blue-600 p-4 text-white flex justify-between items-center w-full">
    <div className="text-xl">E-Shop</div>
    <div>
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search products"
        className="p-2 rounded-md focus:outline-none"
      />
    </div>
    <div>Cart ({cartCount})</div> {/* Display the cart count */}
  </nav>
);

// Product Card Component
const ProductCard = ({ title, price, imageUrl, onAddToCart }) => {
  const [inStock, setInStock] = useState(true); // Local state for stock status

  const handleAddToCart = () => {
    if (inStock) {
      setInStock(false); // Mark as out of stock
      onAddToCart(1); // Increment cart count
    } else {
      setInStock(true); // Mark as in stock
      onAddToCart(-1); // Decrement cart count
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto h-74 w-64 bg-white "> {/* Increased width */} 
  <img 
    src={imageUrl} 
    alt={`Image of ${title}`} 
    className="h-40 w-full object-cover" // Image will adjust to new width
  />
  <div className="p-4">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-gray-600">${price.toFixed(2)}</p>
    <button 
      className={`mt-4 px-4 py-2 rounded-md ${inStock ? 'bg-blue-500 text-white' : 'bg-black text-white'}`}
      onClick={handleAddToCart}
    >
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  </div>
</div>

  );
};

// Product Grid Component
const ProductGrid = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/all');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full p-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} /> // Spread the product object and pass onAddToCart
      ))}
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white text-center p-4 w-full">
    &copy; 2024 E-Shop. All rights reserved.
  </footer>
);

// Main App Component
const App = () => {
  const [cartCount, setCartCount] = useState(0); // State for cart count

  const handleAddToCart = (change) => {
    setCartCount((prevCount) => Math.max(prevCount + change, 0)); // Update cart count based on change
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar cartCount={cartCount} /> {/* Pass cartCount to Navbar */}
      <ProductGrid onAddToCart={handleAddToCart} /> {/* Pass handleAddToCart to ProductGrid */}
      <Footer />
    </div>
  );
};

export default App;
