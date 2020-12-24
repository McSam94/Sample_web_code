module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.js'],
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        '^.+\\.(jpg|jpeg|png|gif)$': '<rootDir>/src/__test__/fileMock.js',
        '^Stores(.*)$': '<rootDir>/src/store',
        '^Utils(.*)$': '<rootDir>/src/utils',
        '^Services(.*)$': '<rootDir>/src/services',
        '^Icons(.*)$': '<rootDir>/src/assets/icons',
    },
};
