# @newtral/class-validator

## Install

```bash
npm install @newtral/class-validator class-validator
```

## Usage

### @IsOptional()

Validate when the original value is not undefined. Unlike the class-validator one that allows both
`null` and `undefined`

```typescript
import { IsString, validateSync } from 'class-validator';
import { IsOptional } from '@newtral/class-validator';

class User {
  @IsOptional()
  @IsString()
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }
}

const errors = validateSync(new User());
console.log(errors.length); // 0
```

### @IsObjectId()

Validate the value is a valid object id. Could be numeric, string or another object id. It could
useful to pair with the
[ToObjectId](https://www.npmjs.com/package/@newtral/class-transformer#toobjectid) transformer in
order to always convert to an object id instance

```typescript
import { IsString, validateSync } from 'class-validator';
import { IsOptional } from '@newtral/class-validator';
import { ObjectId } from 'mongo';

class User {
  @IsObjectId()
  _id?: string | number | ObjectId;
}
```

## Development

The project use [husky](https://github.com/typicode/husky) and
[lint-staged](https://github.com/okonet/lint-staged) for linting and fixing possible errors on
source code before commit

Git hooks scripts are installed after running `npm install` the first time

### npm run build:commonjs

Compile typescript files from the `src` folder inside the `lib` folder

### npm run build:esm

Compile typescript files from the `src` folder inside the `esm` folder using es modules

### npm run build

Concurrently run both `build:commonjs` and `build:esm`

### npm run clean

Remove the following directories/files

- **lib**
- **esm**
- **reports**

### npm test

Run tests files inside the `tests` folder that matches the following patterns. Exit with code > 0 on
error

- **\*.test.ts**
- **\*.spec.ts**

### npm run cover

The same as `npm test` and generates coverages reports in `reports/coverage`. Exit with code > 0 on
error

### npm run lint

Check eslint errors according to `.eslintrc`

### npm run lint:fix

Run `npm run lint` applying fixes and run prettier on every typescript file

### npm run health

Check for:

- Build errors
- Tests failures
- Lint errors

### npm run ci

Run test and generate every possible report. Do not exit with error code > 0 if the tests fail. It
generates a report file instead

- **reports/lint-checkstyle.xml** Lint report in chackstyle format
- **reports/test-results.xml** Test report in xUnit format
- **reports/coverage/clover.xml** Coverage report in clover format
- **reports/coverage/cobertura-coverage.xml** Coverage report in cobertura format
- **reports/coverage/lcov.info** Coverage report in lcov
- **reports/coverage/index.html** Coverage report in html
