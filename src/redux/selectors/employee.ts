import { IEmployee } from "../../model/IEmployee"


export const getEmployeeIndexById = (employees: IEmployee[], id: string) => {
    return employees.findIndex(employees => employees.id === id)
}
