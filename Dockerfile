#--------------------------------------------------------------------------------------------
#  Copyright (c) Red Hat, Inc. All rights reserved.
#  Licensed under the MIT License. See LICENSE in the project root for license information.
#--------------------------------------------------------------------------------------------

# Use base node image
FROM quay.io/eclipse/che-nodejs10-ubi:nightly

RUN mkdir /home/nodejs-mongodb-sample
WORKDIR /home/nodejs-mongodb-sample

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application source code
COPY . .

# Run app.js with debugging port when container launches
ENTRYPOINT ["npm", "run-script", "debug"]

# Comment above and uncomment below to run app.js without debugger port when container launches
# ENTRYPOINT ["npm", "start"]