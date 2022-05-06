import React from 'react'
import PersonalDetails from "./ChildComp/PersonalDetails";
import MyBooking from "./ChildComp/BookingDetailsTable";
import Header from "../../home/ChildComp/header";
import Comments from './ChildComp/Comments'

import {Navigate} from "react-router-dom";

import {useSelector} from 'react-redux';

export default function DriverAcc(props) {
  const isLogged = useSelector((state)=>state.user.value.loginstate);
  const type = useSelector((state)=>state.user.value.type);
  if ((isLogged) && (type=='Passanger')){
    return (
      <div>
        <Header></Header>        
        <PersonalDetails></PersonalDetails>
        <MyBooking></MyBooking>
        <Comments></Comments>
    </div>     
    )}
  return (
    <Navigate to="/PassangerLogin" />
  )
}
