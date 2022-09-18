import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';

const configs = {
  input: `src/index.ts`,
  output: [
    {
      file: 'dist/es/contracts.js',
      format: 'es',
    },
    {
      file: `dist/cjs/contracts.js`,
      format: 'cjs',
    },
  ],
  plugins: [
    localResolve({
      extensions: ['.js', '.ts'],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
    cleanup({
      extensions: ['js', 'ts'],
      sourcemap: false,
    }),
  ],
  external: ['@sns/contracts/common'],
};

export default configs;
