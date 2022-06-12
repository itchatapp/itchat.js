import { build, emptyDir } from 'https://deno.land/x/dnt@0.23.0/mod.ts';

const [name, version] = Deno.args;

if (!name || !['rest', 'utils', 'client'].includes(name)) {
  console.log('Invalid module name');
  Deno.exit();
}

if (!version) {
  console.log('Missing version');
  Deno.exit();
}

await emptyDir('./npm');

await build({
  packageManager: 'pnpm',
  scriptModule: false,
  test: false,
  entryPoints: [`./modules/${name}/mod.ts`],
  outDir: './npm',
  shims: {},
  package: {
    name: `@itchatapp/${name}`,
    version: Deno.args[0].replace(/[A-Z]+/gi, ''),
    description: `${name} module for itchat.js`,
    license: 'MIT',
    repository: {
      type: 'git',
      url: 'git+https://github.com/itchatapp/itchat.js.git',
    },
    bugs: {
      url: 'https://github.com/itchatapp/itchat.js/issues',
    },
    engines: {
      node: '>=16.0.0',
    },
    files: [
      'esm/*',
      'types/*',
    ],
  },
});

Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', 'npm/README.md');
