export const Inject = (injection: any): any => {
    return (target: any) => {
        const injectables =
            injection.map((injectable: any) => new injectable()) || [];

        return class extends target {
            constructor(...args: any) {
                super(...args, ...injectables);
            }
        };
    };
};
