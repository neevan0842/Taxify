import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ThemeContext from "../context/theme/ThemeContext";

const NavBar = () => {
  const { theme, settheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    settheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Taxify</Navbar.Brand>
          {theme === "light" ? (
            <i className="fa-regular fa-sun" onClick={toggleTheme}></i>
          ) : (
            <i className="fa-regular fa-moon" onClick={toggleTheme}></i>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
