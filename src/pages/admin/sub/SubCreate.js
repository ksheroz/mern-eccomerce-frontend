import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Form,
  List,
} from "antd";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Title from "antd/lib/typography/Title";

const { Option } = Select;

function SubCreate() {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const onValuesChange = (changedValues) => {
    changedValues.category
      ? setCategory(changedValues.category)
      : setName(changedValues.name);
  };

  const handleSubmit = () => {
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const subCategoryForm = () => (
    <Form
      name="subCategoryForm"
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
          <Title level={3}>Add a new Sub Category</Title>
        )}
      </Form.Item>

      <Form.Item
        label="Parent Category"
        name="category"
        wrapperCol={{
          sm: {
            span: 16,
            offset: 8,
          },
          xs: { span: 24, offset: 0 },
        }}
        rules={[
          { required: true, message: "Please select a parent category!" },
        ]}
      >
        <Select defaultValue="Please Select" style={{ width: 210 }}>
          {categories.length > 0 &&
            categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          { type: "string" },
          {
            required: true,
            message: "Please input a valid sub category name!",
          },
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

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
          {subCategoryForm()}
          <Input
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
            dataSource={subs.filter(searched(keyword))}
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

export default SubCreate;
