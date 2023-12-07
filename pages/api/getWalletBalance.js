import config from "@/config";
import axios from "axios";

export default async function handler(req, res) {
  const apiSecret = process.env.PAYSTACK_SECRET_KEY;
  const baseUrl = process.env.PAYSTACK_BASE_URL;

  // const apiUrl = `${config}/api/v1/disbursements/wallet/balance`;
  // const accountNumber = process.env.accountNumber;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + apiSecret,
  };

  try {
    const response = await axios.get(`${baseUrl}/balance`, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error GLADTIDING: ",
      error.response?.data?.responseMessage || error.message
    );
    res
      .status(error.response ? error.response.status : 500)
      .json(error.response ? error.response.data : { error: error.message });
  }
}