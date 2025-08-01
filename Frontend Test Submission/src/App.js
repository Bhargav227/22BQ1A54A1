import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Log } from '../../LoggingMiddleware/loggingMiddleware';

function App() {
  const [url, setUrl] = useState('');
  const handleSubmit = async () => {
    await Log("frontend", "info", "UI", `User submitted URL: ${url}`, "YOUR_TOKEN_HERE");
    alert('URL submitted');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <TextField label="Enter URL" fullWidth margin="normal" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
    </Container>
  );
}

export default App;
