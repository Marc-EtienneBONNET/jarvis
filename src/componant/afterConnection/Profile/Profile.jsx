import { useState, useRef } from "react";
import { takeAllProfile, takeImgBlob, takeOneProfile, supProfile, addNewProfile, mouvProfile, mouvProfileAll, CheckPassword  } from '../../../utile/function/profile/dataProfile'
import ComposantFormationForm from './formation/formation'
import BtnImg from './btnImg/btnImg';            



function ComposantProfile(data) {
    let [profileTmp, setProfileTmp] = useState(data.profile)
    let [formation, setFormation] = useState({id:-1,name:'G',photo:' ',niveau:' ',debut:' ',fin:' ',text:' ',idProfile:profileTmp.id});
    let [competance, setCompetance] = useState({id:-1,name:'H',photo:' ',text:' ',idProfile:profileTmp.id});
    let [portfolio, setPortfolio] = useState({id:-1,name:'I',photo:' ',audio:' ',lien:' ',text:' ',idProfile:profileTmp.id});
    let [imgProfile, setImgProfile] = useState();


    function handleChangeProfile(e){
        let tmp = {
            ...profileTmp,
            [e.target.name]:e.target.value,
        }
        setProfileTmp(tmp);
    }
    function save(category){
        let tmp = {
            ...profileTmp,
           }
        let newElement;
        if (category === 'formations')
            newElement = formation;
        else if (category === 'competances')
            newElement = competance;
        else if (category === 'portfolio')
            newElement = portfolio;
        if (newElement.id === -1 && newElement.name[1])
            tmp[category].push(newElement);
        else{
            for (let i = 0;tmp[category][i]; i++)
            {
                if (tmp[category][i].id === newElement.id)
                tmp[category][i] = newElement;
            }
        }
    }

    function handleClick(e){
        save('formations');
        save('competances');
        save('portfolio');
        mouvProfileAll(profileTmp.id,profileTmp)
        alert('La data a bien etait enregistrer !')
    }

    function createOptionFormation(data){
        if (!data)
            return;
        let i = 0;
        let res = data.map((element) => {
            let tmp =<option key={element.id} value={i}>{element.name}</option> 
            i++;
            return tmp;
        })
        return (res);
    }
    function ftMouvImgProfile(name){
        setProfileTmp({
            ...profileTmp,
            photo:name,
        })
    }


    async function initBtnImg() {
        try{
            let tmpBlob = await takeImgBlob('http://localhost:3001/theProfile/sendImage' + profileTmp['photo']);
            let tmp = await  BtnImg(tmpBlob, 'InputIdForPhotoProfile', ftMouvImgProfile);
            if (!imgProfile || (tmp && tmp.props.name != imgProfile.props.name))
            {
                setImgProfile(tmp);
            }
            
        } catch(e){
        }
    } 
    initBtnImg();
    return (
    <div className="Profile">
        <form className="ProfileForm">
            {imgProfile ?imgProfile:<></>}

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
            <input onClick={(e) => {handleClick(e);}}  type='button' value="Modifier" className="ProfileFormInput ProfileFormInputBtn" placeholder="test"/>

        </form>
        <div>

            <select onChange={(e) => {e.target.value != -1 ? setFormation(profileTmp.formations[e.target.value]):setFormation({id:-1,name:'D',photo:'2',niveau:' ',debut:' ',fin:' ',text:' ',idProfile:profileTmp.id})}} id="pet-select" className="ProfileFormInput" name='formation'>
                <option value={-1}>Add formations</option>
                {createOptionFormation(profileTmp.formations)}
            </select>
            {ComposantFormationForm(formation, setFormation, 'InputIdForPhotoFormation')}
        </div>
        <div>
            <select onChange={(e) => {e.target.value != -1 ? setCompetance(profileTmp.competances[e.target.value]):setCompetance({id:-1,name:'E',photo:' ',text:' ',idProfile:profileTmp.id})}} id="pet-select" className="ProfileFormInput" name='competance'>
                <option value={-1}>Add formations</option>
                {createOptionFormation(profileTmp.competances)}
            </select>
            {ComposantFormationForm(competance, setCompetance, 'InputIdForPhotoCompetance')}
        </div>
        <div>
            <select onChange={(e) => {e.target.value != -1 ? setPortfolio(profileTmp.portfolio[e.target.value]):setPortfolio({id:-1,name:'F',photo:' ',audio:' ',lien:' ',text:' ',idProfile:profileTmp.id})}} id="pet-select" className="ProfileFormInput" name='competance'>
                <option value={-1}>Add formations</option>
                {createOptionFormation(profileTmp.portfolio)}
            </select>
            {ComposantFormationForm(portfolio, setPortfolio, 'InputIdForPhotoPortfolio')}
        </div>
    </div>
    );
}

export default ComposantProfile;
