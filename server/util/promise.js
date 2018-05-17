

const promisify = fn => new Promise((resolve,reject) => {
  try{
    resolve(fn());
  }
  catch(err){
    reject(err)
  }
})


module.exports = {
  promisify
}
