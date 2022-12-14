import { useState } from "react";
import { takeAllProfile, takeOneProfile, supProfile, addNewProfile, mouvProfile, mouvProfileAll, CheckPassword  } from '../../../../utile/function/dataProfile'


function ComposantFormationForm(formation, setFormation, profileTmp, setProfileTmp) {
    function handleChangeProfile(e){
       let tmp = {
        ...formation,
        [e.target.name]:e.target.value,
       }
       setFormation(tmp);
    }
    function handleClickFormation(e){
        let tmp = {
         ...profileTmp,
        }
        if (formation.id === -1)
        {
            tmp.formations.push(formation);
        }
        else
        {
            for (let i = 0;tmp.formations[i]; i++)
            {
                if (tmp.formations[i].id === formation.id)
                    tmp.formations[i] = formation
            }
        }
        setProfileTmp(tmp);
        mouvProfileAll(profileTmp.id,profileTmp)
     }
    return (
        <form className="ProfileForm">
    <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputNom" name='name' value={formation.name} placeholder="Uzumaki..."/>
    <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputPrenom" name='photo' value={formation.photo} placeholder="Naruto..."/>
    <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputDateNaissance" name='niveau' value={formation.niveau} placeholder="24/04/1998..."/>
    <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputAdress" name='debut' value={formation.debut} placeholder="47 route des oiseau champtant"/>
    <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputMail" name='fin' value={formation.fin} placeholder="Uzumaki@gmail..."/>
    <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputTel" name='text' value={formation.text} placeholder="061741..."/>
    <input onClick={(e) => {handleClickFormation(e)}}  type='button' value={formation.id === -1?'Ajoutez':'Modifier'} className="ProfileFormInput ProfileFormInputBtn"/>
    </form>
    );
}

export default ComposantFormationForm;

/* <form>
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
        </form>*/