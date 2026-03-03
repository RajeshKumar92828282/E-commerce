import React, { useState, useEffect } from "react";
import "../CSS/profile.css"

export default function Profile() {

  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    address: localStorage.getItem("address") || "",
  });

  // load profile from server when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.name) {
          setUser((u) => ({ ...u, ...data }));
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          if (data.phone) localStorage.setItem("phone", data.phone);
          if (data.address) localStorage.setItem("address", data.address);
        }
      })
      .catch((err) => console.error("profile fetch", err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone,
          address: user.address,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser((u) => ({ ...u, ...data }));
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        setEdit(false);
        alert("Profile Updated ✅");
      } else {
        alert(data.message || "Unable to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="profile-container">

      {/* LEFT SIDE */}
      <div className="profile-sidebar">
        <h3>Hello, {user.name}</h3>

        <ul>
          <li className="active">Profile Information</li>
          <li>Manage Address</li>
          <li>My Orders</li>
          <li>Logout</li>
        </ul>
      </div>


      {/* RIGHT SIDE */}
      <div className="profile-content">

        <div className="profile-header">
          <h2>Personal Information</h2>

          {edit ? (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setEdit(true)}>
              Edit
            </button>
          )}
        </div>


        <div className="profile-form">

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Address</label>
            <textarea
              name="address"
              value={user.address}
              disabled={!edit}
              onChange={handleChange}
            />
          </div>

        </div>

      </div>
    </div>
  );
}