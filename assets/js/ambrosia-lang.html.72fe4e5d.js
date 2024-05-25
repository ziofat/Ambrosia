"use strict";(self.webpackChunkambrosia_kitchen_website=self.webpackChunkambrosia_kitchen_website||[]).push([[8859],{9803:(a,e,t)=>{t.r(e),t.d(e,{comp:()=>o,data:()=>d});var s=t(1068);const i=[(0,s.Fv)('<h2>Ambrosia 语法</h2><p>Ambrosia 是一个 Markup Language, 用于描述组件化的食谱. 我们认为食谱是步骤的集合, 而食材是输入的参数. 通过对步骤的分析, 其实是可以直接列出食材清单的. 因此 Ambrosia 的重点在于描述步骤，而非食材清单。</p><p>一个完整的食谱分为两个部分:</p><ol><li>Metadata</li><li>操作步骤</li></ol><h3>Metadata</h3><p>Metadata 是一系列键值对, 是嵌入在食谱开头的一组信息. 其可以是任何内容, 取决于你的需求. 其格式如下:</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>&gt;&gt; yield: 800g\n&gt;&gt; time: 90 分钟\n</code></pre></div><p>Metadata 会以 <code>&gt;&gt;</code> 开头，以换行符结束. 通过一个冒号来分隔键和值.</p><h3>步骤</h3><p>在 Ambrosia.Kitchen 中我们将多个步骤整合为一个大步骤，这些步骤会使用同一批食材, 并通常会有一个或多个阶段性产物。这样能帮助读者更好的规划做菜的过程。</p><p>我们使用 <code>-</code> 来标记一个步骤组，在这个步骤组内所有被提及的食材会被收集到该组内。在一个步骤中, 所有食材被认为是一起操作的, 不区分先后关系.</p><p>步骤内通过纯文本描述操作内容即可, 仅需要对食材, 时间和特殊器材进行标注即可.</p><div class="language-cook" data-ext="cook" data-title="cook"><pre class="language-cook"><code>- 在煎锅中以大火将@牛绞肉{1.3kg}用@精制油炸油{75g}煎至深褐色.\n  将牛肉放到滤网里, 架在大碗上过滤. 取 40 g 滤下的油汁. 牛绞肉留待后续步骤使用.\n\n- 将上一步的油脂放入#高压锅 中, 并加入@甜洋葱[切薄片]{500g}, @胡萝卜[切薄片]{500g}, @韭葱[切薄片]{250g}, @蒜[切薄片]{25g}\n  以中火不加盖煎炒至蔬菜完全软化并呈褐色.\n</code></pre></div><p>通过上述写法，可获得两个步骤组，分别是<strong>煎牛肉末并过滤</strong>和<strong>高压锅内煎炒蔬菜</strong>两步。二者使用不同的食材。</p><h3>食材</h3><p>可以使用以下语法来指定食材:</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- 加入@酱油\n</code></pre></div><p>并指定其重量：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- 加入@酱油{25g}\n</code></pre></div><p>通过中括号指定前置处理步骤：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- 加入@姜[去皮切圆片]{10g}\n</code></pre></div><p>指定其为可选食材(?)或主要食材(!)：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- 将@!黑鳕鱼[带皮]{450g}分别放入夹链袋\n- 加入@?味精{5g}\n</code></pre></div><p>在步骤后使用 <code>--</code> 标记参考单位换算方式：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- 将@!黑鳕鱼[带皮]{450g}分别放入夹链袋 -- 黑鳕鱼:225g/片\n</code></pre></div><p>食谱的组合在本项目中是一个非常重要的概念，通过路径即可引用其他食谱的产物：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- 将@!../../base/stock-broth/鸡白高汤.am{1 L}煮沸后立刻倒入#法式压滤壶 中微做搅拌\n</code></pre></div><p>如果使用多单词的英文食材, 且没有标记其前置处理或使用重量, 空格可能会影响到食材的判定, 可通过括号来指定食材范围, 或使用无内容的重量来表示&quot;适量/to taste&quot;:</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- Add @(kosher salt) to the pan.\n- Add @kosher salt{} to the pan.\n</code></pre></div><h3>时间</h3><p>通过波浪符指定时间：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>以 100 kPa 的表压力高压烹煮 ~{45 分钟}.\n</code></pre></div><h3>变体(Subject to change)</h3><p>在 Ambrosia.Kitchen 中我们通过指定变体名来定义变体步骤：</p><div class="language-ambrosia" data-ext="ambrosia" data-title="ambrosia"><pre class="language-ambrosia"><code>- [- 地中海油封蔬菜 -] 以@巴萨米克醋{6 g}, @盐 和罐中的橄榄油调味.\n  [- 油封手指小土豆 -] 沥干土豆, 用@盐 调味后趁热使用.\n</code></pre></div><p>按如上方式，可在同一个步骤组中定义多个变体，随页面使用不同变体时展示不同的步骤。</p>',36)],l={},o=(0,t(1618).A)(l,[["render",function(a,e){return(0,s.uX)(),(0,s.CE)("div",null,i)}]]),d=JSON.parse('{"path":"/guides/basic/ambrosia-lang.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"Ambrosia 语法","slug":"ambrosia-语法","link":"#ambrosia-语法","children":[{"level":3,"title":"Metadata","slug":"metadata","link":"#metadata","children":[]},{"level":3,"title":"步骤","slug":"步骤","link":"#步骤","children":[]},{"level":3,"title":"食材","slug":"食材","link":"#食材","children":[]},{"level":3,"title":"时间","slug":"时间","link":"#时间","children":[]},{"level":3,"title":"变体(Subject to change)","slug":"变体-subject-to-change","link":"#变体-subject-to-change","children":[]}]}]}')}}]);