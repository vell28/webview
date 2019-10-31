import _mapValues from 'lodash.mapvalues'
import _get from 'lodash.get'
import _set from 'lodash.set'

const STORE_KEY = 'BAE_CMS'

const METHOD_TO_KEY_MAP = {
  businessCardTemplateId   : 'business_card_template_id',
  businessCardTemplateColor: 'business_card_template_color',
}

class DummyStorage {
  // tslint:disable-next-line:no-empty
  public getItem(/*key*/) {
  }

  // tslint:disable-next-line:no-empty
  public setItem(/*key, value*/) {
  }
}

// tslint:disable-next-line:max-classes-per-file
class LocalStorage {
  public getStore() {
    const s = localStorage.getItem(STORE_KEY)

    try {
      return JSON.parse(s) || {}

    } catch (e) {
      localStorage.setItem(STORE_KEY, '{}')

      return {}
    }
  }

  public saveStore(store) {
    localStorage.setItem(STORE_KEY, JSON.stringify(store))
  }

  public getItem(key) {
    return _get(this.getStore(), key)
  }

  public setItem(key, value) {
    this.saveStore(_set(this.getStore(), key, value))
  }
}

// tslint:disable-next-line:no-shadowed-variable
const accessor = storage => key => (value) => {
  if (value !== undefined) {
    storage.setItem(key, value)
  }

  return storage.getItem(key)
}

// tslint:disable-next-line:no-shadowed-variable
const accessors = storage => _mapValues(METHOD_TO_KEY_MAP, accessor(storage))

const storage = typeof localStorage === 'object' ? new LocalStorage() : new DummyStorage()

export default Object.assign(accessors(storage), {
  getItem: key => storage.getItem(key),
  setItem: (key, value) => storage.setItem(key, value),
})
