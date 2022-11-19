import { useState } from 'react';
import { parsDate } from './../../../utile/function/heureDate'
import ComposantIndicateurHoraire from './pointeurHoraire/pointeurHoraire'
import ComposantEvent from './event/event'
import ComposantIndicateurHoraireLeft from './indicateurHoraireLeft/indicateurHoraireLeft'
import ComposantFromAddEvent from './formAddEvent/formAddEvent'
import ComposantFromChangeEvent from './formChangeEvent/formChangeEvent'

function ComposantSemaines() {

    let [myDate, setMyDate] = useState(new Date());
    let [newEvent, setNewEvent] = useState(false);
    let [changeEvent, setChangeEvent] = useState(undefined);

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
            if (parsDate(today).anne === parsDate(element.date).annee &&
            parsDate(today).month === parsDate(element.date).month && 
            parsDate(today).jourMonth === parsDate(element.date).jourMonth)
            {
                ifToday = 'agendaSemaineToday';
            }
            return (<div className={'agendaSemaineJour '} key={'' + semaine[day.jourSemaine]}>
                 <h4 className={'agendaSemaineJourNom '+ ifToday} onClick={() => {setChangeEvent({
                    id: -1,
                    type:'',
                    alarmType:'',
                    titre:'Titre',
                    detail:'Detail',
                    debut:new Date(),
                    fin:new Date(),
                    recurance:'',
                    argent:'',
                 })}}>{semaine[day.jourSemaine] + '. ' + day.jourMonth + ' ' + mois[day.month]}</h4>
                    {ComposantEvent(element.date, setChangeEvent)}
            </div>) 
        })
        return (res);
    }

    function handleMouvDay(myDate, day){
        let tmp = myDate.setDate(myDate.getDate() + day);
        setMyDate(new Date(tmp));
    }
    console.log(changeEvent);
        return (
            <>
            {changeEvent !== undefined ?<ComposantFromChangeEvent event={changeEvent} setChangeEvent={setChangeEvent} setNewEvent={setNewEvent}/>:<></>}
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
            </>
    );
}

export default ComposantSemaines;