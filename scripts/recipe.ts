import { tokens } from './tokens';
import {
    AstNode,
    MetadataNode,
    OperatorNode,
    CommentNode,
    CookwareNode,
    IngredientNode,
    TextNode,
    TimerNode,
    IStep,
} from './type';

interface Metadata {
    course?: string;
    default?: string;
    yield?: string;
    servings?: string;
    storage?: string;
    time?: string;
}

interface IRecipe {
    name: string;
    description: string;
    steps: IStep[];
    metadata: Metadata;
    variants: string[];
}

export class Recipe implements IRecipe {
    #source: string;

    #state = {
        description: false,
        stepIndex: -1,
        lineInfo: {
            instruction: '',
            variants: [] as string[],
        },
    };

    public steps: IStep[] = [];

    public description = '';

    public metadata: Metadata = {};

    public variants: string[] = [];

    constructor(public name, source: string) {
        this.#source = source;
        this.#parse();
        this.variants = Array.from(new Set(this.variants));
        if (this.metadata.default) {
            const idx = this.variants.indexOf(this.metadata.default);
            if (idx > 0) {
                this.variants.splice(idx, 1);
            }
            if (idx !== 0) {
                this.variants.unshift(this.metadata.default);
            }
        }
    }

    #parse() {
        this.#source.split('\n').map((line) => {
            const matches = line.matchAll(tokens);
            const ast: AstNode[] = [];
            let pos = 0;

            [...matches].forEach((match) => {
                const { groups } = match;
                if (!groups) return;

                // text
                if (pos < (match.index || 0)) {
                    ast.push({
                        type: 'text',
                        content: line.substring(pos, match.index),
                    });
                }

                // metadata
                if (groups.key && groups.value) {
                    ast.push({
                        type: 'metadata',
                        name: groups.key,
                        value: groups.value.trim(),
                    });
                }

                // ingredient
                if (groups.sIngredientName) {
                    ast.push({
                        type: 'ingredient',
                        name: groups.sIngredientName.trim(),
                        optional: !!groups.sOptionalIngredient,
                        main: !!groups.sMainIngredient,
                    });
                }
                if (groups.mIngredientName) {
                    ast.push({
                        type: 'ingredient',
                        name: groups.mIngredientName.trim(),
                        quantity: +groups.mIngredientQuantity,
                        unit: groups.mIngredientUnits,
                        optional: !!groups.mOptionalIngredient,
                        main: !!groups.mMainIngredient,
                    });
                }

                // cookware
                if (groups.sCookwareName) {
                    ast.push({
                        type: 'cookware',
                        name: groups.sCookwareName.trim(),
                    });
                }

                // multiword cookware
                if (groups.mCookwareName) {
                    ast.push({
                        type: 'cookware',
                        name: groups.mCookwareName.trim(),
                        quantity: +groups.mCookwareQuantity,
                    });
                }

                // timer
                if (groups.timerQuantity) {
                    ast.push({
                        type: 'timer',
                        name: groups.timerName.trim(),
                        quantity: groups.timerQuantity,
                        unit: groups.timerUnits,
                    });
                }

                // comments
                if (groups.blockComment) {
                    ast.push({
                        type: 'comment',
                        subType: 'block',
                        content: groups.blockComment.trim(),
                    });
                }
                if (groups.inlineComment) {
                    ast.push({
                        type: 'comment',
                        subType: 'inline',
                        content: groups.inlineComment.trim(),
                    });
                }

                // operators
                if (groups.separator) {
                    ast.push({
                        type: 'operator',
                        name: 'separator',
                    });
                }
                if (groups.stepStarter) {
                    ast.push({
                        type: 'operator',
                        name: 'step_starter',
                    });
                }

                pos = (match.index || 0) + match[0].length;
            });

            // remain texts
            if (pos < line.length) {
                ast.push({
                    type: 'text',
                    content: line.substring(pos),
                });
            }
            return ast;
        }).filter((line) => line.length > 0).forEach((line) => {
            line.forEach(this.#handleNode.bind(this));
            if (this.#state.stepIndex >= 0) {
                this.steps[this.#state.stepIndex].instructions.push({
                    content: this.#state.lineInfo.instruction.trim(),
                    variants: this.#state.lineInfo.variants,
                });

                this.#state.lineInfo.instruction = '';
                this.#state.lineInfo.variants = [];
            }
        });
    }

    #handleNode(node: AstNode) {
        switch (node.type) {
            case 'ingredient':
                this.#handleIngredient(node);
                break;
            case 'cookware':
                this.#handleCookware(node);
                break;
            case 'timer':
                this.#handleTimer(node);
                break;
            case 'text':
                this.#handleText(node);
                break;
            case 'operator':
                this.#handleOperator(node);
                break;
            case 'comment':
                this.#handleComment(node);
                break;
            case 'metadata':
                this.#handleMetadata(node);
                break;
            default:
                break;
        }
    }

    #handleComment(node: CommentNode) {
        if (this.#state.stepIndex >= 0 && node.subType === 'block') {
            node.content.split(',').forEach((variant) => {
                this.#state.lineInfo.variants.push(variant.trim());
                this.variants.push(variant.trim());
            });
        }

        if (this.#state.stepIndex >= 0 && node.subType === 'inline') {
            node.content.split(',').forEach((converter) => {
                const [name, synonym] = converter.trim().split(':');
                const ingredient = this.steps[this.#state.stepIndex].ingredients.find((i) => i.name === name);
                if (ingredient) {
                    ingredient.converter = synonym;
                }
            });
        }
    }

    #handleCookware(node: CookwareNode) {
        if (this.#state.stepIndex >= 0) {
            this.#state.lineInfo.instruction += node.name;
        }
    }

    #handleTimer(node: TimerNode) {
        if (this.#state.stepIndex >= 0) {
            this.#state.lineInfo.instruction += ` ${node.quantity ?? '几'} ${node.unit ?? '分钟'}`;
        }
    }

    #handleMetadata(node: MetadataNode) {
        this.metadata[node.name] = node.value;
    }

    #handleOperator(node: OperatorNode) {
        if (node.name === 'separator') {
            this.#state.description = true;
        }
        if (node.name === 'step_starter') {
            this.#state.stepIndex = this.steps.push({
                ingredients: [],
                instructions: [],
            }) - 1;
        }
    }

    #handleText(node: TextNode) {
        if (this.#state.description) {
            this.#state.lineInfo.instruction += node.content;
        } else {
            this.description += node.content;
        }
    }

    #handleLink(path: string) {
        if (!path.includes('./')) {
            return { name: path, link: '' };
        }
        const name = path.split('/').pop()!.replace('.cook', '');
        const link = path.replace('.cook', '.html');
        return { name, link };
    }

    #handleIngredient(node: IngredientNode) {
        if (this.#state.stepIndex >= 0) {
            const matches = node.name.matchAll(/\((.*?[^\\])\)/g);

            const ingredient = [...matches].reduce((acc, [match, group]) => {
                acc.name = acc.name.replace(match, '');
                acc.preparation.push(group);
                return acc;
            }, { name: node.name, preparation: [] as string[], link: '' });

            const { name, link } = this.#handleLink(ingredient.name);
            ingredient.name = name;
            ingredient.link = link;

            this.steps[this.#state.stepIndex].ingredients.push({
                ...ingredient,
                metric: { amount: node.quantity ?? 0, unit: node.unit ?? '' },
                optional: node.optional,
                variants: this.#state.lineInfo.variants,
            });

            this.#state.lineInfo.instruction += name;
        }
    }
}
