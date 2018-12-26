import { IgnoreProperty, Property, Required } from "@tsed/common";
import { Model, Ref } from "@tsed/mongoose";
@Model()
export class Category {    
    // @IgnoreProperty()
    @Property()
    _id?: string;

    @Property()
    title: string;
    @Property()
    icon: string;

}