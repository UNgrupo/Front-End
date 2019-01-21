export default function isActualUser( userId ){
    const user = JSON.parse(window.localStorage.getItem('user'));
    return ( userId === user.id || user.attributes.role === 'admin' );
}