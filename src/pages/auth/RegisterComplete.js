import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { Button, Col, Input, Row, Form } from "antd";
import Title from "antd/lib/typography/Title";
import completeRegistrationSvg from "../../assets/login.svg";

function RegisterComplete({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (values) => {
    setEmail(values.email);
    setPassword(values.password);
    // validation

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        // console.log("user", user, "idTokenResult", idTokenResult);
        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <Form
      name="completeRegistrationForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Title level={3}>Complete your registration</Title>
      </Form.Item>

      <Form.Item label="Email address" name="email">
        <Input value={email} disabled />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { type: String },
          { required: true, message: "Please input your password!" },
          { min: 6 },
        ]}
      >
        <Input.Password />
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
          {completeRegistrationForm()}
        </Col>
      </Row>
    </>
  );
}

export default RegisterComplete;
