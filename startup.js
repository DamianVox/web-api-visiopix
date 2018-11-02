module.exports = {
    start: function () {
        return "VisioTime API Startup.....";
    },
    express: function () {
        let ex = require('express');
        let app = ex();
        return app;
    },
    port: function () {
        const p = 8080;
        return p;
    },
test: function(){
    console.log("Starting Test");
    console.log(".       .   ........... ");
    console.log(" .     .         ..     ");
    console.log("  .   .          ..     ");
    console.log("   . .           ..     ");
    console.log("    .            ..     ");
    console.log("                        ");
    console.log("VISIOTIME, Your Time and attendance specialists");
}
}