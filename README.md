# Campus Evaluation Backend Monorepo

Welcome to the central repository for the Campus Evaluation Backend microservices. This project encompasses multiple distinct Node.js and TypeScript microservices designed to solve specific algorithmic and architectural challenges.

## 📁 Repository Structure

The project is structured as a monorepo containing three core packages:

### 1. [Logging Middleware](./logging-middleware/README.md)
A production-ready, highly reusable logging package built to completely replace generic `console.log()` statements across all microservices.
- **Features**: Catches network errors, validates parameters (Stack, Level), avoids application crashes on failure, and streams logs to the central evaluation server.
- **Tech**: TypeScript, Axios, Express Middleware.

### 2. [Vehicle Maintenance Scheduler](./vehicle-scheduler-be/README.md)
A backend microservice that solves the classic **0/1 Knapsack Problem** using Dynamic Programming instead of greedy algorithms.
- **Goal**: Maximizes the total "Impact" of vehicle maintenance tasks while strictly ensuring that total "Duration" does not exceed each depot's daily mechanic-hour budget.
- **Tech**: Node.js, Express, TypeScript.

### 3. [Notification Priority System](./notification-app-be/README.md)
A highly optimized microservice designed to fetch, rank, and serve notifications. It features a complete System Design Document and an efficient algorithm implementation.
- **Features**: Implements a strict **Min Heap Priority Queue** to parse a stream of events and return the "Top N" notifications in $O(n \log k)$ time, correctly prioritizing `Placement > Result > Event`.
- **Documentation**: Includes a Senior-Level System Design Document detailing SSE vs WebSockets, PostgreSQL indexing optimizations, and Kafka/RabbitMQ Event-Driven "Notify All" strategies.

---

## 🚀 Getting Started

Since this is a monorepo, each microservice manages its own dependencies and environment. To run or test a specific project:

1. **Navigate** into the specific project folder:
   ```bash
   cd vehicle-scheduler-be
   # or
   cd notification-app-be
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   npx ts-node src/server.ts
   ```

## 📝 Auth Token Note

These services communicate with a central external Evaluation API. If you receive a `401 Unauthorized` or `Invalid Token` response, you must update the `AUTH_TOKEN` string within the respective service files using a fresh token generated from the evaluation portal.

---
*Developed using Clean Architecture and SOLID Principles.*

## output for the vehicle scheduler system

