import { v } from "convex/values"
import { query } from "./_generated/server"


export const get_attractions = query({
    args:{city:v.string(),price_high:v.float64(), price_low:v.float64()},
    handler: async (ctx,args) => {
      const places = await ctx.db
      .query("attractions")
      .filter((q) => q.eq(q.field("city"), args.city))
      .filter((q) => q.lte(q.field("price_point"), args.price_high))
      .filter((q) => q.gte(q.field("price_point"), args.price_low))
      // .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
      // do something with `tasks`
      return places
    },
  });