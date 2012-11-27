# You would use this when the desktop server has an incorrect content-type in their Response Header that needs to be fixed in order to be parsed correctly. Because we match what tritium is applied using the content type. 
html() {
    export("Content-Type","text/html")
}