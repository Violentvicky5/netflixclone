import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API}/userslist`);
        const data = await res.json();
        setUsers(Array.isArray(data) ? data.reverse() : []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [API]);

  return (
    <div>
      <h2>User Management</h2>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Plan</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.plan}</td>
                <td>{u.isVerified ? "Verified" : "Not Verified"}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="5">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
