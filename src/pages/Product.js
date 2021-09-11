import React, { useEffect, useState } from "react";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct, productStar } from "../functions/product";
import { Row, Col, Typography } from "antd";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { getRelated } from "../functions/product";

const { Title } = Typography;

function Product({ match }) {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [product]);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // updated rating in real time
    });
  };

  return (
    <>
      <Row>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <hr />
          <Title level={4}>Related Products</Title>
          <hr />
        </Col>
      </Row>
      <Row>
        {related.length ? (
          related.map((r) => (
            <Col
              key={r._id}
              xs={{ span: 24, offset: 0 }}
              md={{ span: 6, offset: 0 }}
            >
              <ProductCard product={r} />
            </Col>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>No Products Found</div>
        )}
      </Row>
    </>
  );
}

export default Product;
