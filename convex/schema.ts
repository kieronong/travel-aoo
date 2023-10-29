import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...


  attractions: defineTable({
    category: v.string(),
    city: v.string(),
    description: v.string(),
    latitude: v.float64(),
    longitude: v.float64(),
    name: v.string(),
    price_point: v.float64(),
    photo_url:v.string(),
    rating: v.float64(),
  })

});