import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "@/config";

export default function Home() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState(0);
  const [gladtidingsdataWallet, setgladtidingsdataWallet] = useState(0);
  const [UserTotalbal, setUserTotalbal] = useState(0);
  const [UserTotalCount, setUserTotalCount] = useState(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      getWalletBalance();
      handlegladtidingsdataWallet();
      handleUserTotalbal();
    }, 1000);

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  async function getWalletBalance() {
    try {
      const response = await fetch(`/api/getWalletBalance`);
      const resp = await response.json();

      // const availableBalance = data.responseBody.availableBalance;
      // response.data.data[0].balance
      const availableBalance = resp.data[0].balance;
      setBalance(availableBalance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  }
  async function handlegladtidingsdataWallet() {
    try {
      const response = await fetch(`/api/gladtidingsdataWallet`);
      const resp = await response.json();

      const availableBalance = resp.user.Account_Balance;
      setgladtidingsdataWallet(availableBalance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  }

  async function handleUserTotalbal() {
    try {
      axios
        .get("api/subscribers")
        .then((res) => {
          const users = res.data
          
          const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
          
          setUserTotalbal(totalBalance);
          const totalUsers = users.length;
          setUserTotalCount(totalUsers);
          // console.log(res.data)
        })
        .catch((err) => {
          console.log("errr", err);
        });
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  }

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="" className="w-6 h-6" />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
      <div className="flex bg-white rounded-lg justify-evenly m-5">
        <div className="flex w-2/4 md:p-4 sm:p-2 justify-between border-slate-300 border-r-2">
          <span>
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <g fill="red">
                <path d="M1.443 5.978a9.917 9.917 0 0113.114 0 .75.75 0 00.992-1.126 11.417 11.417 0 00-15.098 0 .75.75 0 10.992 1.126z" />

                <path d="M3.813 8.525a6.583 6.583 0 018.427 0 .75.75 0 00.96-1.153 8.083 8.083 0 00-10.347 0 .75.75 0 00.96 1.153z" />

                <path d="M8.003 10.5a3.25 3.25 0 00-1.882.6.75.75 0 01-.869-1.222 4.75 4.75 0 015.502 0 .75.75 0 11-.868 1.223 3.25 3.25 0 00-1.883-.601zM8 12a1 1 0 100 2h.007a1 1 0 100-2H8z" />
              </g>
            </svg>
          </span>
          <div className="flex flex-col	">
            <span>&#8358; {UserTotalbal}</span>
            <span>Total Users Bal.</span>
          </div>
        </div>
        <div className="flex w-2/4 md:p-4 sm:p-2 justify-between border-slate-300 border-r-2">
          <span>
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <g fill="orange">
                <path d="M1.443 5.978a9.917 9.917 0 0113.114 0 .75.75 0 00.992-1.126 11.417 11.417 0 00-15.098 0 .75.75 0 10.992 1.126z" />

                <path d="M3.813 8.525a6.583 6.583 0 018.427 0 .75.75 0 00.96-1.153 8.083 8.083 0 00-10.347 0 .75.75 0 00.96 1.153z" />

                <path d="M8.003 10.5a3.25 3.25 0 00-1.882.6.75.75 0 01-.869-1.222 4.75 4.75 0 015.502 0 .75.75 0 11-.868 1.223 3.25 3.25 0 00-1.883-.601zM8 12a1 1 0 100 2h.007a1 1 0 100-2H8z" />
              </g>
            </svg>
          </span>
          <div className="flex flex-col	">
            <span>&#8358; {gladtidingsdataWallet}</span>
            <span>Wallet Bal.</span>
          </div>
        </div>
        <div className="flex w-2/4 md:p-4 sm:p-2 justify-between border-slate-300 border-r-2">
          <a href="https://app.monnify.com/wallet" target="_blank">
            <span>
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g fill="yellow">
                  <path d="M1.443 5.978a9.917 9.917 0 0113.114 0 .75.75 0 00.992-1.126 11.417 11.417 0 00-15.098 0 .75.75 0 10.992 1.126z" />

                  <path d="M3.813 8.525a6.583 6.583 0 018.427 0 .75.75 0 00.96-1.153 8.083 8.083 0 00-10.347 0 .75.75 0 00.96 1.153z" />

                  <path d="M8.003 10.5a3.25 3.25 0 00-1.882.6.75.75 0 01-.869-1.222 4.75 4.75 0 015.502 0 .75.75 0 11-.868 1.223 3.25 3.25 0 00-1.883-.601zM8 12a1 1 0 100 2h.007a1 1 0 100-2H8z" />
                </g>
              </svg>
            </span>
          </a>
          <div className="flex flex-col	">
            <span>&#8358; {balance}</span>
            <span>Paystack Bal.</span>
          </div>
        </div>
        <div className="flex w-2/4 md:p-4 sm:p-2 justify-between">
          <span>
            <svg
              fill="orange"
              width="50"
              height="50px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M983.727 5.421 1723.04 353.62c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0ZM757.088 383.322c-176.075 0-319.285 143.323-319.285 319.398 0 176.075 143.21 319.285 319.285 319.285 1.92 0 3.84 0 5.76-.113l58.504 58.503h83.689v116.781h116.781v83.803l91.595 91.482h313.412V1059.05l-350.57-350.682c.114-1.807.114-3.727.114-5.647 0-176.075-143.21-319.398-319.285-319.398Zm0 112.942c113.732 0 206.344 92.724 205.327 216.62l-3.953 37.271 355.426 355.652v153.713h-153.713l-25.412-25.299v-149.986h-116.78v-116.78H868.108l-63.812-63.7-47.209 5.309c-113.732 0-206.344-92.5-206.344-206.344 0-113.732 92.612-206.456 206.344-206.456Zm4.98 124.98c-46.757 0-84.705 37.948-84.705 84.706s37.948 84.706 84.706 84.706c46.757 0 84.706-37.948 84.706-84.706s-37.949-84.706-84.706-84.706Z"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <span>Admin Panel</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 m-5">
        <div className="bg-white rounded-lg p-2">{UserTotalCount}  Users</div>
        <div className="bg-white rounded-lg p-2">02</div>
        <div className="bg-white rounded-lg p-2">03</div>
        <div className="bg-white rounded-lg p-2">Messages</div>
      </div>
    </Layout>
  );
}
