const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function runTests() {
  let driver;

  try {
    console.log("Configuring Chrome browser...");
    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--start-maximized");
    chromeOptions.addArguments("--disable-gpu");
    chromeOptions.addArguments("--no-sandbox");

    console.log("Initializing ChromeDriver...");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    console.log("ChromeDriver initialized successfully");
    await driver.manage().window().maximize();
    console.log("Browser window maximized");

    console.log("\n=== Test 1: Successful login with valid credentials ===");
    console.log("Loading login page...");
    await driver.get("file://" + __dirname + "/index.html");
    await driver.sleep(1000); // Slow down for visibility
    console.log("Entering username: admin");
    await driver.findElement(By.id("username")).sendKeys("admin");
    await driver.sleep(500);
    console.log("Entering password: admin123");
    await driver.findElement(By.id("password")).sendKeys("admin123");
    await driver.sleep(500);
    console.log("Clicking Sign in button...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    console.log("Waiting for success alert...");
    await driver.wait(until.alertIsPresent(), 10000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log("Alert text:", alertText);
    await alert.accept();
    await driver.sleep(500);

    if (alertText === "Login successful") {
      console.log("PASS: Login successful alert displayed");
    } else {
      console.error("FAIL: Expected 'Login successful' but got:", alertText);
    }

    // Test 2: Show error for empty username
    console.log("\n=== Test 2: Show error for empty username ===");
    console.log("Loading login page...");
    await driver.get("file://" + __dirname + "/index.html");
    await driver.sleep(1000);
    console.log("Clicking Sign in button with empty username...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    console.log("Checking for username error...");
    const usernameError = await driver.findElement(By.id("usernameError"));
    const isUsernameErrorDisplayed = await usernameError.isDisplayed();
    console.log("Username error displayed:", isUsernameErrorDisplayed);

    if (isUsernameErrorDisplayed) {
      console.log("PASS: Username error displayed");
    } else {
      console.error("FAIL: Username error not displayed");
    }

    // Test 3: Show error for empty password
    console.log("\n=== Test 3: Show error for empty password ===");
    console.log("Loading login page...");
    await driver.get("file://" + __dirname + "/index.html");
    await driver.sleep(1000);
    console.log("Entering username: admin");
    await driver.findElement(By.id("username")).sendKeys("admin");
    await driver.sleep(500);
    console.log("Clicking Sign in button with empty password...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    console.log("Checking for password error...");
    const passwordError = await driver.findElement(By.id("passwordError"));
    const isPasswordErrorDisplayed = await passwordError.isDisplayed();
    console.log("Password error displayed:", isPasswordErrorDisplayed);

    if (isPasswordErrorDisplayed) {
      console.log("PASS: Password error displayed");
    } else {
      console.error("FAIL: Password error not displayed");
    }

    // Test 4: Show error for invalid username
    console.log("\n=== Test 4: Show error for invalid username ===");
    console.log("Loading login page...");
    await driver.get("file://" + __dirname + "/index.html");
    await driver.sleep(1000);
    console.log("Entering username: invaliduser");
    await driver.findElement(By.id("username")).sendKeys("invaliduser");
    await driver.sleep(500);
    console.log("Entering password: anypassword");
    await driver.findElement(By.id("password")).sendKeys("anypassword");
    await driver.sleep(500);
    console.log("Clicking Sign in button...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    console.log("Checking for form error...");
    const formError1 = await driver.findElement(By.id("formError"));
    const errorMessage1 = await driver.findElement(By.id("errorMessage"));
    const isFormErrorDisplayed1 = await formError1.isDisplayed();
    const errorText1 = await errorMessage1.getText();
    console.log("Form error displayed:", isFormErrorDisplayed1);
    console.log("Error message:", errorText1);

    if (isFormErrorDisplayed1 && errorText1 === "Invalid username") {
      console.log("PASS: Invalid username error displayed");
    } else {
      console.error(
        "FAIL: Invalid username error not displayed or incorrect message:",
        errorText1
      );
    }

    // Test 5: Show error for invalid password
    console.log("\n=== Test 5: Show error for invalid password ===");
    console.log("Loading login page...");
    await driver.get("file://" + __dirname + "/index.html");
    await driver.sleep(1000);
    console.log("Entering username: admin");
    await driver.findElement(By.id("username")).sendKeys("admin");
    await driver.sleep(500);
    console.log("Entering password: wrongpassword");
    await driver.findElement(By.id("password")).sendKeys("wrongpassword");
    await driver.sleep(500);
    console.log("Clicking Sign in button...");
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.sleep(1000);

    console.log("Checking for form error...");
    const formError2 = await driver.findElement(By.id("formError"));
    const errorMessage2 = await driver.findElement(By.id("errorMessage"));
    const isFormErrorDisplayed2 = await formError2.isDisplayed();
    const errorText2 = await errorMessage2.getText();
    console.log("Form error displayed:", isFormErrorDisplayed2);
    console.log("Error message:", errorText2);

    if (isFormErrorDisplayed2 && errorText2 === "Invalid password") {
      console.log("PASS: Invalid password error displayed");
    } else {
      console.error(
        "FAIL: Invalid password error not displayed or incorrect message:",
        errorText2
      );
    }
  } catch (error) {
    console.error("Error during test execution:", error);
  } finally {
    if (driver) {
      console.log("\nClosing ChromeDriver...");
      try {
        await driver.quit();
        console.log("ChromeDriver closed successfully");
      } catch (error) {
        console.error("Error closing ChromeDriver:", error);
      }
    }
  }
}

// Run the tests
runTests();
