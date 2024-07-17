import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./repositories/IUserRepository";
import { IAPIListingQuery, PaginateResponse } from "../../core/interfaces/pagination";
import { paginateResponse } from "../../core/helpers/utils";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "./dtos";

@injectable()
export class UserService {
    constructor(@inject("UserRepository") private userRepository: IUserRepository) {}

    async findAll(query: IAPIListingQuery): Promise<PaginateResponse<UserDTO>> {
        const response = await this.userRepository.findAll(query);
        const { total, limit, currentPage } = response.meta_info;
        const dto = plainToInstance(UserDTO, response.data);
        return paginateResponse(dto, total, limit, currentPage);
    }
}
