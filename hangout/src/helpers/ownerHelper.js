import axios from 'axios';
axios.defaults.withCredentials = true

const URL='http://localhost:4000/owner'
const ownerApi=axios.create({
    baseURL:URL
})
ownerApi.interceptors.request.use((config)=>{
    const ownerToken=sessionStorage.getItem('ownerToken')
    if(ownerToken && config.url!='/owner-login'){
        config.headers.Authorization=`Bearer ${ownerToken}`
    }
    return config
})

export async function ownerRegister(credentials){
    console.log(credentials,'credentials');
    return new Promise((resolve,reject)=>{
        ownerApi.post('/sign-up',credentials).then((data)=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}
export async function OwnerLogin(credentials){
    return new Promise((resolve,reject)=>{
        ownerApi.post('/owner-login',credentials).then((data)=>{
            console.log(data.data.data[0]._id,'namma owner data');
            localStorage.setItem('ownerId', data.data.data[0]._id);
           resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//adding res details
export async function resDetails(credentials){
    
    return new Promise((resolve,reject)=>{
        ownerApi.post('/res-details',credentials).then((data)=>{
            
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//getting restaurants
export async function getResDetais(id){
//   const id=  localStorage.getItem("ownerId")
//   console.log(id,'namma id');
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-res-details${id}`).then((data)=>{
            console.log(data,'datas');
            resolve(data)
        }).catch((error)=>{
            reject(error.message)
        })
    })
}

//adding dishes

export async function dishDetails(credentials){
   
    return new Promise((resolve,reject)=>{
        ownerApi.post('/dish-details',credentials).then((data)=>{
            
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

export async function getDishDetails(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-dish-details${id}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

//delete dish

export async function dishDelete(dishId,ownerId){
   
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/delete-dish/${dishId}/${ownerId}`).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//one Dish details

export async function oneDishDetails(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-one-dish${id}`).then((data)=>{
            console.log(data,'namma data single');
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//edit dish
export async function newDishDetails(data){
    return new Promise((resolve,reject)=>{
        ownerApi.post('/edit-dish',data).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//delete Restaurant

export async function deleteRes(resId,ownerId){
   console.log(resId,ownerId,'namma id');
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/delete-restaurant/${resId}/${ownerId}`).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//res Details 
export async function oneResDetails(id){
  return new Promise((resolve,reject)=>{
    ownerApi.get(`/get-one-res${id}`).then((data)=>{
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
  })
}

export async function newResDetails(data){
  return new Promise((resolve,reject)=>{
    ownerApi.post('/edit-res',data).then((result)=>{
        resolve(data)
    }).catch((error)=>{
        reject(error)
    })
  })
}

//adding proper details of the restaurant after registering
export async function properDetails(credentials){
    return new Promise((resolve,reject)=>{
        ownerApi.post('/owner-proper-details',credentials).then((data)=>{       
           resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

//adding tables
export async function tableDetails(data){
    console.log(data,'namma data');
    return new Promise((resolve,reject)=>{
        ownerApi.post('/owner-table-details',data).then((data)=>{       
           resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//getting all table data
export async function getTableData(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-table-details${id}`,).then((data)=>{       
           resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}
//getting orders of owner
export async function getOrders(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-order-owner${id}`).then((data)=>{
            
          
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //getting paginated orders

  export async function getpaginatedOrder(page,id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-paginated-order?page=${page}&&id=${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //adding owner banner

  export async function bannerDetails(data){
  return new Promise((resolve,reject)=>{
    ownerApi.post('/banner-details',data).then((result)=>{
        if(result){
            resolve(result)
        }
    }).catch((error)=>{
        reject(error)
    })
  })
  }
  //getting banners

  export async function getBanners(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-banner${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //deleteBAnner

  export async function bannerDelete(bannerId,ownerId){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/delete-banner/${bannerId}/${ownerId}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //getting one order by id

  export async function getOneOrder(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-one-order${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //removing tables
  export async function deleteTable(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/delete-table${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }

  //getting yearly data

  export async function getYearlyData(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-yearly${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }

  //getting monthly data
  export async function getMonthlyData(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-monthly${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }
  //daily data
  export async function getDailyData(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/get-daily${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
  }
//getting orders for sales report
export async function getOrderDetails(ownerId,userId){
    return new Promise((resolve,reject)=>{
      ownerApi.get(`/get-order-sales/${ownerId}/${userId}`).then((data)=>{
        if(data){
            resolve(data)
        }
      }).catch((error)=>{
        reject(error)
      })
    })
}
//owner Logout
export async function ownerLogout(id){
    return new Promise((resolve,reject)=>{
        ownerApi.get(`/logout${id}`).then((data)=>{
            if(data){
                resolve(data)
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}