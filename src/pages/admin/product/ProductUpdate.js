import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ProductForm from "../../../components/forms/ProductForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getProduct } from "../../../functions/product";

const initialValues = {
  articleNo: "",
  title: "",
  description: "",
  price: "",
  discount: "",
  category: "",
  subs: [],
  images: [],
  brand: "",
};

function ProductUpdate({ match }) {
  const [values, setValues] = useState(initialValues);
  const [quantity, setQuantity] = useState([]);
  // router
  const { slug } = match.params;

  // destructure
  const {
    articleNo,
    title,
    description,
    price,
    discount,
    category,
    subs,
    images,
    brand,
  } = values;

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    console.log(values.quantity);
    const prevQuantity = values.quantity
      ? values.quantity.map((item) => {
          return {
            color: item.color_Id.name,
            size: item.size,
            available: item.available,
            key: quantity.length,
            color_Id: item.color_Id._id,
          };
        })
      : [];
    console.log(prevQuantity);
    setQuantity(prevQuantity);
    console.log(quantity);
  }, [values.quantity]);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
    });
  };
  return (
    <>
      <Row>
        <Col sm={{ span: 4, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <AdminNav />
        </Col>
        <Col
          sm={{ span: 12, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
          style={{ marginTop: "1.5rem" }}
        >
          <ProductForm
            values={values}
            setValues={setValues}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </Col>
      </Row>
    </>
  );
}

export default ProductUpdate;
