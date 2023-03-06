# FROM node
# WORKDIR /app
# # COPY package.json .
# # COPY tsconfig.json .
# COPY . .
# RUN npm install
# RUN npm run build
# RUN ls -a
# CMD ["npm","run","start"]


FROM node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN ls -a
CMD ["npm","run","start"]