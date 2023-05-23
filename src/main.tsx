import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RegionsProvider} from "./stores/RegionsStore.tsx";
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RegionsProvider>
            <App/>
        </RegionsProvider>
    </React.StrictMode>,
)
