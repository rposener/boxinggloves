import {Model} from "../../src/model/model"

describe('The Model class', function() {
    var model = new Model({test:"me"});
    it("can be created", function() {
        expect(model).not.toBeNull();
        expect(model).toBeInstanceOf(Model);
    })
    it("fullModel returns a model", function(){
        const m = model.fullModel;
        expect(m).toBeInstanceOf(Object);
        expect(m.test).toEqual("me");
    })
    it("updating fullModel does not affect the model", function(){
        const m = model.fullModel;
        m.test = "you";
        expect(model.fullModel.test).toEqual("me");
    })
    it("you can retrieve a path from the model", function(){
        const _test = model.getValue("test");
        expect(_test).toEqual("me");
    })
})