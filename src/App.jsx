import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FolderDetails from './pages/FolderDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/file/:folderId" element={<FolderDetails />} />
    </Routes>
  );
};

export default App;
