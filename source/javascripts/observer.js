export default function(target, callback) {

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if(mutation.addedNodes.length > 0) {
                callback()
            }
        });
    });

    observer.observe(target, {
        subtree: true,
        // attributes: true,
        childList: true,
        characterData: true
    });
}

