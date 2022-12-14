import './../../2) styles/index.scss'
import { useState } from 'react';

function ComposantLayout(arg) {
  return (
      <div className='myLayout'>
          <i onClick={() => {arg.setWitchPage('Agenda')}} className="fa-regular fa-calendar-days btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Reveil')}} className="fa-solid fa-bell btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Argent')}} className="fa-solid fa-sack-dollar btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} className="fa-solid fa-xmark btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} className="fa-solid fa-xmark btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Agenda')}} className="fa-solid fa-xmark btnMenu"></i>
          <i onClick={() => {arg.setWitchPage('Profile')}} className="fa-solid fa-user btnMenu"></i>
      </div>
  );
}

export default ComposantLayout;
