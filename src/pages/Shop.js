import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
  getAllColors,
  getAllBrands,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio, Row, Col, Typography } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

import StarRating from "react-star-ratings";

const { Title } = Typography;
const { SubMenu } = Menu;

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [radioCheck, setRadioCheck] = useState();

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
    // fetch brands
    getAllBrands().then((res) => setBrands(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price });
  }, [price]);

  const handlePrice = (e) => {
    console.log(e.target.value);
    if (e.target.value === 100000) {
      setPrice([3000, 100000]);
    } else {
      setPrice([0, e.target.value]);
    }

    setRadioCheck(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          // className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    fetchProducts({ stars: num });
  };

  const Star = ({ starClick, numberOfStars }) => (
    <>
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </>
  );

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <StarRating
        changeRating={() => handleStarClick(5)}
        numberOfStars={5}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
      <StarRating
        changeRating={() => handleStarClick(4)}
        numberOfStars={4}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />

      <StarRating
        changeRating={() => handleStarClick(3)}
        numberOfStars={3}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />

      <StarRating
        changeRating={() => handleStarClick(2)}
        numberOfStars={2}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />

      <StarRating
        changeRating={() => handleStarClick(1)}
        numberOfStars={1}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        style={{ padding: "0.5em", margin: "0.5em", cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        // className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  return (
    <>
      <Row>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 3, offset: 0 }}>
          <Title level={4}>Search/Filter</Title>
          <hr />

          <Menu defaultOpenKeys={["1"]} mode="inline">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <Radio.Group onChange={handlePrice} value={radioCheck}>
                <Radio value={500}>Rs.499 & Under</Radio>
                <Radio value={1000}>Rs.999 & Under</Radio>
                <Radio value={1500}>Rs.1499 & Under</Radio>
                <Radio value={2000}>Rs.1999 & Under</Radio>
                <Radio value={2500}>Rs.2499 & Under</Radio>
                <Radio value={3000}>Rs.2999 & Under</Radio>
                <Radio value={100000}>Rs.3000 & Above</Radio>
              </Radio.Group>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>
          </Menu>
        </Col>

        <Col xs={{ span: 20, offset: 2 }} md={{ span: 20, offset: 0 }}>
          {loading ? (
            <Title level={4}>Loading...</Title>
          ) : (
            <Title level={4}>Products</Title>
          )}

          {products.length < 1 && <p>No products found</p>}

          <Row gutter={[16, 16]}>
            {products.map((p) => (
              <Col
                key={p._id}
                xs={{ span: 24, offset: 0 }}
                md={{ span: 6, offset: 0 }}
              >
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Shop;
