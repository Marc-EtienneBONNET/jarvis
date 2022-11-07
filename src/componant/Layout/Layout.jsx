import './../../2) styles/index.scss'
import { useState } from 'react';

function ComposantLayout(arg) {
  return (
      <div className='myLayout'>
          <i onClick={() => {arg.setWitchPage('Agenda')}} class="fa-regular fa-calendar-days btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Reveil')}} class="fa-solid fa-bell btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} class="fa-solid fa-xmark btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} class="fa-solid fa-xmark btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} class="fa-solid fa-xmark btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} class="fa-solid fa-xmark btnMenu"></i>
      </div>
  );
}

export default ComposantLayout;
