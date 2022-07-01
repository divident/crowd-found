import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { DAppProvider, ChainId } from '@usedapp/core'
import "./main.css"
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
} from "react-router-dom";
import { Campaings, Home, CampaingDetails, NotFound, CreateCampaing } from './components';
import { ErrorBoundary } from './ErrorBoundary';

const config = {
    readOnlyChainId: ChainId.Ropsten,
    readOnlyUrls: {
        [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/541df11830474327beea6f4390209d81'
    },
}


ReactDOM.render(
    <DAppProvider config={config}>
        <App />
    </DAppProvider>,
    document.getElementById('react')
)


export function App() {

    const [title, setTitle] = useState("Home");

    useEffect(() => {
        setTitle(location);
    }, [location]);

    const onPageChange = () => (pageName) => {
        setTitle(pageName);
    }

    return (
        <div className="flex flex-column  min-h-screen max-w-screen">
            <BrowserRouter>
                <div className="w-1/4 flex-auto bg-violet-100 nav-shadow">
                    <div className="p-4">
                        <h2 className="text-2xl mb-4">Campaign App</h2>
                        <nav>
                            <ul>
                                <NavLink to="/">{({ isActive }) => (<li className={isActive ? "link link-active" : "link"}>Home</li>)}</NavLink>
                                <NavLink to="/campaings">{({ isActive }) => (<li className={isActive ? "link link-active" : "link"}>Campaings</li>)}</NavLink>
                                <NavLink to="/create_campaing">{({ isActive }) => (<li className={isActive ? "link link-active" : "link"}>Create Campaign</li>)}</NavLink>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="w-3/4 flex-auto bg-gradient-to-r from-violet-500 to-violet-300 py-3 px-5">
                    <div style={{ overflowWrap: "anywhere" }} className="p-4">
                        <ErrorBoundary>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/create_campaing" element={<CreateCampaing />} />
                                <Route path="/campaings" element={<Campaings />} />
                                <Route path="/campaings/:id" element={<CampaingDetails />} />
                                <Route path="*" element={<NotFound />}/>
                            </Routes>
                        </ErrorBoundary>

                    </div>
                </div>
            </BrowserRouter >
        </div >

    )
}