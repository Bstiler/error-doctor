import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'error-doctor',
  },
  plugins: [typescript({
    tsconfigOverride: {compilerOptions: {module: 'ESNext'}},
  })],
};
