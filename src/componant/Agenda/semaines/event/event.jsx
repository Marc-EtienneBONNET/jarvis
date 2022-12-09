import axios from 'axios';
import { useState } from 'react';
import { MyEvent } from './../../../../utile/class/classEvent'
import { checkSameDay, checkWichBigDay, checkGoodDay } from './../../../../utile/function/heureDate'



function ComposantEvent(date, setChangeEvent, listEvent){
    function createListForDivEvent(){
        let divEvent=[];
        for (let i = 0;listEvent && listEvent[i]; i++)
        {
            let tmpdateDebut = new Date(listEvent[i].debut);
            let tmpdateFin = new Date(listEvent[i].fin);
            let dateDebut = new Date(tmpdateDebut.setHours(0));
            let dateFin = new Date(new Date(tmpdateFin.setHours(23)).setMinutes(59));
            if (date.getTime() >= dateDebut.getTime() && date.getTime() <= dateFin.getTime() )
                divEvent.push(listEvent[i])
            else if ((listEvent[i].recurance === 'Toutes les semaines' && (listEvent[i].debut.getDay() <= date.getDay() &&listEvent[i].fin.getDay() >= date.getDay() )) || 
                     (listEvent[i].recurance === 'Tout les mois' && (listEvent[i].debut.getDate() <= date.getDate() && listEvent[i].fin.getDate() >= date.getDate())) || 
                     (listEvent[i].recurance === 'Tout les ans' && (listEvent[i].debut.getMonth() <= date.getMonth() && listEvent[i].fin.getMonth() >= date.getMonth()) && (listEvent[i].debut.getDate() <= date.getDate() && listEvent[i].fin.getDate() >= date.getDate())))
                divEvent.push(listEvent[i])
        }
        return (divEvent);
    }
    
    function chooseStyle(event)
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

    function calculeStyle(event, nb, position)
    {
        let marg;
        let res = {
            marginTop: '0vh',
            height: '0vh',
            width: 11/nb+'vw',
            // width: '0vw',
            marginLeft: (11/nb * position) +'vw'
        };
        let minDebut = ((event.debut.getHours() - 6) * 60) + event.debut.getMinutes();
        let minFin = ((event.fin.getHours() - 6) * 60) + event.fin.getMinutes();
        let during = 0;
        if (checkGoodDay(event.debut, event.recurance, date) === true)
        {
            marg = minDebut/60 * 4;
            if (marg >= 0)
                res.marginTop =  marg + 'vh';
        }
        if (checkGoodDay(event.fin, event.recurance, date) === true )
        {
            if (checkGoodDay(event.debut, event.recurance, date) === true)
            {
                during = ((minFin - minDebut)/60) * 4;
                
                if (during < 1.5) 
                    res.height = '1.5vh';
                else
                    res.height = during + 'vh';
            }
            else{
                during = (minFin/60) *4;
                res.height = during + 'vh';
            }
        }
        else
        {
            if (checkGoodDay(event.debut, event.recurance, date) === false)
                during = (1080 - 0)/60;
            else 
                during = (1080 - minDebut)/60;
            res.height =  during * 4 + 'vh';
        }
        return (res);
    }

    function createDivEvent(listEvent){

        if (!listEvent || !listEvent[0])
            return ;
        let tmpEvent = [];
        for (let i = 0; listEvent[i]; i++)
        {
            tmpEvent[i] = {
                nb: 1,
                pos: 0,
                event:{},
            };
            for (let x = 0; listEvent[x]; x++)
            {
                if (listEvent[i].id !== listEvent[x].id) 
                {
                    if((listEvent[i].debut.getTime() < listEvent[x].fin.getTime() && listEvent[i].fin.getTime() >= listEvent[x].debut.getTime()) || 
                    (listEvent[x].debut.getTime() < listEvent[i].fin.getTime() && listEvent[x].fin.getTime() >= listEvent[i].debut.getTime()))
                    {
                        if (x < i)
                            tmpEvent[i].pos += 1; 
                        tmpEvent[i].nb += 1;
                    }
                }
                tmpEvent[i].event =  listEvent[i];
            }
        }
        let divEvent = tmpEvent.map((element) => {
            if (element != undefined)
            {
                return (<div onClick={() => {setChangeEvent(element.event)}} className={'divEvent ' + chooseStyle(element.event)} key={element.event.titre} style={calculeStyle(element.event, element.nb, element.pos)}>
                    <h5 className='divEventTitre'>{element.event.titre}</h5>
                    <h6 className='divEventDetail'>{element.event.detail}</h6>
                </div>);
            }
        })
        return (divEvent);
    }
    return (createDivEvent(createListForDivEvent(listEvent)));
}

export default ComposantEvent;