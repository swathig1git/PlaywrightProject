

import { test as basetest } from '@playwright/test';

interface TestDataForOrder{
  userName: string,
  password: string,
  productName: string
}

export const customtest = basetest.extend<{testDataForOrder:TestDataForOrder}>({
  testDataForOrder: [
    {
      userName: "swathi.g12025@gmail.com",
      password: "RahulShetty123$",
      productName: "ADIDAS ORIGINAL"
    },
    { option: true }  // Static fixture: Provides the value directly, no teardown
  ]
});