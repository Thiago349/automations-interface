import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import "@fontsource-variable/archivo";
import "@fontsource-variable/inter";

import Selector from "./pages/Selector/Selector.tsx";
import Flow from "./pages/Flow/Flow.tsx";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 300000,
        refetchInterval: 5000
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/selector" element={<Selector />}/>
          <Route path="/flow" element={<Flow />}/>
          <Route path="/*" element={<Navigate to={"selector"} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);