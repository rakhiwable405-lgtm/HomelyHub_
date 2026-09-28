import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 1. Generate Property Description
export const generateDescription = async (req, res) => {
  try {
    const {
      propertyName,
      extraInfo,
      propertyType,
      roomType,
      maximumGuest,
      amenities,
      price,
      address,
    } = req.body;

    const prompt = `
      You are an expert real estate copywriter for 'HomelyHub'. Write an engaging, persuasive, and professional property description based on these details:

      - Property Name: ${propertyName}
      - Property Type: ${propertyType}
      - Room Type: ${roomType}
      - Max Guests: ${maximumGuest}
      - Amenities: ${Array.isArray(amenities) ? amenities.join(", ") : amenities}
      - Price: Rs ${price} per night
      - Address/Location: ${address}
      - Extra Highlights: ${extraInfo || "N/A"}

      Respond strictly with VALID JSON in this structure:
      {
        "description": "A well-crafted, attractive description highlighting the space, location, and guest benefits."
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional copywriter that outputs only valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const parsedData = JSON.parse(
      chatCompletion.choices[0]?.message?.content || "{}"
    );

    // Matches your frontend expectation: data.data.description
    return res.status(200).json({
      success: true,
      data: {
        description: parsedData.description || "",
      },
    });
  } catch (error) {
    console.error("Groq AI Description Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate property description.",
    });
  }
};

// 2. Generate Trip Plan
export const generateTripPlan = async (req, res) => {
  try {
    const { destination, budget, days, people, interests } = req.body;

    const prompt = `
      You are an expert travel planner for 'HomelyHub'. Create a personalized ${days}-day trip itinerary for ${people} people visiting ${destination} with a total budget of Rs ${budget}.
      User Interests: ${Array.isArray(interests) ? interests.join(", ") : interests}.

      Respond strictly with VALID JSON in this structure:
      {
        "tripTitle": "A catchy title for the trip",
        "summary": "Short overview of the trip experience",
        "recommendedStayTypes": "Suggestions for HomelyHub accommodations that fit this budget and location",
        "itinerary": [
          {
            "day": 1,
            "title": "Theme or highlight of the day",
            "activities": [
              { "time": "Morning", "description": "Activity details..." },
              { "time": "Afternoon", "description": "Activity details..." },
              { "time": "Evening", "description": "Activity details..." }
            ]
          }
        ]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful travel assistant that only outputs valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const parsedPlan = JSON.parse(
      chatCompletion.choices[0]?.message?.content || "{}"
    );

    return res.status(200).json({
      success: true,
      data: parsedPlan,
    });
  } catch (error) {
    console.error("Groq AI Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate trip plan.",
    });
  }
};