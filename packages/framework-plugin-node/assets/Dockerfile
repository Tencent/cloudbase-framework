FROM <%= tag %>

# Create app directory
WORKDIR /usr/src/app

<% if (hasPackage) { %>

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
<% } %>

<% if (installDeps) { %>
# Install app dependencies
RUN npm install
<% } %>


# Bundle app source
COPY . .

EXPOSE <%= tag || 80 %>

CMD [ "node", "__launcher.js" ]
