# <center>Grid Layout - 网格布局</center>

## 什么是网格布局 [查看Code][综合示例]
---

用于将页面分割成数个主要区域或者用来定义区域内部元素大小位置和图层之间的关系。网格是一组相交的水平线和垂直线，定义了网格的列和行。

CSS网格布局有以下特点:

1. 固定和灵活的轨道尺寸

    > 你可以使用固定的轨道尺寸创建网格，比如使用像素单位。你也可以使用比如百分比或者专门为此目的创建的新单位 fr来创建有弹性尺寸的网格。

2. 项目位置

    > 你可以使用行号、行名或者标定一个网格区域来精确定位元素。网格同时还使用算法来控制未给出明确网格位置的自动定位的元素。

3. 创建额外的轨道来包含元素

    > 可以使用网格布局定义一个显式网格，但是根据规范它会处理你加在网格外面的内容，当必要时它会自动增加行和列，它会尽可能多的容纳所有的列。

4. 对齐方式的控制

    > 网格包含对齐特点，以便我们可以控制一旦放置到网格区域中的物体对齐，以及整个网格如何对齐。

5. 重叠内容的控制

    > 多个元素可以放置在网格单元格中，或者区域可以部分地彼此重叠。然后可以CSS中的 `z-index` 属性来控制重叠区域显示的优先级。

---
## 特殊使用方式
---

1. fr单位

    > 轨道可以使用任何长度单位进行定义。 网格还引入了一个另外的长度单位 `fr` 来帮助我们创建灵活的网格轨道。 `1fr` 代表网格容器中可用空间的一等份。`fr` 和其它长度单位混合使用时， `fr` 的计算是基于其它单位分配后的剩余空间。

2. repeat函数

    > 有着多轨道的大型网格可使用 `repeat()` 函数 来重复部分或整个轨道列表。第一个参数是重复次数，第二个参数是重复内容。
3. minmax函数

    > 在设置一个显式的网格或者定义自动创建的行和列的大小的时候，我们也许想给网格一个最小的尺寸，确保他们能扩大到容纳他里面添加的内容。例如，需求行高永远不会缩小到100像素以下，但是如果内容延伸到300像素时的行高也延伸到这个高度。就可以使用网格布局中用minmax()函数来解决这个问题。

---
## 重要术语
---

1. 网格容器

    > 创建一个网格容器的同时，该容器的所有直系子元素都会成为网格子元素（未被标签包裹的文本节点会成为匿名网格项目）。

    ``` css
        /* block的网格， */
        display: grid; 
        /* inline的网格 */
        display: inline-grid;
        /* 子网格 - 不可用 */
        display: subgrid;
    ```

2. 网格项

    > 网格元素的"直系"子元素都是网格项

3. 网格轨道 [查看Code][隐式网格]

    > 通过 `grid-template-columns` 和 `grid-template-rows` 这两个属性我们来定义网格中的行和列。这些属性定义了网格的轨道。一个网格轨道就是网格中任意两条线之间的空间。

    + 显式网格：手动定义的网格称之为**显式网格**。

    + 隐式网格：如果网格中有更多的网格项，或者网格项被放置在显示网格之外，网格容器就会通过向网格中添加网格线来自动生成隐式的网格轨道。显式网格和这些额外的隐式轨道和网格线则构成了所谓的隐式网格。
        -可以使用 `grid-auto-rows` 和 `grid-auto-columns` 来设置 隐式网格的规格。

