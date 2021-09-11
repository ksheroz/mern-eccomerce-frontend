import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Col, Row } from "antd";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import Title from "antd/lib/skeleton/Title";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
      <Row>
        <Col sm={{ span: 5, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <AdminNav />
        </Col>
        <Col sm={{ span: 17, offset: 1 }} xs={{ span: 20, offset: 2 }}>
          {loading ? (
            <Title className="text-danger">Loading...</Title>
          ) : (
            <Title>All Products</Title>
          )}
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col
                key={product._id}
                sm={{ span: 6, offset: 0 }}
                xs={{ span: 20, offset: 2 }}
              >
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default AllProducts;
