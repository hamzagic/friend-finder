import Subgenre from "../models/Subgenre.js";
import Genre from "../models/Genre.js";
import Subject from "../models/Subject.js";
import Title from "../models/Title.js";

export const createTitleService = async (name, subject, genre, subgenre, description) => {
  try {
    await findByNameService(name);
    const checkSubject = await findBySubjectService(subject);
    const checkGenre = await findByGenreService(genre);
    const checkSubgenre = await findBySubgenreService(subgenre);

    if(checkSubject.success && checkGenre.success && checkSubgenre.success) {
      const title = new Title({
        name,
        subject,
        genre,
        subgenre,
        description
      });
      await title.save();
      return {success: true, data: title};
    } else {
      return { success: false, error: checkSubject.error || checkGenre.error || checkSubgenre.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export const findByNameService = async (name) => {
  try {
    const title = await Title.findOne({ name });
    if(title) {
      return title; 
    }
  } catch (error) {
    return { error: 'Name already exists' };
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

export const findBySubgenreService = async (name) => {
  try {
    const subgenre = await Subgenre.findOne({ name });
    if(!subgenre) {
      return { error: 'Genre does not exist' };
    } else {
      return { success: true, data: subgenre };
    }
  } catch (error) {
    return { error: error.message };
  }
}

