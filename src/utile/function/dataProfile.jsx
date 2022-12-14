import axios from 'axios';
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
*/
export async function takeAllProfile(){
    let retour = (await axios.get('http://localhost:3001/theProfile/supProfile')).data;
    return (retour);
}

export async function takeOneProfile(source, res){
    let retour = (await axios.post('http://localhost:3001/theProfile/takeOneProfile', {source:source, res:res})).data;
    return (retour);
}

export async function supProfile(res){
    try{
        await axios.post('http://localhost:3001/theProfile/supProfile', {res:res});
    }
    catch(e){
        console.log('Error: la supretion du profile n as pas pus etre effectuer');
    }
}

export async function addNewProfile(profile){
    try{
        await axios.post('http://localhost:3001/theProfile/addNewProfile', {profile:profile});
    }
    catch(e){
        console.log('Error: l\'ajoue du profile a echouer');
    }
}

export async function mouvProfileAll(res, profile){
    try{
        await axios.post('http://localhost:3001/theProfile/mouvProfileAll', {res:res, profile:profile});
    }
    catch(e){
        console.log('Error: la modification du profile a echouer');
    }
}

export async function mouvProfile(type, res, titreModif, modif){
    try{
        await axios.post('http://localhost:3001/theProfile/mouvProfile', {type:type, res:res, titreModif:titreModif, modif:modif});
    }
    catch(e){
        console.log('Error: la modification du profile a echouer');
    }
}
export async function CheckPassword(mail, password){
    try{
        const profile = (await axios.post('http://localhost:3001/theProfile/CheckPassword', {mail:mail, password:password})).data;
        return (profile);
    }
    catch(e){
        console.log('Error: l\'identification du profile a echouer');
    }
}