# e-commerce API Documentation

## Introduction

This is a sample e-commerce API endpoint providing functionality to manage products and orders.

## Base URL

All endpoints are relative to `http://localhost:8000/api`.

## Error Handling

Standard HTTP status codes are used for error handling. Additionally, error responses will include a JSON object with a `message` field indicating the error message.

# API Documentation

This is a sample e-commerce API endpoint.

## Endpoints

### Products

#### Get All Products

**Request:**

- **Method:** GET
- **URL:** `http://localhost:8000/api/products?searchTerm=app`

#### Create a Product

**Request:**

- **Method:** POST
- **URL:** `http://localhost:8000/api/products`
- **Headers:** None
- **Body:** (raw, JSON)

```json
{
  "product": {
    "sku": "PROD123457",
    "name": "Example Product",
    "description": "This is an example product description.",
    "price": 99.99,
    "tags": ["akjsdf"],
    "variants": [
      {
        "type": "Color",
        "value": "Red"
      },
      {
        "type": "Size",
        "value": "M"
      }
    ],
    "inventory": {
      "quantity": 100,
      "inStock": true
    },
    "category": "Electronics",
    "weight": 1.5
  }
}
```

### Get a Specific Product

**Request:**

- **Method:** GET
- **URL:** `http://localhost:8000/api/products/664cf98e47597a57012bde6a`

### Update a Product

**Request:**

- **Method:** PUT
- **URL:** `http://localhost:8000/api/products/664cf98e47597a57012bde6a`

### Delete a Product

**Request:**

- **Method:** DELETE
- **URL:** `http://localhost:8000/api/products/664cf98e47597a57012bde6a`

## Orders

### Get All Orders

**Request:**

- **Method:** GET
- **URL:** `http://localhost:8000/api/orders`

### Create an Order

**Request:**

- **Method:** POST
- **URL:** `http://localhost:8000/api/orders`
- **Headers:** None
- **Body:** (raw, JSON)
  ```json
  {
    "order": {
      "email": "iqbal@gmail.com",
      "productId": "664dfa1fceaf369c0053167c",
      "quantity": 90,
      "price": 100
    }
  }
  ```

### Get Order

**Request:**

- **Method:** GET
- **URL:** `http://localhost:8000/api/orders/664e20612beaef86aa8c2cc7`

## Installation

1. **Clone Repository**:

   ```bash
   git clone https://github.com/iqbal-dev/e-commerce-backend.git
   cd e-commerce-backend

   ```

1. **Install Dependencies:**
   ```bash
   npm install
   or
   yarn install
   ```

## Configuration

### Environment Variables

To configure the environment variables required for this project, follow these steps:

1. **Create a `.env` File:**

   Start by creating a new file named `.env` in the root directory of your project.

2. **Copy from `.env.example`:**

   Copy the contents from the `.env.example` file into your newly created `.env` file.

3. **Configure Variables:**

   Modify the values of the variables in the `.env` file according to your environment and project requirements. Ensure that you provide values for all the required variables specified in the `.env.example` file.

   Here's an example of what the `.env` file might look like:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/e-commerce
   ```
