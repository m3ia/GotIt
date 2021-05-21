const addDays = require("date-fns/addDays");

describe("A suite", function () {
  it("contains spec with an expectation", function () {
    const firstDate = new Date(2014, 8, 1);
    const secondDate = addDays(firstDate, 10);
    expect(firstDate).toEqual(secondDate);
  });
});
