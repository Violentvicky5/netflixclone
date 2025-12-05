import React, { useEffect, useState } from "react";

import * as XLSX from "xlsx";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const API = import.meta.env.VITE_BACKEND_URL || "";

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API}/userslist`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data.reverse() : [];
        setUsers(arr);
        setFilteredUsers(arr);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [API]);

  // Remove user
  const removeUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API}/removeuser/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        setFilteredUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete user!");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Search + Filter + Sort
  useEffect(() => {
    let data = [...users];

    // SEARCH
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(lower) ||
          u.email?.toLowerCase().includes(lower) ||
          u._id?.toLowerCase().includes(lower)
      );
    }

    // FILTER BY PLAN
    if (planFilter !== "all") {
      data = data.filter((u) => u.plan === planFilter);
    }

    // FILTER BY STATUS
    if (statusFilter !== "all") {
      const verified = statusFilter === "verified";
      data = data.filter((u) => u.isVerified === verified);
    }

    // SORT
    if (sortOrder === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredUsers(data);
    setCurrentPage(1); 
  }, [searchTerm, planFilter, statusFilter, sortOrder, users]);

  // PAGINATION
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // EXPORT EXCEL
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center">User Management</h2>

      {/* COUNT & EXPORT BUTTONS */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>
          Total Users: <b>{users.length}</b> | Showing: <b>{filteredUsers.length}</b>
        </h6>

        <div>
          <button className="btn btn-success me-2" onClick={exportExcel}>
            Export Excel
          </button>
          
        </div>
      </div>

      {/* SEARCH + FILTER + SORT */}
      <div className="row mb-3 g-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="not_verified">Not Verified</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort A–Z / Z–A</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
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
            {currentUsers.map((u) => (
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

            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3 gap-2">
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
