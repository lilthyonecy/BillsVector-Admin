import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState();
  const [readycategories, setreadycategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setreadycategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const { name, category, parentId, imgurl } = categories;
    const data = {
      name,
      id: parentId,
      category,
      imgurl
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
      setCategories()
    } else {
      await axios.post("/api/categories", data);
      setCategories()
    }
    fetchCategories();
  }
  function editCategory(category) {
    setEditedCategory(category);
    setCategories({
      name: category.name,
      parentId: category.id,
      category: category.category,
      imgurl: category.imgurl

    });
  }
  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }
  function addProperty() {
    setCategories({ name: "", parentId: "", category: "", imgurl: "" });
  }

  function handleNameChange(e) {
    let { name, value } = e.target;
    setCategories({ ...categories, [name]: value });
  }

  function removeInputdata() {
    setCategories();
  }
  return (
    <Layout>
      <button
        onClick={addProperty}
        type="button"
        className="btn-default text-sm mb-2"
      >
        Add new property
      </button>
      <h1>Categories</h1>
      <form onSubmit={saveCategory}>
        <div className="mb-2">
          {categories && (
            <div className="flex bg-gray-300 p-2 gap-2 mb-2">
              <div className="">
                <label className="block">Item Name</label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder={"GOTV STARTIME or (MTN/AIRTEl/GLO)"}
                  onChange={handleNameChange}
                  value={categories.name}
                />
              </div>
              <div className="">
                <label className="block">Item ID</label>
                <input
                  type="text"
                  className="mb-0"
                  name="parentId"
                  value={categories.parentId}
                  required
                  onChange={handleNameChange}
                  placeholder="ID"
                />
              </div>
              <div className="">
                <label className="block">Item Category</label>
                <input
                  type="text"
                  className="mb-0"
                  name="category"
                  value={categories.category}
                  required
                  onChange={handleNameChange}
                  placeholder="CABLE/ELECTRICITY/NETWORK"
                />
              </div>
              <div className="">
                <label className="block">Item Img Url</label>
                <input
                  type="text"
                  className="mb-0"
                  name="imgurl"
                  value={categories.imgurl}
                  required
                  onChange={handleNameChange}
                  placeholder="IMAGE URL"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => removeInputdata()}
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        {categories && (
          <div className="flex gap-1">
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setCategories();
                }}
                className="btn-default"
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary py-1">
              Save
            </button>
          </div>
        )}
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
            <td></td>
              <td>Item ID</td>
              <td>Item Name</td>
              <td>Item category</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {readycategories.length > 0 &&
              readycategories.map((category) => (
                <tr key={category._id}>
                  <td> <img width='50' height='50' className="rounded-lg" src={category?.imgurl} alt="" />
                  </td>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category?.category}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
