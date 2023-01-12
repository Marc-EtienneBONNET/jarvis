import axios from 'axios';
import { url } from './../variable/variable'

async function takeEvents(events, profile){
    let tmp = ((await axios.post(url + 'event/postTakeAllForOneUser', profile.profile)).data).map((element) => {
                return ({
                    ...element,
                    debut: new Date(element.debut),
                    fin: new Date(element.fin),
                });
            });
    if (!events || !events[0])
        return tmp;
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

export async function dataRefrech(arg){
    let events;
    if (arg.events)
        events = await takeEvents(arg.events.events, arg.profile);
    if (events !== undefined)
    {
        if (arg.events && events)
            setTimeout(() => {arg.events.setEvents(events)}, 10);
    }
    else
        setTimeout(() => {dataRefrech(arg)}, 10); 
}
