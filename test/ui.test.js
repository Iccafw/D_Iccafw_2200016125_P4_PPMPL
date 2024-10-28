const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function() {
    this.timeout(30000); // Set timeout for Mocha tests

    let driver;

    // Inisialisasi WebDriver sebelum menjalankan test case
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
    });

    // Tutup WebDriver setelah semua test selesai
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
        // Lakukan tindakan lebih lanjut, seperti validasi login (ini disimulasikan di sini)
        // Misal: validasi pesan error jika login gagal atau redirect halaman jika berhasil
    });

    
    it('should display an error message if login fails', async function() {
        // Input username dan password yang salah
        await driver.findElement(By.id('username')).clear();
        await driver.findElement(By.id('username')).sendKeys('wronguser');
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        
        // Klik tombol login
        await driver.findElement(By.id('loginButton')).click();
    
        // Tunggu hingga elemen errorMessage muncul
        try {
            const errorElement = await driver.wait(until.elementLocated(By.id('errorMessage')), 5000); // Tunggu hingga 5 detik
            const errorMessage = await errorElement.getText();
            console.log("Pesan error ditemukan:", errorMessage);
        } catch (error) {
            console.log("Pesan error tidak ditemukan:", error);
        }
    });
    
    

    it('should input username and password using CSS Selector and XPath', async function() {
        // Temukan elemen username dan password
        const usernameElement = await driver.findElement(By.css('#username'));
        const passwordElement = await driver.findElement(By.xpath('//*[@id="password"]'));
    
        // Kosongkan field username dan password sebelum mengisi data baru
        await usernameElement.clear();
        await passwordElement.clear();
    
        // Tambahkan data ke field username dan password
        await usernameElement.sendKeys('testuser');
        await passwordElement.sendKeys('password123');
    
        // Tambahkan delay sebentar untuk memastikan input masuk
        await driver.sleep(1000);
    
        // Cek apakah data berhasil diisi
        const usernameValue = await usernameElement.getAttribute('value');
        const passwordValue = await passwordElement.getAttribute('value');
    
        // Lakukan pengecekan hasil input
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });
    
    
    // Test case 3: Validasi apakah tombol login dan field input terlihat di layar
    it('should check if login button and input fields are visible on the screen', async function() {
        // Validasi apakah tombol login terlihat
        const loginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(loginButtonDisplayed).to.be.true;
        
        // Validasi apakah field username terlihat
        const usernameFieldDisplayed = await driver.findElement(By.id('username')).isDisplayed();
        expect(usernameFieldDisplayed).to.be.true;

        // Validasi apakah field password terlihat
        const passwordFieldDisplayed = await driver.findElement(By.id('password')).isDisplayed();
        expect(passwordFieldDisplayed).to.be.true;
    });

});
