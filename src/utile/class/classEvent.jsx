export class MyEvent{
    id = 0;
    type = '';
    alarmType = '';
    titre = '';
    detail = '';
    debut = new Date();
    fin = new Date();
    recurance = '';
    argent = '';
    constructor(id, type, titre, debut, fin , detail , recurance , alarmType, argent){
        this.id = id;
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