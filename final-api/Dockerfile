FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src
RUN ./mvnw package -DskipTests
CMD ["java", "-jar", "target/social-media-backend-0.0.1-SNAPSHOT.jar"]