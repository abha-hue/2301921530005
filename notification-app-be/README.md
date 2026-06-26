# Notification App Microservice

This microservice handles fetching and intelligently prioritizing notifications. It is built strictly to the specifications of the Notification System Design using Node.js, Express, and a custom Min Heap data structure.

## Evidence of Working Output

Here are the live outputs demonstrating that the Priority Queue successfully extracts and ranks the **Top 5 Placement Notifications** out of the incoming payload, perfectly honoring the `Placement > Result > Event` tiering and timestamp resolution.

![API Output Part 1](./assets/output1.png)

![API Output Part 2](./assets/output2.png)

---

## Technical Features
- **Min Heap Priority Engine**: Extracts the Top N notifications in $O(n \log k)$ time instead of expensive $O(n \log n)$ array sorting.
- **Priority Rules Engine**: Hard-coded to automatically elevate "Placement" over "Result" over "Event", settling ties by parsing the ISO timestamps to favor the newest alerts.
- **Robustness**: Seamlessly integrated with the internal `logging-middleware` to prevent unhandled rejection crashes when the upstream API expires or returns 401s.

## How to Run

1. Make sure your dependencies are installed:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   # or
   npx ts-node src/server.ts
   ```
3. Fetch your top prioritized inbox via:
   ```bash
   curl http://localhost:3001/api/notifications/top?n=5
   ```




## OUTPUT

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