# Getting Started with Spring boot
## Run the project without docker-compose
1. Clone this repo
2. Add an application.properties with secret variable
```
spring.data.mongodb.uri=
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=20MB
aws.iam.access.key=
aws.iam.secret.key=
spring.mvc.dispatch-options-request=true
```
3. Run the debug mode with your IDE
4. Enter src/main/frontend
5. Add an .env file
```
REACT_APP_BACKEND_URL=http://localhost:8080/api/
```
6. Run `npm run start`


## Run the project with docker-compose
1. Clone this repo
2. Create th jar file with `mvn clean install` (Make sure maven is installed in local development environment)
3. Repeat the above steps 2 -> 4 -> 5
4. Run the docker-compose commend
```
    $ docker-compose build
    $ docker-compose up -d

    // Other commend for checking container logs
    $ docker-compose logs -f msmusic
    $ docker-compose logs -f frontend
    // Stop and remove the container
    $ docker-compose down
```