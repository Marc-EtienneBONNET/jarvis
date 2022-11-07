import './App.scss';
import './../../2) styles/index.scss'
import ComposantLayout from './../Layout/Layout.jsx'
import ComposantReveil from '../Reveil/Reveil';
import ComposantAgenda from '../Agenda/Agenda'; 
import { useState } from 'react';

function App() {
  let [witchPage, setWitchPage] = useState('Agenda');
  let page = {
    'Agenda':<ComposantReveil/>,
    'Reveil':<ComposantAgenda/>,
  };

    console.log(witchPage);
  return (
    <div className="App">
      <ComposantLayout setWitchPage={setWitchPage}/>
      <div className='page'>
        {page[witchPage]}
      </div>
    </div>
  );
}

export default App;
