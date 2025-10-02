import express, { Request, Response } from 'express';
import axios from 'axios';

export const aiRouter = express.Router();

// Types
interface TextGenerationRequest {
  level: 'Elementary' | 'Pre-Intermediate' | 'Intermediate' | 'Upper-Intermediate' | 'Advanced';
  apiToken: string;
}

interface AIResponse {
  success: boolean;
  text?: string;
  message?: string;
  error?: string;
}

// Validate AI token endpoint
aiRouter.post('/validate-token', async (req: Request, res: Response<AIResponse>) => {
  try {
    const { apiToken } = req.body;
    
    if (!apiToken) {
      return res.status(400).json({
        success: false,
        error: 'API token is required'
      });
    }

    // Here you would validate the token with your AI provider (OpenAI, etc.)
    // For now, we'll just return a success response with the welcome message
    return res.json({
      success: true,
      message: 'Hello! I am your personal English teacher. I am ready to help you learn. Please select your proficiency level to begin.'
    });
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to validate token'
    });
  }
});

// Generate text based on proficiency level
aiRouter.post('/generate-text', async (req: Request, res: Response<AIResponse>) => {
  try {
    const { level, apiToken }: TextGenerationRequest = req.body;
    
    if (!level || !apiToken) {
      return res.status(400).json({
        success: false,
        error: 'Level and API token are required'
      });
    }

    // Sample texts for different levels (in production, this would use AI API)
    const sampleTexts: Record<string, string> = {
      'Elementary': 'The sun is bright today. Mary walks to school every morning. She carries a red bag and wears blue shoes. Her friend Tom waits for her at the gate. They walk together and talk about their homework.',
      'Pre-Intermediate': 'Last weekend, Sarah decided to visit the local museum. She had never been there before, even though she lived in the city for two years. The museum was full of interesting paintings and sculptures. She spent three hours looking at the exhibitions and learned many new things about art history.',
      'Intermediate': 'Climate change has become one of the most pressing issues of our time. Scientists around the world are working together to find solutions that could help reduce carbon emissions. Many countries have already started implementing renewable energy sources such as solar and wind power to decrease their dependence on fossil fuels.',
      'Upper-Intermediate': 'The rapid advancement of artificial intelligence has sparked numerous debates about its potential impact on society. While proponents argue that AI could revolutionize healthcare, education, and transportation, critics express concerns about job displacement and the ethical implications of autonomous decision-making systems.',
      'Advanced': 'The philosophical implications of quantum mechanics continue to perplex even the most brilliant minds in physics. The notion that particles can exist in multiple states simultaneously until observed challenges our fundamental understanding of reality and raises profound questions about the nature of consciousness and the role of the observer in shaping physical phenomena.'
    };

    const generatedText = sampleTexts[level] || sampleTexts['Intermediate'];

    return res.json({
      success: true,
      text: generatedText
    });
  } catch (error) {
    console.error('Text generation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate text'
    });
  }
});