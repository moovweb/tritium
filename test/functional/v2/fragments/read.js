// Replaces the current document with a template
function loadTemplate(templateData) {

    // Load the template HTML
    var div = document.createElement("div");
    div.innerHTML = templateData;

    while (document.body.children[0]) {
        document.body.removeChild(document.body.children[0]);
    }
    document.body.appendChild(div);

    // Execute template JavaScript
    var scripts = div.getElementsByTagName("script");
    var len = scripts.length;
    for (var i = 0; i < len; i++) {
        addTag("script", scripts[i].innerHTML);
    }
};