import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeState = (props) => {
  const [theme, settheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, settheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
