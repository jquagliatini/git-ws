# Bankaccount workshop

This workshop aims at teaching git during the development of mid difficult
application.
The purpose is to create an app that allow a user to manage his/her
bank account.
This will be done via a REST API using [restify][url:restify].

[url:restify]: http://restify.org

## API endpoints

### GET `/account/balance`

Returns the amount of the balance of the user in cents (by default in EUR).

#### 200 `application/json`

```json
{
  "status": 200,
  "balance": {
    "amount": 0,
    "currency": "EUR"
  }
}
```
