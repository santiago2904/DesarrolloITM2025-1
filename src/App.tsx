import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EntityPage from "./pages/entityPage.page.tsx";
import IndicatorResultPage from "./pages/indicatorresult.page.tsx";
import IndicatorVariablesPage from "./pages/indicatorVariables.page.tsx";
import VariablesUsersPage from "./pages/variablesUsers.page.tsx";
import ActorPage from "./pages/actor.page.tsx";
import IndicatorsPage from "./pages/indicators.page.tsx";
import Login from './components/Login.component';
import Navbar from './components/Navbar.component';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Routes>
                  <Route path="/crud/:entity" element={<EntityPage />} />
                  <Route path="/fk/indicatorresult" element={<IndicatorResultPage />} />
                  <Route path="/fk/indicatorvariables" element={<IndicatorVariablesPage />} />
                  <Route path="/fk/variablesusers" element={<VariablesUsersPage />} />
                  <Route path="/fk/actor" element={<ActorPage />} />
                  <Route path="/fk/indicators" element={<IndicatorsPage />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
