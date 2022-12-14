import { useState } from 'react';

function ComposantIndicateurHoraire(arg) {

    let [style, setStyle] = useState({
        position: 'absolute',
        width: '92vw',
        marginTop: '6vh',
        display: 'grid',
        gridTemplateColumns: '3vw 89vw',
    });
    function clalculeMargTop(style){
       if (arg.date.getHours() - 6 > 0){
            let marg  = 6 + (4 * (arg.date.getHours() - 6)) + ((arg.date.getMinutes()/60) * 4) 
            setStyle({
                        ...style,
                        marginTop : marg + 'vh',
                    });
        }
        else
        {
            setStyle({
                ...style,
                marginTop : '6.7vh',
            });
        }
    }
    setTimeout((e)=> {clalculeMargTop(style)}, 1000);
    return (
        <div className='indicateurHoraire' style={style}>
            <h3 className='pointeurHoraireHeure'>{arg.date.getHours()}:{arg.date.getMinutes()}</h3>
            <div className='pointeurHorairePointeur'></div>
        </div>
    );
}

export default ComposantIndicateurHoraire;