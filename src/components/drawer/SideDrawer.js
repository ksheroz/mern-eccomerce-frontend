import React from "react";
import { Button, Col, Drawer, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function SideDrawer() {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };

  return (
    <Drawer
      title={`Cart / ${cart.length} Product`}
      placement="right"
      closable={false}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
      style={{ textAlign: "center" }}
    >
      {cart.map((p) => (
        <Row key={p._id}>
          <Col>
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p style={{ textAlign: "center" }}>
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img
                  src="https://res.cloudinary.com/mern-eccomerce/image/upload/v1630872656/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector_dm7ask.jpg"
                  style={imageStyle}
                />
                <p style={{ textAlign: "center" }}>
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </Col>
        </Row>
      ))}

      <Link to="/cart">
        <Button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          type="primary"
          block
          style={{ textAlign: "center" }}
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  );
}

export default SideDrawer;
