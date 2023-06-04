
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

//gettting orders

export async function getOrders(id){
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/get-orders${id}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//verify payment
export async function paymentDetails(details){
    console.log(details,'api call');
    return new Promise((resolve,reject)=>{
        axios.post('http://localhost:4000/confirm-payment',details).then((data)=>{
    console.log(data,'api call');
         
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//getting orders order by user
export async function orderDetails(id){
 return new Promise((resolve,reject)=>{
    axios.get(`http://localhost:4000/user-order${id}`).then((data)=>{
        if(data){
            resolve(data)
        }
    })
 })
}
//getting the perticuler user
export async function getUser(id){
    return new Promise((resolve,reject)=>{
       axios.get(`http://localhost:4000/get-user${id}`).then((data)=>{
           if(data){
               resolve(data)
           }
       })
    })
   }
   //paginated restaurants
   export async function getPaginatedRes(page){
   return new Promise((resolve,reject)=>{
    axios.get(`http://localhost:4000/get-paginated-data?page=${page}`).then((data)=>{
        if(data){
            resolve(data)
        }
    }).catch((error)=>{
        reject(error)
    })
   })
   }
   //pagintated order
   export async function userpaginatedOrder(page,id){
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/user-paginated-order?page=${page}&&${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
   }

   //getiing all dishes
   export async function getallDishes(){
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:4000/get-all-dish').then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
   }
   //getting booked orders
   export async function bookedOrders(id,date,time){
    return new Promise((resolve,reject)=>{
        axios.get(`http://localhost:4000/get-booked-orders?id=${id}&&date=${date}&&time=${time}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            console.log(error,'errrr');
            reject(error)
        })
    })
   }