import { _electron } from 'playwright';

import { test } from '@playwright/test'

test.describe("Electron Test", async ()  =>
{

     test("Electron APP Test", async () => 
     {

        let pathEXE = "C:/Hexagon/Mining/MineMeasure Office/mine-measure-office.exe"

        // Launch Electron app.
        const electronApp = await _electron.launch( { executablePath: pathEXE } );
    
        // Evaluation expression in the Electron context.
        const appPath = await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath()
        });
        console.log(appPath)
    
        // Get the first window that the app opens, wait if necessary.
        const window = await electronApp.firstWindow();
        // Print the title.
        console.log(await window.title());
        // Capture a screenshot.
        await window.screenshot({ path: 'intro.png' });
        // Direct Electron console to Node terminal.
        window.on('console', console.log);
        // Click button.
        await window.click('text=Click me');

        await electronApp.close();

     })

})

