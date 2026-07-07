import React, { useEffect, useState } from "react";
import logger from "../utils/logger";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShoppingCart, FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";
import { fetchProductById } from "../services/api";

export default function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        const item = data.product || data;
        setProduct(item);
        setRelated(data.related || []);
        setSelectedImage(item.images?.[0] || item.image);
      } catch (err) {
        logger.error(err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-slate-500">Loading product...</div>;
  if (error) return <div className="py-20 text-center text-rose-600">{error}</div>;
  if (!product) return <div className="py-20 text-center text-slate-600">Product not found.</div>;

  const images = product.images?.length ? product.images : product.image ? [product.image] : ["https://via.placeholder.com/600x600?text=No+Image"];
  const ratingValue = product.rating?.average?.toFixed(1) || "4.4";
  const ratingCount = product.rating?.count || 86;
  const specs = product.specifications || [
    { label: "Brand", value: product.brand || "AIDEN" },
    { label: "Category", value: product.category || "General" },
    { label: "Shipping", value: "Free delivery above ₹2,499" },
    { label: "Return", value: "30-day easy returns" },
  ];

  return (
    <main className="space-y-10 py-10 px-4 sm:px-6 lg:px-8">
      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 transition hover:text-slate-900">
                <FaArrowLeft className="text-slate-400" /> Back to shop
              </Link>
              <h1 className="mt-4 text-3xl font-semibold text-slate-950">{product.title}</h1>
              <p className="mt-2 text-sm text-slate-500">{product.category || "General"} • {product.brand || "AIDEN"}</p>
            </div>
            <div className="inline-flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-700">
                <FaStar className="text-amber-500" /> {ratingValue}
              </span>
              <span>{ratingCount} reviews</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
              <img src={selectedImage} alt={product.title} className="h-[420px] w-full rounded-[1.75rem] object-cover" />
              <div className="mt-4 grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img, index) => (
                  <button
                    key={img + index}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`overflow-hidden rounded-3xl border p-1 transition ${selectedImage === img ? "border-sky-500" : "border-slate-200"}`}
                  >
                    <img src={img} alt={`${product.title} ${index + 1}`} className="h-20 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft xl:sticky xl:top-24">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Price</p>
                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-3xl font-semibold text-slate-950">₹ {product.price?.toFixed(2)}</span>
                      {product.oldPrice && <span className="text-sm text-slate-400 line-through">₹ {product.oldPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">In stock</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    <FaTruck className="mb-2 h-4 w-4 text-sky-500" /> Free delivery
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                    <FaRepeat className="mb-2 h-4 w-4 text-sky-500" /> 30-day returns
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => addToCart && addToCart(product)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[1.5rem] bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  <FaShoppingCart /> Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("buyNow", JSON.stringify(product));
                    navigate("/checkout/address");
                  }}
                  className="inline-flex w-full items-center justify-center rounded-[1.5rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  onClick={() => addToWishlist && addToWishlist(product)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
                >
                  <FaHeart className="text-rose-500" /> Add to wishlist
                </button>
              </div>
              <div className="space-y-3 rounded-[1.75rem] bg-slate-50 p-5 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Guarantees</p>
                <p className="flex items-center gap-2"><FaShieldAlt className="text-sky-500" /> Secure payment</p>
                <p className="flex items-center gap-2"><FaTruck className="text-sky-500" /> Fast order fulfillment</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-[2rem] bg-slate-50 p-6 shadow-soft">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Description</p>
              <p className="text-sm leading-7 text-slate-600">{product.description || "This premium product offers outstanding value with stunning performance and thoughtful craftsmanship."}</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Specifications</p>
              <div className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-4">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-4 text-sm text-slate-600">
                    <span className="font-medium text-slate-900">{spec.label}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Delivery</p>
                <p className="mt-3 text-sm text-slate-700">Delivered within 2-4 business days.</p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Return policy</p>
                <p className="mt-3 text-sm text-slate-700">30-day hassle-free returns for eligible items.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Related products</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">You may also like</h2>
            </div>
            <Link to="/" className="text-sm font-semibold text-sky-600 transition hover:text-sky-500">View all</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item._id || item.id}
                to={`/product/${item._id || item.id}`}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-overlay"
              >
                <img src={item.images?.[0] || item.image || "https://via.placeholder.com/320x240?text=No+Image"} alt={item.title} className="h-44 w-full rounded-[1.5rem] object-cover" />
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-950 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">₹ {item.price?.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
