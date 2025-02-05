import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    // Usando ts-jest para compilar arquivos TypeScript
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Indica ao Jest para tratar arquivos .ts/.tsx como ESModules
  moduleNameMapper: {
    // Mapeamento de módulos para resolver caminhos personalizados (opcional)
    '^(\.{1,2}/.*)\.js$': '$1', // Garante que imports com .js funcionem corretamente
  },
  testEnvironment: 'node', // Define o ambiente de teste (ex.: node ou jsdom)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensões de arquivos reconhecidas
  transformIgnorePatterns: [
    '/node_modules/(?!(some-esmodule-package)/)', // Transforma pacotes ESM no node_modules, se necessário
  ],
};

export default config;