4. 网格线 [查看Code][网格线使用]

    > 我们定义网格实际上定义的是网格轨道，而不是网格线。Grid布局会自动创建网格线来方便定位每一个元素。网格线的编号顺序取决于 **文章的书写模式**（比如英文是从左到右书写的，则网格线1 是最左边的线）。**注：负数代表着相反方向的网格线顺序，且不包括隐式轨道。**

    > 跨轨道放置网格元素：通过 `grid-column-start` 、 `grid-column-end` 、`grid-row-start` 、`grid-row-end` 四个属性，可以方便地规定子元素的位置。 默认跨度是一个轨道，也就是如果只延伸一个轨道的话，只需要指明开始编号即可。（合并属性 `grid-row` 和 `grid-column`：`-start` 和 `-end` 之间使用 `/` 隔开）
    
    > 使用 `grid-area：grid-row-start / grid-column-start / grid-row-end /grid-column-end` 这个缩略用法可以快速定位。顺序和常用的 `margin/padding` 有区别。**还可以使用负数，表示从尾部开始计算**。

    > 使用span的关键字。一般的方法是用编号来规定位置，使用span则是编号结合跨越轨道数量来规定位置。

    > 我们还可以命名网格线来定义网格。定义网格的时候把网格线的名字写在方括号内，多个名字用空格隔开(不一定要全部命名) - (这种方式也可以和序号混合使用)。

    > 可以结合 `repeat` 函数来创建多个相同名字的网格线。使用的时候在名字后面增加一个序号即可区分。

5. 网格单元格

    > 一个网格单元是在一个网格元素中最小的一个单位。

    > 相对于使用网格线来定位，也可以命名网格区域来定位。[查看Code][命名网格区域]

    > 当一个区域的线都由`-start` 和 `-end` 作为后缀的话，网格会为区域创建一个名字，名字就是后缀前的单词。反之亦是如此。如果定义一个网格区域，则会隐式的命名周围的网格线。

6. 网格区域

    > 网格元素可以向着行或者列的方向扩展，创建一个区域。（形状一定是矩形）。

7. 网格间距

    > 两个网格单元之间的 网格横向间距 或 网格纵向间距 可使用 `grid-row-gap` he `grid-column-gap` 属性来创建（合并属性 `grid-gap`）


---
## 网格定位方式 [查看Code][有关定位]
---

+ 默认情况下 子项目会在行流向下放置于每一个单元格中，一行一行的放置，这是网格的自动定位。如果显式网格中没有多余行时则会创建一个隐式的新行。此时，隐式的网格尺寸时自适应的，不过可以通过 `grid-auto-rows` 这个属性来控制隐式网格的大小。

+ 可以使用 `grid-auto-flow` 改变放置的优先流向。 

    > 可选值
    - row(默认值)
    - column
    - row/column dense

+ 网格中，部分项目有着自己明确的位置，而另一些则依赖自动定位。除了我们明确定位过的项目，自动定位项目都会依照DOM中的顺序被网格自动处理。这种情况下经常会因大小不等而出现缺口。在没有逻辑顺序的情况下，我们倾向于创建一种齐整的没有缺口的布局。这时候可以改变网格容器放置流向 `grid-auto-flow`，这时候就需要使用 `dense` 关键字了。该关键字定义了填充网格时的稀疏和密集两种不同算法。使用dense时将采用密集算法，将较小项目放置到较早的空缺中。可以应用在图片墙等需求中。

+ 当字符串或者文本被直接包含在网格容器中时，它们会被创建为匿名的网格项目。**匿名项目因为无法选中，所以位置全靠自动定位规则来确定，所以可能会出现在网格的不可预期的位置**。

---
## 网格中的对齐 [查看Code][网格对齐]
---

+ 网格布局共有 `Block(Column) Axis` 和 `Inline(Row) Axis` 两种轴。

+ 项目对齐方式

    - 使用 `align-items` 和 `align-self` 控制项目在列轴上的对齐。`align-items`设置在网格容器上，相当于为子网格都设置了 `align-self` 属性。也可以使用 `align-self` 个性化设置子网格的对齐方式。
        ``` css
            align-items: auto;
            align-items: normal;
            align-items: start;
            align-items: end;
            align-items: center;
            align-items: stretch;/* 默认 */
            align-items: baseline;
            align-items: first baseline;
            align-items: last baseline;
        ```
    - 在行轴上的对齐与列轴类似。属性 `justify-items` 和 `justify-self` 分别与之对应，用法也一样。

