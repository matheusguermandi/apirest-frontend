import axios from "axios";

const api = axios.create({
  baseURL: "https://apirestpessoas.herokuapp.com/",
});

// Prod
// baseURL: "https://apirestpessoas.herokuapp.com/",

// Dev
// baseURL: "http://localhost:8080/",

export default api;
