export interface Film {
    id: number;
    name: string;
    year: string;
    imgUrl: string;
    description: string;
    isFavorite?: boolean;
}