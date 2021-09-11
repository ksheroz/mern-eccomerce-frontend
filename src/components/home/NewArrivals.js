import React, { useEffect, useState } from "react";
import { Col, Pagination, Row, Typography } from "antd";
import ProductCard from "../cards/ProductCard";
import { getProducts, getProductsCount } from "../../functions/product";

const { Title } = Typography;

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <Title level={1} style={{ color: "grey" }}>
        {loading ? "Loading..." : "New Arrivals"}
      </Title>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col
            key={product._id}
            xs={{ span: 24, offset: 0 }}
            md={{ span: 6, offset: 0 }}
          >
            <ProductCard product={product} loading={loading} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 8, offset: 8 }}
          style={{
            textAlign: "center",
            marginBottom: "0.75em",
            marginTop: "0.75em",
          }}
        >
          <nav>
            <Pagination
              current={page}
              total={(productsCount / 4) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </Col>
      </Row>
    </>
  );
}

export default NewArrivals;
