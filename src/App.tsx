import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import BudgetPage from "./pages/BudgetPage";
import Error from "./pages/Error";
import Main from "./layouts/Main";
import Register from "./components/Register";

import { logoutAction } from "./actions/logout";
import { mainLoader, dashboardLoader, expensesLoader, budgetLoader, editLoader } from "./utils/loaders";
import { registerAction, budgetAction, dashboardAction, expensesAction } from "./utils/actions";

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Error />
      },
      {
        path: "edit",
        element: <Register />,
        loader: editLoader,
        action: registerAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </div> 
  )
}

export default App
