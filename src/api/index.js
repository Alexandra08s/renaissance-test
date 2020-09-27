export default {
  getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(require('@/data/users.json')), 3000)
    })
  }
}
