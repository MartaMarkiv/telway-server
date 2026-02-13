const config = {
  databaseUrl: process.env.DB_URL,
  googleAuthUrl: "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=",
  idtApiUrl: process.env.NODE_ENV !== "development" ? "https://sandbox-api.idtexpress.com/v1/dids/coverage" : "https://api.idtexpress.com/v1/dids/coverage",
  idtKey: process.env.IDT_API_KEY,
  idtSecret: process.env.NODE_ENV !== "development" ? process.env.SANDBOX_IDT_SECRET : process.env.IDT_SECRET
  
};

module.exports = config;