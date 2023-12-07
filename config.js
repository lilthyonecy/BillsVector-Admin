const dev = {
    API_URL: 'https://sandbox.monnify.com', // Development API endpoint
  };
  
  const prod = {
    API_URL: 'https://your-production-api-url.com', // Production API endpoint
  };
  
  const config = process.env.NODE_ENV === 'production' ? prod : dev;
  
  export default config;
  