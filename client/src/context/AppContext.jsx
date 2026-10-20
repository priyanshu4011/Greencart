// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const currency = import.meta.env.VITE_CURRENCY || "INR";
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const products = dummyProducts;
//   const [cartItems, setCartItems] = useState({});
// //add product to cart


//   const addToCart = (itemId) => {
//     setCartItems((prev) => {
//       const next = { ...(prev || {}) };
//       next[itemId] = (next[itemId] || 0) + 1;
//       return next;
//     });
//     toast.success("Added to Cart");
//   };
// // update cart item quantity
//   const updateCartItem = (itemId, quantity) => {
//     setCartItems((prev) => {
//       const next = { ...(prev || {}) };
//       if (quantity <= 0) {
//         delete next[itemId];
//       } else {
//         next[itemId] = quantity;
//       }
//       return next;
//     });
//     toast.success("Cart updated");
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const next = { ...(prev || {}) };
//       if (next[itemId]) {
//         next[itemId] = next[itemId] - 1;
//         if (next[itemId] <= 0) delete next[itemId];
//       }
//       return next;
//     });
//     toast.success("Removed from Cart");
//   };

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     showUserLogin,
//     setShowUserLogin,
//     products,
//     currency,
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     cartItems,
//   };

//   return (
//     <AppContext.Provider value={value}>{children}</AppContext.Provider>
//   );
// };



// export const useAppContext = () => {
//   return useContext(AppContext);
// };
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyAddress, dummyOrders, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "";

const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
};

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "INR";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState(dummyProducts);
  const [addresses, setAddresses] = useState(dummyAddress);
  const [orders, setOrders] = useState(dummyOrders);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productsData, addressData, ordersData] = await Promise.all([
          apiRequest("/api/products"),
          apiRequest("/api/addresses"),
          apiRequest("/api/orders"),
        ]);

        const apiProducts = productsData.products || [];
        const apiProductIds = new Set(apiProducts.map((product) => String(product._id)));
        const missingDemoProducts = dummyProducts.filter((product) => !apiProductIds.has(String(product._id)));
        setProducts([...apiProducts, ...missingDemoProducts]);
        setAddresses(addressData.addresses || []);
        setOrders(ordersData.orders || []);
      } catch (error) {
        toast.error("Backend is unavailable. Using demo data instead.");
      }
    };

    loadInitialData();
  }, []);

  const addProduct = async (product) => {
    const cleanProduct = {
      ...product,
      _id: product._id || Date.now().toString(),
      image: Array.isArray(product.image) ? product.image : [product.image].filter(Boolean),
      description: Array.isArray(product.description)
        ? product.description
        : String(product.description || "Fresh and quality product")
            .split(/\n|\s*[,;]\s*/)
            .filter(Boolean),
      price: Number(product.price || 0),
      offerPrice: Number(product.offerPrice || product.price || 0),
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      inStock: product.inStock !== false,
    };

    try {
      const response = await apiRequest("/api/products", {
        method: "POST",
        body: JSON.stringify(cleanProduct),
      });
      setProducts((prev) => [response.product, ...prev]);
      toast.success("Product added successfully");
      return;
    } catch (error) {
      setProducts((prev) => [cleanProduct, ...prev]);
      toast.success("Product added successfully");
    }
  };

  const updateProduct = async (productId, productData) => {
    const nextProduct = {
      ...productData,
      image: Array.isArray(productData.image) ? productData.image : [productData.image].filter(Boolean),
      description: Array.isArray(productData.description)
        ? productData.description
        : String(productData.description || "Fresh and quality product")
            .split(/\n|\s*[,;]\s*/)
            .filter(Boolean),
      price: Number(productData.price || 0),
      offerPrice: Number(productData.offerPrice || productData.price || 0),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await apiRequest(`/api/products/${productId}`, {
        method: "PUT",
        body: JSON.stringify(nextProduct),
      });
      setProducts((prev) => prev.map((product) => (product._id === productId ? response.product : product)));
      toast.success("Product updated successfully");
      return;
    } catch (error) {
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? {
                ...product,
                ...nextProduct,
                _id: productId,
              }
            : product
        )
      );
      toast.success("Product updated successfully");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await apiRequest(`/api/products/${productId}`, { method: "DELETE" });
    } catch (error) {
      // fallback to local state only if backend is unavailable
    }

    setProducts((prev) => prev.filter((product) => product._id !== productId));
    toast.success("Product removed");
  };

  const addAddress = async (address) => {
    const newAddress = {
      ...address,
      _id: address._id || Date.now().toString(),
      zipcode: Number(address.zipcode || 0),
    };

    try {
      const response = await apiRequest("/api/addresses", {
        method: "POST",
        body: JSON.stringify(newAddress),
      });
      setAddresses((prev) => [response.address, ...prev]);
      toast.success("Address saved successfully");
      return;
    } catch (error) {
      setAddresses((prev) => [newAddress, ...prev]);
      toast.success("Address saved successfully");
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const next = { ...prev };
      quantity <= 0 ? delete next[itemId] : (next[itemId] = quantity);
      return next;
    });
    toast.success("Cart updated");
  };

  const decreaseCartItem = (itemId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      if (next[itemId]) {
        next[itemId] -= 1;
        if (next[itemId] <= 0) delete next[itemId];
      }
      return next;
    });
    toast.success("Removed from Cart");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    toast.success("Item removed");
  };

  const getCartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      return total + (item?.offerPrice || item?.price || 0) * qty;
    }, 0);

  const value = useMemo(
    () => ({
      navigate,
      user,
      setUser,
      isSeller,
      setIsSeller,
      isAdmin,
      setIsAdmin,
      showUserLogin,
      setShowUserLogin,
      products,
      setProducts,
      addresses,
      setAddresses,
      addAddress,
      orders,
      setOrders,
      currency,
      cartItems,
      setCartItems,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      updateCartItem,
      decreaseCartItem,
      removeFromCart,
      getCartCount,
      getCartAmount,
      searchQuery,
      setSearchQuery,
    }),
    [navigate, user, isSeller, isAdmin, showUserLogin, products, addresses, orders, currency, cartItems, searchQuery]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;