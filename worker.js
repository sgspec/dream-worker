export default {
  async fetch(request) {

    const url = new URL(request.url);
    const dream = url.searchParams.get("dream");

    const API_KEY = "YOUR_GEMINI_API_KEY";

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "ทำนายฝันนี้พร้อมเลขนำโชค: " + dream
            }]
          }]
        })
      }
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
