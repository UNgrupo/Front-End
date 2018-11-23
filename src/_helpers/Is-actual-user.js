export default function isActualUser( userId ){
    return ( userId === window.localStorage.getItem( 'userId' ) );
}