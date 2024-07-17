import { IAPIListingQuery, PaginateResponse } from "../interfaces/pagination";
import { Request } from "express";

export const extractQueryParams = (req: Request): IAPIListingQuery => {
    const { query } = req;
    const { limit, page, search, order, sort } = query;

    return {
        limit: isNaN(parseInt(limit as string, 10)) ? 10 : parseInt(limit as string, 10),
        page: isNaN(parseInt(page as string, 10)) ? 1 : parseInt(page as string, 1),
        search: search ? (search as string) : "",
        order: order ? (order as "DESC" | "ASC") : "DESC",
        sort: sort ? (sort as string) : "id",
    };
};

export const paginateResponse = <T>(data: T[], total: number, limit: number, page: number): PaginateResponse<T> => {
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? 0 : page + 1;
    const prevPage = page - 1 < 1 ? 0 : page - 1;
    return {
        data: data,
        meta_info: {
            total: total,
            limit: limit,
            currentPage: page,
            nextPage: nextPage,
            prevPage: prevPage,
        },
    };
};
