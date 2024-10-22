import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Link
import { Home } from './Components/home';
import { Viewdata } from './Components/ViewData';
import { Adddata } from './Components/addData';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/view_data' element ={<Viewdata/>}></Route>
        <Route path='/Add_data' element ={<Adddata/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
