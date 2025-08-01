export async function Log(stack, level, _package, message, token) {
  try {
    const res = await fetch("http://20.244.56.144/eva1uation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: _package, message }),
    });
    if (!res.ok) {
      console.error("Failed to log:", await res.text());
    }
  } catch (err) {
    console.error("Logging error:", err);
  }
}
