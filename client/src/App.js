import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Complaints from './pages/Complaints';
import Suggestions from './pages/Suggestions';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
