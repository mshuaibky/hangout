import axios from 'axios';
axios.defaults.withCredentials = true


export async function registerUser(credentials){
    console.log(credentials,'namma credentials');
   return new Promise((resolve,reject)=>{
    axios.post('http://localhost:4000/register',credentials).then((data)=>{
        
        resolve(data)
    }).catch((error)=>{
     
        reject(error)
    })
   })
}

export async function loginUser(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/login',credentials).then((data)=>{
            console.log(data,'userData');
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}
//otp login
export async function number(data){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/otp-number',data).then((value)=>{
            console.log(value,'userValue');
            resolve(value)
        }).catch((error)=>{
            reject(error)
        })
    })
}

//verify Otp
export async function verify(data){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/otp-verify',data).then((value)=>{
            console.log(value);
            resolve(value)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//register google
export async function googleLogin(data){
    console.log(data,'data');
  return new Promise((resolve,reject)=>{
    axios.post('http://localhost:4000/googleregister',data).then((data)=>{
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
  })
}

//login with google

export async function loginGoogle(data){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/login-google',data).then((data)=>{
            resolve(data)
        }).catch((error)=>{
           console.log(error.response);
            reject(error.response)
        })
    })
}
//get all restaurants
export async function getAllRestaurnts(){
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:4000/get-all-restaurants').then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//getting dish details according to the owner id

export async function dishDetails(id){
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/get-specific-dish/${id}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

export async function getTableData(id){
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/table-data${id}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//checkout
export async function checkoutData(data){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/checkout',data).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
