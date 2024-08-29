import Subgenre from "../models/Subgenre.js";
import Genre from "../models/Genre.js";
import Subject from "../models/Subject.js";

export const createSubgenreService = async (name, subject, genre, description) => {
  try {
    await findByNameService(name);
    const checkSubject = await findBySubjectService(subject);
    const checkGenre = await findByGenreService(genre);

    if(checkSubject.success && checkGenre.success) {
      const subgenre = new Subgenre({
        name,
        subject,
        genre,
        description
      });
      await subgenre.save();
      return {success: true, data: subgenre};
    } else {
      return { success: false, error: checkSubject.error || checkGenre.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export const findByNameService = async (name) => {
  try {
    const subgenre = await Subgenre.findOne({ name });
    if(subgenre) {
      return subgenre; 
    }
  } catch (error) {
    return { error: 'Subgenre already exists' };
  }
}

export const findBySubjectService = async (name) => {
  try {
    const subject = await Subject.findOne({ name });
    if(!subject) {
      return { error: 'Subject does not exist' };
    } else {
      return { success: true, data: subject };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export const findByGenreService = async (name) => {
  try {
    const genre = await Genre.findOne({ name });
    if(!genre) {
      return { error: 'Genre does not exist' };
    } else {
      return { success: true, data: genre };
    }
  } catch (error) {
    return { error: error.message };
  }
}

