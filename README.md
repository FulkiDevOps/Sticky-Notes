# Sticky Notes Web App - Matias Pozzi

This is a Sticky Notes application developed for a Challenge. The project features a full-stack architecture optimized for a production-grade deployment.

The application is 100% dockerized, separating the development environment from a robust production deployment.

---

## Production Architecture

The production deployment is optimized for security and performance using a 4-container architecture:

1.  **Proxy (Nginx):** Acts as a reverse proxy and is the **single point of entry** (port 80). It routes API traffic to the backend and serves the frontend application.
2.  **Frontend (Nginx):** Serves the static, built React application efficiently.
3.  **Backend (Node.js):** Runs the compiled NestJS business logic in a lean Node.js environment.
4.  **Database (PostgreSQL):** Stores application data and is only accessible from the backend container, not from the public internet.

---

## Prerequisites

You only need the following tools installed. The entire application stack (Node, NPM, Postgres, Nginx) is contained within Docker.

* **Git**
* **Docker**
* **Docker Compose**
* **Bash/Zsh:** (To run the startup scripts)

---

## How to Run (Production Mode - Recommended)

This script (`run_prod.sh`) builds and runs the final, optimized production architecture.

1.  Clone the repository:
    ```bash
    git clone <YOUR_REPO_URL>
    cd <repository-name>
    ```

2.  Make the production script executable:
    ```bash
    chmod +x run_prod.sh
    ```

3.  Run the script:
    ```bash
    ./run_prod.sh
    ```

### What does this script do?

1.  Checks if Docker Compose is installed.
2.  Automatically creates the `./backend/.env` file from the example if it doesn't exist.
3.  **Builds** the optimized production images (using `docker-compose.prod.yml`).
4.  **Starts** all 4 services (db, backend, frontend, proxy).
5.  **Waits** for the database to become healthy.
6.  **Runs Prisma migrations** (`prisma migrate deploy`) inside the backend container to set up the database schema.
7.  Restarts the backend to ensure it connects successfully to the prepared database.

### Accessing the Application (Production)

Once the script is finished, the unified application is available at:

* **Web Application:** `http://localhost`

---

## How to Run (Development Mode)

This script (`run_dev.sh`) uses the development servers (`npm run dev`) with hot-reloading for live code changes.

1.  Make the development script executable:
    ```bash
    chmod +x run_dev.sh
    ```
2.  Run it:
    ```bash
    ./run_dev.sh
    ```
    *(This script uses the `docker-compose.yml` file and will show all container logs in your terminal. Press `Ctrl+C` to stop.)*

### Accessing the Application (Development)

* **Frontend (React):** `http://localhost:5173`
* **Backend (API):** `http://localhost:3000`