import {
    Controller, Get, Render, Post, 
    Authenticated, Required, BodyParams,
    Delete,
    PathParams,
    Status,
    Req
} from "@tsed/common";
import { CategoriesService } from "services/categories/categories.service";
import { Category } from "models/category";


@Controller("/categories")
export class CategoriesCtrl {

    constructor(
        private categoriesService: CategoriesService
    ) {

    }

    @Get("/")
    // @Authenticated()
    async getAll(@Req() request: Express.Request) {
        return await this.categoriesService.query();
    }

    @Post('/')
    // @Authenticated()
    async createWallet(@Req() request: Express.Request, @BodyParams() category: Category) {
        return await this.categoriesService.createOrUpdate({_id: category._id}, category);
    }

}