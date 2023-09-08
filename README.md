## Consistent cache study

I made this project to understand and trest how to write a cache that is consistent.
I have a problem which is, when a GET route is requested, it checks if the data exists on cache and if not, it checks on the primary database and stores it on cache.
But when update routes are requested (`POST`, `PUT` or `DELETE`), the cache is not updated, so it remains inconsistent.
To fix that problem, i wrote a method to everytime this type of route is requested, it updates the cache and keeps the data consistent between cache and db.

## How my cache works

When GET is called, it concatenate the `CUSTOMER`, `EMAIL` and `URL` params:

```javascript
req.params = {
  customer: 'A',
  email: 'email@email.com'
};

req.originalUrl = `/person/:customer/:email`;

const key = `${req.params.customer}:${req.params.email}:${req.originalUrl}`

// key = 'A:email@email.com:/person/A/email@email.com'
```

and then the data retrieved from db is stored in the cache.

For the `/people` route which retrieves all people from a customer, the logic is the same but without the email:

```javascript
req.params = {
  customer: 'A',
};

req.originalUrl = `/people/:customer`;

const key = `${req.params.customer}:${req.originalUrl}`

// key = 'A:/person/A'
```

## How the data is updated

After the data is updated on the DB, `updateCache` is called.

- All keys related to that company are selected.
- If the operation is a update and the data related to the key is a array, it will try to locate the object that has been modified and replaces it with the new data.
- If the operation is a insert and the data related to the key is a array, it will insert the new data on the array.
- If the operation is a delete and the data related to the key is a array, it will remove the data from the array.
- The same will occur when the data related to the key is not a array.
- After that, the new data is sent or deleted from the redis cache.

The update is asynchronous.