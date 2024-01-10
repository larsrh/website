---
title: "WebAssembly: faster code for the web"
date: 2024-01-10
lang: en
highlight: true
abstract: |
  JavaScript is the established lingua franca for dynamic websites.
  But a new competitor has been on the rise for a few years now: WebAssembly complements the repertoire of browser features and is particularly suitable for computationally intensive tasks.
  This article explains how the technology works.
---

Alongside with HTML and CSS, JavaScript has become an indispensable part of modern web development.
So it's no wonder that more and more of it can be found in modern front-end applications.
However, excessive use of JavaScript leads to applications with several megabytes of code in some cases.
The result: poor performance.

Despite some web applications' excesses, there are certainly a number of sensible use cases for JavaScript.
For example, who could imagine life without Google Docs or Bing Maps today?

The [WebAssembly language](https://webassembly.org/), which is already integrated into modern browsers, is designed to particularly boost computationally intensive parts of such applications.
In this article, we take a look at how WebAssembly – or WASM for short – came about and what makes it different from JavaScript.
We will also develop a small example in the form of a counter.

## More performance

There is enormous pressure on browser vendors to execute websites quickly under all circumstances.
Historically, however, JavaScript has placed a number of obstacles in the way of browsers, with WebAssembly poised to remove them in the future.
One example is JavaScript's handling of numbers.
There is only one 64-bit type (IEEE 754 encoded floating point number), which is used to represent both floating point numbers and integers.
As a programmer who only needs the latter, you are therefore forced to stay in the “safe range” between -2<sup>53</sup> + 1 and 2<sup>53</sup> - 1.
For numbers outside this range, the distance between the possible values is greater than 1 due to rounding.
For example, 2<sup>53</sup> + 5 results in 9,007,199,254,740,996 (wrong, should end in 7), but 2<sup>53</sup> + 6 results in 9,007,199,254,740,998 (correct).

This is not only a problem for programmers, but also for the JavaScript interpreter in the browser, because arithmetic operations on floating point numbers are inefficient.
All major browser engines therefore have a built-in heuristic that checks whether variables are in this “safe range”.
This way, they can internally perform integer arithmetic.
If necessary, the engines convert between the two representations.

Browser manufacturers ship a bunch of such heuristics for the recognition and optimization of common programming patterns.
Those JIT compilers (short for “Just in Time”) check before and during the execution of the code whether certain parts of the programme can be efficiently mapped to CPU instructions.
This is not a new invention; other programming languages such as Java or C# use a similar strategy.

However, JIT compilers only work efficiently as long as they can make useful assumptions about the code.
Unfortunately, JavaScript makes their work particularly difficult due to its numerous dynamic features.

## Integer addition

In response, community folklore has emerged, explaining how to give the JIT compiler reliable hints.
Special annotations in performance-critical source code indicate “types”, allowing the JavaScript engine to optimize it.
WebAssembly's origins can be directly traced back to this folklore.

To give you an idea of what JavaScript code with such hints looks like, here is an example of a simple integer addition:

```javascript
function f(i) {
  i = i | 0;
  return (i + 1) | 0;
}
```

The expression `i | 0` (bitwise or with zero) does not change the value of `i`, but rather indicates to the engine that it is supposed to use integer arithmetic, because bitwise operations do not make sense on floating point numbers.
Adding `| 0` to the second line prevents conversion of the incremented `i` to a floating point number.

To save the JIT compiler work, Mozilla published the [asm.js](https://developer.mozilla.org/en-US/docs/Games/Tools/asm.js) specification in March 2013.
This specification formalizes the `| 0` trick and also its converse `+x` (enforces floating point number), along a few others.
In addition, asm.js restricts the syntax in such a way that only a subset of JavaScript remains that can be translated into efficient machine code without any heuristics.
To declare this explicitly, you must declare a function as follows:

```javascript
function f(i) {
  "use asm";
  // ... code
}
```

Old JavaScript engines just ignore this declaration, whereas current ones switch to “assembly” mode.

## Embedding a language

But asm.js also has a huge disadvantage: nobody wants to write such code by hand.
Back then, some clever developers already proposed translating other programming languages such as C and C++ into this subset of JavaScript.
Basically, you ignore all dynamic features and instead either optimize code by hand or generate it via another programming language.
Popular libraries such as [SQLite](https://sqlite.org/) for database queries or [zlib](https://www.zlib.net/) for compression can thus run with high performance in the browser; according to Mozilla (at the time), only 50% slower than the equivalent native code.

But why embed a compilable sublanguage into an interpreted language at all?
Not long after the initial asm.js specification, 2015 saw the publication of its successor WebAssembly.
It has the same goals as asm.js: the efficient execution of code in the browser, but with its own syntax.
JavaScript code can, however, load WASM modules, which are usually provided in a binary format.
The converse is not true: WASM modules are not allowed to access the browser environment, such as the Document Object Model (DOM).
More on this later.

The above example function in JavaScript, which increments a parameter by 1, looks like this in WebAssembly:

```
(module
  (func $inc (param i32) (result i32)
    local.get 0
    i32.const 1
    i32.add)
  (export "inc" (func $inc)))
```

There are similarities to the assembly code that is executed directly on CPUs.
Opcodes such as `i32.const` or `i32.add` are used to load constants of a specific type or add values.
`local.get 0` loads the value of the first parameter.
Important:
While the parameter type is irrelevant for JavaScript, you should restrict this to `i32` for WebAssembly, as it is difficult to handle arbitrary object pointers in WASM.

But here is where the similarity ends.
In contrast to CPU assembly, WebAssembly has an inbuilt stack so that operations always take values from the stack or place them on it.
The idea is that browsers can check the correctness of the stack operations before execution.
Thus, they can rule out underruns, a common vulnerability where more values are removed from the stack than are available.

WASM modules also offer a structured control flow:
case distinctions do not have to be specified using jump commands – like in CPU assembly – but can be expressed using `if`, `then` and `else`.
This makes it much easier to convert C or C++ code to WebAssembly.

Save the above code in a file named `example.wat`.
Before you can execute the code you, have to convert it from textual syntax (file extension `.wat`) to binary format (file extension `.wasm`).
To do this, you need the command line tool `wat2wasm` from the [WABT tool suite](https://github.com/webassembly/wabt).
Run the following commands:

```
wat2wasm example.wat
wasm-interp example.wasm -r inc -a "i32:1"
```

The parameter `-r` is responsible for calling the designated function.
This must be declared in the export line of the module.
An argument is passed to the function with `-a`.
The function adds 1 to the argument 1, so the output is as follows:

```
inc(i32:1) => i32:2
```

## Integration

Of course, executing WebAssembly on the command line is not particularly exciting, so what about the browser?
First: modern browsers do not download the entire module and then parse it; instead, the module is streamed and parsed on-the-fly.
While a large module is still downloading, the engine prepares as much as possible so that it can execute the module immediately after the download.

The `example.wasm` file that you have just generated will continue to serve as an example.
We will now embed it in an HTML page.
This page only contains a button that increments and outputs an internal variable when clicking a button.
While rudimentary, this is perfectly adequate for a first stab at WebAssembly.

Start with an HTML template named `example.html`:

```html
<!DOCTYPE HTML>
<html>
  <body>
    <div>0</div>
    <button>More!</button>
    <script src="https://unpkg.com/wabt@1.0.32/index.js"></script>
    <script src="example.js"></script>
  </body>
</html>
```

We add WABT as a dependency, so that we do not have to compile the WAT code ourselves.
However, this also means that a few more steps are required for execution.
Since WebAssembly does not have direct access to the DOM, we need to create an additional file `example.js`, which is the glue connecting both worlds.
WebAssembly offers imports for this purpose, which – you guessed it – are the counterpart to exports.

To that end, we start off `example.js` with an object which can be imported into WASM later:

```javascript
const importObject = {
  imports: {
    display: arg => {
      document.querySelector("div").innerHTML = arg;
    }
  }
};
```

The `display` method overwrites the content of the `<div>` tag with the argument that has been provided.
Next, add the following placeholder below for the WASM code (to be filled in at a later stage):

```javascript
const code = `
  ;; WAT
`;
```

Finally, the code that compiles the WAT sources and wires it up to the button.

```javascript
async function init() {
  // 1: initialize WABT
  const wabt = await WabtModule();
  // 2: compile WAT
  const module = wabt.parseWat("example.wat", code);
  module.resolveNames();
  module.validate();
  const binary = module.toBinary({});
  // 3: load WASM
  const wasm = new WebAssembly.Module(binary.buffer);
  const instance = new WebAssembly.Instance(wasm, importObject);
  // 4: wire up WASM module with the button
  const handler = instance.exports.more;
  document.querySelector("button").onclick = handler;
};

init();
```

Note that in a real application, you would run the WASM translation during the build process, which makes it much easier to load the WebAssembly module at runtime.
In this example, however, the browser takes care of everything.

## Errors

If you now open the HTML file in the browser, the browser log should contain an error message:
The WAT code cannot be parsed.
This is not surprising, because it does not exist yet.
The placeholder in `example.js` must be replaced.
Start with this snippet:

```javascript
const code = `
(module
  (import "imports" "display" (func $display (param i32)))
  (export "more" (func $more))
  (global $counter (mut i32) (i32.const 0))
)
`;
```

Just as in the previous example, we define a module that exports a function `more`.
It specifies no arguments nor a return value.
We also import the `display` function, which expects an `i32` as an argument.
Last but not least, the global variable `counter` – also an `i32` - with the start value 0.
Observe that variables must be explicitly declared to be mutable.
This requirement aims to promote safer programming practices.

Now, let us add the missing functions:

```javascript
const code = `
(module
  (import "imports" "display" (func $display (param i32)))
  (export "more" (func $more))
  (global $counter (mut i32) (i32.const 0))
  (func $inc (param i32) (result i32)
    local.get 0
    i32.const 1
    i32.add)
  (func $more
    global.get $counter
    call $inc
    global.set $counter
    global.get $counter
    call $display)
)
`;
```

The `$more` function loads the counter, calls `$inc`, writes back the new value, and finally calls the imported `display` function.

You can now reload the HTML file in the browser.
Click on “More!” to increment the number displayed above.
By the way: Errors in the stack handling or mismatching types are reported by `module.validate()`, i.e., before execution.

## Division of labour

In practice, the WebAssembly code is not compiled in the browser, but during the build process.
The JS code then only has to request the binary from the web server and can instantiate it directly.

To try this out, create a copy of the HTML file named `example2.html`.
Remove the import from WABT and reference `example2.js` instead of `example.js`.
Copy `example.js` in the same way:
Keep the definition of the import object in `example2.js` and delete the rest of the code.
Move the WebAssembly code to `example2.wat`.

Compile `example2.wat` as follows:

```
wat2wasm example2.wat
```

Now, let us take care of `example2.js`.
We still need an `init` function, but it is much shorter:

```javascript
async function init() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("example2.wasm"),
    importObject
  );
  const handler = instance.exports.more;
  document.querySelector("button").onclick = handler;
};

init();
```

To instantiate, use the built-in `WebAssembly.instantiateStreaming()` function.
This accepts a `fetch` request as the first argument, which browsers use to request a resource asynchronously from the server.
The second argument is the familiar import object.
Thanks to asynchronous processing, parsing runs parallel to the download of the module.

You will probably recognize the remaining lines from the previous version.
To try out the modified code, however, it is not enough to open `example2.html` locally in the browser.
This is because the security guidelines of modern browsers prohibit loading code from the file system.
Instead, you need a web server; you can use Python's built-in one, for example.
Start it in the command line as follows:

```
python -m http.server
```

If this does not work, try `python3` instead of `python`.
Python will now tell you that it has opened a server on port 8000.
You can access the website in the browser via the URL `http://localhost:8000/example2.html`.
If everything went correctly, the button should increment the counter again.

Unfortunately, it is not yet possible to load WebAssembly modules simply by `import` declaration, as has long been possible for other JS modules.
There is a [proposal to add this to the JS standard](https://github.com/tc39/proposal-source-phase-imports/), which is currently in phase 3 of 4, meaning that it is a candidate for future adoption.

## Garbage collection

A WASM feature that is often requested but unfortunately not yet available is garbage collection.
JavaScript automatically takes care of deleting unused objects and releasing their memory.
This is not trivial, as these can be referenced either in your own heap or from the Document Object Model (DOM), i.e., from internal browser data structures.
WebAssembly avoids the problem by not performing garbage collection at all by default.
The heap array, which some modules request as an important, must be kept clean by the module itself.

This is reminiscent of C, where you have to manually call `malloc` and `free`.
But many modern programming languages such as Go or Swift come with automatic garbage collection.
Fortunately, a working group is [looking into the problem](https://groups.google.com/a/chromium.org/g/blink-dev/c/HDbvHCVFSW0/m/YKheArEAAgAJ?pli=1).
Some experimental garbage collectors that can be added to a WASM programme are already available today.

## Conclusion

Of course, one would rarely – if ever – write WASM code by hand.
Not just because of the syntax, which may seem unusual to many JavaScript programmers.
But rather because the instructions are too low-level.

Fortunately, recent years saw the formation of a large ecosystem around WebAssembly.
The project's website [lists compilers](https://webassembly.org/getting-started/developers-guide/) that can generate WASM directly.
As already described, this works with C/C++, but also numerous other languages such as Rust, Go and Kotlin.
One fly in the ointment: Not all language features or existing libraries can be seamlessly translated to WebAssembly, that is because WebAssembly simply lacks some important interfaces.

Despite all this, WebAssembly is a fast and powerful programming language.
Compared to JavaScript, browsers can optimize it much better and translate it into machine code.
While WASM is slowly gaining momentum in the browser, some people are also working hard on adoption on the server side.
For example, the Java VM “GraalVM” has recently added support for execution of WebAssembly alongside Java.
In the future, entire applications could be implemented purely in WebAssembly: lightweight and efficient, but still secure.
A bright outlook for the web.

_This post has also been [published on LinkedIn](https://www.linkedin.com/pulse/webassembly-faster-code-web-dr-lars-hupel-i6dle/)._
