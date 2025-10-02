import React, { useState } from 'react';
import { useApp, actions } from '../context/AppContext';
import { aiService } from '../services/api';

interface AITokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AITokenModal: React.FC<AITokenModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const [tokenInput, setTokenInput] = useState(state.aiToken || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await aiService.validateToken(tokenInput.trim());
      
      if (response.success) {
        dispatch(actions.setAiToken(tokenInput.trim()));
        dispatch(actions.setAiReady(true));
        
        // Show the welcome message
        if (response.message) {
          dispatch(actions.setError(null));
          // You could show a toast/notification here with the welcome message
          console.log('AI Welcome:', response.message);
        }
        
        onClose();
      } else {
        setError(response.error || 'Failed to validate token');
      }
    } catch (err: any) {
      console.error('Token validation error:', err);
      if (err.response) {
        // Server responded with error
        setError(err.response.data?.error || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Cannot connect to server. Please check if the backend server is running on http://localhost:7000');
      } else {
        // Something else happened
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setTokenInput(state.aiToken || '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add AI Token</h2>
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
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
              AI API Token
            </label>
            <input
              id="token"
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="input"
              placeholder="Enter your AI API token..."
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              This token will be used to connect to the AI service for text generation.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

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
              disabled={isSubmitting || !tokenInput.trim()}
            >
              {isSubmitting ? 'Validating...' : 'Save Token'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AITokenModal;