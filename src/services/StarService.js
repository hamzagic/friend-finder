import Subgenre from "../models/Subgenre.js";
import Genre from "../models/Genre.js";
import Subject from "../models/Subject.js";
import Title from "../models/Title.js";
import Star from "../models/Star.js";

export const createStarService = async (name, subject, genre, subgenre, title, description) => {
  try {
    await findByNameService(name);
    const checkSubject = await findBySubjectService(subject);
    const checkGenre = await findByGenreService(genre);
    const checkSubgenre = await findBySubgenreService(subgenre);
    const checkTitle = await findByTitleService(title);

    if(
      checkSubject.success && 
      checkGenre.success && 
      checkSubgenre.success && 
      checkTitle.success
    ) {
      const star = new Star({
        name,
        subject,
        genre,
        subgenre,
        title,
        description
      });
      await star.save();
      return {success: true, data: star};
    } else {
      return { success: false, error: checkSubject.error || checkGenre.error || checkSubgenre.error || checkTitle.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export const findByNameService = async (name) => {
  try {
    const star = await Star.findOne({ name });
    if(star) {
      return star; 
    }
  } catch (error) {
    return { error: 'Star already exists' };
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
      return { error: 'Subgenre does not exist' };
    } else {
      return { success: true, data: subgenre };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export const findByTitleService = async (name) => {
  try {
    const title = await Title.findOne({ name });
    if(!title) {
      return { error: 'Title does not exist' };
    } else {
      return { success: true, data: title };
    }
  } catch (error) {
    return { error: error.message };
  }
}

