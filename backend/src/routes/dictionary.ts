import express, { Request, Response } from 'express';

export const dictionaryRouter = express.Router();

// Types
interface Word {
  id: string;
  english: string;
  translation: string;
  dateAdded: string;
}

interface AddWordRequest {
  english: string;
  translation: string;
}

interface DictionaryResponse {
  success: boolean;
  words?: Word[];
  word?: Word;
  message?: string;
  error?: string;
}

// In-memory storage (in production, use a database)
let dictionary: Word[] = [];
let nextId = 1;

// Get all words in dictionary
dictionaryRouter.get('/words', (req: Request, res: Response<DictionaryResponse>) => {
  try {
    return res.json({
      success: true,
      words: dictionary
    });
  } catch (error) {
    console.error('Get words error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve words'
    });
  }
});

// Add a new word to dictionary
dictionaryRouter.post('/words', (req: Request, res: Response<DictionaryResponse>) => {
  try {
    const { english, translation }: AddWordRequest = req.body;
    
    if (!english || !translation) {
      return res.status(400).json({
        success: false,
        error: 'Both english word and translation are required'
      });
    }

    // Check if word already exists
    const existingWord = dictionary.find(word => 
      word.english.toLowerCase() === english.toLowerCase()
    );

    if (existingWord) {
      return res.status(409).json({
        success: false,
        error: 'Word already exists in dictionary'
      });
    }

    const newWord: Word = {
      id: nextId.toString(),
      english: english.trim(),
      translation: translation.trim(),
      dateAdded: new Date().toISOString()
    };

    dictionary.push(newWord);
    nextId++;

    return res.status(201).json({
      success: true,
      word: newWord,
      message: 'Word added successfully'
    });
  } catch (error) {
    console.error('Add word error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to add word'
    });
  }
});

// Delete a word from dictionary
dictionaryRouter.delete('/words/:id', (req: Request, res: Response<DictionaryResponse>) => {
  try {
    const { id } = req.params;
    
    const wordIndex = dictionary.findIndex(word => word.id === id);
    
    if (wordIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Word not found'
      });
    }

    dictionary.splice(wordIndex, 1);

    return res.json({
      success: true,
      message: 'Word deleted successfully'
    });
  } catch (error) {
    console.error('Delete word error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete word'
    });
  }
});

// Update a word in dictionary
dictionaryRouter.put('/words/:id', (req: Request, res: Response<DictionaryResponse>) => {
  try {
    const { id } = req.params;
    const { english, translation }: AddWordRequest = req.body;
    
    if (!english || !translation) {
      return res.status(400).json({
        success: false,
        error: 'Both english word and translation are required'
      });
    }

    const wordIndex = dictionary.findIndex(word => word.id === id);
    
    if (wordIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Word not found'
      });
    }

    dictionary[wordIndex] = {
      ...dictionary[wordIndex],
      english: english.trim(),
      translation: translation.trim()
    };

    return res.json({
      success: true,
      word: dictionary[wordIndex],
      message: 'Word updated successfully'
    });
  } catch (error) {
    console.error('Update word error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update word'
    });
  }
});