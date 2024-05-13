# TxtToWord

TxtToWord is a Node.js and Web Components solution for converting .txt to .docx and persisting the word file in a MongoDB.

## Installation

There are two ways to run the project, via Node.js runtime or via docker.

If you are just viewing the project, for simplicity  we recommend a docker setup.

## Installation using docker

```git
git clone https://github.com/S4UR000N/TxtToWord.git
```

## Usage

```docker
docker compose up
```

## Access

It is all setup now and you can go to <a href="http://localhost:3000/" target="_blank">localhost:3000</a>

## Testing

### Open shell

First you need to get the Id or Name of the container and copy it:

```docker
docker ps
```
###### the id should resemble: 920aa9288d8b
###### the name should resemble: txttoword-backend-1

Copied id or name from the previous step put instead of ```<Id/Name>```


```docker
docker exec -it <Id/Name> sh
```

To test the backend:

```
cd Backend
npm test
```

To test the frontend:
```
cd Frontend
npm test
```
