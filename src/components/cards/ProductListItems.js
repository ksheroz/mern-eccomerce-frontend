import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { List } from "antd";
import Text from "antd/lib/typography/Text";
import { TagOutlined } from "@ant-design/icons";
import { getColors, getSizes } from "../../functions/product";

const { Title } = Typography;

function ProductListItems({ product }) {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const {
    articleNo,
    title,
    description,
    price,
    discountedPrice,
    category,
    subs,
    quantity,
    brand,
    slug,
  } = product;

  useEffect(() => {
    getColors(slug)
      .then((res) => setColors([...res.data]))
      .catch();
    getSizes(slug)
      .then((res) => setSizes([...res.data]))
      .catch();
  }, [product]);

  const sizeForm = () => {};

  return (
    <List size="small" header={<Title level={2}>{title}</Title>} bordered>
      {slug && (
        <>
          <List.Item>
            {discountedPrice.price !== price && (
              <div style={{ display: "block" }}>
                <Text
                  style={{
                    display: "inline",
                    marginRight: "2px",
                    fontWeight: 500,
                  }}
                >{`Rs.${discountedPrice.price}.00`}</Text>
                <Text
                  type="danger"
                  style={{
                    textDecoration: "line-through",
                    display: "inline",
                  }}
                >{`Rs.${price}.00`}</Text>
                <Text
                  style={{
                    float: "right",
                    color: "red",
                  }}
                >
                  <TagOutlined /> {`-${discountedPrice.discount}%`}
                </Text>
              </div>
            )}
            {discountedPrice.price === price && (
              <Text
                style={{ fontWeight: 500, display: "block" }}
              >{`Rs.${price}.00`}</Text>
            )}
          </List.Item>
          <List.Item>
            <Title level={5}>Colors:</Title>
            <div>
              {colors.map((color) => (
                <span
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    display: "inline-block",
                    margin: "2em",
                  }}
                ></span>
              ))}
            </div>
          </List.Item>
          <List.Item>
            <Title level={5}>Sizes:</Title>
            <div>
              {sizes.map((size) => (
                <span
                  style={{ fontWeight: 700, margin: "2em", fontSize: "1.25em" }}
                >
                  {size}
                </span>
              ))}
            </div>
          </List.Item>
          <List.Item>
            <Title level={5}>Category</Title>
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
          </List.Item>
          <List.Item>
            <Title level={5}>Sub Category</Title>
            <div>
              {subs.map((s) => (
                <Link
                  key={s._id}
                  to={`/sub/${s.slug}`}
                  style={{ margin: "0.5em" }}
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </List.Item>
          <List.Item>
            <Title level={5}>Brand</Title>
            <Text>{brand}</Text>
          </List.Item>
        </>
      )}
    </List>
  );
}

export default ProductListItems;
