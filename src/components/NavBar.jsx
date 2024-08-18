import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ThemeContext from "../context/ThemeContext";
import PropTypes from "prop-types";

const NavBar = () => {
  const { theme, settheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    settheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Navbar bg={theme} data-bs-theme={theme}>
        <Container>
          <Navbar.Brand href="/">Taxify</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {theme === "light" ? (
              <i className="fa-regular fa-sun" onClick={toggleTheme}></i>
            ) : (
              <i
                className="fa-regular fa-moon"
                style={{ color: "#ffffff" }}
                onClick={toggleTheme}
              ></i>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
