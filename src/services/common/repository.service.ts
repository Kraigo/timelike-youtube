import { MongooseModel } from "@tsed/mongoose";

export class RepositoryService<T> {

    constructor(
        protected model:  MongooseModel<T>
    ) {}

    public async create(obj: T): Promise<T> {
        const doc = new this.model(obj);
        await doc.save();
        return doc;
    }

    public async update(id: string, obj: T): Promise<T> {
        return await this.model.findByIdAndUpdate(id, obj).exec();
    }

    public async createOrUpdate(predicate, obj: T) {
        return predicate._id
            ? await this.model.findOneAndUpdate(predicate, obj, {upsert: true}).exec()
            : await this.create(obj);
    }

    public async find(id: string): Promise<T> {
        return await this.model.findById(id).exec();
    }

    public async query(options = {}): Promise<T[]> {
        return await this.model.find(options).exec();
    }

    public async remove(id: string): Promise<T> {
        return await this.model.findById(id).remove().exec();
    }
}