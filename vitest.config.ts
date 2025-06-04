import { defineConfig } from 'vitest/config';

export default defineConfig({

    test: {

        environment: 'node',
        globals: true, // Opcional: permite usar funções como describe, it, etc., sem importá-las
        coverage: {

            provider: 'v8',
            reporter: 'html'

        },
        mockReset: true,
        setupFiles: ['__tests__/testServer.setup.ts'],
        include: ['**\/*.{test,spec}.?(c|m)[jt]s?(x)'],
        exclude: ['**\/node_modules/**', '**\/dist/**']

    }

});
