export default function (value, container) {
    
    [].forEach.call(container.children, function (corrent) {
        
        let reg = new RegExp(value, 'gi');
        
        corrent.style.display = 'none';
        
        if (reg.test(corrent.innerText)) {
            corrent.style.display = 'block';
        }
    });
}