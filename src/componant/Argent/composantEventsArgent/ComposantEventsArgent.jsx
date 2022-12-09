import { arrondiDate } from '../../../utile/function/heureDate'
import { checkGoodDay } from '../../../utile/function/heureDate'


function ComposantEventsArgents(events, setChangeEvent, date, mothClef){
    let myEvents = [];

    function checkIfAffichage(event){
        if (event.argentType === 'Depence sup' && mothClef.depenceSup === true)
            return (true);
        else if (event.argentType === 'Charge courante' && mothClef.chargeCourante === true)
            return (true);
        else if (event.argentType === 'Charge mensuel' && mothClef.chargeMensuel === true)
            return (true);
        else if (event.argentType === 'Salaire travail' && mothClef.salaireTravail === true)
            return (true);
        else if (event.argentType === 'Salaire immo' && mothClef.salaireImmo === true)
            return (true);
        else if (event.argentType === 'Argent sup' && mothClef.argentSup === true)
            return (true);
        return (false);
    }
    
    function trieEvents(){

        let dateTmpDeb = arrondiDate(date,5);
        let dateTmpFin = arrondiDate(new Date(new Date(date).setMonth(date.getMonth() + 1)), 5);

        while (dateTmpDeb < dateTmpFin)
        {
            let dateDay = new Date(dateTmpDeb);
            for (let i = 0; events[i]; i++)
            {
                if (events[i].argent !== 0 && checkGoodDay(events[i].debut, events[i].recurance, dateDay) === true && checkIfAffichage(events[i]) === true)
                {
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
    function createDivEvents(){
        let i = 0;
        if (!myEvents[0])
            return (<h4>Pas de depence enrogistrer</h4>);
        let tab = myEvents.map((element) => {
            let color = 'transparent';
            if (!element)
                return ;
            if (element.argent > 0)
                color = '#16a085';
            else if (element.argent < -50 && element.argent > -100)
                color = '#d35400';
            else if (element.argent <= -100)
                color = '#c0392b';
            i++;
            return (
                <div onClick={() => {setChangeEvent(element)}} className="ArgentMouvementArgent" style={{background:color}}key={i}>
                    <h5 className="ArgentMouvementArgentTitre">{element.titre} {element.id}</h5>
                    <h5 className="ArgentMouvementArgentTitre">{element.argentType}</h5>
                    <h5 className="ArgentMouvementArgentDate">{element.debut.getDate()}</h5>
                    <h5 className="ArgentMouvementArgentArgent">{element.argent}€</h5>
                </div>
            );
        })
        return (tab);
    }
    trieEvents();
    return (createDivEvents());
}


export default ComposantEventsArgents;