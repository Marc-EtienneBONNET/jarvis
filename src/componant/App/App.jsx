import './App.scss';
import './../../2) styles/index.scss'
import ComposantLayout from './../Layout/Layout.jsx'
import ComposantReveil from '../Reveil/Reveil';
import ComposantAgenda from '../Agenda/Agenda'; 
import ComposantArgent from '../Argent/Argent'; 
import { useState } from 'react';

function App() {
  let [witchPage, setWitchPage] = useState('Argent');
  let page = {
    'Reveil':<ComposantReveil/>,
    'Agenda':<ComposantAgenda/>,
    'Argent':<ComposantArgent/>,
  };

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
