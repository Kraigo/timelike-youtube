import {
    Controller, Get, Render, Post,
    Req
} from "@tsed/common";
import { Category } from "models/category";


@Controller("/home")
export class CategoriesCtrl {

    constructor(
    ) {

    }

    @Get("/register")
    @Render("register")
    async register(): Promise<any> {
        return {};
    }

    @Get("/login")
    @Render("login")
    async login(@Req() request: Express.Request): Promise<any> {
        return {};
    }

}