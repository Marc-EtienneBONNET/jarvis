import './App.scss';
import './../../2) styles/index.scss'
import { useState } from 'react';
import ConnectApp from '../connectApp/connectApp';
import axios from 'axios';
import { takeAllProfile, takeOneProfile, supProfile, addNewProfile, mouvProfile, CheckPassword  } from './../../utile/function/dataProfile'




function App() {

  let [profile, setProfile] = useState();
  let [idPass, setidPass] = useState({
    mail:"webbonnet@gmail.com",
    password:"passe",
  });

  async function connection()
  {
    let tmp = await CheckPassword(idPass.mail, idPass.password);
    if (tmp)
       setProfile(tmp);
    else 
       alert('Le mail ou le moth de passe est incorrecte !')
  }

  function handleChangeIdPass(e){
    let tmp = {
      ...idPass,
      [e.target.name]:e.target.value,
    }
    setidPass(tmp);
  }
  return (
    <div className="appFormConnection">
     {profile?<ConnectApp profile={profile}/>:<></>}
        <form>
          <div className='appFormConnectionListeChamps'>
            <h2>Welcome !</h2>
            <input onChange={(e) => {handleChangeIdPass(e)}} type='text' className="appFormConnectionMail" name='mail' value={idPass.mail} placeholder="...@gmail.com"/>
            <input onChange={(e) => {handleChangeIdPass(e)}} type='text' className="appFormConnectionPassword" name='password' value={idPass.password} placeholder="***"/>
            <input onClick={(e) => {connection()}}  type='button' className="appFormConnectionBtn" value='connection'/>
          </div>
        </form>
    </div>
  );
}

export default App;
