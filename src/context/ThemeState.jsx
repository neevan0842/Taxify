import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeState = (props) => {
  const [theme, settheme] = useState("dark");
  const colors = {
    lightTheme: {
      background: "#F8F9FA",
      navbar: "#FFFFFF",
      cardBackground: "#FFFFFF",
      buttonPrimary: "#007BFF",
      buttonSecondary: "#6C757D",
      textPrimary: "#212529",
      textSecondary: "#6C757D",
    },
    darkTheme: {
      background: "#121212",
      navbar: "#1F1F1F",
      cardBackground: "#1C1C1E",
      buttonPrimary: "#1A73E8",
      buttonSecondary: "#5A6268",
      textPrimary: "#E0E0E0",
      textSecondary: "#9E9E9E",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, settheme, colors }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
