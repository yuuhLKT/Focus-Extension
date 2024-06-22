import React from 'react';
import { createRoot } from 'react-dom/client';
import styles from '../main.css?inline';
import { removeContent } from '../utils/RemoveContent';
import App from './blockContent';

import '../utils/i18n';

const isProduction: boolean = process.env.NODE_ENV === 'production';
const ROOT_ID = 'content-root';

const injectReact = (rootId: string): void => {
    try {
        const container = document.createElement('div');
        container.id = rootId;
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100vw';
        container.style.height = '100vh';
        container.style.zIndex = '2147483666';

        document.body.appendChild(container);

        if (isProduction) {
            console.log('Production mode 🚀. Adding Shadow DOM');
            container.attachShadow({ mode: 'open' });
        } else {
            console.log('Development mode 🛠');
        }

        const target: ShadowRoot | HTMLElement = isProduction ? container.shadowRoot! : container;

        const root = createRoot(target!);

        root.render(
            <React.StrictMode>
                <>
                    {isProduction && <style>{styles.toString()}</style>}
                    <App />
                </>
            </React.StrictMode>
        );

        // Listen for remove content message
        chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
            if (message.type === 'REMOVE_CONTENT') {
                removeContent();
                sendResponse({ status: 'content removed' });
            }
            return true;
        });
    } catch (error) {
        console.error('Error Injecting React', error);
    }
};

injectReact(ROOT_ID);
