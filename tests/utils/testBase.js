

const { test:base } = require('@playwright/test');

exports.customtest = base.test.extend({
  testDataForOrder: [
    {
      username: "swathi.g12025@gmail.com",
      password: "RahulShetty123$",
      productName: "ADIDAS ORIGINAL"
    },
    { option: true }  // Static fixture: Provides the value directly, no teardown
  ]
});