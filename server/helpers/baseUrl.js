const baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8001";

module.exports = baseUrl;
