import React, {useReducer} from 'react';
import { ValueObject } from './../../components/ValueObjects/ValueCard/index';
import { valueObjectsReducer } from './reducer';

export interface ValueObjectsState {
    valueObjects: ValueObject[];
}

const initialState = {
    valueObjects: []
}

export const ValueObjectsContext = React.createContext<{
    state: ValueObjectsState;
  dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});


export const ValueObjectsProvider: React.FC = ( { children } ) => {
    
    const [state, dispatch] = useReducer(valueObjectsReducer, initialState);

    return (
        <ValueObjectsContext.Provider value={{state, dispatch}}>
            {children}
        </ValueObjectsContext.Provider>
    );
}

