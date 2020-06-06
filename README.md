# Udagram Monolith to  Microservices
[![Build Status](https://travis-ci.com/gmpatil/cloud-dev-nd-monolith2microsvcs.svg?branch=master)](https://travis-ci.com/gmpatil/cloud-dev-nd-monolith2microsvcs)

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed.

The project is split into three parts:
1. [The Simple Frontend](/udacity-c3-frontend)
A basic Ionic client web application which consumes the RestAPI Backend. 
2. [The RestAPI Feed Backend](/udacity-c3-restapi-feed), a Node-Express feed microservice. Keeps track of feeds/images, returns AWS S3 signed URLs for storing and retrieving images for front-end. 
3. [The RestAPI User Backend](/udacity-c3-restapi-user), a Node-Express user microservice. Handles user authentication and genration of JWT tokens.
All the above three servers are served through Nginx based reverse-proxy container.

# Deploying to AWS using Kubernetes
Follow steps listed in this section to depoy Udagram app to AWS directly from Travis-CI. These instructions assumes basic knowledge AWS and Travis-CI.

## Provision AWS User
This user is separate from AWS root account and used to manage Kubernetes cluser nodes. Install this user profiles in local development environment or CI environment.

## Provision S3 Bucket 
Create a S3 bucket, block all public access but provide CORS GET, PUT, POST CORS (: Cross Origin Resource Sharing) access by setting below policy. Provide limited bucket access to above user.

```XML
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```
## Provision PostgresSQL DB
- Allow public traffic to DB

## Provision EKS Cluster and Node Group
- Create IAM Role to service EKS Cluster 
- Create IAM Role that will be used by nodes in the Node Group SimpleNodeNG

Make sure to use the AWS user account created earlier to create this cluster and Node Group.

- Create EKS Cluster - gmp_eks_cluster
Allow Public to access cluster endpoint.
- Create Node Group - gmp_eks_ng_udagram_dev Minimum of 4 nodes. One atleast for front-endfront-end, reverse-proxy, feed-api and user-api servers.

## Initialize the EKS/Kubernetes cluster

## Configure Travis-CI Deploy to AWS EKS Cluster
Clone this GitHub repository, and configure Travis-CI to build cloned repository.

Deploy below environment variables to the cluster:
```
kubectl apply -f <<configFileName>>.yaml
```

env-cfgmap.yaml
```yaml
apiVersion: v1
kind: ConfigMap
data:
  aws_profile: default
  DB_DIALECT: postgres
  FE_URL: ___LoadBalancerURL__
metadata:
  name: env-config
```

env-sec.yaml
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: env-secret
type: Opaque
data:
  DB_USERNAME: 
  DB_PASSWORD: 
  DB_NAME: 
  DB_HOST: 
  aws_s3_bucket: 
  aws_region: 
  JWT_SECRET: 
```

aws-sec.yaml
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: aws-secret
type: Opaque
data:
  credentials: ___INSERT_AWS_CREDENTIALS_FILE__BASE64____ 
```



## Building Local Setup

> _tip_: this frontend is designed to work with the RestAPI backends). It is recommended you stand up the backend first, test using Postman, and then the frontend should integrate.

### Installing Node and NPM
This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (NPM is included) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

### Installing Ionic Cli
The Ionic Command Line Interface is required to serve and build the frontend. Instructions for installing the CLI can be found in the [Ionic Framework Docs](https://ionicframework.com/docs/installation/cli).

### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the root of this repository. After cloning, open your terminal and run:
```bash
npm install
```
>_tip_: **npm i** is shorthand for **npm install**

### Setup Backend Node Environment
You'll need to create a new node server. Open a new terminal within the project directory and run:
1. Initialize a new project: `npm init`
2. Install express: `npm i express --save`
3. Install typescript dependencies: `npm i ts-node-dev tslint typescript  @types/bluebird @types/express @types/node --save-dev`
4. Look at the `package.json` file from the RestAPI repo and copy the `scripts` block into the auto-generated `package.json` in this project. This will allow you to use shorthand commands like `npm run dev`


### Configure The Backend Endpoint
Ionic uses enviornment files located in `./src/enviornments/enviornment.*.ts` to load configuration variables at runtime. By default `environment.ts` is used for development and `enviornment.prod.ts` is used for produciton. The `apiHost` variable should be set to your server url either locally or in the cloud.

***
### Running the Development Server
Ionic CLI provides an easy to use development server to run and autoreload the frontend. This allows you to make quick changes and see them in real time in your browser. To run the development server, open terminal and run:

```bash
ionic serve
```

### Building the Static Frontend Files
Ionic CLI can build the frontend into static HTML/CSS/JavaScript files. These files can be uploaded to a host to be consumed by users on the web. Build artifacts are located in `./www`. To build from source, open terminal and run:
```bash
ionic build
```
***
