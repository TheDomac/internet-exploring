const fs = require('fs');
const path = require('path');


const workshopPuzzles = require("./src/common/data/workshopPuzzles.json");

const deleteWorkshopPuzzle = async (id) => {
    const newWorkshopPuzzles = workshopPuzzles.filter(wp => wp.id !== id);

    if (newWorkshopPuzzles.length === workshopPuzzles.length -1) {
        console.log("Found puzzle", id)
        try {
            const pathName = path.resolve(__dirname, `./src/common/data/workshopPuzzles.json`);
        
                fs.writeFileSync(pathName, JSON.stringify(newWorkshopPuzzles));
                console.log(`Writing file: ${pathName}`);
      
        } catch (error) {
            console.error('Error writing file', error)
        }
    } else {
        console.error('Error new length')
        console.error(newWorkshopPuzzles.length)
        console.error(workshopPuzzles.length)
    }
    
    
}

deleteWorkshopPuzzle(process.argv[2])
