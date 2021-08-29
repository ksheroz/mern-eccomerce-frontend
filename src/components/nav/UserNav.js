import { HeartOutlined, HistoryOutlined, KeyOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <>
      <Menu theme="dark" mode="vertical">
        <Menu.Item key="history" icon={<HistoryOutlined />}>
          <Link to="/user/history">History</Link>
        </Menu.Item>
        <Menu.Item key="password" icon={<KeyOutlined />}>
          <Link to="/user/password">Update Password</Link>
        </Menu.Item>
        <Menu.Item key="wishlist" icon={<HeartOutlined />}>
          <Link to="/user/wishlist">Wishlist</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default UserNav;
