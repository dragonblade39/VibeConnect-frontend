import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Navbar1() {
  const navigate = useNavigate();
  return (
    <div style={{ background: "transparent" }}>
      <Navbar
        expand="xxl"
        className="home-navbar"
        style={{
          background: "linear-gradient(to right,#CC7BAC,#F5D8DC)",
          backdropFilter: "blur(12px)",
          borderRadius: "50px",
          margin: "0px 20px",
          border: "2px solid #75006f",
        }}
      >
        <Container fluid>
          <Navbar.Brand
            href="#"
            className="home-text-white"
            style={{
              fontSize: "30px",
              fontWeight: "700",
              paddingLeft: "30px",
              color: "black",
            }}
          >
            <i class="bi bi-chat-right-quote-fill"></i>
            &nbsp;&nbsp;Vibe Connect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* <Nav.Link
                href="#action1"
                className="home-text-white ms-5"
                style={{ color: "white" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className="home-text-white ms-5"
                style={{ color: "white" }}
              >
                Link
              </Nav.Link> */}
            </Nav>
            <Form className="d-flex  me-5">
              <Button
                className="home-text-white me-5  home-btn"
                style={{
                  fontWeight: "700",
                  border: "2px solid #75006f",
                  width: "100px",
                  color: "black",
                  background: "none",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Log in
              </Button>
              &nbsp;&nbsp;
              <Button
                className="home-text-white  home-btn"
                style={{
                  fontWeight: "700",
                  border: "2px solid #75006f",
                  width: "100px",
                  color: "black",
                  background: "none",
                }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
