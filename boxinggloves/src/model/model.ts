export class Model<ModelType extends object> {
    private _value:ModelType;

    constructor(defaultValue:(ModelType)) {
            this._value = {...defaultValue};
    }

    /**
     * Returns the full object of the Model
     */
    public get fullModel() : (ModelType) {
        return {...this._value};
    }

    /**
     * Set a Path in the Model
     * any Properties that do not exist, will be created as Objects
     * @param path The Path to Update using dot-notation (e.g. Employee.Name)
     * @param value The value to update at this point in the path
     */
    setValue<T>(path:string, value:T) {
        const keys = path.split('.');
        let current:any = this._value;    
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }    
        current[keys[keys.length - 1]] = 
            Array.isArray(value) ? [...value] : {...value};
    }

    /**
     * Retrieves a Value from the Model
     * @param path The Path to retrieve using dot-notation (e.g. Employee.Company)
     * @returns A value as expected at this path
     */
    getValue<T>(path:Path<ModelType>) {
        const t = path.split('.').reduce((acc, part) => acc && acc[part], this._value as any);
        if (Array.isArray(t))
            return [...t] as T;
        if (typeof t === "object")
            return {...t} as T;
        return t as T;
    }
}