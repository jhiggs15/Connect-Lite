
import '@testing-library/jest-dom'
import { createArgs } from './createInputs'

describe("createArgs" , () => {
    test("no arguments", () => {
        expect(createArgs()).toStrictEqual({
            variables : {
                input : {},
                where : {}
            }
        })
    })
    
    test("with input but no where", () => {
        const input = {name : "John"}
        expect(createArgs({input})).toStrictEqual({
            variables : {
                input,
                where : {}
            }
        })
    })
    
    
    test("with where but no input", () => {
        const where = {name : "John"}
        expect(createArgs({where})).toStrictEqual({
            variables : {
                input: {},
                where
            }
        })
    })
    
    test("with both where and input", () => {
        const where = {name : "John"}
        const input = {name : "Foo"}
        expect(createArgs({input, where})).toStrictEqual({
            variables : {
                input,
                where
            }
        })
    })

    test("with both where and input reverse", () => {
        const where = {name : "John"}
        const input = {name : "Foo"}
        expect(createArgs({where, input})).toStrictEqual({
            variables : {
                input,
                where
            }
        })
    })
})
