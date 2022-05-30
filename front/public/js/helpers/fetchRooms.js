const URL = 'http://localhost:3000';
var userData = JSON.parse(window.sessionStorage.getItem('user_data'));

const createRoom = async (req) => {
    try{
        const res = await fetch(URL+'/rooms', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        
        if(data.keyPattern){
            return alert('Room already exists');
        }
        if(data.errors){
            return alert(data.message);
        }
        return data;
    }catch(e){
        alert(e);
    }
};

const getRooms = async () => {
    try{
        const res = await fetch(URL+'/rooms', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            }
        });
        const data = await res.json();
        return data;
    }catch(e){
        console.log(e);
        window.location='./homepage.html';    
    }  
};

const getUserInRoom = async (req) => {
    try{
        const res = await fetch(URL+'/rooms', {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./chat.html';
    }catch(e){
        console.log(e); 
    }
}

export {
    createRoom,
    getRooms,
    getUserInRoom } ;
