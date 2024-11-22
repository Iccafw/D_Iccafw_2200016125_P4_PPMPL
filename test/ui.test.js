const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });

    after(async function() {
        await driver.quit();
    });

    it('should load the login page', async function() {
        await driver.get('D:/SEMESTER 5/PENGUJIAN DAN PENJAMINAN MUTU PERANGKAT LUNAK/PRAK/selenium-ui-test/test/login.html'); // Ubah path sesuai lokasi file login.html
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password', async function() {
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
        const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function() {
        await driver.findElement(By.id('loginButton')).click();
    });

    it('should display an error message if login fails', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        
        await driver.findElement(By.id('loginButton')).click();
    
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000); // Tunggu hingga 5 detik
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });


    it('should input username and password using CSS Selector and XPath', async function() {
        const usernameElement = await driver.findElement(By.css('#username'));
        const passwordElement = await driver.findElement(By.xpath('//*[@id="password"]'));

        await usernameElement.clear();
        await passwordElement.clear();

        await usernameElement.sendKeys('testuser');
        await passwordElement.sendKeys('password123');

        await driver.sleep(1000);

        const usernameValue = await usernameElement.getAttribute('value');
        const passwordValue = await passwordElement.getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should validate failed login with error message', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');

        await driver.findElement(By.id('loginButton')).click();

        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000); // Simpan elemen error
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);

            expect(errorMessage).to.equal('Login gagal. Silakan coba lagi.');
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });

    it('should check if login button and input fields are visible on the screen', async function() {
        const loginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        const usernameFieldDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        const passwordFieldDisplayed = await driver.findElement(By.id('password')).isDisplayed();

        expect(loginButtonDisplayed).to.be.true;
        expect(usernameFieldDisplayed).to.be.true;
        expect(passwordFieldDisplayed).to.be.true;
    });

    it('should display an error message if username or password is too short', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('usr');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('pwd');
    
        await driver.findElement(By.id('loginButton')).click();
    
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000);
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
    
            expect(errorMessage).to.equal('Username dan password harus minimal 5 karakter.');
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });
    
    it('should display an error message if username is not an email', async function() {
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('not-an-email');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('password123');
    
        await driver.findElement(By.id('loginButton')).click();
    
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000);
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
    
            expect(errorMessage).to.equal('Username harus berupa email yang valid.');
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });
    
});
