import { Button, Col, Input, Row, Form, List, Space } from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import Title from "antd/lib/typography/Title";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "../../../functions/category";

function CatergoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const onValuesChange = (changedValues) => {
    setName(changedValues.name);
  };

  const handleSubmit = () => {
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => (
    <Form
      name="categoryForm"
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
          <Title level={3}>Update Category</Title>
        )}
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          { type: "string" },
          { required: true, message: "Please input a valid category name!" },
        ]}
      >
        <Input value={name} />
        {name}
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Row>
        <Col sm={{ span: 4, offset: 0 }} xs={{ span: 0, offset: 0 }}>
          <AdminNav />
        </Col>
        <Col
          sm={{ span: 12, offset: 2 }}
          xs={{ span: 20, offset: 2 }}
          style={{ marginTop: "1.5rem" }}
        >
          {categoryForm()}
        </Col>
      </Row>
    </>
  );
}

export default CatergoryUpdate;
