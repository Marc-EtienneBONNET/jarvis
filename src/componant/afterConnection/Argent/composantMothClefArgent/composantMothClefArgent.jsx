function ComposantMothClefArgent(mothClef, setMothClef){
    
    function handelMouvMothClef(arg){
        setMothClef({
            ...mothClef,
            [arg]:(mothClef[arg] === true?false:true)
        });
    }
    return (
        <div className="ArgentDetailMothClefs">
        <h5 type='button' onClick={() => {handelMouvMothClef('depenceSup')}} className={"ArgentDetailMothClef " + (mothClef.depenceSup != false?" ArgentDetailMothClefActife":"")}>Depence sup</h5>
        <h5 type='button' onClick={() => {handelMouvMothClef('chargeCourante')}} className={"ArgentDetailMothClef " + (mothClef.chargeCourante != false?"ArgentDetailMothClefActife":"")}>Charge courante</h5>
        <h5 type='button' onClick={() => {handelMouvMothClef('chargeMensuel')}} className={"ArgentDetailMothClef " + (mothClef.chargeMensuel != false?"ArgentDetailMothClefActife":"")}>Charge mensuel</h5>
        <h5 type='button' onClick={() => {handelMouvMothClef('salaireTravail')}} className={"ArgentDetailMothClef " + (mothClef.salaireTravail != false?"ArgentDetailMothClefActife":"")}>Salaire travail</h5>
        <h5 type='button' onClick={() => {handelMouvMothClef('salaireImmo')}} className={"ArgentDetailMothClef " + (mothClef.salaireImmo != false?"ArgentDetailMothClefActife":"")}>Salaire immo</h5>
        <h5 type='button' onClick={() => {handelMouvMothClef('argentSup')}} className={"ArgentDetailMothClef " + (mothClef.argentSup != false?"ArgentDetailMothClefActife":"")}>Argent sup</h5>
    </div>
    );
}

export default ComposantMothClefArgent;