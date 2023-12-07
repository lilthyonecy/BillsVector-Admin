import Layout from "@/components/Layout";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const airtimeItems = {
  network: "",
};

const innitialState = {
  field: "",
  type: "",
  headerName: "",
};

function Data() {
  const [properties, setProperties] = useState();
  const [property, setProperty] = useState([]);
  const [net_provider, setNetwork] = useState(innitialState);
  const [name, setName] = useState("");

  const router = useRouter();
  
  function removeInputdata() {
    setProperties();
  }
  function addProperty() {
    setProperties({ name: "", values: "" });
  }

  function handleNameChange(value) {
    setName(value);
  }

  function handlePropertyChange(key, value) {
    setProperties((prevProperty) => ({
      ...prevProperty,
      [key]: value,
    }));
  }

  function saveProperty(e) {
    e.preventDefault();
    const data = {
      serviceProvider: name,
      properties: {
        [properties.name]: properties.values
          .split(",")
          .map((value) => value.trim()),
      },
    };

    // setProperty(data);
    setProperty((prevProperties) => {
      return [...prevProperties, data];
    });
    console.log("Saving property:", property);

    setProperties();
    setName("");
  }
  return (
    <Layout>
      <button
        onClick={addProperty}
        type="button"
        className="p-6 btn-primary text-sm mt-4 mb-2"
      >
        Add new data
      </button>
      <div className="relative flex w-full ">
        <div className="absolute flex gap-2 -top-10 right-4">
          <button
            type="submit"
            className="btn-primary py-1"
            onClick={() => router.push("/services/providers/mtn")}
          >
            MTN
          </button>
          <button
            type="submit"
            className="btn-primary py-1"
            onClick={() => router.push("/services/providers/glo")}
          >
            GLO
          </button>
          <button
            type="submit"
            className="btn-primary py-1"
            onClick={() => router.push("/services/providers/airtel")}
          >
            AIRTEL
          </button>
          <button
            type="submit"
            className="btn-primary py-1"
            onClick={() => router.push("/services/providers/9mobile")}
          >
            9MOBILE
          </button>
        </div>
      </div>
      <h1 className="font-bold">Data</h1>
      <form onSubmit={saveProperty}>
        <div className="mt-2">
          {properties && (
            <div className="flex bg-gray-300 p-2 gap-2 mb-2">
              <div className="w-1/4">
                <label className="block">Provider Name</label>
                <input
                  type="text"
                  required
                  placeholder={"All or (MTN/AIRTEl/GLO)"}
                  onChange={(ev) => handleNameChange(ev.target.value)}
                  value={name}
                />
              </div>
              <div className="w-2/6">
                <label className="block">Data's Name</label>
                <input
                  type="text"
                  className="mb-0"
                  value={properties.name}
                  required
                  onChange={(ev) =>
                    handlePropertyChange("name", ev.target.value)
                  }
                  placeholder="name (example: uri or api)"
                />
              </div>
              <div className="w-full">
                <label className="block">Data's Value</label>
                <input
                  type="text"
                  className="mb-0"
                  value={properties.values}
                  required
                  onChange={(ev) =>
                    handlePropertyChange("values", ev.target.value)
                  }
                  placeholder="values, comma separated (example: apiUrl or params)"
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
        {properties && (
          <div className="flex gap-2">
            {!properties && (
              <button type="submit" className="btn-primary py-1">
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary py-1">
              Save
            </button>
          </div>
        )}
      </form>
      {/* Display saved properties */}
      {property.length > 0 && (
        <div>
          <h2>Saved Properties:</h2>
          <ul>
            {property.map((savedProperty, index) => (
              <li key={index}>
                Name: {savedProperty.serviceProvider}, Values:
                {Object.entries(savedProperty.properties).map(
                  ([key, value]) => (
                    <span key={key}>
                      {key}: {value.join(", ")}
                      <br />
                    </span>
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}

export default Data;
