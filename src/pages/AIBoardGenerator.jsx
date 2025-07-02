/* Disabled for presentation. Uncomment to restore AI Board Generator feature.

import React, { useState } from 'react';
import { AiLoader } from '../cmps/AiLoader';
import { BoardTable } from '../cmps/BoardTable';
import { httpService } from '../services/http.service';
import '../assets/styles/cmps/AiBoardGenerator.scss';
import { useNavigate } from 'react-router-dom';
import { addBoard } from '../store/board.actions';

const BOARD_TYPES = [
  { value: 'kanban', label: 'Kanban' },
  { value: 'scrum', label: 'Scrum' },
  { value: 'roadmap', label: 'Roadmap' },
];
const THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'colorful', label: 'Colorful' },
];
const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'he', label: 'Hebrew' },
];
const COLOR_PALETTES = [
  { value: 'default', label: 'Default' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'vivid', label: 'Vivid' },
  { value: 'earth', label: 'Earth Tones' },
];

export function AIBoardGenerator() {
  const [form, setForm] = useState({
    description: '',
    boardType: BOARD_TYPES[0].value,
    numGroups: 3,
    numTasks: 5,
    theme: THEMES[0].value,
    language: LANGUAGES[0].value,
    colorPalette: COLOR_PALETTES[0].value,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedBoard, setGeneratedBoard] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedBoard(null);
    try {
      const res = await httpService.post('ai/generateBoard', {
        description: form.description,
        boardType: form.boardType,
        numGroups: +form.numGroups,
        numTasks: +form.numTasks,
        theme: form.theme,
        language: form.language,
        colorPalette: form.colorPalette,
      });
      const board = res.board || res;
      // Add to Redux and persist
      const savedBoard = await addBoard(board);
      // Navigate to the new board
      navigate(`/board/${savedBoard._id}`);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Failed to generate board. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setGeneratedBoard(null);
  };

  return (
    <div className="ai-board-generator-page">
      <h1 className="ai-gen-title">AI Board Generator</h1>
      <p className="ai-gen-desc">Describe your project and let AI build your board in seconds.</p>
      <form className="ai-gen-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Marketing campaign for new product launch"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="boardType">Board Type</label>
          <select
            id="boardType"
            name="boardType"
            value={form.boardType}
            onChange={handleChange}
          >
            {BOARD_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="numGroups">Number of Groups</label>
          <input
            id="numGroups"
            name="numGroups"
            type="number"
            min="1"
            max="10"
            value={form.numGroups}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="numTasks">Tasks per Group</label>
          <input
            id="numTasks"
            name="numTasks"
            type="number"
            min="1"
            max="20"
            value={form.numTasks}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={form.theme}
            onChange={handleChange}
          >
            {THEMES.map((theme) => (
              <option key={theme.value} value={theme.value}>{theme.label}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={form.language}
            onChange={handleChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="colorPalette">Color Palette (optional)</label>
          <select
            id="colorPalette"
            name="colorPalette"
            value={form.colorPalette}
            onChange={handleChange}
          >
            {COLOR_PALETTES.map((palette) => (
              <option key={palette.value} value={palette.value}>{palette.label}</option>
            ))}
          </select>
        </div>
        <button className="ai-gen-btn" type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Board'}
        </button>
      </form>
      <AiLoader isLoading={loading} />
      {error && (
        <div className="ai-gen-error">
          <p>{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
    </div>
  );
}
*/ 