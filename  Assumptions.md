3 HOURS was spent to do that home task.

Notes:

API testing should be implemented via API calls directly ( A framework is based on test runner and request libraries with assertions)
For instance : gotjs/axios + nodejs assert library/chai + jest/mocha

{ 
Note: I wrote this for the reason that I thought I needed to automate the Swagger UI and make requests through it and not through the Cypress API

The problem with the task is that we are testing  API through/using Swagger UI.
As for API testing - we do not need to test Swagger itself.( it's an extra and unnecessary/excess component)
As a rule, swagger needs to be maintained separately and this requires effort and sometimes the way the swagger works is different from how it is implemented in the API itself 
}

For API testing we can connect and then use JSON SCHEMA validator.(npm modules) 
It allows to match your existing response against your swagger/openapi docs.

As for the task  we should check all required swagger components. ( Swagger UI + API) for end-users
For that purposes we should check :
1. CORS 
2. Elements( endpoint opened - closed, locked - unlocked(talk about auth))
3. Body example is provided or not
4. Check it the schema is valid for each endpoint


Just API

Create a Pet is an idempotency endpoint,for instance, A user makes multiple identical requests and receive the same response every time.

Issues: 
#1 https://petstore3.swagger.io/#/pet/addPet takes id as an argument
#2 Errors 4xx, 5xx groups are not handled correctly and the provided errors/validation messages are not user-friendly at all
#3 The endpoint find by tags doing search only by tag names 


I just had 3 hours and I spent those hours diving in Cypress than writings scenarios

Scenarios that I should have covered by tests 
1. the user is trying to find a previously created and after deleted pet
2. the user is trying to update a previously created and after deleted pet
3. the user creates a pet with more than 1 tag and then the user tries to find a pet with each tag separately and then using all tags in the same time. 
4. Boundaries for each field in 3 requests
5. lower-upper case for the searching of pets by tags
6. the user creates entities with specified ids


  
