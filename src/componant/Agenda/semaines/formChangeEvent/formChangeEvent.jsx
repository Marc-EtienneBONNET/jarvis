import { useState } from "react";
import { checkWichBigDay } from '../../../../utile/function/heureDate'

function ComposantFromChangeEvent(arg){

    let [event, setEvent] = useState({
        id: arg.event.id,
        type:arg.event.type,
        alarmType:arg.event.alarmType,
        titre:' '+arg.event.titre,
        detail:' '+arg.event.detail,
        debut:arg.event.debut,
        fin: arg.event.fin,
        recurance:arg.event.recurance,
        argent:arg.event.argent,
    });


    function handleChangeNewEvent(e){
        
        let res = e.target.value;
        
        if (!e || !e.target || !e.target.value || !e.target.name)
            return ;
        if (e.target.name === 'debut' || e.target.name === 'fin' )
            res = new Date(res);
        let tmp = {
            ...event,
            [e.target.name]:res,
        };
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
        }
        if (checkWichBigDay(newEvent.debut, newEvent.fin) === 1)
        {
            alert('La date de fin doit etre posterieur ou egale a la date de debut');        
            return ;
        }
        else
        {
            if (newEvent.id === -1)
            {
                console.log(newEvent);
                console.log('Evenement enregistrer !');
                arg.setChangeEvent(undefined);
            }
            else if (arg.event){
                console.log('Modif effectuer !');
                arg.setChangeEvent(undefined);
            }
        }
    }

    return (
    <div className={'formChangeEvent '}>
        <div className="formChangeEventBtnSup">
          <i onClick={() => {arg.setChangeEvent(undefined)}} className="fa-solid fa-xmark formChangeEventBtnQuit"></i>
          <i onClick={() => {arg.setChangeEvent(undefined)}} className="fa-solid fa-trash-can formChangeEventBtnQuit"></i>
        </div>
        <form>
            <div className="types2">
                <h5>Type : </h5>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp formChangeEventChooseType" name='type'>
                    {arg.event.id === -1? <></> : <option value={arg.event.type}>{arg.event.type}</option>}
                    <option value="Travail pro">Travail pro</option>
                    <option value="Travail perso">Travail perso</option>
                    <option value="Rdv pro">Rdv pro</option>
                    <option value="Rdv perso">Rdv perso</option>
                    <option value="Evenement expetionnel">Evenement expetionnel</option>
                    <option value="Organisation">Organisation</option>
                </select>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp" name='alarmType'>
                    {arg.event.id === -1? <></> : <option value={arg.event.alarmType}>{arg.event.alarmType}</option>}
                    <option value="Reveil">Reveil</option>
                    <option value="Alarm">Alarm</option>
                    <option value="Pop">Pop</option>
                    <option value="Rien">Rien</option>
                </select>
            </div>
            <div className="types">
                <h5>Debut : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='datetime-local' className="formChangeEventChamp" name='debut' value={addZero(event.debut.getFullYear()) + '-'+ addZero(event.debut.getMonth()) + '-' + addZero(event.debut.getDate()) + 'T' + addZero(event.debut.getHours()) + ':' + addZero(event.debut.getMinutes())}/>
            </div>
            <div className="types">
                <h5>Fin : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='datetime-local' className="formChangeEventChamp" name='fin' value={addZero(event.fin.getFullYear()) + '-'+ addZero(event.fin.getMonth()) + '-' + addZero(event.fin.getDate()) + 'T' + addZero(event.fin.getHours()) + ':' + addZero(event.fin.getMinutes())}/>
            </div>
            <div className="types">
                <h5>Argent : </h5>
                <input onChange={(e) => {handleChangeNewEvent(e)}} type='number' className="formChangeEventChamp" name='argent' value={event.argent === 0 ? "" : event.argent}/>
            </div>
            <div className="types">
                <h5>Recurance : </h5>
                <select onChange={(e) => {handleChangeNewEvent(e)}} id="pet-select" className="formChangeEventChamp" name='recurance'>
                    {arg.event.id === -1? <></> : <option value={arg.event.recurance}>{arg.event.recurance}</option>}
                    <option value="Jamais">Rien</option>
                    <option value="toutes les semaines">Tout les semaine</option>
                    <option value="Tout les mois">Tout les mois</option>
                    <option value="Tout les ans">Tout les ans</option>
                </select>
            </div>
            <input onChange={(e) => {handleChangeNewEvent(e)}} value={event.titre} type='text' name='titre' className="formChangeEventChamp formChangeEventChampTitre"/>
            <textarea onChange={(e) => {handleChangeNewEvent(e)}} value={event.detail} type='textarea'  name='detail' className="formChangeEventChamp formChangeEventChampDetail"/>
            <input onClick={(e) => {handleClickNewEvent(e)}}  type='button' value={arg.event.id === -1 ? 'Modifiez': 'Envoyez'}className="formChangeEventChamp formChangeEventChampBtn"/>
        </form>
    </div>
    );
}

export default ComposantFromChangeEvent;