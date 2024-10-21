import { Model } from "../model/model";

export abstract class ViewModel<MT extends Model<MT>> {

    constructor(model:MT) {

    }

    abstract updateObservables(model:MT) : void;
}

