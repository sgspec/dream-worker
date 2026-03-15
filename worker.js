export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // รับค่าความฝันจาก URL เช่น ?dream=ฝันเห็นทอง
    const dream = url.searchParams.get("dream") || "ฝันเห็นงู";

    // บรรทัดนี้สำคัญมาก ห้ามให้ขาดแม้แต่ตัวเดียวครับ
    const apiEndpoint = "https://generativelanguage.googleapis.com" + env.GEMINI_KEY;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents:
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        })
      });

      const data = await response.json();

      // ดึงข้อความคำทำนายออกมา
      const predictionText = 
        data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        "ขออภัย หมอดูไม่สามารถทำนายได้ในขณะนี้ กรุณาลองใหม่ครับ";

      return new Response(predictionText, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (error) {
      return new Response("เกิดข้อผิดพลาดในการเชื่อมต่อ: " + error.message, { status: 500 });
    }
  }
};
