import config from "@/config";
import axios from "axios";

export default async function gladtidingsdataWallet(req, res) {
  const apiSecret = process.env.GLADTIDING_TOKEN;
  const baseUrl = process.env.GLADTIDING_BASE_URL;

  // const apiUrl = `${config}/api/v1/disbursements/wallet/balance`;
  // const accountNumber = process.env.accountNumber;

  const headers = { 
    'Authorization': `Token ${apiSecret}`, 
    'Content-Type': 'application/json'
  };

  try {
    // const response = await axios.post(`${baseUrl}/api/user/`, { headers });
    // // console.log(JSON.stringify(response.data));
    // res.status(200).json(response.data);
    var config = {
        method: 'post',
      maxBodyLength: Infinity,
        url: `${baseUrl}/api/user/`,
        headers: { 
            'Authorization': `Token ${apiSecret}`, 
            'Content-Type': 'application/json'
        }
      };
      
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.log("Error", error);
      });
    
  } catch (error) {

    res
      .status(error.response ? error.response.status : 500)
      .json(error.response ? error.response.data : { error: error.message });
  }
}
