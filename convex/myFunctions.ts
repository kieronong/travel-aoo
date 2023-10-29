import { action, mutation, internalQuery, query } from "./_generated/server";
import { internal, api } from "./_generated/api";
import { v } from "convex/values";
import { Doc } from "../convex/_generated/dataModel";

type AttractionRow = {
  category: string;
  city: string;
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  price_point: number;
  photo_url: string;
  rating: number;
};


export const get_attractions = query({
    args:{city:v.string(),price_high:v.float64(), price_low:v.float64()},
    handler: async (ctx,args) => {
      const places = await ctx.db
      .query("attractions")
      .filter((q) => q.eq(q.field("city"), args.city))
      .filter((q) => q.eq(q.field("category"), 'tourist_attraction'))
      .filter((q) => q.lte(q.field("price_point"), args.price_high))
      .filter((q) => q.gte(q.field("price_point"), args.price_low))
      .collect();

      const food = await ctx.db
      .query("attractions")
      .filter((q) => q.eq(q.field("city"), args.city))
      .filter((q) => q.eq(q.field("category"), 'restaurant'))
      .filter((q) => q.lte(q.field("price_point"), args.price_high))
      .filter((q) => q.gte(q.field("price_point"), args.price_low))
      .collect();
      // do something with `tasks`aa
      const data = []
      
      for(let i = 0; i<Math.min(food.length,places.length);i++){
        data.push(food[i])
        data.push(places[i])

      }
      return data
    },
  });

export const get_names_and_descriptions = action({
  args: {
    location: v.string(),
    price_high: v.float64(),
    price_low: v.float64(),
  },
  handler: async (ctx, args) => {
    // Call the `get_attractions` function.
    const attractions: AttractionRow[] = await ctx.runQuery(api.myFunctions.get_attractions, {
      city: args.location,
      price_high: args.price_high,
      price_low: args.price_low,
    });

    // Extract the name and description from the results and format them.
    const formattedResults = attractions.map(attraction => `${attraction.name}: ${attraction.description}`);
    
    return formattedResults;
  },
});

