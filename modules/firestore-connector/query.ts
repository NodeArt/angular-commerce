export type AnyButObject = string | number | boolean;

export type EqualOp = '==';

export type RangeOp = '<' | '<=' | '>' | '>=';

export type WhereOp = EqualOp | RangeOp;

export type Direction = 'desc' | 'asc';

export type RangeMap = Map<RangeOp, AnyButObject>;

export interface Q {
  path: string;
  equals: Map<string, AnyButObject>;
  range: Map<string, RangeMap>;
  orderBy: Map<string, Direction>;
  limit?: number;
  or: {[key: string]: Array<AnyButObject>};
}

export class Query {

  private query: Q;

  constructor(path: string) {
    this.query = {
      path,
      equals: new Map(),
      range: new Map(),
      orderBy: new Map(),
      or: {},
    };
  }

  public where(fieldName: string, operatorStr: WhereOp, value: AnyButObject): Query {
    switch (operatorStr) {
      case '==': return this.whereEquals(fieldName, value);
      case '>=':
      case '>':
      case '<':
      case '<=': return this.whereRange(fieldName, operatorStr, value);
      default: return this;
    }
  }

  private whereEquals(fieldName: string, value: AnyButObject): Query {
    if (!this.containsInEquals(fieldName) && !this.containsInRange(fieldName)) {
      this.addToEquals(fieldName, value);
    }
    return this;
  }

  private whereRange(fieldName: string, operatorStr: RangeOp, value: AnyButObject): Query {
    if (this.containsInEquals(fieldName)) {
      console.log('Already contains in your equals prop');
    } else if (this.containsInRange(fieldName) && this.containsInRangeByOp(fieldName, operatorStr)) {
      console.log('Already contains in you range prop');
    } else {
      this.addToRange(fieldName, operatorStr, value);
      this.addToOrderBy(fieldName, 'asc');
    }
    return this;
  }

  private containsInEquals(fieldName: string): boolean {
    return this.query.equals && this.query.equals.has(fieldName);
  }

  private containsInRange(fieldName: string): boolean {
    return this.query.range && this.query.range.has(fieldName);
  }

  private containsInRangeByOp(fiedlName: string, operatorStr: RangeOp): boolean {
    return (this.query.range.get(fiedlName) as RangeMap).has(operatorStr);
  }

  private addToEquals(fieldName: string, value: AnyButObject): void {
    this.query.equals.set(fieldName, value);
  }

  private addToRange(fieldName: string, operatorStr: RangeOp, value: AnyButObject): void {
    const fieldMap = this.query.range.get(fieldName);
    if (!fieldMap) {
      this.query.range.set(fieldName, new Map());
    }
    this.query.range.get(fieldName).set(operatorStr, value);
  }

  private addToOrderBy(fieldName: string, direction: 'asc' | 'desc' = 'asc'): void {
    this.query.orderBy.set(fieldName, direction);
  }

  public orderBy(fieldName: string, direction: 'asc' | 'desc' = 'asc'): Query {
    if (!this.containsInEquals(fieldName))  {
      this.addToOrderBy(fieldName, direction);
    }
    return this;
  }

  public limit(limit: number): Query {
    if (!Number.isNaN(Number(limit)) && limit > 0) {
      this.query.limit = limit;
    }
    return this;
  }

  public or(fieldName: string, value: AnyButObject): Query {
    if (!this.containsInEquals(fieldName)) {
      this.addToOr(fieldName, value);
    }
    return this;
  }

  private addToOr(fieldName: string, value: AnyButObject): void {
    if (!this.query.or[fieldName]) {
      this.query.or[fieldName] = [];
    }
    this.query.or[fieldName].push(value);
  }

  public build(): Q {
    return this.query;
  }
}
