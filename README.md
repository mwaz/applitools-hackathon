### Install package dependencies 
First install package dependencies so that you are able to run the tests as they use cypress framework and Javascript as the language. 

```
npm ci
```

### Running tests locally 

```
npx cypress run
```
### Running Visual AI tests 

```
npm run test:visual:dev
```

### Running Traditional  tests 

```
npm run test:functional:dev
```

#### Debug Cypress Tests
```
npx cypress open 
```
#### Page Objects

PageObjects found under the directory cypress/pageObjects are used to encapsulate the test logic so that in the event of a change its only the objects that change and not the tests themselves

#### Running Applitools  Eyes Visual AI 
To run applitools visual AI one needs to embedd their api_key which is unique to their terminal and export it so that the tests can detect it. 

##### For Windows 
```
set APPLITOOLS_API_KEY = 'Your_api_key'
```

##### For MacOS/linux
```
export APPLITOOLS_API_KEY = 'Your_api_key'
```
After exporting the API_Key no other configuration is needed. 

###### N.B Applitools Visual Eyes is an awesome tool! 😋🤓

##### Contributors 

[Mwaura Waweru](https:github.com/mwaz)

##### Resources
[Cypress](https://cypress.io)
[Applitools Visual AI](https://applitools.com/tutorials/cypress.html)

### Applitools Dashboard 
[Hackathon Dashboard](https://eyes.applitools.com/app/test-results/00000251828636081215/?accountId=2ZeEEVjfSEeXsMcMI7vVaA~~)
