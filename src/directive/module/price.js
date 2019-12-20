export default (el,binding) =>{
    let value = binding.value || el.innerHTML;
    el.innerHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}