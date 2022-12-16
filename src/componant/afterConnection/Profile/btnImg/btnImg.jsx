import { useState, useRef } from "react";
import axios from 'axios';


function ComposantBtnImg(arg){
    let [testImg, setTestImg] = useState();
    let [chargeImg, setChargeImg] = useState({display:'none'});

    async function uploadFile(e){  
        e.preventDefault(); 
        const photo = document.getElementById('formFile').files[0];    
        let formData = new FormData();
        formData.append('photoProfile', photo);
        let path = await fetch('http://localhost:3001/theProfile/uplodPhoto', {
                method: 'POST',
                body: formData,
            })
        let tmp = await path.json();
        let tmpProf = {
            ...arg.profileTmp,
            photo:tmp.filename,
        }
        arg.setProfileTmp(tmpProf);
    }
    
    async function test(){
        let tmp = await axios.get('http://localhost:3001/theProfile/sendImage' + arg.profileTmp.photo, {responseType:'blob'});
        const imageObjectURL = URL.createObjectURL(tmp.data)
        if (tmp.data.size !== 0)
        {
            setTestImg(imageObjectURL);
            setChargeImg({display:'none'})
        }
        else
            setChargeImg({})
    }

    setTimeout(test, 1000)
    return (
        <div>
            <img onClick={() => {document.getElementById('formFile').click()}} src={testImg} className="ProfileFormImgProfile"/>
            <input className="form-control" type ="file" id="formFile" name="photoProfile" filename='testMarco' style={chargeImg}/>
            <input onClick={(e) => {uploadFile(e)}}  type='button' value="Modifier" className="ProfileFormInput ProfileFormInputBtn" placeholder="test"/>
        </div>
    );
}

export default ComposantBtnImg;
