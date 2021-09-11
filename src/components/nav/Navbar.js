import React, { useState } from "react";
import firebase from "firebase";
import {
  Row,
  Col,
  Typography,
  Layout,
  Menu,
  Drawer,
  Button,
  Input,
} from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

const { Search } = Input;
const { Header } = Layout;
const { Title } = Typography;

function Navbar() {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  const { search, user } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
    setVisible(false);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const openDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (value, event) => {
    history.push(`/shop?${text}`);
  };

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Header>
            <Row>
              <Col sm={4} xs={20}>
                <Title
                  level={4}
                  style={{
                    marginTop: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <Link to="/">My App</Link>
                </Title>
              </Col>
              <Col sm={10} xs={0}>
                <Search
                  placeholder="Search"
                  enterButton
                  size="middle"
                  style={{ marginTop: "15px" }}
                  value={text}
                  onSearch={handleSubmit}
                  onChange={handleChange}
                />
              </Col>
              <Col sm={{ span: 9, offset: 1 }} xs={{ span: 0, offset: 0 }}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  onClick={handleClick}
                  defaultSelectedKeys={[current]}
                  overflowedIndicator={<MenuOutlined />}
                >
                  <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key={"shop"} icon={<ShoppingOutlined />}>
                    <Link to="/shop">Shop</Link>
                  </Menu.Item>
                  <Menu.Item key={"cart"} icon={<ShoppingCartOutlined />}>
                    <Link to="/cart">Cart</Link>
                  </Menu.Item>
                  {!user && (
                    <Menu.Item key={"login"} icon={<LoginOutlined />}>
                      <Link to="/login">Login</Link>
                    </Menu.Item>
                  )}
                  {!user && (
                    <Menu.Item key={"register"} icon={<UserAddOutlined />}>
                      <Link to="/register">Register</Link>
                    </Menu.Item>
                  )}
                  {user && (
                    <SubMenu
                      icon={<SettingOutlined />}
                      title={user.email && user.email.split("@")[0]}
                    >
                      {user && user.role === "subscriber" && (
                        <Menu.Item>
                          <Link to="/user/history">Dashboard</Link>
                        </Menu.Item>
                      )}

                      {user && user.role === "admin" && (
                        <Menu.Item>
                          <Link to="/admin/dashboard">Dashboard</Link>
                        </Menu.Item>
                      )}

                      <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                        Logout
                      </Menu.Item>
                    </SubMenu>
                  )}
                </Menu>
              </Col>

              <Col sm={0} xs={4}>
                <Button
                  ghost
                  onClick={openDrawer}
                  icon={<MenuOutlined />}
                ></Button>
                <Drawer
                  title="Menu"
                  placement="left"
                  closable={true}
                  onClose={onClose}
                  visible={visible}
                  key="left"
                  // height="376"
                >
                  <Input
                    placeholder="Search"
                    bordered={false}
                    size="large"
                    style={{ marginBottom: "12px" }}
                    value={text}
                    onPressEnter={handleSubmit}
                    onChange={handleChange}
                  />
                  <Menu
                    theme="light"
                    mode="vertical"
                    onClick={handleClick}
                    defaultSelectedKeys={[current]}
                    overflowedIndicator={<MenuOutlined />}
                    style={{ border: "none" }}
                  >
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                      <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key={"shop"} icon={<ShoppingOutlined />}>
                      <Link to="/shop">Shop</Link>
                    </Menu.Item>
                    <Menu.Item key={"cart"} icon={<ShoppingCartOutlined />}>
                      <Link to="/cart">Cart</Link>
                    </Menu.Item>
                    {!user && (
                      <Menu.Item key={"login"} icon={<LoginOutlined />}>
                        <Link to="/login">Login</Link>
                      </Menu.Item>
                    )}
                    {!user && (
                      <Menu.Item key={"register"} icon={<UserAddOutlined />}>
                        <Link to="/register">Register</Link>
                      </Menu.Item>
                    )}
                    {user && (
                      <SubMenu
                        icon={<SettingOutlined />}
                        title={user.email && user.email.split("@")[0]}
                      >
                        {user && user.role === "subscriber" && (
                          <Menu.Item>
                            <Link to="/user/history">Dashboard</Link>
                          </Menu.Item>
                        )}

                        {user && user.role === "admin" && (
                          <Menu.Item>
                            <Link to="/admin/dashboard">Dashboard</Link>
                          </Menu.Item>
                        )}

                        <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                          Logout
                        </Menu.Item>
                      </SubMenu>
                    )}
                  </Menu>
                </Drawer>
              </Col>
            </Row>
          </Header>
        </Col>
      </Row>
    </>
  );
}

export default Navbar;
