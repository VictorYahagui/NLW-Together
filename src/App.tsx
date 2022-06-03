import { AppRoutes } from "./Routes";

import { AuthContextProvider } from "./context/AuthContext"


export function App() {
  
  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
  )
}

export default App;
