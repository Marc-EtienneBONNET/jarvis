import { useState } from "react";
import { takeAllProfile, takeOneProfile, supProfile, addNewProfile, mouvProfile, mouvProfileAll, CheckPassword  } from './../../../utile/function/dataProfile'


function ComposantProfile(data) {
    let [profileTmp, setProfileTmp] = useState(data.profile)

    function handleChangeProfile(e){
        let tmp = {
            ...profileTmp,
            [e.target.name]:e.target.value,
        }
        setProfileTmp(tmp);
    }
    function handleClick(e){
        mouvProfileAll(profileTmp.id,profileTmp)
    }

    return (
    <div className="Profile">
        <form className="ProfileForm">
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputNom" name='nom' value={profileTmp.nom} placeholder="Uzumaki..."/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputPrenom" name='prenom' value={profileTmp.prenom} placeholder="Naruto..."/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputDateNaissance" name='dateNaissance' value={profileTmp.dateNaissance} placeholder="24/04/1998..."/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputAdress" name='adresse' value={profileTmp.adresse} placeholder="47 route des oiseau champtant"/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputMail" name='mail' value={profileTmp.mail} placeholder="Uzumaki@gmail..."/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputTel" name='tel' value={profileTmp.tel} placeholder="061741..."/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputLinkedin" name='linkedin' value={profileTmp.linkedin} placeholder="Lien linkedin"/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputGithub" name='github' value={profileTmp.github} placeholder="Lien github"/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputCoddingGame" name='codingGame' value={profileTmp.codingGame} placeholder="Lien codingGame"/>
            <input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputSolde" name='solde' value={profileTmp.solde} placeholder="100..."/>

            <input onClick={(e) => {handleClick(e);}}  type='button' value="Modifier" className="ProfileFormInput ProfileFormInputBtn"/>
        </form>
    </div>
    );
}

export default ComposantProfile;

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