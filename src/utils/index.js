const debounce = (f, ms) => {
  let isEnd = false
  
  return function()  {
    if (isEnd) return
    f.apply(this, arguments)
    isEnd = true
    setTimeout(() => isEnd = false, ms)
  }
}

export {
  debounce
}
