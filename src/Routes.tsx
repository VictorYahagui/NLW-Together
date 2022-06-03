import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/rooms/new" element={<NewRoom />}></Route>
            </Routes>
        </BrowserRouter>
    );
}