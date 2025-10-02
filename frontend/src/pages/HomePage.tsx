import React from 'react';
import { useApp, actions, ProficiencyLevel } from '../context/AppContext';
import { aiService } from '../services/api';
import InteractiveText from '../components/InteractiveText';

const HomePage: React.FC = () => {
  const { state, dispatch } = useApp();

  const proficiencyLevels: ProficiencyLevel[] = [
    'Elementary',
    'Pre-Intermediate',
    'Intermediate',
    'Upper-Intermediate',
    'Advanced'
  ];

  const handleLevelSelect = (level: ProficiencyLevel) => {
    dispatch(actions.setSelectedLevel(level));
    dispatch(actions.setGeneratedText(null)); // Clear previous text
  };

  const handleGenerateText = async () => {
    if (!state.selectedLevel || !state.aiToken) return;

    dispatch(actions.setLoading(true));
    dispatch(actions.setError(null));

    try {
      const response = await aiService.generateText(state.selectedLevel, state.aiToken);
      
      if (response.success && response.text) {
        dispatch(actions.setGeneratedText(response.text));
      } else {
        dispatch(actions.setError(response.error || 'Failed to generate text'));
      }
    } catch (error) {
      dispatch(actions.setError('Network error. Please check your connection.'));
      console.error('Text generation error:', error);
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Language Learning
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Improve your English reading comprehension and build your vocabulary with AI-generated texts tailored to your proficiency level.
        </p>
      </div>

      {/* AI Status Card */}
      {!state.isAiReady && (
        <div className="card bg-amber-50 border-amber-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-amber-600">⚠️</span>
            </div>
            <div>
              <h3 className="font-medium text-amber-900">AI Not Connected</h3>
              <p className="text-sm text-amber-700">
                Please add your AI token using the "Add AI Token" button in the top-right corner to get started.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Ready Message */}
      {state.isAiReady && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-green-900">AI Teacher Ready</h3>
              <p className="text-sm text-green-700">
                Hello! I am your personal English teacher. I am ready to help you learn. Please select your proficiency level to begin.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Level Selection */}
      {state.isAiReady && (
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Select Your English Proficiency Level
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {proficiencyLevels.map((level) => (
              <button
                key={level}
                onClick={() => handleLevelSelect(level)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                  state.selectedLevel === level
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="font-medium">{level}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate Text Button */}
      {state.isAiReady && state.selectedLevel && (
        <div className="text-center">
          <button
            onClick={handleGenerateText}
            disabled={state.isLoading}
            className="btn-primary text-lg px-8 py-3"
          >
            {state.isLoading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                </svg>
                <span>Generating Text...</span>
              </span>
            ) : (
              'Generate Text'
            )}
          </button>
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600">❌</span>
            </div>
            <div>
              <h3 className="font-medium text-red-900">Error</h3>
              <p className="text-sm text-red-700">{state.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Generated Text Display */}
      {state.generatedText && (
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Reading Text ({state.selectedLevel})
          </h2>
          <InteractiveText text={state.generatedText} />
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Click on any word you don't know to add it to your personal dictionary with your own translation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;