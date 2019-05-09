# webapp-boilerplate
Boilerplate code for a simple WebApp
## Prerequisites
* A web page running on a SiteVision server
* [The right certificate needs to be installed on the server](https://developer.sitevision.se/docs/webapps/deployment/certificates-and-signing)
* The REST-API needs to be activated on the web page
## Setup
* `git clone https://github.com/sitevision/webapp-boilerplate.git`
* `cd webapp-boilerplate`
* `npm install`
* `npm run setup` make sure that domain and site name conforms to the web page where the WebApp is going to be used
## Building
* `npm run create-addon` create an addon with the name configured in the setup task
* `npm run zip` compress `/src` into `/dist`
* `npm run deploy` compress `/src` into `/dist` and upload to the addon configured in the setup task
* `npm run force-deploy` compress `/src` into `/dist` and upload to the addon configured in the setup task. This will overwrite the current WebApp if it has the same version and id defined in manifest.json
* `npm run sign` compress `/src` into `/dist` and invoke the signing endpoint of the SiteVision developer REST API. A signed version of the WebApp will be created in the `/dist` folder
* `npm run prod-deploy` deploy the signed WebApp to a production environment

[Visit developer.sitevision.se for more information](https://developer.sitevision.se)