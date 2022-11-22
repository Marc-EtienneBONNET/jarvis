import { useState } from 'react';
import { parsDate } from './../../../utile/function/heureDate'
import ComposantIndicateurHoraire from './pointeurHoraire/pointeurHoraire'
import ComposantEvent from './event/event'
import ComposantIndicateurHoraireLeft from './indicateurHoraireLeft/indicateurHoraireLeft'
import ComposantFromChangeEvent from './formChangeEvent/formChangeEvent'
import axios from 'axios';

function ComposantSemaines() {

    let [myDate, setMyDate] = useState(new Date());
    let [listEvent, setlistEvent] = useState();
    let [changeEvent, setChangeEvent] = useState(undefined);

    async function takeListeEvent(){
        let tmp = (await axios.get('http://localhost:3001/event/getTakeAll')).data;
        let res = tmp.map((element) => {
            return ({
                ...element,
                debut: new Date(element.debut),
                fin: new Date(element.fin),
            });
        })
        setlistEvent(res);
    }
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
            console.log(element.date);
            if (today.getFullYear() === element.date.getFullYear() &&
            today.getMonth() === element.date.getMonth() &&
            today.getDate() === element.date.getDate())
                ifToday = 'agendaSemaineToday';
            return (<div className={'agendaSemaineJour '} key={'' + semaine[day.jourSemaine]}>
                 <h4 className={'agendaSemaineJourNom '+ ifToday} onClick={() => {setChangeEvent({
                    id: -1,
                    type:'Travail perso',
                    alarmType:'Rien',
                    titre:'Titre',
                    detail:'Detail',
                    debut:new Date(element.date),
                    fin:new Date(new Date(element.date).setHours(new Date(element.date).getHours() + 1)),
                    recurance:'Rien',
                    argent:0,
                 })}}>{semaine[day.jourSemaine] + '. ' + day.jourMonth + ' ' + mois[day.month]}</h4>
                    {ComposantEvent(element.date, setChangeEvent, listEvent)}
            </div>) 
        })
        return (res);
    }

    function handleMouvDay(myDate, day){
        let tmp = myDate.setDate(myDate.getDate() + day);
        setMyDate(new Date(tmp));
    }
    setTimeout(takeListeEvent, 1000);
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
            {changeEvent !== undefined ?<ComposantFromChangeEvent event={changeEvent} setChangeEvent={setChangeEvent}/>:<></>}
            </>
    );
}

export default ComposantSemaines;