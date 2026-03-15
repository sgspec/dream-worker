export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const dream = url.searchParams.get("dream") || "ฝันเห็นงู";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2-flash:generateContent?key=" + env.GEMINI_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "ทำนายฝันนี้ พร้อมเลขนำโชค: " + dream
            }]
          }]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "ไม่พบคำทำนาย";

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });

  }
};
