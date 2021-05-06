type Scope = 'global' | 'system' | 'local' | 'memory';

type Kind =
  | 'dictionary'
  | 'registry'
  | 'entity'
  | 'details'
  | 'relation'
  | 'form'
  | 'view'
  | 'projection'
  | 'log'
  | 'struct'
  | 'scalar';

export class Schema {
  name: string;
  scope: Scope;
  kind: Kind;
  fields: object;
  indexes: object;
  validate: Function | null;
  format: Function | null;
  parse: Function | null;
  serialize: Function | null;
  constructor(name: string, raw: object);
  preprocess(defs: object): void;
  preprocessIndex(key: string, def: object): object;
  static from(raw: object): Schema;
  check(value: any): { valid: boolean; errors: Array<string> };
}

export function createSchema(name: string, src: string): Schema;
export function loadSchema(fileName: string): Promise<Schema>;
export function readDirectory(dirPath: string): Promise<Map<string, object>>;

export class Model {
  types: object;
  entities: Map<string, object>;
  database: object;
  order: Set<string>;
  constructor(types: object, entities: Map<string, object>, database?: object);
  static load(modelPath: string, systemTypes?: object): Promise<Model>;
  preprocess(): void;
  checkReferences(name: string): void;
  reorderEntity(name: string, base?: string): void;
  saveTypes(outputFile: string): Promise<void>;
}