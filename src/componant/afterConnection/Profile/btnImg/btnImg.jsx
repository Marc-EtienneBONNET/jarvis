import { useState, useRef } from "react";
import axios from 'axios';
import { url } from './../../../../utile/variable/variable'

function BtnImg(blobImg, inputId, ftMouvName){
    let objImg ;
    let nameImg ;

    async function hundleChangeUploadFile(e) {
        let formData = new FormData();
        let objPhoto;
        const photo = document.getElementById(''+inputId);
        if (photo && photo.files && photo.files[0]) {
            formData.append('img', photo.files[0]);
            objPhoto = await fetch(url + 'theProfile/uplodImg', {
                method: 'POST',
                body: formData,
            })
            nameImg = (await objPhoto.json()).filename;
            ftMouvName(nameImg);
        }
        else{
        }
    }

    function CreateTheSrcImg(){
        let imageObjectURL;
        if (blobImg && blobImg.size != 0){
            imageObjectURL = URL.createObjectURL(blobImg);
            objImg = <div name={''+blobImg.size}>
            <img onClick={() => {document.getElementById(''+inputId).click()}} src={''+imageObjectURL} className="ProfileFormImgProfile"/>
            <input onChange={hundleChangeUploadFile} className="form-control" type ="file" id={''+inputId} name="photo" style={{display:'none'}}/>
        </div>;
        }
        else {
        objImg = <div name={'sansImg'}>
            <input onChange={hundleChangeUploadFile} className="form-control" type ="file" id={''+inputId} name="" style={{}}/>
        </div>;
        }
    }

    CreateTheSrcImg();
    return objImg;
}

export default BtnImg;
