export default function isActualUser( userId ){
    return ( userId === JSON.parse(window.localStorage.getItem('user')).id );
}