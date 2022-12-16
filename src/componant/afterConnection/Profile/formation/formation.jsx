import { useState } from "react";
import { takeAllProfile, takeOneProfile, supProfile, addNewProfile, mouvProfile, mouvProfileAll, CheckPassword  } from '../../../../utile/function/dataProfile'
import ComposantBtnImg from './../btnImg/btnImg'


function ComposantFormationForm(formation, setFormation, profileTmp, setProfileTmp) {
    function handleChangeProfile(e){
       let tmp = {
        ...formation,
        [e.target.name]:e.target.value,
       }
       setFormation(tmp);
    }
    return (
        <form className="ProfileForm">
            {formation.photo?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputPrenom" name='photo' value={formation.photo} placeholder="Naruto..."/>:<></>}
            {formation.name?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputNom" name='name' value={formation.name} placeholder="Ecole 42.."/>:<></>}
            {formation.niveau?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputDateNaissance" name='niveau' value={formation.niveau} placeholder="bac+5..."/>:<></>}
            {formation.debut?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputAdress" name='debut' value={formation.debut} placeholder="24/04/19..."/>:<></>}
            {formation.fin?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputMail" name='fin' value={formation.fin} placeholder="24/04/19..."/>:<></>}
            {formation.audio?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputNom" name='audio' value={formation.audio} placeholder="Uzumaki.."/>:<></>}
            {formation.lien?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputPrenom" name='lien' value={formation.lien} placeholder="https://..."/>:<></>}
            {formation.text?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputTel" name='text' value={formation.text} placeholder="blabla..."/>:<></>}
    </form>
    );
}

export default ComposantFormationForm;

