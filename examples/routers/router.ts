import { Request, Response } from "express";

import { Get, Post } from "../../src/core/decorators/methods.decorator";
import { Router } from "../../src/core/decorators/router.decorator";

@Router("/")
export default class FruitRouter {
    private fruits: Array<{ name: string }> = [
        { name: "Watermelon" },
        { name: "Apple" },
    ];

    @Get("/")
    public index(req: Request, res: Response): void {
        res.json({ fruits: this.fruits });
    }

    @Post("/")
    public add(req: Request, res: Response): void {
        this.fruits.push(req.body);

        res.status(204).json();
    }

    @Get("/:name")
    public findByName(req: Request, res: Response): unknown {
        const { name } = req.params;

        const fruit = this.fruits.find((c) => c.name === name);

        if (fruit) {
            return res.json({ fruit });
        }

        return res.status(404).json({ message: "Fruit not found!" });
    }
}
