import {
  Card,
  CardContent,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from "@mui/material";
import { getAllShortLinks } from "../data/store";

export default function StatsPage() {
  const allLinks = getAllShortLinks();
  const data = Object.values(allLinks);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5">Statistics</Typography>
        {data.length === 0 && (
          <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
            No shortened URLs found.
          </Typography>
        )}
        {data.map((item, i) => (
          <div key={i} style={{ marginTop: 16 }}>
            <Typography>
              <strong>Short URL:</strong>{" "}
              <a href={`http://localhost:3000/${item.shortCode}`} target="_blank" rel="noopener noreferrer">
                http://localhost:3000/{item.shortCode}
              </a>
            </Typography>
            <Typography>
              <strong>Created:</strong> {item.createdAt}
            </Typography>
            <Typography>
              <strong>Expiry:</strong> {item.expiry}
            </Typography>
            <Typography>
              <strong>Total Clicks:</strong> {item.clicks || 0}
            </Typography>
            <Table sx={{ mt: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(item.details || []).map((d, j) => (
                  <TableRow key={j}>
                    <TableCell>{d.timestamp}</TableCell>
                    <TableCell>{d.source}</TableCell>
                    <TableCell>{d.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
