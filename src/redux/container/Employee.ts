import { connect } from "react-redux";
import { RootState } from "../reducers/root-reducer";
import * as actions from '../actions/employee/actions'
import { fetchConstantTypes } from '../actions/constant-type/actions'
import { useParams } from 'react-router-dom'

import Employee from "../../pages/Employee/Employee";
const mapState = (state: RootState) => {
    
    const { employee, constantType: { roles } } = state
    return {
        isFetching: state.employee.isFetching,
        employees: employee.items,
        roles: roles
    }
}

const mapDispatch = {
    ...actions,
    fetchConstantTypes
}

export default connect(mapState, mapDispatch)(Employee)
