import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFileSync,
} from '@vvi/node';

// 原始 package.json 内容
let packageJson = readFileToJsonSync('./package.json');
const dependencies = packageJson.dependencies;
// 移除冗余的键
[
  'scripts',
  'devDependencies',
  'lint-staged',
  'private',
  'dependencies',
  'packageManager',
  'jja',
  'type',
].forEach(key => delete packageJson[key]);
const esPrefix = 'es'; // es 前缀
const cjsPrefix = 'cjs'; // cjs 前缀
const dtsPrefix = 'es'; // 类型文件的前缀
// 查看当前打包 dist 文件路径
const distParentPath = getDirectoryBy('dist', 'directory');

packageJson = {
  ...packageJson,
  main: cjsPrefix + '/index.js', // 旧版本 CommonJs 入口
  types: dtsPrefix + '/index.d.ts', // 旧版本类型入口
  author: {
    name: '泥豆君',
    email: 'MudBean@outlook.com',
    url: 'https://mudbean.cn',
  },
  description: '设置 HTML 元素节点行内样式',
  sideEffects: false, // 核心：开启 Tree Shaking
  license: 'MIT',
  files: [esPrefix, cjsPrefix, 'LICENSE', 'README.md', 'CHANGELOG.md'],
  exports: {
    '.': {
      import: {
        default: `./${esPrefix}/index.js`,
        types: `./${dtsPrefix}/index.d.ts`,
      },
      require: {
        default: `./${cjsPrefix}/index.js`,
        types: `./${dtsPrefix}/index.d.ts`,
      },
    },
  },
  keywords: [
    'element-inline-style',
    'inline style',
    '行内样式',
    '简单写入样式',
    'vvi',
  ],
  homepage: 'https://npms.gleanings.cn/inline-style',
  dependencies,
  bugs: {
    url: 'https://github.com/hippopotomonstrosesquipedaliophobe/inline-style/issues',
    email: 'MudBean@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/hippopotomonstrosesquipedaliophobe/inline-style.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  engines: {
    // globalThis 支持的最低版本的 node 为 12
    node: '>=18.0.0',
  },
  browserslist: ['last 2 versions not ie <= 11'],
};

{
  // 整理打包后 package.json 文件路径
  const distPackagePath = pathJoin(distParentPath, './dist/package.json');
  // 写入新的 packages.json 文件
  writeJsonFileSync(distPackagePath, packageJson);
}
