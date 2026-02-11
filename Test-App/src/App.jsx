import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Jobsite from './Pages/Jobsite';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Jobsite/:name" element={<Jobsite />} />
      </Routes>
    </>
  )
}

export default App
