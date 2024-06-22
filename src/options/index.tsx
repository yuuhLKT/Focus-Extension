import React from 'react';
import { createRoot } from 'react-dom/client';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import '../main.css';
import '../utils/i18n';
import { OptionsContent } from './Options';

const container = document.getElementById('options-root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <DarkModeProvider>
            <OptionsContent />
        </DarkModeProvider>
    </React.StrictMode>
);
