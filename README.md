# **SWAYAUTH CLIENT (SUPER ADMIN API LIST)**

ALL APIs follow the standard GET, POST, PATCH and PUT requests

BASE URL: `http://swayauth.com/v1`

# AUTHENTICATION

## REGISTER

All form of **Client** **Registration**, i.e google, facebook & manual registration will be done from the client web application, as this is a one time action.

The BASE_URL for manual registration is: `/auth/manual/client/register`

## LOGIN

**URL**: `/auth/manual/client/login`

**1\. Manual Login**

```
POST REQUEST::
url="https://swayauth.com/v1/auth/manual/client/login"
content_type="Content-Type: application/json"
data={
  "email": "johndoe@gmaio.com",
  "password": "1234567890qwertyuiopQWE7@@@",
}

RESPONSE::
{
  "status": true,
  "message": "Client logged in.",
  "data": {
    "token": "jwt_token" //24hours token
  }
}

//token is a jwt string for 24hrs and can serve all functionality as the client api key on the dashboard which has no expiration.
```

Manual login checks against authorised url host, to provide expected response.

**2\. Google, Facebook Login**

**URL**: `https://swayauth.com/v1/auth/google/client/login?client_id=<YOUR_ORGANISATION_CLIENT_ID>`

**URL**: `https://swayauth.com/v1/auth/facebook/client/login?client_id=<YOUR_ORGANISATION_CLIENT_ID>`

This displays info about SwayAuth management of auth process, fetches info about the client and then redirect to google with the right url base on information saved on the database about the client organisation.

# STATISTICS

**1\. Total Users**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/users?duration=7_days"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**2\. SMS Sent**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/sms?duration=7_days"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**3\. Email Sent**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/emails?duration=7_days"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**4\. Google Usage**

This is for both login and signup

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/google?duration=7_days&action=login"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**5\. Facebook Usage**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/facebook?duration=7_days&action=register"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**6\. Manual Auth**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/manual?duration=7_days&action=login"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**7\. General Usage Chart Statistics**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics?type=general&duration=7_days"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "chart" [3, 5 , 4, 10, 4, 17, 40]
  }
}
```

**8\. Authentication Pie Chart Statistics**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics?type=auth&duration=7_days"
//duration are: 7_days, 30_days, 6_months, 1_year
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "manual" 40,
    "facebook": 20,
    "google": 40
  }
}
```

# USERS

**1\. Get Users Statistics**

```
GET REQUEST::
url="https://swayauth.com/v1/statistics/users?org_id=2&duration=7_days&status=active"
//duration are: 7_days, 30_days, 6_months, 1_year
//params are org_id, duration, status etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "count": 24
  }
}
```

**2\. Get Users List**

```
GET REQUEST::
url="https://swayauth.com/v1/users?sort_by=first_name&per_page=100"
//duration are: 7_days, 30_days, 6_months, 1_year
//optional params are: org_id, status, sort_by, page, per_page etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "users": [
      {
        "first_name": "John",
        ....
      },
      ......
    ],
    next: "https://swayauth.com/v1/users?sort_by=first_name&page=2"
  }
}
```

**3\. Activate/Deactivate A User Account**

```
PATCH REQUEST::
url="https://swayauth.com/v1/users?action=activate"
//actions are: activate, deactivate
content_type="Content-Type: application/json"
data={
  "users_ids": [1, 2, 3]
}
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Updated user account successfully",
  "data": null
}
```

**4\. Delete User Account**

```
DELETE REQUEST::
url="https://swayauth.com/v1/users?action=delete"
content_type="Content-Type: application/json"
data={
  "user_ids" : [1, 2, 4]
}
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Deleted user account successfully",
  "data": null
}
```

# CREDENTIALS

**1\. Create Organisation**

```
POST REQUEST::
url="https://swayauth.com/v1/credentials/create"
content_type="Content-Type: application/json"
authorization="Bearer <token>"
data={
  "photo": "https://company.com/logo.png",
  "name": "Cloutra",
  "url": "https://cloutra.com",
  "Bio": "We offer aws labs to distinct our customers", //300 words
}

Bearer Token are: (Organisation Token, 24hr Login Token)


RESPONSE::
{
  "status": true,
  "message": "Organisation created successfully",
  "data": {
    "id": 1
    "name": "Cloutra",
    "photo": "https://company.com/logo.png",
    "org_client_id": "biue9h9de8gd9e98ge89ge8",
    .......
  }
}
```

**2\. Get Organisation List**

```
GET REQUEST::
url="https://swayauth.com/v1/organisation?sort_by=name&per_page=100"
//optional params are: status, sort_by, page, per_page e.t.c
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "organisations": [
      {
        "name": "Cloutra",
        "org_tokens": 3
        ....
      },
      ......
    ],
    next: "https://swayauth.com/v1/organisation?sort_by=name&page=2"
  }
}
```

**3\. Edit Organisation**

**4\. Delete Organisation**

```
DELETE REQUEST::
url="https://swayauth.com/v1/organisation"
content_type="Content-Type: application/json"
data={
  "org_ids" : [1, 2, 4]
}
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Organisation deleted successfully",
  "data": null
}
```

**5\. Get One Organisation **

```
GET REQUEST::
url="https://swayauth.com/v1/organisation/<org_client_id>"
//optional params are: status, sort_by, page, per_page etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
  	"id": 1,
  	"org_client_id": "eg9ge8g8edg89e98gde9g98e",
  	"org_client_secret": "iuebdued9d9d8dgede9d8g98d9ged9ged8g9e8gd89ged9g9d8g9e8d",
        "name": "Cloutra",
        ....
      }
}
```

**6\. Get Organisation Tokens List**

