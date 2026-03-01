import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WeekStudy from './pages/WeekStudy';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/week/:weekId"
          element={
            <Layout>
              <WeekStudy />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}
