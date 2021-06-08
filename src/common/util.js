//获取时间
export function getTime(time){
  let hour = parseInt(time / 3600)
  let minutes = parseInt(time % 3600 / 60)
  let second = parseInt(time % 60);

  hour >= 1 ? hour = hour + ":" : hour = '';

  minutes < 10 ? minutes = "0" + minutes : minutes = minutes;

  second < 10 ? second = "0" + second : second = second;

  return hour + minutes + ":" + second
}

//获取年月日
export function getDate(time) {
  const date = new Date(time);
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()

  month < 10 ? month = "0" + month : month = month;

  day < 10 ? day = "0" + day : day = day;

  return year + "-" + month + "-" + day
}

//操作storage
export function setItem(key, value) {
  let storage = window.localStorage.getItem(key);

  if (!storage) {
    storage = {}
  }else{
    storage = JSON.parse(storage);
  }
  
  storage[key] = value
  window.localStorage.setItem(key, JSON.stringify(storage))
}

export function getItem(key, def) {
  let storage = window.localStorage.getItem(key);

  if (!storage) {
    console.log('没有登录');
    return def;
  }else{
    storage = JSON.parse(storage);
    // console.log(storage[key]);
    return storage[key];
  }
}