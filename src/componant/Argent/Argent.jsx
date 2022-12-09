import { useState } from "react";
import axios from 'axios';
import { dataRefrech } from '../../utile/function/dataFunction' 
import { arrondiDate } from './../../utile/function/heureDate'
import { mois } from './../../utile/variable/variable';
import ComposantFromChangeEvent from './../../componant/Agenda/utile/formChangeEvent/formChangeEvent'
import { checkGoodDay } from './../../utile/function/heureDate'
import ComposantEventsArgents from './composantEventsArgent/ComposantEventsArgent'
import ComposantStateArgents from './composantStateArgent/ComposantStateArgent'
import ComposantMothClefArgent from './composantMothClefArgent/composantMothClefArgent'

function ComposantArgent() {
    let [profiles, setProfiles] = useState([]);
    let [events, setEvents] = useState([]);
    let [date, setDate] = useState(new Date());
    let [dateForNewEvent, setDateForNewEvent] = useState(undefined);
    let [changeEvent, setChangeEvent] = useState(undefined);
    // let [mothClef, setMothClef] = useState(['Depence sup','Charge courante', 'Charge mensuel', 'Salaire travail','Salaire immo', 'Argent sup']);
    let [mothClef, setMothClef] = useState({
        depenceSup:true,
        chargeCourante:true,
        chargeMensuel:true, 
        salaireTravail:true,
        salaireImmo:true,
        argentSup:true
    });



    dataRefrech({profiles:{profiles:profiles, setProfile:setProfiles}, events:{events:events, setEvents:setEvents}});
    if (changeEvent && dateForNewEvent)
        setDateForNewEvent(undefined);

    return (
    <div className="Argent">
        <div className="ArgentSolde"> 
        </div>
        <div className="ArgentDetail">
            <div>
                <div className="ArgentChoosMonth">
                    <i onClick={() => {setDate(new Date(new Date(date).setMonth(date.getMonth() - 1)))}} className="fa-solid fa-arrow-left AgendaSemaineListeJoursfleche"></i>
                    <h4>{mois[date.getMonth()]}</h4>
                    <i onClick={() => {setDate(new Date(new Date(date).setMonth(date.getMonth() + 1)))}}  className="fa-solid fa-arrow-right AgendaSemaineListeJoursfleche"></i>
                </div>
                <div className="ArgentMouvementsArgents">
                    {ComposantEventsArgents(events,setChangeEvent,date, mothClef)}
                </div>
            </div>
            <div>
                {ComposantMothClefArgent(mothClef, setMothClef)}
                {ComposantStateArgents(events, date, profiles)}
                <i onClick={() => {setDateForNewEvent(new Date())}} className="fa-solid fa-plus ArgentSoldeBtnPlus"></i>
            </div>
        </div>
        {changeEvent !== undefined && !dateForNewEvent?<ComposantFromChangeEvent event={changeEvent} setChangeEvent={setChangeEvent}/>:<></>}
        {dateForNewEvent !== undefined &&  !changeEvent?<ComposantFromChangeEvent titre='Dépance' date={dateForNewEvent} setDateForNewEvent={setDateForNewEvent}/>:<></>}
    </div>
    );
}

export default ComposantArgent;