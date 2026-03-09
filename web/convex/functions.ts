import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const saveStory = mutation({
  args: { childName: v.string(), age: v.number(), interests: v.string(), theme: v.optional(v.string()), title: v.string(), story: v.string(), moral: v.optional(v.string()) },
  handler: async (ctx, args) => await ctx.db.insert("stories", { ...args, createdAt: Date.now() }),
});
export const getRecent = query({ args: {}, handler: async (ctx) => await ctx.db.query("stories").order("desc").take(20) });
export const getStatus = query({ args: {}, handler: async () => ({ status: "Online", timestamp: Date.now() }) });
