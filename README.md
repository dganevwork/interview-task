Necessary command to run:
`npm start`

Unfortunately - Docker no longer supports Mc 10.15.7 Catalina, so I was not able to test the docker procedure thoroughly.
I will try to create a new and working environment as soon as possible, but the state of the task is such.

to build a docker image from the file
run the docker daemon `dockerd` if the service isnt running yet.
`docker build - < Dockerfile`

necessary command to create a container from the image
`docker run -dp 8000:3000 --name react-container departments-cards-app:latest`