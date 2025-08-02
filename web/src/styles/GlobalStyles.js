// web/src/styles/GlobalStyles.js - COMPLETE GLOBAL STYLES
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset and base styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${props => props.theme?.typography?.fontFamily?.primary || 
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme?.colors?.bgSecondary || '#f8f9fa'};
    color: ${props => props.theme?.colors?.textPrimary || '#1F2937'};
    line-height: 1.6;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.25;
    color: ${props => props.theme?.colors?.textPrimary || '#1F2937'};
    margin-bottom: 0.5rem;
  }

  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.875rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.125rem; }
  h6 { font-size: 1rem; }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  /* Links */
  a {
    text-decoration: none;
    color: ${props => props.theme?.colors?.primary || '#0066CC'};
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme?.colors?.primaryDark || '#004499'};
    }

    &:focus {
      outline: 2px solid ${props => props.theme?.colors?.primary || '#0066CC'};
      outline-offset: 2px;
    }
  }

  /* Buttons */
  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    transition: all 0.2s ease;
    border-radius: 6px;
    
    &:focus {
      outline: 2px solid ${props => props.theme?.colors?.primary || '#0066CC'};
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Forms */
  input, textarea, select {
    font-family: inherit;
    border: 1px solid ${props => props.theme?.colors?.borderLight || '#E5E7EB'};
    border-radius: 6px;
    padding: 0.75rem;
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme?.colors?.primary || '#0066CC'};
      box-shadow: 0 0 0 3px ${props => props.theme?.colors?.primary || '#0066CC'}20;
    }

    &::placeholder {
      color: ${props => props.theme?.colors?.textMuted || '#9CA3AF'};
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Lists */
  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.25rem;
  }

  /* App specific styles */
  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Utility classes */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .d-flex { display: flex; }
  .d-block { display: block; }
  .d-none { display: none; }

  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .align-center { align-items: center; }

  .w-full { width: 100%; }
  .h-full { height: 100%; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mt-4 { margin-top: 1rem; }

  /* Loading spinner styles */
  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid ${props => props.theme?.colors?.gray200 || '#E5E7EB'};
    border-radius: 50%;
    border-top-color: ${props => props.theme?.colors?.primary || '#0066CC'};
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Fade animations */
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Card styles */
  .card {
    background: ${props => props.theme?.colors?.white || '#FFFFFF'};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  /* Button variants */
  .btn-primary {
    background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#0066CC'}, ${props => props.theme?.colors?.primaryDark || '#004499'});
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${props => props.theme?.colors?.primary || '#0066CC'}40;
    }
  }

  .btn-secondary {
    background: ${props => props.theme?.colors?.gray100 || '#F3F4F6'};
    color: ${props => props.theme?.colors?.textPrimary || '#1F2937'};
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;

    &:hover {
      background: ${props => props.theme?.colors?.gray200 || '#E5E7EB'};
    }
  }

  .btn-danger {
    background: linear-gradient(135deg, ${props => props.theme?.colors?.danger || '#DC3545'}, ${props => props.theme?.colors?.dangerDark || '#C53030'});
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${props => props.theme?.colors?.danger || '#DC3545'}40;
    }
  }

  /* Responsive utilities */
  @media (max-width: ${props => props.theme?.breakpoints?.md || '768px'}) {
    .d-md-none { display: none; }
    .d-md-block { display: block; }
    
    h1 { font-size: 1.875rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    
    .card {
      padding: 1rem;
      margin: 0.5rem;
    }
  }

  @media (max-width: ${props => props.theme?.breakpoints?.sm || '640px'}) {
    .d-sm-none { display: none; }
    .d-sm-block { display: block; }
    
    body {
      font-size: 14px;
    }
    
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.25rem; }
    h3 { font-size: 1.125rem; }
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme?.colors?.gray100 || '#F3F4F6'};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme?.colors?.gray400 || '#9CA3AF'};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme?.colors?.gray500 || '#6B7280'};
  }

  /* Medical theme specific styles */
  .medical-gradient {
    background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#0066CC'}, ${props => props.theme?.colors?.info || '#17A2B8'});
  }

  .success-gradient {
    background: linear-gradient(135deg, ${props => props.theme?.colors?.success || '#28A745'}, ${props => props.theme?.colors?.successDark || '#1E7E34'});
  }

  .warning-gradient {
    background: linear-gradient(135deg, ${props => props.theme?.colors?.warning || '#FFC107'}, ${props => props.theme?.colors?.warningDark || '#F57F17'});
  }

  /* Focus management for accessibility */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: ${props => props.theme?.colors?.primary || '#0066CC'};
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;

    &:focus {
      top: 6px;
    }
  }

  /* Print styles */
  @media print {
    body {
      background: white !important;
      color: black !important;
    }
    
    .no-print {
      display: none !important;
    }
    
    .card {
      box-shadow: none !important;
      border: 1px solid #ccc !important;
    }
  }
`;

export default GlobalStyles;