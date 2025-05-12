const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

(async function testForm() {
  let options = new chrome.Options();
  options.addArguments("--start-maximized");
  options.excludeSwitches("enable-logging");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    const filePath = `file://${path.resolve("form.html")}`;
    await driver.get(filePath);

    await driver.findElement(By.id("username")).sendKeys("admin");
    await driver.findElement(By.id("password")).sendKeys("1234");
    await driver.findElement(By.css('button[type="submit"]')).click();

    const message = await driver.wait(
      until.elementLocated(By.id("message")),
      2000
    );
    const text = await message.getText();

    console.log("Test Result:", text === "Login successful" ? "PASS" : "FAIL");

    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();
