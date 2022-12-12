import axios from 'axios';

async function takeEvents(events, profile){
    let tmp = ((await axios.post('http://localhost:3001/event/postTakeAllForOneUser', profile.profile)).data).map((element) => {
                return ({
                    ...element,
                    debut: new Date(element.debut),
                    fin: new Date(element.fin),
                });
            });
    if (!events || !events[0])
    {
        console.log(tmp);
        return tmp;
    }
    if (tmp.length !== events.length)
        return (tmp);
    for (let i = 0; tmp[i]; i++)
    {
        if (!events[i] || events[i].alarmType !== tmp[i].alarmType || events[i].type !== tmp[i].type ||
            events[i].detail !== tmp[i].detail || events[i].titre !== tmp[i].titre ||
            events[i].detail !== tmp[i].detail || events[i].recurance !== tmp[i].recurance ||
            events[i].argent !== tmp[i].argent || 
            events[i].debut.getTime() !== tmp[i].debut.getTime() || events[i].fin.getTime() !== tmp[i].fin.getTime())
                return tmp;
    }
    return ;
}

async function takeProfiles(profiles){
    let tmp = ((await axios.get('http://localhost:3001/profile/getTakeAll')).data).map((element) => {
        return ({
            ...element,
            dateNaissance: new Date(element.dateNaissance),
        });
    });
    if (!profiles || !profiles[0])
        return tmp;
    for (let i = 0; tmp[i]; i++)
    {
        if (profiles[i].nom !== tmp[i].nom || profiles[i].prenom !== tmp[i].prenom ||
            profiles[i].mail !== tmp[i].mail || profiles[i].adresse !== tmp[i].adresse ||
            profiles[i].tel !== tmp[i].tel || profiles[i].solde !== tmp[i].solde || 
            profiles[i].isConnect !== tmp[i].isConnect ||
            profiles[i].dateNaissance.getTime() !== tmp[i].dateNaissance.getTime() ||
            profiles[i].statut !== tmp[i].statut)
            return tmp;
    }
    return ;
}

export async function dataRefrech(arg){
    let events;
    let profiles;
    if (arg.events)
        events = await takeEvents(arg.events.events, arg.profile);
    if (arg.profiles)
        profiles = await takeProfiles(arg.profiles.profiles);
    if (events !== undefined || profiles !== undefined)
    {
        if (arg.events && events)
            setTimeout(() => {arg.events.setEvents(events)}, 10);
        if (arg.profiles && profiles)
            setTimeout(() => {arg.profiles.setProfile(profiles)}, 10);
    }
    else
        setTimeout(() => {dataRefrech(arg)}, 10); 
}
