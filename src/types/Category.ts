import Idea from './Idea';

interface Category {
    id?: string;
    name: string;
    visible: boolean;
    categoryDescription: string;
    color: string;
    ideas: number[];
}

export default Category;
