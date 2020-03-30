const extractValuesForKey = require("../src/index");

const superEasyObject = {
    first: {
      second: {
        third: 2
      }
    }
  };

const someObject = {
  uuid: 1,
  innerOne: {
    someKey: "some text"
  },
  innerTwo: {
    uuid: 2,
    innerThree: {
      someOtherKey: "some other text",
      innerFour: {
        uuid: 3
      }
    }
  }
};

const easyObject = {
  first: {
    second: {
      thirdOne: "one",
      high: "two",
      thirdTwo: {
        thirdTwoInner: {
          high: "three"
        }
      },
      thirdThree: {
        fourth: "four"
      }
    }
  },
  seconds: {
    high: 2
  },
  fourth: {
    high: 4
  }
};

test("Should be strict equal to the superEasyObject", () => {
  expect(extractValuesForKey(superEasyObject, "third")).toStrictEqual({
    "first/second": 2,
  });
});

test("Should be strict equal to the someObject", () => {
  expect(extractValuesForKey(someObject, "uuid")).toStrictEqual({
    "": 1,
    "innerTwo": 2,
    "innerTwo/innerThree/innerFour": 3
  });
});


test("Should be strict equal to the wrap someObject", () => {
    const bObj = {someObject};
    expect(extractValuesForKey(bObj, "uuid")).toStrictEqual({
      "someObject": 1,
      "someObject/innerTwo": 2,
      "someObject/innerTwo/innerThree/innerFour": 3
    });
  });