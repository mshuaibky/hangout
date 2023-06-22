
import axios from 'axios';
axios.defaults.withCredentials = true

const URL= 'http://localhost:4000'
const userApi=  axios.create({
    baseURL:URL
})

export async function registerUser(credentials){
    console.log(credentials,'namma credentials');
   return new Promise((resolve,reject)=>{
    userApi.post('/register',credentials).then((data)=>{
        
        resolve(data)
    }).catch((error)=>{
     
        reject(error)
    })
   })
}

export async function loginUser(credentials){
    return new Promise((resolve,reject)=>{
        userApi.post('/login',credentials).then((data)=>{
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
        userApi.post('/otp-number',data).then((value)=>{
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
        userApi.post('/otp-verify',data).then((value)=>{
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
    userApi.post('/googleregister',data).then((data)=>{
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
  })
}

//login with google

export async function loginGoogle(data){
    return new Promise((resolve,reject)=>{
        userApi.post('/login-google',data).then((data)=>{
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
        userApi.get('/get-all-restaurants').then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//getting dish details according to the owner id

export async function dishDetails(id){
    return new Promise((resolve,reject)=>{
        userApi.get(`/get-specific-dish/${id}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

export async function getTableData(id){
    return new Promise((resolve,reject)=>{
        userApi.get(`/table-data${id}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//checkout
export async function checkoutData(data){
    return new Promise((resolve,reject)=>{
        userApi.post('/checkout',data).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

//gettting orders

export async function getOrders(id){
    return new Promise((resolve,reject)=>{
        userApi.get(`/get-orders${id}`).then((data)=>{
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
        userApi.post('/confirm-payment',details).then((data)=>{
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
    userApi.get(`/user-order${id}`).then((data)=>{
        if(data){
            resolve(data)
        }
    })
 })
}
//getting the perticuler user
export async function getUser(id){
    return new Promise((resolve,reject)=>{
       userApi.get(`/get-user${id}`).then((data)=>{
           if(data){
               resolve(data)
           }
       })
    })
   }
   //paginated restaurants
   export async function getPaginatedRes(page){
   return new Promise((resolve,reject)=>{
    userApi.get(`/get-paginated-data?page=${page}`).then((data)=>{
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
        userApi.get(`/user-paginated-order?page=${page}&&${id}`).then((data)=>{
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
        userApi.get('/get-all-dish').then((data)=>{
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
        userApi.get(`/get-booked-orders?id=${id}&&date=${date}&&time=${time}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            console.log(error,'errrr');
            reject(error)
        })
    })
   }
//adding review
   export async function ratingData(data){
    return new Promise((resolve,reject)=>{
        userApi.post('/rating-details',data).then((result)=>{
            if(result){
                resolve(result)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
   }

   //getting reviews

   export async function getReview(id){
    return new Promise((resolve,reject)=>{
        userApi.get(`/get-reviews${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
   }
   //cancelOrder

   export async function cancelOrder(id,userId){
    console.log(id,userId,'userApi..');
   return new Promise((resolve,reject)=>{
    userApi.get(`/cancel-order/${id}/${userId}`).then((data)=>{
        if(data){
            resolve(data)
        }
    }).catch((error)=>{
        reject(error)
    })
   })
   }
   //user Profile
   export async function getuserDetails(id){
    return new Promise((resolve,reject)=>{
        userApi.get(`/profile${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
   } 
   //logout user

   export async function userLogout(id){
    return new Promise((resolve,reject)=>{
        userApi.get(`/user-logout${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
   }
  