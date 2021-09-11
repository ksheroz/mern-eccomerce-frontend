import React, { useState, useEffect } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { Col, Row, Typography } from "antd";
import { getSub } from "../../functions/sub";

const { Title } = Typography;

function SubHome({ match }) {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      setSub(res.data.sub);
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
              {products && products.length} Products in "{sub.name}" Sub
              category
            </Title>
          )}
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {products &&
          products.map((p) => (
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

export default SubHome;
