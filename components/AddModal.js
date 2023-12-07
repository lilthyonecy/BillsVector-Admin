import axios from "axios";
import React, { use, useEffect, useState } from "react";

function AddModal({ columns, endpoint, selectbtn, setOpen, slug, frmhiddta }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (frmhiddta && frmhiddta.category == "network") {
      setFormData({
        ...formData,
        networkid: frmhiddta.id,
        network: frmhiddta.name,
      });
    }
  },[]);

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
    console.log(formData)
    if (endpoint) {
      await axios
        .post(endpoint, formData)
        .catch((err) => console.log("error submiting", err));
      setOpen(false);
    } else {
      console.log("NO EndPoint To Submit TO!!!");
    }
  }

  return (
    <div>
      <div className="relative z-10" role="dialog" aria-modal="true">
        <div className="block fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed flex justify-center items-center h-screen inset-0 z-10">
          <div className="flex md:min-h-full items-stretch  text-center md:items-center md:px-2 lg:px-4">
            <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div className="relative flex w-full md:items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 "
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="md:grid w-full md:items-center">
                  <h1 className="mb-10 font-bold">Add new {slug}</h1>
                  <form
                    className="flex justify-between flex-wrap"
                    onSubmit={handleSubmit}
                  >
                    {/* {frmhiddta && (
                      <>
                        <input
                          type="hidden"
                          name="networkid"
                          value={frmhiddta.id}
                        />
                        <input
                          type="hidden"
                          name="network"
                          value={frmhiddta.name}
                        />
                      </>
                    )} */}

                    {columns
                      .filter(
                        (item) =>
                          item.field !== "id" &&
                          item.field !== "img" &&
                          item.field !== "verified"
                      )
                      .map((column, index) => (
                        <div
                          key={index}
                          className="flex flex-col w-2/5 gap-2 mr-1"
                        >
                          <label>{column.headerName}</label>
                          <input
                            type={column.type}
                            placeholder={column.field}
                            name={column.field}
                            value={formData[column.field] || ""}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    {selectbtn && selectbtn.length > 0
                      ? selectbtn.map((category) => (
                          <div className="flex flex-col w-2/5 gap-2 mr-1">
                            <label>{"column.headerName"}</label>
                            <select
                            //   onChange={(ev) => setParentCategory(ev.target.value)}
                            //   value={parentCategory}
                            >
                              <option value="">Verify?</option>

                              <option key={category._id} value={category.id}>
                                {category.name}
                              </option>
                            </select>
                          </div>
                        ))
                      : selectbtn && (
                          <div className="flex flex-col w-2/5 gap-2 mr-1">
                            <label>{selectbtn.headerName}</label>
                            <select
                              name={selectbtn.field}
                              onChange={handleChange}
                            >
                              {selectbtn.type.length > 0 &&
                                selectbtn.type.map((option, id) => (
                                  <option key={id} value={option}>
                                    {option}
                                  </option>
                                ))}
                            </select>
                          </div>
                        )}
                    <div className="w-full mt-5">
                      <button type="submit" className="btn-primary py-1">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
