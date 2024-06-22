import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

/* CSS */
import './main.css';

/* Pages */
import BlockPage from './BlockPage';
import FocusMode from './FocusMode';
import { OptionsContent } from './options/Options';

/* Contexts */
import { DarkModeProvider } from './contexts/DarkModeContext';

/* Translation */
import './utils/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DarkModeProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/focus" />} />
                    <Route path="/block" element={<BlockPage />} />
                    <Route path="/focus" element={<FocusMode />} />
                    <Route path="/options" element={<OptionsContent />} />
                </Routes>
            </HashRouter>
        </DarkModeProvider>
    </React.StrictMode>
);
