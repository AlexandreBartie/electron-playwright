import { _electron } from 'playwright'

import { test, expect } from '@playwright/test'

export class ElectronApp
{

    handle : any

    lib = new ElectronLibrary(this) 

    window = new ElectronWindow(this) 

    constructor()
    {
        
        this.lib = new ElectronLibrary(this)
        
        this.window = new ElectronWindow(this)
    }

    async launch(path: string, name: string) : Promise<boolean>
    {

        let file = path + name

        process.chdir(path)
    
        this.handle = await _electron.launch( { executablePath: file } )

        await this.window.getFirst()

        return (this.handle != undefined)

    }

    async fail()
    {   
        expect(false).toBeTruthy()
    }

}

export class ElectronBase
{

    private app : ElectronApp
    
    get handle() : any { return this.app.handle }

    constructor(app : ElectronApp)
    {
        this.app = app
    }

}

export class ElectronWindow extends ElectronBase
{
    page : any

    get title() : string { return this.page.title() }

    constructor(app : ElectronApp)
    {
        super(app)
    }
   
    async getFirst() : Promise<boolean>
    {
        
        try
        {

            this.page = await this.handle.firstWindow()

            return true

        }
        catch (err)
        {
            console.log("[ERR] Error during getFirstWindow() " + err.message )
        }

        return false
    }

    async screenshot(path: string)
    {
        await this.page.screenshot( path )
    }

    async click(selector: string)
    {
        this.page = await this.page.click(selector)
    }

    async console(name: string)
    {
        this.page = await this.page.on(name, console.log)
    }

    async close()
    {
        await this.page.close()
    }

}

export class ElectronLibrary extends ElectronBase
{
    async path() : Promise<any> { return await this.handle.evaluate(async ({ exe }) => { return exe.getAppPath() }) }  

    constructor(app : ElectronApp)
    {
        super(app)
    }

}
