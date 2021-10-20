import { ValueObject } from './../../components/ValueObjects/ValueCard/index';
import { ValueObjectsState } from '.';
import { ADD_OBJECT, RESET_OBJECTS, INIT_OBJECTS } from './constants';


export type ValueObjectsActionType = {
    type: string;
    valueObject?: ValueObject;
    valueObjects?: ValueObject[];
}


export const valueObjectsReducer = (state: ValueObjectsState, action: ValueObjectsActionType) => {

    switch(action.type){
        case ADD_OBJECT: 
            return {
                ...state,
                valueObjects: [...state.valueObjects, action.valueObject],
            };
        case RESET_OBJECTS:
            return {...state, 
                valueObjects: []};

        case INIT_OBJECTS:
            return {...state, 
                valueObjects: [...action.valueObjects]};
         default:
            return state;
    }
  };