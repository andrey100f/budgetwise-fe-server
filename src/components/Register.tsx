import React, { useEffect, useState } from 'react';
import { NavLink, useFetcher } from 'react-router-dom';
import { ArrowUturnLeftIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';

import { deleteItem, fetchData } from '../utils/helpers';
import { deleteUser } from "../utils/api";
import { toast } from 'react-toastify';

function Register() {
    const username = fetchData("username");
    const fetcher = useFetcher();
    const formRef = React.useRef() as React.MutableRefObject<HTMLFormElement>;
    const isSubmitting = fetcher.state === "submitting";

    const [userName, setUserName] = useState(username);

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset();
        }
    }, [isSubmitting]);

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        const token = fetchData("token");
        const user = fetchData("user");
        const id = user.id;

        try {

            if(confirm("Are you sure you want to delete your account?")) {
                await deleteUser(id, token);

                deleteItem({ key: "username" });
                deleteItem({ key: "user" });
                deleteItem({ key: "token" });
    
                window.location.href = "/";
    
                return toast.success("User deleted!");
            }

        }
        catch(error) {
            return toast.error("There was a problem deleting your account...");
        }
    }


    return (
        <div className="intro">
            { !username ? (
                <div>
                    <h1>Take control of <span className="accent">Your Money</span></h1>
                    <p>Personal budgeting is the secret to financial freedom. Start your journey today.</p>
    
                    <fetcher.Form method="post" ref={formRef}> 
                        <input type="text" name="username" required placeholder="What is your name?" aria-label="Your name" autoComplete="given-name" />
                        <input type="password" name="password" required placeholder="What is your password?" aria-label="Your password" />
                        <input type="hidden" name="_action" value="registerUser" />
                        <div className="login-inputs">
                            <button type="submit" className="btn btn--dark">
                                <span>Register</span>
                                <UserPlusIcon width={20} />
                            </button>
    
                            <NavLink to="/" className="btn btn--dark">
                                <span>Go Back</span>
                                <ArrowUturnLeftIcon width={20} />
                            </NavLink>
                        </div>
                    </fetcher.Form>
                </div>
            ) : (
                <div>
                    <h1>User Setings</h1>
                    <p>Edit your account details</p>

                    <fetcher.Form method="post" ref={formRef}> 
                        <input type="text" name="username" required placeholder="What is your name?" aria-label="Your name" autoComplete="given-name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        <input type="password" name="password" required placeholder="What is your password?" aria-label="Your password" />
                        <input type="hidden" name="_action" value="editUser" />
                        <div className="login-inputs">
                            <button type="submit" className="btn btn--dark">
                                <span>Edit</span>
                                <UserPlusIcon width={20} />
                            </button>
    
                            <NavLink to="/" className="btn btn--dark">
                                <span>Go Back</span>
                                <ArrowUturnLeftIcon width={20} />
                            </NavLink>
                        </div>
                    </fetcher.Form>

                    <button type="submit" className="btn btn--warning" onClick={(e) => handleDelete(e)}>
                        <TrashIcon width={20} />
                        <span>Delete account</span>
                    </button>
                </div>
            )
            }

        </div>
    );
}

export default Register;
