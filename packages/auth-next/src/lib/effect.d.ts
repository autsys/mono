export declare function Effect(f: () => unknown): {
    map(g: any): any;
    runEffects(x: any): unknown;
    join(x: any): unknown;
    chain(g: any): unknown;
};
