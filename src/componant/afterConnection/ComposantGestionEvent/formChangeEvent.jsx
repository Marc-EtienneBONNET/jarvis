import axios from "axios";
import { useState } from "react";
import { checkWichBigDay } from '../../../utile/function/heureDate'
import { url } from './../../../utile/variable/variable'

function ComposantFromChangeEvent(arg){

    let tmp = arg.event;
    if (tmp === undefined)
        tmp = {
            id: -1,
            type:'Travail perso',
            alarmType:'Rien',
            titre:arg.titre !== undefined ? arg.titre:'Titre',
            detail:'Detail',
            debut: new Date(arg.date),
            fin: arg.titre !== undefined ? new Date(arg.date) : new Date(new Date(arg.date).setHours(new Date(arg.date).getHours() + 1)),
            recurance:'Rien',
            argent:"0",
            argentType:"Rien",
            user:arg.profile.id,
         }
    let [event, setEvent] = useState({
        id: tmp.id,
        type:tmp.type,
        alarmType:tmp.alarmType,
        titre:tmp.titre,
        detail:tmp.detail,
        debut:tmp.debut,
        fin: tmp.fin,
        recurance:tmp.recurance,
        argent:tmp.argent,
        argentType:tmp.argentType,
        user:tmp.user,
    });
    function handleChangeNewEvent(e){
        
        let res = e.target.value;
        if (!e || !e.target || !e.target.name)
            return ;
        if (e.target.name ==='argent' && e.target.value === "")
            res = '0';
        if (e.target.name ==='argent' && e.target.value[0] === '0' && e.target.value[1] !== '\0')
            res = e.target.value[1];
        for (let i = 0; e.target.name === 'argent' && e.target.value[i]; i++)
        {
            if (e.target.value[i] !== '-' && (e.target.value[i] < '0' || e.target.value[i] > '9'))
                return ;
        }
        if (e.target.name === 'debut' || e.target.name === 'fin' )
            res = new Date(res);
        let tmp = {
            ...event,
            [e.target.name]:res,
        };
        if (tmp.argentType === 'Charge mensuel')
        {
            tmp = {
                ...tmp,
                recurance: 'Tout les mois',
            };
        }
        setEvent(tmp);
    }

    function addZero(nb){
        if (nb < 10)
            return ('0' + nb);
        return (nb);
    }
    function handleClickNewEvent(e){

        let newEvent = {
            id:event.id,
            type: event.type,
            alarmType: event.alarmType,
            titre: event.titre,
            detail: event.detail,
            debut: event.debut,
            fin: event.fin,
            recurance: event.recurance,
            argent: event.argent,
            argentType: event.argentType,
            user:event.user
        }
        if (checkWichBigDay(newEvent.debut, newEvent.fin) === 1)
        {
            alert('La date de fin doit etre posterieur ou egale a la date de debut');        
            return ;
        }
        else
        {
            axios.post(url + 'event/postModif', newEvent)
            if (arg.setChangeEvent)
                arg.setChangeEvent(undefined);
            if (arg.setDateForNewEvent)
                arg.setDateForNewEvent(undefined);
        }
    }

    function handleSupEvent(myEvent){
        if (myEvent.id === -1)
            return ;
        axios.post(url + 'event/getRemoveById', {id : myEvent})
        handleQuitEvent();
    }

    function handleQuitEvent(myEvent){
        if (arg.setChangeEvent)
            arg.setChangeEvent(undefined)
        if (arg.setDateForNewEvent)
            arg.setDateForNewEvent(undefined);
    }
    return (
    <div className={'formChangeEvent '}>
        <div className="formChangeEventBtnSup">
          <i onClick={() => {handleQuitEvent()}} className="fa-solid fa-xmark formChangeEventBtnQuit"></i>
          {arg.event?<i onClick={() => {handleSupEvent(event.id)}} className="fa-solid fa-trash-can formChangeEventBtnQuit"></i>:<></>}
        </div>
        <form>
            <div className="types2">
                <h5>Type : </h5>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp formChangeEventChooseType" name='type'>
                    {event.id === -1? <></> : <option value={event.type}>{event.type}</option>}
                    <option value="Travail pro">Travail pro</option>
                    <option value="Travail perso">Travail perso</option>
                    <option value="Rdv pro">Rdv pro</option>
                    <option value="Rdv perso">Rdv perso</option>
                    <option value="Evenement expetionnel">Evenement expetionnel</option>
                    <option value="Organisation">Organisation</option>
                </select>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp" name='alarmType'>
                    {event.id === -1? <></> : <option value={event.alarmType}>{event.alarmType}</option>}
                    <option value="Reveil">Reveil</option>
                    <option value="Alarm">Alarm</option>
                    <option value="Pop">Pop</option>
                    <option value="Rien">Rien</option>
                </select>
            </div>
            <div className="types">
                <h5>Debut : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='datetime-local' className="formChangeEventChamp" name='debut' value={addZero(event.debut.getFullYear()) + '-'+ addZero(event.debut.getMonth()+1) + '-' + addZero(event.debut.getDate()) + 'T' + addZero(event.debut.getHours()) + ':' + addZero(event.debut.getMinutes())}/>
            </div>
            <div className="types">
                <h5>Fin : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='datetime-local' className="formChangeEventChamp" name='fin' value={addZero(event.fin.getFullYear()) + '-'+ addZero(event.fin.getMonth() + 1) + '-' + addZero(event.fin.getDate()) + 'T' + addZero(event.fin.getHours()) + ':' + addZero(event.fin.getMinutes())}/>
            </div>
            <div className="types2">
                <h5>Argent : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='text' className="formChangeEventChamp" name='argent' value={event.argent}/>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp" name='argentType'>
                        {event.id === -1? <></> : <option value={event.argentType}>{event.argentType}</option>}
                        {parseInt(event.argent,10) === 0 ?<option value="Rien">Rien1</option>:<></>}
                        {parseInt(event.argent,10) < 0 ?<option value="Depence sup">Depence sup</option>:<></>}
                        {parseInt(event.argent,10) < 0 ?<option value="Charge courante">Charge courante</option>:<></>}
                        {parseInt(event.argent,10) < 0 ?<option value="Charge mensuel">Charge mensuel</option>:<></>}
                        {parseInt(event.argent,10) > 0 ?<option value="Argent sup">Argent sup</option>:<></>}
                        {parseInt(event.argent,10) > 0 ?<option value="Salaire travail">Salaire travail</option>:<></>}
                        {parseInt(event.argent,10) > 0 ?<option value="Salaire immo">Salaire immo</option>:<></>}
                        
                </select>
            </div>
            <div className="types">
                <h5>Recurance : </h5>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp" name='recurance'>
                    {event.id === -1? <></> : <option value={event.recurance}>{event.recurance}</option>}
                    <option value={event.recurance}>{event.recurance}</option>
                    <option value="Jamais">Rien</option>
                    <option value="Toutes les semaines">Tout les semaine</option>
                    <option value="Tout les mois">Tout les mois</option>
                    <option value="Tout les ans">Tout les ans</option>
                </select>
            </div>
            <input onChange={(e) => {handleChangeNewEvent(e)}} value={event.titre} type='text' name='titre' className="formChangeEventChamp formChangeEventChampTitre"/>
            <textarea onChange={(e) => {handleChangeNewEvent(e)}} value={event.detail} type='textarea'  name='detail' className="formChangeEventChamp formChangeEventChampDetail"/>
            <input onClick={(e) => {handleClickNewEvent(e);}}  type='button' value={event.id === -1 ? 'Envoyez': 'Modifiez'}className="formChangeEventChamp formChangeEventChampBtn"/>
        </form>
    </div>
    );
}

export default ComposantFromChangeEvent;