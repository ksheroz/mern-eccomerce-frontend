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
import { createOrUpdateUser } from "../../functions/auth";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const onValuesChange = (changedValues) => {
    changedValues.email
      ? setEmail(changedValues.email)
      : changedValues.password
      ? setPassword(changedValues.password)
      : setRememberMe(changedValues.remember);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch();
      history.push("/");
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <Form
      name="loginForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: rememberMe }}
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
          <Title level={3}>Login</Title>
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
        label="Password"
        name="password"
        rules={[
          { type: "string" },
          { required: true, message: "Please input your password!" },
          { min: 6 },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          sm: {
            offset: 8,
            span: 16,
          },
          xs: { span: 24, offset: 0 },
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          sm: {
            offset: 8,
            span: 16,
          },
          xs: { span: 24, offset: 0 },
        }}
      >
        <Link to="/forgot/password">Forgot Password</Link>
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
        <Button htmlType="submit" type="primary" icon={<MailOutlined />} block>
          Log in
        </Button>
        <Divider plain>or</Divider>

        <Button
          onClick={googleLogin}
          type="danger"
          block
          icon={<GoogleOutlined />}
        >
          Log in with Google
        </Button>
        <Divider plain>
          <Link to="/register">Create an Account</Link>
        </Divider>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Row style={{ marginTop: "3em" }}>
        <Col sm={{ span: 4, offset: 1 }} xs={{ span: 20, offset: 2 }}>
          <img src={webShopping} width="100%" height="100%" />
        </Col>
        <Col sm={{ span: 13, offset: 0 }} xs={{ span: 20, offset: 2 }}>
          {loginForm()}
        </Col>
      </Row>
    </>
  );
}

export default Login;
