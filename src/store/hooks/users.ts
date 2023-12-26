import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateUsers } from "../slice/users";

const useUsers = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.users)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.USERS.LIST, {}, updateUsers, 'get'))
            }
        }
    }, []);

    const fetchUsers = (query: string) => {
        http(reduxRequest(CONST.COMPANY.USERS.LIST + '?' + query, {}, updateUsers, 'get'))
    }

    return { loading, data, message, status, fetchUsers }
}

export default useUsers;