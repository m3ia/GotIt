const addDays = require("date-fns/addDays");

const { getNextStartDate } = require("../src/ItemRow");

describe("A suite", function () {
  it("contains spec with an expectation", function () {
    const firstDate = new Date(2014, 8, 1);
    const secondDate = addDays(firstDate, 10);
    const nextStartDate = getNextStartDate(secondDate);
    expect(firstDate).not.toEqual(secondDate);
  });
});

describe("A date string", function () {
  it("should be converted to a date", function () {
    const dateString = "2021-05-23";
    const [year, month, day] = dateString.split("-").map((t) => parseInt(t));
    const dateToDateType = new Date(year, month - 1, day, 0, 0, 0);
    expect(dateToDateType).toEqual("2021-04-23, 0, 0, 0");
  });
});
