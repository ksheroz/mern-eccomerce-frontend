import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { Button, Col, Input, Row, Form } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Link } from "react-router-dom";
import completeRegistrationSvg from "../../assets/login.svg";
import { useSelector } from "react-redux";

function Register({ history }) {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (values) => {
    setEmail(values.email);
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email sent to ${email}. Click the link to complete your registration.`
    );
    // save user's email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <Form
      name="registrationForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Title level={3}>Register</Title>
      </Form.Item>

      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { type: String },
          { required: true, message: "Please input your email!" },
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
        <Text>A link will be sent to your email address.</Text>
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
        <Text>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy <Link to="/policy">policy</Link>.
        </Text>
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
        <Button htmlType="submit" type="primary">
          Register
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Row style={{ marginTop: "3em" }}>
        <Col sm={{ span: 4, offset: 1 }} xs={{ span: 20, offset: 2 }}>
          <img src={completeRegistrationSvg} width="100%" height="100%" />
        </Col>
        <Col sm={{ span: 13, offset: 0 }} xs={{ span: 20, offset: 2 }}>
          {registerForm()}
        </Col>
      </Row>
    </>
  );
}

export default Register;
