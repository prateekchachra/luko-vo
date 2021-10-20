import { ValueObject } from './../../components/ValueObjects/ValueCard/index';
import { ValueObjectsState } from '.';
import { ADD_OBJECT, RESET_OBJECTS } from './constants';

export type ValueObjectActionType = {
    type: string;
    valueObject: ValueObject 
}


export const valueObjectsReducer = (state: ValueObjectsState, action: ValueObjectActionType) => {

    switch(action.type){
        case ADD_OBJECT: 
            return {
                ...state,
                valueObjects: [...state.valueObjects, action.valueObject],
            };
        case RESET_OBJECTS:
            return {...state, 
                valueObjects: []};
         default:
            return state;
    }
  };