export const get_location = query({
  args:{name: v.string()},
  handler: async (ctx,args) => {
    const places = await ctx.db
    .query("attractions")
    .filter((q) => q.eq(q.field("name"), args.name))
    .collect();
    return places
  },
});


  export const generate_itinerary = action({
    args: {
      liked: v.array(v.string()),
      disliked: v.array(v.string()),
      city: v.string(),
      price_low: v.float64(),
      price_high: v.float64(),
      days: v.number(),
    },
    handler: async (ctx, args) => {
      console.log("start")
      console.log(args)
      // Step 1: Get names and descriptions
      const attractions = await ctx.runAction(api.myFunctions.get_names_and_descriptions, {
        location: args.city,
        price_high: args.price_high,  // adjust as necessary
        price_low: args.price_low,      // adjust as necessary
      });

      console.log(attractions)
  
      // Construct the GPT prompt string using attractions and liked/disliked locations
      let prompt = `I am planning a travel itinerary to ${args.city}. Here are the attractions:\n\n`;
      prompt += attractions.join("\n");
      prompt += `\n\nI do not want to go to:\n\n${args.disliked.slice(0, 5).join(", ")}.\n\nI do want to go to:\n\n${args.liked.slice(0, 5).join(", ")}.\n\n\n\n\n`;
      prompt += `Given this, Provide me a list of ${args.days * 3} attraction names I'd enjoy for a travel itinerary in ${args.city}, in a numbered list format.`;
      console.log(prompt)


      // Step 2: Use this prompt with GPT (this step is not provided here since the exact details depend on how you've integrated GPT with your backend)
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer 31d25c3ebfac1ae6c49d94593b59b29367100dcbe7481c0e35777f64c4f71501'
        },
        body: JSON.stringify({
          model: 'togethercomputer/llama-2-70b-chat',
          prompt: prompt,
          max_tokens: 512,
          stop: '###',
          temperature: 0,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 0
        })
      };
      let parsedResults: string[] = []; // Variable to store the parsed results
      let isParsedResultsValid = false;

      do {
        // Step 2: Use this prompt with GPT...
        await fetch('https://api.together.xyz/inference', options)
          .then(response => response.json())
          .then(data => {
            const output = data?.output?.choices[0]?.text || "";
            console.log(data)
            parsedResults = parseItineraries(output);
          })
          .catch(err => console.error(err));

        // Validation:
        if (parsedResults.length >= 1) {
          isParsedResultsValid = true;
        }
      } while (!isParsedResultsValid);
      
      let results: ItineraryItem[] = []
      console.log(parsedResults)
      results = (await ctx.runAction(api.myFunctions.get_one_itinerary, {
        names: parsedResults,
      }));

      return results;
    },
  });

  type OutputRow = {
    day: string;
    time: string;
    name: string;
    rating: number;
    photo_url: string;
    price_point: number;
    description: string;
    category: string;
  };

  type ItineraryItem = {
    name: string;
    description: string;
    imageURL: string;
    day: string;
    time: string;
    category: string;
  };

  function extractName(input: string): string {
    const match = input.match(/name:\s*"([^"]+)"/);
    return match ? match[1] : "A Grand Adventure";
}

  export const get_one_itinerary_name = action({
    args: {
      city: v.string(),
      names: v.array(v.string()),
    },
    handler: async (ctx, args) => {
      let prompt = `I am planning a travel itinerary to ${args.city}. Here's my itinerary:\n\n ${args.names.join(", ")}.\n\n}`;
      prompt += `Think of one, creative, quirky name for this itinerary, and output as a JSON in the format {name: "name"}.`;
  
      // Step 2: Use this prompt with GPT (this step is not provided here since the exact details depend on how you've integrated GPT with your backend)
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer 31d25c3ebfac1ae6c49d94593b59b29367100dcbe7481c0e35777f64c4f71501'
        },
        body: JSON.stringify({
          model: 'togethercomputer/llama-2-70b-chat',
          prompt: prompt,
          max_tokens: 48,
          stop: '###',
          temperature: 0,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 0
        })
      };

      let output: string = ""
      await fetch('https://api.together.xyz/inference', options)
        .then(response => response.json())
        .then(data => {
          output = extractName(data?.output?.choices[0]?.text || "");
        })
        .catch(err => console.error(err));

      return output
    },
  });

  export const get_one_itinerary = action({
    args: {
      names: v.array(v.string()),
    },
    handler: async (ctx, args) => {
  
      // Helper function to generate a random time from an array of possible hours
      const getRandomTime = (hours: number[]): string => {
        const randomHour = hours[Math.floor(Math.random() * hours.length)];
        return `${randomHour}:00 ${randomHour >= 12 || randomHour <= 5 ? 'PM' : 'AM'}`;
      };
  
      // Time windows for random selection
      const timeWindows = [
        () => getRandomTime([7, 8, 9]), // Morning
        () => getRandomTime([11, 12, 1]), // Midday
        () => getRandomTime([3, 4, 5])  // Afternoon
      ];
      let day = 1;
      let timeIndex = 0;
  
      const output: ItineraryItem[] = [];
  
      for (const name of args.names) {
        // This is a placeholder; replace with your actual database query method from Convex
        const attraction = await ctx.runQuery(api.myFunctions.get_location, {name: name});
  
        if (!attraction) continue;
        console.log(name, attraction)
  
        if (attraction.length === 0) continue;
        output.push({
          day: `Day ${day}`,
          time: timeWindows[timeIndex](),  // Using the random time generation function here
          name: attraction[0].name,
          imageURL: attraction[0].photo_url,
          description: attraction[0].description,
          category: attraction[0].category,
        });
  
        timeIndex++;
        if (timeIndex === timeWindows.length) {
          timeIndex = 0;
          day++;
        }
      }
  
      return output;
    },
  });
  

  function parseApiOutput(output: string): string[] {
    // Split the string by newline character to get each itinerary name
    return output.split("\n").filter(name => name.trim() !== "");
  }


function formatListOfLists(lists: string[][]): string {
    return lists.map(subList => `[${subList.join(", ")}]`).join(", ");
}

  function parseItineraries(str: string): string[] {
    // Split by the "Itinerary" keyword to separate different itineraries
    console.log(str)
    const itineraryParts = str.split('Itinerary').slice(1);

    const itineraries: string[][] = [];

    itineraryParts.forEach(part => {
        // Extract items from each itinerary part and trim them
        const items = part.split('\n')
                          .filter(line => line.trim().match(/^\d\./))
                          .map(line => line.split('. ')[1].trim());

        itineraries.push(items);
    });

    console.log(itineraries)
    return itineraries.flat();
}
  
//   export const get_location_data = action({
//       args: {
//           data: v.array(v.object),
//       },
//       handler: async (ctx, args) => {
//           const info = args.data.map((attraction) => `${attraction.name}: ${attraction.description}`);
//           return info;
//       },
//   });


// export const get_itineraries = action({
//   args: {
//     city: v.string(),
//     price: v.float64(),
//     days: v.int64(),
//     wanted_attractions: v.array(v.string()),
//     unwanted_attractions: v.array(v.string())
//   },
//   handler: async (ctx, args) => {
//     const data = await ctx.runQuery(api.myFunctions.get_attractions, { 
//         city: args.city,
//         price_high: args.price,
//         price_low: 0
//     });
//     const result: string[] = await ctx.runAction(api.myFunctions.get_location_data, { 
//         data: data
//     });
//     return result
//     // const attractions = data.map((attraction) => attraction.name);
//   },
// });