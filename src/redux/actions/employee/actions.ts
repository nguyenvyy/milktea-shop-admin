import { IEmployee } from "../../../model/IEmployee"
import {
    AddEmployeeAction,
    ADD_EMPLOYEE,
    DeleteEmployeeAction,
    DELETE_EMPLOYEE,
    EditEmployeeAction,
    EDIT_EMPLOYEE,
    RequestEmployeeAction,
    REQUEST_EMPLOYEE,
    StopRequestEmployeeAction,
    STOP_REQUEST_EMPLOYEE,
    RECEIVE_EMPLOYEES,
    ReceiveEmployeesAction
} from "./types"
import { getEmployeesAPI, addEmployeeAPI, deleteEmployeeAPI, updateEmployeeAPI } from "./services"
import { success, undefinedError, existed } from "../../../constant"

const addEmployee = (Employee: IEmployee): AddEmployeeAction =>({
    type: ADD_EMPLOYEE,
    payload: Employee
})

const deleteEmployee = (id: string): DeleteEmployeeAction => ({
    type: DELETE_EMPLOYEE,
    payload: id
})

const editEmployee = (Employee: IEmployee): EditEmployeeAction => ({
    type: EDIT_EMPLOYEE,
    payload: Employee
})

const requestEmployee = (): RequestEmployeeAction => ({
    type: REQUEST_EMPLOYEE
})

const stopRequestEmployee = (): StopRequestEmployeeAction => ({
    type:STOP_REQUEST_EMPLOYEE
})

const receiveEmployees = (Employees: IEmployee[]): ReceiveEmployeesAction => ({
    type: RECEIVE_EMPLOYEES,
    payload: Employees
}) 

export const fetchEmployees = () => (dispatch: any) => {
    dispatch(requestEmployee())
    return getEmployeesAPI()
    .then(employees => {
        dispatch(stopRequestEmployee())
        if(employees[1] === undefinedError) {
            return undefinedError
        }
        dispatch(receiveEmployees(employees))
        return success
    })
}


export const requestAddEmployee = (employee: IEmployee) => (dispatch: any) => {
    dispatch(requestEmployee())
    return addEmployeeAPI(employee)
        .then((newEmployee: any | IEmployee) => {
            dispatch(stopRequestEmployee())
            if(newEmployee[1] === undefinedError) {
                if(newEmployee[0] && newEmployee[0].code === 'auth/email-already-in-use')
                    return existed
                return undefinedError
            }
            dispatch(addEmployee(newEmployee))
            return success
        })
}

export const requestEditEmployee = (Employee: IEmployee) => (dispatch: any) => {
    dispatch(requestEmployee())
    return updateEmployeeAPI(Employee)
        .then((newEmployee: any | IEmployee) => {
            dispatch(stopRequestEmployee())
            if(newEmployee[1] === undefinedError) {
                return undefinedError
            }
            dispatch(editEmployee(Employee))
            return success
        })
}

export const requestDeleteEmployee= (id: string) => (dispatch: any) => {
    dispatch(requestEmployee())
    return deleteEmployeeAPI(id)
        .then((id: any | string) => {
            dispatch(stopRequestEmployee())
            if(id[1] === undefinedError) {
                return undefinedError
            }
            dispatch(deleteEmployee(id))
            return success
        })
}