```
GET REQUEST::
url="https://swayauth.com/v1/organisation/<org_client_id>/token?page=1"
//optional params are: status, sort_by, page, per_page etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "tokens": [
      {
  	"id": 1,
  	"org_token_id": "eg9ge8g8edg89e98gde9g98e",
  	"org_token_secret": "iuebdued9d9d8dgede9d8g98d9ged9ged8g9e8gd89ged9g9d8g9e8d",
        "name": "Cloutra Web 1",
        "authorised_domains": ["https://cloutrer.com", "https://app.cloutrer.com"]
        "scope": ["facebook", "google", "2_factor_authentication"],
        "permissions": ["view", "edit"]
        ....
      },
      ......
    ],
    next: "https://swayauth.com/v1/organisation/<org_client_id>/tokenpage=2"
  }
}
```

**7\. Reset Organisation Token Secret**

```
PATCH REQUEST::
url="https://swayauth.com/v1/organisation/<org_client_id>/token?action=rotate_secret"
//action option: rotate_secret, edit etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Organisation secret rotated successfully",
  "data": {
  	"id": 1,
  	"org_client_id": "eg9ge8g8edg89e98gde9g98e",
  	"org_client_secret": "iuebdued9d9d8dgede9d8g98d9ged9ged8g9e8gd89ged9g9d8g9e8d",
        "name": "Cloutra",
        "scope": ["facebook", "google", "2_factor_authentication"],
        "permissions": ["view", "edit"]
        ....
      }
}
```

**8\. Delete Organisation Tokens**

```
DELETE REQUEST::
url="https://swayauth.com/v1/organisation/token"
content_type="Content-Type: application/json"
data={
  "token_ids" : [1, 2, 4]
}
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Organisation token deleted successfully",
  "data": null
}
```

**9\. Create Organisation Token**

```
POST REQUEST::
url="https://swayauth.com/v1/credentials/organisation/token/create"
content_type="Content-Type: application/json"
authorization="Bearer <token>"
data={
  "name": "Cloutra",
  "authorised_urls": ["https://cloutra.com"],
  "redirect_url: "https://cloutra.com/verify",
  "scope": ["facebook", "google", "sms"],
  "permissions": ["delete", "update", "view", "edit"],
  .......
}

Bearer Token are: (Organisation Token, 24hr Login Token)


RESPONSE::
{
  "status": true,
  "message": "Organisation token created successfully",
  "data": {
    "id": 1
   "name": "Cloutra",
  "authorised_urls": ["https://cloutra.com"],
  "redirect_url: "https://cloutra.com/verify",
  "scope": ["facebook", "google", "sms"],
  "permissions": ["delete", "update", "view", "edit"],
    .......
  }
}
```

**10\. Edit Organisation Token**

# **ACCOUNT**

**1\. Edit Account/Update Password**

```
PATCH REQUEST::
url="https://swayauth.com/v1/account/basic"
content_type="Content-Type: application/json"
authorization="Bearer <token>"
data={
  "first_name": "John",
  "last_name": "Fash",
  "photo: "https://cloutra.com/phoyo.png",
  .......
}

Bearer Token are: (Organisation Token, 24hr Login Token)


RESPONSE::
{
  "status": true,
  "message": "Account edited successfully",
  "data": {
    "id": 1
    .......
  }
}
```

**2\. Add Team Member**

```
POST REQUEST::
url="https://swayauth.com/v1/account/team"
content_type="Content-Type: application/json"
authorization="Bearer <token>"
data={
  "first_name": "Cloutra",
  .......
}

Bearer Token are: (Organisation Token, 24hr Login Token)


RESPONSE::
{
  "status": true,
  "message": "Team member added successfully",
  "data": {
    "id": 1
    .......
  }
}
```

**3\. Get Team List**

```
GET REQUEST::
url="https://swayauth.com/v1/account/team?page=1"
//optional params are: status, sort_by, page, per_page etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "tokens": [
      {
  	"id": 1,
        ....
      },
      ......
    ],
    next: "https://swayauth.com/v1/account/team?page=2"
  }
}
```

**4\. Delete / Activate / Deactivate Team Member**

Only a super admin account can do this.

**5\. Get Wallet Balance**

```
GET REQUEST::
url="https://swayauth.com/v1/account/wallet"
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "wallet_balance": 300000
  }
}
```

**6\. Get Previously Saved Credit Cards (minor information given from paystack)**

```
GET REQUEST::
url="https://swayauth.com/v1/account/wallet/credit_cards"
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": [
    {
      "id": 1,
      "type": "Master Card",
      "first_6digits": "122323",
      "last_4digits": "2221"
      ........
    }
  ]
}
```

**7\. Get Transaction History**

```
GET REQUEST::
url="https://swayauth.com/v1/account/wallet/transactions?page=1"
//optional params are: status, sort_by, page, per_page etc
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    history: [
      {
        "id": 1,
        "created_at": "12 July 2021",
        "amount": 23000,
        "mode_of_payment": "credit_card",
        "payment_for": "sms"
      }
    ],
    next: "https://swayauth.com/v1/account/team?page=2"
  }
}
```

**8\. Get Subscription Plan**

```
GET REQUEST::
url="https://swayauth.com/v1/account/wallet/plan"
content_type="Content-Type: application/json"
authorization="Bearer <token>"

Bearer Token are: (Organisation Token, 24hr Login Token)

RESPONSE::
{
  "status": true,
  "message": "Data fetched successfully",
  "data": {
    "type": "premium",
    "coverage_days": 365,
    "created_at": "12 June 2023"
  }
}
```

**9\. Set Default Payment Method/Card**

**10\. Get Client Profile**