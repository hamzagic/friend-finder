import Genre from "../models/Genre.js";
import Subject from "../models/Subject.js";

export const createGenreService = async (name, subject, description) => {
  try {
    await findByNameService(name);
    const checkSubject = await findBySubjectService(subject);

    if(checkSubject.success) {
      const genre = new Genre({
        name,
        subject,
        description
      });
      await genre.save();
      return {success: true, data: genre};
    } else {
      return { success: false, error: checkSubject.error };
    }

  } catch (error) {
    return { success: false, error: error.message };
  }
}

export const findByNameService = async (name) => {
  try {
    const genre = await Genre.findOne({ name });
    if(genre) {
      return genre; 
    }
  } catch (error) {
    return { error: 'Genre already exists' };
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

