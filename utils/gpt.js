const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create an async function
async function GPT3_API(prompt) {
  const openai = new OpenAIApi(configuration);

  try {
    console.log('The prompt is being sent');

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a resume assistant and job placement specialist who know how to edit a resume to get your client the job.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 2000,
    });

    const response = completion.data.choices[0].message.content;
    return response;
  } catch (error) {
    console.dir(error, { depth: null });
  }
}

module.exports = GPT3_API;
