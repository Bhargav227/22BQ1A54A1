import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShortenForm from "./components/ShortenForm";
import URLList from "./components/URLList";
import StatsPage from "./components/StatsPage";
import RedirectHandler from "./routes/RedirectHandler";
import { useState } from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";

function App() {
  const [shortened, setShortened] = useState([]);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Shorten
          </Button>
          <Button color="inherit" component={Link} to="/stats">
            Stats
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ShortenForm onShortened={setShortened} />
                <URLList links={shortened} />
              </>
            }
          />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:code" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
