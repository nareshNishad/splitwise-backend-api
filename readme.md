# Splitwise

Create group with your friends and split bills without any hassle.️

## Features

- User can register and authenticate
- User can add expense
- User can view all dues
- User can view all added expense
- User can settle a due

Entry point is `app.py`. All the models are being stored in `models`. All the routes are structured in `controllers`.

## Install & Build

```
npm install
npm start
```

## Technology use

- Language: Nodejs
- Server: Express
- Database: Postgres
- ORM: Sequelize

## API Docs

### Add new User

- POST `/api/register`
- Request
  json

```
{
    "name": "Alice",
    "email": "hello@example.com",
    "password": "123456"
}
```

- Response (data)
  json

```
{
	"data": {
		"payload": {
			"email": "hello@example.com",
			"name": "Alice",
			"hashedPassword": "e10adc3949ba59abbe56e057f20f883e"
		}
	},
	"success": true
}
```

### Authenticate user

- POST `/api/login`
- Request
  json

```
{
    "email": "hello@example.com",
    "password": "123456"
}
```

- Response (data)
  json

```
{
"data": {
	"token": "b0a7c26a03c65561686d5f2b688a9f58",
	"name": "Alice",
	"user_id": 3
	},
"success": true
}
```

### User info

- Get `/api/users/:id`

### List of all Users

- Get `/api/users`

- Response (data)
  json

```
{
"data": {
"allUsers": [
{
"user_id": 1,
"name": "naresh",
"email": "naresh@gmail.com",
"hashedPassword": "e10adc3949ba59abbe56e057f20f883e",
"token": "51b2b71ac9361943cfad9003c0a2bee8",
"createdAt": "2022-06-14T14:51:44.052Z",
"updatedAt": "2022-06-14T15:01:55.328Z"
},
]
},
"success": true
}
```

### Add expense

- GET `/api/expense`
- Response
  json

```
{
"owner":2,
"description": "dinner",
"amount": 500,
"members": [
	{
		"user_id": 2,
		"share": 320
	},
	{
		"user_id": 1,
		"share": 180
	}
]
}
```

```
{
"data": {},
"success": true
}
```

### View dues for user

- GET `/api/dues/:user_id`
- Response (data)
  json

```
{
"data": {
	"output": {
	"totalAmountYouGet": [
		{
			"amount": 180,
			"lender": 1
		}
	],
	"totalAmountYouPay": [
		{
		"amount": 70,
		"owner": 1
		}
	]
}
},
"success": true
}
```

### View expense for user

- GET `/api/expense/:user_id`
- Response (data)
  json

```
{
"data": {
"expenses": [
	{
	    "amount": 100,
	    "createdAt": "2022-06-15T04:32:19.254Z",
	    "expense_id": 1
	}
]
},
"success": true
}
```

### Settle Expense

- Post `/api/settle`
- Request (data)
  json

```
{
    "payer_id": 2,
    "payto_id": 1,
    "amount": 20,
    "expense_id": 2
}
```

- Response (data)
  json

```
{
    "data": {},
    "success": true
}
```
