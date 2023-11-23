FROM node
 LABEL maintainer luis.corrales@tecsup.edu.pe
 RUN git clone https://github.com/lcorralesg/vite-react
 WORKDIR /vite-react
 RUN npm install
 EXPOSE 5173
 CMD ["npm","run","dev"]