import React, { useState, useEffect } from 'react';

interface WordDefinitionModalProps {
  isOpen: boolean;
  word: string;
  onClose: () => void;
  onSave: (english: string, translation: string) => void;
}

const WordDefinitionModal: React.FC<WordDefinitionModalProps> = ({
  isOpen,
  word,
  onClose,
  onSave,
}) => {
  const [translation, setTranslation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or word changes
  useEffect(() => {
    if (isOpen) {
      setTranslation('');
    }
  }, [isOpen, word]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!translation.trim()) return;

    setIsSubmitting(true);
    try {
      await onSave(word, translation.trim());
      setTranslation('');
    } catch (error) {
      console.error('Error saving word:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTranslation('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Word to Dictionary
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              English Word
            </label>
            <div className="input bg-gray-50 text-gray-800 font-medium">
              {word}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="translation" className="block text-sm font-medium text-gray-700 mb-2">
              Translation (in your native language)
            </label>
            <input
              id="translation"
              type="text"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="input"
              placeholder="Enter the meaning or translation..."
              required
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500">
              Add the meaning of "{word}" in your native language to help you remember it.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !translation.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add to Dictionary'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WordDefinitionModal;