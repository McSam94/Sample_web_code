module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.js'],
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        '^.+\\.(jpg|jpeg|png|gif)$': '<rootDir>/src/__test__/fileMock.js',
        '^Stores(.*)$': '<rootDir>/src/store',
        '^Utils(.*)$': '<rootDir>/src/utils',
        '^Services(.*)$': '<rootDir>/src/services',
        '^Navigation(.*)$': '<rootDir>/src/navigation',
        '^Pages(.*)$': '<rootDir>/src/view/pages',
        '^Components(.*)$': '<rootDir>/src/view/components',
        '^Images(.*)$': '<rootDir>/src/assets/images',
        '^Icons(.*)$': '<rootDir>/src/assets/icons',
    },
};
