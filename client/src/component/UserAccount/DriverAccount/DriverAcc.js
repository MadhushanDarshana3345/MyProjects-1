import React from 'react'
import PersonalDetails from "./ChildComp/PersonalDetails";
import RoutingTimeTable from "./ChildComp/RoutingTimeTable";
import VehiclesDetails from "./ChildComp/VehiclesDetails";
import BookersDetails from "./ChildComp/BookersDetails";
import Header from "../../home/ChildComp/header";
import Comments from './ChildComp/Comments'

import {Navigate} from "react-router-dom";

import {useSelector,useDispatch} from 'react-redux';
import { Booking } from '../../../redux/action/index';

export default function DriverAcc(props) {
  const dispatch = useDispatch();
  dispatch(Booking({numberOfBooking:0})); //booking details must be when user is driver
  const isLogged = useSelector((state)=>state.user.value.loginstate);
  const type = useSelector((state)=>state.user.value.type);
  if ((isLogged) && (type=='Driver')){
    return (
      <div>
        <Header></Header>        
        <PersonalDetails></PersonalDetails>
        <VehiclesDetails></VehiclesDetails>
        <RoutingTimeTable></RoutingTimeTable>
        <BookersDetails></BookersDetails>
        <Comments></Comments>
    </div>
    )}
  return (   
    <Navigate to="/DriverLogin" />
  )
}
