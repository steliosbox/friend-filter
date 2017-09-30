export default function (settings, callback) {
    let dragItem = settings.dragItem;
    let eventButton = settings.eventButton;
    let dragContainer = settings.dragContainer;
    let container = document.getElementsByClassName(dragContainer);
    
    [].forEach.call(container, function (corrent) {
        
        corrent.addEventListener('mousedown', function (e) {
            let target = e.target;
            let moveFrom = corrent.dataset.container;
            
            while (!target.classList.contains(dragItem) && target !== this) {
                if (target.classList.contains(eventButton)) {
                    break;
                }
                target = target.parentElement;
            }
            
            if (target.classList.contains(eventButton)) {
                let dragElement = target.closest(`.${dragItem}`);
                callback(moveFrom, dragElement);
                
                moveFriend({
                    container: (moveFrom === 'all') ? container[1] : container[0],
                    item: dragElement,
                    button: eventButton,
                    method: (moveFrom === 'all') ? 'remove' : 'add',
                    buttonClass: (moveFrom === 'all') ? 'flaticon-close' : 'flaticon-plus',
                    scroll: (moveFrom === 'all')
                });
            }
            
            if (moveFrom === 'all' && target.classList.contains(dragItem)) {
                let clone = cloneElement(target, e);
                
                document.body.appendChild(clone.element);
                document.onmousemove = function (e) {
                    clone.element.style.left = e.pageX - clone.x + 'px';
                    clone.element.style.top = e.pageY - clone.y + 'px';
                };
                document.onmouseup = function (e) {
                    document.body.removeChild(clone.element);
                    document.onmousemove = null;
                    document.onmouseup = null;
                    let container = elementPoint(e);
                    
                    if (container) {
                        let corrent = container.closest(`.${dragContainer}`);
                        
                        if (corrent && corrent.dataset.container === 'favorite') {
                            callback('all', target);
                            
                            moveFriend({
                                container: corrent,
                                item: target,
                                method: 'remove',
                                scroll: true
                            });
                        }
                    }
                };
            }
        });
    });
};

function moveFriend (options) {
    
    options.container.appendChild(options.item);
    
    if (options.scroll) {
        options.container.scrollTop = options.container.scrollHeight - options.container.clientHeight;
    }
}

function getCoords (item) {
    item = item.getBoundingClientRect();
    
    return {
        width: item.width,
        height: item.height,
        top: item.top + pageYOffset,
        left: item.left + pageXOffset
    };
}

function cloneElement (target, event) {
    let clone = target.cloneNode(true);
    let coords = getCoords(target);
    let shiftX = event.pageX - coords.left;
    let shiftY = event.pageY - coords.top;
    
    clone.style.width = coords.width + 'px';
    clone.style.height = coords.height + 'px';
    clone.style.left = event.pageX - shiftX + 'px';
    clone.style.top = event.pageY - shiftY + 'px';
    clone.style.position = 'absolute';
    clone.style.zIndex = 9999;
    
    return {
        element: clone,
        x: shiftX,
        y: shiftY
    };
}

function elementPoint (event) {
    let elementPoint = document.elementFromPoint(event.clientX, event.clientY);
    
    if (elementPoint === null) {
        return false;
    }
    
    return elementPoint;
}