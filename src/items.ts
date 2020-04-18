export interface ItemDefinition {
    id: string;
    small: Function;
    inspect?: {
        init: Function,
        object?: any;
    };
}

export const items = {
    'monkey': {
        id: 'monkey',
        small: () => 'inv-monkey',
        inspect: {
            init: scene => scene.add.image(640, 360, 'inv-monkey'),
            object: null
        }
    }
}