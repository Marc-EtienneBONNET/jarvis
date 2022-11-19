export class MyEvent{
    type = '';
    alarmType = '';
    titre = '';
    detail = '';
    debut = new Date();
    fin = new Date();
    recurance = '';
    argent = 0;
    constructor(type, titre, debut, fin , detail , recurance , alarmType, argent){
        this.type = type;
        this.titre = titre;
        this.detail = detail;
        this.debut = debut;
        this.fin = fin;
        this.recurance = recurance;
        this.alarmType = alarmType;
        this.argent = argent
    }
}