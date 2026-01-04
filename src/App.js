import NavBar from "./component/Navbar/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './component/page/Home'
import About from './component/page/About'
import Skills from './component/page/Skills'
import Education from './component/page/Education'
import Experience from './component/page/Experience'
import Projects from './component/page/Projects'
import Resume from './component/page/Resume'
import 'boxicons';
// import './App.css';
function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={ <About/>} />
            <Route path="/skills" element={<Skills/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/resume" element={<Resume/>} />
            <Route path="/experience" element={<Experience/>} />
            <Route path="/education" element={<Education/>} />

        </Routes>
      <NavBar />
    </div>
  );
}

export default App;

