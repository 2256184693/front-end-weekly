
# 正则表达式字符匹配

## 两种模糊匹配

1. 横向模糊匹配

    一个正则可匹配的字符串长度不是固定的，可以是多种情况的。实现的方式是使用量词。譬如 `{m,n}`，表示连续出现最少m次，最多n次。

    ```javascript
      var reg = /ab{2, 5}c/g  // g是正则的修饰符，表示全局匹配。强调所有，而非第一个。

      var string = 'abc abbc abbbc abbbbc abbbbbc abbbbbbc'

      string.match(reg) // ['abbc', 'abbbc', 'abbbbc', 'abbbbbc']
    ```

2. 纵向模糊匹配

    一个正则匹配的字符串具体到某个字符时，可以不是确定的字符。实现方式是使用字符组。譬如 `[abc]` ，表示该位置的字符可以是a、b、c中的任意一个。

    ```javascript
      var reg = /a[123]b/g

      var string = 'a0b a1b a2b a3b a4b'

      string.match(reg) // ['a1b', 'a2b', 'a3b']
    ```

## 字符组

1. 范围表示法

    如果字符组的字符特别多的话可以使用范围表示法。比如`[123456abcdefGHIJKLM]` => `[1-6a-fG-M]`。连字符 `-` 有特殊用途，那么如果要匹配它本身的话，要避免引擎将其认为是范围表示法即可。比如放在开头，放在结尾，或者转义。

2. 排除字符组

    纵向模糊匹配还有一种情形是某位可以是除特定字符之外的字符。这就是排除字符组的概念。将 `^` 脱字符 放在字符组的第一位，表示求反的概念。
    
3. 常用的简写。

    > `\d` 代表的是 `[0-9]`，表示一位数字。

    > `\D` 代表的是 `[^0-9]`，表示除数字外的任意一位字符。

    > `\w` 代表的是 `[0-9a-zA-Z_]`，表示字母数字下划线中的一位字符。

    > `\W` 代表的是 `[^0-9a-zA-Z_]`，表示除字母数字下划线外的任意一位字符。

    > `\s` 代表的是 `[\t\v\n\r\f]`，表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。

    > `\S` 代表的是 `[^\t\v\n\r\f]`，表示非空白符。

    > `.` 代表的是 `[^\n\r\u2028\u2029]`，通配符，表示几乎任意的字符，换行符、回车符、行分隔符、段分隔符除外。

    > PS: 匹配任意字符可以使用以上大小写字母组合的方式。

## 量词的使用

1. 简写形式

    > `{m,}` 表示 至少出现m次

    > `{m}` 表示 出现m次

    > `?` 等价于 `{0,1}`，表示出现一次或者不出现。
    
    > `+` 等价于 `{1,}`，表示至少出现一次。

    > `*` 等价于 `{0,}`，表示出现任意次，也可以不出现。

2. 贪婪匹配和惰性匹配  

    ```javascript
      var str = '123 1234 12345 123456'

      // 贪婪匹配 也就是尽可能多的去满足匹配
      var reg1 = /\d{2,5}/g
      str.match(reg1) // ['123', '1234', '12345']

      // 惰性匹配 也就是尽可能少的去满足匹配
      var reg1 = /\d{2,5}?/g
      str.match(reg1) // ['12', '12', '34', '12', '34', '12', '34', '56']
    ```

    > PS： 通过在量词后面增加一个 `?` 来实现惰性匹配

## 多选分支

一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式。

具体的形式为 `(p1|p2|p3)`，`p1` 、`p2` 和 `p3` 表示三个子模式，用管道符 `|` 分隔，表示其中的任意一种形式。

  ```javascript
    var str = 'goodbye'

    var reg = /good|goodbye/g
    str.match(reg) // ['good']

    // 分支结构也是有惰性的
    var reg = /goodbye|good/g
    str.match(reg) // ['goodbye']
  ```

## 常见案例分析

1. 匹配16进制颜色值

    ```javascript
      // #FFBBad #FBa #fba
      var reg = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g // 注意顺序匹配6个应该在前
    ```
2. 匹配时间

    ```javascript
      // 02:57 23:59 00:00
      var reg = /([01][0-9]|2[0-3]):[0-5][0-9]/g
    ```
3. 匹配日期

    ```javascript
      // 2019-01-01 (未考虑2月份的平闰问题)
      var reg = /[0-9]{4}-(0[0-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/g
    ```
4. 匹配windows操作系统文件路径
    ```javascript
      /**
       * 测试用例
       * C:\
       * C:\project\javascript\regexp
       * C:\project\javascript\regexp\
       * C:\project\javascript\regexp\regexp.md
       */
      
      // [a-zA-Z]:\\  盘符
      // ([^\\:*<>|"?\r\n/]+\\)* 文件夹或者文件名 不能包含特殊字符
      var reg = /[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/
    ```
