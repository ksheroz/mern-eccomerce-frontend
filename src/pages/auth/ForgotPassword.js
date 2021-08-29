import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Form, Divider } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import webShopping from "../../assets/webShopping.svg";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Link } from "react-router-dom";
import forgotPassword from "../../assets/forgotPassword.svg";
import Text from "antd/lib/typography/Text";

function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const onValuesChange = (changedValues) => {
    setEmail(changedValues.email);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const forgotPasswordForm = () => (
    <Form
      name="forgotPasswordForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleSubmit}
      onValuesChange={onValuesChange}
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
          <Title level={3}>Reset Password</Title>
        )}
      </Form.Item>

      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { type: "email" },
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
        <Text>
          A password reset link will be sent to your email address. Kindly
          follow the intructions in the email to reset the password.
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
        <Button htmlType="submit" type="primary" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Row style={{ marginTop: "3em" }}>
        <Col sm={{ span: 4, offset: 1 }} xs={{ span: 20, offset: 2 }}>
          <img src={forgotPassword} width="100%" height="100%" />
        </Col>
        <Col sm={{ span: 12, offset: 1 }} xs={{ span: 20, offset: 2 }}>
          {forgotPasswordForm()}
        </Col>
      </Row>
    </>
  );
}

export default ForgotPassword;
