import groq from "./aiClient.js";

const systemPrompt = `You are an expert travel planner for 'HomelyHub', a holiday rental platform in India.

Create a day-by-day trip plan from the details the user gives you.

Rules:
1. Give exactly one entry per day of the trip.
2. Each day needs a title and 3 activities (Morning, Afternoon, Evening).
3. Keep the plan inside the budget given and mention estimated costs in Indian Rupees (INR).
4. Match activities strictly to the interests provided.
5. Only suggest real, existing places in the destination.
6. Keep the tone friendly and helpful. Do not use emojis.

Reply strictly with ONLY this JSON structure:
{
  "tripTitle": "Catchy title for the trip",
  "summary": "Two sentences summarizing the overall trip experience.",
  "recommendedStayTypes": "Short suggestion for HomelyHub stay types for this trip",
  "itinerary": [
    {
      "day": 1,
      "title": "Short day theme",
      "activities": [
        { "time": "Morning", "description": "Activity details with estimated cost in INR" },
        { "time": "Afternoon", "description": "Activity details with estimated cost in INR" },
        { "time": "Evening", "description": "Activity details with estimated cost in INR" }
      ]
    }
  ],
  "tips": ["Short practical tip 1", "Short practical tip 2"]
}`;

const planTrip = async (trip) => {
  const interestsList = Array.isArray(trip.interests)
    ? trip.interests.join(", ")
    : trip.interests || "General sightseeing";

  const tripInfo = `- Destination: ${trip.destination}
- Total Budget: Rs ${trip.budget}
- Number of Days: ${trip.days}
- Number of People: ${trip.people}
- Interests: ${interestsList}`;

  // ⚡ Changed model to llama-3.1-8b-instant for sub-second responses
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    max_tokens: 1000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: tripInfo },
    ],
  });

  let rawContent = completion.choices[0]?.message?.content || "{}";

  // Clean markdown code fences if present
  rawContent = rawContent.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

  return JSON.parse(rawContent);
};

export { planTrip };