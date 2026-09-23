const fs = require("fs");
const { parse } = require("csv-parse");
const axios = require("axios");

const filePath =
  "C:\\Users\\USER\\Downloads\\khayaban-datsheet - ingredients.csv";

async function importCSV() {
  try {
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true }));

    for await (const row of parser) {
      // Skip empty rows
      if (!row.title) continue;

      const ingredientData = {
        title: row.title,
        description: row.description,
      };

      try {
        await axios.post("http://localhost:1337/api/ingredients", {
          data: ingredientData,
        });
        console.log(`Successfully imported: ${row.title}`);
      } catch (err) {
        // @ts-ignore
        const errorMsg = err.response?.data || err.message;
        console.error(`Failed to import ${row.title}:`, errorMsg);
      }
    }
    console.log("All ingredients imported successfully!");
  } catch (error) {
    // @ts-ignore
    const errMessage = error.message || String(error);
    console.error("Error reading CSV file:", errMessage);
  }
}

importCSV();
