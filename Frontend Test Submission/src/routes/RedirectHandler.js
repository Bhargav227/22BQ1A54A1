import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getShortLink, recordClick } from "../data/store";
import { logEvent } from "../utils/logger";

export default function RedirectHandler() {
  const { code } = useParams();

  useEffect(() => {
    const data = getShortLink(code);
    if (data) {
      const now = new Date();
      const expiry = new Date(data.expiry);
      if (now <= expiry) {
        recordClick(code);
        logEvent("REDIRECT", { code });
        window.location.href = data.originalUrl;
      } else {
        alert("Link expired.");
      }
    } else {
      alert("Invalid short link.");
    }
  }, [code]);

  return <div>Redirecting...</div>;
}
