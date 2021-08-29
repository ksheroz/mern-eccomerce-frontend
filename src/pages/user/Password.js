import React, { useState } from "react";
import { Button, Col, Input, Row, Form } from "antd";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import Title from "antd/lib/typography/Title";

function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onValuesChange = (changedValues) => {
    setPassword(changedValues.password);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // console.log(password);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <Form
      name="passwordUpdateForm"
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
          <Title level={3}>Update Password</Title>
        )}
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
      <Row>
        <Col sm={{ span: 4, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <UserNav />
        </Col>
        <Col
          sm={{ span: 12, offset: 1 }}
          xs={{ span: 20, offset: 2 }}
          style={{ marginTop: "1.5rem" }}
        >
          {passwordUpdateForm()}
        </Col>
      </Row>
    </>
  );
}

export default Password;
