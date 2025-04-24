# NodeJS-MongoDB-Sample
A simple NodeJS web application which communicates with MongoDB. Useful for testing Eclipse Che Node workspace.

# MongoDB
The application connects to the Mongo data base, so it should be configured with next parameters:
- MongoDB user - <b>user</b>
- MongoDB password - <b>password</b>
- The name of data base - <b>guestbook</b>

# Deploy the application on Kubernetes cluster by oc or kubectl command-line tool
- Before you begin you need to have a Kubernetes cluster, and the `kubectl` command-line tool must be configured to communicate with your cluster. If you do not already have a cluster
- Deploy MongoDB:
		`kubectl apply -f ./kubernetes-manifests/mongo.deployment.yaml`
- Deploy guestbook application:
		`kubectl apply -f ./kubernetes-manifests/guestbook-app.deployment.yaml`
