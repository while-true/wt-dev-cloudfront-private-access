import { Toaster } from "@/components/ui/toaster";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";

import { MainLayout } from "@/layouts/main-layout";

import { LoginForm } from "@/routes/login";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/private-access-login",
    errorElement: <div>Oops! Something went wrong. Please try again later.</div>,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
