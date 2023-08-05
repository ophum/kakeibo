import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import New from "./routes/new";
import { listLoader } from "./routes/loaders";
import { newAction } from "./routes/actions";
import List from "./routes/list";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <List />,
        loader: listLoader,
      },
      {
        path: "/new",
        element: <New />,
        action: newAction
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
