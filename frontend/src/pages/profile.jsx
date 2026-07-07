import React, { useState, useEffect } from "react";
import logger from "../utils/logger";
import { useNavigate } from "react-router-dom";

export default function Profile({ setCart, setWishlist, updateUser }) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    address: localStorage.getItem("address") || "",
  });
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    if (setCart) setCart([]);
    if (setWishlist) setWishlist([]);
    if (updateUser) updateUser({ id: null, name: null });
    setProfile({ name: "", email: "", phone: "", address: "" });

    navigate("/login");
  };

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.name) {
          setProfile({
            name: data.name,
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
          });
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email || "");
          if (data.phone) localStorage.setItem("phone", data.phone);
          if (data.address) localStorage.setItem("address", data.address);
          if (updateUser) updateUser({ id: localStorage.getItem("userId"), name: data.name });
        }
      } catch (err) {
        logger.error("profile fetch", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [updateUser]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "Not authenticated." });
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile((prev) => ({ ...prev, ...data }));
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email || profile.email);
        if (data.phone) localStorage.setItem("phone", data.phone);
        if (data.address) localStorage.setItem("address", data.address);
        setEdit(false);
        setMessage({ type: "success", text: "Profile updated successfully." });
        if (updateUser) updateUser({ id: localStorage.getItem("userId"), name: data.name });
      } else {
        setMessage({ type: "error", text: data.message || "Unable to update profile." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Update failed." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="space-y-8 py-10 px-4 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-overlay">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Your account</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">Manage your personal details, address, and secure account settings.</p>
          </div>
          <button onClick={handleLogout} className="rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Logout
          </button>
        </div>
      </section>

      {loading ? (
        <section className="rounded-[2rem] bg-white p-12 text-center text-slate-500 shadow-sm">Loading profile...</section>
      ) : (
        <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <aside className="rounded-[2rem] bg-slate-950 p-8 text-slate-50 shadow-overlay">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Welcome back</p>
              <h2 className="text-2xl font-semibold">{profile.name || "Shopper"}</h2>
              <p className="text-sm leading-7 text-slate-300">Fast access to your profile, orders, wishlist, and saved preferences.</p>
            </div>
            <div className="mt-8 rounded-[2rem] bg-slate-900/80 p-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</p>
                <p className="mt-2 text-sm text-slate-100">{profile.email || "Not set"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Phone</p>
                <p className="mt-2 text-sm text-slate-100">{profile.phone || "Not set"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Address</p>
                <p className="mt-2 text-sm text-slate-100">{profile.address || "Not set"}</p>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Personal details</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Update profile</h2>
              </div>
              <button onClick={() => setEdit((prev) => !prev)} className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                {edit ? "Cancel" : "Edit profile"}
              </button>
            </div>

            {message && (
              <div className={`mt-6 rounded-3xl px-5 py-4 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                {message.text}
              </div>
            )}

            <div className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Full Name</span>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!edit}
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Phone</span>
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!edit}
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Address</span>
                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!edit}
                    rows={4}
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!edit || saving}
                  className="rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}















// import React, { useState, useEffect ,Link,useNavigate} from "react";
// import "../CSS/profile.css"

// export default function Profile() {

//   const [edit, setEdit] = useState(false);
  

//   const [user, setUser] = useState({
//     name: localStorage.getItem("name") || "",
//     email: localStorage.getItem("email") || "",
//     phone: localStorage.getItem("phone") || "",
//     address: localStorage.getItem("address") || "",
//   });

//   // load profile from server when component mounts
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     fetch("http://localhost:5000/api/user/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.name) {
//           setUser((u) => ({ ...u, ...data }));
//           localStorage.setItem("name", data.name);
//           localStorage.setItem("email", data.email);
//           if (data.phone) localStorage.setItem("phone", data.phone);
//           if (data.address) localStorage.setItem("address", data.address);
//         }
//       })
//       .catch((err) => console.error("profile fetch", err));
//   }, []);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch("http://localhost:5000/api/user/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: user.name,
//           phone: user.phone,
//           address: user.address,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setUser((u) => ({ ...u, ...data }));
//         localStorage.setItem("name", data.name);
//         localStorage.setItem("email", data.email);
//         setEdit(false);
//         alert("Profile Updated ✅");
//       } else {
//         alert(data.message || "Unable to update profile");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div className="profile-container">

//       {/* LEFT SIDE */}
//       <div className="profile-sidebar">
//         <h3>Hello, {user.name}</h3>

//         <ul>
//           <li className="active">Profile Information</li>
//           <li>Manage Address</li>
//           <li>My Orders</li>
//           <li ><Link to="/logout">Logout</Link></li>
//         </ul>
//       </div>


//       {/* RIGHT SIDE */}
//       <div className="profile-content">

//         <div className="profile-header">
//           <h2>Personal Information</h2>

//           {edit ? (
//             <button className="save-btn" onClick={handleSave}>
//               Save
//             </button>
//           ) : (
//             <button className="edit-btn" onClick={() => setEdit(true)}>
//               Edit
//             </button>
//           )}
//         </div>


//         <div className="profile-form">

//           <div className="input-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={user.name}
//               disabled={!edit}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               disabled={!edit}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="input-group">
//             <label>Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={user.phone}
//               disabled={!edit}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="input-group">
//             <label>Address</label>
//             <textarea
//               name="address"
//               value={user.address}
//               disabled={!edit}
//               onChange={handleChange}
//             />
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }