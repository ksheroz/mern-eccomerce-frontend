import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

function RatingModal({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let { slug } = useParams();

  let history = useHistory();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <Button type="link" style={{ color: "orange" }} onClick={handleModal}>
        <StarOutlined /> <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </Button>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review. Happy shopping!");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
}

export default RatingModal;
