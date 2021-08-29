import { Button, Col, Input, Row, Form, List, Space, Divider } from "antd";
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

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const onValuesChange = (changedValues) => {
    setName(changedValues.name);
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  const handleSubmit = () => {
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
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
          <Title level={3}>Add a new Category</Title>
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
          <Input
            // step 3
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            value={keyword}
            bordered={false}
            placeholder="Filter"
          />
          <Divider />

          <List
            itemLayout="horizontal"
            dataSource={
              // step 5
              categories.filter(searched(keyword))
            }
            renderItem={(item) => (
              <List.Item
                style={{
                  borderRadius: "10px",
                  padding: "1em",
                  backgroundColor: "#faad14",
                  margin: "0.25em",
                }}
              >
                <List.Item.Meta title={item.name} />
                <Space>
                  <Link to={`/admin/category/${item.slug}`}>
                    {" "}
                    <Button type="primary" icon={<EditOutlined />} />
                  </Link>

                  <Button
                    type="primary"
                    danger
                    onClick={() => handleRemove(item.slug)}
                    icon={<DeleteOutlined />}
                  ></Button>
                </Space>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

export default CategoryCreate;
