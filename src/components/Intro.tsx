import { Form, NavLink } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/solid";

function Intro() {
    return (
        <div className="intro">
            <div>
                <h1>Welcome to <span className="accent">BudgetWise</span></h1>

                <p></p><p></p>

                <Form method="post" >
                    <input type="text" name="username" required placeholder="What is your name?" aria-label="Your name" autoComplete="given-name" />
                    <input type="password" name="password" required placeholder="What is your password?" aria-label="Your password" />
                    <input type="hidden" name="_action" value="newUser" />
                    <div className="login-inputs">
                        <button type="submit" className="btn btn--dark">
                            <span>Login</span>
                            <ArrowRightEndOnRectangleIcon width={20} />
                        </button>
                        <NavLink to="/register" className="btn btn--dark">
                            <span>Register</span>
                            <UserPlusIcon width={20} />
                        </NavLink>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Intro;
