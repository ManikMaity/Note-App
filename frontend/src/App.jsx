import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./pages/Routes";
import { Toaster } from "@/components/ui/toaster"
import ModelContainer from "./components/organisms/Models/ModelContainer";
import "./App.css"

function App() {

  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes/>
      <ModelContainer/>
      <Toaster/>
    </QueryClientProvider>
  )
}

export default App
