import { CONST } from "@/lib/constant";
import { reduxRequest } from "@/lib/request";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { updateCards } from "../slice/cards";

const useCards = (auto = true) => {
    const { loading, data, message, status } = useAppSelector(state => state.cards)
    const http = useAppDispatch()

    useEffect(() => {
        if (auto) {
            if (loading === 'false' && data === null) {
                http(reduxRequest(CONST.COMPANY.CARD.LIST, {}, updateCards, 'get'))
            }
        }
    }, []);

    const deleteCard = async (id: string) => {

    }

    return { loading: loading === 'true', data, message, status, deleteCard }
}

export default useCards;