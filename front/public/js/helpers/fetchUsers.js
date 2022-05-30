const URL = 'http://localhost:3000';
var userData = JSON.parse(window.sessionStorage.getItem('user_data'));

//Fetch Sign Up
const postNewUser = async (req) => {
    try{
        const res = await fetch(URL+'/signup', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        //This is not working
        if(data.keyPattern){
            return alert('Username already exists');
        }
        if(data.errors){
            return alert(data.message);
        }
        if(res.ok == false) {
            return alert("Name already exists")
        }
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./menu.html';
    }catch(e){
        alert(e);
    }  
};

//Fetch Login
const loginNewUser = async (req) => {
    try{
        const res = await fetch(URL+'/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        });
        const data = await res.json();
        if(data.errors){
            return alert(data.errors);
        }
        window.sessionStorage.setItem('user_data', JSON.stringify(data));
        window.location='./menu.html';
    }catch(e){
        alert(e);
    }  
};

//Fetch current User
const getUser = async () => {
    try{
        const res = await fetch(URL+'/user', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+userData.token
            },
        });
        const data = await res.json();
        
        return data.name;
    }catch(e){
        console.log(e);
        window.location='./homepage.html';    
    }  
};

export { 
    postNewUser,
    loginNewUser,
    getUser
};
