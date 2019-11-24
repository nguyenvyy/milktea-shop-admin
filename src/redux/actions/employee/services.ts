import { FirebaseServices } from "../../../services/firebase"
import { collections } from "../../../constant/FirebaseEnum"
import { undefinedError } from "../../../constant";
import { IEmployee } from "../../../model/IEmployee";


export const getEmployeesAPI = async () => {
    const collectionRef = FirebaseServices.db.collection(collections.employees)
    try {
        const querySnapshot = await collectionRef.orderBy("createAt", "desc").get()
        return querySnapshot.docs.map((doc: any) => {
            let { updateAt, createAt, birthday } = doc.data();
            const employee: IEmployee = {
                ...doc.data(),
                updateAt: updateAt.toDate(),
                createAt: createAt.toDate(),
                birthday: birthday.toDate()
            }
            return employee
        })
    } catch (error) {
        return [error, undefinedError]
    }
}

export const addEmployeeAPI = async (employee: IEmployee) => {
    try {
        const resSignUp = await FirebaseServices.auth.createUserWithEmailAndPassword(employee.email, '123456')
        if(resSignUp.user !== null) {
            const docRef = FirebaseServices.db.collection(collections.employees).doc(resSignUp.user.uid)
            const id = docRef.id
            const newemployee = { ...employee, id, createAt: new Date(), updateAt: new Date() }
            await docRef.set(newemployee)
            return newemployee
        } else {
            throw new Error('dont create ')
        }
    } catch (error) {
        return [error, undefinedError]
    }
}
export const updateEmployeeAPI = async (employee: IEmployee) => {
    const docRef = FirebaseServices.db.collection(collections.employees).doc(employee.id)
    try {
        const employeeClone: IEmployee = { ...employee, updateAt: new Date() }
        await docRef.update(employeeClone)
        return { ...employee, ...employeeClone }
    } catch (error) {
        return [error, undefinedError]
    }
}

export const deleteEmployeeAPI = async (id: string) => {
    const docRef = FirebaseServices.db.collection(collections.employees).doc(id)
    try {
        await docRef.update({ isDeleted: true })
        return id
    } catch (error) {
        return [error, undefinedError]
    }
}

