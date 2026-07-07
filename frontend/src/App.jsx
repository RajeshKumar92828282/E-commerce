import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Category1 from "./Components/categorybarr/Category1";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/profile";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Category from "./Components/categorybarr/Category";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wish/Wishlist";
import Orders from "./pages/Orders";
import About from "./pages/About";
import CheckoutAddress from "./pages/checkout/Address";
import CheckoutPayment from "./pages/checkout/Payment";
import OrderConfirmation from "./pages/checkout/Confirmation";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import { fetchCategories, fetchProducts } from "./services/api";
import logger from "./utils/logger";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);
  const [user, setUser] = useState({
    id: localStorage.getItem("userId") || null,
    name: localStorage.getItem("name") || null,
  });
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();
  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  const fetchCartAndWishlist = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;

    try {
      const [cartRes, wishlistRes] = await Promise.all([
        fetch(`http://localhost:5000/api/cart?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://localhost:5000/api/wishlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (cartRes.ok) {
        const payload = await cartRes.json();
        setCart(Array.isArray(payload) ? payload : []);
      }

      if (wishlistRes.ok) {
        const payload = await wishlistRes.json();
        setWishlist(Array.isArray(payload) ? payload : []);
      }
    } catch (err) {
      logger.error("Failed to load cart/wishlist", err);
    }
  };

  useEffect(() => {
    const validateTokenAndLoad = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        onLogout();
        return;
      }

      try {
        const profileRes = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileRes.ok) {
          onLogout();
          return;
        }

        const profileData = await profileRes.json();
        setUser({ id: profileData._id, name: profileData.name });

        await fetchCartAndWishlist();
      } catch (err) {
        logger.error("Token validation failed", err);
        onLogout();
      }
    };

    validateTokenAndLoad();
  }, []);

  const onLoginSuccess = async ({ user: loggedUser, token: userToken }) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("userId", loggedUser._id);
    localStorage.setItem("name", loggedUser.name);
    localStorage.setItem("email", loggedUser.email);
    if (loggedUser.phone) localStorage.setItem("phone", loggedUser.phone);
    if (loggedUser.address) localStorage.setItem("address", loggedUser.address);

    setUser({ id: loggedUser._id, name: loggedUser.name });
    await fetchCartAndWishlist();
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    setUser({ id: null, name: null });
    setCart([]);
    setWishlist([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const loadProducts = async (options = {}) => {
    setLoadingProducts(true);
    setProductError(null);
    try {
      const payload = await fetchProducts({ limit: 100, ...options });
      const fetched = Array.isArray(payload.products) ? payload.products : [];
      setProducts(fetched);
    } catch (err) {
      logger.error("Product load failed", err);
      setProducts([]);
      setProductError(err.message || "Unable to load products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadAllProducts = async () => {
    try {
      const payload = await fetchProducts({ limit: 200 });
      const fetched = Array.isArray(payload.products) ? payload.products : [];
      setAllProducts(fetched);
    } catch (err) {
      logger.error("All products load failed", err);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      logger.error("Category load failed", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
    loadAllProducts();
    loadProducts();
  }, []);

  useEffect(() => {
    const filter = activeCategory === "all" ? {} : { category: activeCategory };
    const query = searchQuery ? { ...filter, search: searchQuery } : filter;
    loadProducts(query);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    setFeaturedProducts(allProducts.filter((product) => product.featured).slice(0, 6));
    setTrendingProducts(allProducts.filter((product) => product.trending).slice(0, 6));
  }, [allProducts]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const addToCart = async (product) => {
    if (!user.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      logger.warn("No token available for addToCart");
      return;
    }

    const productId = product._id || product.id;

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: product.quantity || 1,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not add to cart");
      }

      const data = await res.json();
      await fetchCartAndWishlist();
      return data.item;
    } catch (err) {
      logger.error("Add to cart failed", err);
      return null;
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      logger.warn("No token available for removeFromCart");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not delete cart item");
      await fetchCartAndWishlist();
    } catch (err) {
      logger.error("Remove from cart failed", err);
    }
  };

  const addToWishlist = async (product) => {
    if (!user.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      logger.warn("No token available for addToWishlist");
      return;
    }

    const productId = product._id || product.id;

    try {
      const res = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          title: product.title,
          price: product.price,
          image: product.image,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not add to wishlist");
      }

      await fetchCartAndWishlist();
    } catch (err) {
      logger.error("Add to wishlist failed", err);
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    if (!user.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      logger.warn("No token available for removeFromWishlist");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/remove/${wishlistItemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not remove from wishlist");
      }
      await fetchCartAndWishlist();
    } catch (err) {
      logger.error("Remove from wishlist failed", err);
    }
  };

  return (
    <>
      <Navbar
        count={cartCount}
        wishlistCount={wishlistCount}
        user={user}
        onLogout={onLogout}
        searchValue={searchQuery}
        onSearchChange={handleSearch}
        onSearchSubmit={handleSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Category1 />
              <Home
                featuredProducts={featuredProducts}
                trendingProducts={trendingProducts}
                allProducts={products}
                loading={loadingProducts}
                error={productError}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                categories={categories}
                onCategorySelect={handleCategorySelect}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
              <Category filterItems={handleCategorySelect} categories={categories} />
            </>
          }
        />

        <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/search"
          element={
            <SearchResults
              searchQuery={searchQuery}
              products={products}
              loading={loadingProducts}
              error={productError}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          }
        />
        <Route
          path="/category/:slug"
          element={
            <CategoryPage
              products={allProducts}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile setCart={setCart} setWishlist={setWishlist} updateUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart cart={cart} onRemoveItem={removeFromCart} />} />

        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onRemoveItem={removeFromWishlist} />} />

        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute>
              <CheckoutAddress
                cart={cart}
                onProceed={(address) => {
                  localStorage.setItem("checkoutAddress", JSON.stringify(address));
                  navigate("/checkout/payment");
                }}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/payment"
          element={
            <ProtectedRoute>
              <CheckoutPayment
                cart={cart}
                onConfirm={async (order) => {
                  try {
                    const token = localStorage.getItem("token");
                    const res = await fetch("http://localhost:5000/api/orders", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(order),
                    });

                    if (!res.ok) {
                      const body = await res.json().catch(() => ({}));
                      throw new Error(body.error || "Order submission failed");
                    }

                    const data = await res.json();
                    localStorage.setItem("checkoutOrder", JSON.stringify(data.order || order));
                    setCart([]);
                    await fetchCartAndWishlist();
                    navigate("/checkout/confirmation");
                  } catch (err) {
                    logger.error("Order submission failed:", err);
                    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
                    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));
                    localStorage.setItem("checkoutOrder", JSON.stringify(order));
                    setCart([]);
                    navigate("/checkout/confirmation");
                  }
                }}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />

        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
