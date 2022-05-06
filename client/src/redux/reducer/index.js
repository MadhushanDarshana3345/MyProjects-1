import { combineReducers } from "redux";
import loguserDetailsreducer from "./loguserDetailsreducer";
import travelDetailsreducer from "./travelDetailsreducer";

const allreducer = combineReducers({
    user:loguserDetailsreducer,
    travelDetails:travelDetailsreducer

});

export default allreducer;