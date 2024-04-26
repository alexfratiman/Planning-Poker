// jest

require("../app/votes-processing");

describe("calculateAverage", () => {
    it("should be defined", () => {
        expect(window.calculateAverage).toBeDefined();
    });
    it("should return the same value if given only 1 vote", () => {
        const input = [{
            "name": "john",
            "vote": 13
        }];
        // because of the to.fixed(2) function, it should return a string
        const expected = "13.00";
        const actual = window.calculateAverage(input);
        expect(actual).toBe(expected);
    });
    it("should return the first value if all votes are the same", () => {
        const input = [{
            "name": "john",
            "vote": 5
        },
            {"name": "anne",
            "vote": 5
        }];
        const expected = "5.00";
        const actual = window.calculateAverage(input);
        expect(actual).toBe(expected);
    });
    it("should return the average if given different votes", () => {
        const input = [{
            "name": "john",
            "vote": 21
        },
            {"name": "anne",
            "vote": 13
        },
            {"name": "mary",
            "vote": 55
        }];
        const expected = "29.67";
        const actual = window.calculateAverage(input);
        expect(actual).toBe(expected);
    });
});

describe("checkConsensus", () => {
    it("should return true if given only 1 vote", () => {
        const input = [{
            "name": "john",
            "vote": 13
        }];
        const expected = true;
        const actual = window.checkConsensus(input);
        expect(actual).toBe(expected);
    });
    it("should return true if all votes are the same", () => {
        const input = [{
            "name": "john",
            "vote": 5
        },
            {"name": "anne",
            "vote": 5
        }];
        const expected = true;
        const actual = window.checkConsensus(input);
        expect(actual).toBe(expected);
    });
    it("should return false if given different votes", () => {
        const input = [{
            "name": "john",
            "vote": 21
        },
            {"name": "anne",
            "vote": 13
        },
            {"name": "mary",
            "vote": 55
        }];
        const expected = false;
        const actual = window.checkConsensus(input);
        expect(actual).toBe(expected);
    });
});
