import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import New from "./routes/new";
import { rootLoader } from "./routes/loaders";
import { newAction } from "./routes/actions";

const router =  createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader
  },
  {
    path: "/new",
    element: <New />,
    action: newAction
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
