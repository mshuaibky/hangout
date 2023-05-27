import axios from "axios";

//admin signUp
export async function adminSignUp(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/admin/sign-up',credentials).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//adminLogin

export async function adminLogin(credentials){
return new Promise((resolve,reject)=>{
    axios.post('http://localhost:4000/admin/login',credentials).then((data)=>{
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
})
}
//getting all users

export async function getUserDetails(){
    return new Promise((resolve,reject)=>{
      axios.get('http://localhost:4000/admin/get-user-details').then((data)=>{
        console.log(data,'axios');
          resolve(data)
      }).catch((error)=>{
          reject(error)
      })
    })
  }

  export async function getOwnerDetails(){
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:4000/admin/get-owner-data').then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error.message)
        })
    })
  }

  export async function blockOwner(id){
    console.log(id,'helpersId');
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/admin/handle-owner${id}`).then((data)=>{
          console.log(data.data.data,'namm axios');
            resolve(data?.data?.data)
        }).catch((error)=>{
            reject(error.message)
        })
    })
  }

  export async function AcceptUser(id){
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/admin/accept-user${id}`).then((data)=>{
            
          
            resolve(data?.data?.data)
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //getting orders for owner

  