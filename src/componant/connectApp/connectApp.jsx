import './../../2) styles/index.scss'
import ComposantLayout from '../Layout/Layout.jsx'
import ComposantReveil from '../afterConnection/Reveil/Reveil';
import ComposantAgenda from '../afterConnection/Agenda/Agenda'; 
import ComposantArgent from '../afterConnection/Argent/Argent'; 
import ComposantProfile from '../afterConnection/Profile/Profile'; 
import { useState } from 'react';
import axios from 'axios';

function ConnectApp(data) {
  let [witchPage, setWitchPage] = useState('Profile');
  let page = {
    'Profile':<ComposantProfile profile={data.profile}/>,
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
