## Cooklang 语法扩展

在本项目中，我们使用 [Cooklang](https://cooklang.org/) 管理食谱。但 Cooklang 目前能力有限，在本项目中我们对其进行了一些扩展，以更适用于本项目的场景。

### 食材

可以使用以下语法来指定食材:

```cook
加入@酱油
```

并指定其重量：

```cook
加入@酱油{25%g}
```

通过括号指定前置处理步骤：

```cook
加入@姜(去皮切圆片){10%g}
```

指定其为可选食材(?)或主要食材(!)：

```cook
将@!黑鳕鱼(带皮){450%g}分别放入夹链袋
加入@?味精{5%g}
```

在步骤后使用 `--` 标记参考单位换算方式：

```cook
将@!黑鳕鱼(带皮){450%g}分别放入夹链袋 -- 黑鳕鱼:225g/片
```

### 时间

通过波浪符指定时间：

```cook
以 100 kPa 的表压力高压烹煮 ~{45 分钟}.
```

### 步骤

Cooklang 中按行为步骤，但在 Ambrosia.Kitchen 中我们将多个步骤整合为一个大步骤，这些步骤会使用同一批食材。这样能帮助读者更好的规划做菜的过程。

我们使用 - 来标记一个步骤组，在这个步骤组内所有被提及的食材会被收集到该组内。

```cook
- 在煎锅中以大火将@牛绞肉{1.3%kg}用@精制油炸油{75%g}煎至深褐色.
  将牛肉放到滤网里, 架在大碗上过滤. 取 40 g 滤下的油汁. 牛绞肉留待后续步骤使用.

- 将上一步的油脂放入#高压锅 中, 并加入@甜洋葱(切薄片){500%g}, @胡萝卜(切薄片){500%g}, @韭葱(切薄片){250%g}, @蒜(切薄片){25%g}
  以中火不加盖煎炒至蔬菜完全软化并呈褐色.
```

通过上述写法，可获得两个步骤组，分别是**煎牛肉末并过滤**和**高压锅内煎炒蔬菜**两步。二者使用不同的食材。

### 变体

Cooklang 中并不支持变体，在 Ambrosia.Kitchen 中我们通过指定变体名来定义变体步骤：

```cook
- [- 地中海油封蔬菜 -] 以@巴萨米克醋{6 g}, @盐 和罐中的橄榄油调味.
  [- 油封手指小土豆 -] 沥干土豆, 用@盐 调味后趁热使用.
```

按如上方式，可在同一个步骤组中定义多个变体，随页面使用不同变体时展示不同的步骤。