[
    {
        "depotId": 1,
        "mechanicHours": 60,
        "selectedTasks": [
            "6270c8ac-c248-42fc-8f50-1baa7d788741",
            "3ef5eac3-08c8-48c8-b4cc-5f90586a1600",
            "f7662e0d-9306-42f6-8faa-7822fa7b79de",
            "a0b19f19-ac7e-478b-ba42-4888ee049246",
            "2f5f5c5d-da5e-4012-a91f-998896a82c90",
            "06272119-7915-4030-a335-cf7ccc4ef018",
            "7e805189-6d72-43e0-8f1f-e2f581948703",
            "c0b2cdd9-9424-4ca7-bc91-8fd2eeb4348b",
            "49d8b9f8-2456-4ad8-9faa-49847be22272",
            "6e755206-bf7c-42c8-9dda-b39a9ca090d9",
            "82b4dc35-c5f2-425b-a091-184b5bd0f977",
            "f793c5a7-df89-40c6-8346-103a7903bc5b",
            "1e86fbed-9a3d-493a-aa8a-2d60d460dbd8",
            "4a406b9b-545b-4860-aae8-25701202d1c0"
        ],
        "totalDuration": 60,
        "totalImpact": 105
    },
    {
        "depotId": 2,
        "mechanicHours": 135,
        "selectedTasks": [
            "44dc868c-71f5-486e-84d1-fab0f284be09",
            "6270c8ac-c248-42fc-8f50-1baa7d788741",
            "46823881-a3df-447a-a83b-98d2b1a9ef67",
            "f07dfe1a-f898-4f04-a775-54fc397d524a",
            "3ef5eac3-08c8-48c8-b4cc-5f90586a1600",
            "f7662e0d-9306-42f6-8faa-7822fa7b79de",
            "a0b19f19-ac7e-478b-ba42-4888ee049246",
            "a791bd26-38a9-4f9b-953c-612eaddd026d",
            "62450eb7-aa5e-42e4-8abe-7f6c5d59f926",
            "2f5f5c5d-da5e-4012-a91f-998896a82c90",
            "06272119-7915-4030-a335-cf7ccc4ef018",
            "7e805189-6d72-43e0-8f1f-e2f581948703",
            "6253205d-aefd-491d-9841-fc7b41af9ad4",
            "c0b2cdd9-9424-4ca7-bc91-8fd2eeb4348b",
            "ef7c5470-065d-49f2-ab52-ec30c2fc2e1c",
            "49d8b9f8-2456-4ad8-9faa-49847be22272",
            "c61fb166-7a50-49fb-ad97-e0763ebbc3ae",
            "6e755206-bf7c-42c8-9dda-b39a9ca090d9",
            "f793c5a7-df89-40c6-8346-103a7903bc5b",
            "1e86fbed-9a3d-493a-aa8a-2d60d460dbd8",
            "4a406b9b-545b-4860-aae8-25701202d1c0",
            "4131ee21-d837-4e18-817d-3d04318f1d5a",
            "b5862a0d-5233-4f19-897d-27ccec620f38",
            "6dcf085c-a90a-4c0c-84d1-0fc4f44ae15d",
            "925e006f-94e1-4396-a801-0d69dfaf51ca",
            "52baf288-e3c2-4879-9d5f-c4fe4318ae21"
        ],
        "totalDuration": 135,
        "totalImpact": 174
    },
    {
        "depotId": 3,
        "mechanicHours": 188,
        "selectedTasks": [
            "44dc868c-71f5-486e-84d1-fab0f284be09",
            "6270c8ac-c248-42fc-8f50-1baa7d788741",
            "46823881-a3df-447a-a83b-98d2b1a9ef67",
            "6f0b9aee-5374-46ec-8f4c-643623941aaa",
            "f07dfe1a-f898-4f04-a775-54fc397d524a",
            "3ef5eac3-08c8-48c8-b4cc-5f90586a1600",
            "f7662e0d-9306-42f6-8faa-7822fa7b79de",
            "a0b19f19-ac7e-478b-ba42-4888ee049246",
            "a791bd26-38a9-4f9b-953c-612eaddd026d",
            "62450eb7-aa5e-42e4-8abe-7f6c5d59f926",
            "2f5f5c5d-da5e-4012-a91f-998896a82c90",
            "06272119-7915-4030-a335-cf7ccc4ef018",
            "7e805189-6d72-43e0-8f1f-e2f581948703",
            "6253205d-aefd-491d-9841-fc7b41af9ad4",
            "6ae16763-4dc3-45a7-bc05-7c6275e107bd",
            "c0b2cdd9-9424-4ca7-bc91-8fd2eeb4348b",
            "c89017c4-d401-4b12-85df-f50e26a4d582",
            "ef7c5470-065d-49f2-ab52-ec30c2fc2e1c",
            "7893e37c-12b7-443b-baa9-8bd68868185b",
            "9d0aa883-fdc2-4b04-92f7-12bcbc4ecbdb",
            "49d8b9f8-2456-4ad8-9faa-49847be22272",
            "c61fb166-7a50-49fb-ad97-e0763ebbc3ae",
            "0692a3fb-3cde-470a-ac82-88d2a4835178",
            "6e755206-bf7c-42c8-9dda-b39a9ca090d9",
            "82b4dc35-c5f2-425b-a091-184b5bd0f977",
            "f793c5a7-df89-40c6-8346-103a7903bc5b",
            "1e86fbed-9a3d-493a-aa8a-2d60d460dbd8",
            "4a406b9b-545b-4860-aae8-25701202d1c0",
            "4131ee21-d837-4e18-817d-3d04318f1d5a",
            "b5862a0d-5233-4f19-897d-27ccec620f38",
            "2f6d04dd-6c9f-4675-8c93-fba834f5f537",
            "6dcf085c-a90a-4c0c-84d1-0fc4f44ae15d",
            "89309d39-fe9b-4af5-a971-2dddd450ac80",
            "925e006f-94e1-4396-a801-0d69dfaf51ca",
            "477ebf23-a8b5-4140-a894-c691ab94fbaa",
            "52baf288-e3c2-4879-9d5f-c4fe4318ae21"
        ],
        "totalDuration": 186,
        "totalImpact": 192
    },
    {
        "depotId": 4,
        "mechanicHours": 97,
        "selectedTasks": [
            "6270c8ac-c248-42fc-8f50-1baa7d788741",
            "46823881-a3df-447a-a83b-98d2b1a9ef67",
            "f07dfe1a-f898-4f04-a775-54fc397d524a",
            "3ef5eac3-08c8-48c8-b4cc-5f90586a1600",
            "f7662e0d-9306-42f6-8faa-7822fa7b79de",
            "a0b19f19-ac7e-478b-ba42-4888ee049246",
            "2f5f5c5d-da5e-4012-a91f-998896a82c90",
            "06272119-7915-4030-a335-cf7ccc4ef018",
            "7e805189-6d72-43e0-8f1f-e2f581948703",
            "c0b2cdd9-9424-4ca7-bc91-8fd2eeb4348b",
            "ef7c5470-065d-49f2-ab52-ec30c2fc2e1c",
            "49d8b9f8-2456-4ad8-9faa-49847be22272",
            "c61fb166-7a50-49fb-ad97-e0763ebbc3ae",
            "6e755206-bf7c-42c8-9dda-b39a9ca090d9",
            "f793c5a7-df89-40c6-8346-103a7903bc5b",
            "1e86fbed-9a3d-493a-aa8a-2d60d460dbd8",
            "4a406b9b-545b-4860-aae8-25701202d1c0",
            "b5862a0d-5233-4f19-897d-27ccec620f38",
            "6dcf085c-a90a-4c0c-84d1-0fc4f44ae15d"
        ],
        "totalDuration": 97,
        "totalImpact": 144
    },
    {
        "depotId": 5,
        "mechanicHours": 164,
        "selectedTasks": [
            "44dc868c-71f5-486e-84d1-fab0f284be09",
            "6270c8ac-c248-42fc-8f50-1baa7d788741",
            "46823881-a3df-447a-a83b-98d2b1a9ef67",
            "f07dfe1a-f898-4f04-a775-54fc397d524a",
            "3ef5eac3-08c8-48c8-b4cc-5f90586a1600",
            "f7662e0d-9306-42f6-8faa-7822fa7b79de",
            "a0b19f19-ac7e-478b-ba42-4888ee049246",
            "a791bd26-38a9-4f9b-953c-612eaddd026d",
            "62450eb7-aa5e-42e4-8abe-7f6c5d59f926",
            "2f5f5c5d-da5e-4012-a91f-998896a82c90",
            "06272119-7915-4030-a335-cf7ccc4ef018",
            "7e805189-6d72-43e0-8f1f-e2f581948703",
            "6253205d-aefd-491d-9841-fc7b41af9ad4",
            "6ae16763-4dc3-45a7-bc05-7c6275e107bd",
            "c0b2cdd9-9424-4ca7-bc91-8fd2eeb4348b",
            "c89017c4-d401-4b12-85df-f50e26a4d582",
            "ef7c5470-065d-49f2-ab52-ec30c2fc2e1c",
            "7893e37c-12b7-443b-baa9-8bd68868185b",
            "9d0aa883-fdc2-4b04-92f7-12bcbc4ecbdb",
            "49d8b9f8-2456-4ad8-9faa-49847be22272",
            "c61fb166-7a50-49fb-ad97-e0763ebbc3ae",
            "0692a3fb-3cde-470a-ac82-88d2a4835178",
            "6e755206-bf7c-42c8-9dda-b39a9ca090d9",
            "82b4dc35-c5f2-425b-a091-184b5bd0f977",
            "f793c5a7-df89-40c6-8346-103a7903bc5b",
            "1e86fbed-9a3d-493a-aa8a-2d60d460dbd8",
            "4a406b9b-545b-4860-aae8-25701202d1c0",
            "4131ee21-d837-4e18-817d-3d04318f1d5a",
            "b5862a0d-5233-4f19-897d-27ccec620f38",
            "6dcf085c-a90a-4c0c-84d1-0fc4f44ae15d",
            "925e006f-94e1-4396-a801-0d69dfaf51ca",
            "52baf288-e3c2-4879-9d5f-c4fe4318ae21"
        ],
        "totalDuration": 164,
        "totalImpact": 187
    }
]




## output for the notification system

## n=5

{
    "success": true,
    "data": [
        {
            "ID": "923579c4-8963-43da-b042-0c4aa2ec3707",
            "Type": "Placement",
            "Message": "Visa Inc. hiring",
            "Timestamp": "2026-06-26 03:35:49"
        },
        {
            "ID": "e2c00cf7-2aa0-43cb-8cc0-ce97f099d434",
            "Type": "Placement",
            "Message": "Meta Platforms Inc. hiring",
            "Timestamp": "2026-06-26 01:34:37"
        },
        {
            "ID": "6fcd30be-713d-46dc-ad6a-b7ccea93ae6e",
            "Type": "Placement",
            "Message": "CSX Corporation hiring",
            "Timestamp": "2026-06-25 19:03:16"
        },
        {
            "ID": "f9dfd745-3419-45b9-b036-3dcab1461a61",
            "Type": "Placement",
            "Message": "Marriott International Inc. hiring",
            "Timestamp": "2026-06-25 17:35:40"
        },
        {
            "ID": "085d425e-aca9-4466-bc3d-71f665a95b65",
            "Type": "Placement",
            "Message": "Microsoft Corporation hiring",
            "Timestamp": "2026-06-25 16:33:34"
        }
    ]
}
