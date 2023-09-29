import {test} from "@playwright/test"
import ENV from "../utils/env"

const Mailosaur = require('mailosaur');

test.describe('Teste @test', () => {
    test('Teste de novo @new', async ({page}) => {
        
        console.log(`${ENV.APIKEY}`)

        const apiKey = `${ENV.APIKEY}`;
        const mailosaur = new Mailosaur(apiKey);
        const serverId = `${ENV.SERVERID}`;
        const serverDomain = `${ENV.SERVERDOMAIN}`;
        
        const testEmail = `blanket-source@${serverDomain}`;
        
        await page.goto('https://example.mailosaur.com/password-reset');
        await page.fill('#email', testEmail);
        await page.click('button[type="submit"]');

        const email = await mailosaur.messages.get(serverId, {
            sentTo: testEmail
        });

        // const email = await mailosaur.messages.get(serverId, {sentTo: testEmail});
        
        // console.log(email);

        console.log(email.text.codes)

        await mailosaur.messages.deleteAll(serverId);
    });

});