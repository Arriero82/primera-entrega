console.log('prueba');
console.log(Date.now());

fetch('/api/productos')
.then(response => response.json())
.then(data => console.log(data));

                