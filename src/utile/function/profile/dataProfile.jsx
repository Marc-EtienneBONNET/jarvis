import axios from 'axios';
import { url } from './../../variable/variable'
/*
select * from profile;
select * from formations;
select * from competances;
select * from portfolio;
select * from my_event;
drop table profile;
drop table formations;
drop table competances;
drop table portfolio;
drop table my_event;

$2b$08$Lj7e5Mladk/zlvaRCcjIUe/OgVsK/RF/rFgghh3dQPLGmtOX48mYW
*/
export async function takeAllProfile(){
    let retour = (await axios.get(url + 'theProfile/supProfile')).data;
    return (retour);
}

export async function takeOneProfile(source, res){
    let retour = (await axios.post(url + 'theProfile/takeOneProfile', {source:source, res:res})).data;
    return (retour);
}

export async function supProfile(res){
    try{
        await axios.post(url + 'theProfile/supProfile', {res:res});
    }
    catch(e){
    }
}

export async function addNewProfile(profile){
    try{
        await axios.post(url + 'theProfile/addNewProfile', {profile:profile});
    }
    catch(e){
    }
}

export async function mouvProfileAll(res, profile){
    try{
        await axios.post(url + 'theProfile/mouvProfileAll', {res:res, profile:profile});
    }
    catch(e){
    }
}

export async function mouvProfile(type, res, titreModif, modif){
    try{
        await axios.post(url + 'theProfile/mouvProfile', {type:type, res:res, titreModif:titreModif, modif:modif});
    }
    catch(e){
    }
}
export async function CheckPassword(mail, password){
    try{
        console.log(url + 'theProfile/CheckPassword');
        const profile = (await axios.post(url + 'theProfile/CheckPassword', {mail:mail, password:password})).data;
        return (profile);
    }
    catch(e){
    }
}

export async function takeImgBlob(url){
    try{
        let blob = await axios.get(url, {responseType:'blob'});
        return blob.data;
    }
    catch(e){
    }
}
