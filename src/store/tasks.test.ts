import {ActionType, div, mult, numberReducer, sub, sum} from "./tasks";

test('sum of two numbers', () => {
     const a = 2;
     const b = 3;
     const result = sum(a, b)
     expect(result).toBe(5)
})
test('subtract of two numbers', () => {
     expect(sub(6, 5)).toBe(1)
})
test('multiply of two numbers', () => {
     expect(mult(5, 5)).toBe(25)
})
test('division of two numbers', () => {
     expect(div(100, 2)).toBe(50)
})

test('sum with numberReducer', ()=> {
     const salary = 1000
     const action: ActionType = {
          type: "SUM",
          num: 300
     }
     const result = numberReducer(salary, action)

     expect(result).toBe(1300)
})
