import { action } from "./_generated/server";
import { v } from "convex/values";
export const generateStory = action({
    args: { childName: v.string(), age: v.number(), interests: v.string(), theme: v.optional(v.string()) },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are BedtimeStory, a magical storyteller for children. Create enchanting personalized bedtime stories that are age-appropriate, heartwarming, and imaginative. Include the child's name as the main character. Output JSON:
{"title":"<creative title>","story":"<full story with paragraphs separated by \\n\\n>","moral":"<optional moral/lesson>"}` },
                    { role: "user", content: `Child's name: ${args.childName}, Age: ${args.age}, Interests: ${args.interests}${args.theme ? `, Theme: ${args.theme}` : ''}` },
                ], temperature: 0.85, max_tokens: 3000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
