const LESSONS = [
    {
        name: "Variables",
        blocks: [
            {
                type: "h1",
                content: "Variables"
            },
            {
                type: "p",
                content: "Think of a variable as a labeled container that can hold different kinds of things. Instead of holding food or clothes, variables hold data. Just as there are different types of containers, there are different types of variables. You <i>create</i> a variable, and <i>assign</i> it a value."
            },
            {
                type: "p",
                content: "In JavaScript, you can have a variable that changes value (<i>mutable</i>) or one that does not change value (<i>immutable</i>). For mutable variables, you use <b>let</b> and for immutable variables, you use <b>const</b>."
            },
            {
                type: "code",
                content: 'const myName = "Rees";\n\nlet myAge = 19;'
            },
            {
                type: "p",
                content: "A more advanced type of JavaScript variables are something called objects. An object is a copy of a class, where a class is a collection of variables, and something else that you will learn later called functions. When you create a copy, or instance, of a class, you can use that variable to access the variables and functions of that object."
            },
            {
                type: "code",
                content: "const moz = new Mosaic(5, 5);"
            }
        ]
    },
    {
        name: "Calling Functions",
        blocks: [
            {
                type: "h1",
                content: "Calling Functions"
            },
            {
                type: "p",
                content: "Functions are lines of code that have been grouped together and can be called upon by a name. Functions can be attached to an object, or just for general use. When you call a function, you sometimes pass parameters to the function. There are pre-defined inputs that the function expects, you give them by putting them in parenthesis after the function name."
            }
        ]
    },
    {
        name: "Conditionals",
        blocks: [
            {
                type: "h1",
                content: "Conditionals"
            },
        { 
                type: "p",
                content: "Conditionals are statement that check conditions, which can be either true or false, and then do something depending on that state. Sometimes they are referred to as If-Then, Else-Then statements. If you want to check multiple conditions after each other, you can use else if. If, else if, and else statements are evaluated in sequential order, so you must be careful. If you have an else or an else if, you must have an if before it, but if you have an if, you do not need anything additional."
            }
        ]
    },
    {
        name: "Loops",
        blocks: [
            {
                type: "h1",
                content: "Loops"
            },
            {
                type: "p",
                content: "The loop header has the 1. variable initialization, 2. the condition, and 3. the variable mutation."
            },
            {
                type: "ol",
                blocks: [
                    {
                        type: "li",
                        content: "Variable initialization only happens at the first iteration (a.k.a run through) of the loop. It sets up our counter."
                    },
                    {
                        type: "li",
                        content: "The condition is checked before every iteration to check if the loop should run or not."
                    },
                    {
                        type: "li",
                        content: "The variable is then mutated, you can do any math operation you want to on the variable."
                    }
                ]
            },
            {
                type: "code",
                content: "for (let i = 0; i < moz.width; i++)"
            },
            {
                type: "p",
                content: "You can also put loops inside of other loops, this is called nesting. The inner loops finish first, then goes outwards."
            }
        ]
    },
    {
        name: "Creating Functions",
        blocks: [
            {
                type: "p",
                content: "As previously written, functions are lines of code that have been grouped together and can be called upon by a name. These functions can take inputs called parameters, and can return outputs."
            },
            {
                type: "p",
                content: "You can have two functions with the same name, as long as they have different parameters, or orders of parameters. This is called function overloading."
            },
            {
                type: "code",
                content: 'const moz = new Mosaic(5, 5);\n\nfunction drawLine() {\n\tfor (let x = 0; x < moz.width; x++) {\n\t\tmoz.setTileColor(x, 0, "blue");\n\t}\n}'
            }
        ]
    }
];

