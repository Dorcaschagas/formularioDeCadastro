var hostName = window.location.hostname;
console.log(hostName)
// hostName = '192.168.0.4'
const apiAddress = 'http://'+hostName+':9840/ticket/v1'

var params = new URLSearchParams(document.location.search);
var id = params.get('id')
var empresa = params.get('empresa')