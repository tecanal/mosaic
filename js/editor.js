let delay;
let firstRun = true;
let hasLocalStorage = false;
let autoRun = true;

/**
 * Clear the contents of the onscreen console.
 */
function clearConsole() {
    document.getElementById("console").value = "";
}

/**
 * Handle the run code button click to run code for the first time.
 */
function runCode() {
    // Remove button glow
    $("#runCode").removeClass("button-glow");

    // Disable button because auto-run is now enabled
    const el = document.getElementById("runCode");
    el.disabled = true;
    el.innerHTML = "Auto-Run Enabled";

    document.getElementById("stopRunning").disabled = false;

    autoRun = true;

    // Run the user's code for the first time
    executeCode();

    // Attach an event listener 
    var editor = document.querySelector('.CodeMirror').CodeMirror;
    editor.on("change", function() {
        if (autoRun) {
            // Reset delay and add delay again
            clearTimeout(delay);
            delay = setTimeout(executeCode, 300);

            // Clear the console log view
            clearConsole();

            // if localStorage is available, save the code
            if (hasLocalStorage)
                localStorage.setItem("code", editor.getValue());
        }
    });
}

/**
 * Stop the animation in case it's giving you a headache.
 */
function stopRunning() {
    // Re-enable the run code button to restart the animation
    document.getElementById("runCode").disabled = false;
    document.getElementById("runCode").innerHTML = "Run Code";

    // Add button glow
    $("#runCode").addClass("button-glow");

    document.getElementById("stopRunning").disabled = true;

    autoRun = false;

    // Clear all intervals
    for (let i = 1; i < 999999; i++)
        window.clearInterval(i);
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
    let code = "(async function() { " + editor.getValue() + "\n })();";

    // Add code as a script to page + execute
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
 * Mark the lesson as complete on the UI and go to next lesson. 
 * Save the progress if possible.
 */
function markLessonAsRead(lessonNum) {
    // Check if we can store in local storage
    if (hasLocalStorage) {
        // Only update the lesson num if its forward progress
        if (lessonNum + 1 > localStorage.getItem("currentLesson"))
            localStorage.setItem("currentLesson", lessonNum + 1);
    }

    // Mark the lesson as complete
    $("#learningPath li").slice(0, lessonNum + 1).addClass("complete");

    // Change lesson dot indicator to next lesson
    $("#learningPath li").removeClass("active");
    $("#learningPath li").eq(lessonNum + 1).addClass("active");

    // Show lesson material
    $(".lesson").hide();
    $($("#learningPath li.active > a")[0].hash).show();
}

window.onload  = function() {
    // Create splitter panel
    $(".panel-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: false
    });

    // Create CodeMirror editor
    var editor = CodeMirror(document.getElementById("editor"), {
        mode: "javascript",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        indentWithTabs: true,
        indentUnit: 4,
        lineWrapping: true,
        autofocus: true,
        value: "const moz = new Mosaic(5, 5);\n\nmoz.setTileColor(0, 0, 'black');",
        extraKeys: {
            "Ctrl-/": function(instance) { 
                commentSelection(true);
            },
        }      
    });

    // Test for localStorage capabilities
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

    CodeMirror.commands["selectAll"](editor);
      
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

    /**
     * Listen for Escape keypress.
     */
   document.onkeyup = function(e) {
        if (e.key == "Escape") 
            $(".modal").modal("hide");
    };

    // Show modals on nav item click
    $('.nav-link').click(function(e) {
        e.preventDefault();
         
        $('#' + e.target.href.split("#")[1]).modal();
    });

    // Hide all lessons
    $(".lesson").hide();

    // Get cached Learn JavaScript position
    let currentLesson = localStorage.getItem("currentLesson");
    if (hasLocalStorage && currentLesson) {
        // Remove default active
        $("#learningPath li").removeClass("active");

        // Add read to before current lesson
        $("#learningPath li").slice(0, currentLesson).addClass("complete");

        // Add active to the current lesson
        $("#learningPath li").eq(currentLesson).addClass("active");
    }

    // Show the active lesson
    $($("#learningPath li.active > a")[0].hash).show();
    
    // Handle Learning JavaScript view
    $("#learningPath li").click(function(e) {
        e.preventDefault();

        // Change lesson dot indicator
        $("#learningPath li").removeClass("active");
        $(this).addClass("active");

        // Show lesson material
        $(".lesson").hide();
        $($("#learningPath li.active > a")[0].hash).show();
    });

    // Handle Code Samples Tabpanel
    $(".nav-tabs li.sample a").click(function(e) {
        e.preventDefault();

        $(".nav-tabs li.sample").removeClass("active");
        $(this).parent().addClass("active");
    });

    // Handle Docs Tabpanel
    $(".nav-tabs li.docs a").click(function(e) {
        e.preventDefault();

        $(".nav-tabs li.docs").removeClass("active");
        $(this).parent().addClass("active");
    });
}();

/**
 * Capture console.log() calls and display them onscreen.
 */
(function() {
    const oldLog = console.log;
    const oldError = console.error;

    console.log = function(message) {
        const consoleEl = document.getElementById("console");

        // Append value to the end if there is already log output
        if (consoleEl.value)
            consoleEl.value += "\n" + message;
        // Set the new value of log output
        else
            consoleEl.value = message;

        oldLog.apply(console, arguments);
    };

    
})();