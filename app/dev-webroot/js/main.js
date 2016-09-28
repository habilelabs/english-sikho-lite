function search(){
 if(document.getElementById('searchWord').value){
 window.location = "/search/" +document.getElementById('searchWord').value;
 }
 else{
   alert('please enter word or a phrase to search');
   return false;
 }
 
}
