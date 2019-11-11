import { IEmployee } from "../../../model/IEmployee"

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE'

export const RECEIVE_EMPLOYEES = 'RECEIVE_EMPLOYEES'
export const REQUEST_EMPLOYEE = 'REQUEST_EMPLOYEE'
export const STOP_REQUEST_EMPLOYEE = 'STOP_REQUEST_EMPLOYEE'

export interface AddEmployeeAction {
    type: typeof ADD_EMPLOYEE,
    payload: IEmployee
}

export interface DeleteEmployeeAction {
    type: typeof DELETE_EMPLOYEE,
    payload: string
}

export interface EditEmployeeAction {
    type: typeof EDIT_EMPLOYEE,
    payload: IEmployee
}


export interface ReceiveEmployeesAction {
    type: typeof RECEIVE_EMPLOYEES,
    payload: IEmployee[]
}

export interface RequestEmployeeAction {
    type: typeof REQUEST_EMPLOYEE
}

export interface StopRequestEmployeeAction {
    type: typeof STOP_REQUEST_EMPLOYEE
}

export type EmployeeActionTypes = (
    ReceiveEmployeesAction |
    AddEmployeeAction |
    DeleteEmployeeAction |
    EditEmployeeAction |
    RequestEmployeeAction |
    StopRequestEmployeeAction
)

export interface EmployeeState {
    items: IEmployee[],
    isFetching: Boolean
} 
