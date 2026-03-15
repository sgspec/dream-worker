export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // รับค่าความฝันจาก URL เช่น ?dream=ฝันว่าถูกหวย
    const dream = url.searchParams.get("dream") || "ฝันเห็นงู";

    // เลือกใช้รุ่น gemini-1.5-flash เพื่อความเร็วและเสถียร
    const apiEndpoint = `https://generativelanguage.googleapis.com{env.GEMINI_KEY}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              // ปรับคำสั่ง (Prompt) ให้ AI ตอบเป็นระเบียบและดูขลังขึ้น
              text: `คุณคือหมอดูผู้เชี่ยวชาญการทำนายฝันและตัวเลขมงคล 
                     จงทำนายฝันเรื่อง: "${dream}" 
                     โดยให้รายละเอียดตามหัวข้อดังนี้:
                     1. คำทำนายภาพรวม (ดีหรือร้าย)
                     2. ด้านความรัก
                     3. ด้านการงานและการเงิน
                     4. เลขนำโชค (เน้นเลข 2 ตัว และ 3 ตัว)
                     
                     ตอบเป็นภาษาไทยที่สุภาพและเข้าใจง่าย`
            }]
          }],
          generationConfig: {
            temperature: 0.7, // เพิ่มความสร้างสรรค์ในการทำนาย
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
          // เพิ่ม CORS เผื่อคุณจะเอาไปใช้เรียกจากหน้าเว็บอื่น
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (error) {
      return new Response("เกิดข้อผิดพลาดในการเชื่อมต่อ: " + error.message, { status: 500 });
    }
  }
};
