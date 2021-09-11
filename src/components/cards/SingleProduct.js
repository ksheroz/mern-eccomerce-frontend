import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tabs, Tooltip, Form, Select } from "antd";
import {
  HeartOutlined,
  HeartTwoTone,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";
import StarRating from "react-star-ratings";
import { showAverage } from "../../functions/rating";
import _, { set } from "lodash";
import { getColors, getSizes } from "../../functions/product";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const { TabPane } = Tabs;
const { Option } = Select;

function SingleProduct({ product, onStarClick, star }) {
  const [tooltip, setTooltip] = useState("Click to add");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState();
  const [color, setColor] = useState("");
  const [status, setStatus] = useState();
  const { title, description, images, slug, _id } = product;

  const [form] = Form.useForm();

  useEffect(() => {
    getColors(slug)
      .then((res) => setColors(res.data))
      .catch();
    getSizes(slug)
      .then((res) => setSizes(res.data))
      .catch();
  }, [product]);

  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      handleAddToCart();
    } else if (status === false) {
      toast.error("Please select your desired color and size!");
    }
  }, [status]);

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
        color,
        size,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
      setStatus();
    }
  };

  const handleSubmit = () => {
    setStatus(true);
    console.log(status);
  };

  const onValuesChange = (changedValues) => {
    changedValues.size
      ? setSize(changedValues.size)
      : setColor(changedValues.color);
  };

  const sizeAndColorForm = () => {
    return (
      <Form
        name="sizeAndColorForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        onValuesChange={onValuesChange}
        form={form}
      >
        <Form.Item
          label="Color"
          name="color"
          rules={[
            { type: "string" },
            { required: true, message: "Please select your desired color!" },
          ]}
        >
          <Select style={{ width: 120 }}>
            {colors &&
              colors.map((color) => <Option value={color}>{color}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item
          label="Size"
          name="size"
          rules={[
            { type: "number" },
            { required: true, message: "Please select your desired size!" },
          ]}
        >
          <Select style={{ width: 120 }}>
            {sizes && sizes.map((size) => <Option value={size}>{size}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      <Col sm={{ span: 20, offset: 2 }} md={{ span: 14, offset: 0 }}>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => (
                <div>
                  <img
                    src={i.url}
                    key={i.public_id}
                    style={{
                      width: "100%",
                      // height: "85vh",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src="https://res.cloudinary.com/mern-eccomerce/image/upload/v1630872656/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector_dm7ask.jpg"
                style={{
                  marginBottom: "1.5em",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            }
          ></Card>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxx xxx xxxxxxx to learn more about this product.
          </TabPane>
        </Tabs>
      </Col>
      <Col sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 0 }}>
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : "No rating yet"}

        <Card
          actions={[
            <Tooltip title={tooltip}>
              <Button
                type="link"
                icon={<ShoppingCartOutlined />}
                onClick={() => {
                  form.submit();
                }}
              >
                <br /> Add to cart
              </Button>
            </Tooltip>,
            <Button
              style={{ color: "red", marginBottom: "0.75em" }}
              type="link"
              icon={<HeartTwoTone twoToneColor="red" />}
            >
              <br /> Wishlist
            </Button>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
          {sizeAndColorForm()}
        </Card>
      </Col>
    </>
  );
}

export default SingleProduct;
