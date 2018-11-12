export default function( email ){ 
    let reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
}