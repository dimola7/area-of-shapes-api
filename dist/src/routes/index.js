"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
let filePath = path_1.default.join(__dirname, "../../../database.json");
// post requests
router.post("/calculate", (req, res) => {
    if (!req.body.shape || !req.body.dimension) {
        return res.status(400).send("Please fill in all required fields");
    }
    if (req.body.shape === "square" || req.body.shape === "Square") {
        const database = readData();
        const num = req.body.dimension;
        let areaOfSq = num * num;
        const sqObj = {
            id: database.id,
            shape: req.body.shape,
            dimension: num,
            area: areaOfSq,
            createdAt: new Date(),
        };
        database.data.push(sqObj);
        fs_1.default.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
        res.status(201).json({
            status: "success",
            data: sqObj,
        });
    }
    else if (req.body.shape === "rectangle" || req.body.shape === "Rectangle") {
        if (!req.body.dimension.a || !req.body.dimension.b) {
            return res.json("two parameters are required");
        }
        const database = readData();
        const { a, b } = req.body.dimension;
        let areaOfRec = a * b;
        const recObj = {
            id: database.id,
            shape: req.body.shape,
            dimension: {
                a,
                b,
            },
            area: areaOfRec,
            createdAt: new Date(),
        };
        database.data.push(recObj);
        fs_1.default.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
        res.status(201).json({
            status: "success",
            data: recObj,
        });
    }
    else if (req.body.shape === "triangle" || req.body.shape === "Triangle") {
        if (!req.body.dimension.a ||
            !req.body.dimension.b ||
            !req.body.dimension.c) {
            return res.json("three parameters are required");
        }
        const database = readData();
        const { a, b, c } = req.body.dimension;
        let semiParam = (a + b + c) / 2;
        let areaOfTri = Math.sqrt(semiParam * (semiParam - a) * (semiParam - b) * (semiParam - c));
        const triObj = {
            id: database.id,
            shape: req.body.shape,
            dimension: {
                a,
                b,
                c,
            },
            area: areaOfTri,
            createdAt: new Date(),
        };
        database.data.push(triObj);
        fs_1.default.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
        res.status(201).json({
            status: "success",
            data: triObj,
        });
    }
    else if (req.body.shape === "circle" || req.body.shape === "Circle") {
        const database = readData();
        const num = req.body.dimension;
        let areaOfCirc = Math.PI * (num * num);
        const circObj = {
            id: database.id,
            shape: req.body.shape,
            dimension: num,
            area: areaOfCirc,
            createdAt: new Date(),
        };
        database.data.push(circObj);
        fs_1.default.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
        res.status(201).json({
            status: "success",
            data: circObj,
        });
    }
    else {
        res.json("This shape is not available");
    }
});
// get request
router.get("/fetchRecords", (req, res) => {
    const database = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    res.status(200).json({
        status: "success",
        data: database,
    });
});
const readData = () => {
    try {
        const database = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        const newId = database[database.length - 1].id + 1;
        return {
            id: newId,
            data: database,
        };
    }
    catch (err) {
        console.log(err);
        return {
            id: 1,
            data: [],
        };
    }
};
exports.default = router;
