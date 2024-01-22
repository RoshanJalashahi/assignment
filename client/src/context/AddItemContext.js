import { createContext } from "react";

export const AddItemContext=createContext({
    additems:()=>{},
    
})
export const AddItemProvider=AddItemContext.Provider;

export const useAddItem=()=>{
    return AddItemContext.useContext(AddItemContext);
}