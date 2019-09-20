# NodeJS-MongoDB-Sample
A simple NodeJS web application which communicates with MongoDB. Useful for testing Eclipse Che Node workspace.

# MongoDB
The application connects to the Mongo data base, so it should be configured with next parameters:
- MongoDB user - <b>user</b>
- MongoDB password - <b>password</b>
- The name of data base - <b>guestbook</b>

# Deploy the application on Kubernetes cluster by kubectl command-line tool
- Before you begin you need to have a Kubernetes cluster, and the `kubectl` command-line tool must be configured to communicate with your cluster. If you do not already have a cluster, you can create one by using `Minikube` or `Minishift`
- Deploy MongoDB:
		`kubectl apply -f ./kubernetes-manifests/mongo.deployment.yaml`
- Deploy guestbook application:
		`kubectl apply -f ./kubernetes-manifests/guestbook-app.deployment.yaml`

#  Deploy the application via Openshift Connector plug-in on Minishift
- Create and start a workspace from NodeJS MongoDB Web Application stack with OpenShift Connector plug-in
- Open a terminal from `vscode-openshift-connector` container
- Login into your Kubernetes cluster via `oc login https://<IP>:<PORT> --certificate-authority=/var/run/secrets/kubernetes.io/serviceaccount/ca.crt` command
- Create a new project in <b>Openshift application explorer</b>
- Create new application in your project in <b>Openshift application explorer</b>
- Open `kubernetes-manifests/mongo.deployment.yaml` and deploy it via `Kubernetes: Create` command
- Create a new Openshift component from the context menu in project explorer by clicking on `nodejs-mongodb-sample` root folder