📦 The Organizer - Warehouse & Inventory Management

The Organizer è un'applicazione web full-stack moderna, progettata per la gestione efficiente di magazzini e inventari. Sviluppata con un'architettura scalabile e pulita, l'applicazione integra un sistema di autenticazione sicuro e può essere eseguita sia in locale che containerizzata tramite Docker e Kubernetes.

Questo progetto nasce con un forte focus su DevOps e Cloud-Native readiness, rendendolo perfettamente "plug-and-play" per qualsiasi sviluppatore o recruiter che voglia testarlo.
🚀 Stack Tecnologico

    Frontend & Backend: Next.js 15 (App Router, Server Actions)

    Autenticazione: Auth.js (v5) con Credentials Provider e gestione JWT

    Database: MongoDB & Mongoose

    Styling: CSS / Tailwind

    Containerizzazione & DevOps: Docker, Docker Compose, Kubernetes (Minikube, LoadBalancer, PVC)

⚙️ Configurazione delle Variabili d'Ambiente

Prima di avviare il progetto con qualsiasi metodo, crea un file .env nella root del progetto (o usa l'equivalente Secret in Kubernetes) basato su questo template:
Snippet di codice

MONGODB_URI=mongodb://localhost:27017/the-organizer-db
AUTH_SECRET=la_tua_stringa_segreta_casuale_generata
AUTH_TRUST_HOST=true

🛠️ Come avviare il progetto

Puoi scegliere tra tre differenti modalità di esecuzione, a seconda di come desideri testare l'applicazione:
1️⃣ Metodo Standard (Sviluppo Locale con Node.js)

Ideale se vuoi modificare il codice in tempo reale.

    Clona la repository e installa le dipendenze:
    Bash

    git clone https://github.com/tuo-username/the-organizer.git
    cd the-organizer

    Bash

    npm install

    Avvia un'istanza locale di MongoDB (assicurati che sia attiva sulla porta 27017).

    Avvia il server di sviluppo:
    Bash

    npm run dev

    Apri il browser su: http://localhost:3000

2️⃣ Metodo Rapido (Docker Compose)

Ideale per testare l'intera applicazione containerizzata (App Next.js + MongoDB) con un solo comando.

    Assicurati di avere Docker attivo, quindi lancia:
    Bash

    docker compose up --build

    L'applicazione e il database si avvieranno automaticamente all'interno dei container isolati.

    Apri il browser su: http://localhost:3000

3️⃣ Metodo Cloud-Native (Kubernetes & Minikube)

Ideale per dimostrare competenze di orchestrazione con Kubernetes, persistenza dei dati (PVC) e bilanciamento del carico.

    Avvia Minikube:
    Bash

    minikube start --driver=<driver VM usato in locale>

    Applica i manifest di Kubernetes (Deployment, Secret, PVC e Service):
    Bash

    kubectl apply -f kubernetes-deployment.yaml

    Crea il tunnel di rete per esporre il LoadBalancer in locale (lascia il terminale aperto):
    Bash

    minikube tunnel

    Apri un nuovo terminale e verifica che i pod siano in esecuzione:
    Bash

    kubectl get pods

    Accedi all'applicazione tramite il servizio esposto su: http://localhost:3000

👨‍💻 Autore

Sviluppato come progetto portfolio per dimostrare competenze avanzate nello sviluppo Fullstack e nell'ingegneria DevOps moderna.

Nota:
Se si userà admin come username si accederà alla vista administrator con funzionalità aggiuntive.

--------------


📦 The Organizer - Warehouse & Inventory Management

The Organizer is a modern full-stack web application designed for efficient warehouse and inventory management. Developed with a clean and scalable architecture, the application integrates a secure authentication system and can be run locally or containerized via Docker and Kubernetes.

This project is built with a strong focus on DevOps and Cloud-Native readiness, making it completely "plug-and-play" for any developer or recruiter who wants to test it.
🚀 Tech Stack

    Frontend & Backend: Next.js 15 (App Router, Server Actions)

    Authentication: Auth.js (v5) with Credentials Provider & JWT session handling

    Database: MongoDB & Mongoose

    Styling: CSS / Tailwind

    Containerization & DevOps: Docker, Docker Compose, Kubernetes (Minikube, LoadBalancer, PVC)

⚙️ Environment Configuration

Before starting the project, create a .env file in the root directory (or use the equivalent Kubernetes Secret) based on this template:
Snippet di codice

MONGODB_URI=mongodb://localhost:27017/the-organizer-db
AUTH_SECRET=your_generated_random_secret_string
AUTH_TRUST_HOST=true

🛠️ How to Run the Project

You can choose between three different execution modes depending on how you want to test the application:
1️⃣ Standard Method (Local Development with Node.js)

Ideal if you want to modify the code in real-time.

    Clone the repository and install dependencies:
    Bash

    git clone https://github.com/your-username/the-organizer.git
    cd the-organizer

    Bash

    npm install

    Start a local MongoDB instance (make sure it is running on port 27017).

    Run the development server:
    Bash

    npm run dev

    Open your browser at: http://localhost:3000

2️⃣ Quick Method (Docker Compose)

Ideal for testing the entire containerized application (Next.js app + MongoDB) with a single command.

    Ensure Docker is running, then execute:
    Bash

    docker compose up --build

    The application and database will automatically start inside isolated containers.

    Open your browser at: http://localhost:3000

3️⃣ Cloud-Native Method (Kubernetes & Minikube)

Ideal for showcasing orchestration skills with Kubernetes, data persistence (PVC), and load balancing.

    Start Minikube:
    Bash

    minikube start --driver=<your-local-driver>

    Apply the Kubernetes manifests (Deployment, Secret, PVC, and Service):
    Bash

    kubectl apply -f kubernetes-deployment.yaml

    Create the network tunnel to expose the LoadBalancer locally (leave the terminal open):
    Bash

    minikube tunnel

    Open a new terminal and verify that the pods are running:
    Bash

    kubectl get pods

    Access the application via the exposed service at: http://localhost:3000

👨‍💻 Author

Developed as a portfolio project to demonstrate advanced full-stack development skills and modern DevOps engineering.

Notes:
If you will use admin as username , you will be able to access  new features.