const DOCS = [
    {
        name: "Tips",
        blocks: [
            {
                type: "h2",
                content: "Tips and Tricks"
            },
            {
                type: "ol",
                blocks: [
                    {
                        type: "li",
                        content: "The code you write is automatically saved locally on your browser, so you don't have to worry about losing code."
                    },
                    {
                        type: "li",
                        content: "If you get an infinite loop, refresh the page. You could also just exit out of the tab, and reopen it."
                    }
                ]
            }
        ]
    },
    {
        name: "Mosaic",
        blocks: [
            {
                type: "h2",
                content: "Mosaic Methods"
            },
            {
                type: "b",
                content: "Mosaic(width, height): "
            },
            {
                type: "span",
                content: "Creates a new Mosaic object."
            },
            {
                type: "code",
                content: "const moz = new Mosaic(5, 5);"
            },
            {
                type: "b",
                content: "setTileColor(x, y, color): "
            },
            {
                type: "span",
                content: "Sets a tiles's color value."
            },
            {
                type: "code",
                content: "// with color name\nmoz.setTileColor(0, 0, \"gold\");\n\n// with hex value\nmoz.setTileColor(0, 0, \"#3954AE\");"
            },
            {
                type: "b",
                content: "getTileColor(x, y): "
            },
            {
                type: "span",
                content: "Gets a tiles's color value."
            },
            {
                type: "code",
                content: "moz.getTileColor(0, 0);"
            },
            {
                type: "b",
                content: "setTileGradient(x, y, ...colors): "
            },
            {
                type: "span",
                content: "Sets a tiles's gradient."
            },
            {
                type: "code",
                content: "// it can take any number of color parameter values\nmoz.setTileGradient(0, 0, \"gold\", \"red\", \"blue\");\n\n// or take an array\nmoz.setTileGradient(0, 0, [\"gold\", \"red\", \"blue\"]);"
            },
            {
                type: "b",
                content: "getTileGradient(x, y): "
            },
            {
                type: "span",
                content: "Gets a tiles's gradient value."
            },
            {
                type: "code",
                content: "moz.getTileGradient(0, 0);"
            },
        ]
    },
    {
        name: "Tile",
        blocks: [
            {
                type: "h2",
                content: "Tile Methods"
            },
            {
                type: "b",
                content: ".color"
            },
            {
                type: "b",
                content: "setColor"
            }
        ]
    },
    {
        name: "Color",
        blocks: [
            {
                type: "h2",
                content: "Color Methods"
            },
            {
                type: "b",
                content: "Mosaic(width, height)"
            }
        ]
    }
];

let delay;
let firstRun = true;
let hasLocalStorage = false;
let autoRun = false;

// handle errors that come from editor.js
window.onerror = (message, url, lineNum, colNum, error) => console.error(message);

window.onload = () => {
    // create splitter panel
    $(".panel-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: false
    });

    // create CodeMirror editor
    let editor = CodeMirror(document.getElementById("editor"), {
        mode: "javascript",
        autoCloseBrackets: true,
        lineNumbers: true,
        indentWithTabs: true,
        indentUnit: 4,
        lineWrapping: true,
        styleActiveLine: { nonEmpty: true },
        value: "const moz = new Mosaic(5, 5);\n\nmoz.setTileColor(0, 0, 'black');",
        extraKeys: {
            "Ctrl-/": function(instance) { 
                commentSelection(true);
            },
        }      
    });

    // autofocus on editor input
    editor.focus();

    // test for localStorage capabilities
    try {
        let test = 'test';

        localStorage.setItem(test, test);
        localStorage.removeItem(test);

        hasLocalStorage = true;
    } 
    catch(e) {
        hasLocalStorage = false;
    }

    // If the browser supports localStorage
    if (hasLocalStorage) {
        // Get CodeMirror instance
        let editor = document.querySelector('.CodeMirror').CodeMirror;

        // Check if the user has code saved before
        if (localStorage.getItem("code"))
            editor.setValue(localStorage.getItem("code"));
    }

    // attach an event listener for changes
    editor.on("change", () => {
        if (autoRun) {
            // reset delay and add delay again
            clearTimeout(delay);
            delay = setTimeout(executeCode, 300);

            // clear the console log view
            clearConsole();

            // clear evnet listeners
            clearEventListeners();

            // if localStorage is available, save the code
            if (hasLocalStorage)
                localStorage.setItem("code", editor.getValue());
        }
        else {
            // if localStorage is available, save the code
            if (hasLocalStorage)
                localStorage.setItem("code", editor.getValue());
        }
    });

    renderLessons();
    renderHelp();
}

