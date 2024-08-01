import { IUserRepository } from "./repositories/IUserRepository";
import { IAPIListingQuery, PaginateResponse } from "../../core/interfaces/pagination";
import { paginateResponse } from "../../core/helpers/utils";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "./dtos";
import { TYPES } from "../../core/di/type";
import { inject, injectable } from "inversify";

@injectable()
export class UserService {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

    async findAll(query: IAPIListingQuery): Promise<PaginateResponse<UserDTO>> {
        const response = await this.userRepository.findAll(query);
        const { total, limit, currentPage } = response.meta_info;
        const dto = plainToInstance(UserDTO, response.data);
        return paginateResponse(dto, total, limit, currentPage);
    }
}
