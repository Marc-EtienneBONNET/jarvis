import { useState } from 'react';
import { checkSameDay } from './../../../utile/function/heureDate'
import axios from 'axios';
import { event } from '../../../utile/class/classEvent'



function ComposantMois() {

    let [date, setDate] = useState(new Date());
    let Month = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre']
    let [listEvent, setlistEvent] = useState();

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

    function createListForDivEvents(date){
        let divEvent=[];
        for (let i = 0;listEvent && listEvent[i]; i++)
        {
            let dateDebut = new Date(listEvent[i].debut.setHours(0));
            let dateFin = new Date(new Date(listEvent[i].fin.setHours(23)).setMinutes(59));
            if (date.getTime() >= dateDebut.getTime() && date.getTime() <= dateFin.getTime() )
                divEvent.push(listEvent[i])
            else if ((listEvent[i].recurance === 'toutes les semaines' && (listEvent[i].debut.getDay() <= date.getDay() &&listEvent[i].fin.getDay() >= date.getDay() )) || 
                     (listEvent[i].recurance === 'Tout les mois' && (listEvent[i].debut.getDate() <= date.getDate() && listEvent[i].fin.getDate() >= date.getDate())) || 
                     (listEvent[i].recurance === 'Tout les ans' && (listEvent[i].debut.getMonth() <= date.getMonth() && listEvent[i].fin.getMonth() >= date.getMonth()) && (listEvent[i].debut.getDate() <= date.getDate() && listEvent[i].fin.getDate() >= date.getDate())))
                divEvent.push(listEvent[i])
        }
        return (divEvent);
    }
    function CreateDivEvents(myDate){
        if (!myDate.date)
            return;
        let date = new Date(myDate.date.setDate(myDate.date.getDate() -1));
        let tabEvent = createListForDivEvents(date);
        let res = tabEvent.map((element) => {
            return (<h5 key={element.id} className={'AgendaMoiDayEvent '+chooseStyleByTipe(element)}>{element.titre}</h5>);
        });
        return (res);
    }
    function chooseStyleByTipe(event)
    {
        let res = '';
        switch(event.type){
            case 'Travail pro':
                    res = 'specialTravailPro';
            break;
            case 'Travail perso':
                res = 'specialTravailPerso';
            break;
            case 'Rdv pro':
                res = 'specialRdvPro';
            break;
            case 'Rdv perso':
                res = 'specialRdvPerso';
            break;
            case 'Evenement expetionnel':
                res = 'specialEvenementExeptionnel';
            break;
            case 'Organisation':
                res = 'specialOrganisation';
            break;
            default :
            break;
        }
        return (res);
    }
   function CreateStyleDay(day)
   {
        let style = {
            date:{
                background: 'transparant',
            },
            case:{
                opacity:'80%',
            }
        };
        if (checkSameDay(day, new Date()) === true)
            style.date.background = 'red';
        if (day.getMonth() !== new Date().getMonth() || day.getFullYear() !== new Date().getFullYear())
            style.case.opacity = '30%';
        return (style);
   }
   function CreateDivDay(date)
    {
        let dateDebut = new Date(date.date.setDate(1));
        let dateFin = new Date(date.date.setDate(28));
        let tabDay = [];
        let nbLigne = 0;
        let day = ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']

        while  (dateDebut.getDay() != 1)
            dateDebut = new Date(dateDebut.setDate(dateDebut.getDate() - 1));
        while  (dateFin.getMonth() === date.date.getMonth() || dateFin.getDay() !== 1)
            dateFin = new Date(dateFin.setDate(dateFin.getDate() + 1));
        nbLigne = ((dateFin.getTime() - dateDebut.getTime())/86400000)/7;
        console.log(nbLigne);
        for (let i; dateDebut.getTime() !== dateFin.getTime(); i++)
        {
            let style = CreateStyleDay(dateDebut)
            tabDay.push(
                <div className='AgendaMoiDay' key={dateDebut.getTime()} style={{height:77/nbLigne+'vh', ...style.case}}>
                    <h5 className='AgendaMoiDayDate' style={style.date}>{dateDebut.getDate()}  {day[dateDebut.getDay()]}</h5>
                    <div>
                        <CreateDivEvents date={dateDebut}/>
                    </div>
                </div>
            );
            dateDebut = new Date(dateDebut.setDate(dateDebut.getDate() + 1));
        }
        let divDay = tabDay.map((element) => {
            return (element);
        })
        return (divDay);
    }

    function handleMouveDate(witch){
        setDate(new Date(date.setMonth(date.getMonth() + witch)));
    }
    setTimeout(takeListeEvent, 1000);
    return (
        <div className='AgendaMois'>
            <div className='AgendaMoisMenu'>
                <i onClick={() => {handleMouveDate(-1)}} className="fa-solid fa-arrow-left AgendaSemaineListeJoursfleche"></i>
                <h3 className='AgendaMoisTitreMois'>{Month[date.getMonth()]}</h3>
                <i onClick={() => {handleMouveDate(1)}} className="fa-solid fa-arrow-right AgendaSemaineListeJoursfleche"></i>
            </div>
           
            <div className='colonnesDay'>
                <CreateDivDay date={date}/>
            </div>
        </div>
    );
}

export default ComposantMois;