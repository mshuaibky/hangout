import axios from "axios";

const URL = 'http://localhost:4000/admin'

const adminApi = axios.create({
    baseURL:URL
})
adminApi.interceptors.request.use((
    config
)=>{
    const token=sessionStorage.getItem('token')
    if(token && config.url!= '/login'){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})

//admin signUp
export async function adminSignUp(credentials){
    return new Promise((resolve,reject)=>{
        adminApi.post('/sign-up',credentials).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//adminLogin

export async function adminLogin(credentials){
return new Promise((resolve,reject)=>{
    adminApi.post('/login',credentials).then((data)=>{
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
})
}
//getting all users

export async function getUserDetails(){
    return new Promise((resolve,reject)=>{
      adminApi.get('/get-user-details').then((data)=>{
        console.log(data,'adminApi');
          resolve(data)
      }).catch((error)=>{
          reject(error)
      })
    })
  }

  export async function getOwnerDetails(){
    return new Promise((resolve,reject)=>{
        adminApi.get('/get-owner-data').then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error.message)
        })
    })
  }

  export async function blockOwner(id){
    console.log(id,'helpersId');
    return new Promise((resolve,reject)=>{
        adminApi.get(`/handle-owner${id}`).then((data)=>{
          console.log(data.data.data,'namm adminApi');
            resolve(data?.data?.data)
        }).catch((error)=>{
            reject(error.message)
        })
    })
  }

  export async function AcceptUser(id){
    return new Promise((resolve,reject)=>{
        adminApi.get(`/accept-user${id}`).then((data)=>{
            
          
            resolve(data?.data?.data)
        }).catch((error)=>{
            reject(error)
        })
    })
  }
 //get all restaurants
 
 export async function getRestaurant(){
    return new Promise((resolve,reject)=>{
        adminApi.get('/restaurants').then((data)=>{
            
          
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
  }
//getting admin yearly order data
  export async  function adminYearlyData(){
  return new Promise((resolve,reject)=>{
    adminApi.get('/admin-yearly-data').then((data)=>{
        if(data){
            resolve(data)
        }
    }).catch((error)=>{
        reject(error)
    })
  })
  }
  //getting monthly data
  export async  function adminMonthlyData(){
    return new Promise((resolve,reject)=>{
      adminApi.get('/admin-monthly-data').then((data)=>{
          if(data){
              resolve(data)
          }
      }).catch((error)=>{
          reject(error)
      })
    })
    }
    //getting daily data
    export async  function adminDailyData(){
        return new Promise((resolve,reject)=>{
          adminApi.get('/admin-daily-data').then((data)=>{
              if(data){
                  resolve(data)
              }
          }).catch((error)=>{
              reject(error)
          })
        })
        }
    //logout
    export async function logoutAdmin(id){
        return new Promise((resolve,reject)=>{
        adminApi.get(`/logout-admin${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
        })
    }