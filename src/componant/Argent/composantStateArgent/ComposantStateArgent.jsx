import { arrondiDate } from './../../../utile/function/heureDate'
import { checkGoodDay } from '../../../utile/function/heureDate'

function ComposantStateArgents(events, date, myProfile){
    let state = {
        argent:0,
        argentPrevisionnel:0,
        chargeMensuel:0,
        chargeCourante:0,
        depenceSup:0,
        salaireTravail:0,
        salaireImmo:0,
        argentSup:0,
        depenceMensuelTotale:0,
        revenuMensuelTotale:0,
    }
    let myEvents = [];

    function trieEvents(){

        let dateTmpDeb = arrondiDate(date,5);
        let dateTmpFin = arrondiDate(new Date(new Date(date).setMonth(date.getMonth() + 1)), 5);

        while (dateTmpDeb < dateTmpFin)
        {
            let dateDay = new Date(dateTmpDeb);
            for (let i = 0; events[i]; i++)
            {
                if (events[i].argent !== 0 && checkGoodDay(events[i].debut, events[i].recurance, dateDay) === true){
                    if ((events[i].recurance === 'Toutes les semaines' && events[i].debut.getDay() === dateDay.getDay()) || 
                        (events[i].recurance === 'Tout les mois' && events[i].debut.getDate() === dateDay.getDate()) || 
                        (events[i].recurance === 'Tout les ans' && events[i].debut.getMonth() === dateDay.getMonth() && events[i].debut.getDate() === dateDay.getDate()))
                    {
                        myEvents.push({
                            ...events[i],
                            ['debut']:new Date(dateDay),
                        })
                    }
                    else 
                        myEvents.push(events[i])
                }
            }
            dateTmpDeb = new Date(dateTmpDeb).setDate(new Date(dateTmpDeb).getDate()  + 1);
        }
    }
    function initVarState()
    {
        let dateJours = new Date(date);
        let dateFin = arrondiDate(new Date(new Date(date).setMonth(date.getMonth() + 1)), 5);
        let tabEventsTmp = [];
        events.map((element) => {
            if (element.debut.getTime() <= dateFin)
            {
                if (element.recurance === 'Rien')
                {
                    tabEventsTmp.push(element);
                }
                else{
                    let dateTmp = new Date(element.debut);
                    for (;dateTmp.getTime() <= dateFin; )
                    {
                        if ((element.recurance === 'Toutes les semaines' && element.debut.getDay() === dateTmp.getDay()) || 
                        (element.recurance === 'Tout les mois' && element.debut.getDate() === dateTmp.getDate()) || 
                        (element.recurance === 'Tout les ans' && element.debut.getMonth() === dateTmp.getMonth() && element.debut.getDate() === dateTmp.getDate()))
                        {
                            tabEventsTmp.push({
                                ...element,
                                ['debut']:new Date(new Date(dateTmp).setSeconds(1)),
                            })
                        }
                        dateTmp = new Date(new Date(dateTmp).setDate(dateTmp.getDate() + 1));
                    }
                }
            }
        })
        console.log(dateJours);
        console.log(new Date(dateFin));
        console.log(tabEventsTmp);
        tabEventsTmp.map((element) => {
                if (element.debut.getTime() <= dateJours.getTime())
                {
                    state.argent += element.argent;
                }
            })
            state.argentPrevisionnel = state.argent;
            tabEventsTmp.map((element) => {
                console.log(element);
            if (element.debut.getTime() <= dateFin && element.debut.getTime() > dateJours.getTime())
            {
                state.argentPrevisionnel += element.argent;
            }
    })
    }
    function initVarStateMonth()
    {
        myEvents.map((element) => {
            if (element.debut.getTime() <= arrondiDate(new Date(new Date(date).setMonth(date.getMonth() + 1)), 5) && element.debut.getTime() >= arrondiDate(new Date(new Date(date)), 5))
            {
                if (element.argentType === 'Charge mensuel')
                    state.chargeMensuel += element.argent;
                if (element.argentType === 'Depence sup')
                    state.depenceSup += element.argent;
                if (element.argentType === 'Charge courante')
                    state.chargeCourante += element.argent;
                if (element.argentType === 'Salaire travail')
                    state.salaireTravail += element.argent;
                if (element.argentType === 'Salaire immo')
                    state.salaireImmo += element.argent;
                if (element.argentType === 'Argent sup')
                    state.argentSup += element.argent;
                if (element.argent < 0)
                    state.depenceMensuelTotale += element.argent;
                if (element.argent > 0)
                    state.revenuMensuelTotale += element.argent;
            }
        })
    }
    trieEvents();
    initVarState();
    initVarStateMonth();
    return (
        <div className="ArgentDetailStatistiques">
                <div className="ArgentDetailStatistique">
                    <h4 className="ArgentDetailStatistiqueTitre">Charges mensuels</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.chargeMensuel}€</h4>
                    <h4 className="ArgentDetailStatistiqueState">{Math.round((state.chargeMensuel*100)/state.depenceMensuelTotale)}%</h4>
                </div>
                <div className="ArgentDetailStatistique">
                    <h4 className="ArgentDetailStatistiqueTitre">Charges courantes</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.chargeCourante}€</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{Math.round((state.chargeCourante*100)/state.depenceMensuelTotale)}%</h4>
                </div>
                <div className="ArgentDetailStatistique">
                    <h4 className="ArgentDetailStatistiqueTitre">Depence sup</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.depenceSup}€ </h4>
                    <h4 className="ArgentDetailStatistiqueState">{Math.round((state.depenceSup*100)/state.depenceMensuelTotale)}%</h4>
                </div>
                <div className="ArgentDetailStatistique">
                    <h4 className="ArgentDetailStatistiqueTitre">Salaire travail</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.salaireTravail}€ </h4>
                    <h4 className="ArgentDetailStatistiqueState">{Math.round((state.salaireTravail*100)/state.revenuMensuelTotale)}%</h4>
                </div>
                <div className="ArgentDetailStatistique">
                    <h4 className="ArgentDetailStatistiqueTitre">Salaire immo</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.salaireImmo}€</h4>
                    <h4 className="ArgentDetailStatistiqueState">{Math.round((state.salaireImmo*100)/state.revenuMensuelTotale)}%</h4>
                </div>
                <div className="ArgentDetailStatistique">
                    <h4 className="ArgentDetailStatistiqueTitre">Argent sup</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.argentSup}€</h4>
                    <h4 className="ArgentDetailStatistiqueState">{Math.round((state.argentSup*100)/state.revenuMensuelTotale)}%</h4>
                </div>
                <div className="ArgentDetailStatistiqueFin">
                    <h4 className="ArgentDetailStatistiqueTitre">Revenue</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.revenuMensuelTotale}€</h4>
                    <h4 className="ArgentDetailStatistiqueTitre">Depance</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.depenceMensuelTotale}€</h4>
                </div>
                <div className="ArgentDetailStatistiqueFin">
                    <h4 className="ArgentDetailStatistiqueTitre">Solde actuel</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.argent}€</h4>
                    <h4 className="ArgentDetailStatistiqueTitre">Solde previsionel</h4>
                    <h4 className="ArgentDetailStatistiqueRes">{state.argentPrevisionnel}€</h4>
                </div>
            </div>
    );
}


export default ComposantStateArgents;