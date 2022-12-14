import { useState } from 'react';
import { parsDate } from './../../../../utile/function/heureDate'
import ComposantIndicateurHoraire from './pointeurHoraire/pointeurHoraire'
import ComposantEvent from './event/event'
import ComposantIndicateurHoraireLeft from './indicateurHoraireLeft/indicateurHoraireLeft'
import ComposantFromChangeEvent from '../../ComposantGestionEvent/formChangeEvent'
import axios from 'axios';
import { dataRefrech } from './../../../../utile/function/dataUpdateEvents' 

function ComposantSemaines(data) {

    let [myDate, setMyDate] = useState(new Date());
    let [events, setEvents] = useState();
    let [changeEvent, setChangeEvent] = useState(undefined);
    let [dateForNewEvent, setDateForNewEvent] = useState(undefined);

    function createDay(myDate){
        let date = new Date(myDate);
        let semaine = [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        let mois = ['Janv', 'Fevr', 'Mars', 'Avri', 'Mais', 'Juin', 'Juil', 'Aout', 'Sept', 'Octo', 'Nove', 'Dece'];
        let tmp = [{date:new Date(date)},
            {date:new Date(date.setDate(date.getDate()+1))},
            {date:new Date(date.setDate(date.getDate()+1))},
            {date:new Date(date.setDate(date.getDate()+1))},
            {date:new Date(date.setDate(date.getDate()+1))},
            {date:new Date(date.setDate(date.getDate()+1))},
            {date:new Date(date.setDate(date.getDate()+1))}];
            
        let today = new Date();
        let res = tmp.map(element => {
            let day = parsDate(element.date);
            let ifToday = '';
            if (today.getFullYear() === element.date.getFullYear() &&
            today.getMonth() === element.date.getMonth() &&
            today.getDate() === element.date.getDate())
                ifToday = 'agendaSemaineToday';
            return (<div className={'agendaSemaineJour '} key={'' + semaine[element.date.getDay()]}>
                 <h4 className={'agendaSemaineJourNom '+ ifToday} onClick={() => {setDateForNewEvent(element.date)}}>{semaine[element.date.getDay()] + '. ' + element.date.getDate() + ' ' + mois[element.date.getMonth()]}</h4>
                    {ComposantEvent(element.date, setChangeEvent, events)}
            </div>) 
        })
        return (res);
    }

    function handleMouvDay(myDate, day){
        let tmp = myDate.setDate(myDate.getDate() + day);
        setMyDate(new Date(tmp));
    }
    dataRefrech({profile:{profile:data.profile}, events:{events:events, setEvents:setEvents}});
    
    return (
            <>
        <div className='agendaSemaine'>
            <ComposantIndicateurHoraire date={new Date(new Date())}/>
            <div className='agendaSemaineDay'>
                <ComposantIndicateurHoraireLeft/>
                <div className='AgendaSemaineListeJours'>
                    <i onClick={() => {handleMouvDay(myDate, -1)}} className="fa-solid fa-arrow-left AgendaSemaineListeJoursfleche"></i>
                    {createDay(myDate)}
                    <i onClick={() => {handleMouvDay(myDate, 1)}} className="fa-solid fa-arrow-right AgendaSemaineListeJoursfleche"></i>                    
                </div>
            </div>
        </div>
        {changeEvent !== undefined && !dateForNewEvent?<ComposantFromChangeEvent event={changeEvent} setChangeEvent={setChangeEvent} profile={data.profile}/>:<></>}
        {dateForNewEvent !== undefined &&  !changeEvent?<ComposantFromChangeEvent date={dateForNewEvent} setDateForNewEvent={setDateForNewEvent} profile={data.profile}/>:<></>}
            </>
    );
}

export default ComposantSemaines;