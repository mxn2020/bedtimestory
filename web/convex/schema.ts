import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
export default defineSchema({
  ...authTables,
  stories: defineTable({
    childName: v.string(), age: v.number(), interests: v.string(), theme: v.optional(v.string()),
    title: v.string(), story: v.string(), moral: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
