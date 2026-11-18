import { RoutesEnum } from "../../routsEnum";

export const MenuItems = [
    {
        title: "Pretraga po broju",
        url: `${RoutesEnum.ROOT}`,
        cName:"nav__links"
    },
    {
        title: "Pretraga po nazivu",
        url: `${RoutesEnum.SEARCH_DEPARTMENT_URL}`,
        cName:"nav__links"
    }
]