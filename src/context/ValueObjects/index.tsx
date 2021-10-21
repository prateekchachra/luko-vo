import React, { useEffect, useReducer } from 'react';
import { ValueObject } from './../../components/ValueObjects/ValueCard/index';
import { valueObjectsReducer } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const getValueObjects = async () => {
    try {
      const valueObjects = await AsyncStorage.getItem('valueObjects')
      return valueObjects ? JSON.parse(valueObjects) : [];
    } catch (e) {
      console.log('Failed to fetch the data from storage', e);
    }
  }


export const ValueObjectsProvider: React.FC = ( { children } ) => {
    
    const [state, dispatch] = useReducer(valueObjectsReducer, initialState);

    useEffect(() => {
        (async function (){
            const valueObjects = await getValueObjects();
            dispatch({type: 'INIT_VALUES', valueObjects});
        })();
    }, [])
    useEffect(() => {
        AsyncStorage.setItem('valueObjects', JSON.stringify(state.valueObjects));
    }, [state.valueObjects]);
    return (
        <ValueObjectsContext.Provider value={{state, dispatch}}>
            {children}
        </ValueObjectsContext.Provider>
    );
}

