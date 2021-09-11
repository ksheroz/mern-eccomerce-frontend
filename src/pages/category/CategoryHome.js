import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";
import { Col, Row, Space, Typography } from "antd";

const { Title } = Typography;

function CategoryHome({ match }) {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Row justify="center">
        <Col>
          {loading ? (
            <Title level={4}>Loading...</Title>
          ) : (
            <Title level={4}>
              {products.length} Products in "{category.name}" category
            </Title>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {products.map((p) => (
          <Col
            key={p._id}
            xs={{ span: 24, offset: 0 }}
            md={{ span: 6, offset: 0 }}
          >
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default CategoryHome;
