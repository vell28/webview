export interface CategoriesModel {
    categories: Category[];
    popular: Popular[];
}

interface Popular {
    action3d: string;
    actionVr: string;
    id: string;
    image: string;
    title: string;
}

interface Category {
    comingSoon: string;
    id: string;
    products: Products[]
}

interface Products {
    id: string;
    action3d: string;
    actionVr: string;
    image: string;
    title: string;
}
