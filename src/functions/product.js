import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getAllBrands = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product/brands`);

export const getAllColors = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product/colors`);

export const getAllSizes = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product/sizes`);
