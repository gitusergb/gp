const axios = require("axios");

async function askAI(message, jsonData) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: message + JSON.stringify(jsonData),
          },
        ],
        model: "gpt-4",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    let aiResponse = response.data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("Empty response from AI");
    }

    // Check if "dollar" is mentioned in the message
    const mentionDollar = message.toLowerCase().includes("dollar");

    // Replace dollar amounts with rupee symbol based on context
    aiResponse = aiResponse.replace(/\$\s*(\d+(\.\d+)?)/g, (_, amount) => {
      if (!mentionDollar) {
        return `₹ ${amount}`;
      } else {
        const rupeeAmount = parseFloat(amount) * 83.51;
        return `₹ ${rupeeAmount.toFixed(2)}`;
      }
    });

    return aiResponse;
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
  }
}

module.exports = { askAI };
