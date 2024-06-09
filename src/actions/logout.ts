// react-router-dom imports
import { redirect } from "react-router-dom";

// Library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../utils/helpers";

export async function logoutAction() {
    // delete the user
    deleteItem({ key: "username" });
    deleteItem({ key: "user" });
    deleteItem({ key: "token" });

    toast.success("You've logged out!!");

    return redirect("/");
}
