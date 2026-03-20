import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <ProjectsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ProjectsProvider>
  );
}

export default App
