export interface IAPIListingQuery {
    limit: number;
    page: number;
    search: string;
    order: "DESC" | "ASC";
    sort: string;
}

export interface PaginateResponse<T> {
    data: T[];
    meta_info: {
        total: number;
        limit: number;
        currentPage: number;
        nextPage?: number;
        prevPage?: number;
    };
}
