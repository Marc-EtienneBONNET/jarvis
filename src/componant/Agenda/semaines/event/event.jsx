import { useState } from 'react';
import { MyEvent } from './../../../../utile/class/classEvent'
import { checkSameDay, checkWichBigDay, checkGoodDay } from './../../../../utile/function/heureDate'



function ComposantEvent(date, setChangeEvent){

    function takeListeEvent(date){
        return ([new MyEvent('Travail perso','RDV travail1', new Date(new Date(new Date().setHours(6)).setMinutes(0)), new Date(),'detail','toutes les semaines', 'Alarm', 10),
        new MyEvent('Travail perso','RDV travail2', new Date(new Date().setHours(7)), new Date(),'detail2','toutes les semaines', 'Alarm', 10),
        new MyEvent('Travail perso','RDV travail2', new Date(new Date().setHours(8)), new Date(),'detail2','toutes les semaines', 'Alarm', 10)]);
    }
    let listEvent = takeListeEvent(date);
    function createListForDivEvent(listEvent){
        let divEvent = listEvent.map(((element) => {
            if (element.debut.getDate() <= date.getDate() && element.fin.getDate() >= date.getDate() && 
            element.debut.getMonth() <= date.getMonth() && element.fin.getMonth() >= date.getMonth() && 
            element.debut.getFullYear() <= date.getFullYear() && element.debut.getFullYear() <= date.getFullYear())
                return (element);
            else if ((element.recurance === 'toutes les semaines' && element.debut.getDay() === date.getDay()) || 
                     (element.recurance === 'Tout les mois' && element.debut.getDate() === date.getDate()) || 
                     (element.recurance === 'Tout les ans' && element.debut.getMonth() === date.getMonth() && element.debut.getDate() === date.getDate()))
            {
                return (element);
            }
        }))
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
            width: 9.3/nb+'vw',
            marginLeft: (9.3/nb * position) +'vw'
        };
        let minDebut = ((event.debut.getHours() - 6) * 60) + event.debut.getMinutes();
        let minFin = ((event.fin.getHours() - 6) * 60) + event.fin.getMinutes();
        let during;
        if (checkGoodDay(event.debut, event.recurance, date) === true)
        {

            marg = minDebut/60 * 4;
            if (marg >= 0)
                res.marginTop =  marg + 'vh';
        }
        if (checkGoodDay(event.fin, event.recurance, date) === true )
        {
            if (checkGoodDay(event.debut, event.recurance, date) === true && minDebut >= 0)
            {
                during = ((minFin - minDebut)/60) * 4;
                if (during < 1.5) 
                    res.height = '1.5vh';
                else
                {
                    console.log(during)
                    res.height = during + 'vh';
                }
            }
            else{
                during = (minFin/60) *4;
                res.height = during + 'vh';
            }
        }
        else
        {
            if (event(event.debut,event.recurance, date) === false)
                during = (1080 - 0)/60;
            else 
                during = (1080 - minDebut)/60;
            res.height =  during * 4 + 'vh';
        }
        return (res);
    }
    function createDivEvent(listEvent){
        let divEvent = listEvent.map((element) => {
            if (element != undefined)
            {
                let nb = 0;
                let position = 0;
                for (let i = 0; listEvent[i]; i++)
                {
                    if (((checkWichBigDay(element.debut, listEvent[i].debut) === 1 || checkWichBigDay(element.debut, listEvent[i].debut) === 0) && 
                        (checkWichBigDay(element.debut, listEvent[i].fin) === 2 || checkWichBigDay(element.debut, listEvent[i].fin) === 0)) || 
                        ((checkWichBigDay(element.fin, listEvent[i].debut) === 1 || checkWichBigDay(element.fin, listEvent[i].debut) === 0) && 
                        (checkWichBigDay(element.fin, listEvent[i].fin) === 2 || checkWichBigDay(element.fin, listEvent[i].fin) === 0)))
                    {
                        if (element === listEvent[i])
                            position = nb;
                        nb += 1;
                    }
                }
                return (<div onClick={() => {setChangeEvent(element)}} className={'divEvent ' + chooseStyle(element)} key={element.titre} style={calculeStyle(element, nb, position)}>
                    <h4 className='divEventTitre'>{element.titre}</h4>
                    <h5 className='divEventDetail'>{element.detail}</h5>
                </div>);
            }
        })
        return (divEvent);
    }
    return (createDivEvent(createListForDivEvent(listEvent)));
}

export default ComposantEvent;