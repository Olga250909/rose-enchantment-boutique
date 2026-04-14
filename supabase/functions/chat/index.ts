import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, products } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const catalogText = (products || [])
      .map((p: any) => `• ${p.name} — ${p.price} ₽, ${p.roses} роз, ${p.category}, ${p.inStock ? "в наличии" : "нет в наличии"}. ${p.description}`)
      .join("\n");

    const systemPrompt = `Ты — Алиса, консультант премиального цветочного бренда «Магия Роз».

Вот наш каталог:
${catalogText}

Твои задачи:
1. Помогать клиенту выбрать букет из каталога или собрать индивидуальный из представленных цветов.
2. Считать стоимость и озвучивать итог.
3. Когда клиент готов — оформить заказ: спросить имя, телефон, адрес доставки, удобное время.
4. Отвечать кратко, дружелюбно и с профессиональным знанием флористики.
5. Если не можешь помочь или клиент просит связаться с живым оператором — скажи что передаёшь запрос оператору.
6. Никогда не выдумывай товары, которых нет в каталоге.
7. Доставка: бесплатно от 15000 ₽, иначе 1500 ₽. Время доставки 2-3 часа, с 8:00 до 22:00.
8. Телефон для связи: +7(921) 314-74-08.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов, попробуйте позже." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Сервис временно недоступен." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Ошибка AI сервиса" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
