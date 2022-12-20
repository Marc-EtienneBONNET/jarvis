import { useState, useRef } from "react";
import axios from 'axios';

function audioBtn(inputId, ftMouvName){
    let nameAudio ;

    async function hundleChangeUploadFile(e) {
        let formData = new FormData();
        let objPhoto;
        const photo = document.getElementById(''+inputId);
        if (photo && photo.files && photo.files[0]) {
            formData.append('audio', photo.files[0]);
            objPhoto = await fetch('http://localhost:3001/theProfile/uplodAudio', {
                method: 'POST',
                body: formData,
            })
            nameAudio = (await objPhoto.json()).filename;
            ftMouvName(nameAudio);
        }
    }

    return (
        <div name={'sansImg'}>
            <input onChange={hundleChangeUploadFile} className="form-control" type ="file" id={''+inputId} name="" style={{}}/>
        </div>
    );
}

export default audioBtn;
