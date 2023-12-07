import AddModal from "@/components/AddModal";
import Layout from "@/components/Layout";
import UsersData from "@/components/SubscribersData";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "fullname",
    type: "string",
    headerName: "Full name",
    width: 150,
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    type: "string",
  },
  {
    field: "password",
    headerName: "Password",
    width: 200,
    type: "password",
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "phone",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "balance",
    type: "phone",
    headerName: "Wallet Ballance",
    width: 200,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: ["not_verified", "verified"],
  },
];

function subscribers() {
  const [open, setOpen] = useState(false);
  const verifiedField = columns.find((column) => column.field === "verified");
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("api/subscribers")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        // console.log("errr", err);
      });
  }, []);

  return (
    <Layout>
      <div className="flex justify-between mb-5">
        <h1 className="font-bold">Subscribers</h1>
        <button
          type="submit"
          className="btn-primary py-1"
          onClick={() => setOpen(true)}
        >
          Add New User
        </button>
      </div>
      {data && <UsersData />}
      {open && (
        <AddModal
          slug="user"
          selectbtn={verifiedField}
          columns={columns}
          setOpen={setOpen}
        />
      )}
    </Layout>
  );
}

export default subscribers;
