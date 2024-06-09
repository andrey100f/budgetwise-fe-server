import { Form, NavLink } from "react-router-dom";
import { ArrowLeftStartOnRectangleIcon, CogIcon } from "@heroicons/react/24/solid";

import logomark from "../assets/logomark.svg";

function Nav({ username } : { username: string }) {
    return (
        <nav>
            { username && (
                <>
                    <NavLink to="/" aria-label="Go to home">
                        <img src={logomark} alt="" height={30} />
                        <span>BudgetWise</span>
                    </NavLink>

                    <Form method="post" action="logout" onSubmit={(event) => {
                        if(!confirm("Are you sure you want to delete your account?")) {
                            event.preventDefault();
                        }
                        }}>
                        <div className="user-details">
                            <NavLink to="/edit" className="btn btn--dark">
                                <span>User Settings</span>
                                <CogIcon width={20} />
                            </NavLink>
                            <button type="submit" className="btn btn--warning">
                                <span>Logout</span>
                                <ArrowLeftStartOnRectangleIcon width={20} />
                            </button>
                        </div>
                    </Form>
                </>
            )}
        </nav>
    );
}

export default Nav;
