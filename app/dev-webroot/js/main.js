function search(){
 
console.log(document.getElementById('searchWord').value);
 window.location = "/search/" +document.getElementById('searchWord').value;

 
}