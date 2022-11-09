import { ElectronApp } from '../src/Electron'

import { test, expect } from '@playwright/test'

test.describe("Electron App Test", async ()  =>
{

     test("MineMeasure.exe Test", async () => 
     {
      
        let electron = new ElectronApp()

        if (await electron.launch('C:/Hexagon/Mining/MineMeasure Office/', 'mine-measure-office.exe'))
        {

            let window = electron.window

            await window.screenshot('MineMeasure.png')
    
            await window.close()

        }
        else
            electron.fail()

     })

     test("GitHub.exe Test", async () => 
     {
      
        let electron = new ElectronApp()

        if (await electron.launch('C:/Users/abartie/AppData/Local/GitHubDesktop/', 'GitHubDesktop.exe'))
        {

            let window = electron.window

            await window.screenshot('GitHub.png')
    
            await window.close()
        }
        else
            electron.fail()

     })


})