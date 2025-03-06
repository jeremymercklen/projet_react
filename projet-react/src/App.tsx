import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { darkThemeOptions, lightThemeOptions } from "./ui/theme"
import { useSelector } from "react-redux"

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

function App() {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode)

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
