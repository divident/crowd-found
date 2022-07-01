import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export function Home() {

    const [metamask, setMetamask] = useState(false);

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setMetamask(false);
        } else {
            setMetamask(true);
        }
    }, [])

    return (
        <div>
            <article className="text-white overflow-hidden">
                <header className="h-[200px] mt-6 slide-top">
                    <h1 className="text-6xl uppercase">Campaing App</h1>
                    <p className="text-2xl mt-4">Transparent and verifiable platform for collecting funds</p>
                    {metamask && (<p className="mt-2">In order to use app you need to have <a className="underline underline-offset-1 text-blue-700 visited:text-blue-900" href="https://metamask.io/">metamask</a> installed</p>)}
                </header>
                <section className="flex items-center slide-left">
                    <div className="w-2/3 text-left flex justify-center">
                        <div className="w-80">
                            <h2 className="text-2xl">A platform for collecting money</h2>
                            <p className="mt-3 text-gray-200 text-xl">Create campaigns and collect money to reach your goal. Use internal token to rise founds. You can always refund your pledge</p>
                        </div>
                    </div>
                    <div className="w-1/3 border-2 border-violet-800 py-4 px-8 bg-violet-300 rounded-xl skew-y-1 hover:skew-y-0 transition-transform duration-800">
                        <img src="public/img/money.svg" />
                    </div>
                </section>
                <section className="flex mt-6 items-center slide-right">
                    <div className="w-1/3 border-2 border-violet-800 py-4 px-8 bg-violet-300 rounded-xl skew-y-1 hover:skew-y-0 transition-transform duration-800">
                        <img src="public/img/magnifier.svg" />
                    </div>
                    <div className="w-2/3 text-left flex justify-center">
                        <div className="w-80 text-xl text-gray-200">
                            <h2 className="text-2xl mb-6 text-white ">Explore</h2>
                            <Link to="/create_campaing">
                                <div className="border border-violet-800 py-2 px-4 rounded-xl bg-violet-400 hover:bg-violet-500 cursor-pointer hover:animate-pulse">
                                    <span>Create campaign</span>
                                    <img src="public/img/up-arrow.svg" className="inline float-right mt-[3px]" width="16px" height="16px" />
                                </div>
                            </Link>
                            <Link to="/campaings">
                                <div className="border border-violet-800 py-2 px-4 rounded-xl mt-4 bg-violet-400 hover:bg-violet-500 cursor-pointer hover:animate-pulse">
                                    <span>Campaing list</span>
                                    <img src="public/img/up-arrow.svg" className="inline float-right mt-[3px]" width="16px" height="16px" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    )
}