## What does this minimal example do?

1. We create a database called `database-template` to run the migration against it
2. We create a new database before every test based on `database-template`. Doing this, saves us a ton of time since the schema is static.
3. We run our test file. It has two tests. Each of them are creating two posts.
4. We run a clean up to remove the temporary database that we created before the test

## Running it

Before you run anything, make sure you started docker:
`docker-compose up`

How to run with prisma **2.x.x**:

1. `npm i --save-dev prisma@2.30.3 @prisma/client@2.30.3`
1. `npm run test`
1. ✅ tests are succeeding

How to run with prisma **3.x.x**:

1. `npm i --save-dev prisma@3.0.2 @prisma/client@3.0.2`
1. `npm run test`
1. ❌ tests are failing

## Summary

In our test file we have two tests. Each test creates two posts.
Since we create a new database before each test, all tests should be isolated and stable.

With prisma 2.x.x this is fine. All tests are passing.

With prisma 3.x.x. this not the case. The client is somehow not able to switch the database between tests. It remains connected to the main database defined on the .env file.

A temporary database is created (and removed afterwards) but switching to it is not possible. Since the prisma client remains connected to one database and the clean up is only running on the temporary database the number of posts is growing. Hence why `npm run test` is failing.