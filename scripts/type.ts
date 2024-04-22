export interface IngredientNode {
    type: 'ingredient';
    name: string;
    quantity?: number;
    unit?: string;
    main?: boolean;
    optional?: boolean;
    preparation?: string[];
}

export interface CookwareNode {
    type: 'cookware';
    name: string;
    quantity?: number;
}

export interface TimerNode {
    type: 'timer';
    name: string;
    quantity?: string;
    unit?: string;
}

export interface TextNode {
    type: 'text';
    content: string;
}

export interface CommentNode {
    type: 'comment';
    subType: 'inline' | 'block';
    content: string;
}

export interface OperatorNode {
    type: 'operator';
    name: 'separator' | 'step_starter';
}

export interface MetadataNode {
    type: 'metadata',
    name: string;
    value: string;
}

export type AstNode = IngredientNode | CookwareNode | TimerNode
| TextNode | OperatorNode | MetadataNode | CommentNode;

interface Ingredient {
    name: string;
    preparation?: string[];
    link?: string;
    metric: {
        amount: number;
        unit: string;
    };
    variants: string[];
    converter?: string;
    scale?: number;
    optional?: boolean;
}

interface Instruction {
    content: string;
    variants?: string[];
}

export interface IStep {
    ingredients: Ingredient[];
    instructions: Instruction[];
}
