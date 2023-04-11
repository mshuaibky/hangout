import axios from 'axios';
axios.defaults.withCredentials = true


export async function registerUser(credentials){
    console.log(credentials,'namma credentials');
   return new Promise((resolve,reject)=>{
    axios.post('http://localhost:4000/register',credentials).then((data)=>{
        console.log(data,'namma data');
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
   })
}

export async function loginUser(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/login',credentials).then((data)=>{
            console.log(data);
            resolve(data)
        }).catch(error=>{
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