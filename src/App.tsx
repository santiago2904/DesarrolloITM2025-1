import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntityPage from "./pages/entityPage.page.tsx";
import Header from "./components/header.component.tsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/crud/:entity" element={<EntityPage />} />
            </Routes>
        </Router>
    );
}

export default App;
