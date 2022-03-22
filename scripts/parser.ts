import {
  Parser, ParseResult, Step,
  StepIngredient,
} from '@cooklang/cooklang-ts';

interface IRecipe {
  name: string;
  mainIngredients: string[];
  specialCookwares: string[];
  ingredients: string[];
  dependencies: string[];
  course: string;
  time: number;
}

export class Recipe implements IRecipe {
  public mainIngredients: string[] = [];

  public specialCookwares: string[] = [];

  public ingredients: string[] = [];

  public dependencies: string[] = [];

  public course = '';

  public time = 0;

  #ast: ParseResult;

  constructor(public name: string, source: string) {
    this.#ast = new Parser().parse(source);

    this.parse();
  }

  private parse() {
    this.course = this.#ast.metadata.course;

    this.normalizeTime(this.#ast.metadata.time);

    this.#ast.steps.forEach(this.parseStep.bind(this));

    this.mainIngredients = Array.from(new Set(this.mainIngredients));
    this.ingredients = Array.from(new Set(this.ingredients));
    this.specialCookwares = Array.from(new Set(this.specialCookwares));
  }

  private normalizeTime(time: string) {
    const units = {
      1: ['min', 'mins', 'minute', 'minutes', '分钟', '分'],
      60: ['h', 'hr', 'hrs', 'hour', 'hours', '小时', '时'],
      1440: ['d', 'day', 'days', '天', '日'],
    };
    const digit = parseFloat(time);
    const unit = time.replace(/[0-9]/g, '').trim();
    const unitMatch = Object.keys(units).find((key) => units[key].includes(unit)) ?? '1';
    this.time = digit * parseInt(unitMatch, 10);
  }

  private parseStep(step: Step) {
    step.forEach((part) => {
      switch (part.type) {
        case 'ingredient':
          this.handleIngredient(part);
          break;
        case 'cookware':
          this.specialCookwares.push(part.name);
          break;
        default:
          break;
      }
    });
  }

  private normalizeName(rawName: string, withProcessors = false) {
    const matches = rawName.matchAll(/`(.*?[^\\])`/g);

    const { name, preprocessors } = [...matches].reduce((acc, [match, group]) => {
      acc.name = acc.name.replace(match, '');
      acc.preprocessors.push(group);
      return acc;
    }, { name: rawName, preprocessors: [] as string[] });

    const affixes = withProcessors && preprocessors.length > 0 ? `, ${preprocessors.join(' ')}` : '';

    if (name.startsWith('*') || name.startsWith('?')) {
      return name.slice(1) + affixes;
    }
    return name + affixes;
  }

  private handleIngredient(part: StepIngredient) {
    const name = this.normalizeName(part.name);
    if (part.name.startsWith('*')) {
      this.mainIngredients.push(name);
    }

    this.ingredients.push(name);
  }
}
