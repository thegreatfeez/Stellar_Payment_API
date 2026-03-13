export async function sendWebhook(url, payload) {
  if (!url) return { ok: false, skipped: true };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "stellar-payment-api/0.1"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return { ok: false, status: response.status, body: text };
    }

    return { ok: true, status: response.status };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
