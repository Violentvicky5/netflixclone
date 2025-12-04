import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const API = import.meta.env.VITE_BACKEND_URL || "";

  // Fetch Users
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

  // Delete User
  const removeUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API}/removeuser/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete user!");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center">User Management</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="text-break">{u._id}</td>
                <td>{u.name}</td>
                <td className="text-break">{u.email}</td>
                <td>{u.plan}</td>
                <td>{u.isVerified ? "Verified" : "Not Verified"}</td>

                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeUser(u._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
