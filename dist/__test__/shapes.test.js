"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const cirle = {
    shape: 'circle',
    dimension: 5
};
const rectangle = {
    shape: 'rectangle',
    dimension: { "a": 4, "b": 7 },
    area: 28
};
const square = {
    shape: 'square',
    dimension: { "a": 4 },
    area: 16
};
const triangle = {
    shape: 'triangle',
    dimension: { "a": 5, "b": 6, "c": 3 },
    area: 7.48
};
describe('GET Request that fetches all records of shapes and result ', () => {
    const expected = ["circle", "square", "rectangle", "triangle"];
    it('matches if recieved contains expected element', (done) => {
        supertest_1.default(app_1.default).get('/fetchRecords');
        expect(200);
        expect(["circle", "square", "rectangle", "triangle"]).toStrictEqual(expect.arrayContaining(expected));
        done();
    });
    it('does not match if received does not contain expected element', () => {
        expect(["square", "circle", "trianlge", "orange"]).not.toEqual(expect.arrayContaining(expected));
    });
});
describe("POST Request that calculate and saves the result of a defined shape", () => {
    it('test for the cicrle shape', () => {
        expect(cirle.shape).toBe('circle');
        expect(cirle.dimension).toEqual(5);
    });
    it('test for the rectangle shape', () => {
        expect(rectangle.shape).toBe('rectangle');
        expect(Object.keys(rectangle.dimension).length).toBe(2);
        expect(rectangle.area).toBeCloseTo(28);
    });
    it('test for the square shape', () => {
        expect(square.shape).toBe('square');
        expect(square.dimension).toStrictEqual({
            a: 4
        });
        expect(square.area).toBeCloseTo(16);
    });
    it('test for the triangle shape', () => {
        expect(triangle.shape).toBe('triangle');
        expect(triangle.dimension).toStrictEqual({
            a: 5, b: 6, c: 3
        });
        expect(triangle.area).toBeCloseTo(7.48);
    });
});
