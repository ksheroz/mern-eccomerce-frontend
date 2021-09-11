import React from "react";
import { Breadcrumb, Card, Carousel, Col, Divider, Row } from "antd";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

function Home() {
  const contentStyle = {
    width: "100%",
    height: "85vh",
    objectFit: "cover",
  };
  return (
    <>
      <Carousel autoplay>
        <div>
          <img
            src="https://res.cloudinary.com/mern-eccomerce/image/upload/v1630853439/revolt-164_6wVEHfI-unsplash_idsmjy.jpg"
            style={contentStyle}
          ></img>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/mern-eccomerce/image/upload/v1630853430/daniel-storek-JM-qKEd1GMI-unsplash_czpuvk.jpg"
            style={contentStyle}
          ></img>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/mern-eccomerce/image/upload/v1630853432/riyan-ong-j1PxAa2U-T4-unsplash_y1nusw.jpg"
            style={contentStyle}
          ></img>
        </div>
      </Carousel>
      <Divider style={{ fontSize: "1.5rem", fontWeight: "700" }}>
        EVERYTHING UNDER
      </Divider>
      <Row justify="center">
        <Col>
          {" "}
          <div
            style={{
              backgroundColor: "#d1110f",
              width: "307.25px",
              height: "66px",
              color: "white",
              fontSize: "30px",
              borderRadius: "10px",
              textAlign: "center",
              padding: "15px 0px",
              boxShadow: "0 8px 6px -6px black",
              margin: "0.5em",
            }}
          >
            RS. 999
          </div>
          <div
            style={{
              backgroundColor: "#d1110f",
              width: "307.25px",
              height: "66px",
              color: "white",
              fontSize: "30px",
              borderRadius: "10px",
              textAlign: "center",
              padding: "15px 0px",
              boxShadow: "0 8px 6px -6px black",
              margin: "0.5em",
            }}
          >
            RS. 1499
          </div>
          <div
            style={{
              backgroundColor: "#d1110f",
              width: "307.25px",
              height: "66px",
              color: "white",
              fontSize: "30px",
              borderRadius: "10px",
              textAlign: "center",
              padding: "15px 0px",
              boxShadow: "0 8px 6px -6px black",
              margin: "0.5em",
            }}
          >
            RS. 1999
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <NewArrivals />
        </Col>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <BestSellers />
        </Col>

        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Divider style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            CATEGORIES
          </Divider>
          <CategoryList />
        </Col>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
          <Divider style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            SUB CATEGORIES
          </Divider>
          <SubList />
        </Col>
      </Row>
    </>
  );
}

export default Home;
