import { Card, CardContent, Typography } from "@mui/material";

export default function URLList({ links }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6">Shortened URLs</Typography>
        {links.map((link, i) => (
          <div key={i} style={{ marginBottom: "20px" }}>
            <Typography>
              <strong>Original:</strong> {link.originalUrl}
            </Typography>
            <Typography>
              <strong>Short:</strong>{" "}
              <a href={`/${link.shortCode}`} target="_blank" rel="noreferrer">
                http://localhost:3000/{link.shortCode}
              </a>
            </Typography>
            <Typography>
              <strong>Expires:</strong> {link.expiry}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
