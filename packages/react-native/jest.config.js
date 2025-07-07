module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom', // or 'node' if preferred for RN testing without DOM access for component tree
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensure babel-jest is configured if not using react-native preset's default
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Jest will automatically look for __tests__ folders and .test.js, .spec.js files
  // If your tests are elsewhere or named differently, configure testMatch or testRegex
  // For example:
  // testMatch: [
  //   "**/src/**/*.test.tsx"
  // ],

  // Setup files can be used for global mocks or test setup
  // setupFilesAfterEnv: ['./jest-setup.js'], // if you have a setup file

  // Mock native modules that Jest can't handle
  moduleNameMapper: {
    // For mocking assets like images or styles:
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js', // Create this mock file
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js', // Create this mock file
    // You might need to mock other specific react-native modules if they cause issues
    // For example, if 'react-native-gesture-handler' or others are used directly/indirectly
    // and are not transpiled or are problematic in Jest
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
};
