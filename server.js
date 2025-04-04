import express from 'express';
import cors from 'cors';
import axios from 'axios';

console.log('Server is running');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to fetch posts and transform them into words
app.get('/api/words', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
    // Transform posts into words format
    const words = response.data.slice(0, 6).map(post => {
      const titleWords = post.title.split(' ');
      const word = titleWords[0].charAt(0).toUpperCase() + titleWords[0].slice(1);
      
      return {
        id: post.id,
        word: word,
        type: titleWords.length > 1 ? "noun" : "verb",
        definition: post.title,
        example: post.body.split('.')[0] + '.',
      };
    });
    
    res.json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.warn(`Server running on port ${PORT}`);
});