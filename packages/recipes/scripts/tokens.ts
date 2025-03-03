const metadata = /^>>\s*(?<key>.+?):\s*(?<value>.+)/;

const multiwordIngredient = /@(?<mOptionalIngredient>\??)(?<mMainIngredient>!?)(?<mIngredientName>[^@#~]+?){(?<mIngredientQuantity>[^]*?)(?:\s+(?<mIngredientUnits>[^}]+?))?}/;
const singleWordIngredient = /@(?<sOptionalIngredient>\??)(?<sMainIngredient>!?)(?<sIngredientName>[^\s,.]+)/;

const multiwordCookware = /#(?<mCookwareName>[^@#~[]+?){(?<mCookwareQuantity>.*?)}/;
const singleWordCookware = /#(?<sCookwareName>[^\s,.]+)/;

const timer = /~(?<timerName>.*?)(?:{(?<timerQuantity>.*?)(?:\s+(?<timerUnits>[^}]+))?})/;

const separator = /^(?<separator>=+)$/;
const stepStarter = /^(?<stepStarter>-\s)/;

const blockComment = /\s*\[-(?<blockComment>[^]*)-\]\s*/g;
const inlineComment = /--(?<inlineComment>.*)/g;

export const tokens = new RegExp([
    metadata,
    multiwordIngredient,
    singleWordIngredient,
    multiwordCookware,
    singleWordCookware,
    timer,
    blockComment,
    inlineComment,
    separator,
    stepStarter,
].map((r) => r.source).join('|'), 'g');