// listen for escape key press
document.onkeyup = e => {
    if (e.key == "Escape") 
        document.getElementById("myModal").style.display = "none";
}

// when the user clicks anywhere outside of the modal, close it
window.onclick = e => {
    const modal = document.getElementById("myModal");

    // if clicking outside of modal
    if (e.target == modal) 
        modal.style.display = "none";
}

function renderLessons() {
    // render all of the lessons
    LESSONS.forEach(lesson => {
        // create a div for each lesson
        const lessonContainer = document.createElement("div");
        lessonContainer.id = lesson.name.split(" ").join("_").toLowerCase();
        lessonContainer.className = "lesson";

        // add the lesson to the lessons div
        document.getElementById("lessons").appendChild(lessonContainer);

        // render the blocks for that lesson
        renderBlocks(lesson.blocks, lessonContainer);
    });
}

function renderHelp() {
    DOCS.forEach(api => {
        const apiContainer = document.createElement("div");
        apiContainer.id = api.name.toLowerCase();
        
        document.getElementById("help").appendChild(apiContainer);
        renderBlocks(api.blocks, apiContainer);
    });
}

function clearEventListeners() {
    document.onclick = () => {};
    document.onkeydown = () => {};
    document.onkeypress = () => {};
    document.onkeyup = () => {};
    document.onmouseover = () => {};
}

// document.querySelectorAll("#learningPath li a").forEach(el => el.onclick = selectLesson);

// let currentLesson;
// function selectLesson(lessonNum) {
//     currentLesson = lessonNum;
// }

// selectLesson(0);

// const lessonDivs = document.getElementsByClassName("lesson");

// for (const div of lessonDivs) 
//     div.style.display = "none";
            
// lessonDivs[currentLesson].classList.toggle("active");

function openModal(content) {
    const modal = document.getElementById("myModal");

    modal.style.display = "block";

    // hide all modal content possibilites
    for (const el of document.getElementsByClassName("modalContent"))
        el.style.display = "none";
    document.getElementById("learningPath").style.display = "none";

    let title;
    if (content == "lessons")  {
        title = "Learn JavaScript";

        document.getElementById("lessons").style.display = "";
        // document.getElementById("learningPath").style.display = "";
    }
    else if (content == "examples") {
        title = "Example Scripts";

        document.getElementById("examples").style.display = "";
    }
    else if (content == "help") {
        title = "Mosaic Help"

        document.getElementById("help").style.display = "";
    }
    else if (content == "about") {
        title = "About Mosaic";

        document.getElementById("about").style.display = "";
    }

    document.getElementById("modalTitle").innerText = title;
}

function closeModal() { 
    const modal = document.getElementById("myModal");
    modal.style.display = "none" 
}

/**
 * Clear the contents of the onscreen console.
 */
function clearConsole() {
    document.getElementById("console").innerHTML = "";
}

/**
 * Handle the run code button click to run code for the first time.
 */
function runCode() {
    // remove button glow
    document.getElementById("runCode").classList.toggle("button-glow");

    // disable button because auto-run is now enabled
    const el = document.getElementById("runCode");
    el.disabled = true;
    el.innerHTML = "Auto-Run Enabled";

    document.getElementById("stopRunning").disabled = false;

    autoRun = true;

    // Run the user's code for the first time
    clearEventListeners();
    executeCode();
}

/**
 * Stop the animation in case it's giving you a headache.
 */
