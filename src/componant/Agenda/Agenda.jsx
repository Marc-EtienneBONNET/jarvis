import { event } from './../../utile/class/classEvent'
import ComposantJours from './jours/jours'
import ComposantSemaines from './semaines/semaines'
import ComposantMois from './mois/mois'
import ComposantAnnee from './annees/annees'
import { useState } from 'react'

function ComposantAgenda() {

        let [witchAgenda, setWitchAgenda] = useState('Semaines')
    let agenda = {
        'Jours':    <ComposantJours/>,
        'Semaines': <ComposantSemaines/>,
        'Mois':     <ComposantMois/>,
        'Annees':   <ComposantAnnee/>
    }
    function handleAddEvent()
    {
    }

    return (
    <div className='composantAgenda'>
        <div className='typeAffichage'>
            <input onClick={() => {setWitchAgenda('Semaines')}} type='button' value='Semaine' className='btnAgendaTypeAffichage'/>
            <input onClick={() => {setWitchAgenda('Mois')}} type='button' value='Mois' className='btnAgendaTypeAffichage'/>
            <input onClick={() => {setWitchAgenda('Annees')}} type='button' value='Annee' className='btnAgendaTypeAffichage'/>
        </div>
        {agenda[witchAgenda]}
    </div>
    );
}

export default ComposantAgenda;