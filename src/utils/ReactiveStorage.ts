// 此实现方案通过隐私 CryptoJS 进行数据加密和解密，
// 通过 Vue 3 的 reactive 和 watch 实现自动响应式，
// 并通过设置定时器实现定期清理过期数据
import { reactive } from 'vue'
import CryptoJS from 'crypto-js'

//泛型接口，用于存储每个项目的值和过期时间，null表示永不过期
interface StorageItem<T> {
  value: T
  expiresAt: number | null //数据的过期时间戳
  encrypted: boolean //标记是否加密
}

class ReactiveStorage {
  //存储在localstorage的键名
  private storageKey = 'reactive_storage'
  //用于加密和解密数据的密钥
  private secretKey: string
  //一个响应式对象，存储所有数据项
  private storage: Record<string, StorageItem<any>> = reactive({})

  //构造函数
  constructor(secretKey: string = 'aBc123!@#dEf456$%^gHi789&*(') {
    //接收一个密钥参数，用于加密和解密数据
    this.secretKey = secretKey
    //调用loadStorage方法加载存储数据
    this.loadStorage()
  }

  //loadStorage方法
  private loadStorage() {
    //从localstorage中读取数据
    const storeData = localStorage.getItem(this.storageKey)
    if (storeData) {
      try {
        //整体解密一次
        const decryptedData = CryptoJS.AES.decrypt(storeData, this.secretKey).toString(CryptoJS.enc.Utf8)
        const parsedData = JSON.parse(decryptedData)
        //遍历每个键值对，对隐私数据再一次解密
        for (const key in parsedData) {
          if (parsedData[key].encrypted) {
            try {
              const encryptedValue = parsedData[key].value
              const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, this.secretKey).toString(CryptoJS.enc.Utf8)
              parsedData[key].value = JSON.parse(decryptedValue)
            } catch (e) {
              console.warn(`Failed to decrypt value for key ${key}`, e)
            }
          }
        }
        //将解密后的数据合并到storage对象中
        Object.assign(this.storage, parsedData)
      } catch (e) {
        console.warn('Failed to load storage', e)
      }
    }
  }

  //saveStorage() 方法的作用是把 this.storage 中的数据加密后保存到 localStorage 中
  private saveStorage() {
    try {
      const dataToSave = { ...this.storage }
      for (const key in dataToSave) {
        //加密隐私数据
        if (dataToSave[key].encrypted) {
          const jsonValue = JSON.stringify(dataToSave[key].value)
          const encryptedValue = CryptoJS.AES.encrypt(jsonValue, this.secretKey).toString()
          dataToSave[key].value = encryptedValue
        }
        6
      }
      const jsonData = JSON.stringify(dataToSave)
      //整体加密
      const encryptedData = CryptoJS.AES.encrypt(jsonData, this.secretKey).toString()
      localStorage.setItem(this.storageKey, encryptedData)
    } catch (e) {
      console.warn('Failed to save storage', e)
    }
  }

  //setItem方法
  //设置一个数据项，并可选地设置其过期时间
  setItem<T>(key: string, value: T, expiresIn?: number, encrypt = false) {
    //如果提供了expiresIn参数，则计算过期时间戳
    const expiresAt = expiresIn ? Date.now() + expiresIn : null
    // 将数据项存储在 storage 对象中，并调用 saveStorage 方法保存数据。
    this.storage[key] = { value, expiresAt, encrypted: encrypt }
    this.saveStorage()
  }

  // getItem 方法：
  getItem<T>(key: string): T | null {
    // 获取一个数据项。
    const item = this.storage[key]
    if (item) {
      // 如果数据项已过期，则将其删除并返回 null。
      if (item.expiresAt && item.expiresAt <= Date.now()) {
        delete this.storage[key]
        this.saveStorage()
        return null
      }
      // 否则，返回数据项的值。
      return typeof item.value === 'string' ? JSON.parse(item.value) : item.value
    }
    return null
  }

  // removeItem 方法：
  removeItem(key: string) {
    // 删除一个数据项，并调用 saveStorage 方法保存数据。
    delete this.storage[key]
    this.saveStorage()
  }

  // clear 方法：全部删除
  clear() {
    this.storage = reactive({})
    this.saveStorage()
  }
}

export default new ReactiveStorage(import.meta.env.SECRET_KEY)
