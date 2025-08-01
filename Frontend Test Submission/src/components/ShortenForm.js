import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Tooltip,
  Paper,
  Snackbar,
  useTheme,
  alpha,
  Box,
  Fade,
  Slide
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generateShortCode, isValidURL } from "../utils/helpers";
import { saveShortLink } from "../data/store";
import { logEvent } from "../utils/logger";

// For best results, add this to your public/index.html:
// <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Roboto:wght@400;500&display=swap" rel="stylesheet">

export default function ShortenForm({ onShortened }) {
  const [forms, setForms] = useState([{ url: "", code: "", validity: "" }]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [shortLinks, setShortLinks] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const theme = useTheme();

  const handleChange = (index, key, value) => {
    const updated = [...forms];
    updated[index][key] = value;
    setForms(updated);
  };

  const handleAdd = () => {
    if (forms.length < 5) {
      setForms([...forms, { url: "", code: "", validity: "" }]);
    }
  };

  const handleShorten = () => {
    const results = [];
    for (const form of forms) {
      const { url, code, validity } = form;
      if (!isValidURL(url)) {
        setSnackbar({ open: true, message: "Invalid URL: " + url });
        return;
      }
      const shortCode = code || generateShortCode();
      const minutes = parseInt(validity || "30");
      const expiry = new Date(Date.now() + minutes * 60000).toISOString();
      const entry = {
        originalUrl: url,
        shortCode,
        createdAt: new Date().toISOString(),
        expiry,
        clicks: 0,
        details: []
      };
      saveShortLink(entry);
      logEvent("SHORTENED", entry);
      results.push(entry);
    }
    setShortLinks(results);
    setShowResults(true);
    onShortened(results);
    setSnackbar({ open: true, message: "Shortened successfully!" });
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  // Animated background shapes
  const AnimatedBackground = () => (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        top: 0,
        left: 0,
        overflow: "hidden",
        pointerEvents: "none"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)",
          filter: "blur(80px)",
          opacity: 0.5,
          top: -100,
          left: -100,
          animation: "float1 12s ease-in-out infinite alternate"
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
          filter: "blur(80px)",
          opacity: 0.4,
          bottom: -80,
          right: -80,
          animation: "float2 14s ease-in-out infinite alternate"
        }}
      />
      <style>
        {`
          @keyframes float1 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(40px) scale(1.1);}
          }
          @keyframes float2 {
            0% { transform: translateY(0) scale(1);}
            100% { transform: translateY(-30px) scale(1.05);}
          }
        `}
      </style>
    </Box>
  );

  // Always use localhost:3000 for short links
  const shortLinkBase = "http://localhost:3000/";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        fontFamily: "'Montserrat', 'Roboto', sans-serif",
        background: theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
          : "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
      }}
    >
      <AnimatedBackground />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
      >
        <Grid item xs={12} md={10} lg={7}>
          {/* Hero Section */}
          <Fade in timeout={1200}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  color: theme.palette.mode === "dark" ? "#fff" : "#222",
                  mb: 1,
                  fontFamily: "'Montserrat', 'Roboto', sans-serif",
                  textShadow: "0 4px 32px rgba(0,0,0,0.08)"
                }}
              >
                ✨ Shorten URLs in Style
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.mode === "dark" ? "#b2b2b2" : "#555",
                  fontWeight: 500,
                  mb: 2,
                  fontFamily: "'Roboto', sans-serif"
                }}
              >
                Modern, Fast, and Beautiful URL Shortener
              </Typography>
            </Box>
          </Fade>
          {/* Glassmorphic Form Card */}
          <Slide in direction="up" timeout={900}>
            <Paper
              elevation={24}
              sx={{
                p: { xs: 2, md: 5 },
                mx: "auto",
                maxWidth: "700px",
                background: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.18 : 0.7),
                backdropFilter: "blur(18px)",
                borderRadius: "32px",
                boxShadow: "0 12px 48px 0 rgba(0,0,0,0.18)",
                transition: "background 0.3s",
                border: `1.5px solid ${alpha(theme.palette.primary.main, 0.18)}`
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: theme.palette.mode === "dark" ? "#fff" : "#222",
                  fontFamily: "'Montserrat', 'Roboto', sans-serif"
                }}
              >
                Create Your Short Link
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.mode === "dark" ? "#bbb" : "#555",
                  mb: 2,
                  fontFamily: "'Roboto', sans-serif"
                }}
              >
                Shorten up to 5 URLs with custom codes and expiry.
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {forms.map((form, i) => (
                <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Long URL"
                      value={form.url}
                      onChange={(e) => handleChange(i, "url", e.target.value)}
                      sx={{
                        backgroundColor: alpha(theme.palette.background.default, 0.95),
                        borderRadius: 2,
                        transition: "box-shadow 0.2s, background 0.2s",
                        "& .MuiInputBase-root": {
                          fontWeight: 500,
                          fontFamily: "'Roboto', sans-serif"
                        },
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.primary.light, 0.18),
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <TextField
                      fullWidth
                      label="Validity (min)"
                      value={form.validity}
                      onChange={(e) => handleChange(i, "validity", e.target.value)}
                      sx={{
                        backgroundColor: alpha(theme.palette.background.default, 0.95),
                        borderRadius: 2,
                        transition: "box-shadow 0.2s, background 0.2s",
                        "& .MuiInputBase-root": {
                          fontWeight: 500,
                          fontFamily: "'Roboto', sans-serif"
                        },
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.primary.light, 0.18),
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <TextField
                      fullWidth
                      label="Custom Code"
                      value={form.code}
                      onChange={(e) => handleChange(i, "code", e.target.value)}
                      sx={{
                        backgroundColor: alpha(theme.palette.background.default, 0.95),
                        borderRadius: 2,
                        transition: "box-shadow 0.2s, background 0.2s",
                        "& .MuiInputBase-root": {
                          fontWeight: 500,
                          fontFamily: "'Roboto', sans-serif"
                        },
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.primary.light, 0.18),
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item>
                  <Tooltip title="Add another URL input">
                    <span>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                        disabled={forms.length >= 5}
                        sx={{
                          borderRadius: 3,
                          fontWeight: "bold",
                          px: 3,
                          py: 1,
                          fontFamily: "'Montserrat', 'Roboto', sans-serif",
                          background: "rgba(255,255,255,0.08)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                          transition: "background 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            background: alpha(theme.palette.primary.main, 0.12),
                            boxShadow: "0 2px 12px rgba(0,0,0,0.10)"
                          }
                        }}
                      >
                        Add
                      </Button>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    onClick={handleShorten}
                    sx={{
                      borderRadius: 3,
                      fontWeight: "bold",
                      px: 3,
                      py: 1,
                      fontFamily: "'Montserrat', 'Roboto', sans-serif",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      color: "#fff",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                      transition: "background 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.18)"
                      }
                    }}
                  >
                    Shorten All
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Slide>
          {/* Shortened Links */}
          {showResults && shortLinks.length > 0 && (
            <Slide in direction="up" timeout={800}>
              <Paper
                elevation={16}
                sx={{
                  mt: 5,
                  p: { xs: 2, md: 4 },
                  background: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.22 : 0.8),
                  backdropFilter: "blur(12px)",
                  borderRadius: 4,
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  border: `1.5px solid ${alpha(theme.palette.primary.main, 0.12)}`
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", fontFamily: "'Montserrat', 'Roboto', sans-serif" }}>
                  Your Shortened Links
                </Typography>
                <Grid container spacing={2}>
                  {shortLinks.map((link, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Fade in timeout={600 + idx * 200}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: alpha(theme.palette.background.default, 0.7),
                            borderRadius: 3,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            transition: "box-shadow 0.2s, background 0.2s",
                            "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.16)", background: alpha(theme.palette.primary.light, 0.10) }
                          }}
                        >
                          <Typography
                            sx={{
                              wordBreak: "break-all",
                              color: theme.palette.mode === "dark" ? "#fff" : "#222",
                              fontWeight: 600,
                              fontFamily: "'Roboto', sans-serif"
                            }}
                          >
                            {shortLinkBase + link.shortCode}
                          </Typography>
                          <Tooltip title="Copy to clipboard">
                            <Button
                              onClick={() => handleCopy(shortLinkBase + link.shortCode)}
                              sx={{
                                ml: 2,
                                minWidth: 0,
                                color: theme.palette.primary.main,
                                borderRadius: 2,
                                "&:hover": { background: alpha(theme.palette.primary.main, 0.08) }
                              }}
                            >
                              <ContentCopyIcon />
                            </Button>
                          </Tooltip>
                        </Paper>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Slide>
          )}
          {/* Snackbar for toasts */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            message={snackbar.message}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}