5. 匹配HTML中的id
    ```javascript
      // <div id="container" class="main"></div>

      // 1. 贪婪匹配，会导致匹配到之后的双引号
      var reg = /id=".*"/ // id="container" class="main"
       
      // 2. 惰性匹配, 会有一个效率问题，其匹配原理涉及回溯
      var reg = /id=".*?"/ // id="container"

      // 3. 优化一下，
      var reg = /id="[^"]*"/ // id="container"
    ```

PS：当你能够掌握这些规则，基本能解决大部分的问题，JS正则算入门了。

# 正则表达式位置匹配

## 匹配位置的几种情况

1. `^` 和 `&` 匹配首尾

    > `^` 匹配开头，再多行匹配中匹配行开头

    > `$` 匹配结尾，再多行匹配中匹配行结尾

      ```javascript
        // '#hello#'
        'hello'.replace(/^|$/g, '#')
        /**
         * #hello#
         * #my name is SH#
         * #bye#
         */
        'hello\nmy name is SH\nbye'.replace(/^|$/gm, '#')
        // m 修饰符代表多行匹配，此时 ^ 和 $ 二者匹配行的首尾
      ```
2. `\b` 和 `\B` 匹配边界

    > `\b` 代表单词边界，具体就是 `\w` 和 `\W`之间的位置，以及 `\w` 和 `^` 之间的位置，也包括 `\w` 和 `$` 之间的位置。

    > `\B` 代表的则是相反的边界，具体就是 `\w` 和 `\w`之间的位置，以及 `\W` 和 `W` 之间的位置，也包括 `^` 和 `\W` 之间的位置，也包括 `\W` 和 `$` 之间的位置。

    ```javascript
      var str1 = '[JS] regexp is difficult'
      str1.replace(/\b/g, '#')
      // [#JS#] #regexp# #is# #difficult#

      str2.replace(/\B/g, '#')
      // #[J#S]# r#e#g#e#x#p i#s d#i#f#f#i#c#u#l#t
    ```

3. `(?=p)` 和 `(?!p)`

    > `(?=p)`，其中p是一个子模式，匹配p前面的位置。

    > `(?!p)`，就是反面意思

    ```javascript
      var str = 'hello'

      str.replace(/(?=l)/g, '#') // he#l#lo
      str.replace(/(?!l)/g, '#') // #h#ell#o
    ```

    > 二者的学名分别是 `positive lookahead` 和 `negative lookahead`。中文翻译分别是正向先行断言和负向先行断言。在ES6中还支持 `(?<=p)positive lookbehind` 和 `(?<!p)negative lookbehind`

    > 这四种情况也可以翻译成环视，即匹配左边或者右边。

## 常见案例分析

1. 不匹配任何东西的正则。

    ```javascript
      var reg = /.^/;
      reg.test(any string) // false
    ```
2. 数字的千位分隔符

    ```javascript
      var str = '123456'
      str.replace(/(?=\B)(?=(\d{3})+$)/g, ',')
      //从后往前看，后面三个数字为一组，而且只在数字之间增加逗号
    ```
3. 密码验证（ 6-12位，由数字大写小写字母组成，至少包含三种中的两种。）
  
    ```javascript
      // 正向思维，至少包含两种类型，
      var reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9a-zA-Z]{6,12}$/

      // 反向思维，不能是纯数字大写小写字母
      var reg = /((?!^[0-9]{6-12}$)|(?!^[a-z]{6-12}$)|(?!^[A-Z]{6-12}$))^[0-9a-zA-Z]{6,12}$/
    ```

# 正则表达式中括号的作用

不管哪门语言中都有括号，正则表达式也是一门语言，而且括号的存在使得这门语言更为强大。

## 分组和分支结构

1. 使用括号提供分组功能。

    ```javascript
      var str = 'abababaa aaaabb abbbbba'
      str.match(/(ab)+/g) // ['ababab', 'ab', 'ab']
    ```
2. 分支结构中结合括号使用

    ```javascript
      var reg = /^I am a (man|programmer)$/
      var reg2 = /^I am a man|programmer$/

      reg.test('I am a man') // true
      reg.test('I am a programmer') // true

      // 去掉括号的表现
      reg2.test('I am a programmer') // true
      reg2.test('I am a man programmer') // true
      reg2.test('programmer') // true
    ```

## 引用分组

这是括号的一个重要作用，有了它，我们能够进行数据提取等强大的操作。

