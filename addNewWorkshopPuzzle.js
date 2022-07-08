const fs = require('fs');
const path = require('path');


const workshopPuzzles = require("./src/common/data/workshopPuzzles.json");
const approvedPuzzle = require("./src/common/data/approvedPuzzle.json");

const addNewWorkshopPuzzle = async () => {
    const newWorkshopPuzzle = {
        ...approvedPuzzle,
        status: "done",
    }
    const alreadyExists = workshopPuzzles.find(wp => wp.id === newWorkshopPuzzle.id);
    if (alreadyExists) {
        console.error('New workshop puzzle already exists')
    } else {
        const newWorkshopPuzzles = workshopPuzzles.concat(newWorkshopPuzzle);
        try {
            const pathName = path.resolve(__dirname, `./src/common/data/workshopPuzzles.json`);
        
                fs.writeFileSync(pathName, JSON.stringify(newWorkshopPuzzles));
                console.log(`Writing file: ${pathName}`);
      
        } catch (error) {
            console.error('Error writing file', error)
        }
    }    
}

addNewWorkshopPuzzle()
