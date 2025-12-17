import { createBrowserRouter, RouterProvider } from "react-router-dom"
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from "./pages/home";
import { MathJaxContext } from "better-react-mathjax";

const paths = [
  {
    path: '/',
    element: (
      <Home />
    )
  }
]

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  }
};

const BrowerRouter = createBrowserRouter(paths)

export default function App() {
  return (
    <MantineProvider>
      <MathJaxContext version={3} config={config}>
        <RouterProvider router={BrowerRouter} />
      </MathJaxContext>
    </MantineProvider>
  )
}