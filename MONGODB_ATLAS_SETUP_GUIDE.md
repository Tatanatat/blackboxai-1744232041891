# MongoDB Atlas Setup Guide

## 1. Create an Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Click "Try Free" and create an account

## 2. Create a Cluster
- After logging in, click "Build a Cluster"
- Select FREE tier (M0)
- Choose cloud provider and region (pick closest to your location)
- Click "Create Cluster" (takes ~5-10 minutes)

## 3. Create Database User
- Go to Database Access > Add New Database User
- Set username and password (remember these)
- Set privileges: "Atlas admin" or "Read and write to any database"
- Click "Add User"

## 4. Whitelist Your IP (CRUCIAL STEP)
1. Go to MongoDB Atlas Dashboard
2. Navigate to Network Access
3. Click "Add IP Address"
4. For development:
   - Option 1: Add your current IP (recomendado)
   - Option 2: Add "0.0.0.0/0" (permite todas las IPs)
5. Click "Confirm"
6. La configuración puede tardar 1-3 minutos en aplicarse

**Nota:** El error actual indica que tu IP no está en la lista blanca. Por favor completa este paso.

## 5. Get Connection String
- Go to Database > Connect
- Select "Connect your application"
- Copy the connection string (starts with mongodb+srv://)
- Replace <password> with your database user password

## 6. Configure Environment Variables
Create a new file named `.env` in the `channel-manager/server` directory with:
```
MONGO_URI=your_connection_string_here
PORT=5000
```

Important: Never commit this file to version control!

## 7. Restart Server
The API should now connect to your Atlas database.
