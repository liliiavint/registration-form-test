import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
};

export default App;