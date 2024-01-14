<div align="center">
  <img src="./fake-object.png" width="200"/>
  <h1>Fake Object</h1>
  <p>Generate a faked object from another object for testing and seeding</p>
  
</div>



## 🚀 Why?

- 👠 Seeding - "Boss: Now add a mock and integration tests. two minutes tops.
                 Dev: Creates a User entity. Creates a Post entity. Creates an entity builder. Gives up on the job. Finds out about fake-object. 
- 👾 Testing - "Oh no, I have to set every nested property of this object, damn. Hey! I could use fake-object instead! Hooray!

> **Note**: The faked data does will not always be the best match for your property. It depends on whether 
> or not it is supported on faker js, or how well the property name resembles a faker function.

## 📦 Install

```bash
npm install --save-dev fake-object
```
```bash
yarn add dev fake-object
```
## 🪄 Usage

```ts
import { generateFakeObject } from 'fake-object';

const nestedObject = {
  name: 'John Doe',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA'
  }
};

const fakeObject = generateFakeObject(nestedObject);
console.log(fakeObject);

// Do Something With the Fake Object

/* Generated Object
 {
      name: 'Narciso',
      age: '30294-3425',
      address: {
        street: 'Schowalter Highway',
        city: 'Gary',
        state: 'Florida',
        country: 'Svalbard & Jan Mayen Islands'
      }
    }

/*



```


## Contributing

  * Fork it! 
  * Create your feature branch: `git checkout -b my-new-feature` 
  * Commit your changes: `git commit -am 'Add some feature'` 
  * Push to the branch: `git push origin my-new-feature`
  * Submit a pull request!


## 🔑 License

[MIT](https://github.com/orshachar/fake-object/blob/main/LICENSE)
