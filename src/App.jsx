import './App.css'
import CustomRoutes from './routes/CustomRoutes'
import Navbar from './components/Navbar/Navbar'
import { Scrollbar } from 'react-scrollbars-custom';

function App() {

  return (
    <>
      <Navbar />
      <CustomRoutes />
    </>
  )
}

export default App
