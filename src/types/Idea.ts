interface Idea {
    id?: string;
    name: string;
    visible: boolean;
    ideaDescription: string;
    ideaDifficulty: number;
    image?: string;
    dateCreated?: Date;
}

export default Idea;
