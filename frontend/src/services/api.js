const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params);
  const response = await fetch(`${API_BASE}/api/products?${query.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE}/api/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product details");
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE}/api/products/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};
