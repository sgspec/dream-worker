export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const dream = url.searchParams.get("dream") || "ฝันเห็นงู";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + env.GEMINI_KEY,
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

        const data = await res.json();

    // ดึงเฉพาะข้อความคำทำนายออกมาจากโครงสร้างของ Gemini 1.5
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "เกิดข้อผิดพลาด: AI ไม่ตอบกลับหรือคีย์ผิด";

    return new Response(result, {     
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    });
