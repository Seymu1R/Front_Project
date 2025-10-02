import React, { useState } from 'react';
import { useApp, actions } from '../context/AppContext';
import { dictionaryService } from '../services/api';
import WordDefinitionModal from './WordDefinitionModal';

interface InteractiveTextProps {
  text: string;
}

const InteractiveText: React.FC<InteractiveTextProps> = ({ text }) => {
  const { dispatch } = useApp();
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to clean word of punctuation for dictionary lookup
  const cleanWord = (word: string): string => {
    return word.replace(/[.,!?;:"'()[\]{}\-]/g, '').toLowerCase();
  };

  // Function to handle word click
  const handleWordClick = (word: string) => {
    const cleanedWord = cleanWord(word);
    if (cleanedWord.length > 0) {
      setSelectedWord(cleanedWord);
      setIsModalOpen(true);
    }
  };

  // Function to save word to dictionary
  const handleSaveWord = async (english: string, translation: string) => {
    try {
      dispatch(actions.setLoading(true));
      const newWord = await dictionaryService.addWord(english, translation);
      dispatch(actions.addWord(newWord));
      setIsModalOpen(false);
      setSelectedWord(null);
    } catch (error) {
      console.error('Error saving word:', error);
      dispatch(actions.setError('Failed to save word to dictionary'));
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  // Function to split text into clickable words
  const renderInteractiveText = () => {
    // Split by spaces but preserve the spaces and punctuation
    const words = text.split(/(\s+)/);
    
    return words.map((segment, index) => {
      // If it's just whitespace, render as is
      if (/^\s+$/.test(segment)) {
        return <span key={index}>{segment}</span>;
      }

      // If it contains letters, make it clickable
      if (/[a-zA-Z]/.test(segment)) {
        return (
          <span
            key={index}
            className="text-clickable inline-block"
            onClick={() => handleWordClick(segment)}
            title={`Click to add "${cleanWord(segment)}" to your dictionary`}
          >
            {segment}
          </span>
        );
      }

      // For punctuation or other characters, render as is
      return <span key={index}>{segment}</span>;
    });
  };

  return (
    <>
      <div className="text-lg leading-relaxed text-gray-800 select-none">
        {renderInteractiveText()}
      </div>

      <WordDefinitionModal
        isOpen={isModalOpen}
        word={selectedWord || ''}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedWord(null);
        }}
        onSave={handleSaveWord}
      />
    </>
  );
};

export default InteractiveText;