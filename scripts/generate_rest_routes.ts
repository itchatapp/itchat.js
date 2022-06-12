import type {
    OpenAPI3,
    ReferenceObject,
    SchemaObject,
} from 'https://raw.githubusercontent.com/brecert/revolt-api/main/scripts/types.ts';

const routes: string[] = [];
const OpenAPI: OpenAPI3 = await fetch('http://api.itchat.world/openapi.json')
    .then((r) => r.json());

function getType(schema: ReferenceObject | SchemaObject): string {
    if (schema == null) return 'undefined';
    if ('$ref' in schema) {
        schema = OpenAPI.components!.schemas![schema.$ref.split('/').pop()!];
    }

    const isReference = (x: unknown): x is ReferenceObject =>
        typeof x === 'object' && '$ref' in x!;

    if (isReference(schema)) return getType(schema);

    const nullable = (type: string) =>
        type + ((schema as SchemaObject).nullable ? ' | null' : '');

    const extractedTypes: Record<string, string> = {};

    if (schema.items) {
        if (Array.isArray(schema.items)) {
            return '[' + schema.items.map((t) => getType(t)).join(', ') + ']';
        }

        return nullable(getType(schema.items) + '[]');
    }
    if (schema.allOf) {
        return nullable(
            '( ' + (schema.allOf as ReferenceObject[]).map((x) =>
                getType(x)
            ).join(' & ') + ' )',
        );
    }
    if (schema.anyOf) {
        return '( ' + schema.anyOf.map((x) => getType(x)).join(' | ') + ' )';
    }
    if (schema.oneOf) {
        return '( ' + schema.oneOf.map((x) => getType(x)).join(' | ') + ' )';
    }
    if (schema.enum) return schema.enum.map((e) => `'${e}'`).join(' | ');
    if (
        schema.additionalProperties &&
        typeof schema.additionalProperties !== 'boolean'
    ) {
        return `{ [key: string]: ${getType(schema.additionalProperties)} }`;
    }

    if (schema.properties) {
        for (const [name, prop] of Object.entries(schema.properties)) {
            extractedTypes[schema.required?.includes(name) ? name : `${name}?`] =
                getType(prop);
        }
    }

    if (schema.type === 'integer') schema.type = 'number';
    if (schema.type && Object.keys(extractedTypes).length === 0) {
        extractedTypes.type = schema.type;
        if (schema.nullable) extractedTypes.type = nullable(extractedTypes.type);
        return extractedTypes.type;
    }

    return '{ ' + Object.entries(extractedTypes).map(([key, value]) => {
        return `${key.replace('r#', '')}: ${value},`;
    }).join(' ') + ' }';
}

for (const [path, methods] of Object.entries(OpenAPI.paths!)) {
    for (const [method, data] of Object.entries(methods)) {
        const schema = data.responses['200']?.content?.['application/json']?.schema;
        const typedResponse = getType(schema);
        const typedPath = path.replace(
            /\{(target|id|user|code|role_id|member|msg|server|message|username|_target|bot|group|channel|invite|session)(_id)?\}/g,
            '${string}',
        );

        const route = `{
              path: \`${typedPath}\`
              parts: ${typedPath.split('/').length - 1}
              method: '${method.toUpperCase()}'
              response: ${typedResponse}
          }`;

        routes.push(route);
    }
}

Deno.writeTextFileSync(
    'modules/rest/src/types/routes.ts',
    `
  export type Routes = ${routes.join(' | ')}
  export type GetRoutes = Extract<Routes, { method: 'GET' }>
  export type DeleteRoutes = Extract<Routes, { method: 'DELETE' }>
  export type PostRoutes = Extract<Routes, { method: 'POST' }>
  export type PatchRoutes = Extract<Routes, { method: 'PATCH' }>
  export type PutRoutes = Extract<Routes, { method: 'PUT' }>
  `,
);