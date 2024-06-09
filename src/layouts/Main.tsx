import { Outlet, useLoaderData } from "react-router-dom";

import Nav from "../components/Nav";
import { MainLoaderData } from "../utils/interfaces";

function Main() {
    const { username } = useLoaderData() as MainLoaderData;

    return (
        <div className="layout">
            <Nav username={username} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Main;
