const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function GPT3_API(prompt) {
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a resume assistant',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 2000,
    });

    const response = completion.data.choices[0].message.content;
    console.log('The prompt has been sent successfully');
    return response;
  } catch (error) {}
}

const prompt = 'create a resume for a coder';

// call the function
GPT3_API(prompt).then((response) => console.log(response));
