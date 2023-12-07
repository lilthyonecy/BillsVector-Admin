import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

function UsersData({ swal }) {
  const [formData, setFormData] = useState({});

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("api/subscribers")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    const transformedValue = name === "verified" ? value === "verified" : value;
    const transform = value === "not_verified" ? false : transformedValue;

    setFormData({
      ...formData,
      [name]: transform,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post("api/subscribers", formData)
      .then((res) => {})
      .catch((err) => {});
    // setOpen(false);
  }
  const filteredData = data.filter((subscriber) => {
    const { fullname, username, email } = subscriber;
    const query = searchQuery.toLowerCase();
    return (
      fullname.toLowerCase().includes(query) ||
      username.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query)
    );
  });
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  function deleteUser(subscriber) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${subscriber.fullname}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = subscriber;
          await axios.delete("/api/subscribers?_id=" + _id);
          fetchData();
        }
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search for users..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <table className="basic table-auto mt-4 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Verified</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 &&
            filteredData.map((subscriber, index) => (
              <tr key={subscriber._id}>
                <td className="border text-center px-4 py-2">{index + 1}</td>
                <td className="border text-center px-4 py-2">{"Avatar"}</td>
                <td className="border text-center px-4 py-2">
                  {subscriber.fullname}
                </td>
                <td className="border text-center px-4 py-2">
                  {subscriber.email}
                </td>
                <td className="border text-center px-4 py-2">
                  {subscriber.username}
                </td>
                <td className="border text-center px-4 py-2">
                  {subscriber.verified ? "Yes" : "No"}
                </td>
                <td className="border text-center px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    View
                  </button>
                  <button
                    onClick={() => deleteUser(subscriber)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default withSwal(({swal}, ref) => (
    <UsersData swal={swal} />
));