function stopRunning() {
    const runCodeButton = document.getElementById("runCode");
    // re-enable the run code button to restart the animation
    runCodeButton.disabled = false;
    runCodeButton.innerHTML = "Run Code";
    runCodeButton.classList.toggle("button-glow");

    // disable stop running button to prevent double pressing
    document.getElementById("stopRunning").disabled = true;

    // stop auto-run of code
    autoRun = false;

    // clear all intervals from Mosiac.loop()
    for (let i = 1; i < 999999; i++)
        window.clearInterval(i);

    // clear any event listeners that were bound
    clearEventListeners();
}

/**
 * Copy contents of code sample to editor.
 */
function copyToEditor() {
    // Set value of editor to example
    let editor = document.querySelector('.CodeMirror').CodeMirror;
    editor.setValue($(".tab-pane.active > code").text());

    // Close modal
    $(".modal").modal("hide");
}            

/**
 * Execute user's code.
 */
function executeCode() {
    // Clear all intervals if its an animation
    for (let i = 1; i < 999999; i++)
        window.clearInterval(i);

    // Get code from editor
    let editor = document.querySelector('.CodeMirror').CodeMirror;

    let code = "(async function() { " + editor.getValue() + "\n })().catch(e => console.error(e))";
    
    // add code as a script to page + execute
    let script = document.createElement('script');
    try {
        // If its first time executing something
        if (firstRun) {
            // Add script tag
            script.appendChild(document.createTextNode(code));
            document.body.appendChild(script);
        }
        else {
            // Remove old code
            document.body.removeChild(document.body.lastChild);

            // Add new code
            script.appendChild(document.createTextNode(code));
            document.body.appendChild(script);
        }
                        
        firstRun = false;
    } 
    catch (e) {
        script.text = code;
        document.body.appendChild(script);
    }
}

/**
 * Capture console.log() calls and display them onscreen.
 */
(function() {
    const oldLog = console.log;
    const oldError = console.error;
    const consoleEl = document.getElementById("console");

    console.log = function(message) {
        // Append value to the end if there is already log output
        if (consoleEl.innerHTML)
            consoleEl.innerHTML += "<br>" + message;
        // Set the new value of log output
        else
            consoleEl.innerHTML = message;

        consoleEl.scrollTop = consoleEl.scrollHeight;

        oldLog.apply(console, arguments);
    };

    console.error = function(message) {
        const consoleEl = document.getElementById("console");

        if (consoleEl.innerHTML)
            consoleEl.innerHTML += "<span style='color: red'><br>" + message + "</span>";
        // Set the new value of error output
        else
            consoleEl.innerHTML = "<span style='color: red'>" + message + "</span>";

        oldError.apply(console, arguments);
    }
})();

function renderBlocks(blocks, parent) {
    for (const block of blocks) {
        // if the block doesn't have blocks in it
        if (block.content) {
            let el;

            // treat code as special block
            if (block.type == "code") {
                // create code block as pre to keep whitespace
                el = document.createElement("pre");

                // add code mirror className so syntax highlighting works
                el.className = "cm-s-default";
                        
                // run CodeMirror syntax highlighting on the code
                CodeMirror.runMode(block.content, { name: "javascript" }, el);
            }
            // for any other element
            else {
                el = document.createElement(block.type);
                el.innerHTML = block.content;
            }

            // add the new element to the parent
            parent.appendChild(el);
        }
        // if the block has other blocks in it
        else {
            // create the container element that will contain the other blocks
            const container = document.createElement(block.type);

            // add the new container to the parent element
            parent.appendChild(container);

            // render the blocks inside the container
            renderBlocks(block.blocks, container);
        }
    }
}

function getSelectedRange() {
    return { from: editor.getCursor(true), to: editor.getCursor(false) };
}
      
function autoFormatSelection() {
    const range = getSelectedRange();
    editor.autoFormatRange(range.from, range.to);
}
      
function commentSelection(isComment) {
    const range = getSelectedRange();
    editor.commentRange(isComment, range.from, range.to);
}