import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room";


export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/rooms/new" element={<NewRoom />}></Route>
                <Route path="/rooms/:id" element={<Room />}></Route>
            </Routes>
        </BrowserRouter>
    );
}