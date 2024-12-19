// when shortcut keys pressed
chrome.commands.onCommand.addListener((command, tab) => {
    console.log(command);
    if (command == "open_facebook") {
        // open facebook tab
        chrome.tabs.create({ url: "https://facebook.com" })
    }
});