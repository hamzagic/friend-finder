import Subject from "../models/Subject.js";

export const createSubjectService = async (name, description) => {
  try {
    await findByNameService(name);
    const subject = new Subject({
      name,
      description
    });
    await subject.save();
    return {success: true, data: subject};
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export const findByNameService = async (name) => {
  try {
    const subject = await Subject.findOne({ name });
    if(subject) {
      return subject; 
    }
  } catch (error) {
    return { error: 'Subject already exists' };
  }
}

