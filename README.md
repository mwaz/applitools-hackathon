Applitools Visual Hackathon is a hackathon aimed at creating awarenesss of the differences between functional testing of web applications and using Visual AI tools to conduct testing. Applotools eyes SDK is a platform that uses Artificial intelligence to check for differences in a web application that would have otherwise been difficult to identify with a nacked eye and too cumbersome to validate using functions and assertions in the tests.


### Installing package dependencies 
To run the tests locally on your machine install package dependencies that are listed in the package.json. The installation will ensure that both cypress and eyes sdk is installed. The installation instructions will also cover installation on Windows, macOS and Linux operating systems.

```
$ npm ci or npm install
```

### Running tests locally 

```
$ npx cypress run
```
### Running Visual AI tests (Modetn approach)

```
$ npm run test:visual:dev
```

### Running Traditional  tests (Traditional approach)

```
$ npm run test:functional:dev
```

#### Debug Cypress Tests
```
$ npx cypress open 
```
#### Page Objects

PageObjects found under the directory cypress/pageObjects are used to encapsulate the test logic so that in the event of a change its only the objects that change and not the tests themselves. Page Objects ensure that the written tests are not only clear but simple to understand for anyone onboarding on to the repository as a new contributor.

#### Running Applitools  Eyes Visual AI 
To run applitools visual AI one needs to export their api_key which is unique to their terminal and export it so that the tests can detect it. To obtain an API_KEY one nees to sign up on the [Applitool site](applitools.com). The API_KEY is used to identify where the visual tests will be uploaded and subsequently where the test dashboard will be located.

##### For Windows 
```
set APPLITOOLS_API_KEY = 'Your_api_key'
```

##### For MacOS/linux
```
export APPLITOOLS_API_KEY = 'Your_api_key'
```
After exporting the API_Key no other configuration is needed. 


##### Contributors 

[Mwaura Waweru](https:github.com/mwaz)

##### Resources
[Cypress](https://cypress.io)
[Applitools Visual AI](https://applitools.com/tutorials/cypress.html)

### Applitools Dashboard 
[Hackathon Dashboard](https://eyes.applitools.com/app/test-results/00000251828636081215/?accountId=2ZeEEVjfSEeXsMcMI7vVaA~~)


#### *DISCLAIMER*: The views expressed in this repository do not necessarily reflect the views of the Organizations that i am affiliated with.