+ 轨道对齐方式
    
    - 属性为 `align-content` 和 `justify-content` 。 

        ``` css
            align-content: normal;
            align-content: start; /* 默认 */
            align-content: end;
            align-content: center;
            align-content: stretch;
            align-content: space-around;
            align-content: space-between;
            align-content: space-evenly;
            align-content: baseline;
            align-content: first baseline;
            align-content: last baseline;

        ```
## 其他用法 
---

1. grid-template

    > 包含了 `grid-template-rows` 和 `grid-template-columns` 和 `grid-template-areas` 三个属性

    - none

        ``` css
            grid-template: none;
        ```
    - < grid-tempalte-rows > / < grid-template-columns >

        ``` css
            grid-template: 100px 1fr / 50px 1fr;
        ```

    - [ < line-names >? < string > < track-size >? < line-names >? ]+ [ / < explicit-track-list > ]?

        ``` css
            grid-template:  "a a a"
                            "b b b";
            grid-template:  "a a a" 20%
                            "b b b" auto;
            grid-template:  [header-top] "a a a" [header-bottom]
                            [main-top] "b b b" [main-bottom]
                            / auto 1fr auto;
        ```
        
2. grid

    > 包含了 `grid-template-rows` 、 `grid-template-columns` 、 `grid-template-areas` 、`grid-auto-rows` 、`grid-auto-columns` 、`grid-auto-flow` 这几个属性。

    > 注意：使用 `grid` 会将 `grid-row-gap` 和 `grid-column-gap` 设置为初始值



---
## 其他的注意点 
---

+ 区别与flex [查看Code][特殊使用示例_区别于flex]

    1. 弹性盒布局是为一维布局服务的（横向或纵向），而网格布局则为二维布局服务。
     
    2. 使用`auto-fit` 和 `auto-fill`属性结合 `repeat()` 函数以及 `minmax()` 函数，达到类似弹性盒的效果。

        > auto-fill 更加倾向于用更多的列占满当前行; auto-fit 更加倾向于用少列占满当前行

+ 与绝对定位元素结合使用， 照常一样将设置网格容器 `position: relative`，将需要定位的网格设置`position: absolute`。[查看Code][结合定位元素]

    1. 默认情况下，定位的项目不会拉伸成网格大小。

    2. 定位网格可以使用隐式轨道，但是并不能创建隐式轨道。

    3. 定位网格不会占用有关自动放置功能的单元格，而且网格容器在放置子网格的时候会忽略定位网格。

    4. 定位时使用auto的特殊情况。

---
## 参考资料
---

+ [auto-fill VS auto-fit](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)

+ [grid & absolute](https://blogs.igalia.com/mrego/2016/05/27/css-grid-layout-and-positioned-items/)

+ [A Complete Guide to CSS Grid Layout](http://chris.house/blog/a-complete-guide-css-grid-layout/)

+ [Grid by Example](https://gridbyexample.com/learn/)

---
## TODO: 
---

- 有关书写模式的相关内容


[综合示例]: https://codepen.io/2256184693/pen/KGKNyb

[隐式网格]: https://codepen.io/2256184693/pen/LgERpB

[特殊使用示例_区别于flex]: https://codepen.io/2256184693/pen/XxJMjz

[结合定位元素]: https://codepen.io/2256184693/pen/vVEQBZ

[网格线使用]: https://codepen.io/2256184693/pen/ZqYVaJ

[命名网格区域]: https://codepen.io/2256184693/pen/GYNRma

[缩略等用法]: https://codepen.io/2256184693/pen/VEmJjx

[有关定位]: https://codepen.io/2256184693/pen/bmBXOo

[网格对齐]: https://codepen.io/2256184693/pen/zmNamG