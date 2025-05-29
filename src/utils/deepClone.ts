//手撕一下深拷贝，当复习了
export function deepClone<T>(obj: T): T {
  if (typeof obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) {
    const arrCopy = [] as any[]
    for (let item of obj) {
      arrCopy.push(deepClone(item))
    }
    return arrCopy as T
  }
  // for...in 循环用于遍历对象自身的可枚举属性以及从其原型链继承的可枚举属性。
  // 因此，当你使用 for...in 循环遍历对象时，可能会遍历到该对象从原型链继承的属性。为了避免这种情况，通常会在循环体内部使用 obj.hasOwnProperty(key) 来检查属性是否是对象自身的属性
  // 而不是从原型链继承的属性。
  if (obj instanceof Object) {
    const objCopy = {} as any
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        objCopy[key] = deepClone(obj[key])
      }
    }
    return objCopy as T
  }
  throw new Error("Unable to copy obj! Its type isn't supported.")
}
