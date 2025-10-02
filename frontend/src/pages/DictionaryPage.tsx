import React, { useEffect, useState } from 'react';
import { useApp, actions, Word } from '../context/AppContext';
import { dictionaryService } from '../services/api';

const DictionaryPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load dictionary on component mount
  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const words = await dictionaryService.getWords();
        dispatch(actions.setDictionary(words));
      } catch (err) {
        setError('Failed to load dictionary');
        console.error('Dictionary loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, [dispatch]);

  const handleDeleteWord = async (wordId: string) => {
    if (!confirm('Are you sure you want to delete this word from your dictionary?')) {
      return;
    }

    try {
      await dictionaryService.deleteWord(wordId);
      dispatch(actions.removeWord(wordId));
    } catch (err) {
      setError('Failed to delete word');
      console.error('Delete word error:', err);
    }
  };

  if (isLoading && state.dictionary.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dictionary...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Dictionary</h1>
        <p className="text-xl text-gray-600">
          Your personal collection of English words and their meanings
        </p>
      </div>

      {/* Stats */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary-900">
              Words Learned
            </h2>
            <p className="text-sm text-primary-700">
              Keep building your vocabulary!
            </p>
          </div>
          <div className="text-3xl font-bold text-primary-600">
            {state.dictionary.length}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">❌</span>
            </div>
            <div>
              <h3 className="font-medium text-red-900">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {state.dictionary.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl text-gray-400">📚</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your dictionary is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Start adding words by clicking on them in the generated texts on the home page.
          </p>
          <a
            href="/"
            className="btn-primary"
          >
            Go to Home Page
          </a>
        </div>
      )}

      {/* Dictionary List */}
      {state.dictionary.length > 0 && (
        <div className="card">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    English Word
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Translation
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Date Added
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.dictionary.map((word: Word, index: number) => (
                  <tr
                    key={word.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {word.english}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-700">{word.translation}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">
                        {new Date(word.dateAdded).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteWord(word.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                        title="Delete word"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Help Text */}
      {state.dictionary.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-blue-600">💡</span>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">
                Tips for effective learning
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Review your dictionary regularly to reinforce learning</li>
                <li>• Try to use these words in your own sentences</li>
                <li>• Add more words by reading texts on the home page</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;