import {
  build,
  emptyDir,
  ShimOptions,
} from 'https://deno.land/x/dnt@0.23.0/mod.ts';

interface PackageMappedSpecifier {
  name: string;
  version?: string;
  subPath?: string;
}

const silent = () => void 0;
const [name, version] = Deno.args,
  shims: ShimOptions = {},
  devDependencies: Record<string, string> = {},
  mappings: Record<string, PackageMappedSpecifier> = {};

if (!name || !['rest', 'utils', 'client'].includes(name)) {
  console.log('Invalid module name');
  Deno.exit(1);
}

if (!version) {
  console.log('Missing version');
  Deno.exit(1);
}

await emptyDir(`./modules/${name}/npm`);

if (name !== 'utils') devDependencies['@types/node'] = '16.x';
if (name === 'client') {
  mappings['https://deno.land/std@0.132.0/node/events.ts'] = {
    name: 'eventemitter3',
    version: '^4.0.7',
  };

  mappings['https://deno.land/x/itchatjs_rest@1.0.4/mod.ts'] = {
    name: '@itchatapp/rest',
    version: '^1.0.4',
  };

  mappings['https://deno.land/x/itchatjs_utils@1.0.3/mod.ts'] = {
    name: '@itchatapp/utils',
    version: '^1.0.3',
  };

  devDependencies['@types/ws'] = '^8.5.3';

  shims.custom = [{
    package: {
      name: '@insertish/isomorphic-ws',
      version: '~4.0.1',
    },
    globalNames: [
      {
        name: 'WebSocket',
        exportName: 'default',
      },
    ],
  }, {
    package: {
      name: 'ws',
      version: '^8.8.0',
    },
    globalNames: [],
  }];
}

if (name === 'rest') {
  shims.custom = [{
    package: {
      name: 'cross-fetch',
      version: '^3.1.5',
    },
    globalNames: [{
      name: 'fetch',
      exportName: 'default',
    }, {
      name: 'Request',
      typeOnly: true,
    }, {
      name: 'Response',
      typeOnly: true,
    }],
  }];
}

await build({
  packageManager: 'pnpm',
  scriptModule: 'cjs',
  test: false,
  entryPoints: [`./modules/${name}/mod.ts`],
  outDir: `./modules/${name}/npm`,
  shims,
  mappings,
  package: {
    name: `@itchatapp/${name}`,
    version: version.replace(/[A-Z]+/gi, ''),
    description: name === 'client'
      ? 'A JS/TS library to interacting with ItChat API'
      : `${name} module for itchat.js`,
    devDependencies,
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
      'script/*',
      'types/*',
    ],
  },
});

await Deno.copyFile(`modules/${name}/LICENSE`, `modules/${name}/npm/LICENSE`)
  .catch(silent);
await Deno.copyFile(
  `modules/${name}/README.md`,
  `modules/${name}/npm/README.md`,
).catch(silent);
