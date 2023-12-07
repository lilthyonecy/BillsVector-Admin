import AddModal from "@/components/AddModal";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function settings(props) {
  //   useEffect(() => {
  //     async function AirtimeApi() {
  //       axios.get("https://vtu.ng/wp-json/api/v1/airtime");
  //     }
  //   }, []);
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <h1>Settings</h1>
      <div className="grid grid-cols-3 gap-10 md:gap-20  my-4">
        <button className="bg-blue-600 flex items-center justify-center rounded-md px-8 py-3 text-base font-bold text-white hover:bg-indigo-700 focus:outline-none">
          General
        </button>
        <button className="bg-green-500 flex items-center text-base justify-center rounded-lg p-4 font-bold text-white hover:bg-green-700 focus:outline-none">
          Service
        </button>
        <button
          className="bg-rose-600 flex items-center text-base justify-center rounded-lg p-4 font-bold text-white hover:bg-rose-700 focus:outline-none"
          onClick={(value) => {
            console.log(value);
            setOpen(true);
          }}
        >
          Monnify
        </button>
      </div>
      <form>
        <div className="flex gap-1">
          <div className="w-2/4">
            <label>Api Url</label>
            <input type="text" placeholder="Url" />
          </div>
          <div className="w-2/4">
            <label>Api Url</label>
            <input type="text" placeholder="Url" />
          </div>
        </div>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <div className="container bg-white mt-5 p-2">Thysr</div>

      {open && (
        <AddModal setOpen={setOpen} />
      )}
    </Layout>
  );
}

export default settings;
