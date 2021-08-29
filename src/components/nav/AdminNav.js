import {
  DashboardOutlined,
  KeyOutlined,
  PlusOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <>
      <Menu theme="dark" mode="vertical">
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<ShopOutlined />}>
          <Link to="/admin/products" className="nav-link">
            All Products
          </Link>
        </Menu.Item>
        <Menu.Item key="addProduct" icon={<PlusOutlined />}>
          <Link to="/admin/product" className="nav-link">
            Add a new Product
          </Link>
        </Menu.Item>

        <Menu.Item key="addCategory" icon={<PlusOutlined />}>
          <Link to="/admin/category" className="nav-link">
            Add a new Category
          </Link>
        </Menu.Item>
        <Menu.Item key="addSubCategory" icon={<PlusOutlined />}>
          <Link to="/admin/sub" className="nav-link">
            Add a new Sub Category
          </Link>
        </Menu.Item>
        <Menu.Item key="addCoupon" icon={<PlusOutlined />}>
          <Link to="/admin/coupon" className="nav-link">
            Add a new Coupon
          </Link>
        </Menu.Item>
        <Menu.Item key="password" icon={<KeyOutlined />}>
          <Link to="/user/password" className="nav-link">
            Update Password
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default AdminNav;
