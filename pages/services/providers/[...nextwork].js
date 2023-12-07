import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import AddModal from "@/components/AddModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const columns = [
  {
    field: "plan",
    type: "text",
    headerName: "Plan name",
  },
  {
    field: "plan_id",
    headerName: "Plan Id",
    type: "phone",
  },
  {
    field: "price",
    headerName: "Price",
    type: "phone",
  },
  {
    field: "sells_price",
    headerName: "Sells Price",
    type: "phone",
  },
  {
    field: "category",
    type: "text",
    headerName: "Plan Category",
  },
  {
    field: "duration",
    type: "phone",
    headerName: "Plan Duration",
  },
];

export default function serviceProviders() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState();
  const router = useRouter();
  const [net_provider, setNetwork] = useState();
  const [plans, setPlan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { nextwork } = router.query;
  useEffect(() => {
    if (nextwork == "mtn") {
      axios.get("/api/categories?name=" + nextwork).then((response) => {
        setNetwork(response.data);
      });
    } else if (nextwork == "airtel") {
      axios.get("/api/categories?name=" + nextwork).then((response) => {
        setNetwork(response.data);
      });
    } else if (nextwork == "glo") {
      axios.get("/api/categories?name=" + nextwork).then((response) => {
        setNetwork(response.data);
      });
    } else if (nextwork == "9mobile") {
      axios.get("/api/categories?name=" + nextwork).then((response) => {
        setNetwork(response.data);
      });
    } else {
      router.back();
      return;
    }
    setService(nextwork ? String(nextwork).toUpperCase() : "");
    fetchPlans(nextwork);
  }, [nextwork]);

  function fetchPlans(plan) {
    axios.get("/api/ServicePlan?network=" + plan).then((result) => {
      setPlan(result.data);
    });
  }

  const filterPlans = plans.filter((plan) => {
    const { category, plan_id } = plan;
    const query = searchQuery.toLowerCase();
    return (
      plan_id.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query)
    );
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  function deleteUser(plan) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${plan.plan}?`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#d55",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = plan;
        await axios.delete("/api/plans?_id=" + _id);
        fetchData();
      }
    });
  }
  return (
    <Layout>
      <div className="flex justify-between rounded-lg p-2 bg-white mb-4">
        <button onClick={() => router.back()} className="btn-primary  py-1">
          Back
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn-primary py-1"
        >
          Add Plan
        </button>
      </div>
      <h1>{service} SERVICE</h1>
      <div className="w-full bg-white p-4">
        <p
          onClick={() => {
            // Swal.fire({
            //   title: "Error!",
            //   text: "Do you want to continue?",
            //   icon: "error",
            //   confirmButtonText: "Cool",
            // });
            MySwal.fire({
              title: <p>Hello World</p>,
              didOpen: () => {
                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                MySwal.showLoading();
              },
            }).then(() => {
              return MySwal.fire(<p>Shorthand works too</p>);
            });
          }}
          className=""
        >
          {service}
        </p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search for plan..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <table className="basic table-auto mt-4 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Plan Id</th>
              <th className="border px-4 py-2">Plan name</th>
              <th className="px-4 py-2">Price</th>
              <th className="border px-4 py-2">Sells Price</th>
              <th className="border px-4 py-2">Vendor </th>
              <th className="border px-4 py-2">Plan Type</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterPlans.length > 0 &&
              filterPlans.map((plan, index) => (
                <tr key={plan._id}>
                  <td className="border text-center px-4 py-2">{plan.plan_id}</td>
                  <td className="border text-center px-4 py-2">
                    {plan.plan}
                  </td>
                  <td className="border text-center px-4 py-2">{plan.price}</td>
                  <td className="border text-center px-4 py-2">
                    {plan.sells_price}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {plan.sells_price}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {plan.category}
                  </td>
                  <td className="border text-center px-4 py-2">
                    {plan.duration === '1'? plan.duration+' Day': plan.duration+' Days'}
                  </td>
                  <td className="border text-center px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(plan)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {open && (
        <AddModal
          endpoint={"/api/ServicePlan"}
          slug={nextwork + " Plan"}
          columns={columns}
          frmhiddta={net_provider}
          setOpen={setOpen}
        />
      )}
    </Layout>
  );
}
