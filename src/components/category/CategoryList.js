import { Button, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const { Title } = Typography;
function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Button key={c._id} type="default" style={{ margin: "0.75em" }}>
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </Button>
    ));

  return (
    <Row justify="center">
      {loading ? (
        <Title level={4} style={{ textAlign: "center" }}>
          Loading...
        </Title>
      ) : (
        showCategories()
      )}
    </Row>
  );
}

export default CategoryList;
