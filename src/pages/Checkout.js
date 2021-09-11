import {
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Form,
  Input,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

function Checkout({ history }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("User cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    //
  };

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const redirectToLogin = () => {
    history.push({
      pathname: "/login",
      state: { from: `/checkout` },
    });
  };

  const shippingForm = () => {
    return (
      <Form
        name="shippingForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // onFinish={handleSubmit}
        // onValuesChange={onValuesChange}
      >
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          {loading ? (
            <Title type="success" level={3}>
              Loading...
            </Title>
          ) : (
            <Title level={3}>Shipping Details</Title>
          )}
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your first name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your last name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            sm: {
              span: 16,
              offset: 8,
            },
            xs: { span: 24, offset: 0 },
          }}
        >
          <Text type="danger">*Only shipping to Pakitan</Text>
        </Form.Item>

        <Form.Item
          label="Street Address"
          name="streetAddress1"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your address!" },
          ]}
        >
          <Input placeholder="House number and street name" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            sm: {
              span: 16,
              offset: 8,
            },
            xs: { span: 24, offset: 0 },
          }}
          name="streetAddress2"
          rules={[{ type: "string" }]}
        >
          <Input placeholder="Apartment, suite, unit, etc. (opitonal)" />
        </Form.Item>

        <Form.Item
          label="Town/City"
          name="town"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your city!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State/City"
          name="state"
          rules={[
            { type: "string" },
            { required: true, message: "Please select your state!" },
          ]}
        >
          <Select>
            <Option value="Azad Kashmir">Azad Kashmir</Option>
            <Option value="Balochistan">Balochistan</Option>
            <Option value="FATA">FATA</Option>
            <Option value="Gilgit Baltistan">Gilgit Baltistan</Option>
            <Option value="Islamabad Capital Territory">
              Islamabad Capital Territory
            </Option>
            <Option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</Option>
            <Option value="Punjab">Punjab</Option>
            <Option value="Sindh">Sindh</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Postal/Zip" name="zip" rules={[{ type: "number" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { type: "number" },
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { type: "string" },
            { required: true, message: "Please input your email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            sm: {
              span: 16,
              offset: 8,
            },
            xs: { span: 24, offset: 0 },
          }}
        >
          <Button type="primary" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <>
      <p style={{ textAlign: "center", margin: "1em" }}>
        Returning customer?
        <Link onClick={redirectToLogin}> Click here to login</Link>
      </p>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 12, offset: 0 }}>
          {shippingForm()}
          <Divider />
          <Title level={4}>Got coupon?</Title>
          <br />
          coupon input and apply button
        </Col>

        <Col xs={{ span: 20, offset: 2 }} md={{ span: 12, offset: 0 }}>
          <Title level={4}>Order Summary</Title>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} =
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Cart Total: {total}</p>

          <Row>
            <Col xs={{ span: 20, offset: 2 }} md={{ span: 12, offset: 0 }}>
              <Button type="primary">Place Order</Button>
            </Col>

            <Col xs={{ span: 20, offset: 2 }} md={{ span: 12, offset: 0 }}>
              <Button
                type="primary"
                disabled={!products.length}
                onClick={emptyCart}
              >
                Empty Cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Checkout;
