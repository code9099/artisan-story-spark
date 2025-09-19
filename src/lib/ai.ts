// Google AI Cloud integration for content generation
export class AIContentGenerator {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Generate craft story using Google AI
  async generateCraftStory(artisanInfo: any, craftDetails: any): Promise<string> {
    const prompt = `Create an engaging story about this craft: ${craftDetails.name} by ${artisanInfo.name} from ${artisanInfo.location}. 
    Include cultural background, traditional techniques, and the artisan's journey. Make it inspiring and educational.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating craft story:', error);
      return "This beautiful craft tells a story of tradition and skill passed down through generations...";
    }
  }

  // Generate marketing content
  async generateMarketingContent(craftInfo: any): Promise<{
    hashtags: string[];
    description: string;
    songSuggestion: string;
  }> {
    const prompt = `Generate marketing content for this craft: ${craftInfo.name} by ${craftInfo.artisan}. 
    Create catchy hashtags, a compelling description, and suggest a trending song that matches the craft's vibe.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const content = data.candidates[0].content.parts[0].text;
      
      // Parse the AI response to extract hashtags, description, and song
      const hashtags = content.match(/#\w+/g) || ['#handmade', '#artisan', '#craft'];
      const description = content.split('\n')[0] || 'Beautiful handcrafted item';
      const songSuggestion = content.match(/song:.*/i)?.[0] || 'Traditional folk music';

      return { hashtags, description, songSuggestion };
    } catch (error) {
      console.error('Error generating marketing content:', error);
      return {
        hashtags: ['#handmade', '#artisan', '#craft'],
        description: 'Beautiful handcrafted item',
        songSuggestion: 'Traditional folk music'
      };
    }
  }

  // Generate tutorial content
  async generateTutorialContent(craftType: string): Promise<string> {
    const prompt = `Create a step-by-step tutorial for making ${craftType}. Include traditional techniques, materials needed, and cultural significance.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating tutorial:', error);
      return "Learn the traditional art of crafting...";
    }
  }
}

// Initialize AI content generator
export const aiGenerator = new AIContentGenerator(process.env.REACT_APP_GOOGLE_AI_API_KEY || '');
