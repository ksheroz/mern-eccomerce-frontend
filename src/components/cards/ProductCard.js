import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "antd";
import {
  EyeOutlined,
  HeartTwoTone,
  RightCircleFilled,
  ShoppingCartOutlined,
  TagOutlined,
  TagsOutlined,
} from "@ant-design/icons";
// import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import Text from "antd/lib/typography/Text";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

function ProductCard({ product, loading }) {
  const [visible, setVisible] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  //destructure
  const { images, title, description, slug, discountedPrice, price, quantity } =
    product;

  useEffect(() => {
    let c = [];
    quantity.map((item) => {
      if (colors.includes(item.color_Id.name) === false)
        c.push(item.color_Id.name);
    });
    setColors(c);
  }, [quantity]);
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div
          style={{
            textAlign: "center",
            paddingTop: "0.5rem",
            paddingBottom: "1.5rem",
          }}
        >
          No rating yet
        </div>
      )}

      <Card
        loading={loading}
        hoverable
        cover={
          <>
            <Image
              preview={{ visible: false }}
              src={
                images && images.length
                  ? images[0].url
                  : "https://res.cloudinary.com/mern-eccomerce/image/upload/v1630872656/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector_dm7ask.jpg"
              }
              onClick={() => setVisible(true)}
              style={{ width: "100%", height: "290px", objectFit: "cover" }}
            />
            <div
              style={{
                display: "none",
              }}
            >
              <Image.PreviewGroup
                preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
              >
                {images &&
                  images.length >= 1 &&
                  images.map((image) => (
                    <Image key={image.public_id} src={image.url}></Image>
                  ))}
              </Image.PreviewGroup>
            </div>
          </>
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <Button type="link" icon={<EyeOutlined />}>
              <br /> View Product
            </Button>
          </Link>,
          <Button
            style={{ color: "red", marginBottom: "0.75em" }}
            type="link"
            icon={<HeartTwoTone twoToneColor="red" />}
          >
            <br /> Wishlist
          </Button>,
        ]}
      >
        <Meta
          title={title}
          description={
            <>
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
              {colors.map((color) => (
                <span
                  style={{
                    height: "15px",
                    width: "15px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    display: "inline-block",
                    margin: "2px",
                  }}
                ></span>
              ))}
            </>
          }
        />
      </Card>
    </>
  );
}

export default ProductCard;
