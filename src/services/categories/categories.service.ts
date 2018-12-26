import { Service, Inject } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { RepositoryService } from "services/common/repository.service";
import { Category } from "models/category";

@Service()
export class CategoriesService extends RepositoryService<Category> {
    constructor (
        @Inject(Category) model: MongooseModel<Category>
    ) {
        super(model);
    }
}