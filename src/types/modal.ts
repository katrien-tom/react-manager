import { MutableRefObject } from "react";

export type IAction  = 'create' | 'update' | 'delete'

export interface IModalProp {
    mRef:MutableRefObject<{
        open:(type:IAction)=>void | undefined,
    }>,
    update:()=>void,
}

