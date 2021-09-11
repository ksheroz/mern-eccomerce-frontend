import React, { useState } from "react";
import { Alert, AutoComplete, Card, Image, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

function AdminProductCard({ product, handleRemove }) {
  const [visible, setVisible] = useState(false);
  // destructure
  const { title, description, images, price, slug } = product;
  return (
    <>
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={
          // <img
          //   src={images && images.length ? images[0].url : ""}
          //   style={{
          //     width: "100%",
          //     objectFit: "cover",
          //   }}
          // />
          <>
            <Image
              preview={{ visible: false }}
              width={200}
              src={images && images.length ? images[0].url : ""}
              onClick={() => setVisible(true)}
            />
            <div style={{ display: "none" }}>
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
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined className="text-warning" />
          </Link>,
          <DeleteOutlined onClick={() => handleRemove(slug)} />,
        ]}
      >
        <Meta
          title={title}
          description={
            <>
              <Text
                style={{ textDecoration: "line-through" }}
              >{`Rs.${price}.00`}</Text>
              <Text style={{ color: "red" }}>{`Rs.999.00`}</Text>
              <Text style={{ float: "right", color: "red" }}>33%</Text>
              <Row>
                <Space>
                  <span
                    class="dot"
                    style={{
                      height: "15px",
                      width: "15px",
                      backgroundColor: "brown",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                  <span
                    class="dot"
                    style={{
                      height: "15px",
                      width: "15px",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></span>
                </Space>
                <Text style={{ float: "right" }}>7 8 9</Text>
              </Row>
            </>
          }
        />
      </Card>
    </>
  );
}

export default AdminProductCard;
