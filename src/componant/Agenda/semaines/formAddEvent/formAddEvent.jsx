import { useState } from "react";
import { checkWichBigDay } from './../../../../utile/function/heureDate'

function ComposantformAddEvent(arg){

    let [event, setEvent] = useState({
        type:'',
        alarmType:'',
        titre:'',
        detail:'',
        debut: new Date(),
        fin: new Date(),
        recurance:'',
        argent:0,
    });
    
    function handleChangeNewEvent(e){
        
        let res = e.target.value;

        if (!e || !e.target || !e.target.value || !e.target.name)
            return ;
        let tmp = {
            ...event,
            [e.target.name]:res,
        }; 
        setEvent(tmp);
    }

    function handleClickNewEvent(e){

        let newEvent = {
            type: event.type,
            alarmType: event.alarmType,
            titre: event.titre,
            detail: event.detail,
            debut: new Date(event.debut),
            fin: new Date(event.debut),
            recurance: event.recurance,
            argent: event.argent,
        }
        if (checkWichBigDay(newEvent.debut, newEvent.fin) === 1)
        {
            alert('La date de fin doit etre posterieur ou egale a la date de debut');        
            return ;
        }
        else
        {
            arg.setNewEvent(false);
        }
    }
    return (
    <div className={'formAddEvent '}>
          <i onClick={() => {arg.setNewEvent(false)}} className="fa-solid fa-xmark formAddEventBtnQuit"></i>
        <form>
            <div className="types2">
                <h5>Type : </h5>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formAddEventChamp formAddEventChooseType" name='type'>
                    <option value="Travail pro">Travail pro</option>
                    <option value="Travail perso">Travail perso</option>
                    <option value="Rdv pro">Rdv pro</option>
                    <option value="Rdv perso">Rdv perso</option>
                    <option value="Evenement expetionnel">Evenement expetionnel</option>
                    <option value="Organisation">Organisation</option>
                </select>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formAddEventChamp" name='alarmType'>
                    <option value="Rdv perso">Reveil</option>
                    <option value="Rdv pro">Alarm</option>
                    <option value="Travail perso">Pop</option>
                    <option value="Travail pro">Rien</option>
                </select>
            </div>
            <div className="types">
                <h5>Debut : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='datetime-local' className="formAddEventChamp" name='debut'/>
            </div>
            <div className="types">
                <h5>Fin : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='datetime-local' className="formAddEventChamp" name='fin'/>
            </div>
            <div className="types">
                <h5>Argent : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='number' className="formAddEventChamp" name='argent'/>
            </div>
            <div className="types">
                <h5>Recurance : </h5>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formAddEventChamp" name='recurance'>
                    <option value="">Jamais</option>
                    <option value="Tout les semaine">Tout les semaine</option>
                    <option value="Tout les mois">Tout les mois</option>
                    <option value="Tout les ans">Tout les ans</option>
                </select>
            </div>
            <input onChange={(e) => {handleChangeNewEvent(e)}} type='text' name='titre' className="formAddEventChamp formAddEventChampTitre"/>
            <textarea onChange={(e) => {handleChangeNewEvent(e)}} type='textarea'  name='detail' className="formAddEventChamp formAddEventChampDetail"/>
            <input onClick={(e) => {handleClickNewEvent(e)}} type='button' value='envoyez'className="formAddEventChamp formAddEventChampBtn"/>
        </form>
    </div>
    );
}

export default ComposantformAddEvent;