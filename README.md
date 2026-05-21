## To do

- allow creating a project in the admin dashboard
- allow editing a project in the admin dashboard
- allow deleting a project in the admin dashboard
- allow commenting and liking projects on the project page
- add sorting my languages and technologies to api and projects list

## Running with Podman

### Prerequisites

- [Podman](https://podman.io/) and [podman-compose](https://github.com/containers/podman-compose) installed
- A PostgreSQL database running and accessible from the host

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/nxvafps/personal-portfolio.git
cd personal-portfolio
```

**2. Create a .env file in the project root**

```env
DATABASE_URL="postgresql://postgres:postgres@host.containers.internal:5432/portfolio_dev?schema=public"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

> `host.containers.internal` resolves to your host machine from inside the container. Use this instead of `localhost`.

**3. Build and start the container**

```bash
podman-compose up --build -d
```

**4. Run database migrations**

```bash
podman-compose run --rm app sh -c "npx prisma migrate deploy"
```

**5. Seed the database**

```bash
podman-compose run --rm app sh -c "npx prisma db seed"
```

**6. Visit the app**

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other useful commands

```bash
# Stop the container
podman-compose down

# View logs
podman-compose logs -f app

# Rebuild after code changes
podman-compose up --build -d
```
