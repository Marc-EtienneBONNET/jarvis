import { useState } from "react";
import { takeAllProfile,takeImgBlob, takeOneProfile, supProfile, addNewProfile, mouvProfile, mouvProfileAll, CheckPassword  } from '../../../../utile/function/profile/dataProfile'
import BtnImg from './../btnImg/btnImg'
import audioBtn from './../audioBtn/audioBtn'


function ComposantFormationForm(formation, setFormation, nameId) {
    let [imgFormations, setImgFormations] = useState();
    let [imgName, setImgName] = useState();
    
    let [audio, setAudio] = useState();
    let [audioName, setAudioName] = useState();
    function handleChangeProfile(e){
        let tmp = {...formation};
        if (e && e.target)
        {
            tmp[e.target.name] = e.target.value;
            if (tmp[e.target.name] === '')
                tmp[e.target.name] = ' ';
        }
        if (imgName)
        {
            tmp.photo = imgName;
            setImgName();
        }
        if (audioName)
        {
            tmp.audio = audioName;
            setAudioName();
        }
       setFormation(tmp);
    }

    async function initBtnImg(nameImg, InputId, img, setImgName, setImg ) {
            let tmpBlob;
            if (nameImg[1])
                tmpBlob = await takeImgBlob('http://localhost:3001/theProfile/sendImage' + nameImg);
            let tmp = await  BtnImg(tmpBlob, InputId, setImgName);
            if (!img || (tmp && tmp.props.name != img.props.name))
                setImg(tmp);
    }
    async function initBtnAudio(InputId, img, setImgName, setImg ) {
        let tmp = await  audioBtn(InputId, setImgName);
        if (!img || (tmp && tmp.props.name != img.props.name))
            setImg(tmp);
}
    initBtnImg(formation.photo,nameId, imgFormations, setImgName,setImgFormations);
    if (formation.audio)
        initBtnAudio('InputIdForPhotoAudio', audio, setAudioName, setAudio);
    if ((imgName && formation.photo !== imgName) || (audioName && formation.audio !== audioName))
        handleChangeProfile();
    return (
        <form className="ProfileForm">
            {imgFormations ?imgFormations:<></>}
            {audio ?<><h4>audio : </h4>{audio}</>:<></>}
            {formation.category?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputNom" name='category' value={formation.category} placeholder="Dev web.."/>:<></>}
            {formation.name?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputNom" name='name' value={formation.name} placeholder="Ecole 42.."/>:<></>}
            {formation.niveau?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputDateNaissance" name='niveau' value={formation.niveau} placeholder="bac+5..."/>:<></>}
            {formation.debut?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputAdress" name='debut' value={formation.debut} placeholder="24/04/19..."/>:<></>}
            {formation.fin?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputMail" name='fin' value={formation.fin} placeholder="24/04/19..."/>:<></>}
            {formation.lien?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputPrenom" name='lien' value={formation.lien} placeholder="http://..."/>:<></>}
            {formation.text?<input onChange={(e) => {handleChangeProfile(e)}} type='text' className="ProfileFormInput ProfileFormInputTel" name='text' value={formation.text} placeholder="blabla..."/>:<></>}
    </form>
    );
}
// Développement algorithmique
export default ComposantFormationForm;

