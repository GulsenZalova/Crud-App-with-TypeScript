import axios from "axios";

export const NorthwindApiInstance=axios.create({
    baseURL:"https://northwind.vercel.app/api",
    timeout:1000
})