import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategories, getCategorySubs } from "../../functions/category";
import {
  createProduct,
  getAllBrands,
  getAllColors,
  addColor,
  updateProduct,
} from "../../functions/product";
import {
  Form,
  Input,
  Space,
  Select,
  Divider,
  Button,
  InputNumber,
  Typography,
} from "antd";
import FileUpload from "./FileUpload";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import FormItem from "antd/lib/form/FormItem";
import QuantityTable from "../../pages/admin/product/QuantityTable";

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

function ProductForm({ values, setValues, quantity, setQuantity }) {
  const [size, setSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [newColor, setNewColor] = useState("");
  const [available, setAvailable] = useState();
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [sizes, setSizes] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  // destructure
  const {
    articleNo,
    title,
    description,
    price,
    discount,
    category,
    subs,
    images,
    brand,
    categories,
  } = values;

  // redux
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  useEffect(() => {
    getAllBrands()
      .then((res) => {
        setBrands(res.data);
      })
      .catch();
    getAllColors()
      .then((res) => {
        setColors(res.data);
      })
      .catch();
  }, []);

  useEffect(() => {
    console.log(selectedColor);
    console.log(colors);
  }, [selectedColor, colors]);

  useEffect(() => {
    // loadCategories();
    // handleParentCategory(category);
    values.slug &&
      form.setFieldsValue({
        title,
        articleNo,
        description,
        brand,
        price,
        discount: values.discountedPrice.discount
          ? values.discountedPrice.discount
          : 0,
        category: setCategoryValue(),
        subCategories: setSubCategoriesValue(),
      });
  }, [values.slug]);

  const setCategoryValue = () => {
    loadCategories();
    return category._id;
  };

  const setSubCategoriesValue = () => {
    console.log(category);
    getCategorySubs(category._id).then((res) => {
      console.log(res.data);
      setSubCategoriesOptions(res.data);
    });
    const subsArray = values.subs.map((sub) => sub._id);
    return subsArray;
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log(c);
      setValues({ ...values, categories: c.data });
    });

  const handleSubmit = () => {
    if (values.slug) {
      updateProduct(
        values.slug,
        {
          title,
          articleNo,
          description,
          brand,
          price,
          discountPrice: discount,
          quantity: quantity.map(({ color, key, ...keepAttrs }) => keepAttrs),
          category,
          subs,
          images,
        },
        user.token
      )
        .then((res) => {
          console.log(res);
          window.alert(`"${res.data.title}" is created`);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
    createProduct(
      {
        title,
        articleNo,
        description,
        brand,
        price,
        discount,
        quantity: quantity.map(({ color, key, ...keepAttrs }) => keepAttrs),
        category,
        subs,
        images,
      },
      user.token
    )
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const onValuesChange = (changedValues) => {
    changedValues.title
      ? setValues({ ...values, title: changedValues.title })
      : changedValues.articleNo
      ? setValues({ ...values, articleNo: changedValues.articleNo })
      : changedValues.description
      ? setValues({ ...values, description: changedValues.description })
      : changedValues.brand
      ? setValues({ ...values, brand: changedValues.brand })
      : changedValues.price
      ? setValues({ ...values, price: changedValues.price })
      : changedValues.category
      ? handleParentCategory(changedValues.category)
      : changedValues.discount
      ? setValues({ ...values, discount: changedValues.discount })
      : setValues({ ...values, subs: changedValues.subCategories });
  };

  const handleParentCategory = (parentCategory) => {
    setValues({ ...values, category: parentCategory });
    getCategorySubs(parentCategory).then((res) => {
      setSubCategoriesOptions(res.data);
      form.setFieldsValue({ subCategories: [] });
    });
  };

  const addNewColor = async () => {
    console.log(newColor);
    addColor(newColor, user.token)
      .then((res) => {
        console.log(res);
        getAllColors().then((res) => {
          setColors(res.data);
        });
      })
      .catch();
  };

  const addAssortment = async () => {
    console.log(selectedColor);
    console.log(colors);
    setQuantity([
      ...quantity,
      {
        color: colors[selectedColor].name,
        size,
        available,
        key: quantity.length,
        color_Id: colors[selectedColor]._id,
      },
    ]);
  };

  const addBrand = () => {
    setBrands([...brands, newBrand]);
  };

  return (
    <>
      {JSON.stringify(values)}
      <Form
        name="categoryForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        onValuesChange={onValuesChange}
        form={form}
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
            <Title level={3}>Add a new Product</Title>
          )}
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
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            { type: "string" },
            { required: true, message: "Please input a valid title!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Article Number"
          name="articleNo"
          rules={[
            { type: "string" },
            { required: true, message: "Please input a valid Article Number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ type: "string" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity">
          <Input.Group>
            <Select
              placeholder="Size"
              value={size}
              onChange={(value) => setSize(value)}
            >
              {sizes &&
                sizes.length > 0 &&
                sizes.map((size) => <Option value={size}>{size}</Option>)}
            </Select>

            <Select
              style={{ width: "50%" }}
              placeholder="Color"
              value={selectedColor}
              onChange={(value) => setSelectedColor(value)}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      padding: 8,
                    }}
                  >
                    <Input
                      style={{ flex: "auto" }}
                      value={newColor}
                      onChange={(e) => {
                        setNewColor(e.target.value);
                      }}
                    />
                    <a
                      style={{
                        flex: "none",
                        padding: "8px",
                        display: "block",
                        cursor: "pointer",
                      }}
                      onClick={addNewColor}
                    >
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}
            >
              {colors &&
                colors.length > 0 &&
                colors.map((color, index) => (
                  <Option key={color._id} value={index}>
                    {color.name}
                  </Option>
                ))}
            </Select>

            <InputNumber
              placeholder="Available"
              min={1}
              value={available}
              onChange={(value) => setAvailable(value)}
            />
          </Input.Group>
          <Button
            type="primary"
            danger
            onClick={addAssortment}
            icon={<PlusOutlined />}
            block
            style={{ marginTop: "0.75em" }}
          >
            Add
          </Button>
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please select a valid brand!" }]}
        >
          <Select
            // style={{ width: 240 }}
            placeholder="Brand"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div
                  style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}
                >
                  <Input
                    style={{ flex: "auto" }}
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                  />
                  <a
                    style={{
                      flex: "none",
                      padding: "8px",
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={addBrand}
                  >
                    <PlusOutlined /> Add item
                  </a>
                </div>
              </div>
            )}
          >
            {brands &&
              brands.length > 0 &&
              brands.map((brand) => <Option key={brand}>{brand}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { type: "number" },
            { required: true, message: "Please input a valid price!" },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item
          label="Discount"
          name="discount"
          rules={[{ type: "number", max: 100, min: 0 }]}
        >
          <InputNumber />
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
          {price && discount && (
            <span>{`Discounted price: ${Math.round(
              price * ((100 - discount) / 100)
            )}`}</span>
          )}
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[
            { required: true, message: "Please select a valid category!" },
          ]}
        >
          <Select placeholder="Please Select">
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <Option value={category._id}>{category.name}</Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Sub Categories"
          name="subCategories"
          rules={[
            {
              required: true,
              message: "Please select a valid Sub Categories!",
            },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            {subCategoriesOptions &&
              subCategoriesOptions.length &&
              subCategoriesOptions.map((sub) => (
                <Option key={sub._id} value={sub._id}>
                  {sub.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <FormItem
          wrapperCol={{
            sm: {
              span: 16,
              offset: 8,
            },
            xs: { span: 24, offset: 0 },
          }}
        >
          <QuantityTable quantity={quantity} setQuantity={setQuantity} />
        </FormItem>
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
    </>
  );
}

export default ProductForm;
