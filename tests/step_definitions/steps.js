const { I } = inject();
const execSync = require('child_process').execSync;

Before(() => {
    execSync('cd ../backend && cross-env NODE_ENV=test node fixtures.js');
});

Given('я нахожусь на странице входа', () => {
    I.amOnPage("/login");
});

When('я ввожу {string} в поле {string}', (value, fieldName) => {
    I.fillField({id: fieldName}, value);
});

When('я нажимаю на кнопку {string}', (button) => {
    I.click({id: button});
});

Then('я перехожу на страницу создания {string} {string}', (value, path) => {
    I.amOnPage(path);
});

Then('я перехожу на главную страницу и вижу текст {string}', (text) => {
    I.see(text);
})

When('я нажимаю на ссылку {string}', (link) => {
    I.click(`#${link}`);
})

When('я нажимаю на {string}', (button) => {
    I.click(`label[for=${button}]`);
})

Then('я вижу элемент {string}', (elem) => {
    I.seeElement(`.${elem}`);
})
