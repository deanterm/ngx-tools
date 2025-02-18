const baseConfig = require('./jest.base.config');


module.exports = {
  ...baseConfig,
  collectCoverageFrom: [
    '<rootDir>/ngx-tools/browser/**/!(public-api|index).ts',
    '!<rootDir>/ngx-tools/browser/**/*.mock.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/browser/',
  testMatch: [
    '<rootDir>/ngx-tools/browser/**/?(*.)spec.ts?(x)',
  ],
}
