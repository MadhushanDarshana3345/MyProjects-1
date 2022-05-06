import * as React from 'react';
import Routingtable from '../ChildComp/body/routingsTable'
import Bookingdetailstable from '../../UserAccount/PassangerAccount/ChildComp/BookingDetailsTable'
import {useSelector} from 'react-redux';
export default function DataTable() {  

  const isLogged = useSelector((state)=>state.user.value.loginstate);
  const type = useSelector((state)=>state.user.value.type);
  
  if ((isLogged) && (type=='Passanger')){
    return (
      <div>
      <Bookingdetailstable></Bookingdetailstable>
      <Routingtable></Routingtable>
    </div>
    )}
  return (    
    <Routingtable></Routingtable>
      
  ) 
}
