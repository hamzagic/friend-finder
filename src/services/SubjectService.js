import Subject from '../models/Subject.js';
import { SUBJECTS } from '../config/constants.js';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createSubjectService = async (name, description) => {
  const uppercaseName = name.toUpperCase();
  const lowercaseName = name.toLowerCase();

  // that's because it is a new subject and must be saved
  if(!SUBJECTS[uppercaseName]) {
    try {
      await findByNameService(lowercaseName);
      
      const subject = new Subject({
        name: uppercaseName.toLowerCase(),
        description
      });
      await subject.save();
      const newLine = `  ${uppercaseName}: '${uppercaseName.toLowerCase()}',\n`;
      readAndSaveToConstantsFile(newLine);
      return {success: true, data: subject};
    } catch (error) {
      return { success: false, error: error.message };
    }
  } else {
    return { success: false, error: 'Subject already exists' };
  }
}

export const findByNameService = async (name) => {
  console.log(name);
  try {
    const subject = await Subject.findOne({ name });
    if(subject) {
      return subject; 
    }
  } catch (error) {
    return { error: 'Subject already exists' };
  }
}

const readAndSaveToConstantsFile = (data) => {
  const filePath = path.join(__dirname, '..', 'config', 'constants.js');

  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Find the end of the SUBJECTS object
  const subjectMatch = fileContent.match(/export\s+const\s+SUBJECTS\s+=\s+{[^}]*}/);

  if (subjectMatch) {
    const subjectString = subjectMatch[0];
    // Insert new key/value pair before the closing }
    const updatedSubjectString = subjectString.replace(/}$/, data + "}");
    
    // Replace the old SUBJECTS object with the new one
    fileContent = fileContent.replace(subjectString, updatedSubjectString);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log('Successfully updated the SUBJECTS object.');
  } else {
    console.log('SUBJECTS object not found.');
  }
}

