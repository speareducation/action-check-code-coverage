import { parseCoverage } from './parse-coverage.js';
import { it, assert } from 'vitest';

it('parses phpunit coverage.txt', async () => {
    const outputTxt = `

    Code Coverage Report:      
      2022-12-05 19:19:13      
                               
     Summary:                  
      Classes: 69.57% (16/23)  
      Methods: 66.67% (34/51)  
      Lines:   88.42% (359/406)
    
    \\App\\Console::App\\Console\\Kernel
      Methods: 100.00% ( 2/ 2)   Lines: 100.00% (  7/  7)
    \\App\\Console\\Commands::App\\Console\\Commands\\ImportSummitCE
      Methods:  66.67% ( 2/ 3)   Lines:  98.70% ( 76/ 77)
    `;

    const actual = parseCoverage(outputTxt);
    assert.strictEqual(88.42, actual);
});

it('parses ava-c8 jest-results.txt', async () => {
    const outputTxt = `
    > spear-api@1.1.0 test:coverage
    > NODE_ENV=test c8 ava --serial
    
    
      - src â€º datasources â€º AccountsDataSource â€º create address
    [error] (node:473) [MONGODB DRIVER] Warning: Top-level use of w, wtimeout, j, and fsync is deprecated. Use writeConcern instead.
    (Use \`node --trace-warnings ...\` to show where the warning was created)
    [error] (node:473) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
      âœ” src â€º datasources â€º AccountsDataSource â€º initializes and can authorize
    [error] (node:473) [MONGODB DRIVER] Warning: Top-level use of w, wtimeout, j, and fsync is deprecated. Use writeConcern instead.
    (Use \`node --trace-warnings ...\` to show where the warning was created)
    [error] (node:473) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
      âœ” src â€º entities â€º patient â€º Video â€º can initialize
      âœ” src â€º entities â€º patient â€º Video â€º can create and retrieve an instance
      â”€
    
      259 tests passed
      1 test skipped
      5 tests todo
    -------------------------|---------|----------|---------|---------|---------------------------------
    File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s               
    -------------------------|---------|----------|---------|---------|---------------------------------
    All files                |   91.91 |       59 |   71.21 |   91.91 |                                 
     datasources             |   90.91 |    54.83 |   91.11 |   90.91 |                                 
      AccountsDataSource.ts  |      89 |    47.61 |   83.33 |      89 | 71-84,114-115,265-279           
      AtlassianDataSource.ts |   31.11 |       20 |      50 |   31.11 | 26-87                           
      talkResolvers.ts       |   95.23 |      100 |       0 |   95.23 | 16                              
     services                |      52 |    33.33 |   66.66 |      52 |                                 
      Netsuite.ts            |      52 |    33.33 |   66.66 |      52 | 74-145                          
    -------------------------|---------|----------|---------|---------|---------------------------------
    
    =============================== Coverage summary ===============================
    Statements   : 91.91% ( 7533/8196 )
    Branches     : 59% ( 737/1249 )
    Functions    : 71.21% ( 287/403 )
    Lines        : 91.91% ( 7533/8196 )
    ================================================================================
    `;

    const actual = parseCoverage(outputTxt);
    assert.strictEqual(91.91, actual);
});

it('parses jest jest-results.txt', async () => {
    const outputTxt = `
    > spear-practice-solutions-app@1.0.0 test /__w/sps-nuxt/sps-nuxt
    > jest "--coverage"
    
    -------------------------------------------------------|----------|----------|----------|----------|-------------------|
    File                                                   |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
    -------------------------------------------------------|----------|----------|----------|----------|-------------------|
    All files                                              |     91.3 |    78.85 |    92.77 |    91.16 |                   |
     sps-nuxt                                              |      100 |      100 |      100 |      100 |                   |
      apollo.config.js                                     |      100 |      100 |      100 |      100 |                   |
     sps-nuxt/apis/cookies                                 |      100 |      100 |      100 |      100 |                   |
    -------------------------------------------------------|----------|----------|----------|----------|-------------------|
    
    =============================== Coverage summary ===============================
    Statements   : 91.3% ( 273/299 )
    Branches     : 78.85% ( 220/279 )
    Functions    : 92.77% ( 77/83 )
    Lines        : 91.16% ( 268/294 )
    ================================================================================
    
    Test Suites: 36 passed, 36 total
    Tests:       11 skipped, 387 passed, 398 total
    Snapshots:   0 total
    Time:        32.82s
    Ran all test suites.
    `;

    const actual = parseCoverage(outputTxt);
    assert.strictEqual(91.16, actual);
});

it('parses vitest jest-results.txt', async () => {
    const outputTxt = `
    > bookmarks@1.0.0 test:coverage
    > npm run test -- --coverage
    
    
    > bookmarks@1.0.0 test
    > nuxi prepare && NODE_ENV=test vitest run
    
    [log] Nuxi 3.0.0-rc.11
    
     RUN  v0.23.4 /__w/bookmarks-nuxt/bookmarks-nuxt
          Coverage enabled with c8
    
     âœ“ test/components/Header.spec.js > Header > is a Vue instance
     âœ“ test/components/Header.spec.js > Header > can emit search
     âœ“ test/pages/index.test.js > index.vue > can be loaded
     âœ“ test/pages/index.test.js > index.vue > can observe page changes
     âœ“ test/pages/index.test.js > index.vue > can update sort
     âœ“ test/pages/index.test.js > index.vue > can update filters
     âœ“ test/pages/index.test.js > index.vue > can emit search
    
    Test Files  2 passed (2)
         Tests  7 passed | 2 todo (9)
      Start at  18:31:24
      Duration  2.69s (transform 623ms, setup 22ms, collect 962ms, tests 332ms)
    
     % Coverage report from c8
    ---------------------------|---------|----------|---------|---------|-------------------
    File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    ---------------------------|---------|----------|---------|---------|-------------------
    All files                  |   93.04 |    96.55 |    90.9 |   93.04 |                   
     bookmarks-nuxt            |     100 |      100 |     100 |     100 |                   
      vitest.setup.js          |     100 |      100 |     100 |     100 |                   
     bookmarks-nuxt/components |   92.68 |      100 |      50 |   92.68 |                   
      AppHeader.vue            |   92.68 |      100 |      50 |   92.68 | 36-38             
     bookmarks-nuxt/pages      |    92.3 |    96.29 |   94.73 |    92.3 |                   
      index.vue                |    92.3 |    96.29 |   94.73 |    92.3 | 230,237,299-325   
     bookmarks-nuxt/plugins    |     100 |      100 |     100 |     100 |                   
      font-awesome.js          |     100 |      100 |     100 |     100 |                   
    ---------------------------|---------|----------|---------|---------|-------------------
    
    =============================== Coverage summary ===============================
    Statements   : 93.04% ( 428/460 )
    Branches     : 96.55% ( 28/29 )
    Functions    : 90.9% ( 20/22 )
    Lines        : 93.04% ( 428/460 )
    ================================================================================
    `;

    const actual = parseCoverage(outputTxt);
    assert.strictEqual(93.04, actual);
});

