import { event } from './../../utile/class/classEvent'
import ComposantSemaines from './semaines/semaines'
import ComposantMois from './mois/mois'
import { useState } from 'react'

function ComposantAgenda(data) {

    let [witchAgenda, setWitchAgenda] = useState('Mois')
    let agenda = {
        'Semaines': <ComposantSemaines profile={data.profile}/>,
        'Mois':     <ComposantMois profile={data.profile}/>,
    }
    function handleAddEvent()
    {
    }

    return (
    <div className='composantAgenda'>
        <div className='typeAffichage'>
            <input onClick={() => {setWitchAgenda('Semaines')}} type='button' value='Semaine' className='btnAgendaTypeAffichage'/>
            <input onClick={() => {setWitchAgenda('Mois')}} type='button' value='Mois' className='btnAgendaTypeAffichage'/>
        </div>
        {agenda[witchAgenda]}
    </div>
    );
}

export default ComposantAgenda;