import { IVIP } from "../../model/IVIP";

export const getVIPIndexById = (vips: IVIP[], id: string) => {
    return vips.findIndex(vip => vip.id === id)
}

export const getActiveVIP = (categories: IVIP[]) => {
    return categories.filter(item => item.isDeleted === false)
}