1. 提取数据。（注意：当正则有修饰符g时，match的返回结果和不含修饰符g的结果是不一样的）

    ```javascript
      // 以日期为例. 2019-04-04
      var str = '2019-04-04'

      var reg = /^\d{4}-\d{2}-\d{2}$/

      reg.test(str) // true

      str.match(reg) // ['2019-04-04', index: 0, input: '2019-04-04']

    ```
    
    当增加了括号，再看一下结果

    ```javascript
      // 以日期为例. 2019-04-04
      var str = '2019-04-04'

      var reg = /^(\d{4})-(\d{2})-(\d{2})$/

      reg.test(str) // true

      str.match(reg) // ['2019-04-04', '2019', '04', '04', index: 0, input: '2019-04-04']

      // 还可以使用正则构造函数的全局属性 $1 到 $9 来获取分组
      RegExp.$1 // 2019
      RegExp.$2 // 04
      RegExp.$3 // 04
    ```

2. 替换数据

    ```javascript
      var reg = /^(\d{4})-(\d{2})-(\d{2})$/

      var str = '2019-04-04'

      str.replace(reg, '$1/$2/$3') // 2019/04/04
    ```

    `replace` 函数第二个参数中 `$1` 这种字样代表着正则匹配到的相对应的分组。还可以使用下边这种方式。

     ```javascript
      var reg = /^(\d{4})-(\d{2})-(\d{2})$/

      var str = '2019-04-04'

      str.replace(reg, function() {
        return `${RegExp.$1}/${RegExp.$2}/${RegExp.$3}`
      })

      str.replace(reg, function(match, p1, p2, p3) {
        return `${p1}/${p2}/${p3}`
      });
    ```

3. 反向应用

    除了可以引用分组，还可以在正则中引用分组，但只能引用当前之前的分组。

    ```javascript
      // 匹配 2019-04-04 | 2019.04.04 | 2019/04/04
      var reg = /^\d{4}[./-]\d{2}[./-]\d{2}$/

      var str = '2019-04-04'
      
      reg.test(str) // true
    ```

    但有一个问题，如果当前的日期是 `2019-04/04` 这种类型，上边的正则也会匹配成功的。换句话说，以上的正则无法保证分隔符前后一致。此时就需要反向引用了

    ```javascript
      // 匹配 2019-04-04 | 2019.04.04 | 2019/04/04
      var reg = /^\d{4}([./-])\d{2}\1\d{2}$/
      
      reg.test('2019-04-04') // true

      reg.test('2019-04/04') // false
    ```

    注意正则中的 `\1`，这里表示的是引用之前的第一个分组，也就是 `([./-])`，不管分组匹配到什么， `\1` 也会匹配相同的。以此类推，`\2` 等也就好理解了。分别对应相应的分组。

    > PS：当出现多级括号嵌套的时候，一个区分分组顺序的小技巧就是只考虑左括号 `(`。

    > `\10` 表示的是匹配之前出现的第十个分组。并不是第一个分组以及字符0。

    > 引用不存在的分组的话正则并不会报错，而会匹配当前反向引用的字符本身。比如，`\1` 匹配的是对 `2` 转义之后的字符。

## 非捕获分组

1. 之前括号的作用是分组，而且都会捕获匹配到的数据，来在后续引用，因此称之为捕获型分组。如果你只想要括号的功能，而不需要引用括号里匹配到的内容，就可以使用非捕获型分组 `?:p`

    ```javascript
      var reg = /(?:ab)+/g
       
      var str = 'abab abababaa aaba'

      str.match(reg) // ['abab', 'ababab', 'ab']
    ```

## 常见案例分析

1. 字符串的trim方法的正则实现

    ```javascript
      // 匹配首尾的空格，然后替换成空字符
      var trim = str => str.replace(/^\s+|\s+$/, '')
      // 匹配整个字符串，然后提取出去除首尾空格的部分
      var trim2 = str => str.replace(/^\s*(.*?)\s*$/, '$1')
      // 切记使用 ? 触发惰性匹配，否则贪婪匹配只会将最后一个空格替换掉
    ```

2. 首字母转换为大写(eg: my name is xxx)

    ```javascript
      var upFirst = str => str.replace(/(^|\s)\w/g, c => {
        c ? c.toUppercase() : ''
      })
    ```
3. 驼峰化转换

    ```javascript
      var camelize = str => str.replace(/[-_\s]+([a-z])?/, (match, c) => (c ? c.toUpperCase() : ''))
    ```
4. 中划线化

    ```javascript
      var dasherize = str => str.replace(/[A-Z]/g, '-$1').toLoerCase()
    ```

5. 匹配成对的标签

    ```javascript
      var reg = /<([^>]+)>[\d\D]*<\/\1>/g

      var str = '<div id="box"><a class="click-btn">123</a></div>'

      str.match(reg)
    ```