import './../../2) styles/index.scss'
import ComposantLayout from '../Layout/Layout.jsx'
import ComposantReveil from '../Reveil/Reveil';
import ComposantAgenda from '../Agenda/Agenda'; 
import ComposantArgent from '../Argent/Argent'; 
import { useState } from 'react';
import axios from 'axios';

function ConnectApp(data) {
  let [witchPage, setWitchPage] = useState('Argent');
  let page = {
    'Reveil':<ComposantReveil profile={data.profile}/>,
    'Agenda':<ComposantAgenda profile={data.profile}/>,
    'Argent':<ComposantArgent profile={data.profile}/>,
  };

  return (
    <div className="connectApp">
      <ComposantLayout setWitchPage={setWitchPage}/>
      <div className='page'>
        {page[witchPage]}
      </div>
    </div>
  );
}

export default ConnectApp;
