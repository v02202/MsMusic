# Pull base image.
FROM eclipse-temurin:21

ADD ./target/MsMusic-0.0.1-SNAPSHOT.jar MsMusic.jar

EXPOSE 8080

CMD java -jar MsMusic.jar