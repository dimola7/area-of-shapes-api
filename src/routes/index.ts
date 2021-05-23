import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

interface dimensionObj {
  a: number;
  b: number;
  c?: number;
}

interface data {
  id?: number;
  shape: string;
  dimension: dimensionObj | number;
  area: number;
  createdAt: Date;
}

let filePath = path.join(__dirname, "../../../database.json");

// post requests
router.post("/calculate", (req, res) => {
  if (!req.body.shape || !req.body.dimension) {
    return res.status(400).send("Please fill in all required fields");
  }

  if (req.body.shape === "square" || req.body.shape === "Square") {
    const database = readData();
    const num = req.body.dimension;
    let areaOfSq = num * num;
    const sqObj: data = {
      id: database.id,
      shape: req.body.shape,
      dimension: num,
      area: areaOfSq,
      createdAt: new Date(),
    };

    database.data.push(sqObj);

    fs.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
    res.status(201).json({
      status: "success",
      data: sqObj,
    });
  } else if (req.body.shape === "rectangle" || req.body.shape === "Rectangle") {
    if (!req.body.dimension.a || !req.body.dimension.b) {
      return res.json("two parameters are required");
    }
    const database = readData();
    const { a, b } = req.body.dimension;
    let areaOfRec = a * b;

    const recObj: data = {
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
    fs.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
    res.status(201).json({
      status: "success",
      data: recObj,
    });
  } else if (req.body.shape === "triangle" || req.body.shape === "Triangle") {
    if (
      !req.body.dimension.a ||
      !req.body.dimension.b ||
      !req.body.dimension.c
    ) {
      return res.json("three parameters are required");
    }
    const database = readData();
    const { a, b, c } = req.body.dimension;
    let semiParam = (a + b + c) / 2;
    let areaOfTri = Math.sqrt(
      semiParam * (semiParam - a) * (semiParam - b) * (semiParam - c)
    );
    const triObj: data = {
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

    fs.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
    res.status(201).json({
      status: "success",
      data: triObj,
    });
  } else if (req.body.shape === "circle" || req.body.shape === "Circle") {
    const database = readData();
    const num = req.body.dimension;
    let areaOfCirc = Math.PI * (num * num);
    const circObj: data = {
      id: database.id,
      shape: req.body.shape,
      dimension: num,
      area: areaOfCirc,
      createdAt: new Date(),
    };

    database.data.push(circObj);

    fs.writeFileSync(filePath, JSON.stringify(database.data, null, 2));
    res.status(201).json({
      status: "success",
      data: circObj,
    });
  } else {
    res.json("This shape is not available");
  }
});

// get request
router.get("/fetchRecords", (req, res) => {
  const database = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).json({
    status: "success",
    data: database,
  });
});

const readData = () => {
  try {
    const database = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newId = database[database.length - 1].id + 1;
    return {
      id: newId,
      data: database,
    };
  } catch (err) {
    console.log(err);

    return {
      id: 1,
      data: [],
    };
  }
};

export default router;
