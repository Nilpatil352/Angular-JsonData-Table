# Acme User Data Table App 

A simple Angular 14 application that demonstrates:

- Rendering a dynamic table from a JSON data source
- Inline editing of table rows (client-side only)
- Navigation to a details view for any row
- Minimal, clean styling without heavy UI frameworks

---
## Additional Notes

- **Serial Number Column**:  
  A static "Sr.No." column is added to the table. Each row shows `i + 1` (where `i` is the zero-based index), ensuring numbering starts from 1 instead of 0.

- **Row Index in Details View**:  
  Since JSON data uses zero-based indices, displaying row numbers directly would show "Row 0".  
  To make this user-friendly, the index is incremented by 1 in the template.

    
---

### Features of App

- **Dynamic headers**: The table adapts to the structure of the data.
- **Inline editing**: Edit values directly inside the table; updates are kept in memory.
- **Details view**: Click a row to see all of its fields in a separate view.
- **Routing**: Table view and details view are accessible via Angular Router.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- Angular CLI v14 (or compatible)

---
## Setup

Run the following commands to clone the repo, install dependencies, and start the app:

```cmd
git clone https://github.com/Nilpatil352/Angular-JsonData-Table.git
cd Angular-JsonData-Table
cd acme-userDetails
npm install
ng serve -o
 
